import ProductGrid from '../components/ProductGrid'

function Products() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto container-px">
        <h1 className="section-title">Produk Kami</h1>
        <p className="section-subtitle mt-3">Temukan kopi favorit Anda dari seluruh penjuru Nusantara.</p>
      </div>
      <ProductGrid />
    </div>
  )
}

export default Products


