"use client";

import { useState } from "react";
import Link from "next/link";
import { CATEGORIES, PRODUCTS, formatVND } from "@/data/mockData";
import { Star, ShoppingCart, ArrowRight, Sparkles, Shield, Truck, RotateCcw } from "lucide-react";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/50 via-white to-slate-50 border-b border-slate-200/60 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-blue-50 px-3.5 py-1 text-xs font-semibold text-blue-700">
                <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                Bộ sưu tập công nghệ mới 2026
              </div>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                Khám phá Công Nghệ{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Đỉnh Cao
                </span>
              </h1>
              <p className="mt-5 text-base text-slate-600 sm:text-lg leading-relaxed">
                Trải nghiệm những thiết bị công nghệ chính hãng mới nhất với hiệu năng vượt trội, chế độ bảo hành 1 đổi 1 và ưu đãi đặc quyền.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="#products"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:bg-blue-700 hover:shadow-blue-500/35"
                >
                  Mua sắm ngay
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
                >
                  Xem trang Quản trị (Admin)
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200/60 pt-8 text-slate-600">
                <div className="flex items-center gap-2.5">
                  <Truck className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-medium">Giao hàng nhanh 2h</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Shield className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-medium">Chính hãng 100%</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="h-5 w-5 text-blue-600 shrink-0" />
                  <span className="text-xs font-medium">30 ngày đổi trả</span>
                </div>
              </div>
            </div>

            {/* Featured Hero Card */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/50">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80"
                    alt="MacBook Pro"
                    className="h-full w-full object-cover object-center transition duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
                    GIẢM 5.000.000₫
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                      Sản phẩm nổi bật
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                      <Star className="h-3.5 w-3.5 fill-current" />
                      4.9 (128 nhận xét)
                    </div>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-slate-900">
                    MacBook Pro 16 M3 Max
                  </h3>
                  <div className="mt-3 flex items-baseline gap-3">
                    <span className="text-2xl font-extrabold text-blue-600">
                      79.990.000 ₫
                    </span>
                    <span className="text-sm text-slate-400 line-through">
                      85.000.000 ₫
                    </span>
                  </div>
                  <Link
                    href="/products/1"
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Xem chi tiết & Đặt mua
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product List Section */}
      <section id="products" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Danh Sách Sản Phẩm
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Các thiết bị mới nhất được chọn lọc kỹ càng từ các thương hiệu hàng đầu.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/50"
            >
              {/* Product Image */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-105"
                />
                <span className="absolute top-3 right-3 rounded-full bg-slate-900/80 backdrop-blur px-2.5 py-1 text-[11px] font-medium text-white">
                  {product.status}
                </span>
              </div>

              {/* Product Info */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span className="capitalize font-medium text-blue-600">
                    {product.category}
                  </span>
                  <span className="flex items-center gap-1 text-amber-500 font-semibold">
                    <Star className="h-3 w-3 fill-current" />
                    {product.rating} ({product.reviewsCount})
                  </span>
                </div>

                <h3 className="mt-2 text-base font-bold text-slate-900 group-hover:text-blue-600 transition">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>

                <p className="mt-2 line-clamp-2 text-xs text-slate-500 leading-relaxed">
                  {product.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                  <div>
                    <span className="text-lg font-bold text-slate-900">
                      {formatVND(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="block text-xs text-slate-400 line-through">
                        {formatVND(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/products/${product.id}`}
                    className="inline-flex items-center justify-center rounded-xl bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-600 hover:bg-blue-600 hover:text-white transition"
                  >
                    Chi tiết
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
