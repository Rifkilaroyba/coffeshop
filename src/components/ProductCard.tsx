import { useState } from 'react'
import type { Product } from '../types/product'
import { formatRupiah } from '../data/products'
import { useCart } from '../context/cart-context'

export default function ProductCard({ item }: { item: Product }) {
  const { openDetail, addToCart } = useCart()
  const [justAdded, setJustAdded] = useState(false)

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation()
    addToCart(item, 1, 'Biji Utuh')
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1800)
  }

  const handleOpenDetail = () => {
    openDetail(item)
  }

  return (
    <div
      onClick={handleOpenDetail}
      className="group rounded-2xl ring-1 ring-black/10 bg-white shadow-soft p-5 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Product Image */}
        <div className="h-44 sm:h-48 rounded-xl overflow-hidden mb-4 relative bg-slate-100">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover scale-100 group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
            <span className="bg-white/95 backdrop-blur text-neutral-dark text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-sm">
              {item.island}
            </span>
          </div>

          <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-xs">
            <span className="font-medium drop-shadow">{item.weight}</span>
            <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-md">
              <span className="text-amber-400">★</span>
              <span className="font-semibold">{item.rating}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-display font-bold text-lg text-neutral-dark group-hover:text-primary transition-colors">
              {item.name}
            </h3>
            <p className="text-xs text-neutral-dark/60 font-medium">{item.region}</p>
          </div>
        </div>

        {/* Tasting Notes */}
        <p className="mt-2.5 text-xs text-neutral-dark/70 line-clamp-2 leading-relaxed">
          {item.notes}
        </p>

        {/* Tasting tags */}
        <div className="mt-3 flex flex-wrap gap-1">
          {item.tastingNotes.slice(0, 2).map((t) => (
            <span
              key={t}
              className="text-[10px] bg-slate-100 text-neutral-dark/70 px-2 py-0.5 rounded-md font-medium"
            >
              {t}
            </span>
          ))}
          {item.tastingNotes.length > 2 && (
            <span className="text-[10px] bg-slate-100 text-neutral-dark/50 px-1.5 py-0.5 rounded-md">
              +{item.tastingNotes.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Price & Actions */}
      <div className="mt-5 pt-3 border-t border-black/5">
        <div className="flex items-baseline justify-between mb-3">
          <div>
            <span className="text-xs text-neutral-dark/50 block">Harga</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-bold text-lg text-primary">
                {formatRupiah(item.price)}
              </span>
              {item.originalPrice && (
                <span className="text-xs line-through text-neutral-dark/40">
                  {formatRupiah(item.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <span className="text-[11px] text-leaf font-semibold bg-leaf/10 px-2 py-0.5 rounded">
            Tersedia
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleQuickBuy}
            className={`btn-primary flex-1 justify-center py-2 text-xs sm:text-sm font-semibold transition-all ${
              justAdded ? 'bg-leaf hover:bg-leaf' : ''
            }`}
          >
            {justAdded ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Masuk Keranjang
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Beli
              </>
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              handleOpenDetail()
            }}
            className="btn-outline px-4 py-2 text-xs sm:text-sm font-semibold hover:bg-black/5 hover:border-black/20 text-neutral-dark border-black/15"
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  )
}
