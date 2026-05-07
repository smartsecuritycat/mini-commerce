'use client'

import Link from 'next/link'
import { useState } from 'react'
import ProductImage from '@/components/ProductImage'
import { products, CATEGORY_LABELS, type Product } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { trackEvent } from '@/lib/analytics'

type FilterCategory = 'all' | Product['category']

const FILTER_CATEGORIES: FilterCategory[] = ['all', 'cooking', 'dessert', 'drink', 'gift']

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
    setTimeout(() => setAddedId((prev) => (prev === product.id ? null : prev)), 1400)
  }

  return (
    <section>
      {/* 카테고리 — 탭 언더라인 스타일 */}
      <div className="flex gap-0 mb-10 border-b border-[var(--border)] overflow-x-auto">
        {FILTER_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={[
              'shrink-0 pb-3 px-4 text-xs tracking-wide border-b-[1.5px] -mb-px transition-colors whitespace-nowrap',
              active === cat
                ? 'border-[var(--fg)] text-[var(--fg)] font-semibold'
                : 'border-transparent text-[var(--muted)] hover:text-[var(--fg)]',
            ].join(' ')}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        ))}
        <span className="ml-auto shrink-0 self-center text-[11px] text-[var(--muted)] pr-1 pb-3">
          {filtered.length}종
        </span>
      </div>

      {/* 상품 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-12">
        {filtered.map((product) => (
          <div key={product.id} className="group flex flex-col">
            <Link href={`/products/${product.id}`} className="block">
              {/* 이미지 */}
              <div className="overflow-hidden rounded-lg aspect-square mb-4 bg-[var(--card)]">
                <ProductImage
                  src={product.cloudinaryId}
                  alt={product.name}
                  width={400}
                  height={400}
                  category={product.category}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* 텍스트 */}
              <p className="text-[10px] text-[var(--muted)] tracking-widest uppercase mb-1.5">
                {CATEGORY_LABELS[product.category]}
              </p>
              <h3 className="text-sm text-[var(--fg)] leading-snug mb-2 line-clamp-2">
                {product.name}
              </h3>
              <p className="text-sm font-semibold text-[var(--fg)]">
                {product.price.toLocaleString('ko-KR')}원
              </p>
            </Link>

            {/* 담기 버튼 — 테두리 스타일 */}
            <button
              onClick={() => handleAddToCart(product)}
              className={[
                'mt-4 w-full py-2.5 text-[11px] tracking-widest uppercase border transition-all duration-200',
                addedId === product.id
                  ? 'border-[var(--fg)] text-[var(--fg)] bg-[var(--fg)]/5'
                  : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--fg)] hover:text-[var(--fg)]',
              ].join(' ')}
            >
              {addedId === product.id ? '담겼습니다' : '장바구니 담기'}
            </button>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="py-24 text-center text-[var(--muted)] text-sm">
          해당 카테고리의 상품이 없습니다.
        </div>
      )}
    </section>
  )
}
