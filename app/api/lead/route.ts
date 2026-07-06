import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const data = await request.json();

  // TODO: connect to a real destination (email, CRM, database).
  // For now the lead is only logged server-side; the WhatsApp handoff
  // in the success screen is the actual delivery channel to the team.
  console.log("[lead] novo atendimento solicitado:", data);

  return NextResponse.json({ ok: true });
}
