import apiClient, { publicClient } from "./axios";

/**
 * 1. Auth Service: Login, Refresh token, Thông tin tài khoản
 */
export const authService = {
  // Login dùng publicClient (không cần mang Bearer token cũ)
  login: async (credentials) => {
    const res = await publicClient.post("/auth/login", credentials);
    return res.data;
  },

  // Refresh token
  refreshToken: async (refreshToken) => {
    const res = await publicClient.post("/auth/refresh-token", { refreshToken });
    return res.data;
  },

  // Lấy thông tin user hiện tại (cần auth)
  getProfile: () => apiClient.get("/auth/me"),
};

/**
 * 2. Product Service: CRUD sản phẩm
 */
export const productService = {
  // Lấy danh sách sản phẩm (hỗ trợ phân trang, lọc, search params)
  getAll: (params = {}) => apiClient.get("/products", { params }),

  // Lấy chi tiết sản phẩm theo ID
  getById: (id) => apiClient.get(`/products/${id}`),

  // Tạo sản phẩm mới (Admin)
  create: (data) => apiClient.post("/products", data),

  // Cập nhật sản phẩm (Admin)
  update: (id, data) => apiClient.put(`/products/${id}`, data),

  // Xóa sản phẩm (Admin)
  delete: (id) => apiClient.delete(`/products/${id}`),
};

/**
 * 3. Category Service: Danh mục sản phẩm
 */
export const categoryService = {
  getAll: () => apiClient.get("/categories"),
  getById: (id) => apiClient.get(`/categories/${id}`),
};

/**
 * 4. Order Service: Quản lý đơn hàng
 */
export const orderService = {
  getAll: (params = {}) => apiClient.get("/orders", { params }),
  getById: (id) => apiClient.get(`/orders/${id}`),
  create: (orderData) => apiClient.post("/orders", orderData),
  updateStatus: (id, status) => apiClient.patch(`/orders/${id}/status`, { status }),
};

/**
 * 5. User Management Service (Dành cho Admin)
 */
export const userService = {
  getAll: (params = {}) => apiClient.get("/users", { params }),
  getById: (id) => apiClient.get(`/users/${id}`),
  updateRole: (id, role) => apiClient.patch(`/users/${id}/role`, { role }),
  delete: (id) => apiClient.delete(`/users/${id}`),
};
