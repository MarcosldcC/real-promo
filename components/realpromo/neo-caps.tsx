export default function NeoCaps() {
  const caps = [
    {
      title: "Locação de Painéis LED",
      desc: "Módulos outdoor escaláveis, brilho de até 6000 nits e refresh 3840Hz.",
    },
    {
      title: "Comunicação Visual",
      desc: "Identidade visual e ativações com linguagem consistente, do palco ao stand.",
    },
    {
      title: "Conteúdo Digital",
      desc: "Motion templates e peças sob medida, otimizadas para cada pitch de pixel.",
    },
    {
      title: "Operação Técnica 24/7",
      desc: "Equipe especializada, redundância de playback e rigging certificado.",
    },
  ]
  return (
    <div className="mx-auto max-w-7xl px-5 py-18 md:py-24">
      <div className="border-y border-white/10 py-10">
        <div className="grid items-start gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-extrabold tracking-[-0.02em]">Capacidades</h2>
            <p className="mt-3 max-w-xl text-white/70">
              Tecnologia e execução para impactar. Do briefing à operação ao vivo, com precisão e velocidade.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {caps.map((c) => (
              <div key={c.title} className="rounded-xl border border-white/12 bg-white/0 p-5">
                <div className="text-sm font-semibold">{c.title}</div>
                <div className="mt-2 text-sm text-white/70">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
