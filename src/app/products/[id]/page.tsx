// 서버 컴포넌트 — 'use client' 없음
// params는 Next.js 15+에서 Promise이므로 반드시 await 필요
import { notFound } from 'next/navigation'
import { products } from '@/data/products'
import ProductDetailClient from '@/components/ProductDetailClient'

// 빌드 타임에 모든 상품 페이지를 정적으로 미리 생성
export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

type Props = {
  params: Promise<{ id: string }>
}

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  // 서버에서 조회한 데이터를 클라이언트 컴포넌트에 props로 전달
  return <ProductDetailClient product={product} />
}
