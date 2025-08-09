"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import styles from "./animations.module.css"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"

export default function Header({
  onRequestQuote = () => {},
}: {
  onRequestQuote?: () => void
}) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navItems = [
    { label: "Sobre", href: "#about" },
    { label: "Serviços", href: "#services" },
    { label: "Vantagens", href: "#advantages" },
    { label: "Portfólio", href: "#portfolio" },
    { label: "Especificações", href: "#specifications" },
    { label: "Depoimentos", href: "#testimonials" },
  ]

  const smoothScroll = (href: string) => {
    const id = href.replace("#", "")
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-colors ${
        scrolled ? "bg-black/95" : "bg-black/60"
      } backdrop-blur-md border-b border-[var(--rp-gray)]`}
      style={{}}
      role="banner"
      aria-label="Navegação principal"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3" aria-label="Página inicial Real Promo">
          {/* Logo textual branca - pode ser substituída por SVG */}
          <div className="h-8 w-8 rounded-sm bg-white" aria-hidden />
          <span className="text-lg font-extrabold tracking-wide">REAL PROMO</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Seções do site">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => smoothScroll(item.href)}
              className={`text-sm text-white/90 hover:text-white ${styles.navLink}`}
              aria-label={`Ir para ${item.label}`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button
            onClick={onRequestQuote}
            className={`${styles.btn} bg-white text-black font-extrabold rounded-full px-5 py-2 h-10`}
            variant="default"
          >
            Solicitar Orçamento
          </Button>
        </div>

        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button aria-label="Abrir menu" className="p-2 rounded-md border border-[var(--rp-gray)] text-white">
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-[var(--rp-black)] text-white border-l border-[var(--rp-gray)]">
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                {navItems.map((item) => (
                  <div key={item.href}>
                    <button
                      onClick={() => {
                        setOpen(false)
                        setTimeout(() => smoothScroll(item.href), 50)
                      }}
                      className="w-full text-left text-lg"
                      aria-label={`Ir para ${item.label}`}
                    >
                      {item.label}
                    </button>
                    <Separator className="my-3 bg-[var(--rp-gray)]" />
                  </div>
                ))}
                <Button
                  onClick={() => {
                    setOpen(false)
                    onRequestQuote()
                  }}
                  className={`${styles.btn} bg-white text-black font-extrabold rounded-full w-full h-11`}
                >
                  Solicitar Orçamento
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
