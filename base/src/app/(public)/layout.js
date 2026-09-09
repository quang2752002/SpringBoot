"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShoppingBag, ShieldCheck, Search, Heart, User, LogIn, LogOut } from "lucide-react";

export default function PublicLayout({ children }) {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-4 py-2 text-xs font-medium text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <p className="flex items-center gap-1.5">
            <span className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider">
              Khuyến mãi
            </span>
            Miễn phí vận chuyển cho mọi đơn hàng từ 1.000.000₫ toàn quốc
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="flex items-center gap-1 text-blue-100 hover:text-white underline underline-offset-2 transition"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Chuyển sang Quản trị (Admin)</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/20">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Tech<span className="text-blue-600">Store</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 tracking-wider">
                FOR CUSTOMERS
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm kiếm điện thoại, laptop, phụ kiện..."
                className="w-full rounded-full border border-slate-200 bg-slate-50/75 py-2 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
              <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-400" />
            </div>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-lg border border-indigo-200 bg-indigo-50/60 px-3 py-1.5 text-xs font-semibold text-indigo-700 hover:bg-indigo-100/80 transition"
            >
              <ShieldCheck className="h-4 w-4 text-indigo-600" />
              <span>Khu vực Admin</span>
            </Link>

            <button
              title="Yêu thích"
              className="relative p-2 text-slate-600 hover:text-blue-600 transition rounded-full hover:bg-slate-100"
            >
              <Heart className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                2
              </span>
            </button>

            <button
              title="Giỏ hàng"
              className="relative p-2 text-slate-600 hover:text-blue-600 transition rounded-full hover:bg-slate-100"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                3
              </span>
            </button>

            <div className="h-6 w-px bg-slate-200 mx-1"></div>

            {session?.user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 px-3 text-xs font-medium text-slate-700">
                  <User className="h-3.5 w-3.5 text-blue-600" />
                  <span>{session.user.name}</span>
                  <span className="rounded bg-blue-100 px-1.5 py-0.2 text-[10px] font-bold text-blue-700">
                    {session.user.role}
                  </span>
                </div>
                <button
                  onClick={() => signOut()}
                  title="Đăng xuất"
                  className="rounded-full p-1.5 text-slate-500 hover:bg-slate-100 hover:text-rose-600 transition"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition shadow-sm"
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Đăng nhập</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                  <ShoppingBag className="h-4 w-4" />
                </div>
                <span className="text-lg font-bold text-slate-900">TechStore</span>
              </div>
              <p className="mt-3 text-sm text-slate-500 leading-relaxed">
                Nền tảng mua sắm thiết bị công nghệ chính hãng hàng đầu, mang lại trải nghiệm tối ưu nhất cho người dùng.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Sản phẩm</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><Link href="/" className="hover:text-blue-600 transition">Laptop & Máy tính</Link></li>
                <li><Link href="/" className="hover:text-blue-600 transition">Điện thoại di động</Link></li>
                <li><Link href="/" className="hover:text-blue-600 transition">Âm thanh & Tai nghe</Link></li>
                <li><Link href="/" className="hover:text-blue-600 transition">Phụ kiện công nghệ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Chính sách</h4>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                <li><a href="#" className="hover:text-blue-600 transition">Chính sách bảo hành</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Đổi trả trong 30 ngày</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Vận chuyển & Giao hàng</a></li>
                <li><a href="#" className="hover:text-blue-600 transition">Bảo mật thông tin</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900">Dành cho Quản trị</h4>
              <p className="mt-4 text-sm text-slate-500">
                Đăng nhập vào hệ thống bảng điều khiển để quản lý sản phẩm, đơn hàng và khách hàng.
              </p>
              <Link
                href="/admin"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition shadow-sm"
              >
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Vào Admin Portal
              </Link>
            </div>
          </div>
          <div className="mt-12 border-t border-slate-100 pt-6 text-center text-xs text-slate-400">
            © 2026 TechStore. Dự án mẫu phân quyền User & Admin Next.js App Router kết hợp Spring Boot Security.
          </div>
        </div>
      </footer>
    </div>
  );
}
