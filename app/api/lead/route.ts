import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/app/lib/supabase";
import { calculateScore } from "@/app/lib/leadScore";
import { notifyNewLead } from "@/app/lib/uazapi";
import type { LeadData } from "@/app/lib/leadTypes";

export async function POST(request: Request) {
  const data: LeadData = await request.json();
  const { score, classificacao } = calculateScore(data);

  try {
    const supabase = getSupabaseAdmin();
    const { data: inserted, error } = await supabase
      .from("leads")
      .insert({
        nome: data.nome,
        empresa: data.empresa,
        cargo: data.cargo || null,
        email: data.email,
        telefone: data.telefone,
        cidade: data.cidade || null,
        estado: data.estado || null,
        segmento: data.segmento || null,
        faturamento: data.faturamento || null,
        servicos: data.servicos,
        necessidade: data.necessidade || null,
        urgencia: data.urgencia || null,
        possui_licenca: data.possuiLicenca || null,
        qual_licenca: data.qualLicenca || null,
        como_conheceu: data.comoConheceu || null,
        score,
        classificacao,
      })
      .select("id")
      .single();

    if (error) {
      console.error("[lead] falha ao salvar no Supabase:", error);
    } else if (inserted) {
      const { error: eventError } = await supabase.from("lead_events").insert({
        lead_id: inserted.id,
        tipo: "criado",
        para_status: "novos_leads",
      });
      if (eventError) {
        console.error("[lead] falha ao registrar evento de criação:", eventError);
      }
    }
  } catch (err) {
    console.error("[lead] falha ao salvar lead:", err);
  }

  try {
    await notifyNewLead(data, score, classificacao);
  } catch (err) {
    console.error("[lead] falha ao notificar WhatsApp:", err);
  }

  return NextResponse.json({ ok: true });
}
