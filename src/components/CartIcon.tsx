'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'

export default function CartIcon() {
  const count = useCartStore((state) => state.getTotalCount())

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors"
    >
      {/* 쇼핑백 아이콘 */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>

      <span>장바구니</span>

      {/* 아이템 수 배지 */}
      {count > 0 && (
        <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-black text-white text-[10px] font-bold leading-none">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </Link>
  )
}
