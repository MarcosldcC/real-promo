"use client"

import { useEffect, useRef, useState } from "react"
import AnimateOnScroll from "./animate-on-scroll"
import { Star } from "lucide-react"

type Testimonial = { id: number; name: string; company: string; text: string; photo: string; rating: number }

const DATA: Testimonial[] = [
  {
    id: 1,
    name: "Ana Martins",
    company: "Agência Flux",
    text: "A qualidade dos painéis e a equipe técnica foram impecáveis. Nosso estande virou ponto de referência da feira.",
    photo: "/placeholder.svg?height=160&width=160",
    rating: 5,
  },
  {
    id: 2,
    name: "Ricardo Souza",
    company: "EventoPro",
    text: "Montagem rápida e operação perfeita. A projeção em 4K trouxe um impacto visual inesquecível ao palco.",
    photo: "/placeholder.svg?height=160&width=160",
    rating: 5,
  },
  {
    id: 3,
    name: "Beatriz Lima",
    company: "CorpTech",
    text: "Desde o projeto até a execução, a Real Promo entregou excelência. Recomendamos sem reservas.",
    photo: "/placeholder.svg?height=160&width=160",
    rating: 5,
  },
  {
    id: 4,
    name: "Carlos Dias",
    company: "LiveShows",
    text: "Painéis com brilho incrível e equipe atenta a cada detalhe. O show ficou deslumbrante.",
    photo: "/placeholder.svg?height=160&width=160",
    rating: 5,
  },
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const hoverRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let paused = false
    const onEnter = () => (paused = true)
    const onLeave = () => (paused = false)
    const node = hoverRef.current
    node?.addEventListener("mouseenter", onEnter)
    node?.addEventListener("mouseleave", onLeave)

    const it = setInterval(() => {
      if (!paused) setIndex((i) => (i + 1) % DATA.length)
    }, 3500)
    return () => {
      clearInterval(it)
      node?.removeEventListener("mouseenter", onEnter)
      node?.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  const visible = [0, 1, 2].map((offset) => DATA[(index + offset) % DATA.length])

  return (
    <div className="container mx-auto px-4 py-20 md:py-28">
      <AnimateOnScroll>
        <h2 className="text-3xl md:text-4xl font-bold text-center">Depoimentos</h2>
        <p className="mt-3 text-center text-white/70">
          O que nossos clientes dizem sobre a experiência com a Real Promo.
        </p>
      </AnimateOnScroll>

      <div ref={hoverRef} className="mt-8 grid gap-6 md:grid-cols-3">
        {visible.map((t, idx) => (
          <AnimateOnScroll key={t.id} delay={idx * 150} variant="fadeInUp">
            <div className="h-full rounded-xl border border-[var(--rp-gray)] bg-[var(--rp-gray-dark)] p-6">
              <div className="flex items-center gap-4">
                <img
                  src={t.photo || "/placeholder.svg"}
                  alt={`Foto de ${t.name}`}
                  className="h-12 w-12 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-xs text-white/60">{t.company}</div>
                </div>
              </div>
              <div className="mt-4 text-white/80">{t.text}</div>
              <div className="mt-4 flex">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 text-yellow-400 ${i < idx + 1 ? "opacity-100" : "opacity-80"}`}
                    fill="currentColor"
                  />
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        ))}
      </div>
    </div>
  )
}
