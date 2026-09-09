import Link from "next/link";
import { PRODUCTS, formatVND } from "@/data/mockData";
import { ArrowLeft, Star, ShieldCheck, Truck, RotateCcw, ShoppingCart, Heart } from "lucide-react";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ params }) {
  const product = PRODUCTS.find((p) => p.id === params.id);

  if (!product) {
    return notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb / Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Quay lại danh sách sản phẩm
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Product Image Gallery Demo */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="aspect-square overflow-hidden rounded-xl bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Product Details & Actions */}
        <div className="flex flex-col">
          <div className="inline-flex items-center gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 capitalize">
              {product.category}
            </span>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              {product.status} (Còn {product.stock} chiếc)
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-extrabold text-slate-900 sm:text-4xl">
            {product.name}
          </h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-current"
                      : "text-slate-300"
                  }`}
                />
              ))}
              <span className="ml-1 text-sm font-bold text-slate-700">
                {product.rating}
              </span>
            </div>
            <span className="text-slate-300">|</span>
            <span className="text-sm text-slate-500">
              {product.reviewsCount} đánh giá từ khách hàng
            </span>
          </div>

          <div className="mt-6 rounded-2xl bg-slate-100/70 p-4">
            <div className="flex items-baseline gap-4">
              <span className="text-3xl font-extrabold text-blue-600">
                {formatVND(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-slate-400 line-through">
                  {formatVND(product.originalPrice)}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs text-slate-500">
              Giá đã bao gồm thuế VAT và bảo hành chính hãng 12 tháng.
            </p>
          </div>

          <p className="mt-6 text-sm text-slate-600 leading-relaxed">
            {product.description}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-500/25 hover:bg-blue-700 transition">
              <ShoppingCart className="h-4 w-4" />
              Thêm vào giỏ hàng
            </button>
            <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-5 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition">
              <Heart className="h-4 w-4 text-slate-400" />
              Lưu yêu thích
            </button>
          </div>

          {/* Benefits Box */}
          <div className="mt-8 grid grid-cols-1 gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3 text-xs text-slate-700">
              <Truck className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Giao hàng hỏa tốc trong 2 giờ tại nội thành Hà Nội & TP.HCM</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-700">
              <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Bảo hành chính hãng 12 tháng tại các trung tâm ủy quyền</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-700">
              <RotateCcw className="h-4 w-4 text-blue-600 shrink-0" />
              <span>Đổi mới trong 30 ngày nếu phát sinh lỗi từ nhà sản xuất</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
