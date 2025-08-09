import AnimateOnScroll from "./animate-on-scroll"

export default function Specifications() {
  const panels = [
    { name: "P2.5 Indoor (2.5mm)", quality: "Ultra HD", brightness: 3000, refresh: 3840, resolution: 95 },
    { name: "P3.91 Outdoor (3.91mm)", quality: "Full HD", brightness: 6000, refresh: 3840, resolution: 85 },
    { name: "P6 Giant Screen (6mm)", quality: "HD", brightness: 5500, refresh: 3840, resolution: 70 },
    { name: "P10 Long Distance (10mm)", quality: "SD", brightness: 6000, refresh: 3840, resolution: 50 },
  ]

  return (
    <div className="bg-[var(--rp-gray-dark)]">
      <div className="container mx-auto px-4 py-20 md:py-28">
        <AnimateOnScroll>
          <h2 className="text-3xl md:text-4xl font-bold text-center">Especificações Técnicas</h2>
          <p className="mt-3 text-center text-white/70">
            Tamanhos, resoluções, brilho e consumo que se adaptam ao seu projeto.
          </p>
        </AnimateOnScroll>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {panels.map((p, idx) => (
            <AnimateOnScroll key={p.name} delay={idx * 120}>
              <div className="rounded-xl border border-[var(--rp-gray)] bg-black/60 p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm text-white/70">{p.quality}</div>
                  </div>
                  <div className="text-right text-sm">
                    <div>Brilho: {p.brightness} nits</div>
                    <div>Refresh: {p.refresh} Hz</div>
                  </div>
                </div>

                <div className="mt-4">
                  <LabelAndBar label="Resolução relativa" value={p.resolution} />
                  <LabelAndBar label="Contraste" value={80} />
                  <LabelAndBar label="Vida útil estimada (+100.000h)" value={100} />
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  )
}

function LabelAndBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="mb-3">
      <div className="flex items-center justify-between text-sm text-white/80">
        <span>{label}</span>
        <span>{value}%</span>
      </div>
      <div className="mt-1 h-2 w-full rounded-full bg-[var(--rp-gray)]">
        <div
          className="h-2 rounded-full bg-white transition-all duration-700"
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  )
}
