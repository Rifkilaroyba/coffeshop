import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useCart } from '../context/cart-context'

const navItemClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-2 rounded-full text-sm font-medium transition ${
    isActive
      ? 'bg-primary text-white shadow-sm'
      : 'text-neutral-dark/80 hover:bg-primary/10 hover:text-primary'
  }`

function Navbar() {
  const [open, setOpen] = useState(false)
  const { totalCount, openCart } = useCart()
  const location = useLocation()

  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/80 bg-white/95 border-b border-black/5">
      <div className="max-w-7xl mx-auto container-px">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-gradient-to-br from-primary to-coffee flex items-center justify-center text-white font-bold shadow-soft">
              NC
            </div>
            <div className="leading-tight">
              <p className="font-display text-base font-semibold tracking-tight text-neutral-dark">
                Nusantara Coffee
              </p>
              <p className="text-xs text-neutral-dark/60">Kopi Asli dari Tanah Nusantara</p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            <NavLink to="/" end className={navItemClass}>Beranda</NavLink>
            <NavLink to="/about" className={navItemClass}>Tentang</NavLink>
            <NavLink to="/products" className={navItemClass}>Produk</NavLink>
            <NavLink to="/sustainability" className={navItemClass}>Keberlanjutan</NavLink>
            <NavLink to="/contact" className={navItemClass}>Kontak</NavLink>
          </nav>

          {/* Right Actions: Cart & Shop */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full text-neutral-dark/80 hover:text-primary hover:bg-black/5 transition flex items-center justify-center"
              aria-label="Buka Keranjang Belanja"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {totalCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-[11px] font-bold h-5 w-5 rounded-full flex items-center justify-center ring-2 ring-white animate-scale-in">
                  {totalCount > 99 ? '99+' : totalCount}
                </span>
              )}
            </button>

            {/* CTA Button */}
            <div className="hidden md:block">
              {location.pathname === '/' ? (
                <a href="#products" className="btn-primary text-sm">
                  Belanja Kopi
                </a>
              ) : (
                <Link to="/products" className="btn-primary text-sm">
                  Belanja Kopi
                </Link>
              )}
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden inline-flex items-center justify-center rounded-md p-2 border border-black/10 hover:bg-black/5 text-neutral-dark"
              aria-label="Toggle menu"
              onClick={() => setOpen((v) => !v)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                {open ? (
                  <path fillRule="evenodd" d="M6.225 4.811a1 1 0 0 1 1.414 0L12 9.172l4.361-4.361a1 1 0 1 1 1.414 1.414L13.414 10.586l4.361 4.361a1 1 0 1 1-1.414 1.414L12 12l-4.361 4.361a1 1 0 0 1-1.414-1.414l4.361-4.361-4.361-4.361a1 1 0 0 1 0-1.414Z" clipRule="evenodd" />
                ) : (
                  <path fillRule="evenodd" d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Zm.75 4.5a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" clipRule="evenodd" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile sheet */}
      {open && (
        <div className="md:hidden border-t border-black/5 bg-white/95 backdrop-blur">
          <div className="container-px py-3 space-y-2">
            <NavLink to="/" end className={navItemClass} onClick={() => setOpen(false)}>Beranda</NavLink>
            <NavLink to="/about" className={navItemClass} onClick={() => setOpen(false)}>Tentang</NavLink>
            <NavLink to="/products" className={navItemClass} onClick={() => setOpen(false)}>Produk</NavLink>
            <NavLink to="/sustainability" className={navItemClass} onClick={() => setOpen(false)}>Keberlanjutan</NavLink>
            <NavLink to="/contact" className={navItemClass} onClick={() => setOpen(false)}>Kontak</NavLink>
            <div className="pt-2">
              <Link
                to="/products"
                className="btn-primary w-full justify-center text-sm"
                onClick={() => setOpen(false)}
              >
                Belanja Kopi
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Navbar
