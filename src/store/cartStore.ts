import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type CartItem = {
  productId: string
  name: string
  price: number
  quantity: number
  size?: string
  color?: string
  cloudinaryId: string
}

// 같은 상품이라도 사이즈·색상이 다르면 별도 라인 아이템으로 취급
const itemKey = (productId: string, size?: string, color?: string) =>
  `${productId}::${size ?? ''}::${color ?? ''}`

type CartState = {
  items: CartItem[]
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void
  removeItem: (productId: string, size?: string, color?: string) => void
  updateQuantity: (productId: string, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) =>
        set((state) => {
          const key = itemKey(item.productId, item.size, item.color)
          const exists = state.items.find(
            (i) => itemKey(i.productId, i.size, i.color) === key,
          )
          if (exists) {
            return {
              items: state.items.map((i) =>
                itemKey(i.productId, i.size, i.color) === key
                  ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                  : i,
              ),
            }
          }
          return {
            items: [...state.items, { ...item, quantity: item.quantity ?? 1 }],
          }
        }),

      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.size, i.color) !== itemKey(productId, size, color),
          ),
        })),

      updateQuantity: (productId, quantity, size, color) =>
        set((state) => ({
          items: state.items.map((i) =>
            itemKey(i.productId, i.size, i.color) === itemKey(productId, size, color)
              ? { ...i, quantity }
              : i,
          ),
        })),

      clearCart: () => set({ items: [] }),

      getTotalPrice: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),

      getTotalCount: () =>
        get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'cart-storage',
      skipHydration: true, // SSR hydration 불일치 방지 — rehydrate()는 CartProvider에서 호출
    },
  ),
)
