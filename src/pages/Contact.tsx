function Contact() {
  return (
    <section className="max-w-3xl mx-auto container-px py-12">
      <h1 className="section-title">Kontak Kami</h1>
      <p className="section-subtitle mt-3">Ada pertanyaan atau ingin kerja sama? Kirim pesan Anda.</p>
      <form className="mt-8 grid gap-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <input className="rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Nama" />
          <input type="email" className="rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Email" />
        </div>
        <input className="rounded-xl border border-black/10 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Subjek" />
        <textarea className="rounded-xl border border-black/10 px-4 py-3 min-h-40 focus:outline-none focus:ring-2 focus:ring-primary/50" placeholder="Pesan" />
        <button className="btn-primary w-fit" type="submit">Kirim</button>
      </form>
    </section>
  )
}

export default Contact


