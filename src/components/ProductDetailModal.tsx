import { useState, useEffect } from 'react'
import { useCart } from '../context/cart-context'
import type { GrindSize } from '../types/product'
import { formatRupiah } from '../data/products'

const GRIND_OPTIONS: { size: GrindSize; label: string; desc: string }[] = [
  { size: 'Biji Utuh', label: 'Biji Utuh (Whole Bean)', desc: 'Untuk digiling sendiri di rumah' },
  { size: 'Giling Kasar', label: 'Kasar (Coarse)', desc: 'French Press, Cold Brew, Cupping' },
  { size: 'Giling Sedang', label: 'Sedang (Medium)', desc: 'V60, Kalita, Aeropress, Chemex' },
  { size: 'Giling Halus', label: 'Halus (Fine)', desc: 'Espresso, Moka Pot, Kopi Tubruk' },
]

export default function ProductDetailModal() {
  const { selectedDetailProduct, closeDetail, addToCart, buyNow } = useCart()
  const [selectedGrind, setSelectedGrind] = useState<GrindSize>('Biji Utuh')
  const [quantity, setQuantity] = useState(1)

  // Reset state when a new product is selected
  useEffect(() => {
    setSelectedGrind('Biji Utuh')
    setQuantity(1)
  }, [selectedDetailProduct])

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeDetail()
    }
    if (selectedDetailProduct) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [selectedDetailProduct, closeDetail])

  if (!selectedDetailProduct) return null

  const product = selectedDetailProduct
  const totalPrice = product.price * quantity

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedGrind)
  }

  const handleBuyNow = () => {
    buyNow(product, quantity, selectedGrind)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeDetail}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[90vh]">
        {/* Modal Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-neutral">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-coffee/10 text-coffee">
              {product.island}
            </span>
            <span className="text-xs text-neutral-dark/60">•</span>
            <span className="text-xs text-neutral-dark/60">{product.region}</span>
          </div>
          <button
            onClick={closeDetail}
            className="rounded-full p-2 text-neutral-dark/60 hover:text-neutral-dark hover:bg-black/5 transition"
            aria-label="Tutup detail produk"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Image section */}
            <div className="space-y-3">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative shadow-inner ring-1 ring-black/5 bg-slate-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold shadow-sm text-neutral-dark">
                  {product.weight}
                </div>
                <div className="absolute bottom-3 left-3 right-3 bg-black/60 backdrop-blur-md rounded-xl p-2.5 text-white text-xs flex justify-between items-center">
                  <span>Ketinggian: {product.altitude}</span>
                  <span className="bg-leaf/90 px-2 py-0.5 rounded text-[11px] font-medium">Stok: {product.stock} pcs</span>
                </div>
              </div>

              {/* Flavor Profile Bars */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-black/5 space-y-2.5">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-dark/70">
                  Profil Karakteristik Rasa
                </h4>
                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span>Keasaman (Acidity)</span>
                    <span className="text-primary font-bold">{product.acidity}/5</span>
                  </div>
                  <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-300"
                      style={{ width: `${(product.acidity / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span>Ketebalan (Body)</span>
                    <span className="text-coffee font-bold">{product.body}/5</span>
                  </div>
                  <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-coffee rounded-full transition-all duration-300"
                      style={{ width: `${(product.body / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1 font-medium">
                    <span>Rasa Manis (Sweetness)</span>
                    <span className="text-amber-500 font-bold">{product.sweetness}/5</span>
                  </div>
                  <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-300"
                      style={{ width: `${(product.sweetness / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Info & Purchase section */}
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex text-amber-400 text-sm">
                    {'★'.repeat(Math.floor(product.rating))}
                  </div>
                  <span className="text-xs font-semibold text-neutral-dark">{product.rating}</span>
                  <span className="text-xs text-neutral-dark/50">({product.reviewsCount} ulasan)</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-neutral-dark">
                  {product.name}
                </h2>
                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-2xl sm:text-3xl font-bold text-primary font-display">
                    {formatRupiah(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-neutral-dark/40">
                      {formatRupiah(product.originalPrice)}
                    </span>
                  )}
                  <span className="text-xs text-neutral-dark/60 font-medium">/ {product.weight}</span>
                </div>
              </div>

              {/* Tasting notes chips */}
              <div>
                <p className="text-xs font-semibold text-neutral-dark/70 mb-2 uppercase tracking-wide">
                  Tasting Notes
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {product.tastingNotes.map((note) => (
                    <span
                      key={note}
                      className="px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <p className="text-sm text-neutral-dark/80 leading-relaxed">
                {product.description}
              </p>

              {/* Specs info */}
              <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-black/5">
                <div>
                  <span className="text-neutral-dark/50 block">Proses:</span>
                  <span className="font-semibold text-neutral-dark">{product.process}</span>
                </div>
                <div>
                  <span className="text-neutral-dark/50 block">Roast Level:</span>
                  <span className="font-semibold text-neutral-dark">{product.roastLevel}</span>
                </div>
                <div>
                  <span className="text-neutral-dark/50 block">Varietas:</span>
                  <span className="font-semibold text-neutral-dark">{product.varietal}</span>
                </div>
                <div>
                  <span className="text-neutral-dark/50 block">Rekomendasi Seduh:</span>
                  <span className="font-semibold text-neutral-dark">{product.brewRecommendation}</span>
                </div>
              </div>

              {/* Grind Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-dark/70 mb-2 uppercase tracking-wide">
                  Pilihan Bentuk & Gilingan:
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {GRIND_OPTIONS.map((option) => (
                    <button
                      key={option.size}
                      type="button"
                      onClick={() => setSelectedGrind(option.size)}
                      className={`text-left p-2.5 rounded-xl border transition text-xs flex flex-col justify-between ${
                        selectedGrind === option.size
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-black/10 hover:border-black/20 bg-white'
                      }`}
                    >
                      <span className={`font-semibold ${selectedGrind === option.size ? 'text-primary' : 'text-neutral-dark'}`}>
                        {option.size}
                      </span>
                      <span className="text-[10px] text-neutral-dark/60 mt-0.5 leading-tight">
                        {option.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-dark/70 mb-2 uppercase tracking-wide">
                  Jumlah Pesanan:
                </label>
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center rounded-full border border-black/15 bg-white p-1">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-dark/70 hover:text-neutral-dark hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      aria-label="Kurangi jumlah"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                    <button
                      type="button"
                      disabled={quantity >= product.stock}
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-dark/70 hover:text-neutral-dark hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
                      aria-label="Tambah jumlah"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-xs text-neutral-dark/60">
                    Total: <strong className="text-neutral-dark text-sm">{formatRupiah(totalPrice)}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-black/5 bg-slate-50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="hidden sm:block">
            <span className="text-xs text-neutral-dark/60">Subtotal</span>
            <p className="text-xl font-display font-bold text-neutral-dark">{formatRupiah(totalPrice)}</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial btn-outline justify-center border-neutral-dark/20 text-neutral-dark hover:bg-black/5"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Tambah Keranjang
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 sm:flex-initial btn-primary justify-center shadow-lg hover:shadow-primary/30"
            >
              Beli Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
