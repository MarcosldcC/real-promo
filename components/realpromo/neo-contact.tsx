"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export default function NeoContact({
  onRequestQuote = () => {},
}: {
  onRequestQuote?: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = window.innerWidth
    let h = Math.max(window.innerHeight * 0.5, 400) // altura menor que hero
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = w * dpr
    canvas.height = h * dpr
    ctx.scale(dpr, dpr)

    const particles: { x: number; y: number; vx: number; vy: number; r: number }[] = []
    const count = Math.min(90, Math.floor(w / 16))

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.5 + 0.5,
      })
    }

    let raf = 0
    const render = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = "rgba(255,255,255,0.7)"
      particles.forEach((p, idx) => {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.globalAlpha = 0.5 + Math.sin((idx + Date.now() / 700) % 1000) * 0.25
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(render)
    }
    raf = requestAnimationFrame(render)

    const onResize = () => {
      w = window.innerWidth
      h = Math.max(window.innerHeight * 0.5, 400)
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

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Canvas das partículas */}
      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" aria-hidden />

      {/* Conteúdo */}
      <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28 text-center">
        <h2 className="text-4xl font-extrabold tracking-[-0.02em] text-white">
          Pronto para impressionar seu público?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-white/80">
          Solicite seu orçamento personalizado. Resposta rápida e soluções sob medida para o seu evento.
        </p>
        <div className="mt-7">
          <Button
            onClick={onRequestQuote}
            className="h-12 rounded-full bg-white px-8 font-extrabold text-black"
          >
            Solicitar Orçamento Agora
          </Button>
        </div>
      </div>
    </div>
  )
}
