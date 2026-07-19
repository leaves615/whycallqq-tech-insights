import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { getSiteConfig } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WhyQQ 技术洞察 — AI 技术深度知识库",
  description: "基于 YouTube 频道 @whycallqq 的深度技术知识库，覆盖 AI 编程、模型评测、Agent 架构、行业趋势等领域的研究报告与对比分析",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white">
        {/* Top Nav */}
        <nav className="border-b border-gray-100 bg-white sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center gap-6">
            <Link href="/" className="font-bold text-gray-900 tracking-tight">
              WhyQQ 技术洞察
            </Link>
            <Link href="/reports" className="text-sm text-gray-500 hover:text-gray-900">
              全部报告
            </Link>
            <Link href="/category/ai-tools" className="text-sm text-gray-500 hover:text-gray-900">
              AI工具
            </Link>
            <Link href="/category/ai-models" className="text-sm text-gray-500 hover:text-gray-900">
              模型评测
            </Link>
            <Link href="/category/ai-agents" className="text-sm text-gray-500 hover:text-gray-900">
              Agent
            </Link>
          </div>
        </nav>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}