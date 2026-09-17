import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useCart } from '../context/cart-context'
import { formatRupiah } from '../data/products'
import type { CheckoutFormData, OrderConfirmation } from '../types/product'

export default function CheckoutModal() {
  const { isCheckoutOpen, closeCheckout, cart, totalPrice, clearCart } = useCart()

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    courier: 'JNE Reguler (Rp 15.000)',
    paymentMethod: 'transfer',
    notes: '',
  })

  const [shippingCost, setShippingCost] = useState(15000)
  const [completedOrder, setCompletedOrder] = useState<OrderConfirmation | null>(null)
  const [copiedAccount, setCopiedAccount] = useState(false)

  // ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCheckout()
    }
    if (isCheckoutOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isCheckoutOpen, closeCheckout])

  // Reset when checkout opens
  useEffect(() => {
    if (isCheckoutOpen) {
      setCompletedOrder(null)
    }
  }, [isCheckoutOpen])

  // Shipping calculation
  const freeShipping = totalPrice >= 200000
  const finalShipping = freeShipping ? 0 : shippingCost
  const grandTotal = totalPrice + finalShipping

  const handleCourierChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value
    let cost = 15000
    if (val.includes('SiCepat Express')) cost = 18000
    if (val.includes('J&T Express')) cost = 16000
    if (val.includes('Instant/Sameday')) cost = 30000
    setShippingCost(cost)
    setFormData((prev) => ({ ...prev, courier: val }))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const orderId = `NC-${Math.floor(100000 + Math.random() * 900000)}`
    const newOrder: OrderConfirmation = {
      orderId,
      date: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
      items: [...cart],
      totalPrice: grandTotal,
      shippingFee: finalShipping,
      customer: { ...formData },
    }

    setCompletedOrder(newOrder)
    clearCart()
  }

  const openWhatsAppConfirmation = (order: OrderConfirmation) => {
    const lines = [
      `Halo Admin Nusantara Coffee!`,
      `Saya telah membuat pesanan baru dengan detail berikut:`,
      '',
      `*No. Pesanan:* ${order.orderId}`,
      `*Tanggal:* ${order.date}`,
      `*Nama:* ${order.customer.fullName}`,
      `*No. WhatsApp:* ${order.customer.phone}`,
      `*Alamat:* ${order.customer.address}, ${order.customer.city} (${order.customer.postalCode || '-'})`,
      `*Kurir:* ${order.customer.courier}`,
      `*Metode Pembayaran:* ${order.customer.paymentMethod.toUpperCase()}`,
      order.customer.notes ? `*Catatan:* ${order.customer.notes}` : '',
      '',
      `*Detail Produk:*`,
      ...order.items.map(
        (i) => `- ${i.quantity}x ${i.product.name} [${i.grindSize}] = ${formatRupiah(i.product.price * i.quantity)}`
      ),
      '',
      `*Ongkos Kirim:* ${order.shippingFee === 0 ? 'GRATIS' : formatRupiah(order.shippingFee)}`,
      `*Total Tagihan:* *${formatRupiah(order.totalPrice)}*`,
      '',
      `Mohon diproses pesanannya ya, terima kasih!`,
    ].filter(Boolean)

    const text = encodeURIComponent(lines.join('\n'))
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank')
  }

  const handleCopyAccount = (number: string) => {
    navigator.clipboard.writeText(number)
    setCopiedAccount(true)
    setTimeout(() => setCopiedAccount(false), 2500)
  }

  if (!isCheckoutOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={closeCheckout}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/5 bg-neutral">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">
              NC
            </div>
            <div>
              <h2 className="font-display font-semibold text-lg text-neutral-dark">
                {completedOrder ? 'Pesanan Berhasil!' : 'Konfirmasi & Checkout'}
              </h2>
              <p className="text-xs text-neutral-dark/60">
                {completedOrder ? 'Terima kasih telah berbelanja di Nusantara Coffee' : 'Lengkapi data pengiriman dan pembayaran'}
              </p>
            </div>
          </div>
          <button
            onClick={closeCheckout}
            className="rounded-full p-2 text-neutral-dark/60 hover:text-neutral-dark hover:bg-black/5 transition"
            aria-label="Tutup checkout"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1">
          {completedOrder ? (
            /* Order Success View */
            <div className="text-center py-4 space-y-6">
              <div className="w-16 h-16 rounded-full bg-leaf/10 text-leaf mx-auto flex items-center justify-center">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-leaf/10 text-leaf inline-block mb-2">
                  Status: Menunggu Pembayaran
                </span>
                <h3 className="text-2xl font-display font-bold text-neutral-dark">
                  Pesanan Kamu Siap Diproses!
                </h3>
                <p className="text-sm text-neutral-dark/60 mt-1">
                  Nomor Pesanan: <strong className="text-primary font-mono">{completedOrder.orderId}</strong>
                </p>
              </div>

              {/* Payment Details Box */}
              <div className="bg-slate-50 border border-black/10 rounded-2xl p-5 text-left space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-dark/70">
                  Instruksi Pembayaran
                </h4>

                {completedOrder.customer.paymentMethod === 'transfer' && (
                  <div className="space-y-2 text-sm">
                    <p className="text-neutral-dark/80">Silakan transfer tepat sejumlah:</p>
                    <div className="text-2xl font-bold font-display text-primary">
                      {formatRupiah(completedOrder.totalPrice)}
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-black/10 flex items-center justify-between">
                      <div>
                        <p className="text-xs text-neutral-dark/60 font-semibold">Bank Central Asia (BCA)</p>
                        <p className="font-mono font-bold text-neutral-dark text-base">8720 1928 33</p>
                        <p className="text-xs text-neutral-dark/60">a.n. PT Nusantara Coffee Indonesia</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleCopyAccount('8720192833')}
                        className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-black/10 bg-slate-50 hover:bg-slate-100 transition"
                      >
                        {copiedAccount ? 'Tersalin!' : 'Salin Rekening'}
                      </button>
                    </div>
                  </div>
                )}

                {completedOrder.customer.paymentMethod === 'qris' && (
                  <div className="space-y-2 text-sm text-center">
                    <p className="text-neutral-dark/80">Scan QRIS melalui GoPay, OVO, Dana, BCA, dll.</p>
                    <div className="text-2xl font-bold font-display text-primary">
                      {formatRupiah(completedOrder.totalPrice)}
                    </div>
                    <div className="p-4 bg-white rounded-xl border border-black/10 inline-block mx-auto">
                      <div className="w-40 h-40 bg-slate-100 rounded-lg flex flex-col items-center justify-center text-xs text-neutral-dark/50 p-2 border-2 border-dashed border-slate-300">
                        <div className="w-8 h-8 rounded bg-neutral-dark/10 flex items-center justify-center font-bold text-neutral-dark mb-1">
                          QR
                        </div>
                        <span className="font-semibold text-neutral-dark">QRIS STANDAR</span>
                        <span className="text-[10px] mt-1">Nusantara Coffee</span>
                      </div>
                    </div>
                  </div>
                )}

                {completedOrder.customer.paymentMethod === 'cod' && (
                  <div className="space-y-1 text-sm">
                    <p className="text-neutral-dark/80">Bayar tunai kepada kurir saat pesanan sampai di alamat Anda:</p>
                    <div className="text-2xl font-bold font-display text-primary">
                      {formatRupiah(completedOrder.totalPrice)}
                    </div>
                    <p className="text-xs text-neutral-dark/60">Mohon siapkan uang pas saat kurir tiba.</p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => openWhatsAppConfirmation(completedOrder)}
                  className="w-full flex items-center justify-center gap-2 rounded-full bg-leaf text-white hover:bg-leaf/90 py-3 text-sm font-semibold shadow-soft transition"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                  </svg>
                  Kirim Bukti / Konfirmasi ke WhatsApp Admin
                </button>
                <button
                  type="button"
                  onClick={closeCheckout}
                  className="w-full btn-outline justify-center border-black/10 text-neutral-dark hover:bg-black/5 text-sm"
                >
                  Selesai & Tutup
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Form View */
            <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Order Items summary */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-black/5 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-dark/70">
                  Ringkasan Belanja ({cart.length} item)
                </h3>
                <div className="max-h-40 overflow-y-auto space-y-2 divide-y divide-black/5 pr-1">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-2 flex justify-between items-center text-xs">
                      <div>
                        <span className="font-semibold text-neutral-dark">{item.product.name}</span>{' '}
                        <span className="text-neutral-dark/60">({item.grindSize}) x{item.quantity}</span>
                      </div>
                      <span className="font-medium text-neutral-dark">
                        {formatRupiah(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Customer Form */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-dark/70">
                  Data Penerima & Alamat
                </h3>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-dark mb-1">
                      Nama Lengkap *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Contoh: Budi Santoso"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-dark mb-1">
                      Nomor WhatsApp / HP *
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="0812xxxxxxxx"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-dark mb-1">
                    Alamat Lengkap Pengiriman *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Nama jalan, nomor rumah, RT/RW, kelurahan, kecamatan"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-dark mb-1">
                      Kota / Kabupaten *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jakarta Selatan"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-neutral-dark mb-1">
                      Kode Pos
                    </label>
                    <input
                      type="text"
                      placeholder="12345"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                {/* Kurir */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-dark mb-1">
                    Pilihan Ekspedisi Pengiriman
                  </label>
                  <select
                    value={formData.courier}
                    onChange={handleCourierChange}
                    className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white"
                  >
                    <option value="JNE Reguler (Rp 15.000)">JNE Reguler (2-3 hari) - Rp 15.000</option>
                    <option value="SiCepat Express (Rp 18.000)">SiCepat Express (1-2 hari) - Rp 18.000</option>
                    <option value="J&T Express (Rp 16.000)">J&T Express (2-3 hari) - Rp 16.000</option>
                    <option value="Instant/Sameday (Rp 30.000)">Instant / Sameday Jabodetabek - Rp 30.000</option>
                  </select>
                </div>

                {/* Metode Pembayaran */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-dark mb-2">
                    Metode Pembayaran
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'transfer' })}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between text-xs ${
                        formData.paymentMethod === 'transfer'
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-black/10 hover:border-black/20'
                      }`}
                    >
                      <span className="font-semibold text-neutral-dark">Transfer Bank</span>
                      <span className="text-[10px] text-neutral-dark/60 mt-1">BCA / Mandiri</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'qris' })}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between text-xs ${
                        formData.paymentMethod === 'qris'
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-black/10 hover:border-black/20'
                      }`}
                    >
                      <span className="font-semibold text-neutral-dark">QRIS Digital</span>
                      <span className="text-[10px] text-neutral-dark/60 mt-1">GoPay, OVO, BCA</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-3 rounded-xl border text-left transition flex flex-col justify-between text-xs ${
                        formData.paymentMethod === 'cod'
                          ? 'border-primary bg-primary/5 ring-1 ring-primary'
                          : 'border-black/10 hover:border-black/20'
                      }`}
                    >
                      <span className="font-semibold text-neutral-dark">COD</span>
                      <span className="text-[10px] text-neutral-dark/60 mt-1">Bayar di Tempat</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-dark mb-1">
                    Catatan Pesanan (Opsional)
                  </label>
                  <input
                    type="text"
                    placeholder="Contoh: Titip ke satpam jika sedang tidak di rumah"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full rounded-xl border border-black/10 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Price Calculation */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-black/5 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-dark/70">
                  <span>Subtotal Produk</span>
                  <span>{formatRupiah(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-neutral-dark/70">
                  <span>Biaya Pengiriman</span>
                  <span>{freeShipping ? <strong className="text-leaf">GRATIS</strong> : formatRupiah(finalShipping)}</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-neutral-dark pt-2 border-t border-black/10">
                  <span>Total Pembayaran</span>
                  <span className="text-primary font-display text-base">{formatRupiah(grandTotal)}</span>
                </div>
              </div>
            </form>
          )}
        </div>

        {/* Footer actions */}
        {!completedOrder && (
          <div className="p-4 sm:p-6 border-t border-black/5 bg-slate-50 flex items-center justify-between gap-3">
            <div>
              <span className="text-xs text-neutral-dark/60">Total Pembayaran</span>
              <p className="text-lg font-display font-bold text-primary">{formatRupiah(grandTotal)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={closeCheckout}
                className="btn-outline border-black/10 text-neutral-dark hover:bg-black/5 text-xs sm:text-sm px-4"
              >
                Kembali
              </button>
              <button
                type="submit"
                form="checkout-form"
                disabled={cart.length === 0}
                className="btn-primary text-xs sm:text-sm shadow-md hover:shadow-primary/30 disabled:opacity-50"
              >
                Konfirmasi & Bayar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
