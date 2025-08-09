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
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const parsed = schema.safeParse(values)
    if (!parsed.success) {
      toast({ title: "Verifique os campos", description: parsed.error.errors.map((er) => er.message).join(" • ") })
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Falha no envio")
      toast({ title: "Recebemos seu pedido!", description: "Em breve entraremos em contato." })
      onOpenChange(false)
      setValues({ name: "", email: "", phone: "", message: "" })
    } catch (err: any) {
      toast({ title: "Não foi possível enviar", description: err.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[var(--rp-black)] text-white border border-[var(--rp-gray)] bg-black">
        <DialogHeader>
          <DialogTitle className="text-white">Solicitar Orçamento</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Nome"
            value={values.name}
            onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
            className="bg-[var(--rp-gray-dark)] border-[var(--rp-gray)] text-white"
          />
          <Input
            placeholder="E-mail"
            type="email"
            value={values.email}
            onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
            className="bg-[var(--rp-gray-dark)] border-[var(--rp-gray)] text-white"
          />
          <Input
            placeholder="Telefone/WhatsApp"
            value={values.phone}
            onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
            className="bg-[var(--rp-gray-dark)] border-[var(--rp-gray)] text-white"
          />
          <Textarea
            placeholder="Conte-nos sobre seu evento/projeto"
            rows={4}
            value={values.message}
            onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
            className="bg-[var(--rp-gray-dark)] border-[var(--rp-gray)] text-white"
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
