import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-dvh flex flex-col bg-[rgb(var(--background))] text-[rgb(var(--foreground))]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App
