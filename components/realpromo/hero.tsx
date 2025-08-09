"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronDown } from "lucide-react"
import styles from "./animations.module.css"
import AnimateOnScroll from "./animate-on-scroll"
import { Button } from "@/components/ui/button"

export default function Hero({
  onRequestQuote = () => {},
}: {
  onRequestQuote?: () => void
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [typedText, setTypedText] = useState("")
  const fullText =
    "Locação de Painéis de LED de alta definição e soluções completas em comunicação visual para eventos, feiras e campanhas publicitárias."

  useEffect(() => {
    // Typewriter effect
    let i = 0
    const timer = setInterval(() => {
      setTypedText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(timer)
    }, 12)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    // Particles canvas
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = Math.max(window.innerHeight, 640))
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
      w = canvas.width = window.innerWidth
      h = canvas.height = Math.max(window.innerHeight, 640)
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

  const handleViewProjects = () => {
    const el = document.getElementById("portfolio")
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Animated subtle gradient + background image overlay */}
      <div
        className={`absolute inset-0 ${styles.animatedGradient}`}
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,0,0,0.70), rgba(0,0,0,0.50)), url("/placeholder.svg?height=1200&width=1920")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.9)",
        }}
        aria-hidden
      />

      {/* Subtle parallax layer */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, rgba(0,0,0,0.2) 0%, rgba(26,26,26,0.2) 100%)",
        }}
        aria-hidden
      />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-60" aria-hidden />

      <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 text-center">
        <AnimateOnScroll variant="fadeInUp">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">Sua Mensagem em Grande Escala</h1>
        </AnimateOnScroll>

        <AnimateOnScroll variant="fadeInUp" className="mx-auto mt-5 max-w-3xl">
          <p className="text-[var(--rp-gray-light)] text-base md:text-lg leading-relaxed">{typedText}</p>
        </AnimateOnScroll>

        <AnimateOnScroll variant="scaleIn" className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button
            onClick={onRequestQuote}
            className={`h-11 rounded-full px-6 font-extrabold text-black bg-white ${styles.btn}`}
          >
            Solicitar Orçamento
          </Button>
          <Button
            onClick={handleViewProjects}
            variant="outline"
            className={`h-11 rounded-full px-6 font-semibold border-white text-white hover:bg-white hover:text-black ${styles.btn}`}
          >
            Ver Nossos Projetos
          </Button>
        </AnimateOnScroll>

        <div className="mt-14 flex justify-center">
          <div className={`flex flex-col items-center text-white/80 ${styles.bounce}`} aria-hidden>
            <ChevronDown className="h-6 w-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
