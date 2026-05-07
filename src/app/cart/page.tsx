'use client'

import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import SiteHeader from '@/components/SiteHeader'

const DELIVERY_FEE = 3000
const FREE_DELIVERY_THRESHOLD = 50000

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotalPrice } = useCartStore()

  const totalPrice = getTotalPrice()
  const deliveryFee = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const finalPrice = totalPrice + deliveryFee

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />

      <main className="max-w-2xl mx-auto px-6 sm:px-8 py-12">
        <div className="flex items-baseline gap-3 mb-10">
          <h1 className="text-2xl font-black text-[var(--fg)]">장바구니</h1>
          {items.length > 0 && (
            <span className="text-sm text-[var(--muted)]">{items.length}종</span>
          )}
        </div>

        {/* 비어있을 때 */}
        {items.length === 0 && (
          <div className="py-24 text-center">
            <p className="text-[var(--muted)] text-sm mb-6">장바구니가 비어있습니다.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs tracking-widest uppercase text-[var(--muted)] hover:text-[var(--fg)] transition-colors group"
            >
              <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
              키트 둘러보기
            </Link>
          </div>
        )}

        {/* 아이템 목록 */}
        {items.length > 0 && (
          <>
            <ul className="divide-y divide-[var(--border)] mb-10">
              {items.map((item) => {
                const lineKey = `${item.productId}::${item.size ?? ''}::${item.color ?? ''}`
                return (
                  <li key={lineKey} className="py-6 flex gap-4 items-start">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--fg)] truncate">{item.name}</p>
                      {item.size && (
                        <p className="mt-1 text-xs text-[var(--muted)]">{item.size}</p>
                      )}
                      <p className="mt-2 text-sm font-semibold text-[var(--fg)]">
                        {(item.price * item.quantity).toLocaleString('ko-KR')}원
                      </p>
                      <p className="text-xs text-[var(--muted)]">
                        {item.price.toLocaleString('ko-KR')}원 × {item.quantity}
                      </p>
                    </div>

                    {/* 수량 조절 */}
                    <div className="flex items-center border border-[var(--border)] shrink-0">
                      <button
                        onClick={() =>
                          item.quantity <= 1
                            ? removeItem(item.productId, item.size, item.color)
                            : updateQuantity(item.productId, item.quantity - 1, item.size, item.color)
                        }
                        className="w-9 h-9 text-[var(--muted)] hover:text-[var(--fg)] transition-colors text-base"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm text-[var(--fg)]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1, item.size, item.color)
                        }
                        className="w-9 h-9 text-[var(--muted)] hover:text-[var(--fg)] transition-colors text-base"
                      >
                        +
                      </button>
                    </div>

                    {/* 삭제 */}
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="text-[var(--border)] hover:text-[var(--muted)] transition-colors shrink-0 pt-1"
                      aria-label="삭제"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* 주문 요약 */}
            <div className="border-t border-[var(--border)] pt-6 space-y-3">
              <div className="flex justify-between text-sm text-[var(--muted)]">
                <span>상품 금액</span>
                <span>{totalPrice.toLocaleString('ko-KR')}원</span>
              </div>
              <div className="flex justify-between text-sm text-[var(--muted)]">
                <span>배송비</span>
                <span>{deliveryFee === 0 ? '무료' : `${deliveryFee.toLocaleString('ko-KR')}원`}</span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-xs text-[var(--muted)]">
                  {(FREE_DELIVERY_THRESHOLD - totalPrice).toLocaleString('ko-KR')}원 더 담으면 무료배송
                </p>
              )}

              <div className="border-t border-[var(--border)] pt-4 flex justify-between items-baseline">
                <span className="text-sm font-semibold text-[var(--fg)]">총 결제금액</span>
                <span className="text-xl font-black text-[var(--fg)]">
                  {finalPrice.toLocaleString('ko-KR')}원
                </span>
              </div>

              <Link
                href="/checkout"
                className="mt-4 block w-full py-3.5 text-center text-xs tracking-widest uppercase border border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] hover:bg-transparent hover:text-[var(--fg)] transition-all duration-200"
              >
                주문하기
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
