'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getEventCounts, getAllEvents, clearEvents, type EventName, type AnalyticsEvent } from '@/lib/analytics'

// ── 퍼널 단계 정의 ────────────────────────────────────
const FUNNEL_STEPS: {
  key: EventName
  label: string
  color: string
  bgLight: string
  icon: string
}[] = [
  { key: 'view_product',      label: '상품 조회',     color: 'bg-blue-500',    bgLight: 'bg-blue-50',   icon: '👁' },
  { key: 'add_to_cart',       label: '장바구니 추가',  color: 'bg-indigo-500',  bgLight: 'bg-indigo-50', icon: '🛒' },
  { key: 'begin_checkout',    label: '체크아웃 시작',  color: 'bg-violet-500',  bgLight: 'bg-violet-50', icon: '📋' },
  { key: 'purchase_complete', label: '주문 완료',     color: 'bg-emerald-500', bgLight: 'bg-emerald-50',icon: '✅' },
]

// 전환율 계산 (분모 0 방지)
function convRate(numerator: number, denominator: number): string {
  if (denominator === 0) return '—'
  return `${((numerator / denominator) * 100).toFixed(1)}%`
}

// 상대 시간 표시
function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const s = Math.floor(diff / 1000)
  if (s < 60) return `${s}초 전`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}분 전`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}시간 전`
  return `${Math.floor(h / 24)}일 전`
}

// 이벤트명 한글 라벨
const EVENT_LABEL: Record<EventName, string> = {
  view_product: '상품 조회',
  add_to_cart: '장바구니 추가',
  begin_checkout: '체크아웃 시작',
  purchase_complete: '주문 완료',
}

// ── 공유 헤더 ─────────────────────────────────────────
function AdminHeader({ onLogout }: { onLogout: () => void }) {
  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-1.5 font-black text-black">
            <span>🌿</span><span className="text-base">로컬마켓</span>
          </Link>
          <span className="px-2 py-0.5 rounded-full bg-black text-white text-[10px] font-bold uppercase tracking-wider">
            Admin
          </span>
        </div>
        <button
          onClick={onLogout}
          className="text-xs text-gray-400 hover:text-black transition-colors"
        >
          로그아웃
        </button>
      </div>
    </header>
  )
}

// ── 어드민 탭 내비게이션 ───────────────────────────────
function AdminNav({ current }: { current: 'images' | 'analytics' }) {
  return (
    <div className="flex gap-1 border-b border-gray-100 mb-8">
      <Link
        href="/admin"
        className={[
          'px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors',
          current === 'images'
            ? 'border-black text-black'
            : 'border-transparent text-gray-400 hover:text-gray-700',
        ].join(' ')}
      >
        이미지 관리
      </Link>
      <Link
        href="/admin/analytics"
        className={[
          'px-4 py-2.5 text-sm font-semibold border-b-2 -mb-px transition-colors',
          current === 'analytics'
            ? 'border-black text-black'
            : 'border-transparent text-gray-400 hover:text-gray-700',
        ].join(' ')}
      >
        이벤트 분석
      </Link>
    </div>
  )
}

// ── 퍼널 바 한 줄 ─────────────────────────────────────
function FunnelRow({
  step,
  count,
  maxCount,
  conversionFrom,
  isLast,
}: {
  step: typeof FUNNEL_STEPS[number]
  count: number
  maxCount: number
  conversionFrom?: number // 이전 단계 카운트
  isLast: boolean
}) {
  const widthPct = maxCount === 0 ? 0 : (count / maxCount) * 100
  const selfPct = maxCount === 0 ? 0 : (count / maxCount) * 100

  return (
    <div>
      <div className="flex items-center gap-3">
        {/* 아이콘 + 라벨 */}
        <div className="w-36 shrink-0 flex items-center gap-2">
          <span className="text-base">{step.icon}</span>
          <span className="text-sm font-medium text-gray-700 truncate">{step.label}</span>
        </div>

        {/* 카운트 */}
        <div className="w-12 shrink-0 text-right">
          <span className="text-sm font-black text-gray-900">{count}</span>
          <span className="text-xs text-gray-400 ml-0.5">회</span>
        </div>

        {/* 바 */}
        <div className="flex-1 h-8 bg-gray-100 rounded-lg overflow-hidden">
          <div
            className={`h-full ${step.color} rounded-lg transition-all duration-700 ease-out flex items-center justify-end pr-2`}
            style={{ width: `${Math.max(widthPct, count > 0 ? 2 : 0)}%` }}
          >
            {widthPct >= 15 && (
              <span className="text-[11px] font-bold text-white">
                {selfPct.toFixed(1)}%
              </span>
            )}
          </div>
        </div>

        {/* 퍼센트 (바 밖) */}
        <div className="w-14 shrink-0 text-right">
          <span className="text-sm font-semibold text-gray-500">
            {selfPct.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* 전환율 화살표 */}
      {!isLast && (
        <div className="ml-[152px] mt-1 mb-1 flex items-center gap-1.5">
          <div className="w-px h-4 bg-gray-200 ml-1" />
          <span className="text-[11px] text-gray-400">
            전환율:{' '}
            <span className={conversionFrom !== undefined && count > 0 ? 'text-gray-700 font-semibold' : ''}>
              {conversionFrom !== undefined ? convRate(count, conversionFrom) : '—'}
            </span>
          </span>
        </div>
      )}
    </div>
  )
}

// ── 메인 대시보드 콘텐츠 ──────────────────────────────
function AnalyticsDashboard({ onLogout }: { onLogout: () => void }) {
  const [counts, setCounts] = useState<Record<EventName, number>>({
    view_product: 0,
    add_to_cart: 0,
    begin_checkout: 0,
    purchase_complete: 0,
  })
  const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>([])
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())
  const [clearing, setClearing] = useState(false)

  const loadData = useCallback(() => {
    setCounts(getEventCounts())
    setRecentEvents(getAllEvents().slice(-20).reverse()) // 최근 20개, 최신 순
    setLastUpdated(new Date())
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const handleClear = () => {
    if (!confirm('모든 이벤트 데이터를 초기화하시겠습니까? 되돌릴 수 없습니다.')) return
    setClearing(true)
    clearEvents()
    setTimeout(() => {
      loadData()
      setClearing(false)
    }, 300)
  }

  const maxCount = Math.max(...Object.values(counts), 1)

  // 전체 수익 계산 (purchase_complete 이벤트에서 totalPrice 합산)
  const totalRevenue = getAllEvents()
    .filter((e) => e.event === 'purchase_complete')
    .reduce((sum, e) => sum + (e as { totalPrice: number }).totalPrice, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader onLogout={onLogout} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <AdminNav current="analytics" />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">이벤트 분석</h1>
            <p className="text-xs text-gray-400 mt-0.5">
              마지막 갱신: {lastUpdated.toLocaleTimeString('ko-KR')}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={loadData}
              className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
              </svg>
              새로고침
            </button>
            <button
              onClick={handleClear}
              disabled={clearing}
              className="px-3.5 py-2 rounded-xl border border-red-200 text-xs font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
            >
              이벤트 초기화
            </button>
          </div>
        </div>

        {/* ── KPI 카드 ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {FUNNEL_STEPS.map((step) => (
            <div key={step.key} className={`${step.bgLight} rounded-2xl p-4`}>
              <p className="text-xs text-gray-500 mb-1">{step.label}</p>
              <p className="text-2xl font-black text-gray-900">{counts[step.key]}</p>
              <p className="text-xs text-gray-400 mt-0.5">누적 이벤트</p>
            </div>
          ))}
        </div>

        {/* ── 퍼널 시각화 ── */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-bold text-gray-900">전환 퍼널</h2>
            <span className="text-xs text-gray-400">최대값 기준 상대 비율</span>
          </div>

          {maxCount <= 1 && counts.view_product === 0 ? (
            <div className="py-12 text-center text-gray-400">
              <p className="text-3xl mb-2">📊</p>
              <p className="text-sm">아직 이벤트 데이터가 없습니다.</p>
              <p className="text-xs mt-1">상품 페이지를 방문하면 집계가 시작됩니다.</p>
            </div>
          ) : (
            <div className="space-y-0">
              {FUNNEL_STEPS.map((step, idx) => (
                <FunnelRow
                  key={step.key}
                  step={step}
                  count={counts[step.key]}
                  maxCount={maxCount}
                  conversionFrom={idx > 0 ? counts[FUNNEL_STEPS[idx - 1].key] : undefined}
                  isLast={idx === FUNNEL_STEPS.length - 1}
                />
              ))}
            </div>
          )}

          {/* 단계 간 전환율 요약 */}
          {counts.view_product > 0 && (
            <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-gray-400 mb-0.5">조회 → 장바구니</p>
                <p className="text-base font-black text-gray-900">
                  {convRate(counts.add_to_cart, counts.view_product)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">장바구니 → 체크아웃</p>
                <p className="text-base font-black text-gray-900">
                  {convRate(counts.begin_checkout, counts.add_to_cart)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-0.5">체크아웃 → 구매</p>
                <p className="text-base font-black text-gray-900">
                  {convRate(counts.purchase_complete, counts.begin_checkout)}
                </p>
              </div>
            </div>
          )}
        </section>

        {/* ── 총 매출 ── */}
        {totalRevenue > 0 && (
          <section className="bg-black rounded-2xl p-6 mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-1">총 주문 금액 (완료된 주문)</p>
              <p className="text-3xl font-black text-white">
                {totalRevenue.toLocaleString('ko-KR')}원
              </p>
            </div>
            <span className="text-4xl">💰</span>
          </section>
        )}

        {/* ── 최근 이벤트 로그 ── */}
        <section className="bg-white rounded-2xl border border-gray-100 p-6">
          <h2 className="text-sm font-bold text-gray-900 mb-4">
            최근 이벤트 로그
            <span className="ml-2 text-gray-400 font-normal">(최신 20개)</span>
          </h2>

          {recentEvents.length === 0 ? (
            <p className="text-sm text-gray-400 py-6 text-center">이벤트 없음</p>
          ) : (
            <div className="space-y-1.5 font-mono text-xs">
              {recentEvents.map((e, i) => {
                const step = FUNNEL_STEPS.find((s) => s.key === e.event)
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="shrink-0 mt-0.5">{step?.icon ?? '📌'}</span>
                    <span className={`shrink-0 font-semibold ${
                      e.event === 'purchase_complete' ? 'text-emerald-600' :
                      e.event === 'add_to_cart' ? 'text-indigo-600' :
                      e.event === 'begin_checkout' ? 'text-violet-600' :
                      'text-blue-600'
                    }`}>
                      {EVENT_LABEL[e.event]}
                    </span>
                    <span className="flex-1 text-gray-500 truncate">
                      {'productName' in e ? (e as { productName: string }).productName :
                       'orderId' in e ? (e as { orderId: string }).orderId :
                       `${('itemCount' in e ? (e as { itemCount: number }).itemCount : 0)}개 상품`}
                    </span>
                    <span className="shrink-0 text-gray-300">{relativeTime(e.timestamp)}</span>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

// ── 페이지 — 인증 확인 후 대시보드 렌더 ─────────────────
export default function AnalyticsPage() {
  const router = useRouter()
  const [authed, setAuthed] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const ok = sessionStorage.getItem('admin_auth') === 'ok'
    if (!ok) {
      router.replace('/admin')
    } else {
      setAuthed(true)
      setChecked(true)
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth')
    router.replace('/admin')
  }

  if (!checked || !authed) return null

  return <AnalyticsDashboard onLogout={handleLogout} />
}
