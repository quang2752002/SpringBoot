"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        username,
        password,
        callbackUrl,
      });

      if (res?.error) {
        setErrorMsg("Tài khoản hoặc mật khẩu không chính xác!");
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setErrorMsg("Đã xảy ra lỗi khi kết nối hệ thống.");
    } finally {
      setLoading(false);
    }
  };

  const fillQuickAccount = (user, pass) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="w-full max-w-md space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50">
      <div className="text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-500/25">
          <Lock className="h-6 w-6" />
        </div>
        <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
          Đăng nhập hệ thống
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Kết nối trực tiếp với Spring Boot Security Authentication
        </p>
      </div>

      {errorMsg && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Tài khoản / Username
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập username..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pl-10 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Mật khẩu / Password
          </label>
          <div className="relative">
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu..."
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 pl-10 text-sm text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-sm font-semibold text-white shadow-md shadow-blue-500/20 hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Đang xác thực..." : "Đăng nhập ngay"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>

      {/* Quick Demo Test Buttons */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
          Tài khoản mẫu để test phân quyền:
        </p>
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => fillQuickAccount("admin", "admin123")}
            className="flex flex-col items-start rounded-xl border border-indigo-200 bg-indigo-50/50 p-2.5 text-left transition hover:bg-indigo-100/70"
          >
            <span className="text-xs font-bold text-indigo-900 flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-indigo-600" /> Admin
            </span>
            <span className="text-[10px] text-indigo-600 mt-0.5">
              Vào được /admin
            </span>
          </button>

          <button
            type="button"
            onClick={() => fillQuickAccount("user", "user123")}
            className="flex flex-col items-start rounded-xl border border-slate-200 bg-white p-2.5 text-left transition hover:bg-slate-100"
          >
            <span className="text-xs font-bold text-slate-800 flex items-center gap-1">
              <User className="h-3.5 w-3.5 text-slate-500" /> User thường
            </span>
            <span className="text-[10px] text-rose-500 mt-0.5">
              Bị chặn khi vào /admin
            </span>
          </button>
        </div>
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="text-xs font-medium text-slate-500 hover:text-blue-600 transition"
        >
          ← Quay lại trang chủ TechStore
        </Link>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12">
      <Suspense fallback={<div className="text-sm text-slate-500">Đang tải biểu mẫu...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
