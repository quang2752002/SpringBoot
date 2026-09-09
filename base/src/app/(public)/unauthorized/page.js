import Link from "next/link";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center px-4 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-rose-100 text-rose-600 shadow-lg shadow-rose-500/10">
        <ShieldAlert className="h-10 w-10" />
      </div>

      <span className="mt-6 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700 uppercase tracking-wider">
        403 - Quyền truy cập bị từ chối
      </span>

      <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
        Bạn không có quyền vào Khu vực Admin!
      </h1>

      <p className="mt-3 max-w-md text-sm text-slate-500 leading-relaxed">
        Tài khoản hiện tại của bạn thuộc nhóm người dùng thông thường (`ROLE_USER`). 
        Hệ thống phân quyền (Spring Security) chỉ cho phép tài khoản có vai trò `ROLE_ADMIN` truy cập trang này.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-2.5 text-xs font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          Về trang chủ
        </Link>
        <Link
          href="/login"
          className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-slate-800 transition"
        >
          <LogIn className="h-4 w-4" />
          Đổi tài khoản Admin khác
        </Link>
      </div>
    </div>
  );
}
