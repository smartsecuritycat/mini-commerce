'use client'

import { useState } from 'react'
import Link from 'next/link'
import CartIcon from '@/components/CartIcon'
import ThemeToggle from '@/components/ThemeToggle'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* 로고 */}
          <Link
            href="/"
            className="flex items-center gap-1.5 font-black tracking-tight text-black dark:text-white"
          >
            <span className="text-lg">🌿</span>
            <span className="text-base">로컬마켓</span>
          </Link>

          {/* 데스크탑 내비게이션 */}
          <nav className="hidden md:flex items-center gap-5">
            <Link href="/" className="text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors">
              쇼핑
            </Link>
            <CartIcon />
            <ThemeToggle />
          </nav>

          {/* 모바일: 장바구니 + 테마 + 햄버거 */}
          <div className="flex md:hidden items-center gap-2">
            <CartIcon />
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="메뉴 열기"
              className="p-1.5 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* 모바일 슬라이드 메뉴 */}
      {menuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          {/* 딤 오버레이 */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          {/* 메뉴 패널 */}
          <div className="absolute right-0 top-0 h-full w-64 bg-white dark:bg-gray-950 shadow-2xl flex flex-col">
            {/* 패널 헤더 */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100 dark:border-gray-800 shrink-0">
              <span className="text-sm font-black uppercase tracking-widest text-black dark:text-white">
                메뉴
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 text-gray-400 hover:text-black dark:hover:text-white transition-colors"
                aria-label="메뉴 닫기"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* 메뉴 링크 */}
            <nav className="flex-1 p-4 space-y-1">
              {[
                { href: '/', label: '쇼핑' },
                { href: '/cart', label: '장바구니' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
