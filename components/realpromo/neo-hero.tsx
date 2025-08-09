"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export default function NeoHero({ onRequestQuote = () => {} }: { onRequestQuote?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Canvas "scanlines" + waves — leve e inspirado no vibe experimental
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = Math.max(window.innerHeight, 720))

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    let t = 0
    const render = () => {
      t += 0.0075
      ctx.clearRect(0, 0, w, h)

      // Gradient base
      const g = ctx.createLinearGradient(0, 0, w, h)
      g.addColorStop(0, "rgba(255,255,255,0.06)")
      g.addColorStop(1, "rgba(255,255,255,0.02)")
      ctx.fillStyle = g
      ctx.fillRect(0, 0, w, h)

      // Waves
      ctx.globalCompositeOperation = "lighter"
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = `rgba(255,255,255,${0.1 - i * 0.02})`
        ctx.lineWidth = 1
        ctx.beginPath()
        for (let x = 0; x < w; x++) {
          const y =
            h / 2 + Math.sin(x * 0.008 + t * (1.2 + i * 0.3)) * 18 + Math.cos(x * 0.004 + t * (0.8 + i * 0.25)) * 14
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
      ctx.globalCompositeOperation = "source-over"

      // Scanlines
      ctx.fillStyle = "rgba(255,255,255,0.025)"
      for (let y = 0; y < h; y += 3) {
        ctx.fillRect(0, y, w, 1)
      }

      requestAnimationFrame(render)
    }
    const raf = requestAnimationFrame(render)

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = Math.max(window.innerHeight, 720)
      const dpr2 = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = w * dpr2
      canvas.height = h * dpr2
      ctx.scale(dpr2, dpr2)
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [])

  const scrollToWork = () => {
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="relative flex min-h-[90vh] items-end overflow-hidden pt-16">
      <div className="absolute inset-0">
        <canvas ref={canvasRef} className="h-full w-full opacity-70" aria-hidden />
        <div
          className="absolute inset-0 bg-[radial-gradient(1000px_280px_at_10%_10%,rgba(255,255,255,0.08),transparent),radial-gradient(1000px_280px_at_90%_90%,rgba(255,255,255,0.08),transparent)]"
          aria-hidden
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.50), rgba(0,0,0,0.25)), url("/placeholder.svg?height=1600&width=2400")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            mixBlendMode: "overlay",
            opacity: 0.35,
          }}
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16">
        <div className="max-w-4xl">
          <h1 className="text-5xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-7xl">
            Sua mensagem em grande escala.
          </h1>
          <p className="mt-5 max-w-2xl text-white/80">
            Locação de painéis de LED e comunicação visual de alto impacto para eventos, feiras e campanhas. Qualidade
            Ultra HD, montagem rápida e operação técnica impecável.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button onClick={onRequestQuote} className="h-11 rounded-full bg-white px-6 font-extrabold text-black">
              Solicitar Orçamento
            </Button>
            <Button
              onClick={scrollToWork}
              variant="outline"
              className="h-11 rounded-full border-white/70 px-6 text-white hover:bg-white hover:text-black bg-transparent"
            >
              Ver Projetos
            </Button>
          </div>
        </div>

        {/* marquee */}
        <div className="mt-12 overflow-hidden border-t border-b border-white/10 py-2">
          <div className="flex animate-[marquee_26s_linear_infinite] whitespace-nowrap text-sm uppercase tracking-[0.25em] text-white/70">
            {Array.from({ length: 8 }).map((_, i) => (
              <span key={i} className="mx-8">
                Real Promo • LED 4K • Montagem Rápida • Suporte 24/7 • Comunicação Visual • Conteúdo Digital
              </span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
