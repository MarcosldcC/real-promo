"use client"

import { Button } from "@/components/ui/button"

export default function NeoContact({ onRequestQuote = () => {} }: { onRequestQuote?: () => void }) {
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.6)), url("/placeholder.svg?height=1400&width=2200")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.9) contrast(1.1)",
          opacity: 0.45,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28 text-center">
        <h2 className="text-4xl font-extrabold tracking-[-0.02em]">Pronto para impressionar seu público?</h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/80">
          Solicite seu orçamento personalizado. Resposta rápida e soluções sob medida para o seu evento.
        </p>
        <div className="mt-7">
          <Button onClick={onRequestQuote} className="h-12 rounded-full bg-white px-8 font-extrabold text-black">
            Solicitar Orçamento Agora
          </Button>
        </div>
      </div>
    </div>
  )
}
