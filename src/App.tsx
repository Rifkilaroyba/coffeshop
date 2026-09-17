import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { CartProvider } from './context/CartContext'
import ProductDetailModal from './components/ProductDetailModal'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import Toast from './components/Toast'

function App() {
  return (
    <CartProvider>
      <div className="min-h-dvh flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutModal />
        <Toast />
      </div>
    </CartProvider>
  )
}

export default App
