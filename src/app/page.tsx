import SiteHeader from '@/components/SiteHeader'
import ProductGrid from '@/components/ProductGrid'
import FadeInSection from '@/components/FadeInSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />

      {/* ── 히어로 섹션 ── */}
      <section className="relative overflow-hidden bg-primary">
        {/* 도트 패턴 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -right-4 top-20 w-44 h-44 rounded-full bg-accent/10" />
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/25 text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
            🍓 충남 논산 직송 키트
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            논산 딸기로 만드는
            <br />
            <span className="text-accent">특별한 키트</span>
          </h1>

          <p className="text-white/65 text-base md:text-lg mb-4 max-w-md mx-auto leading-relaxed">
            대학생들이 로컬푸드를 잘 모르는 이유,
            <br />
            <strong className="text-white/90">사이트를 몰라서</strong>라고 생각했습니다.
          </p>
          <p className="text-white/50 text-sm mb-10 max-w-sm mx-auto leading-relaxed">
            논산 산지 재료 그대로 — 레시피 카드부터 재료까지<br />
            집에서 쉽게 만드는 논산 로컬 키트를 만나보세요.
          </p>

          <a
            href="#products"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-accent-dark active:scale-95 transition-all duration-150 shadow-lg shadow-accent/30"
          >
            키트 구경하기
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>

          <div className="mt-12 flex flex-wrap justify-center gap-6 text-white/40 text-xs">
            {['🍓 논산 딸기 산지', '📦 재료+레시피 키트', '🚚 신선 냉장 배송'].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 상품 목록 ── */}
      <main id="products" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <FadeInSection>
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              논산 로컬 키트 모음
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              논산 산지 재료와 레시피 카드가 함께 오는 DIY 키트. 요리·디저트·음료·선물 세트까지.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={120}>
          <ProductGrid />
        </FadeInSection>
      </main>

      <footer className="mt-16 border-t border-gray-100 dark:border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-gray-400 dark:text-gray-600">
          © 2025 논산마켓 — 논산 로컬푸드 키트 직거래 플랫폼
        </div>
      </footer>
    </div>
  )
}
