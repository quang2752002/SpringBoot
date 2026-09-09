"use client";

import { useState } from "react";
import { PRODUCTS, CATEGORIES, formatVND } from "@/data/mockData";
import {
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  ExternalLink,
  Package,
} from "lucide-react";
import Link from "next/link";

export default function AdminProductsPage() {
  const [productsList, setProductsList] = useState(PRODUCTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filtered = productsList.filter((item) => {
    const matchCat =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleDelete = (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
      setProductsList(productsList.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Quản lý Sản phẩm
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Danh sách toàn bộ sản phẩm đang hiển thị trên cửa hàng TechStore.
          </p>
        </div>

        <button
          onClick={() =>
            alert("Tính năng Thêm sản phẩm sẽ mở modal/form nhập liệu tại đây.")
          }
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-500 transition shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Thêm sản phẩm mới
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-center justify-between rounded-2xl border border-slate-800 bg-slate-950/60 p-4">
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên sản phẩm..."
            className="w-full rounded-lg border border-slate-800 bg-slate-900 py-2 pl-9 pr-4 text-xs text-slate-200 placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="rounded-lg border border-slate-800 bg-slate-900 py-2 px-3 text-xs text-slate-200 focus:border-blue-500 focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900/50 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-semibold">Sản phẩm</th>
                <th className="px-6 py-4 font-semibold">Danh mục</th>
                <th className="px-6 py-4 font-semibold">Đơn giá</th>
                <th className="px-6 py-4 font-semibold">Tồn kho</th>
                <th className="px-6 py-4 font-semibold">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40 text-slate-300">
              {filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/40">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-10 w-10 rounded-lg object-cover bg-slate-800"
                      />
                      <div>
                        <p className="font-semibold text-white">{item.name}</p>
                        <p className="text-[11px] text-slate-500 font-mono">
                          ID: #{item.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 capitalize text-slate-400">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {formatVND(item.price)}
                  </td>
                  <td className="px-6 py-4 font-mono">{item.stock}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                        item.stock > 10
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-amber-500/10 text-amber-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/products/${item.id}`}
                        target="_blank"
                        title="Xem trang bán lẻ"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => alert(`Chỉnh sửa: ${item.name}`)}
                        title="Chỉnh sửa"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-blue-400 transition"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        title="Xóa"
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-rose-400 transition"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    <Package className="mx-auto h-8 w-8 text-slate-600 mb-2" />
                    Không tìm thấy sản phẩm nào phù hợp
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
