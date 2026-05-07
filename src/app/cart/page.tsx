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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          장바구니
          {items.length > 0 && (
            <span className="ml-2 text-base font-normal text-gray-400">
              ({items.length}종)
            </span>
          )}
        </h1>

        {/* ── 비어있을 때 ── */}
        {items.length === 0 && (
          <div className="py-24 flex flex-col items-center gap-4 text-center">
            <span className="text-5xl">🛒</span>
            <p className="text-gray-500 text-sm">장바구니가 비어있습니다.</p>
            <Link
              href="/"
              className="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              쇼핑 계속하기
            </Link>
          </div>
        )}

        {/* ── 아이템 목록 ── */}
        {items.length > 0 && (
          <>
            <ul className="divide-y divide-gray-100 mb-8">
              {items.map((item) => {
                const lineKey = `${item.productId}::${item.size ?? ''}::${item.color ?? ''}`
                return (
                  <li key={lineKey} className="py-5 flex gap-4 items-start">
                    {/* 상품 정보 */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {item.name}
                      </p>
                      {(item.size || item.color) && (
                        <p className="mt-0.5 text-xs text-gray-400">
                          {[item.size && `사이즈: ${item.size}`, item.color && `색상: ${item.color}`]
                            .filter(Boolean)
                            .join(' | ')}
                        </p>
                      )}
                      <p className="mt-1 text-sm font-bold text-gray-900">
                        {(item.price * item.quantity).toLocaleString('ko-KR')}원
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.price.toLocaleString('ko-KR')}원 × {item.quantity}개
                      </p>
                    </div>

                    {/* 수량 조절 */}
                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shrink-0">
                      <button
                        onClick={() =>
                          item.quantity <= 1
                            ? removeItem(item.productId, item.size, item.color)
                            : updateQuantity(item.productId, item.quantity - 1, item.size, item.color)
                        }
                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-base"
                        aria-label="수량 감소"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm font-semibold text-gray-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1, item.size, item.color)
                        }
                        className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors text-base"
                        aria-label="수량 증가"
                      >
                        +
                      </button>
                    </div>

                    {/* 삭제 */}
                    <button
                      onClick={() => removeItem(item.productId, item.size, item.color)}
                      className="shrink-0 p-1.5 text-gray-300 hover:text-red-400 transition-colors"
                      aria-label="상품 삭제"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6l-1 14H6L5 6" />
                        <path d="M10 11v6M14 11v6" />
                        <path d="M9 6V4h6v2" />
                      </svg>
                    </button>
                  </li>
                )
              })}
            </ul>

            {/* ── 주문 요약 ── */}
            <div className="rounded-2xl bg-gray-50 p-6">
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>상품 금액</span>
                  <span>{totalPrice.toLocaleString('ko-KR')}원</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>배송비</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-medium">무료</span>
                    ) : (
                      `${deliveryFee.toLocaleString('ko-KR')}원`
                    )}
                  </span>
                </div>
                {deliveryFee > 0 && (
                  <p className="text-[11px] text-gray-400">
                    {(FREE_DELIVERY_THRESHOLD - totalPrice).toLocaleString('ko-KR')}원 더 담으면 무료배송
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-4 flex justify-between items-center mb-5">
                <span className="font-bold text-gray-900">총 결제금액</span>
                <span className="text-xl font-black text-black">
                  {finalPrice.toLocaleString('ko-KR')}원
                </span>
              </div>

              <Link
                href="/checkout"
                className="block w-full py-4 rounded-xl bg-black text-white text-sm font-bold text-center
                  hover:bg-gray-800 active:scale-[0.98] transition-all duration-150"
              >
                주문하기 ({items.length}종)
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
