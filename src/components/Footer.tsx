function Footer() {
  return (
    <footer className="mt-16 border-t border-black/5">
      <div className="max-w-7xl mx-auto container-px py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-primary to-coffee flex items-center justify-center text-white font-bold">NC</div>
            <div className="leading-tight">
              <p className="font-display text-base font-semibold tracking-tight">Nusantara Coffee</p>
              <p className="text-xs text-[rgb(var(--foreground))]/60">Kopi Asli dari Tanah Nusantara</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-[rgb(var(--foreground))]/60 max-w-sm">
            Kami menghadirkan kopi terbaik dari petani lokal Indonesia, mengangkat cita rasa dan kesejahteraan Nusantara.
          </p>
        </div>
        <div>
          <p className="font-medium mb-3">Navigasi</p>
          <ul className="space-y-2 text-sm text-[rgb(var(--foreground))]/70">
            <li><a href="/about" className="hover:text-primary">Tentang</a></li>
            <li><a href="/products" className="hover:text-primary">Produk</a></li>
            <li><a href="/sustainability" className="hover:text-primary">Keberlanjutan</a></li>
            <li><a href="/contact" className="hover:text-primary">Kontak</a></li>
          </ul>
        </div>
        <div>
          <p className="font-medium mb-3">Newsletter</p>
          <form className="flex gap-2">
            <input className="flex-1 rounded-full border border-black/10 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Email Anda" />
            <button className="btn-primary" type="submit">Berlangganan</button>
          </form>
        </div>
      </div>
      <div className="border-t border-black/5 py-6 text-center text-sm text-[rgb(var(--foreground))]/60">
        © {new Date().getFullYear()} Nusantara Coffee. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer


