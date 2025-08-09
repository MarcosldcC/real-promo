"use client"

import { MessageCircle } from "lucide-react"

export default function WhatsAppFloat({
  phone = "5511999999999",
}: {
  phone?: string
}) {
  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
      aria-label="Chamar no WhatsApp"
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline text-sm font-semibold">Chamar no WhatsApp</span>
      <span className="relative ml-2 inline-flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75"></span>
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white"></span>
      </span>
    </a>
  )
}
