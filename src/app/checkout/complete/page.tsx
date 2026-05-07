'use client'

// useSearchParams()는 Suspense 없이 page.tsx에서 직접 쓰면 빌드 경고 발생
// → 실제 콘텐츠를 별도 컴포넌트로 분리하고 Suspense로 감쌈
import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import type { CartItem } from '@/store/cartStore'
import { trackEvent } from '@/lib/analytics'

// ── localStorage에서 읽어올 주문 타입 ─────────────────
type Order = {
  orderId: string
  items: CartItem[]
  totalPrice: number
  deliveryFee: number
  shippingInfo: {
    name: string
    email: string
    phone: string
    zipCode: string
    address: string
    detailAddress: string
  }
  createdAt: string
}

// ── 주문 완료 본문 ────────────────────────────────────
function CompleteContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('orderId') ?? ''
  const [order, setOrder] = useState<Order | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // 마운트 직후 애니메이션 트리거
    const raf = requestAnimationFrame(() => setVisible(true))

    // localStorage에서 해당 주문 조회
    try {
      const orders: Order[] = JSON.parse(localStorage.getItem('orders') ?? '[]')
      const found = orders.find((o) => o.orderId === orderId)
      setOrder(found ?? null)
      if (found) {
        trackEvent('purchase_complete', {
          orderId: found.orderId,
          totalPrice: found.totalPrice + found.deliveryFee,
        })
      }
    } catch {
      // localStorage 파싱 실패 시 무시
    }

    return () => cancelAnimationFrame(raf)
  }, [orderId])

  const finalPrice = order ? order.totalPrice + order.deliveryFee : 0

  return (
    <div
      className={[
        'min-h-screen bg-white flex flex-col transition-all duration-700 ease-out',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      ].join(' ')}
    >
      {/* 헤더 */}
      <header className="border-b border-gray-100 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center">
          <Link href="/" className="flex items-center gap-1.5 font-black text-black">
            <span>🍓</span><span>논산마켓</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-xl w-full mx-auto px-4 sm:px-6 py-16">
        {/* 성공 아이콘 */}
        <div
          className={[
            'flex flex-col items-center text-center mb-10 transition-all duration-500 delay-100',
            visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90',
          ].join(' ')}
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1 className="text-2xl font-black text-gray-900 mb-2">
            주문이 완료되었습니다! 🎉
          </h1>
          <p className="text-sm text-gray-500">
            주문해 주셔서 감사합니다. 빠르게 준비해 드릴게요.
          </p>
        </div>

        {/* 주문 번호 */}
        <div
          className={[
            'bg-gray-50 rounded-2xl p-5 mb-5 text-center transition-all duration-500 delay-200',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
          ].join(' ')}
        >
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">주문 번호</p>
          <p className="text-lg font-black text-black tracking-tight">{orderId || '—'}</p>
          {order && (
            <p className="text-xs text-gray-400 mt-1">
              {new Date(order.createdAt).toLocaleString('ko-KR')}
            </p>
          )}
        </div>

        {/* 주문 상품 요약 */}
        {order && (
          <div
            className={[
              'bg-white border border-gray-100 rounded-2xl p-5 mb-5 transition-all duration-500 delay-300',
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
            ].join(' ')}
          >
            <h2 className="text-sm font-bold text-gray-900 mb-3">
              주문 상품 <span className="font-normal text-gray-400">({order.items.length}종)</span>
            </h2>
            <ul className="space-y-2.5">
              {order.items.map((item) => (
                <li
                  key={`${item.productId}::${item.size ?? ''}::${item.color ?? ''}`}
                  className="flex justify-between items-start gap-2"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-800 truncate">{item.name}</p>
                    {(item.size || item.color) && (
                      <p className="text-xs text-gray-400">
                        {[item.size && `사이즈: ${item.size}`, item.color && `색상: ${item.color}`]
                          .filter(Boolean)
                          .join(' | ')}
                      </p>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 shrink-0">
                    {(item.price * item.quantity).toLocaleString('ko-KR')}원
                  </span>
                </li>
              ))}
            </ul>

            <div className="border-t border-gray-100 mt-3 pt-3 space-y-1.5">
              <div className="flex justify-between text-sm text-gray-500">
                <span>상품 금액</span>
                <span>{order.totalPrice.toLocaleString('ko-KR')}원</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>배송비</span>
                <span>
                  {order.deliveryFee === 0
                    ? <span className="text-emerald-600 font-medium">무료</span>
                    : `${order.deliveryFee.toLocaleString('ko-KR')}원`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-gray-900">결제 금액</span>
                <span className="text-base font-black text-black">
                  {finalPrice.toLocaleString('ko-KR')}원
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 배송 정보 */}
        {order && (
          <div
            className={[
              'bg-white border border-gray-100 rounded-2xl p-5 mb-8 transition-all duration-500 delay-[400ms]',
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
            ].join(' ')}
          >
            <h2 className="text-sm font-bold text-gray-900 mb-3">배송 정보</h2>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{order.shippingInfo.name} · {order.shippingInfo.phone}</p>
              <p className="text-gray-400">{order.shippingInfo.zipCode}</p>
              <p>{order.shippingInfo.address}</p>
              <p>{order.shippingInfo.detailAddress}</p>
            </div>
          </div>
        )}

        {/* 쇼핑 계속하기 */}
        <div
          className={[
            'transition-all duration-500 delay-500',
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
          ].join(' ')}
        >
          <Link
            href="/"
            className="block w-full py-4 rounded-xl bg-black text-white text-sm font-bold text-center
              hover:bg-gray-800 active:scale-[0.98] transition-all duration-150"
          >
            쇼핑 계속하기
          </Link>
        </div>
      </main>
    </div>
  )
}

// ── 로딩 폴백 ─────────────────────────────────────────
function LoadingState() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-2 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-400">주문 정보를 불러오는 중...</p>
      </div>
    </div>
  )
}

// ── 페이지 — Suspense로 useSearchParams 안전하게 래핑 ──
export default function CheckoutCompletePage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CompleteContent />
    </Suspense>
  )
}
