'use client'

import Link from 'next/link'
import { useState } from 'react'
import ProductImage from '@/components/ProductImage'
import { products, CATEGORY_LABELS, type Product } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { trackEvent } from '@/lib/analytics'

type FilterCategory = 'all' | Product['category']

const FILTER_CATEGORIES: FilterCategory[] = ['all', 'fruit', 'vegetable', 'grain', 'special']

export default function ProductGrid() {
  const [active, setActive] = useState<FilterCategory>('all')
  const [addedId, setAddedId] = useState<string | null>(null)
  const addItem = useCartStore((state) => state.addItem)

  const filtered =
    active === 'all' ? products : products.filter((p) => p.category === active)

  const handleAddToCart = (product: Product) => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      cloudinaryId: product.cloudinaryId,
    })
    trackEvent('add_to_cart', {
      productId: product.id,
      productName: product.name,
      price: product.price,
    })
    setAddedId(product.id)
    setTimeout(() => setAddedId((prev) => (prev === product.id ? null : prev)), 1200)
  }

  return (
    <section>
      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTER_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={[
              'px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
              active === cat
                ? 'bg-black dark:bg-white text-white dark:text-black shadow-sm'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700',
            ].join(' ')}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
        <span className="ml-auto self-center text-sm text-gray-400 dark:text-gray-500">
          {filtered.length}개 상품
        </span>
      </div>

      {/* 반응형 상품 그리드: 모바일 2열 / 태블릿 3열 / 데스크탑 4열 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
        {filtered.map((product) => (
          <div key={product.id} className="group flex flex-col">
            <Link href={`/products/${product.id}`} className="block flex-1">
              {/* 이미지 */}
              <div className="overflow-hidden rounded-2xl aspect-square mb-3 bg-gray-50 dark:bg-gray-800">
                <ProductImage
                  src={product.cloudinaryId}
                  alt={product.name}
                  width={400}
                  height={400}
                  category={product.category}
                  className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* 상품 정보 */}
              <div className="px-0.5">
                <p className="text-[11px] text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-0.5">
                  {CATEGORY_LABELS[product.category]}
                </p>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 leading-snug mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  {product.price.toLocaleString('ko-KR')}원
                </p>
                {product.stock <= 10 && (
                  <p className="text-[11px] text-red-500 mt-0.5">재고 {product.stock}개</p>
                )}
              </div>
            </Link>

            {/* 담기 버튼 */}
            <button
              onClick={() => handleAddToCart(product)}
              className={[
                'mt-3 w-full py-2.5 text-sm font-semibold rounded-xl transition-all duration-150',
                addedId === product.id
                  ? 'bg-emerald-500 text-white scale-95'
                  : 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 active:scale-95',
              ].join(' ')}
            >
              {addedId === product.id ? '✓ 담겼어요' : '담기'}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-gray-400 dark:text-gray-600">
          <p className="text-4xl mb-3">😶</p>
          <p className="text-sm">해당 카테고리에 상품이 없습니다.</p>
        </div>
      )}
    </section>
  )
}
