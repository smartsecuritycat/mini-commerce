import SiteHeader from '@/components/SiteHeader'
import ProductGrid from '@/components/ProductGrid'
import FadeInSection from '@/components/FadeInSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />

      {/* ── 히어로 섹션 ── */}
      <section className="relative overflow-hidden bg-primary">
        {/* 도트 패턴 배경 */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* 하단 그라데이션 페이드 */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-primary to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center">
          <span className="inline-block px-3.5 py-1 rounded-full bg-accent/20 text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
            Brand Collection 2025
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            나를 표현하는
            <br />
            <span className="text-accent">브랜드 굿즈</span>
          </h1>

          <p className="text-white/60 text-base md:text-lg mb-10 max-w-sm mx-auto leading-relaxed">
            티셔츠, 후드, 머그컵, 에코백.
            <br />
            당신의 스타일을 완성하세요.
          </p>

          <a
            href="#products"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-accent-dark active:scale-95 transition-all duration-150 shadow-lg shadow-accent/30"
          >
            지금 쇼핑하기
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── 상품 목록 ── */}
      <main id="products" className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <FadeInSection>
          <div className="mb-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              새 컬렉션
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              브랜드 굿즈를 탐색하고 나만의 스타일을 완성하세요.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={120}>
          <ProductGrid />
        </FadeInSection>
      </main>

      <footer className="mt-16 border-t border-gray-100 dark:border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-gray-400 dark:text-gray-600">
          © 2025 Mini Commerce. All rights reserved.
        </div>
      </footer>
    </div>
  )
}
