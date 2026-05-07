'use client'

import { useState, useEffect, useRef, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCartStore, type CartItem } from '@/store/cartStore'
import SiteHeader from '@/components/SiteHeader'
import { trackEvent } from '@/lib/analytics'

// ── 타입 ──────────────────────────────────────────────
type ShippingInfo = {
  name: string
  email: string
  phone: string
  zipCode: string
  address: string
  detailAddress: string
}

type FormErrors = Partial<Record<keyof ShippingInfo, string>>

// ── 상수 ──────────────────────────────────────────────
const DELIVERY_FEE = 3000
const FREE_DELIVERY_THRESHOLD = 50000

const EMPTY_FORM: ShippingInfo = {
  name: '',
  email: '',
  phone: '',
  zipCode: '',
  address: '',
  detailAddress: '',
}

// ── 유효성 검사 ────────────────────────────────────────
function validate(info: ShippingInfo): FormErrors {
  const errors: FormErrors = {}

  if (info.name.trim().length < 2) errors.name = '이름은 2자 이상 입력해주세요.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(info.email)) errors.email = '올바른 이메일 형식을 입력해주세요.'
  if (!/^01[016789]-\d{3,4}-\d{4}$/.test(info.phone)) errors.phone = '전화번호 형식: 010-0000-0000'
  if (!/^\d{5}$/.test(info.zipCode)) errors.zipCode = '우편번호 5자리를 입력해주세요.'
  if (info.address.trim().length < 1) errors.address = '주소를 입력해주세요.'
  if (info.detailAddress.trim().length < 1) errors.detailAddress = '상세주소를 입력해주세요.'

  return errors
}

// ── 주문 아이템 행 ─────────────────────────────────────
function OrderItemRow({ item }: { item: CartItem }) {
  return (
    <li className="flex justify-between items-start gap-3 py-3">
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
        {(item.size || item.color) && (
          <p className="text-xs text-gray-400 mt-0.5">
            {[item.size && `사이즈: ${item.size}`, item.color && `색상: ${item.color}`]
              .filter(Boolean)
              .join(' | ')}
          </p>
        )}
        <p className="text-xs text-gray-400 mt-0.5">× {item.quantity}개</p>
      </div>
      <p className="text-sm font-semibold text-gray-900 shrink-0">
        {(item.price * item.quantity).toLocaleString('ko-KR')}원
      </p>
    </li>
  )
}

// ── 폼 필드 ───────────────────────────────────────────
function Field({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
}: {
  label: string
  id: keyof ShippingInfo
  type?: string
  placeholder?: string
  value: string
  error?: string
  touched: boolean
  onChange: (v: string) => void
  onBlur: () => void
}) {
  const hasError = touched && error

  return (
    <div>
      <label htmlFor={id} className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
        {label} <span className="text-red-400">*</span>
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        className={[
          'w-full px-3.5 py-2.5 rounded-xl border text-sm text-gray-900 outline-none transition-all duration-150',
          'placeholder:text-gray-300',
          hasError
            ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-100'
            : 'border-gray-200 bg-white focus:border-black focus:ring-2 focus:ring-black/5',
        ].join(' ')}
      />
      {hasError && (
        <p className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

// ── 메인 페이지 ────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter()
  const { items, getTotalPrice, clearCart } = useCartStore()

  const [form, setForm] = useState<ShippingInfo>(EMPTY_FORM)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof ShippingInfo, boolean>>>({})
  const [submitting, setSubmitting] = useState(false)
  const trackedRef = useRef(false)

  // 체크아웃 페이지 진입 시 begin_checkout 1회 추적
  useEffect(() => {
    if (trackedRef.current || items.length === 0) return
    trackedRef.current = true
    trackEvent('begin_checkout', { totalPrice: getTotalPrice(), itemCount: items.length })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const totalPrice = getTotalPrice()
  const deliveryFee = totalPrice >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE
  const finalPrice = totalPrice + deliveryFee

  const setField = (key: keyof ShippingInfo) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
    // 이미 터치된 필드는 입력 즉시 재검사
    if (touched[key]) {
      const next = { ...form, [key]: value }
      const errs = validate(next)
      setErrors((prev) => ({ ...prev, [key]: errs[key] }))
    }
  }

  const touchField = (key: keyof ShippingInfo) => () => {
    setTouched((prev) => ({ ...prev, [key]: true }))
    const errs = validate(form)
    setErrors((prev) => ({ ...prev, [key]: errs[key] }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // 전체 필드 터치 처리 → 모든 에러 노출
    const allTouched = Object.fromEntries(
      (Object.keys(EMPTY_FORM) as (keyof ShippingInfo)[]).map((k) => [k, true]),
    ) as Record<keyof ShippingInfo, boolean>
    setTouched(allTouched)

    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)

    // 결제 처리 느낌 — 1초 딜레이
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const orderId = `ORD-${Date.now()}`
    const order = {
      orderId,
      items,
      totalPrice,
      deliveryFee,
      shippingInfo: form,
      createdAt: new Date().toISOString(),
    }

    // localStorage에 주문 이력 누적 저장
    const prev = JSON.parse(localStorage.getItem('orders') ?? '[]')
    localStorage.setItem('orders', JSON.stringify([...prev, order]))

    clearCart()
    router.push(`/checkout/complete?orderId=${orderId}`)
  }

  // 장바구니 비어있을 때
  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-sm">장바구니가 비어있습니다.</p>
        <Link
          href="/"
          className="px-5 py-2.5 rounded-xl bg-black text-white text-sm font-semibold hover:bg-gray-800 transition-colors"
        >
          쇼핑 계속하기
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors mb-6"
        >
          <span>←</span>
          <span>장바구니로</span>
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">주문서</h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-6">

            {/* ── 좌: 주문 상품 요약 ── */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h2 className="text-sm font-bold text-gray-900 mb-1">
                  주문 상품 <span className="text-gray-400 font-normal">({items.length}종)</span>
                </h2>
                <ul className="divide-y divide-gray-50">
                  {items.map((item) => (
                    <OrderItemRow
                      key={`${item.productId}::${item.size ?? ''}::${item.color ?? ''}`}
                      item={item}
                    />
                  ))}
                </ul>
              </div>

              {/* 금액 요약 */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-2.5">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>상품 금액</span>
                  <span>{totalPrice.toLocaleString('ko-KR')}원</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>배송비</span>
                  <span>
                    {deliveryFee === 0
                      ? <span className="text-emerald-600 font-medium">무료</span>
                      : `${deliveryFee.toLocaleString('ko-KR')}원`}
                  </span>
                </div>
                <div className="border-t border-gray-100 pt-2.5 flex justify-between items-center">
                  <span className="font-bold text-gray-900">최종 결제금액</span>
                  <span className="text-xl font-black text-black">
                    {finalPrice.toLocaleString('ko-KR')}원
                  </span>
                </div>
              </div>
            </div>

            {/* ── 우: 배송 정보 폼 ── */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="text-sm font-bold text-gray-900 mb-5">배송 정보</h2>

              <div className="space-y-4">
                <Field
                  label="이름"
                  id="name"
                  placeholder="홍길동"
                  value={form.name}
                  error={errors.name}
                  touched={!!touched.name}
                  onChange={setField('name')}
                  onBlur={touchField('name')}
                />
                <Field
                  label="이메일"
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  error={errors.email}
                  touched={!!touched.email}
                  onChange={setField('email')}
                  onBlur={touchField('email')}
                />
                <Field
                  label="전화번호"
                  id="phone"
                  type="tel"
                  placeholder="010-0000-0000"
                  value={form.phone}
                  error={errors.phone}
                  touched={!!touched.phone}
                  onChange={setField('phone')}
                  onBlur={touchField('phone')}
                />
                <Field
                  label="우편번호"
                  id="zipCode"
                  placeholder="12345"
                  value={form.zipCode}
                  error={errors.zipCode}
                  touched={!!touched.zipCode}
                  onChange={setField('zipCode')}
                  onBlur={touchField('zipCode')}
                />
                <Field
                  label="주소"
                  id="address"
                  placeholder="서울특별시 강남구 테헤란로"
                  value={form.address}
                  error={errors.address}
                  touched={!!touched.address}
                  onChange={setField('address')}
                  onBlur={touchField('address')}
                />
                <Field
                  label="상세주소"
                  id="detailAddress"
                  placeholder="아파트 동·호수, 층 등"
                  value={form.detailAddress}
                  error={errors.detailAddress}
                  touched={!!touched.detailAddress}
                  onChange={setField('detailAddress')}
                  onBlur={touchField('detailAddress')}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className={[
                  'mt-6 w-full py-4 rounded-xl text-sm font-bold transition-all duration-200',
                  submitting
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-black text-white hover:bg-gray-800 active:scale-[0.98]',
                ].join(' ')}
              >
                {submitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                    </svg>
                    처리 중...
                  </span>
                ) : (
                  `결제하기 — ${finalPrice.toLocaleString('ko-KR')}원`
                )}
              </button>

              <p className="mt-3 text-center text-xs text-gray-400">
                이 쇼핑몰은 포트폴리오용입니다. 실제 결제가 발생하지 않습니다.
              </p>
            </div>

          </div>
        </form>
      </main>
    </div>
  )
}
