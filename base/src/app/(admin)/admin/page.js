import { ADMIN_STATS, RECENT_ORDERS, PRODUCTS, formatVND } from "@/data/mockData";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Package,
  Plus,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Top Welcome Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Tổng quan Hệ thống
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Xem nhanh chỉ số bán hàng và tình trạng đơn hàng hôm nay.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/products"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-blue-500 transition"
          >
            <Plus className="h-4 w-4" />
            Thêm sản phẩm mới
          </Link>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ADMIN_STATS.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-slate-800 bg-slate-950/60 p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-400">
                {stat.title}
              </span>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold ${
                  stat.isPositive
                    ? "bg-emerald-500/10 text-emerald-400"
                    : "bg-rose-500/10 text-rose-400"
                }`}
              >
                {stat.isPositive ? (
                  <TrendingUp className="h-3 w-3" />
                ) : (
                  <TrendingDown className="h-3 w-3" />
                )}
                {stat.change}
              </span>
            </div>
            <p className="mt-3 text-2xl font-extrabold text-white">
              {stat.value}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">{stat.time}</p>
          </div>
        ))}
      </div>

      {/* Recent Orders & Quick Stock Alerts */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Orders Table */}
        <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6 lg:col-span-2">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-white">
                Đơn hàng gần đây
              </h2>
              <p className="text-xs text-slate-400">
                Cập nhật tự động theo thời gian thực
              </p>
            </div>
            <button className="text-xs font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
              Xem tất cả <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-800/80 text-slate-400">
                <tr>
                  <th className="pb-3 font-semibold">Mã đơn</th>
                  <th className="pb-3 font-semibold">Khách hàng</th>
                  <th className="pb-3 font-semibold">Sản phẩm</th>
                  <th className="pb-3 font-semibold">Tổng tiền</th>
                  <th className="pb-3 font-semibold">Trạng thái</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 text-slate-300">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-900/50">
                    <td className="py-3 font-mono font-medium text-blue-400">
                      {order.id}
                    </td>
                    <td className="py-3">
                      <p className="font-semibold text-slate-200">
                        {order.customer}
                      </p>
                      <p className="text-[11px] text-slate-500">
                        {order.email}
                      </p>
                    </td>
                    <td className="py-3 text-slate-300 truncate max-w-[150px]">
                      {order.product}
                    </td>
                    <td className="py-3 font-semibold text-slate-100">
                      {formatVND(order.total)}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          order.status === "Đã giao"
                            ? "bg-emerald-500/10 text-emerald-400"
                            : order.status === "Đang xử lý"
                            ? "bg-amber-500/10 text-amber-400"
                            : order.status === "Đã xác nhận"
                            ? "bg-blue-500/10 text-blue-400"
                            : "bg-rose-500/10 text-rose-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Low Stock & Fast Actions */}
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
            <h2 className="text-base font-bold text-white mb-4">
              Cảnh báo kho hàng
            </h2>
            <div className="space-y-3">
              {PRODUCTS.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-xl bg-slate-900 p-3 border border-slate-800/60"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-10 w-10 rounded-lg object-cover bg-slate-800 shrink-0"
                    />
                    <div className="truncate">
                      <p className="text-xs font-semibold text-slate-200 truncate">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {formatVND(item.price)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                      item.stock < 10
                        ? "bg-rose-500/10 text-rose-400"
                        : "bg-emerald-500/10 text-emerald-400"
                    }`}
                  >
                    Còn: {item.stock}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/admin/products"
              className="mt-4 block w-full rounded-xl border border-slate-800 bg-slate-900 py-2 text-center text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition"
            >
              Quản lý toàn bộ kho
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
