'use client'

import { useState } from 'react'
import Link from 'next/link'
import CartIcon from '@/components/CartIcon'
import ThemeToggle from '@/components/ThemeToggle'

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 h-12 flex items-center justify-between">
          {/* 로고 */}
          <Link href="/" className="flex items-center gap-2 text-[var(--fg)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1C8 1 4 4 4 8a4 4 0 0 0 8 0c0-4-4-7-4-7Z" fill="currentColor" opacity="0.15"/>
              <path d="M8 1C8 1 4 4 4 8a4 4 0 0 0 8 0c0-4-4-7-4-7Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
              <path d="M8 5v6M5.5 7.5C6.5 6.8 7.2 6.5 8 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            <span className="text-sm font-semibold tracking-tight">논산마켓</span>
          </Link>

          {/* 데스크탑 내비게이션 */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors tracking-wide">
              키트 둘러보기
            </Link>
            <CartIcon />
            <ThemeToggle />
          </nav>

          {/* 모바일 */}
          <div className="flex md:hidden items-center gap-3">
            <CartIcon />
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="메뉴"
              className="text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div className="absolute inset-0 bg-black/30" onClick={() => setMenuOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-56 bg-[var(--bg)] border-l border-[var(--border)] flex flex-col">
            <div className="flex items-center justify-between px-6 h-12 border-b border-[var(--border)]">
              <span className="text-xs tracking-widest uppercase text-[var(--muted)]">메뉴</span>
              <button onClick={() => setMenuOpen(false)} className="text-[var(--muted)] hover:text-[var(--fg)]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
            <nav className="p-6 space-y-4">
              {[{ href: '/', label: '키트 둘러보기' }, { href: '/cart', label: '장바구니' }].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
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
