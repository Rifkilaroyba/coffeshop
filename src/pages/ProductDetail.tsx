import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProductById, products, formatRupiah } from '../data/products'
import { useCart } from '../context/cart-context'
import type { GrindSize } from '../types/product'
import ProductCard from '../components/ProductCard'

const GRIND_OPTIONS: { size: GrindSize; label: string; desc: string }[] = [
  { size: 'Biji Utuh', label: 'Biji Utuh (Whole Bean)', desc: 'Untuk digiling sendiri di rumah' },
  { size: 'Giling Kasar', label: 'Kasar (Coarse)', desc: 'French Press, Cold Brew, Cupping' },
  { size: 'Giling Sedang', label: 'Sedang (Medium)', desc: 'V60, Kalita, Aeropress, Chemex' },
  { size: 'Giling Halus', label: 'Halus (Fine)', desc: 'Espresso, Moka Pot, Kopi Tubruk' },
]

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const { addToCart, buyNow } = useCart()

  const product = id ? getProductById(id) : undefined
  const [selectedGrind, setSelectedGrind] = useState<GrindSize>('Biji Utuh')
  const [quantity, setQuantity] = useState(1)

  if (!product) {
    return (
      <div className="py-20 text-center container-px max-w-xl mx-auto">
        <h2 className="text-2xl font-bold font-display text-neutral-dark">Produk Tidak Ditemukan</h2>
        <p className="text-sm text-neutral-dark/60 mt-2">
          Kopi yang Anda cari tidak tersedia atau tautan sudah berubah.
        </p>
        <Link to="/products" className="btn-primary mt-6 inline-flex">
          Kembali ke Katalog Kopi
        </Link>
      </div>
    )
  }

  const totalPrice = product.price * quantity
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <div className="py-10 bg-neutral">
      <div className="max-w-7xl mx-auto container-px">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-neutral-dark/60 mb-6">
          <Link to="/" className="hover:text-primary transition">Beranda</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-primary transition">Produk</Link>
          <span>/</span>
          <span className="text-neutral-dark font-medium truncate">{product.name}</span>
        </nav>

        {/* Product Showcase */}
        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left Column: Image & Flavor Profile */}
          <div className="space-y-6">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden relative shadow-lg ring-1 ring-black/5 bg-slate-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3.5 py-1.5 rounded-full text-xs font-semibold shadow-sm text-neutral-dark">
                {product.island} • {product.weight}
              </div>
              <div className="absolute bottom-4 left-4 right-4 bg-black/65 backdrop-blur-md rounded-2xl p-3 text-white text-xs flex justify-between items-center">
                <span>Elevasi: <strong>{product.altitude}</strong></span>
                <span className="bg-leaf/90 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                  Tersedia {product.stock} bungkus
                </span>
              </div>
            </div>

            {/* Flavor Character Bars */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-black/5 space-y-4">
              <h3 className="font-display font-semibold text-sm text-neutral-dark">
                Profil Sensori & Karakteristik
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span>Keasaman (Acidity)</span>
                    <span className="text-primary font-bold">{product.acidity} dari 5</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(product.acidity / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span>Ketebalan Rasa (Body)</span>
                    <span className="text-coffee font-bold">{product.body} dari 5</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-coffee rounded-full transition-all"
                      style={{ width: `${(product.body / 5) * 100}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-medium">
                    <span>Kemanisan Alami (Sweetness)</span>
                    <span className="text-amber-500 font-bold">{product.sweetness} dari 5</span>
                  </div>
                  <div className="w-full h-2.5 bg-black/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all"
                      style={{ width: `${(product.sweetness / 5) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Buying */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex text-amber-400 text-sm">
                  {'★'.repeat(Math.floor(product.rating))}
                </div>
                <span className="text-xs font-semibold text-neutral-dark">{product.rating}</span>
                <span className="text-xs text-neutral-dark/50">({product.reviewsCount} Ulasan Pelanggan)</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-neutral-dark">
                {product.name}
              </h1>
              <p className="text-sm font-medium text-neutral-dark/60 mt-1">{product.region}</p>

              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-3xl font-display font-bold text-primary">
                  {formatRupiah(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base line-through text-neutral-dark/40">
                    {formatRupiah(product.originalPrice)}
                  </span>
                )}
                <span className="text-xs text-leaf font-bold bg-leaf/10 px-2.5 py-1 rounded-full">
                  Stok Siap Kirim
                </span>
              </div>
            </div>

            {/* Tasting Notes */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-neutral-dark/60 mb-2">
                Aroma & Flavor Notes:
              </p>
              <div className="flex flex-wrap gap-2">
                {product.tastingNotes.map((note) => (
                  <span
                    key={note}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-dark/80 leading-relaxed">
              {product.description}
            </p>

            {/* Specs Table */}
            <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-black/5 text-xs">
              <div>
                <span className="text-neutral-dark/50 block font-medium">Metode Pasca Panen:</span>
                <span className="font-semibold text-neutral-dark text-sm">{product.process}</span>
              </div>
              <div>
                <span className="text-neutral-dark/50 block font-medium">Tingkat Sangrai:</span>
                <span className="font-semibold text-neutral-dark text-sm">{product.roastLevel}</span>
              </div>
              <div>
                <span className="text-neutral-dark/50 block font-medium">Varietas Tanaman:</span>
                <span className="font-semibold text-neutral-dark text-sm">{product.varietal}</span>
              </div>
              <div>
                <span className="text-neutral-dark/50 block font-medium">Saran Seduh:</span>
                <span className="font-semibold text-neutral-dark text-sm">{product.brewRecommendation}</span>
              </div>
            </div>

            {/* Grind Size Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-neutral-dark/70 mb-2">
                Pilih Bentuk Gilingan:
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {GRIND_OPTIONS.map((option) => (
                  <button
                    key={option.size}
                    type="button"
                    onClick={() => setSelectedGrind(option.size)}
                    className={`text-left p-3 rounded-2xl border transition text-xs flex flex-col justify-between ${
                      selectedGrind === option.size
                        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                        : 'border-black/10 hover:border-black/20 bg-white'
                    }`}
                  >
                    <span className={`font-semibold ${selectedGrind === option.size ? 'text-primary' : 'text-neutral-dark'}`}>
                      {option.size}
                    </span>
                    <span className="text-[11px] text-neutral-dark/60 mt-1 leading-tight">
                      {option.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Actions */}
            <div className="pt-4 border-t border-black/10 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-neutral-dark/60 block">Jumlah Pesanan:</span>
                  <div className="inline-flex items-center rounded-full border border-black/15 bg-white p-1 mt-1">
                    <button
                      type="button"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-dark/70 hover:text-neutral-dark hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-bold text-sm">{quantity}</span>
                    <button
                      type="button"
                      disabled={quantity >= product.stock}
                      onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-neutral-dark/70 hover:text-neutral-dark hover:bg-black/5 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-neutral-dark/60 block">Total Harga:</span>
                  <span className="text-2xl font-display font-bold text-primary">
                    {formatRupiah(totalPrice)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => addToCart(product, quantity, selectedGrind)}
                  className="flex-1 btn-outline justify-center py-3 text-sm font-semibold border-neutral-dark/20 text-neutral-dark hover:bg-black/5"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Tambah ke Keranjang
                </button>
                <button
                  type="button"
                  onClick={() => buyNow(product, quantity, selectedGrind)}
                  className="flex-1 btn-primary justify-center py-3 text-sm font-semibold shadow-lg hover:shadow-primary/30"
                >
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20 pt-12 border-t border-black/10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="section-title">Kopi Nusantara Lainnya</h2>
            <Link to="/products" className="text-xs font-semibold text-primary hover:underline">
              Lihat Katalog Lengkap →
            </Link>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} item={p} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
