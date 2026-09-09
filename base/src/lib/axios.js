import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

/**
 * 1. Axios client thông thường (dùng cho các API công khai hoặc nội bộ auth)
 */
export const publicClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

/**
 * 2. Axios client bảo mật (tự động gắn JWT & cơ chế xếp hàng refresh token)
 */
export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Biến kiểm soát trạng thái refresh token tập trung để tránh gọi lặp vô tận
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

/**
 * Request Interceptor: Tự động inject Bearer token
 */
apiClient.interceptors.request.use(
  async (config) => {
    // Nếu chạy ở phía Client
    if (typeof window !== "undefined") {
      const session = await getSession();
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor: Tự động unwrap + Xếp hàng Refresh Token khi gặp 401
 */
apiClient.interceptors.response.use(
  (response) => {
    // Trả về trực tiếp data
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // Trích xuất error message từ Spring Boot
    const customMessage =
      error.response?.data?.message ||
      (typeof error.response?.data === "string" ? error.response?.data : null) ||
      error.message ||
      "Đã có lỗi xảy ra khi gọi API";

    // Kiểm tra lỗi 401 (Unauthorized / Token hết hạn) ở client
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== "undefined"
    ) {
      if (isRefreshing) {
        // Đang có 1 request khác thực hiện refresh -> đưa request này vào hàng đợi
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const session = await getSession();

        if (!session?.refreshToken) {
          throw new Error("Không tìm thấy refreshToken trong phiên làm việc");
        }

        // Gọi Spring Boot refresh token endpoint qua publicClient
        const data = await publicClient.post("/auth/refresh-token", {
          refreshToken: session.refreshToken,
        });

        const newAccessToken = data.data?.accessToken || data.accessToken;

        if (!newAccessToken) {
          throw new Error("Backend không trả về accessToken mới");
        }

        // Thông báo cho hàng đợi các request đang chờ
        processQueue(null, newAccessToken);

        // Thực hiện lại request ban đầu với accessToken mới
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        console.warn("Phiên đăng nhập đã hết hạn hoàn toàn, vui lòng đăng nhập lại.");
        await signOut({ callbackUrl: "/login" });
        return Promise.reject(new Error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại."));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(new Error(customMessage));
  }
);

export default apiClient;
