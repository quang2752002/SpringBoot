"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  Store,
  Bell,
  Search,
  ChevronRight,
  LogOut,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const { data: session } = useSession();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Quản lý Sản phẩm", href: "/admin/products", icon: Package },
    { label: "Đơn hàng", href: "/admin", icon: ShoppingBag },
    { label: "Khách hàng", href: "/admin", icon: Users },
    { label: "Cài đặt hệ thống", href: "/admin", icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-slate-900 text-slate-100">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950 p-4">
        {/* Brand */}
        <div className="flex items-center justify-between pb-6 pt-2 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-500/20 font-bold">
              A
            </div>
            <div>
              <span className="font-bold text-slate-100 text-base">Admin Portal</span>
              <span className="block text-[10px] text-blue-400 font-semibold tracking-wider uppercase">
                Enterprise v1.0
              </span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex-1 space-y-1">
          <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Menu Quản Trị
          </p>
          <nav className="mt-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800/80 hover:text-white transition group"
                >
                  <Icon className="h-4 w-4 text-slate-400 group-hover:text-blue-400 transition" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Back to Client Storefront Link & User Info */}
        <div className="mt-auto border-t border-slate-800 pt-4 space-y-3">
          <Link
            href="/"
            className="flex items-center justify-between rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-blue-400 hover:bg-slate-800 hover:text-blue-300 transition border border-slate-800"
          >
            <div className="flex items-center gap-2">
              <Store className="h-4 w-4" />
              <span>Xem Cửa Hàng User</span>
            </div>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>

          {/* Admin User Profile with Logout */}
          <div className="flex items-center justify-between rounded-xl bg-slate-900/60 p-2.5 border border-slate-800/80">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shrink-0">
                {session?.user?.name ? session.user.name.charAt(0).toUpperCase() : "A"}
              </div>
              <div className="truncate">
                <p className="truncate text-xs font-semibold text-slate-200">
                  {session?.user?.name || "Admin"}
                </p>
                <p className="truncate text-[10px] text-emerald-400 font-mono">
                  {session?.user?.role || "ROLE_ADMIN"}
                </p>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Đăng xuất"
              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg transition"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col pl-64">
        {/* Admin Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/80 backdrop-blur px-8">
          <div className="flex items-center gap-3 w-96">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Tìm nhanh đơn hàng, sản phẩm, email..."
                className="w-full rounded-lg border border-slate-800 bg-slate-900 py-1.5 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              />
              <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-slate-500" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              title="Thông báo"
              className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-slate-950" />
            </button>

            <div className="h-4 w-px bg-slate-800" />

            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-400 border border-emerald-500/20">
              ● Spring Security Authenticated
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-8 bg-slate-900">{children}</main>
      </div>
    </div>
  );
}
