import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from './ProductCard'

interface ProductGridProps {
  title?: string
  subtitle?: string
  limit?: number
  showViewAll?: boolean
}

export default function ProductGrid({
  title = 'Kopi Pilihan Nusantara',
  subtitle = 'Koleksi curated dari berbagai daerah penghasil kopi terbaik di Indonesia.',
  limit,
  showViewAll = true,
}: ProductGridProps) {
  const displayProducts = limit ? products.slice(0, limit) : products

  return (
    <section id="products" className="max-w-7xl mx-auto container-px mt-16 scroll-mt-20">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Katalog Kopi Spesialti
          </span>
          <h2 className="section-title mt-1">{title}</h2>
          <p className="section-subtitle mt-2">{subtitle}</p>
        </div>
        {showViewAll && (
          <Link
            to="/products"
            className="self-start sm:self-auto inline-flex items-center gap-2 btn-outline text-sm"
          >
            <span>Lihat Semua ({products.length} Kopi)</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {displayProducts.map((p) => (
          <ProductCard key={p.id} item={p} />
        ))}
      </div>
    </section>
  )
}
