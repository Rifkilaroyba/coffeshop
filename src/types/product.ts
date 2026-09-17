export type GrindSize = 'Biji Utuh' | 'Giling Kasar' | 'Giling Sedang' | 'Giling Halus'

export type Product = {
  id: string
  slug: string
  name: string
  region: string
  island: 'Sumatra' | 'Jawa' | 'Sulawesi' | 'Bali & NTT' | 'Papua'
  altitude: string
  process: string
  roastLevel: string
  varietal: string
  notes: string
  tastingNotes: string[]
  price: number
  originalPrice?: number
  rating: number
  reviewsCount: number
  weight: string
  stock: number
  description: string
  brewRecommendation: string
  acidity: number // 1 to 5
  body: number // 1 to 5
  sweetness: number // 1 to 5
  image: string
}

export type CartItem = {
  id: string // composite key: `${product.id}-${grindSize}`
  product: Product
  grindSize: GrindSize
  quantity: number
}

export type CheckoutFormData = {
  fullName: string
  phone: string
  address: string
  city: string
  postalCode: string
  courier: string
  paymentMethod: 'transfer' | 'qris' | 'cod'
  notes?: string
}

export type OrderConfirmation = {
  orderId: string
  date: string
  items: CartItem[]
  totalPrice: number
  shippingFee: number
  customer: CheckoutFormData
}
