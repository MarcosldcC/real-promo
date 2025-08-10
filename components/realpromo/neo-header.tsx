"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function NeoHeader({ onRequestQuote = () => {} }: { onRequestQuote?: () => void }) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b border-white/10 transition-colors ${
        scrolled ? "bg-black/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <Image
            src="/favicon.png"
            alt="Real Promo"
            width={40}
            height={40}
            priority
            className="rounded-sm"
          />
        </div>
        <nav className="hidden gap-6 md:flex">
          {[
            { id: "work", label: "Projetos" },
            { id: "capabilities", label: "Capacidades" },
            { id: "specs", label: "Especificações" },
            { id: "contact", label: "Contato" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="text-sm text-white/80 hover:text-white"
              aria-label={`Ir para ${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <Button
          onClick={onRequestQuote}
          className="h-9 rounded-full bg-white px-4 text-xs font-extrabold uppercase tracking-widest text-black"
        >
          Solicitar Orçamento
        </Button>
      </div>
    </header>
  )
}
