type Product = {
  name: string
  region: string
  notes: string
}

const products: Product[] = [
  { name: 'Gayo Natural', region: 'Aceh', notes: 'Berry, cokelat, body penuh' },
  { name: 'Toraja Sapan', region: 'Sulawesi', notes: 'Spice, caramel, clean finish' },
  { name: 'Java Preanger', region: 'Jawa Barat', notes: 'Nutty, floral, balanced' },
  { name: 'Kintamani', region: 'Bali', notes: 'Citrus, honey, bright acidity' },
  { name: 'Flores Bajawa', region: 'NTT', notes: 'Earthy, herbal, low acidity' },
  { name: 'Wamena', region: 'Papua', notes: 'Sweet, fruity, silky body' },
]

function ProductCard({ item }: { item: Product }) {
  return (
    <div className="group rounded-2xl ring-1 ring-black/10 bg-white shadow-soft p-5 hover:-translate-y-1 hover:shadow-xl transition">
      <div className="h-40 rounded-xl overflow-hidden mb-4 relative">
        <img src="/kopi_image_default.jpg" alt={item.name} className="w-full h-full object-cover scale-100 group-hover:scale-105 transition" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      <h3 className="font-display font-semibold text-lg">{item.name}</h3>
      <p className="text-sm text-[rgb(var(--foreground))]/60">{item.region}</p>
      <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">{item.notes}</p>
      <div className="mt-4 flex items-center gap-2">
        <button className="btn-primary">Beli</button>
        <button className="btn-outline">Detail</button>
      </div>
    </div>
  )
}

function ProductGrid() {
  return (
    <section id="products" className="max-w-7xl mx-auto container-px mt-16">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="section-title">Kopi Pilihan Nusantara</h2>
          <p className="section-subtitle mt-2">Koleksi curated dari berbagai daerah Indonesia.</p>
        </div>
        <a href="/products" className="hidden sm:inline-flex btn-outline">Lihat Semua</a>
      </div>
      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.name} item={p} />
        ))}
      </div>
    </section>
  )
}

export default ProductGrid


