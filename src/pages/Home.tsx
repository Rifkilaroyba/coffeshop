import Hero from '../components/Hero'
import ProductGrid from '../components/ProductGrid'

function Home() {
  return (
    <>
      <Hero />
      <ProductGrid />
      <section className="max-w-7xl mx-auto container-px mt-16 grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl ring-1 ring-black/10 bg-white p-6">
          <h3 className="font-display font-semibold">Petani Lokal</h3>
          <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">Bermitra langsung dengan petani untuk kualitas dan kesejahteraan.</p>
        </div>
        <div className="rounded-2xl ring-1 ring-black/10 bg-white p-6">
          <h3 className="font-display font-semibold">Kurasi Rasa</h3>
          <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">Profil rasa beragam dari dataran tinggi Nusantara.</p>
        </div>
        <div className="rounded-2xl ring-1 ring-black/10 bg-white p-6">
          <h3 className="font-display font-semibold">Keberlanjutan</h3>
          <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">Praktik bertanggung jawab untuk masa depan kopi Indonesia.</p>
        </div>
      </section>
    </>
  )
}

export default Home


