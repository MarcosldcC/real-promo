"use client"

import type React from "react"
import { Inter, Open_Sans } from "next/font/google"
import { useState } from "react"

import NeoHeader from "@/components/realpromo/neo-header"
import NeoHero from "@/components/realpromo/neo-hero"
import NeoWork from "@/components/realpromo/neo-work"
import NeoCaps from "@/components/realpromo/neo-caps"
import NeoSpecs from "@/components/realpromo/neo-specs"
import NeoContact from "@/components/realpromo/neo-contact"
import NeoFooter from "@/components/realpromo/neo-footer"
import ContactDialog from "@/components/realpromo/contact-dialog"
import WhatsAppFloat from "@/components/realpromo/whatsapp-float"
import Partners from "@/components/realpromo/partners"

const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700", "800", "900"] })
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "500", "600"] })

export default function ClientPage() {
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <main
      className={`${inter.className} ${openSans.className}`}
      style={
        {
          ["--rp-black" as any]: "#000000",
          ["--rp-white" as any]: "#FFFFFF",
          ["--rp-gray-dark" as any]: "#0A0A0A",
          ["--rp-gray" as any]: "#333333",
          ["--rp-gray-light" as any]: "#CCCCCC",
          ["--rp-gold" as any]: "#F5C542",
          ["--rp-shadow-white" as any]: "rgba(255,255,255,0.08)",
        } as React.CSSProperties
      }
    >
      <div className="bg-[var(--rp-black)] text-[var(--rp-white)] selection:bg-white selection:text-black">
        <NeoHeader onRequestQuote={() => setContactOpen(true)} />

        <section id="hero">
          <NeoHero onRequestQuote={() => setContactOpen(true)} />
        </section>

        <section id="work">
          <NeoWork />
        </section>

        <section id="capabilities">
          <NeoCaps />
        </section>

        <section id="partners">
          <Partners />
        </section>

        <section id="specs">
          <NeoSpecs />
        </section>

        <section id="contact">
          <NeoContact onRequestQuote={() => setContactOpen(true)} />
        </section>

        <NeoFooter />

        {/* Modal de contato */}
        <ContactDialog open={contactOpen} onOpenChange={setContactOpen} />

        {/* Botão flutuante do WhatsApp (agora renderizado) */}
        <WhatsAppFloat />
      </div>
    </main>
  )
}
