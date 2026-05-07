'use client'

// CldImage는 내부적으로 useState를 사용하므로 반드시 'use client' 선언 필요
import { CldImage } from 'next-cloudinary'
import { useState } from 'react'
import type { Product } from '@/data/products'

const CATEGORY_PLACEHOLDER: Record<Product['category'] | 'default', { bg: string; emoji: string }> = {
  tshirt: { bg: 'bg-emerald-50', emoji: '👕' },
  hoodie: { bg: 'bg-sky-50', emoji: '🧥' },
  mug: { bg: 'bg-amber-50', emoji: '☕' },
  bag: { bg: 'bg-violet-50', emoji: '👜' },
  default: { bg: 'bg-gray-100', emoji: '📦' },
}

type ProductImageProps = {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  sizes?: string
  category?: Product['category']
}

export default function ProductImage({
  src,
  alt,
  width,
  height,
  className,
  sizes,
  category,
}: ProductImageProps) {
  const [hasError, setHasError] = useState(false)

  const placeholder = category
    ? CATEGORY_PLACEHOLDER[category]
    : CATEGORY_PLACEHOLDER.default

  if (hasError) {
    return (
      <div
        className={`${placeholder.bg} flex flex-col items-center justify-center gap-2 w-full h-full ${className ?? ''}`}
      >
        <span className="text-4xl">{placeholder.emoji}</span>
        <span className="text-xs text-gray-400">이미지 준비 중</span>
      </div>
    )
  }

  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      crop="fill"
      gravity="auto"
      format="auto"
      quality="auto"
      className={className}
      sizes={sizes}
      onError={() => setHasError(true)}
    />
  )
}
