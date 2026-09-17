function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src="/dashboard_image.jpg" alt="Kopi Nusantara" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-primary/30" />
      </div>
      <div className="max-w-7xl mx-auto container-px relative py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="text-white">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 ring-1 ring-white/20 px-3 py-1 text-xs tracking-wide">
              Kopi Asli Indonesia
            </span>
            <h1 className="mt-4 section-title text-white">
              Nusantara Coffee
            </h1>
            <p className="mt-3 max-w-xl text-white/85">
              Merayakan kekayaan kopi Indonesia dari Sabang sampai Merauke. Dari tangan petani lokal,
              secangkir cerita tentang tanah, budaya, dan keberlanjutan.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a href="#products" className="btn-primary">Jelajahi Produk</a>
              <a href="/about" className="btn-outline border-white/50 text-white hover:bg-white/10">Tentang Kami</a>
            </div>
          </div>
          <div className="hidden md:block" />
        </div>
      </div>
    </section>
  )
}

export default Hero



