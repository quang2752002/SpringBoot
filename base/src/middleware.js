import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // 1. Nếu quá trình refresh token bị lỗi (ví dụ Refresh token 7 ngày cũng hết hạn)
    if (token?.error === "RefreshAccessTokenError") {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    // 2. Kiểm tra nếu request vào khu vực /admin
    if (pathname.startsWith("/admin")) {
      const role = token?.role;

      // Spring Boot quy ước vai trò ROLE_ADMIN hoặc ADMIN
      const isAdmin = role === "ROLE_ADMIN" || role === "ADMIN";

      if (!isAdmin) {
        // Chặn người dùng thường vào /admin, redirect về trang cấm quyền
        const unauthorizedUrl = new URL("/unauthorized", req.url);
        return NextResponse.redirect(unauthorizedUrl);
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Bắt buộc phải có token đăng nhập trước khi chạy hàm middleware
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;
        // Chỉ bắt buộc đăng nhập đối với các đường dẫn /admin
        if (pathname.startsWith("/admin")) {
          return !!token;
        }
        return true;
      },
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
};
