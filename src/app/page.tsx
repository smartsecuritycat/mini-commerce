import SiteHeader from '@/components/SiteHeader'
import ProductGrid from '@/components/ProductGrid'
import FadeInSection from '@/components/FadeInSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />

      {/* ── 히어로 ── */}
      <section className="relative overflow-hidden bg-primary">
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

      {/* ── SDG 12 · 3가지 이유 ── */}
      <section className="bg-gray-950 dark:bg-black py-20">
        <FadeInSection>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {/* SDG 12 배지 */}
            <div className="flex justify-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/40 text-accent text-xs font-semibold tracking-widest uppercase">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
                UN SDG 12 · 지속가능한 소비와 생산
              </span>
            </div>

            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                왜 못난이 키트인가요?
              </h2>
              <p className="text-gray-400 text-sm max-w-md mx-auto leading-relaxed">
                논산에서 매년 수많은 농산물이 외형 문제로 폐기됩니다.<br />
                세 가지 방식으로 이 문제를 풀어갑니다.
              </p>
            </div>

            {/* 3가지 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* 1. SNS 챌린지 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center mb-5 text-xl">
                  📱
                </div>
                <p className="text-accent text-xs font-bold tracking-widest uppercase mb-2">
                  01 · SNS 레시피 챌린지
                </p>
                <h3 className="text-white text-lg font-bold mb-3 leading-snug">
                  요리하고, 찍고, 공유하세요
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  못난이 농산물로 만든 요리를 SNS에 공유하는 참여형 캠페인.
                  해시태그를 통해 자연스러운 확산을 유도하고, 지속가능한 소비 문화를 함께 만들어 갑니다.
                </p>
                <div className="mt-5 inline-block px-3 py-1.5 bg-accent/15 rounded-lg text-accent text-xs font-bold">
                  #논산못난이키트
                </div>
              </div>

              {/* 2. 1인분 키트 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-green-500/20 flex items-center justify-center mb-5 text-xl">
                  🥡
                </div>
                <p className="text-green-400 text-xs font-bold tracking-widest uppercase mb-2">
                  02 · 자취생 1인분 키트
                </p>
                <h3 className="text-white text-lg font-bold mb-3 leading-snug">
                  필요한 만큼만 소비합니다
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  대학생·자취생은 식재료를 대량 구매 후 남겨 버리는 경우가 많습니다.
                  1인분 단위로 손질 완료된 재료와 레시피 카드를 함께 제공해 식품 낭비를 근본부터 줄입니다.
                </p>
                <div className="mt-5 flex gap-2 flex-wrap">
                  {['손질 완료', '레시피 포함', '딱 1인분'].map(t => (
                    <span key={t} className="px-2.5 py-1 bg-green-500/15 rounded-lg text-green-400 text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>

              {/* 3. 친환경 패키징 */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/8 transition-colors">
                <div className="w-11 h-11 rounded-xl bg-sky-500/20 flex items-center justify-center mb-5 text-xl">
                  🌿
                </div>
                <p className="text-sky-400 text-xs font-bold tracking-widest uppercase mb-2">
                  03 · 친환경 패키징
                </p>
                <h3 className="text-white text-lg font-bold mb-3 leading-snug">
                  포장도 지구를 생각합니다
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  키트 운영 과정에서 발생하는 포장 폐기물 문제를 고려해, 플라스틱 대신 친환경 소재를 적용합니다.
                </p>
                <ul className="mt-4 space-y-1.5 text-xs text-gray-500">
                  {[
                    '생분해성 소재 (옥수수 전분 · 사탕수수)',
                    '재활용 가능한 종이 · 펄프 패키지',
                    '대나무 소재 일부 활용',
                    '최소 포장 원칙 적용',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="text-sky-400 mt-0.5">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ── SNS 챌린지 참여 방법 ── */}
      <section className="py-20 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <FadeInSection>
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* 왼쪽: 해시태그 */}
              <div>
                <p className="text-accent text-xs font-bold tracking-widest uppercase mb-4">
                  SNS 레시피 챌린지
                </p>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight mb-5">
                  못난이 키트로 요리하고<br />
                  <span className="text-accent">#논산못난이키트</span> 로 공유하세요
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-8">
                  키트를 구매하면 레시피 카드가 함께 옵니다. 요리 사진을 찍고 해시태그와 함께 SNS에 올려주세요.
                  친환경 소비 문화를 함께 만들어가는 캠페인에 참여하실 수 있습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['#논산못난이키트', '#1인분챌린지', '#못난이농산물', '#SDG12'].map(tag => (
                    <span key={tag}
                      className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-sm rounded-full font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 오른쪽: 참여 단계 */}
              <div className="space-y-4">
                {[
                  { step: '01', title: '키트 구매', desc: '논산 못난이 농산물로 만든 1인분 키트를 선택하세요.' },
                  { step: '02', title: '레시피대로 요리', desc: '동봉된 레시피 카드를 보며 간단하게 조리합니다.' },
                  { step: '03', title: 'SNS에 공유', desc: '완성된 요리를 사진 찍고 해시태그와 함께 올려주세요.' },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="flex gap-4 items-start p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                    <span className="text-accent font-black text-lg shrink-0 w-8">{step}</span>
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white text-sm mb-0.5">{title}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ── 친환경 패키징 상세 ── */}
      <section className="py-20 bg-green-50 dark:bg-green-950/20">
        <FadeInSection>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <p className="text-primary dark:text-green-400 text-xs font-bold tracking-widest uppercase mb-4">
              친환경 패키징
            </p>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-4">
              포장재도 SDG 12를 지킵니다
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm max-w-lg mx-auto leading-relaxed mb-12">
              1인분 키트를 플라스틱으로 포장하면 SDG 12의 지속가능한 소비·생산 목표와 어긋납니다.
              모든 포장재를 친환경 소재로 설계했습니다.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: '🌽', title: '생분해성 소재', desc: '옥수수 전분·사탕수수 기반 포장재' },
                { icon: '♻️', title: '재활용 패키지', desc: '종이·펄프 소재 100% 재활용 가능' },
                { icon: '🎋', title: '대나무 소재', desc: '재생 가능한 대나무 일부 활용' },
                { icon: '📦', title: '최소 포장', desc: '불필요한 포장 없이 꼭 필요한 것만' },
              ].map(({ icon, title, desc }) => (
                <div key={title} className="bg-white dark:bg-gray-900 rounded-2xl p-5 text-left shadow-sm">
                  <div className="text-3xl mb-3">{icon}</div>
                  <p className="font-bold text-gray-900 dark:text-white text-sm mb-1">{title}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* ── 상품 목록 ── */}
      <main id="products" className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
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

      <footer className="mt-8 border-t border-gray-100 dark:border-gray-800 py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            © 2025 논산마켓 — 논산 못난이 농산물 1인분 키트 플랫폼
          </p>
          <p className="text-xs text-gray-300 dark:text-gray-700">
            UN SDG 12 지속가능한 소비·생산 · SDG 13 기후변화 대응
          </p>
        </div>
      </footer>
    </div>
  )
}
