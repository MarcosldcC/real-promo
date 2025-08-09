"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Monitor, Palette, Wrench, Play } from "lucide-react"
import AnimateOnScroll from "./animate-on-scroll"
import styles from "./animations.module.css"

export default function Services({
  onRequestQuote = () => {},
}: {
  onRequestQuote?: () => void
}) {
  const items = [
    {
      title: "Locação de Painéis LED",
      desc: "Painéis de alta resolução para qualquer evento.",
      icon: <Monitor className="h-7 w-7" />,
      img: "/placeholder.svg?height=480&width=720",
    },
    {
      title: "Comunicação Visual Completa",
      desc: "Projetos personalizados e identidade visual.",
      icon: <Palette className="h-7 w-7" />,
      img: "/placeholder.svg?height=480&width=720",
    },
    {
      title: "Suporte Técnico 24/7",
      desc: "Montagem, configuração e suporte no local.",
      icon: <Wrench className="h-7 w-7" />,
      img: "/placeholder.svg?height=480&width=720",
    },
    {
      title: "Conteúdo Digital",
      desc: "Criação e otimização de conteúdo para LED.",
      icon: <Play className="h-7 w-7" />,
      img: "/placeholder.svg?height=480&width=720",
    },
  ]

  return (
    <div className="bg-[var(--rp-black)]">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="mb-10 md:mb-14 text-center">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold">Soluções Sob Medida</h2>
            <p className="mt-3 text-white/70">Serviços pensados para impacto máximo e execução impecável.</p>
          </AnimateOnScroll>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <AnimateOnScroll key={it.title} delay={i * 150}>
              <Card className={`bg-[var(--rp-gray-dark)] ${styles.card} ${styles.cardBorderReveal}`}>
                <div className={`${styles.imageWrap} aspect-[4/3]`}>
                  <img
                    src={it.img || "/placeholder.svg"}
                    alt={it.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className={`${styles.imageOverlay} flex items-end p-4`}>
                    <div className="text-sm text-white/90">{it.desc}</div>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="rounded-md border border-[var(--rp-gray)] p-2 transition-transform group-hover:rotate-3">
                      {it.icon}
                    </div>
                    <h3 className="font-semibold">{it.title}</h3>
                  </div>
                </CardContent>
              </Card>
            </AnimateOnScroll>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            onClick={onRequestQuote}
            className={`${styles.btn} rounded-full bg-white text-black font-extrabold h-11 px-6`}
          >
            Solicitar Orçamento
          </Button>
        </div>
      </div>
    </div>
  )
}
