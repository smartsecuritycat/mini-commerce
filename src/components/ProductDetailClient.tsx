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

export default function ProductDetailClient({ product }: Props) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  // 마운트 시 view_product 추적 (세션 내 상품별 1회만 집계)
  useEffect(() => {
    trackEvent('view_product', { productId: product.id, productName: product.name })
  }, [product.id, product.name])

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      alert('사이즈를 선택해주세요.')
      return
    }
    if (product.colors && !selectedColor) {
      alert('색상을 선택해주세요.')
      return
    }

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      cloudinaryId: product.cloudinaryId,
      quantity,
      size: selectedSize ?? undefined,
      color: selectedColor ?? undefined,
    })
    trackEvent('add_to_cart', {
      productId: product.id,
      productName: product.name,
      price: product.price,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const decreaseQty = () => setQuantity((q) => Math.max(1, q - 1))
  const increaseQty = () => setQuantity((q) => Math.min(product.stock, q + 1))

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <SiteHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* 뒤로가기 */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-black transition-colors mb-8"
        >
          <span className="text-base leading-none">←</span>
          <span>상품 목록으로</span>
        </Link>

        {/* 2열 레이아웃: 모바일 1열 / 데스크탑 2열 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {/* ── 좌: 이미지 ── */}
          <div className="aspect-square overflow-hidden rounded-3xl bg-gray-50">
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

          {/* ── 우: 상품 정보 ── */}
          <div className="flex flex-col">
            {/* 카테고리 배지 */}
            <span className="inline-block self-start px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase mb-3">
              {CATEGORY_LABELS[product.category]}
            </span>

            {/* 상품명 */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 leading-snug mb-2">
              {product.name}
            </h1>

            {/* 가격 */}
            <p className="text-2xl font-black text-black dark:text-white mb-4">
              {product.price.toLocaleString('ko-KR')}원
            </p>

            {/* 구분선 */}
            <div className="border-t border-gray-100 dark:border-gray-800 mb-5" />

            {/* 상품 설명 */}
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* 사이즈 선택 */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  사이즈
                  {selectedSize && (
                    <span className="ml-2 normal-case text-black font-bold">
                      — {selectedSize}
                    </span>
                  )}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={[
                        'w-12 h-10 rounded-lg text-sm font-semibold border transition-all duration-150',
                        selectedSize === size
                          ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                          : 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-gray-400',
                      ].join(' ')}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 색상 선택 */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  색상
                  {selectedColor && (
                    <span className="ml-2 normal-case text-black font-bold">
                      — {selectedColor}
                    </span>
                  )}
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={[
                        'px-3 h-9 rounded-lg text-sm font-medium border transition-all duration-150',
                        selectedColor === color
                          ? 'bg-black dark:bg-white text-white dark:text-black border-black dark:border-white'
                          : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-400',
                      ].join(' ')}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 수량 선택 */}
            <div className="mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                수량
              </p>
              <div className="inline-flex items-center border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
                <button
                  onClick={decreaseQty}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-lg text-gray-600
                    hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  −
                </button>
                <span className="w-12 text-center text-sm font-semibold text-gray-900">
                  {quantity}
                </span>
                <button
                  onClick={increaseQty}
                  disabled={quantity >= product.stock}
                  className="w-10 h-10 flex items-center justify-center text-lg text-gray-600
                    hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* 장바구니 담기 버튼 */}
            <button
              onClick={handleAddToCart}
              className={[
                'w-full py-4 rounded-2xl text-sm font-bold transition-all duration-200 mb-3',
                added
                  ? 'bg-emerald-500 text-white scale-[0.98]'
                  : 'bg-black text-white hover:bg-gray-800 active:scale-[0.98]',
              ].join(' ')}
            >
              {added ? '✓ 장바구니에 담겼습니다' : '장바구니 담기'}
            </button>

            {/* 재고 */}
            <p className="text-center text-xs text-gray-400">
              {product.stock <= 10 ? (
                <span className="text-red-500 font-medium">남은 재고 {product.stock}개</span>
              ) : (
                `재고 ${product.stock}개`
              )}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
