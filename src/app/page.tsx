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

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-28 md:py-40 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/70 text-[11px] font-medium tracking-[0.18em] uppercase mb-8">
            충남 논산 · 못난이 농산물 1인분 키트
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-[5rem] font-black text-white leading-[1.05] tracking-tight mb-6">
            못생겼지만
            <br />
            <span className="text-accent">맛은 완벽합니다</span>
          </h1>

          <p className="text-white/55 text-base md:text-lg mb-12 max-w-sm mx-auto leading-[1.8]">
            버려질 뻔한 논산 농산물을 골라<br />
            꼭 필요한 1인분만 담았습니다
          </p>

          <a
            href="#products"
            className="inline-flex items-center gap-2.5 bg-accent text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-accent-dark active:scale-[0.97] transition-all duration-150 shadow-xl shadow-accent/20"
          >
            키트 둘러보기
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>

          <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/30 text-xs tracking-wide">
            {['논산 산지 직송', '재료 + 레시피 카드', '1인분 소분 구성'].map((t) => (
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
              논산 못난이 1인분 키트
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              외형이 좋지 않아 버려질 뻔한 논산 농산물로 만든 1인분 키트. 재료와 레시피 카드가 함께 배송됩니다.
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
