import Image from "next/image"

export default function NeoFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 md:flex-row">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Image
            src="/favicon.png"
            alt="Real Promo"
            width={50}
            height={50}
            priority
            className="rounded-sm"
          />
        </div>

        {/* Texto */}
        <div className="text-xs text-white/60">
          © {new Date().getFullYear()} Real Promo Comunicação Visual — Sua mensagem em grande escala.
        </div>
      </div>
    </footer>
  )
}
