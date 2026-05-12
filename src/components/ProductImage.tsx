'use client'

import Image from 'next/image'
import { CldImage } from 'next-cloudinary'
import { useState } from 'react'
import type { Product } from '@/data/products'

const CATEGORY_PLACEHOLDER: Record<Product['category'] | 'default', { bg: string; label: string }> = {
  cooking: { bg: 'bg-orange-50', label: '요리 키트' },
  dessert: { bg: 'bg-pink-50',   label: '디저트 키트' },
  drink:   { bg: 'bg-sky-50',    label: '음료 키트' },
  gift:    { bg: 'bg-rose-50',   label: '선물 세트' },
  default: { bg: 'bg-stone-100', label: '준비 중' },
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ?? ''
const IS_CLOUDINARY_READY = CLOUD_NAME.length > 0 && !CLOUD_NAME.startsWith('여기에')

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

  const Fallback = () => (
    <div className={`${placeholder.bg} flex items-center justify-center w-full h-full ${className ?? ''}`}>
      <span className="text-xs text-stone-400 tracking-wide">{placeholder.label}</span>
    </div>
  )

  if (hasError) return <Fallback />

  // https:// 로 시작하면 Next.js Image로 직접 렌더 (Unsplash 등 외부 URL)
  if (src.startsWith('https://')) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        sizes={sizes}
        onError={() => setHasError(true)}
      />
    )
  }

  // Cloudinary public_id
  if (!IS_CLOUDINARY_READY) return <Fallback />

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
