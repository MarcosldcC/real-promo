export default function NeoSpecs() {
  const panels = [
    { name: "P2.5 Indoor", quality: "Ultra HD", brightness: 3000, refresh: 3840 },
    { name: "P3.91 Outdoor", quality: "Full HD", brightness: 6000, refresh: 3840 },
    { name: "P6 Giant", quality: "HD", brightness: 5500, refresh: 3840 },
    { name: "P10 Long Distance", quality: "SD", brightness: 6000, refresh: 3840 },
  ]
  return (
    <div className="bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold tracking-[-0.02em]">Especificações</h2>
          <p className="mt-3 text-white/70">Pitch, brilho e frequência para cada cenário.</p>
        </div>

        <div className="grid gap-4">
          {panels.map((p) => (
            <div
              key={p.name}
              className="grid grid-cols-1 items-center gap-3 rounded-xl border border-white/12 bg-black/30 p-5 md:grid-cols-4"
            >
              <div className="text-lg font-semibold">{p.name}</div>
              <div className="text-white/70">{p.quality}</div>
              <div className="text-sm text-white/80">Brilho: {p.brightness} nits</div>
              <div className="text-sm text-white/80">Refresh: {p.refresh} Hz</div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {[
            { label: "Contraste", value: 80 },
            { label: "Vida útil (+100.000h)", value: 100 },
            { label: "Resolução relativa", value: 95 },
          ].map((b) => (
            <div key={b.label}>
              <div className="flex items-center justify-between text-sm text-white/80">
                <span>{b.label}</span>
                <span>{b.value}%</span>
              </div>
              <div className="mt-1 h-2 w-full rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-white transition-all"
                  style={{ width: `${Math.min(Math.max(b.value, 0), 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
