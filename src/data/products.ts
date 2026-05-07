export type Product = {
  id: string
  name: string
  price: number
  category: 'fruit' | 'vegetable' | 'grain' | 'special'
  description: string
  cloudinaryId: string
  sizes?: string[]   // 포장 단위 (예: 500g, 1kg, 3kg)
  stock: number
  origin: string     // 산지
}

export const products: Product[] = [
  // ───── 과일 ─────
  {
    id: 'fr-001',
    name: '완주 딸기',
    price: 8900,
    category: 'fruit',
    description: '완주 논산딸기 산지에서 직송. 당도 12° 이상 보장, 수확 당일 포장·발송합니다.',
    cloudinaryId: 'localfood/strawberry-wanju',
    sizes: ['500g', '1kg', '2kg'],
    stock: 40,
    origin: '전북 완주군',
  },
  {
    id: 'fr-002',
    name: '무주 사과',
    price: 14500,
    category: 'fruit',
    description: '해발 400m 고냉지에서 자란 무주 사과. 일교차가 커 당도와 아삭함이 남다릅니다.',
    cloudinaryId: 'localfood/apple-muju',
    sizes: ['3kg', '5kg', '10kg'],
    stock: 30,
    origin: '전북 무주군',
  },
  {
    id: 'fr-003',
    name: '고창 복분자',
    price: 15000,
    category: 'fruit',
    description: '고창 선운산 자락 청정 지역에서 자란 복분자. 생과 그대로 급랭 포장해 신선함을 유지합니다.',
    cloudinaryId: 'localfood/blackraspberry-gochang',
    sizes: ['500g', '1kg'],
    stock: 25,
    origin: '전북 고창군',
  },

  // ───── 채소·버섯 ─────
  {
    id: 'vg-001',
    name: '남원 고구마',
    price: 5500,
    category: 'vegetable',
    description: '황토 땅에서 자란 남원 밤고구마. 쪄도 구워도 달콤하고 찰진 맛이 일품입니다.',
    cloudinaryId: 'localfood/sweetpotato-namwon',
    sizes: ['1kg', '3kg', '5kg'],
    stock: 60,
    origin: '전북 남원시',
  },
  {
    id: 'vg-002',
    name: '진안 표고버섯',
    price: 11000,
    category: 'vegetable',
    description: '진안 고원 참나무 원목에서 자란 표고버섯. 향이 진하고 두꺼운 육질이 특징입니다.',
    cloudinaryId: 'localfood/mushroom-jinan',
    sizes: ['200g', '500g'],
    stock: 35,
    origin: '전북 진안군',
  },
  {
    id: 'vg-003',
    name: '부여 방울토마토',
    price: 7800,
    category: 'vegetable',
    description: '충남 부여 청정 지역 비닐하우스에서 수경재배. 껍질이 얇고 과즙이 풍부합니다.',
    cloudinaryId: 'localfood/tomato-buyeo',
    sizes: ['500g', '1kg'],
    stock: 45,
    origin: '충남 부여군',
  },

  // ───── 쌀·장류 ─────
  {
    id: 'gr-001',
    name: '담양 쌀',
    price: 18000,
    category: 'grain',
    description: '대나무 숲 맑은 물로 키운 담양 삼광쌀. 찰기가 좋고 윤기가 흘러 밥맛이 특별합니다.',
    cloudinaryId: 'localfood/rice-damyang',
    sizes: ['4kg', '8kg', '20kg'],
    stock: 50,
    origin: '전남 담양군',
  },
  {
    id: 'gr-002',
    name: '순창 고추장',
    price: 9800,
    category: 'grain',
    description: '3년 숙성 전통방식 순창 고추장. 메주콩과 고춧가루를 전통 옹기에서 발효시킵니다.',
    cloudinaryId: 'localfood/gochujang-sunchang',
    sizes: ['500g', '1kg'],
    stock: 70,
    origin: '전북 순창군',
  },
  {
    id: 'gr-003',
    name: '순창 된장',
    price: 8500,
    category: 'grain',
    description: '국산 콩과 천일염으로 담근 2년 숙성 전통 된장. 깊은 구수함이 요리를 살립니다.',
    cloudinaryId: 'localfood/doenjang-sunchang',
    sizes: ['500g', '1kg'],
    stock: 55,
    origin: '전북 순창군',
  },

  // ───── 특산물 ─────
  {
    id: 'sp-001',
    name: '임실 치즈',
    price: 12000,
    category: 'special',
    description: '국내 1호 자연 치즈 고장 임실에서 생산. 신선한 원유를 당일 가공해 풍미가 살아있습니다.',
    cloudinaryId: 'localfood/cheese-imsil',
    sizes: ['200g', '400g'],
    stock: 40,
    origin: '전북 임실군',
  },
  {
    id: 'sp-002',
    name: '부안 오분자기',
    price: 22000,
    category: 'special',
    description: '서해 청정 해역 부안에서 채취한 자연산 오분자기(소형 전복). 콜라겐이 풍부합니다.',
    cloudinaryId: 'localfood/abalone-buan',
    sizes: ['500g', '1kg'],
    stock: 20,
    origin: '전북 부안군',
  },
  {
    id: 'sp-003',
    name: '장수 한봉 꿀',
    price: 28000,
    category: 'special',
    description: '백두대간 청정 산림의 야생화에서 채밀한 장수 토종꿀. 항산화 성분이 풍부합니다.',
    cloudinaryId: 'localfood/honey-jangsu',
    sizes: ['500g'],
    stock: 28,
    origin: '전북 장수군',
  },
]

export const CATEGORY_LABELS: Record<Product['category'] | 'all', string> = {
  all: '전체',
  fruit: '과일',
  vegetable: '채소·버섯',
  grain: '쌀·장류',
  special: '특산물',
}
