"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { MessageCircle } from "lucide-react"

export default function WhatsAppFloat() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const phone = "5583998180625"
  const message = "Olá! Vim pelo site da Real Promo e gostaria de saber mais sobre as locações."
  const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`

  const btn = (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chamar no WhatsApp"
      className="fixed z-[200] flex items-center gap-2 rounded-full bg-green-500 text-white shadow-lg hover:shadow-xl transition-transform hover:-translate-y-0.5 whitespace-nowrap"
      style={{
        right: 48,
        bottom: 120,
        padding: "12px 20px",
        fontSize: 14,
      }}
    >
      <MessageCircle style={{ width: 20, height: 20 }} />
      <span className="hidden sm:inline font-semibold">Chamar no WhatsApp</span>
      <span className="relative ml-2 inline-flex" style={{ width: 8, height: 8 }}>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex rounded-full bg-white w-full h-full"></span>
      </span>
    </a>
  )

  if (!mounted || !document?.body) return null
  return createPortal(btn, document.body)
}