"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Monitor, Award, Clock3, Smile } from "lucide-react"
import AnimateOnScroll from "./animate-on-scroll"
import styles from "./animations.module.css"

export default function About() {
  return (
    <div className="bg-[var(--rp-gray-dark)]">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <AnimateOnScroll variant="slideInLeft">
            <div>
              <Badge variant="outline" className="border-white text-white">
                Sobre a Real Promo
              </Badge>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">Líderes em Tecnologia LED</h2>
              <p className="mt-4 text-white/80">
                Somos especialistas em locação de painéis de LED e soluções completas em comunicação visual. Apoiamos
                eventos, feiras e campanhas com equipamentos de última geração, operação técnica dedicada e criatividade
                para elevar sua marca.
              </p>
            </div>
          </AnimateOnScroll>
          <AnimateOnScroll variant="slideInRight">
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={<Monitor className="h-6 w-6" />} label="+500 Eventos Realizados" value={500} suffix="" />
              <StatCard icon={<Clock3 className="h-6 w-6" />} label="+8 Anos de Experiência" value={8} suffix="" />
              <StatCard
                icon={<Smile className="h-6 w-6" />}
                label="100% Satisfação dos Clientes"
                value={100}
                suffix="%"
              />
              <StatCard icon={<Award className="h-6 w-6" />} label="Tecnologia 4K Ultra HD" value={4} suffix="K" />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
  suffix = "",
}: {
  icon: React.ReactNode
  label: string
  value: number
  suffix?: string
}) {
  return (
    <Card className={`bg-black/50 text-white ${styles.card} ${styles.cardBorderReveal}`}>
      <CardContent className="p-5">
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-[var(--rp-gray)] p-2">{icon}</div>
          <div className="text-sm text-white/70">{label}</div>
        </div>
        <AnimatedCounter className="mt-3 text-2xl font-extrabold" target={value} suffix={suffix} />
      </CardContent>
    </Card>
  )
}

function AnimatedCounter({
  target = 0,
  duration = 1200,
  suffix = "",
  className = "",
}: {
  target?: number
  duration?: number
  suffix?: string
  className?: string
}) {
  const [val, setVal] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    let start: number | null = null
    let raf = 0
    const step = (ts: number) => {
      if (start === null) start = ts
      const p = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration])

  return (
    <span ref={ref} className={className}>
      {val}
      {suffix}
    </span>
  )
}
