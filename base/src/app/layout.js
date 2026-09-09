import localFont from "next/font/local";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "TechZone - Mua sắm công nghệ & Quản trị",
  description: "Hệ thống mua sắm thiết bị công nghệ & bảng điều khiển quản trị",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className="h-full bg-slate-50 text-slate-900">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col font-sans`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
