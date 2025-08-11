// app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { z } from "zod"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const schema = z.object({
  name: z.string().min(2, "Informe seu nome."),
  email: z.string().email("E-mail inválido."),
  phone: z.string().min(8, "Telefone inválido."),
  message: z.string().min(10, "Mensagem muito curta."),
  honey: z.string().max(0).optional(),
})

// rate limit simples (60s/IP)
const RL_WINDOW_MS = 60_000
const rl = (global as any).__contact_rl || new Map<string, number>()
;(global as any).__contact_rl = rl

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const parsed = schema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors.map(e => e.message).join(" • ") },
        { status: 400 }
      )
    }
    if (body.honey) return NextResponse.json({ ok: true })

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown"
    const last = rl.get(ip) || 0
    const now = Date.now()
    if (now - last < RL_WINDOW_MS) {
      return NextResponse.json({ error: "Aguarde um minuto e tente novamente." }, { status: 429 })
    }
    rl.set(ip, now)

    const { name, email, phone, message } = parsed.data

    // === Gmail via Senha de App ===
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // 465 = SSL/TLS
      auth: {
        user: process.env.SMTP_USER!, // seu Gmail/Workspace completo
        pass: process.env.SMTP_PASS!, // Senha de App (16 caracteres)
      },
      logger: process.env.NODE_ENV !== "production",
      debug: process.env.NODE_ENV !== "production",
    })

    // (opcional) valida transporte em dev
    if (process.env.NODE_ENV !== "production") {
      try { await transporter.verify() } catch {}
    }

    const toAddress = process.env.CONTACT_TO || process.env.SMTP_USER!
    const fromAddress = process.env.SMTP_USER! // precisa ser IGUAL ao usuário autenticado

    await transporter.sendMail({
      from: fromAddress,
      to: toAddress,
      replyTo: email, // resposta vai para o cliente
      subject: `Novo pedido de orçamento — ${name}`,
      text: [
        `Nome: ${name}`,
        `E-mail: ${email}`,
        `Telefone: ${phone}`,
        "",
        "Mensagem:",
        message,
      ].join("\n"),
      html: `
        <h2>Novo pedido de orçamento</h2>
        <p><b>Nome:</b> ${name}</p>
        <p><b>E-mail:</b> ${email}</p>
        <p><b>Telefone:</b> ${phone}</p>
        <p><b>Mensagem:</b><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    })

    return NextResponse.json({ ok: true })
  } catch (err: any) {
    console.error("CONTACT_ERROR:", err)
    return NextResponse.json(
      { error: err?.message || "Falha no envio. Tente novamente em instantes." },
      { status: 500 }
    )
  }
}
