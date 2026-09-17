import { createContext, useContext } from 'react'
import type { Product, CartItem, GrindSize } from '../types/product'

export interface CartContextType {
  cart: CartItem[]
  addToCart: (product: Product, quantity?: number, grindSize?: GrindSize) => void
  removeFromCart: (cartItemId: string) => void
  updateQuantity: (cartItemId: string, newQuantity: number) => void
  clearCart: () => void
  totalCount: number
  totalPrice: number
  isCartOpen: boolean
  openCart: () => void
  closeCart: () => void
  isCheckoutOpen: boolean
  openCheckout: () => void
  closeCheckout: () => void
  selectedDetailProduct: Product | null
  openDetail: (product: Product) => void
  closeDetail: () => void
  buyNow: (product: Product, quantity?: number, grindSize?: GrindSize) => void
  toast: { message: string; visible: boolean } | null
  hideToast: () => void
}

export const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
