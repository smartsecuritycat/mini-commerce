export type Product = {
  id: string
  name: string
  price: number
  category: 'cooking' | 'dessert' | 'drink' | 'gift'
  description: string
  cloudinaryId: string
  sizes?: string[]
  stock: number
  origin: string
}

// 핵심 콘셉트:
// 외형이 좋지 않아 버려지는 논산 못난이 농산물을 활용한 1인분 키트.
// 대학생·자취생이 필요한 만큼만 소비할 수 있도록 구성.
// SDG 12(지속가능한 소비·생산) · SDG 13(기후변화 대응) 연계.

export const products: Product[] = [
  // ───── 요리 키트 ─────
  {
    id: 'ck-001',
    name: '못난이 딸기 잼 1인 키트',
    price: 12900,
    category: 'cooking',
    description: '외형이 좋지 않아 버려질 뻔한 논산 못난이 딸기 300g + 설탕 + 레몬즙 + 소분 유리병. 혼자서 30분 만에 방부제 없는 딸기잼을 만들 수 있어요.',
    cloudinaryId: 'nonsan/ugly-strawberry-jam-kit',
    sizes: ['1인분', '2인분'],
    stock: 50,
    origin: '충남 논산시',
  },
  {
    id: 'ck-002',
    name: '못난이 채소 비빔밥 1인 키트',
    price: 7900,
    category: 'cooking',
    description: '버려질 뻔한 논산 못난이 채소 5종 손질 완료 + 비빔고추장 + 참기름. 외형만 못났을 뿐, 맛과 영양은 그대로인 1인분 건강 한 끼.',
    cloudinaryId: 'nonsan/ugly-veggie-bibimbap-kit',
    sizes: ['1인분', '2인분'],
    stock: 65,
    origin: '충남 논산시',
  },
  {
    id: 'ck-003',
    name: '못난이 감자 크림수프 1인 키트',
    price: 8900,
    category: 'cooking',
    description: '굽고 울퉁불퉁해 팔리지 못한 논산 못난이 감자 2개 + 우유 + 버터 + 양파. 수프가 되면 못난 외형은 아무 상관없어요.',
    cloudinaryId: 'nonsan/ugly-potato-soup-kit',
    sizes: ['1인분', '2인분'],
    stock: 55,
    origin: '충남 논산시',
  },

  // ───── 디저트 키트 ─────
  {
    id: 'ds-001',
    name: '못난이 딸기 스무디볼 1인 키트',
    price: 9900,
    category: 'dessert',
    description: '흠집이 있어 판매되지 못한 논산 딸기를 급랭한 못난이 냉동 딸기 200g + 그래놀라 + 꿀 + 코코넛. SNS 챌린지에 딱 맞는 비주얼!',
    cloudinaryId: 'nonsan/ugly-strawberry-smoothiebowl-kit',
    sizes: ['1인분'],
    stock: 60,
    origin: '충남 논산시',
  },
  {
    id: 'ds-002',
    name: '못난이 바나나 팬케이크 1인 키트',
    price: 8500,
    category: 'dessert',
    description: '검은 반점이 생겨 폐기될 뻔한 못난이 바나나 2개 + 팬케이크 믹스 + 메이플 시럽. 과숙된 바나나일수록 팬케이크가 더 달콤해요.',
    cloudinaryId: 'nonsan/ugly-banana-pancake-kit',
    sizes: ['1인분', '2인분'],
    stock: 45,
    origin: '충남 논산시',
  },
  {
    id: 'ds-003',
    name: '못난이 사과 시나몬 크럼블 1인 키트',
    price: 10900,
    category: 'dessert',
    description: '흠집으로 폐기되는 논산 못난이 사과 2개 + 크럼블 믹스 + 시나몬 파우더. 오븐 없이 전자레인지 10분으로 완성하는 1인 디저트.',
    cloudinaryId: 'nonsan/ugly-apple-crumble-kit',
    sizes: ['1인분'],
    stock: 40,
    origin: '충남 논산시',
  },

  // ───── 음료 키트 ─────
  {
    id: 'dr-001',
    name: '못난이 딸기 생과일주스 1인 키트',
    price: 6900,
    category: 'drink',
    description: '색이 고르지 않아 팔리지 못한 논산 못난이 딸기 250g + 우유 + 꿀. 믹서기 하나면 카페 딸기라떼보다 건강한 음료 완성.',
    cloudinaryId: 'nonsan/ugly-strawberry-juice-kit',
    sizes: ['1인분', '2인분'],
    stock: 70,
    origin: '충남 논산시',
  },
  {
    id: 'dr-002',
    name: '못난이 당근·사과 착즙 1인 키트',
    price: 7500,
    category: 'drink',
    description: '구부러진 못난이 당근 2개 + 흠집 사과 1개 + 레몬즙. 착즙기 없어도 OK — 믹서기 후 천으로 거르는 방법까지 레시피 카드에 담았어요.',
    cloudinaryId: 'nonsan/ugly-carrot-apple-juice-kit',
    sizes: ['1인분', '2인분'],
    stock: 55,
    origin: '충남 논산시',
  },
  {
    id: 'dr-003',
    name: '못난이 채소 해독 스무디 1인 키트',
    price: 8900,
    category: 'drink',
    description: '잎이 크거나 모양이 고르지 않아 팔리지 못한 못난이 시금치·오이·셀러리 + 사과 1인분. 손질 완료 상태로 배송 — 바로 갈아 드세요.',
    cloudinaryId: 'nonsan/ugly-green-smoothie-kit',
    sizes: ['1인분'],
    stock: 48,
    origin: '충남 논산시',
  },

  // ───── 선물·묶음 세트 ─────
  {
    id: 'gf-001',
    name: '못난이 1주일 밀키트 세트',
    price: 39900,
    category: 'gift',
    description: '요리 키트 3종 + 음료 키트 2종 + 디저트 키트 1종 총 6개 구성. 일주일 동안 못난이 농산물로 혼자 해먹는 도전 키트. 친환경 면 가방 포함.',
    cloudinaryId: 'nonsan/ugly-weekly-mealkit',
    sizes: ['1인 1주일'],
    stock: 25,
    origin: '충남 논산시',
  },
  {
    id: 'gf-002',
    name: '못난이 비건 1인 선물 세트',
    price: 28900,
    category: 'gift',
    description: '채소 비빔밥 + 해독 스무디 + 사과 크럼블 3종 구성. 동물성 재료 없이 논산 못난이 채소만으로 만드는 친환경 비건 선물 세트.',
    cloudinaryId: 'nonsan/ugly-vegan-gift-set',
    sizes: ['3종 세트'],
    stock: 30,
    origin: '충남 논산시',
  },
  {
    id: 'gf-003',
    name: '대학생 1인분 응원 세트',
    price: 22900,
    category: 'gift',
    description: '시험 기간 자취 친구에게 보내는 응원 키트. 스무디볼 + 바나나 팬케이크 + 딸기 생과일주스 3종. 못난이 농산물로 만든 힘내라 선물!',
    cloudinaryId: 'nonsan/ugly-cheer-gift-set',
    sizes: ['3종 세트'],
    stock: 35,
    origin: '충남 논산시',
  },
]

export const CATEGORY_LABELS: Record<Product['category'] | 'all', string> = {
  all: '전체',
  cooking: '요리 키트',
  dessert: '디저트 키트',
  drink: '음료 키트',
  gift: '선물 세트',
}
