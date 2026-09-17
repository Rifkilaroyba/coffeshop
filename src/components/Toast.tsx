import { useCart } from '../context/cart-context'

export default function Toast() {
  const { toast, hideToast, openCart } = useCart()

  if (!toast || !toast.visible) return null

  return (
    <aside
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 max-w-md w-[calc(100vw-2.5rem)] bg-neutral-dark text-white rounded-2xl shadow-2xl p-4 flex items-center justify-between gap-3 border border-white/10 animate-slide-up"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-8 h-8 rounded-full bg-leaf flex items-center justify-center shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-sm font-medium leading-tight truncate">{toast.message}</p>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => {
            hideToast()
            openCart()
          }}
          className="text-xs font-semibold bg-primary hover:bg-primary-light px-3 py-1.5 rounded-full transition"
        >
          Keranjang
        </button>
        <button
          onClick={hideToast}
          aria-label="Tutup notifikasi"
          className="p-1 text-white/60 hover:text-white rounded-full transition"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </aside>
  )
}
