import SiteHeader from '@/components/SiteHeader'
import ProductGrid from '@/components/ProductGrid'
import FadeInSection from '@/components/FadeInSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />

      {/* ── 히어로 섹션 ── */}
      <section className="relative overflow-hidden bg-primary">
        {/* 나뭇잎 도트 패턴 배경 */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
        {/* 우측 원형 장식 */}
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/5" />
        <div className="absolute -right-8 top-16 w-48 h-48 rounded-full bg-accent/10" />
        {/* 하단 페이드 */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-primary to-transparent" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/25 text-accent text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
            🌱 전북·충남 산지 직송
          </span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6">
            로컬푸드,
            <br />
            <span className="text-accent">이제 쉽게 만나요</span>
          </h1>

          <p className="text-white/65 text-base md:text-lg mb-4 max-w-md mx-auto leading-relaxed">
            대학생들이 로컬푸드를 잘 모르는 이유,
            <br />
            <strong className="text-white/90">사이트를 몰라서</strong>라고 생각했습니다.
          </p>
          <p className="text-white/50 text-sm mb-10 max-w-xs mx-auto leading-relaxed">
            신선한 국내산 농산물을 산지 직송으로 —<br />
            합리적인 가격에 바로 만나보세요.
          </p>

          <a
            href="#products"
            className="inline-flex items-center gap-2 bg-accent text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-accent-dark active:scale-95 transition-all duration-150 shadow-lg shadow-accent/30"
          >
            지금 탐색하기
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>

          {/* 신뢰 지표 */}
          <div className="mt-12 flex justify-center gap-8 text-white/40 text-xs">
            {['🌾 산지 직송', '🚚 신선 배송 보장', '🤝 농가 직거래'].map((t) => (
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
              이번 주 로컬푸드
            </h2>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              전북·충남 지역 농가에서 직접 수확한 신선한 먹거리를 만나보세요.
            </p>
          </div>
        </FadeInSection>

        <FadeInSection delay={120}>
          <ProductGrid />
        </FadeInSection>
      </main>

      <footer className="mt-16 border-t border-gray-100 dark:border-gray-800 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-gray-400 dark:text-gray-600">
          © 2025 로컬마켓 — 지역 농가와 소비자를 잇는 직거래 플랫폼
        </div>
      </footer>
    </div>
  )
}
