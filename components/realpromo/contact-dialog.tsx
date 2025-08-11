"use client"

import type React from "react"
import { useState } from "react"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

const schema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("E-mail inválido."),
  phone: z.string().min(8, "Telefone inválido."),
  message: z.string().min(10, "Mensagem muito curta."),
  honey: z.string().optional(),
})

export default function ContactDialog({
  open = false,
  onOpenChange = () => {},
}: {
  open?: boolean
  onOpenChange?: (v: boolean) => void
}) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "", honey: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = schema.safeParse(values)
    if (!parsed.success) {
      toast({
        title: "Verifique os campos",
        description: parsed.error.errors.map((er) => er.message).join(" • "),
      })
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data?.error || "Falha no envio")
      toast({ title: "Recebemos seu pedido!", description: "Em breve entraremos em contato." })
      onOpenChange(false)
      setValues({ name: "", email: "", phone: "", message: "", honey: "" })
    } catch (err: any) {
      toast({ title: "Não foi possível enviar", description: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="
          sm:max-w-[520px]
          bg-[#0b0b0b] text-white
          border border-white/10
          shadow-2xl
        "
      >
        <DialogHeader>
          <DialogTitle className="text-white">Solicitar Orçamento</DialogTitle>
        </DialogHeader>

        {/* região para mensagens de validação (a11y) */}
        <div aria-live="polite" className="sr-only" />

        <form onSubmit={handleSubmit} className="space-y-3">
          {/* Honeypot anti-bot */}
          <div className="hidden" aria-hidden>
            <label htmlFor="website">Website</label>
            <input
              id="website"
              name="website"
              autoComplete="off"
              tabIndex={-1}
              value={values.honey}
              onChange={(e) => setValues((v) => ({ ...v, honey: e.target.value }))}
            />
          </div>

          <Input
            placeholder="Nome"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="bg-[#151515] border-white/10 text-white placeholder:text-white/50"
          />
          <Input
            placeholder="E-mail"
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="bg-[#151515] border-white/10 text-white placeholder:text-white/50"
          />
          <Input
            placeholder="Telefone/WhatsApp"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className="bg-[#151515] border-white/10 text-white placeholder:text-white/50"
          />
          <Textarea
            placeholder="Conte-nos sobre seu evento/projeto"
            rows={4}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            className="bg-[#151515] border-white/10 text-white placeholder:text-white/50"
          />
          <div className="pt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-white text-black font-extrabold h-11"
            >
              {loading ? "Enviando..." : "Enviar Pedido"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
