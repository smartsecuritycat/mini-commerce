'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import ProductImage from '@/components/ProductImage'
import SiteHeader from '@/components/SiteHeader'
import { CATEGORY_LABELS, type Product } from '@/data/products'
import { useCartStore } from '@/store/cartStore'
import { trackEvent } from '@/lib/analytics'

type Props = {
  product: Product
}

// 포장 단위별 가격 배수 (2인분 → 2배, 나머지 → 1배)
const SIZE_MULTIPLIER: Record<string, number> = {
  '2인분': 2,
  '2세트': 2,
  '2인용': 2,
  '4인용': 4,
  '8인용': 8,
}

export default function ProductDetailClient({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  // 선택된 사이즈에 따른 실제 가격
  const multiplier = SIZE_MULTIPLIER[selectedSize ?? ''] ?? 1
  const actualPrice = product.price * multiplier

  // 마운트 시 view_product 추적 (세션 내 상품별 1회만 집계)
  useEffect(() => {
    trackEvent('view_product', { productId: product.id, productName: product.name })
  }, [product.id, product.name])

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('포장 단위를 선택해주세요.')
      return
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: actualPrice,       // 사이즈 반영 가격
      cloudinaryId: product.cloudinaryId,
      quantity,
      size: selectedSize ?? undefined,
    })
    trackEvent('add_to_cart', {
      productId: product.id,
      productName: product.name,
      price: actualPrice,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1))
  const increaseQty = () => setQuantity((q) => Math.min(product.stock, q + 1))

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-6 sm:px-8 py-10">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors mb-10 tracking-wide group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform inline-block">←</span>
          <span>키트 목록으로</span>
        </Link>

        {/* 2열 레이아웃 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* 이미지 */}
          <div className="aspect-square overflow-hidden rounded-lg bg-[var(--card)]">
            <ProductImage
              src={product.cloudinaryId}
              alt={product.name}
              width={600}
              height={600}
              category={product.category}
              className="w-full h-full object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          {/* 상품 정보 */}
          <div className="flex flex-col">
            <p className="text-[10px] tracking-[0.25em] uppercase text-[var(--muted)] mb-3">
              {CATEGORY_LABELS[product.category]}
            </p>

            <h1 className="text-2xl font-black text-[var(--fg)] leading-snug mb-3">
              {product.name}
            </h1>

            <div className="flex items-baseline gap-2 mb-6">
              <p className="text-xl font-semibold text-[var(--fg)]">
                {actualPrice.toLocaleString('ko-KR')}원
              </p>
              {multiplier > 1 && (
                <p className="text-xs text-[var(--muted)]">
                  ({product.price.toLocaleString('ko-KR')}원 × {multiplier})
                </p>
              )}
            </div>

            <div className="border-t border-[var(--border)] mb-6" />

            <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* 산지 */}
            <p className="text-xs text-[var(--muted)] mb-6 tracking-wide">
              산지 — {product.origin}
            </p>

            {/* 포장 단위 */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--muted)] mb-3">
                  포장 단위{selectedSize && <span className="normal-case ml-2 text-[var(--fg)] font-semibold">— {selectedSize}</span>}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={[
                        'px-4 py-2 text-xs border transition-all duration-150',
                        selectedSize === size
                          ? 'border-[var(--fg)] text-[var(--fg)] bg-[var(--fg)]/5'
                          : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--fg)] hover:text-[var(--fg)]',
                      ].join(' ')}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 수량 */}
            <div className="mb-8">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[var(--muted)] mb-3">수량</p>
              <div className="inline-flex items-center border border-[var(--border)]">
                <button
                  onClick={decreaseQty}
                  disabled={quantity <= 1}
                  className="w-10 h-9 text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-30 transition-colors text-lg"
                >
                  −
                </button>
                <span className="w-10 text-center text-sm text-[var(--fg)]">{quantity}</span>
                <button
                  onClick={increaseQty}
                  disabled={quantity >= product.stock}
                  className="w-10 h-9 text-[var(--muted)] hover:text-[var(--fg)] disabled:opacity-30 transition-colors text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* 장바구니 담기 */}
            <button
              onClick={handleAddToCart}
              className={[
                'w-full py-3.5 text-xs tracking-widest uppercase border transition-all duration-200',
                added
                  ? 'border-[var(--fg)] text-[var(--fg)] bg-[var(--fg)]/5'
                  : 'border-[var(--fg)] bg-[var(--fg)] text-[var(--bg)] hover:bg-transparent hover:text-[var(--fg)]',
              ].join(' ')}
            >
              {added ? '담겼습니다' : '장바구니 담기'}
            </button>

            {product.stock <= 10 && (
              <p className="mt-3 text-xs text-[var(--muted)] text-center">
                남은 재고 {product.stock}개
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
