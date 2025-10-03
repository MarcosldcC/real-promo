// app/layout.tsx
import type { Metadata, Viewport } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { Analytics } from "@vercel/analytics/next"

export const metadata: Metadata = {
  title: "Real Promo",
  description: "Real Promo Comunicação Visual — Sua mensagem em grande escala.",
  icons: {
    icon: [
      { url: "/logorealpromo.png", type: "image/png" },
    ],
    shortcut: ["/logorealpromo.png"],
    apple: [
      { url: "/logorealpromo.png", sizes: "180x180", type: "image/png" },
    ],
  },
  applicationName: "Real Promo",
  referrer: "origin-when-cross-origin",
  formatDetection: { telephone: false, address: false, email: false },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen antialiased">
        <main>{children}</main>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
