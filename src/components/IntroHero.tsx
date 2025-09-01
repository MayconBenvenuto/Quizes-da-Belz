import { Button } from "@/components/ui/button";
import { ArrowRight, Activity, ShieldCheck, Brain, Timer, User, Building2, Briefcase, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { ComponentType, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IntroHeroProps {
  onStart: (data: { firstName: string; lastName: string; sector: string; role: string }) => void | Promise<void>;
}

const IntroHero = ({ onStart }: IntroHeroProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", sector: "", role: "" });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.firstName.trim()) e.firstName = "Informe o nome";
    if (!formData.lastName.trim()) e.lastName = "Informe o sobrenome";
    if (!formData.sector.trim()) e.sector = "Informe o setor";
    if (!formData.role.trim()) e.role = "Informe o cargo";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    try {
      setSubmitting(true);
      await onStart(formData);
      setOpen(false);
      setFormData({ firstName: "", lastName: "", sector: "", role: "" });
      setTouched({});
      setErrors({});
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: value.trim() ? undefined : prev[field] || "Obrigatório" }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => () => {
    setTouched(prev => ({ ...prev, [field]: true }));
    if (!formData[field].trim()) setErrors(prev => ({ ...prev, [field]: prev[field] || "Obrigatório" }));
    else setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  const fieldBase = "pl-9 pr-3 h-11 text-sm";
  const fieldState = (f: keyof typeof formData) => errors[f]
    ? `${fieldBase} border-destructive focus-visible:ring-destructive/30`
    : touched[f] && formData[f].trim()
      ? `${fieldBase} border-emerald-500 focus-visible:ring-emerald-500/30`
      : `${fieldBase}`;

  function FieldCompact({ id, label, placeholder, icon: Icon }: { id: keyof typeof formData; label: string; placeholder: string; icon: ComponentType<{ className?: string }> }) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="text-xs font-medium text-white/70 uppercase tracking-wide">{label}</Label>
        <div className="relative">
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-corporate-blue/70" />
          <Input
            id={id}
            value={formData[id]}
            onChange={handleChange(id)}
            onBlur={handleBlur(id)}
            placeholder={placeholder}
            disabled={submitting}
            className={`${fieldState(id)} bg-white/90 backdrop-blur border rounded-lg focus-visible:ring-2 transition pr-9 disabled:opacity-60 disabled:cursor-not-allowed`}
          />
          {touched[id] && errors[id] && (
            <AlertCircle className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-destructive" />
          )}
          {touched[id] && !errors[id] && formData[id].trim() && (
            <CheckCircle2 className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-emerald-500" />
          )}
        </div>
        {touched[id] && errors[id] && (
          <p className="text-xs text-destructive font-medium">{errors[id]}</p>
        )}
      </div>
    );
  }
  return (
    <section className="relative overflow-hidden">
      {/* Background composto: foto colaboradores + overlay */}
      <div aria-hidden="true" className="absolute inset-0">
        <img
          src="/colaboradores-belz.png"
          alt=""
          className="w-full h-full object-cover object-center brightness-100 contrast-105"
          loading="eager"
          decoding="async"
        />
        {/* Overlay único mais leve para legibilidade do texto */}
        <div className="absolute inset-0 bg-gradient-to-b from-corporate-blue-dark/75 via-corporate-blue/70 to-corporate-blue-light/80" />
        {/* Radial highlights sutis */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_35%,hsl(var(--accent)/0.30),transparent_60%),radial-gradient(circle_at_75%_70%,hsl(var(--primary)/0.28),transparent_62%)] mix-blend-screen opacity-70" />
      </div>

      <div className="relative container mx-auto px-5 pt-16 pb-20 md:pt-20 md:pb-28 flex flex-col items-center text-center text-white max-w-4xl">
        <img
          src="/Conecta-Saude.png"
          alt="Belz Conecta Saúde"
          className="h-14 sm:h-16 md:h-20 w-auto mb-10 drop-shadow-lg"
          loading="eager"
          decoding="async"
        />
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
          Quiz de Ergonomia Corporativa
        </h1>
        <p className="mt-5 text-base sm:text-lg text-white/85 max-w-2xl leading-relaxed">
          Teste seus conhecimentos e hábitos sobre postura, pausas e boas práticas ergonômicas. Descubra onde melhorar e avance rumo a um ambiente de trabalho mais saudável.
        </p>
        <p className="mt-3 text-[11px] uppercase tracking-[0.2em] font-medium text-white/60">
          Belz Conecta Saúde
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
            <Feature icon={Activity} title="Postura" desc="Altura, apoio e alinhamento" />
            <Feature icon={Brain} title="Consciência" desc="Hábitos e atenção diária" />
            <Feature icon={Timer} title="Pausas" desc="Intervalos e microdescansos" />
            <Feature icon={ShieldCheck} title="Prevenção" desc="Redução de riscos" />
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full sm:justify-center">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="group relative px-8 h-12 rounded-xl bg-white text-corporate-blue font-semibold text-base shadow-lg hover:shadow-xl hover:bg-white/95 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent transition-all"
              >
                Iniciar Quiz
                <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Preencha seus dados</DialogTitle>
                <DialogDescription>
                  Usamos essas informações apenas para identificar seu resultado no relatório interno.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={submit} className="space-y-6 mt-2" aria-live="polite">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldCompact id="firstName" label="Nome" placeholder="Ex: Ana" icon={User} />
                  <FieldCompact id="lastName" label="Sobrenome" placeholder="Ex: Silva" icon={User} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FieldCompact id="sector" label="Setor" placeholder="Ex: Financeiro" icon={Building2} />
                  <FieldCompact id="role" label="Cargo" placeholder="Ex: Analista" icon={Briefcase} />
                </div>
                <Button type="submit" disabled={submitting} className="w-full h-11 rounded-lg font-medium bg-corporate-blue hover:bg-corporate-blue-light transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="h-4 w-4 animate-spin" />} {submitting ? "Iniciando..." : "Iniciar"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon: Icon, title, desc }: { icon: ComponentType<{ className?: string }>; title: string; desc: string }) => (
  <div className="flex items-start gap-3 rounded-lg bg-white/10 border border-white/15 px-4 py-3 text-left">
    <div className="mt-0.5">
      <Icon className="w-5 h-5 text-white/90" />
    </div>
    <div className="text-sm">
      <p className="font-medium text-white leading-snug">{title}</p>
      <p className="text-white/60 text-xs mt-0.5">{desc}</p>
    </div>
  </div>
);

export default IntroHero;
