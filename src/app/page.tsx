import SiteHeader from '@/components/SiteHeader'
import ProductGrid from '@/components/ProductGrid'
import FadeInSection from '@/components/FadeInSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />

      {/* ── 히어로 ── */}
      <section className="bg-primary">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 pt-20 pb-18 md:pt-28 md:pb-24">
          <p className="text-white/25 text-[11px] tracking-[0.3em] uppercase mb-14 md:mb-20">
            충남 논산 — 못난이 농산물 1인분 키트
          </p>

          <h1 className="text-[clamp(2.8rem,9vw,7rem)] font-black text-white leading-[0.93] tracking-tight">
            못생겼지만
            <br />
            <span className="text-accent">맛은 완벽합니다</span>
          </h1>

          <div className="mt-10 md:mt-14 flex flex-col sm:flex-row sm:items-end gap-8 justify-between">
            <p className="text-white/40 text-sm leading-[1.9] max-w-[240px]">
              버려질 뻔한 논산 농산물을 골라<br />
              꼭 필요한 1인분만 담았습니다
            </p>
            <a
              href="#products"
              className="group inline-flex items-center gap-2 text-white/50 hover:text-white/90 text-xs tracking-widest uppercase transition-colors"
            >
              키트 둘러보기
              <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── 왜 못난이 키트인가요? ── */}
      <FadeInSection>
        <section className="py-20 md:py-28 border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-12 md:gap-20">

              {/* 왼쪽: 레이블 */}
              <div className="md:pt-1">
                <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--muted)] mb-3">Why</p>
                <h2 className="text-2xl font-black text-[var(--fg)] leading-tight">
                  왜 못난이<br />키트인가요?
                </h2>
                <p className="mt-5 text-[11px] text-[var(--muted)] leading-relaxed tracking-wide">
                  UN SDG 12<br />지속가능한 소비·생산
                </p>
              </div>

              {/* 오른쪽: 번호 리스트 */}
              <div>
                {[
                  {
                    num: '01',
                    title: 'SNS 레시피 챌린지',
                    body: '못난이 농산물로 만든 요리를 SNS에 공유하는 참여형 캠페인. 해시태그를 통해 자연스럽게 확산되고, 콘텐츠 생산을 통해 지속가능한 소비 문화를 함께 만들어 갑니다.',
                    tag: '#논산못난이키트',
                  },
                  {
                    num: '02',
                    title: '자취생 1인분 키트',
                    body: '대학생·자취생은 식재료를 대량 구매 후 남겨 버리는 경우가 많습니다. 1인분 단위로 손질 완료된 재료와 레시피 카드를 함께 제공해 식품 낭비를 근본부터 줄입니다.',
                  },
                  {
                    num: '03',
                    title: '친환경 패키징',
                    body: '플라스틱으로 포장하면 SDG 12의 목표와 어긋납니다. 모든 포장재에 옥수수 전분·사탕수수 생분해성 소재, 재활용 가능한 종이·펄프, 대나무 소재를 적용합니다. 최소 포장 원칙으로 환경 부담을 줄입니다.',
                  },
                ].map(({ num, title, body, tag }, i, arr) => (
                  <div
                    key={num}
                    className={[
                      'py-8 grid grid-cols-[48px_1fr] gap-5',
                      i < arr.length - 1 ? 'border-b border-[var(--border)]' : '',
                    ].join(' ')}
                  >
                    <span className="text-[var(--border)] text-3xl font-black leading-none select-none pt-0.5">
                      {num}
                    </span>
                    <div>
                      <h3 className="font-semibold text-[var(--fg)] text-base mb-2">{title}</h3>
                      <p className="text-[var(--muted)] text-sm leading-relaxed">{body}</p>
                      {tag && (
                        <span className="mt-3 inline-block text-[11px] text-[var(--muted)] tracking-wide">{tag}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── SNS 챌린지 ── */}
      <FadeInSection>
        <section className="py-20 md:py-28 border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-6 sm:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

              {/* 해시태그 */}
              <div>
                <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--muted)] mb-5">SNS 챌린지</p>
                <p className="text-[clamp(1.6rem,4vw,2.8rem)] font-black text-[var(--fg)] leading-tight">
                  #논산못난이키트
                </p>
                <p className="mt-5 text-[var(--muted)] text-sm leading-relaxed max-w-xs">
                  키트를 구매하면 레시피 카드가 함께 옵니다.
                  요리 사진을 찍고 해시태그와 함께 올려주세요.
                </p>
              </div>

              {/* 참여 단계 */}
              <div className="space-y-0 divide-y divide-[var(--border)]">
                {[
                  { step: '1', title: '키트 구매', desc: '논산 못난이 농산물로 만든 1인분 키트를 선택합니다.' },
                  { step: '2', title: '레시피대로 요리', desc: '동봉된 레시피 카드를 보며 간단하게 조리합니다.' },
                  { step: '3', title: 'SNS에 공유', desc: '완성된 요리를 찍고 해시태그와 함께 올려주세요.' },
                ].map(({ step, title, desc }) => (
                  <div key={step} className="py-5 flex items-start gap-5">
                    <span className="text-xs text-[var(--muted)] shrink-0 pt-0.5 w-4">{step}</span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--fg)] mb-0.5">{title}</p>
                      <p className="text-xs text-[var(--muted)] leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── 친환경 패키징 ── */}
      <FadeInSection>
        <section className="py-12 border-b border-[var(--border)]">
          <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--muted)] mb-1">친환경 패키징</p>
              <p className="text-sm font-semibold text-[var(--fg)]">포장재도 SDG 12를 지킵니다</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {['생분해성 소재', '재활용 종이·펄프', '대나무 소재', '최소 포장'].map(t => (
                <span
                  key={t}
                  className="px-3.5 py-1.5 border border-[var(--border)] text-[var(--muted)] text-xs rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      </FadeInSection>

      {/* ── 상품 목록 ── */}
      <main id="products" className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
        <FadeInSection>
          <div className="mb-10">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--muted)] mb-2">Products</p>
            <h2 className="text-2xl font-black text-[var(--fg)]">논산 못난이 1인분 키트</h2>
          </div>
        </FadeInSection>

        <FadeInSection delay={80}>
          <ProductGrid />
        </FadeInSection>
      </main>

      <footer className="border-t border-[var(--border)] py-10">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row justify-between gap-2 text-[11px] text-[var(--muted)]">
          <span>© 2025 논산마켓</span>
          <span>UN SDG 12 지속가능한 소비·생산 · SDG 13 기후변화 대응</span>
        </div>
      </footer>
    </div>
  )
}
