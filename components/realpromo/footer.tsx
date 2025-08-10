import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-[var(--rp-gray)] bg-[var(--rp-black)]">
      <div className="container mx-auto grid gap-10 px-4 py-14 md:grid-cols-4">
        
        {/* Logo e informações */}
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/favicon.png"
              alt="Real Promo"
              width={40}
              height={40}
              priority
              className="rounded-sm"
            />
            <span className="text-lg font-extrabold tracking-wide">REAL PROMO</span>
          </div>
          <p className="mt-4 text-sm text-white/70">Sua mensagem em grande escala.</p>
          <div className="mt-4 flex gap-3">
            <Link className="hover:underline underline-offset-4" href="https://www.realpromo.com.br">
              www.realpromo.com.br
            </Link>
          </div>
        </div>

        {/* Menu empresa */}
        <div>
          <div className="font-semibold">Empresa</div>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li><a className="hover:underline underline-offset-4" href="#about">Sobre</a></li>
            <li><a className="hover:underline underline-offset-4" href="#services">Serviços</a></li>
            <li><a className="hover:underline underline-offset-4" href="#portfolio">Portfólio</a></li>
            <li><a className="hover:underline underline-offset-4" href="#specifications">Especificações</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div>
          <div className="font-semibold">Contato</div>
          <ul className="mt-3 space-y-2 text-sm text-white/80">
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> (XX) XXXX-XXXX</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> WhatsApp: (XX) 9XXXX-XXXX</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> contato@realpromo.com.br</li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4" /> Endereço: a definir</li>
          </ul>
        </div>

        {/* Redes sociais */}
        <div>
          <div className="font-semibold">Redes Sociais</div>
          <div className="mt-3 flex gap-3">
            <a href="#" aria-label="Facebook" className="rounded-md border border-[var(--rp-gray)] p-2 hover:-translate-y-1 transition-transform">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" aria-label="Instagram" className="rounded-md border border-[var(--rp-gray)] p-2 hover:-translate-y-1 transition-transform">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="rounded-md border border-[var(--rp-gray)] p-2 hover:-translate-y-1 transition-transform">
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="border-t border-[var(--rp-gray)] py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Real Promo Comunicação Visual. Todos os direitos reservados.
      </div>
    </footer>
  )
}
