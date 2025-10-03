import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Real Promo | Sua mensagem em grande escala",
  description:
    "Locação de painéis de LED de alta definição e soluções completas em comunicação visual para eventos, feiras e campanhas publicitárias. Solicite seu orçamento grátis.",
  keywords: [
    "locação painel LED",
    "Real Promo",
    "painel LED evento",
    "comunicação visual",
    "tela LED",
    "aluguel painel",
    "locação painel LED para eventos",
    "empresa comunicação visual",
  ],
  openGraph: {
    title: "Real Promo | Sua mensagem em grande escala",
    description: "Líder em tecnologia LED: locação de painéis, comunicação visual completa e suporte técnico 24/7.",
    url: "https://www.realpromo.com.br",
    type: "website",
    images: [
      {
        url: "/realled.svg",
        width: 1200,
        height: 630,
        alt: "Real Promo - Painéis LED de alta definição",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Real Promo | Sua mensagem em grande escala",
    description: "Líder em tecnologia LED: locação de painéis, comunicação visual completa e suporte técnico 24/7.",
    images: ["/realled.svg"],
  },
}

import ClientPage from "./ClientPage"

export default function Page() {
  return <ClientPage />
}
