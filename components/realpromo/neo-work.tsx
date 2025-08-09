"use client"

import { useMemo, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

type Item = {
  id: number
  title: string
  category: string
  meta: string
  src: string
  specs?: string[]
}

const DATA: Item[] = [
  {
    id: 1,
    title: "Lançamento HyperTech",
    category: "Eventos",
    meta: "P3.91 Outdoor • 12m x 4m • 6000 nits",
    src: "/placeholder.svg?height=1200&width=900",
    specs: ["Montagem 6h", "Operação 2 dias", "Conteúdo sincronizado com luz"],
  },
  {
    id: 2,
    title: "Expo Inovação 2025",
    category: "Feiras",
    meta: "P2.5 Indoor • 6m x 3m • Ultra HD",
    src: "/placeholder.svg?height=1200&width=900",
    specs: ["Design modular", "Playback 4K", "Conteúdo animado brand-safe"],
  },
  {
    id: 3,
    title: "Live Festival",
    category: "Shows",
    meta: "P6 Giant • 14m x 6m",
    src: "/placeholder.svg?height=1200&width=900",
    specs: ["Rigging certificado", "Timecode", "Operação multicâmera"],
  },
  {
    id: 4,
    title: "Summit Finance",
    category: "Corporativo",
    meta: "P2.5 Indoor • 4m x 2m • 3840Hz",
    src: "/placeholder.svg?height=1200&width=900",
    specs: ["Cenografia clean", "Slides + vídeos", "Interatividade palco"],
  },
  {
    id: 5,
    title: "Arena E-sports",
    category: "Eventos",
    meta: "P3.91 Outdoor • 10m x 4m",
    src: "/placeholder.svg?height=1200&width=900",
    specs: ["HUD em tempo real", "Sincronismo com placar", "Cenas VJ"],
  },
  {
    id: 6,
    title: "Roadshow Varejo",
    category: "Corporativo",
    meta: "P2.5 Indoor • 3m x 2m",
    src: "/placeholder.svg?height=1200&width=900",
    specs: ["Montagem rápida", "Conteúdo templated", "Tour 8 cidades"],
  },
  {
    id: 7,
    title: "Premiação Anual",
    category: "Eventos",
    meta: "P3.91 • 8m x 3m",
    src: "/placeholder.svg?height=1200&width=900",
    specs: ["Cenário imersivo", "Playback redundante", "Direção de palco"],
  },
  {
    id: 8,
    title: "Tech Kickoff",
    category: "Corporativo",
    meta: "P2.5 • 5m x 2.5m",
    src: "/placeholder.svg?height=1200&width=900",
    specs: ["Tradução simultânea", "Cenas motion", "Streaming interno"],
  },
  {
    id: 9,
    title: "Feira Agro",
    category: "Feiras",
    meta: "P3.91 • 7m x 3m",
    src: "/placeholder.svg?height=1200&width=900",
  },
  {
    id: 10,
    title: "Festival Urbano",
    category: "Shows",
    meta: "P6 • 12m x 5m",
    src: "/placeholder.svg?height=1200&width=900",
  },
  {
    id: 11,
    title: "Conferência Saúde",
    category: "Corporativo",
    meta: "P2.5 • 4m x 2m",
    src: "/placeholder.svg?height=1200&width=900",
  },
  {
    id: 12,
    title: "Showcase Automotivo",
    category: "Eventos",
    meta: "P3.91 • 9m x 3m",
    src: "/placeholder.svg?height=1200&width=900",
  },
]

export default function NeoWork() {
  const [filter, setFilter] = useState<"Todos" | "Eventos" | "Feiras" | "Shows" | "Corporativo">("Todos")
  const [active, setActive] = useState<Item | null>(null)

  const filtered = useMemo(() => (filter === "Todos" ? DATA : DATA.filter((i) => i.category === filter)), [filter])

  return (
    <div className="mx-auto max-w-7xl px-5 py-20 md:py-28">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-4xl font-extrabold tracking-[-0.02em] md:text-5xl">Projetos em Destaque</h2>
          <p className="mt-3 text-white/70">Seleção de cases que levaram marcas a outro nível.</p>
        </div>
        <div className="hidden gap-2 md:flex">
          {(["Todos", "Eventos", "Feiras", "Shows", "Corporativo"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider ${
                filter === f ? "border-white bg-white text-black" : "border-white/30 text-white/80 hover:text-white"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* grid editorial */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item)}
            className="group relative overflow-hidden rounded-xl border border-white/12 bg-white/0 text-left"
          >
            <img
              src={item.src || "/placeholder.svg"}
              alt={`${item.title} — ${item.meta}`}
              className="h-[420px] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-100" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4">
              <div className="text-xs uppercase tracking-widest text-white/70">{item.category}</div>
              <div className="mt-1 text-lg font-semibold">{item.title}</div>
              <div className="text-sm text-white/80">{item.meta}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 flex gap-2 md:hidden">
        {(["Todos", "Eventos", "Feiras", "Shows", "Corporativo"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-4 py-1.5 text-xs uppercase tracking-wider ${
              filter === f ? "border-white bg-white text-black" : "border-white/30 text-white/80 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <Dialog open={!!active} onOpenChange={(v) => !v && setActive(null)}>
        <DialogContent className="max-w-5xl border border-white/15 bg-black text-white">
          {active && (
            <div className="grid gap-6 md:grid-cols-2">
              <div className="overflow-hidden rounded-lg border border-white/12">
                <img
                  src={active.src || "/placeholder.svg"}
                  alt={`${active.title} grande`}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-white/60">{active.category}</div>
                <h3 className="mt-1 text-2xl font-extrabold">{active.title}</h3>
                <div className="text-white/80">{active.meta}</div>
                {active.specs && (
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {active.specs.map((s, i) => (
                      <li key={i}>• {s}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
