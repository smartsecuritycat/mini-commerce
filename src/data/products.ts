export type Product = {
  id: string
  name: string
  price: number
  category: 'cooking' | 'dessert' | 'drink' | 'gift'
  description: string
  cloudinaryId: string
  sizes?: string[]   // 인원 수 또는 구성 수량
  stock: number
  origin: string
}

export const products: Product[] = [
  // ───── 요리 키트 ─────
  {
    id: 'ck-001',
    name: '논산 딸기 잼 만들기 키트',
    price: 18900,
    category: 'cooking',
    description: '논산산 생딸기 500g + 설탕 + 레몬즙 + 유리병까지. 방부제 없는 홈메이드 딸기잼을 30분 만에 완성하세요.',
    cloudinaryId: 'nonsan/kit-strawberry-jam',
    sizes: ['1세트', '2세트'],
    stock: 45,
    origin: '충남 논산시',
  },
  {
    id: 'ck-002',
    name: '논산 채소 비빔밥 키트',
    price: 12900,
    category: 'cooking',
    description: '논산 당일 수확 채소 5종 + 비빔고추장 + 참기름. 손질된 재료로 20분 안에 건강한 한 끼 완성.',
    cloudinaryId: 'nonsan/kit-bibimbap',
    sizes: ['1인분', '2인분', '4인분'],
    stock: 60,
    origin: '충남 논산시',
  },
  {
    id: 'ck-003',
    name: '논산 딸기 청 담그기 키트',
    price: 15900,
    category: 'cooking',
    description: '논산 딸기 600g + 올리고당 + 밀폐 유리병. 2주 숙성 후 에이드·라떼로 활용하는 딸기 원액 키트.',
    cloudinaryId: 'nonsan/kit-strawberry-syrup',
    sizes: ['1세트', '2세트'],
    stock: 40,
    origin: '충남 논산시',
  },

  // ───── 디저트 키트 ─────
  {
    id: 'ds-001',
    name: '논산 딸기 케이크 키트',
    price: 28900,
    category: 'dessert',
    description: '논산 생딸기 + 케이크 시트 + 생크림 파우더 + 데코레이션 재료. 오븐 없이 냉장고만 있으면 됩니다.',
    cloudinaryId: 'nonsan/kit-strawberry-cake',
    sizes: ['4인용', '8인용'],
    stock: 30,
    origin: '충남 논산시',
  },
  {
    id: 'ds-002',
    name: '논산 딸기 쿠키 키트',
    price: 19900,
    category: 'dessert',
    description: '논산 동결건조 딸기 + 쿠키 반죽 믹스 + 쿠키 커터. 아이와 함께 만드는 딸기 버터 쿠키 키트.',
    cloudinaryId: 'nonsan/kit-strawberry-cookie',
    sizes: ['1박스 (약 20개)', '2박스 (약 40개)'],
    stock: 50,
    origin: '충남 논산시',
  },
  {
    id: 'ds-003',
    name: '논산 딸기 아이스크림 키트',
    price: 22900,
    category: 'dessert',
    description: '논산 딸기 퓨레 + 생크림 + 연유 + 아이스크림 틀. 냉동실에서 4시간이면 쫀쫀한 딸기 아이스크림 완성.',
    cloudinaryId: 'nonsan/kit-strawberry-icecream',
    sizes: ['4개입', '8개입'],
    stock: 35,
    origin: '충남 논산시',
  },

  // ───── 음료 키트 ─────
  {
    id: 'dr-001',
    name: '논산 딸기 라떼 키트',
    price: 16900,
    category: 'drink',
    description: '논산 딸기 분말 + 연유 + 종이컵 10개입. 카페 딸기 라떼를 집에서, 한 잔에 약 1,700원.',
    cloudinaryId: 'nonsan/kit-strawberry-latte',
    sizes: ['10잔', '20잔', '30잔'],
    stock: 55,
    origin: '충남 논산시',
  },
  {
    id: 'dr-002',
    name: '논산 연꽃 차 키트',
    price: 14900,
    category: 'drink',
    description: '관촉사 연꽃 단지 인근에서 재배한 연잎차 + 연근차 + 연꽃 모양 찻잔. 은은한 향의 논산 특산 차 세트.',
    cloudinaryId: 'nonsan/kit-lotus-tea',
    sizes: ['15티백', '30티백'],
    stock: 42,
    origin: '충남 논산시',
  },
  {
    id: 'dr-003',
    name: '논산 딸기 에이드 키트',
    price: 13900,
    category: 'drink',
    description: '논산 딸기 청 + 탄산수 4병 + 민트 시럽. 인스타감성 딸기 에이드를 집에서 간편하게.',
    cloudinaryId: 'nonsan/kit-strawberry-ade',
    sizes: ['4잔', '8잔', '12잔'],
    stock: 48,
    origin: '충남 논산시',
  },

  // ───── 선물 세트 ─────
  {
    id: 'gf-001',
    name: '논산 딸기 프리미엄 선물 키트',
    price: 45900,
    category: 'gift',
    description: '딸기잼 키트 + 딸기 라떼 키트 + 딸기 청 키트 3종 구성. 논산의 맛을 담은 품격 있는 선물 세트.',
    cloudinaryId: 'nonsan/kit-gift-premium',
    sizes: ['스탠다드', '프리미엄'],
    stock: 25,
    origin: '충남 논산시',
  },
  {
    id: 'gf-002',
    name: '논산 패밀리 쿠킹 키트',
    price: 38900,
    category: 'gift',
    description: '비빔밥 키트 + 쿠키 키트 + 딸기 아이스크림 키트 3종 구성. 온 가족이 함께하는 논산 미식 체험.',
    cloudinaryId: 'nonsan/kit-gift-family',
    sizes: ['4인 가족', '8인 가족'],
    stock: 20,
    origin: '충남 논산시',
  },
  {
    id: 'gf-003',
    name: '논산 딸기 체험 ALL-IN 키트',
    price: 52900,
    category: 'gift',
    description: '잼·케이크·아이스크림·에이드 4가지 딸기 키트 풀 구성. 논산 딸기 축제를 집에서 통째로 즐기는 세트.',
    cloudinaryId: 'nonsan/kit-gift-allin',
    sizes: ['4인용'],
    stock: 15,
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
