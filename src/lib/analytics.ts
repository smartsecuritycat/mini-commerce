// 브라우저 전용 유틸리티 — SSR에서 호출돼도 안전하게 아무것도 하지 않음

const LS_KEY = 'analytics_events'
const SS_VIEWED = 'viewed_products'   // 세션 내 view_product 중복 방지
const SS_PURCHASED = 'tracked_purchases' // 세션 내 purchase_complete 중복 방지
const MAX_EVENTS = 1000               // localStorage 비대 방지

// ── 이벤트 타입 ────────────────────────────────────────
export type EventName =
  | 'view_product'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'purchase_complete'

type EventPayloadMap = {
  view_product: { productId: string; productName: string }
  add_to_cart: { productId: string; productName: string; price: number }
  begin_checkout: { totalPrice: number; itemCount: number }
  purchase_complete: { orderId: string; totalPrice: number }
}

export type AnalyticsEvent = {
  [K in EventName]: { event: K; timestamp: string } & EventPayloadMap[K]
}[EventName]

// ── 세션 Set 헬퍼 ──────────────────────────────────────
function getSessionSet(key: string): Set<string> {
  try {
    return new Set<string>(JSON.parse(sessionStorage.getItem(key) ?? '[]'))
  } catch {
    return new Set()
  }
}

function saveSessionSet(key: string, set: Set<string>): void {
  try {
    sessionStorage.setItem(key, JSON.stringify([...set]))
  } catch { /* quota 초과 등 무시 */ }
}

// ── 이벤트 저장 ────────────────────────────────────────
function readEvents(): AnalyticsEvent[] {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) ?? '[]')
  } catch {
    return []
  }
}

function writeEvents(events: AnalyticsEvent[]): void {
  try {
    // 최대 MAX_EVENTS개만 유지 (오래된 것부터 제거)
    const trimmed = events.slice(-MAX_EVENTS)
    localStorage.setItem(LS_KEY, JSON.stringify(trimmed))
  } catch { /* quota 초과 무시 */ }
}

// ── 공개 API ───────────────────────────────────────────

/**
 * 이벤트를 localStorage에 추가합니다.
 * - view_product: sessionStorage로 세션당 상품별 1회 집계
 * - purchase_complete: sessionStorage로 주문 ID당 1회 집계
 */
export function trackEvent<T extends EventName>(
  event: T,
  data: EventPayloadMap[T],
): void {
  if (typeof window === 'undefined') return

  // view_product 세션 중복 방지
  if (event === 'view_product') {
    const { productId } = data as EventPayloadMap['view_product']
    const viewed = getSessionSet(SS_VIEWED)
    if (viewed.has(productId)) return
    viewed.add(productId)
    saveSessionSet(SS_VIEWED, viewed)
  }

  // purchase_complete 세션 중복 방지
  if (event === 'purchase_complete') {
    const { orderId } = data as EventPayloadMap['purchase_complete']
    const purchased = getSessionSet(SS_PURCHASED)
    if (purchased.has(orderId)) return
    purchased.add(orderId)
    saveSessionSet(SS_PURCHASED, purchased)
  }

  const entry = {
    event,
    timestamp: new Date().toISOString(),
    ...data,
  } as AnalyticsEvent

  writeEvents([...readEvents(), entry])
}

/** 이벤트별 누적 카운트를 반환합니다. */
export function getEventCounts(): Record<EventName, number> {
  const counts: Record<EventName, number> = {
    view_product: 0,
    add_to_cart: 0,
    begin_checkout: 0,
    purchase_complete: 0,
  }
  if (typeof window === 'undefined') return counts

  for (const e of readEvents()) {
    if (e.event in counts) counts[e.event]++
  }
  return counts
}

/** 전체 이벤트 배열을 반환합니다 (대시보드 로그용). */
export function getAllEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return []
  return readEvents()
}

/** analytics_events(localStorage) + viewed/purchased(sessionStorage) 초기화 */
export function clearEvents(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(LS_KEY)
    sessionStorage.removeItem(SS_VIEWED)
    sessionStorage.removeItem(SS_PURCHASED)
  } catch { /* 무시 */ }
}
