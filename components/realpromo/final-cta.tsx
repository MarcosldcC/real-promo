"use client"

import styles from "./animations.module.css"
import AnimateOnScroll from "./animate-on-scroll"
import { Button } from "@/components/ui/button"

export default function FinalCTA({
  onRequestQuote = () => {},
}: {
  onRequestQuote?: () => void
}) {
  return (
    <div
      className={`${styles.animatedGradient} relative overflow-hidden`}
      style={{
        // Blue gradient requested in brief for final CTA
        background: "linear-gradient(135deg, #0ea5e9 0%, #1e3a8a 100%)",
        backgroundSize: "200% 200%",
        animation: "gradientMove 14s ease infinite",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.5)), url("/placeholder.svg?height=1200&width=1800")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div className="relative container mx-auto px-4 py-20 md:py-28 text-center text-white">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-extrabold">Pronto para Impressionar seu Público?</h2>
          <p className="mx-auto mt-3 max-w-2xl text-white/90">
            Solicite seu orçamento personalizado e transforme seu evento em uma experiência inesquecível.
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll variant="scaleIn" className="mt-8">
          <Button
            onClick={onRequestQuote}
            className={`h-12 rounded-full bg-[var(--rp-gold)] text-black font-extrabold px-8 ${styles.pulseGold} ${styles.btn}`}
          >
            Solicitar Orçamento Agora
          </Button>
        </AnimateOnScroll>
      </div>
    </div>
  )
}
