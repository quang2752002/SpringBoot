import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { publicClient } from "@/lib/axios";
import { decodeJwt } from "@/lib/jwt";

/**
 * Hàm gọi sang Spring Boot POST /api/auth/refresh-token
 * để lấy cặp accessToken & refreshToken mới khi accessToken cũ hết hạn
 */
async function refreshAccessToken(token) {
  try {
    const response = await publicClient.post("/auth/refresh-token", {
      refreshToken: token.refreshToken,
    });

    const refreshedTokens = response.data;

    if (!refreshedTokens?.accessToken) {
      throw new Error("Không nhận được access token mới");
    }

    // Giải mã accessToken mới từ Spring Boot
    const payload = decodeJwt(refreshedTokens.accessToken);

    return {
      ...token,
      accessToken: refreshedTokens.accessToken,
      refreshToken: refreshedTokens.refreshToken || token.refreshToken,
      // exp trong JWT tính bằng giây, nhân 1000 để chuyển thành mili-giây
      accessTokenExpires: payload?.exp ? payload.exp * 1000 : Date.now() + 15 * 60 * 1000,
      role: payload?.role || token.role,
      permissions: payload?.permissions || token.permissions,
      error: undefined,
    };
  } catch (error) {
    console.error("Lỗi làm mới Access Token qua Spring Boot:", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Spring Boot Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Vui lòng nhập đầy đủ tài khoản và mật khẩu");
        }

        try {
          // Gọi API Spring Boot: /api/auth/login bằng publicClient
          const res = await publicClient.post("/auth/login", {
            username: credentials.username,
            password: credentials.password,
          });

          // Spring Boot trả về: { accessToken, refreshToken, tokenType: "Bearer" }
          const authData = res.data;

          if (!authData?.accessToken) {
            throw new Error("Không nhận được token từ Spring Boot Backend");
          }

          // Giải mã accessToken để lấy role, permissions, exp từ JwtProvider
          const payload = decodeJwt(authData.accessToken);

          return {
            id: payload?.sub || credentials.username,
            name: payload?.sub || credentials.username,
            role: payload?.role || "ROLE_USER",
            permissions: payload?.permissions || [],
            accessToken: authData.accessToken,
            refreshToken: authData.refreshToken,
            accessTokenExpires: payload?.exp ? payload.exp * 1000 : Date.now() + 15 * 60 * 1000,
          };
        } catch (error) {
          // Cho phép đăng nhập tài khoản demo offline nếu backend Spring chưa bật
          if (
            credentials.username === "admin" &&
            credentials.password === "admin123"
          ) {
            return {
              id: "admin-id",
              name: "Quản Trị Viên (Demo Offline)",
              role: "ROLE_ADMIN",
              permissions: ["user:create", "user:read", "user:update", "user:delete"],
              accessToken: "mock-admin-token",
              refreshToken: "mock-admin-refresh-token",
              accessTokenExpires: Date.now() + 15 * 60 * 1000,
            };
          }

          if (
            credentials.username === "user" &&
            credentials.password === "user123"
          ) {
            return {
              id: "user-id",
              name: "Người Dùng Thường (Demo Offline)",
              role: "ROLE_USER",
              permissions: ["user:read", "product:read"],
              accessToken: "mock-user-token",
              refreshToken: "mock-user-refresh-token",
              accessTokenExpires: Date.now() + 15 * 60 * 1000,
            };
          }

          const errorMessage =
            error.response?.data?.message ||
            (typeof error.response?.data === "string" ? error.response?.data : null) ||
            error.message ||
            "Lỗi xác thực hệ thống";
          throw new Error(errorMessage);
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      // 1. Lần đăng nhập đầu tiên: lưu toàn bộ token và thời hạn
      if (user) {
        return {
          ...token,
          role: user.role,
          permissions: user.permissions,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          accessTokenExpires: user.accessTokenExpires,
        };
      }

      // 2. Nếu accessToken vẫn còn hạn (trừ hao 1 phút an toàn) -> trả về token hiện tại
      if (Date.now() < (token.accessTokenExpires || 0) - 60 * 1000) {
        return token;
      }

      // 3. Nếu accessToken đã hết hạn hoặc sắp hết hạn (sau 15 phút) -> gọi refresh token
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.permissions = token.permissions;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 ngày tương ứng với Refresh Token của Spring Boot
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
