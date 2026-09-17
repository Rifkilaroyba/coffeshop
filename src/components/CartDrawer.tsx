import { useEffect } from 'react'
import { useCart } from '../context/cart-context'
import { formatRupiah } from '../data/products'

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalPrice,
    openCheckout,
  } = useCart()

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    if (isCartOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isCartOpen, closeCart])

  if (!isCartOpen) return null

  const freeShippingThreshold = 200000
  const freeShippingProgress = Math.min(100, (totalPrice / freeShippingThreshold) * 100)
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - totalPrice)

  const handleWhatsAppQuickOrder = () => {
    const lines = [
      'Halo Nusantara Coffee! Saya ingin memesan kopi:',
      '',
      ...cart.map(
        (item, index) =>
          `${index + 1}. ${item.product.name} (${item.grindSize}) x${item.quantity} = ${formatRupiah(
            item.product.price * item.quantity
          )}`
      ),
      '',
      `Total Belanja: ${formatRupiah(totalPrice)}`,
      '',
      'Mohon informasi rekening dan konfirmasi ongkos kirim ya. Terima kasih!'
    ]
    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank')
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-black/5 flex items-center justify-between bg-neutral">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h2 className="font-display font-semibold text-lg text-neutral-dark">
                Keranjang Belanja
              </h2>
              <span className="text-xs bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full">
                {totalCount} item
              </span>
            </div>

            <button
              onClick={closeCart}
              className="p-2 text-neutral-dark/50 hover:text-neutral-dark rounded-full hover:bg-black/5 transition"
              aria-label="Tutup keranjang"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Free shipping banner */}
          <div className="bg-slate-50 px-6 py-3 border-b border-black/5 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div>
                <p className="text-neutral-dark/80 mb-1.5">
                  Beli lagi senilai <strong className="text-primary">{formatRupiah(remainingForFreeShipping)}</strong> untuk <strong>Gratis Ongkir</strong>!
                </p>
                <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-leaf font-medium">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Selamat! Anda memenuhi syarat Gratis Ongkir!</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-black/5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12">
                <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-4">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="font-display font-semibold text-lg text-neutral-dark mb-1">
                  Keranjang masih kosong
                </h3>
                <p className="text-sm text-neutral-dark/60 max-w-xs mb-6">
                  Nikmati aneka biji kopi Nusantara terbaik langsung dari petani pilihan kami.
                </p>
                <button
                  onClick={closeCart}
                  className="btn-primary text-sm"
                >
                  Mulai Belanja Kopi
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 flex gap-4 items-start">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover ring-1 ring-black/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-sm text-neutral-dark truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-neutral-dark/40 hover:text-primary transition p-1"
                        aria-label="Hapus item"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>

                    <span className="inline-block mt-1 text-[11px] font-medium bg-slate-100 text-neutral-dark/70 px-2 py-0.5 rounded">
                      {item.grindSize}
                    </span>

                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border border-black/10 bg-white">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-dark/70 hover:bg-black/5 rounded-l text-xs font-semibold"
                          aria-label="Kurangi item"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="w-6 h-6 flex items-center justify-center text-neutral-dark/70 hover:bg-black/5 rounded-r text-xs font-semibold disabled:opacity-30"
                          aria-label="Tambah item"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-bold text-neutral-dark">
                          {formatRupiah(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-black/5 bg-slate-50 space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-neutral-dark/70">
                  <span>Subtotal ({totalCount} item)</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-neutral-dark/70">
                  <span>Estimasi Ongkir</span>
                  <span>{totalPrice >= freeShippingThreshold ? 'GRATIS' : 'Dihitung saat checkout'}</span>
                </div>
                <div className="flex justify-between font-bold text-base text-neutral-dark pt-2 border-t border-black/10">
                  <span>Total Belanja</span>
                  <span className="text-primary font-display text-lg">{formatRupiah(totalPrice)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={openCheckout}
                  className="w-full btn-primary justify-center py-3 text-base shadow-lg hover:shadow-primary/30"
                >
                  Checkout Sekarang
                </button>
                <button
                  onClick={handleWhatsAppQuickOrder}
                  className="w-full flex items-center justify-center gap-2 rounded-full border border-leaf/40 bg-leaf/10 text-leaf hover:bg-leaf/20 py-2.5 text-sm font-medium transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                  Pesan Cepat via WhatsApp
                </button>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-dark/40 hover:text-primary transition"
                >
                  Kosongkan Keranjang
                </button>
                <span className="text-[11px] text-neutral-dark/40">
                  🔒 Transaksi Aman & Terpercaya
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
