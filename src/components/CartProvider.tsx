'use client'

// 클라이언트 마운트 후 localStorage → Zustand 스토어로 장바구니 복원
// skipHydration: true 이므로 이 useEffect 없이는 새로고침 시 장바구니가 비어 보임
import { useEffect } from 'react'
import { useCartStore } from '@/store/cartStore'

export default function CartProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useCartStore.persist.rehydrate()
  }, [])

  return <>{children}</>
}
