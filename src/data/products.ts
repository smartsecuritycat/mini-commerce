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

// Pexels CDN — 검색으로 제목까지 확인한 ID만 사용
const p = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=600&h=600`

export const products: Product[] = [
  // ───── 요리 키트 ─────
  {
    id: 'ck-001',
    name: '못난이 양파 프렌치수프 1인 키트',
    price: 8500,
    category: 'cooking',
    description: '크기가 작거나 껍질에 흠이 생겨 판매되지 못한 논산 양파로 만드는 진한 프렌치 어니언수프. 치즈 크루통 재료까지 한 박스에 담았습니다.',
    cloudinaryId: p(750827), // "Soup With Onion and Meat"
    sizes: ['1인분', '2인분'],
    stock: 55,
    origin: '충남 논산시',
  },
  {
    id: 'ck-002',
    name: '못난이 채소 나물 비빔밥 1인 키트',
    price: 7900,
    category: 'cooking',
    description: '모양이 고르지 않아 판매되지 못한 논산 제철 채소 5종, 이미 손질 완료. 양념장과 참기름까지 딱 1인분만 담아 남김 없이 소비할 수 있습니다.',
    cloudinaryId: p(5773960), // "Egg on Top of a Bibimbap"
    sizes: ['1인분', '2인분'],
    stock: 65,
    origin: '충남 논산시',
  },
  {
    id: 'ck-003',
    name: '못난이 감자 크림수프 1인 키트',
    price: 8900,
    category: 'cooking',
    description: '굽고 울퉁불퉁해 팔리지 못한 논산 감자 2개, 우유·버터·양파와 함께 구성. 수프가 되면 못난 외형은 아무 상관없습니다.',
    cloudinaryId: p(1707270), // "Soup In A Bowl" — 크리미한 수프
    sizes: ['1인분', '2인분'],
    stock: 50,
    origin: '충남 논산시',
  },

  // ───── 디저트 키트 ─────
  {
    id: 'ds-001',
    name: '못난이 논산 배 캐러멜 타르트 1인 키트',
    price: 12900,
    category: 'dessert',
    description: '흠집이 생겨 선물용으로 팔리지 못한 논산 배를 얇게 슬라이스해 만드는 캐러멜 타르트. 타르트 쉘·캐러멜 소스까지 1인 구성으로 담았습니다.',
    cloudinaryId: p(1111813), // "Caramel Delicious Dessert Desserts"
    sizes: ['1인분'],
    stock: 40,
    origin: '충남 논산시',
  },
  {
    id: 'ds-002',
    name: '못난이 딸기 스무디볼 1인 키트',
    price: 9900,
    category: 'dessert',
    description: '흠집이 있어 판매되지 못한 논산 딸기를 급랭한 냉동 딸기 200g, 그래놀라·꿀·코코넛 플레이크와 함께 구성. 만들기 쉽고 비주얼도 좋습니다.',
    cloudinaryId: p(4099238), // "Photo Of Fruits And Smoothie On A Bowl"
    sizes: ['1인분'],
    stock: 60,
    origin: '충남 논산시',
  },
  {
    id: 'ds-003',
    name: '못난이 사과·배 크럼블 1인 키트',
    price: 10900,
    category: 'dessert',
    description: '흠집으로 폐기되는 논산 사과·배 각 1개씩, 오트밀 크럼블 믹스·시나몬 파우더 포함. 전자레인지 8분이면 완성되는 따뜻한 1인 디저트.',
    cloudinaryId: p(6605303), // "Lemon Tart on Marble Table"
    sizes: ['1인분'],
    stock: 45,
    origin: '충남 논산시',
  },

  // ───── 음료 키트 ─────
  {
    id: 'dr-001',
    name: '못난이 당근·배 착즙 주스 1인 키트',
    price: 7500,
    category: 'drink',
    description: '구부러진 못난이 당근 2개와 흠집 배 반 개, 레몬즙 소분 포함. 레시피 카드에 착즙기 없이 믹서기로 거르는 방법까지 안내합니다.',
    cloudinaryId: p(4443459), // "Carrot Juice in Clear Drinking Glass"
    sizes: ['1인분', '2인분'],
    stock: 60,
    origin: '충남 논산시',
  },
  {
    id: 'dr-002',
    name: '못난이 토마토 가스파초 1인 키트',
    price: 8900,
    category: 'drink',
    description: '색이 고르지 않아 팔리지 못한 논산 토마토 3개, 오이·파프리카·마늘 소분 포함. 여름에 차갑게 마시는 스페인식 채소 냉수프 키트.',
    cloudinaryId: p(17302314), // "A Creamy Tomato Soup"
    sizes: ['1인분'],
    stock: 48,
    origin: '충남 논산시',
  },
  {
    id: 'dr-003',
    name: '못난이 채소 해독 스무디 1인 키트',
    price: 8500,
    category: 'drink',
    description: '잎이 크거나 모양이 고르지 않아 팔리지 못한 시금치·오이·셀러리, 손질 완료 상태로 배송. 사과·레몬즙 소분까지 담아 바로 갈아 드시면 됩니다.',
    cloudinaryId: p(5644870), // "Clear Mason Jar With Green Smoothie"
    sizes: ['1인분'],
    stock: 52,
    origin: '충남 논산시',
  },

  // ───── 선물·묶음 세트 ─────
  {
    id: 'gf-001',
    name: '못난이 1주일 밀키트 세트',
    price: 39900,
    category: 'gift',
    description: '요리·디저트·음료 키트 각 2종씩 총 6개 구성. 일주일 동안 논산 못난이 농산물로 혼자 해 먹는 도전 키트. 친환경 면 가방 포함.',
    cloudinaryId: p(6995262), // "Packed Food in Containers"
    sizes: ['1인 1주일'],
    stock: 25,
    origin: '충남 논산시',
  },
  {
    id: 'gf-002',
    name: '못난이 논산 제철 선물 세트',
    price: 28900,
    category: 'gift',
    description: '제철 못난이 농산물로 구성한 요리·음료 키트 3종. 매달 논산의 제철 재료로 구성이 바뀝니다. 받는 사람도 지구도 기쁜 선물.',
    cloudinaryId: p(1640771), // "Variety of Dishes"
    sizes: ['3종 세트'],
    stock: 30,
    origin: '충남 논산시',
  },
  {
    id: 'gf-003',
    name: '자취생 1인 응원 세트',
    price: 22900,
    category: 'gift',
    description: '스무디볼 + 크럼블 + 착즙 주스 3종 구성. 혼자 사는 친구에게, 시험 기간 룸메이트에게. 못난이 농산물로 만든 진심 어린 응원 키트.',
    cloudinaryId: p(1640776), // "Three Mason Jars Inlined on White Surface"
    sizes: ['3종 세트'],
    stock: 38,
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
