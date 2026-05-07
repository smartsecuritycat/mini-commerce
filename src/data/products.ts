export type Product = {
  id: string
  name: string
  price: number
  category: 'tshirt' | 'hoodie' | 'mug' | 'bag'
  description: string
  cloudinaryId: string
  sizes?: string[]
  colors?: string[]
  stock: number
}

export const products: Product[] = [
  // ───── 티셔츠 ─────
  {
    id: 'ts-001',
    name: '베이직 로고 티셔츠',
    price: 29000,
    category: 'tshirt',
    description: '매일 입고 싶은 미니멀 로고 티셔츠. 320g 두꺼운 코튼으로 제작했습니다.',
    cloudinaryId: 'products/tshirt-basic-logo',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['화이트', '블랙', '그레이'],
    stock: 50,
  },
  {
    id: 'ts-002',
    name: '스트라이프 오버핏 티셔츠',
    price: 35000,
    category: 'tshirt',
    description: '여름에 시원하게 입기 좋은 오버핏 스트라이프 패턴. 통기성 좋은 린넨 혼방 소재.',
    cloudinaryId: 'products/tshirt-stripe-overfit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['네이비/화이트', '블랙/화이트'],
    stock: 30,
  },
  {
    id: 'ts-003',
    name: '그래픽 프린트 티셔츠',
    price: 32000,
    category: 'tshirt',
    description: '아티스트와 협업한 리미티드 그래픽. 워싱 처리된 빈티지 감성의 코튼.',
    cloudinaryId: 'products/tshirt-graphic-print',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['블랙', '베이지'],
    stock: 20,
  },

  // ───── 후드 ─────
  {
    id: 'hd-001',
    name: '클래식 집업 후드',
    price: 59000,
    category: 'hoodie',
    description: '집업 타입으로 레이어드하기 좋습니다. 헤비웨이트 플리스 안감으로 따뜻함.',
    cloudinaryId: 'products/hoodie-classic-zipup',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['차콜', '아이보리'],
    stock: 25,
  },
  {
    id: 'hd-002',
    name: '오버사이즈 풀오버 후드',
    price: 65000,
    category: 'hoodie',
    description: '넉넉한 오버사이즈 핏. 400g 두꺼운 코튼 플리스로 겨울에도 든든합니다.',
    cloudinaryId: 'products/hoodie-oversize-pullover',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['블랙', '그레이', '네이비'],
    stock: 40,
  },
  {
    id: 'hd-003',
    name: '크루넥 스웨트셔츠',
    price: 49000,
    category: 'hoodie',
    description: '후드 없이 깔끔하게. 루즈한 크루넥 핏으로 다양한 스타일링이 가능합니다.',
    cloudinaryId: 'products/hoodie-crewneck',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['화이트', '핑크', '민트'],
    stock: 35,
  },

  // ───── 머그컵 ─────
  {
    id: 'mg-001',
    name: '로고 세라믹 머그',
    price: 18000,
    category: 'mug',
    description: '매일 아침 커피 한 잔. 전자레인지·식기세척기 사용 가능한 고급 세라믹.',
    cloudinaryId: 'products/mug-ceramic-logo',
    colors: ['화이트', '블랙'],
    stock: 80,
  },
  {
    id: 'mg-002',
    name: '미니멀 텀블러',
    price: 28000,
    category: 'mug',
    description: '이중 진공 스테인리스 구조. 12시간 보온·보냉. 350ml 용량.',
    cloudinaryId: 'products/mug-tumbler',
    colors: ['실버', '매트블랙', '아이보리'],
    stock: 60,
  },
  {
    id: 'mg-003',
    name: '더블월 유리 머그',
    price: 22000,
    category: 'mug',
    description: '투명한 이중 유리로 음료가 둥둥 떠 있는 듯한 효과. 350ml.',
    cloudinaryId: 'products/mug-glass-double',
    colors: ['클리어'],
    stock: 45,
  },

  // ───── 에코백 ─────
  {
    id: 'bg-001',
    name: '캔버스 토트백',
    price: 25000,
    category: 'bag',
    description: '두꺼운 10oz 캔버스 소재. A4 파일도 넉넉하게 들어가는 큰 사이즈.',
    cloudinaryId: 'products/bag-canvas-tote',
    colors: ['내추럴', '블랙'],
    stock: 70,
  },
  {
    id: 'bg-002',
    name: '미니 크로스백',
    price: 35000,
    category: 'bag',
    description: '조절 가능한 스트랩. 작지만 스마트폰·카드·이어폰은 다 들어갑니다.',
    cloudinaryId: 'products/bag-mini-cross',
    colors: ['블랙', '브라운', '그린'],
    stock: 30,
  },
  {
    id: 'bg-003',
    name: '지퍼 파우치',
    price: 15000,
    category: 'bag',
    description: '파우치로도, 작은 클러치로도 활용 가능. 방수 코팅 처리.',
    cloudinaryId: 'products/bag-zip-pouch',
    colors: ['네이비', '베이지', '블랙'],
    stock: 100,
  },
]

export const CATEGORY_LABELS: Record<Product['category'] | 'all', string> = {
  all: '전체',
  tshirt: '티셔츠',
  hoodie: '후드',
  mug: '머그컵',
  bag: '에코백',
}
