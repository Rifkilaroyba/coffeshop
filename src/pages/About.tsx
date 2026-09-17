function About() {
  return (
    <section className="max-w-7xl mx-auto container-px py-12">
      <h1 className="section-title">Tentang Nusantara Coffee</h1>
      <p className="section-subtitle mt-3">
        Kami berdiri untuk mengangkat kopi Nusantara dan kesejahteraan petani lokal melalui rantai pasok yang adil.
      </p>
      <div className="mt-8 grid md:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl ring-1 ring-black/10 bg-white p-6">
          <h3 className="font-display font-semibold">Misi</h3>
          <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">
            Menjadi jembatan antara petani dan penikmat kopi dengan standar kualitas dan transparansi tinggi.
          </p>
        </div>
        <div className="rounded-2xl ring-1 ring-black/10 bg-white p-6">
          <h3 className="font-display font-semibold">Nilai</h3>
          <p className="mt-2 text-sm text-[rgb(var(--foreground))]/70">
            Keaslian, keberlanjutan, dan kebanggaan budaya lokal.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About


