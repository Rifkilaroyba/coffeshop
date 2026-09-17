import { useState, useMemo } from 'react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'

type IslandFilter = 'Semua' | 'Sumatra' | 'Jawa' | 'Sulawesi' | 'Bali & NTT' | 'Papua'
type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating'

const ISLANDS: IslandFilter[] = ['Semua', 'Sumatra', 'Jawa', 'Sulawesi', 'Bali & NTT', 'Papua']

export default function Products() {
  const [selectedIsland, setSelectedIsland] = useState<IslandFilter>('Semua')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<SortOption>('popular')

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesIsland = selectedIsland === 'Semua' || p.island === selectedIsland
        const query = searchQuery.toLowerCase().trim()
        const matchesSearch =
          !query ||
          p.name.toLowerCase().includes(query) ||
          p.region.toLowerCase().includes(query) ||
          p.notes.toLowerCase().includes(query) ||
          p.tastingNotes.some((t) => t.toLowerCase().includes(query)) ||
          p.process.toLowerCase().includes(query)
        return matchesIsland && matchesSearch
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price
        if (sortBy === 'price-high') return b.price - a.price
        if (sortBy === 'rating') return b.rating - a.rating
        return b.reviewsCount - a.reviewsCount // 'popular'
      })
  }, [selectedIsland, searchQuery, sortBy])

  const handleResetFilters = () => {
    setSelectedIsland('Semua')
    setSearchQuery('')
    setSortBy('popular')
  }

  return (
    <div className="py-12 bg-neutral">
      <div className="max-w-7xl mx-auto container-px">
        {/* Header */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">
            Eksplorasi Rasa Nusantara
          </span>
          <h1 className="section-title mt-1">Katalog Produk Kopi Kami</h1>
          <p className="section-subtitle mt-3">
            Pilihlah dari kekayaan varietas biji kopi sangrai pilihan dari pulau Sumatra hingga Papua.
            Tersedia dalam bentuk biji utuh maupun aneka tingkat gilingan siap seduh.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 space-y-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-black/5">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Cari kopi, daerah, aroma (misal: Gayo, jeruk, cokelat, floral)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-full border border-black/10 pl-10 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <svg
                className="w-4 h-4 text-neutral-dark/40 absolute left-3.5 top-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-neutral-dark/40 hover:text-neutral-dark"
                  aria-label="Hapus pencarian"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-neutral-dark/60 font-medium shrink-0">Urutkan:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="rounded-full border border-black/10 px-4 py-2 text-xs font-semibold bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 text-neutral-dark cursor-pointer"
              >
                <option value="popular">Paling Populer</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="price-low">Harga: Rendah ke Tinggi</option>
                <option value="price-high">Harga: Tinggi ke Rendah</option>
              </select>
            </div>
          </div>

          {/* Island Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
            <span className="text-xs text-neutral-dark/60 font-medium shrink-0 mr-1">
              Asal Pulau:
            </span>
            {ISLANDS.map((island) => (
              <button
                key={island}
                onClick={() => setSelectedIsland(island)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition shrink-0 ${
                  selectedIsland === island
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-white text-neutral-dark/80 hover:bg-black/5 border border-black/10'
                }`}
              >
                {island}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="mt-6 flex justify-between items-center text-xs text-neutral-dark/60">
          <span>Menampilkan <strong>{filteredProducts.length}</strong> produk kopi</span>
          {(selectedIsland !== 'Semua' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-primary hover:underline font-medium"
            >
              Reset Filter
            </button>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} item={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-3xl border border-black/5 mt-6">
            <p className="text-lg font-semibold text-neutral-dark">Kopi tidak ditemukan</p>
            <p className="text-xs text-neutral-dark/60 mt-1 max-w-sm mx-auto">
              Maaf, tidak ada varian kopi yang sesuai dengan filter atau kata kunci &quot;{searchQuery}&quot;.
            </p>
            <button onClick={handleResetFilters} className="btn-outline mt-4 text-xs">
              Lihat Semua Kopi
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
