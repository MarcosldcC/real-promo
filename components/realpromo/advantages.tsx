import { Shield, Zap, Target, Phone, Monitor } from "lucide-react"
import AnimateOnScroll from "./animate-on-scroll"

export default function Advantages() {
  const items = [
    { icon: <Monitor className="h-7 w-7" />, title: "Ultra HD 4K", desc: "Qualidade de imagem incomparável." },
    { icon: <Zap className="h-7 w-7" />, title: "Montagem Rápida", desc: "Setup profissional em tempo recorde." },
    { icon: <Shield className="h-7 w-7" />, title: "100% Seguro", desc: "Equipamentos homologados e certificados." },
    { icon: <Target className="h-7 w-7" />, title: "Sob Medida", desc: "Soluções personalizadas para cada evento." },
    { icon: <Phone className="h-7 w-7" />, title: "Suporte Total", desc: "Acompanhamento técnico completo." },
  ]
  return (
    <div className="relative overflow-hidden">
      {/* subtle background waves */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          background:
            "radial-gradient(1200px 300px at 10% 10%, rgba(255,255,255,0.06), transparent), radial-gradient(1200px 300px at 90% 90%, rgba(255,255,255,0.06), transparent)",
        }}
        aria-hidden
      />
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <AnimateOnScroll>
            <h2 className="text-3xl md:text-4xl font-bold">Destaques que Fazem Diferença</h2>
            <p className="mt-3 text-white/70">
              Tecnologia, velocidade e segurança para impressionar seu público com confiança.
            </p>
          </AnimateOnScroll>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-5">
          {items.map((it, idx) => (
            <AnimateOnScroll key={it.title} delay={idx * 120} variant="scaleIn">
              <div className="h-full rounded-xl border border-[var(--rp-gray)] bg-[var(--rp-gray-dark)] p-5 text-center shadow-[0_10px_25px_rgba(255,255,255,0.1)]">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[var(--rp-gray)]">
                  {it.icon}
                </div>
                <div className="font-semibold">{it.title}</div>
                <div className="mt-2 text-sm text-white/70">{it.desc}</div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </div>
  )
}
