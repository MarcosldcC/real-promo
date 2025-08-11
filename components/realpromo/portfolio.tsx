"use client"

import { useMemo, useState } from "react"
import styles from "./animations.module.css"
import AnimateOnScroll from "./animate-on-scroll"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type Item = {
  id: number
  category: "Eventos" | "Feiras" | "Shows" | "Corporativo"
  src: string
  title: string
  meta: string
}

const ALL: Item[] = [
  { id: 1, category: "Eventos", src: "/placeholder.svg?height=900&width=700", title: "Lançamento de Produto", meta: "Cliente X • P3.91 Outdoor" },
  { id: 2, category: "Feiras",  src: "/placeholder.svg?height=1200&width=900", title: "Expo Tech",             meta: "Cliente Y • P2.5 Indoor" },
  { id: 3, category: "Shows",   src: "/placeholder.svg?height=1000&width=800", title: "Festival Live",         meta: "Cliente Z • P6 Giant" },
  { id: 4, category: "Corporativo", src: "/placeholder.svg?height=1100&width=850", title: "Conferência Anual", meta: "Cliente A • P2.5 Indoor" },
  { id: 5, category: "Eventos", src: "/placeholder.svg?height=950&width=700", title: "Summit Varejo",          meta: "Cliente B • P3.91 Outdoor" },
  { id: 6, category: "Feiras",  src: "/placeholder.svg?height=1000&width=760", title: "Expo Negócios",         meta: "Cliente C • P2.5" },
  { id: 7, category: "Shows",   src: "/placeholder.svg?height=980&width=780",  title: "Open Air",              meta: "Cliente D • P6" },
  { id: 8, category: "Corporativo", src: "/placeholder.svg?height=1020&width=720", title: "Kickoff",           meta: "Cliente E • P2.5" },
]

export default function Portfolio() {
  const [filter, setFilter] = useState<"Todos" | Item["category"]>("Todos")
  const [active, setActive] = useState<Item | null>(null)

  const filtered = useMemo(() => {
    if (filter === "Todos") return ALL
    return ALL.filter((i) => i.category === filter)
  }, [filter])

  const filters: ("Todos" | Item["category"])[] = ["Todos", "Eventos", "Feiras", "Shows", "Corporativo"]

  return (
    <div className="container mx-auto px-4 py-20 md:py-28 isolate"> {/* isolate evita sobreposição do masonry */}
      {/* Cabeçalho + Filtro */}
      <div className="mb-8 text-center relative z-10">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold">Portfólio</h2>
          <p className="mt-3 text-white/70">Conheça alguns projetos que impactaram milhares de pessoas.</p>
        </AnimateOnScroll>

        {/* Barra de filtro: sticky no mobile, rolagem horizontal quando necessário */}
        <div className="mt-6 sticky top-16 z-20">
          <div className="flex items-center justify-center gap-3 overflow-x-auto sm:overflow-visible px-1 -mx-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm whitespace-nowrap transition-all",
                  filter === f
                    ? "border-white bg-white text-black"
                    : "border-[var(--rp-gray)] text-white/80 hover:text-white hover:border-white",
                )}
                aria-pressed={filter === f}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Masonry */}
      <div className="mx-auto max-w-6xl clear-both [column-fill:_balance] columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((item, idx) => (
          <div key={item.id} className="mb-4 break-inside-avoid">
            <AnimateOnScroll delay={idx * 100}>
              <div
                className={`${styles.imageWrap} cursor-pointer rounded-lg border border-[var(--rp-gray)] bg-[var(--rp-gray-dark)]`}
                onClick={() => setActive(item)}
              >
                <img
                  src={item.src || "/placeholder.svg"}
                  alt={item.title}
                  className="w-full object-cover"
                  loading="lazy"
                />
                <div className={`${styles.imageOverlay} flex items-end`}>
                  <div className="w-full p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-xs text-white/70">{item.meta}</div>
                      </div>
                      <Badge variant="outline" className="border-white text-white">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className="max-w-4xl bg-[var(--rp-black)] text-white border border-[var(--rp-gray)]">
          {active && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-[var(--rp-gray)] overflow-hidden">
                <img
                  src={active.src || "/placeholder.svg"}
                  alt={active.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">{active.title}</h3>
                <div className="text-white/80">{active.meta}</div>
                <ul className="list-disc pl-5 text-white/70 text-sm">
                  <li>Brilho: até 6000 nits</li>
                  <li>Refresh rate: 3840Hz</li>
                  <li>Contraste: 5000:1</li>
                  <li>Painéis modulares de montagem rápida</li>
                </ul>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
