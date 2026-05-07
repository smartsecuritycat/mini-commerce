import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CartProvider from "@/components/CartProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mini Commerce — 브랜드 굿즈 쇼핑몰",
  description: "티셔츠, 후드, 머그컵, 에코백 브랜드 굿즈를 구매하세요.",
};

// localStorage를 읽어 <html>에 .dark 클래스를 붙이는 인라인 스크립트
// React hydration 전에 실행되어 다크모드 깜빡임(FOUC)을 방지
const THEME_SCRIPT = `
try{
  var t=localStorage.getItem('theme');
  var d=window.matchMedia('(prefers-color-scheme:dark)').matches;
  if(t==='dark'||(t===null&&d))document.documentElement.classList.add('dark');
}catch(e){}
`.trim();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      // suppressHydrationWarning: 서버/클라이언트 간 class 불일치 경고 억제
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* eslint-disable-next-line @next/next/no-before-interactive-script-component */}
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-[var(--bg)] text-[var(--fg)]">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
