import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Basic validation server-side
    if (!body?.name || !body?.email || !body?.message) {
      return NextResponse.json({ error: "Dados incompletos." }, { status: 400 })
    }

    // Here you could integrate with email provider or CRM.
    // For now, simulate success.
    console.log("Novo contato (Real Promo):", body)

    return NextResponse.json({ ok: true })
  } catch (e: any) {
    return NextResponse.json({ error: "Erro ao processar sua solicitação." }, { status: 500 })
  }
}
