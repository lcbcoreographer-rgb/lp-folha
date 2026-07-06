"use client";
import { useEffect, useRef, useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  MessageCircle,
  Clock,
  Loader2,
} from "lucide-react";

const WHATSAPP_PHONE = "5541984662106";

const SEGMENTOS = [
  "Indústria",
  "Agronegócio",
  "Construção Civil",
  "Comércio",
  "Transporte",
  "Energia",
  "Prestação de Serviços",
  "Outro",
];

const FATURAMENTOS = [
  "Até R$ 360 mil/ano (MEI)",
  "R$ 360 mil a R$ 4,8 milhões/ano (Pequena empresa)",
  "R$ 4,8 milhões a R$ 300 milhões/ano (Média empresa)",
  "Acima de R$ 300 milhões/ano (Grande empresa)",
  "Prefiro não informar",
];

const SERVICOS = [
  "Licenciamento Ambiental",
  "Renovação de Licença Ambiental",
  "Regularização Ambiental",
  "Outorga de Uso da Água",
  "Cadastro Ambiental Rural (CAR)",
  "Plano de Gerenciamento de Resíduos (PGRS)",
  "Gestão de Resíduos",
  "Consultoria Ambiental",
  "Estudos Ambientais",
  "Laudos Técnicos",
  "Compensação Ambiental",
  "Outro",
];

const URGENCIAS = [
  "Muito urgente (até 7 dias)",
  "Urgente (até 15 dias)",
  "Em até 30 dias",
  "Nos próximos 3 meses",
  "Apenas buscando informações",
];

const CANAIS = ["Google", "Instagram", "Facebook", "Indicação", "Cliente", "Outro"];

const ESTADOS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
  "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

const STEP_LABELS = ["Contato", "Empresa", "Necessidade", "Prazo", "Situação"];

interface FormData {
  nome: string;
  empresa: string;
  cargo: string;
  email: string;
  telefone: string;
  cidade: string;
  estado: string;
  segmento: string;
  faturamento: string;
  servicos: string[];
  necessidade: string;
  urgencia: string;
  possuiLicenca: "" | "sim" | "nao" | "nao-sei";
  qualLicenca: string;
  comoConheceu: string;
}

const INITIAL_DATA: FormData = {
  nome: "",
  empresa: "",
  cargo: "",
  email: "",
  telefone: "",
  cidade: "",
  estado: "",
  segmento: "",
  faturamento: "",
  servicos: [],
  necessidade: "",
  urgencia: "",
  possuiLicenca: "",
  qualLicenca: "",
  comoConheceu: "",
};

function buildWhatsAppMessage(data: FormData) {
  const lines = [
    "Olá! Gostaria de um atendimento especializado. Segue um resumo:",
    "",
    `*Nome:* ${data.nome}`,
    `*Empresa:* ${data.empresa}`,
    data.cargo && `*Cargo:* ${data.cargo}`,
    `*E-mail:* ${data.email}`,
    `*Telefone:* ${data.telefone}`,
    (data.cidade || data.estado) && `*Local:* ${[data.cidade, data.estado].filter(Boolean).join(" - ")}`,
    data.segmento && `*Segmento:* ${data.segmento}`,
    data.faturamento && `*Faturamento:* ${data.faturamento}`,
    data.servicos.length > 0 && `*Serviços de interesse:* ${data.servicos.join(", ")}`,
    data.necessidade && `*Necessidade:* ${data.necessidade}`,
    data.urgencia && `*Prazo:* ${data.urgencia}`,
    data.possuiLicenca && `*Já possui licença?* ${data.possuiLicenca}${data.qualLicenca ? ` (${data.qualLicenca})` : ""}`,
    data.comoConheceu && `*Como conheceu a Folha:* ${data.comoConheceu}`,
  ].filter(Boolean);
  return lines.join("\n");
}

function StepPane({ animKey, children }: { animKey: number; children: React.ReactNode }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(false);
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [animKey]);
  return (
    <div
      className="transition-all duration-[350ms] ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(20px)",
      }}
    >
      {children}
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span className="text-amber-600"> *</span>}
      </span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-forest-900/15 bg-white px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-soft/50 outline-none transition-colors focus:border-forest-700 focus:ring-2 focus:ring-forest-700/15";

export default function FormModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setStep(0);
      setData(INITIAL_DATA);
      setSuccess(false);
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function toggleServico(servico: string) {
    setData((d) => ({
      ...d,
      servicos: d.servicos.includes(servico)
        ? d.servicos.filter((s) => s !== servico)
        : [...d.servicos, servico],
    }));
  }

  function validateStep0() {
    const next: Record<string, string> = {};
    if (!data.nome.trim()) next.nome = "Informe seu nome completo";
    if (!data.empresa.trim()) next.empresa = "Informe o nome da empresa";
    if (!data.email.trim() || !/^\S+@\S+\.\S+$/.test(data.email))
      next.email = "Informe um e-mail válido";
    if (!data.telefone.trim()) next.telefone = "Informe um telefone de contato";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function goNext() {
    if (step === 0 && !validateStep0()) return;
    setStep((s) => Math.min(s + 1, STEP_LABELS.length - 1));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep0()) {
      setStep(0);
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // Non-blocking: still show success + WhatsApp handoff even if logging fails.
    } finally {
      setSubmitting(false);
      setSuccess(true);
    }
  }

  function openWhatsApp() {
    const text = encodeURIComponent(buildWhatsAppMessage(data));
    window.open(`https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}&text=${text}`, "_blank");
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-forest-950/60 backdrop-blur-sm p-4 animate-[fadeIn_0.25s_ease-out]"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-paper shadow-2xl animate-[modalIn_0.35s_cubic-bezier(0.16,1,0.3,1)]"
      >
        <button
          onClick={onClose}
          aria-label="Fechar formulário"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink-soft shadow-sm transition-colors hover:bg-white hover:text-forest-900"
        >
          <X size={18} />
        </button>

        {!success ? (
          <div className="p-6 sm:p-8">
            <div className="pr-10">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
                Folha Soluções Ambientais
              </span>
              <h2 className="mt-1 text-2xl font-extrabold text-forest-900">
                Formulário de Atendimento
              </h2>
            </div>

            {/* Stepper */}
            <div className="mt-6 flex items-center">
              {STEP_LABELS.map((label, i) => (
                <div key={label} className="flex flex-1 items-center last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors duration-300 ${
                        i < step
                          ? "bg-forest-700 text-white"
                          : i === step
                            ? "bg-amber-500 text-white"
                            : "bg-forest-900/10 text-ink-soft"
                      }`}
                    >
                      {i < step ? <CheckCircle2 size={16} /> : i + 1}
                    </div>
                    <span
                      className={`hidden sm:block text-[11px] font-medium ${
                        i === step ? "text-forest-900" : "text-ink-soft/70"
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div
                      className={`mx-1.5 h-0.5 flex-1 rounded transition-colors duration-300 ${
                        i < step ? "bg-forest-700" : "bg-forest-900/10"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="mt-8 min-h-[280px]">
              <StepPane animKey={step}>
                {step === 0 && (
                  <div className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Nome completo" required>
                        <input
                          className={inputClass}
                          value={data.nome}
                          onChange={(e) => update("nome", e.target.value)}
                          placeholder="Seu nome"
                        />
                        {errors.nome && <p className="mt-1 text-xs text-red-600">{errors.nome}</p>}
                      </Field>
                      <Field label="Empresa" required>
                        <input
                          className={inputClass}
                          value={data.empresa}
                          onChange={(e) => update("empresa", e.target.value)}
                          placeholder="Nome da empresa"
                        />
                        {errors.empresa && <p className="mt-1 text-xs text-red-600">{errors.empresa}</p>}
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Cargo">
                        <input
                          className={inputClass}
                          value={data.cargo}
                          onChange={(e) => update("cargo", e.target.value)}
                          placeholder="Seu cargo"
                        />
                      </Field>
                      <Field label="E-mail" required>
                        <input
                          type="email"
                          className={inputClass}
                          value={data.email}
                          onChange={(e) => update("email", e.target.value)}
                          placeholder="voce@empresa.com"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
                      </Field>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <Field label="Telefone / WhatsApp" required>
                        <input
                          className={inputClass}
                          value={data.telefone}
                          onChange={(e) => update("telefone", e.target.value)}
                          placeholder="(41) 90000-0000"
                        />
                        {errors.telefone && <p className="mt-1 text-xs text-red-600">{errors.telefone}</p>}
                      </Field>
                      <Field label="Cidade">
                        <input
                          className={inputClass}
                          value={data.cidade}
                          onChange={(e) => update("cidade", e.target.value)}
                          placeholder="Sua cidade"
                        />
                      </Field>
                    </div>
                    <Field label="Estado">
                      <select
                        className={inputClass}
                        value={data.estado}
                        onChange={(e) => update("estado", e.target.value)}
                      >
                        <option value="">Selecione</option>
                        {ESTADOS.map((uf) => (
                          <option key={uf} value={uf}>
                            {uf}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    <Field label="Qual é o segmento da sua empresa?">
                      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                        {SEGMENTOS.map((seg) => (
                          <button
                            type="button"
                            key={seg}
                            onClick={() => update("segmento", seg)}
                            className={`rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                              data.segmento === seg
                                ? "border-forest-700 bg-forest-50 text-forest-900"
                                : "border-forest-900/15 bg-white text-ink-soft hover:border-forest-700/40"
                            }`}
                          >
                            {seg}
                          </button>
                        ))}
                      </div>
                    </Field>

                    <Field label="Qual é o faturamento anual da empresa?">
                      <select
                        className={inputClass}
                        value={data.faturamento}
                        onChange={(e) => update("faturamento", e.target.value)}
                      >
                        <option value="">Selecione</option>
                        {FATURAMENTOS.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-6">
                    <Field label="Qual serviço você procura? (seleção múltipla)">
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {SERVICOS.map((serv) => (
                          <label
                            key={serv}
                            className={`flex cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2.5 text-sm transition-colors ${
                              data.servicos.includes(serv)
                                ? "border-forest-700 bg-forest-50 text-forest-900"
                                : "border-forest-900/15 bg-white text-ink-soft hover:border-forest-700/40"
                            }`}
                          >
                            <input
                              type="checkbox"
                              className="h-4 w-4 accent-forest-700"
                              checked={data.servicos.includes(serv)}
                              onChange={() => toggleServico(serv)}
                            />
                            {serv}
                          </label>
                        ))}
                      </div>
                    </Field>
                    <Field label="Conte um pouco sobre sua necessidade">
                      <textarea
                        className={`${inputClass} min-h-[100px] resize-y`}
                        value={data.necessidade}
                        onChange={(e) => update("necessidade", e.target.value)}
                        placeholder="Descreva brevemente o que você precisa."
                      />
                    </Field>
                  </div>
                )}

                {step === 3 && (
                  <Field label="Qual é a urgência da sua demanda?">
                    <div className="space-y-2.5">
                      {URGENCIAS.map((u) => (
                        <button
                          type="button"
                          key={u}
                          onClick={() => update("urgencia", u)}
                          className={`block w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors ${
                            data.urgencia === u
                              ? "border-forest-700 bg-forest-50 text-forest-900"
                              : "border-forest-900/15 bg-white text-ink-soft hover:border-forest-700/40"
                          }`}
                        >
                          {u}
                        </button>
                      ))}
                    </div>
                  </Field>
                )}

                {step === 4 && (
                  <div className="space-y-5">
                    <Field label="Você já possui alguma licença ou documentação ambiental relacionada?">
                      <div className="flex flex-wrap gap-2.5">
                        {(
                          [
                            ["sim", "Sim"],
                            ["nao", "Não"],
                            ["nao-sei", "Não sei informar"],
                          ] as const
                        ).map(([value, label]) => (
                          <button
                            type="button"
                            key={value}
                            onClick={() => update("possuiLicenca", value)}
                            className={`rounded-full border px-5 py-2 text-sm font-medium transition-colors ${
                              data.possuiLicenca === value
                                ? "border-forest-700 bg-forest-900 text-white"
                                : "border-forest-900/15 bg-white text-ink-soft hover:border-forest-700/40"
                            }`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </Field>

                    {data.possuiLicenca === "sim" && (
                      <Field label="Se sim, qual?">
                        <input
                          className={inputClass}
                          value={data.qualLicenca}
                          onChange={(e) => update("qualLicenca", e.target.value)}
                          placeholder="Ex: Licença de Operação (LO)"
                        />
                      </Field>
                    )}

                    <Field label="Como conheceu a Folha Soluções Ambientais?">
                      <select
                        className={inputClass}
                        value={data.comoConheceu}
                        onChange={(e) => update("comoConheceu", e.target.value)}
                      >
                        <option value="">Selecione</option>
                        {CANAIS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </Field>
                  </div>
                )}
              </StepPane>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-forest-900/10 pt-5">
              <button
                type="button"
                onClick={goBack}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm font-semibold text-ink-soft transition-colors hover:text-forest-900 disabled:opacity-0"
              >
                <ChevronLeft size={16} /> Voltar
              </button>

              {step < STEP_LABELS.length - 1 ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="inline-flex items-center gap-1.5 rounded-full bg-forest-900 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-forest-800 hover:-translate-y-0.5"
                >
                  Continuar <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-7 py-2.5 text-sm font-semibold text-white shadow-lg shadow-amber-900/10 transition-all hover:bg-amber-600 hover:-translate-y-0.5 disabled:opacity-70"
                >
                  {submitting && <Loader2 size={16} className="animate-spin" />}
                  Solicitar Atendimento
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="p-8 sm:p-10 text-center animate-[modalIn_0.4s_cubic-bezier(0.16,1,0.3,1)]">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-forest-50 text-forest-700">
              <CheckCircle2 size={34} />
            </div>
            <h2 className="text-2xl font-extrabold text-forest-900">
              Recebemos sua solicitação com sucesso!
            </h2>
            <p className="mt-3 text-ink-soft">
              Nossa equipe analisará as informações enviadas e entrará em
              contato o mais breve possível.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={openWhatsApp}
                className="group flex flex-col items-center gap-1.5 rounded-xl border border-forest-900/10 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-transform group-hover:scale-110">
                  <MessageCircle size={22} />
                </span>
                <span className="mt-1 font-semibold text-forest-900">
                  Falar agora pelo WhatsApp
                </span>
                <span className="text-xs text-ink-soft">
                  Quero agilizar meu atendimento.
                </span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="group flex flex-col items-center gap-1.5 rounded-xl border border-forest-900/10 bg-white p-5 text-center transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-forest-50 text-forest-700 transition-transform group-hover:scale-110">
                  <Clock size={22} />
                </span>
                <span className="mt-1 font-semibold text-forest-900">
                  Aguardar contato da equipe
                </span>
                <span className="text-xs text-ink-soft">
                  Prefiro que a equipe da Folha entre em contato.
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
