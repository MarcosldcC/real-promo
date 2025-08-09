export default function NeoFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row">
        <div className="flex items-center gap-3">
          <div className="h-6 w-6 rounded-sm bg-white" aria-hidden />
          <span className="text-xs font-extrabold tracking-widest">REAL PROMO</span>
        </div>
        <div className="text-xs text-white/60">
          © {new Date().getFullYear()} Real Promo Comunicação Visual — Sua mensagem em grande escala.
        </div>
      </div>
    </footer>
  )
}
