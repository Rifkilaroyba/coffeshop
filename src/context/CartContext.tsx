import { useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Product, CartItem, GrindSize } from '../types/product'
import { CartContext } from './cart-context'

const CART_STORAGE_KEY = 'nusantara_coffee_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null)
  const [toast, setToast] = useState<{ message: string; visible: boolean } | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (e) {
      console.error('Failed to persist cart to localStorage', e)
    }
  }, [cart])

  const showToast = (message: string) => {
    setToast({ message, visible: true })
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? { ...prev, visible: false } : prev))
    }, 3500)
  }

  const hideToast = () => {
    setToast(null)
  }

  const addToCart = (product: Product, quantity = 1, grindSize: GrindSize = 'Biji Utuh') => {
    const compositeId = `${product.id}-${grindSize}`
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === compositeId)
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }
      return [...prev, { id: compositeId, product, grindSize, quantity }]
    })

    showToast(`${quantity}x ${product.name} (${grindSize}) dimasukkan ke keranjang!`)
  }

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId))
  }

  const updateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)

  const openCheckout = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }
  const closeCheckout = () => setIsCheckoutOpen(false)

  const openDetail = (product: Product) => setSelectedDetailProduct(product)
  const closeDetail = () => setSelectedDetailProduct(null)

  const buyNow = (product: Product, quantity = 1, grindSize: GrindSize = 'Biji Utuh') => {
    addToCart(product, quantity, grindSize)
    setIsCartOpen(false)
    setSelectedDetailProduct(null)
    setIsCheckoutOpen(true)
  }

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalCount,
        totalPrice,
        isCartOpen,
        openCart,
        closeCart,
        isCheckoutOpen,
        openCheckout,
        closeCheckout,
        selectedDetailProduct,
        openDetail,
        closeDetail,
        buyNow,
        toast,
        hideToast,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
