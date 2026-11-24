import * as React from 'react';
import { motion } from 'motion/react';
import {
  AlertCircle,
  CalendarCheck2,
  Clock,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import { CLINIC_INFO, SPECIALTIES } from '../data/clinicData';
import type {
  AppointmentRequest,
  PreferredPeriod,
  SpecialtyId,
} from '../types';
import { Button } from './ui/button';

interface ContactSectionProps {
  selectedSpecialty: SpecialtyId;
  onSpecialtyChange: (specialty: SpecialtyId) => void;
  nameInputRef: React.RefObject<HTMLInputElement | null>;
}

const PERIOD_OPTIONS: PreferredPeriod[] = ['Manhã', 'Tarde', 'Indiferente'];

function formatBrazilianPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11);
  if (digits.length === 0) return '';
  if (digits.length <= 2) return `(${digits}`;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function ContactSection({
  selectedSpecialty,
  onSpecialtyChange,
  nameInputRef,
}: ContactSectionProps) {
  const [fullName, setFullName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [preferredPeriod, setPreferredPeriod] =
    React.useState<PreferredPeriod>('Manhã');
  const [notes, setNotes] = React.useState('');
  const [errors, setErrors] = React.useState<
    Partial<Record<'fullName' | 'phone' | 'email', string>>
  >({});
  const [submittedRequest, setSubmittedRequest] =
    React.useState<AppointmentRequest | null>(null);

  const selectedSpecialtyLabel =
    SPECIALTIES.find((s) => s.id === selectedSpecialty)?.title ??
    'Fisioterapia Clínica';

  const validate = (): boolean => {
    const nextErrors: Partial<Record<'fullName' | 'phone' | 'email', string>> = {};

    if (fullName.trim().length < 3) {
      nextErrors.fullName = 'Informe seu nome completo para o agendamento.';
    }

    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 10) {
      nextErrors.phone = 'Informe um telefone ou WhatsApp válido com DDD.';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      nextErrors.email = 'Verifique o formato do endereço de e-mail informado.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;

    setSubmittedRequest({
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      specialty: selectedSpecialty,
      preferredPeriod,
      notes: notes.trim(),
    });
  };

  const buildWhatsAppSummaryHref = () => {
    if (!submittedRequest) return CLINIC_INFO.whatsappHref;
    const message = [
      `Olá, gostaria de entrar em contato para agendar uma avaliação no ${CLINIC_INFO.brandFull}.`,
      `Nome: ${submittedRequest.fullName}`,
      `Telefone: ${submittedRequest.phone}`,
      `Especialidade: ${selectedSpecialtyLabel}`,
      `Período de preferência: ${submittedRequest.preferredPeriod}`,
      submittedRequest.notes ? `Observações clínicas: ${submittedRequest.notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `https://wa.me/5500000000000?text=${encodeURIComponent(message)}`;
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setErrors({});
  };

  return (
    <section
      id="contato"
      className="bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Coluna Esquerda: Informações Institucionais e Canais Diretos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="space-y-8 lg:col-span-5"
          >
            <div className="space-y-4">
              <p className="text-xs font-medium tracking-wide text-primary sm:text-sm">
                Contato e Agendamento Online
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Agende sua avaliação funcional.
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground">
                Preencha os dados ao lado para solicitar o melhor horário para sua primeira
                consulta ou fale diretamente com nossa recepção clínica pelo WhatsApp.
              </p>
            </div>

            <div className="clinical-surface divide-y divide-border overflow-hidden rounded-2xl">
              <div className="flex items-start gap-4 p-5 sm:p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-subtle text-primary">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Endereço da clínica</p>
                  <p className="text-sm font-semibold text-foreground">{CLINIC_INFO.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 sm:p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-subtle text-primary">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Telefone e WhatsApp
                  </p>
                  <a
                    href={CLINIC_INFO.phoneHref}
                    className="inline-block text-sm font-semibold text-foreground tabular-nums hover:text-primary transition-colors"
                  >
                    {CLINIC_INFO.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 sm:p-6">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-subtle text-primary">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">
                    Horário de atendimento
                  </p>
                  <p className="text-sm font-semibold text-foreground">{CLINIC_INFO.hours}</p>
                </div>
              </div>
            </div>

            <div>
              <a
                href={CLINIC_INFO.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-border-strong bg-card px-5 text-sm font-semibold text-primary transition-colors duration-150 hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:w-auto"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>Entrar em contato pelo WhatsApp</span>
              </a>
            </div>
          </motion.div>

          {/* Coluna Direita: Formulário de Agendamento Online */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
            className="lg:col-span-7"
          >
            <div className="clinical-surface rounded-2xl p-6 sm:p-8 lg:p-10">
              {submittedRequest ? (
                <div className="space-y-6" role="status" aria-live="polite">
                  <div className="flex items-start gap-4 rounded-xl border border-success/30 bg-success-surface p-5">
                    <CalendarCheck2
                      className="mt-0.5 h-6 w-6 shrink-0 text-success"
                      aria-hidden="true"
                    />
                    <div className="space-y-1">
                      <h3 className="font-display text-xl font-bold text-foreground">
                        Solicitação de agendamento registrada
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        Recebemos os dados de pré-avaliação para{' '}
                        <strong className="font-semibold text-foreground">
                          {submittedRequest.fullName}
                        </strong>
                        . Nossa equipe retornará pelo telefone informado para confirmar data e
                        horário disponíveis.
                      </p>
                    </div>
                  </div>

                  <dl className="divide-y divide-border rounded-xl border border-border bg-background text-sm">
                    <div className="flex flex-col justify-between gap-1 px-5 py-3.5 sm:flex-row sm:items-center">
                      <dt className="text-muted-foreground">Especialidade selecionada</dt>
                      <dd className="font-semibold text-foreground">{selectedSpecialtyLabel}</dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 px-5 py-3.5 sm:flex-row sm:items-center">
                      <dt className="text-muted-foreground">Telefone de contato</dt>
                      <dd className="font-semibold text-foreground tabular-nums">
                        {submittedRequest.phone}
                      </dd>
                    </div>
                    <div className="flex flex-col justify-between gap-1 px-5 py-3.5 sm:flex-row sm:items-center">
                      <dt className="text-muted-foreground">Período preferido</dt>
                      <dd className="font-semibold text-foreground">
                        {submittedRequest.preferredPeriod}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href={buildWhatsAppSummaryHref()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="navy-gradient-bg inline-flex h-12 items-center justify-center gap-2 rounded-lg px-6 text-sm font-medium text-primary-foreground shadow-sm transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      <span>Confirmar envio via WhatsApp</span>
                    </a>

                    <Button variant="outline" size="lg" onClick={handleReset}>
                      <span>Nova solicitação</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div className="space-y-1 border-b border-border pb-5">
                    <h3 className="font-display text-xl font-bold text-foreground">
                      Solicitação de Avaliação Clínica
                    </h3>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      Atendimento particular e personalizado. Campos marcados com * são
                      obrigatórios.
                    </p>
                  </div>

                  {/* Seleção de Especialidade */}
                  <div className="space-y-2.5">
                    <span className="block text-sm font-medium text-foreground">
                      Especialidade desejada *
                    </span>
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {SPECIALTIES.map((spec) => {
                        const isSelected = selectedSpecialty === spec.id;
                        return (
                          <button
                            key={spec.id}
                            type="button"
                            onClick={() => onSpecialtyChange(spec.id)}
                            aria-pressed={isSelected}
                            className={`flex min-h-[44px] items-center justify-between rounded-xl border px-4 py-2.5 text-left text-xs font-medium cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring sm:text-sm ${
                              isSelected
                                ? 'border-primary bg-primary/8 text-primary font-semibold'
                                : 'border-border bg-background text-foreground hover:border-border-strong hover:bg-surface-subtle'
                            }`}
                          >
                            <span className="truncate">{spec.title}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                      <label
                        htmlFor="lead-name"
                        className="block text-sm font-medium text-foreground"
                      >
                        Nome completo *
                      </label>
                      <input
                        ref={nameInputRef}
                        id="lead-name"
                        name="fullName"
                        type="text"
                        required
                        autoComplete="name"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) {
                            setErrors((prev) => ({ ...prev, fullName: undefined }));
                          }
                        }}
                        placeholder="Digite seu nome completo"
                        aria-invalid={Boolean(errors.fullName)}
                        className="h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                      />
                      {errors.fullName && (
                        <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="lead-phone"
                        className="block text-sm font-medium text-foreground"
                      >
                        Telefone / WhatsApp *
                      </label>
                      <input
                        id="lead-phone"
                        name="phone"
                        type="tel"
                        required
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(formatBrazilianPhone(e.target.value));
                          if (errors.phone) {
                            setErrors((prev) => ({ ...prev, phone: undefined }));
                          }
                        }}
                        placeholder="(00) 00000-0000"
                        aria-invalid={Boolean(errors.phone)}
                        className="h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground tabular-nums placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                      />
                      {errors.phone && (
                        <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.phone}</span>
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="lead-email"
                        className="block text-sm font-medium text-foreground"
                      >
                        E-mail (opcional)
                      </label>
                      <input
                        id="lead-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) {
                            setErrors((prev) => ({ ...prev, email: undefined }));
                          }
                        }}
                        placeholder="voce@exemplo.com.br"
                        aria-invalid={Boolean(errors.email)}
                        className="h-11 w-full rounded-lg border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                      />
                      {errors.email && (
                        <p className="flex items-center gap-1.5 text-xs font-medium text-destructive">
                          <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Período Preferido */}
                  <div className="space-y-2.5">
                    <span className="block text-sm font-medium text-foreground">
                      Período de preferência
                    </span>
                    <div
                      role="group"
                      aria-label="Período de preferência para atendimento"
                      className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-border bg-surface-subtle p-1"
                    >
                      {PERIOD_OPTIONS.map((period) => {
                        const isActive = preferredPeriod === period;
                        return (
                          <button
                            key={period}
                            type="button"
                            onClick={() => setPreferredPeriod(period)}
                            aria-pressed={isActive}
                            className={`rounded-lg px-4 py-2 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                              isActive
                                ? 'bg-card text-primary shadow-sm border border-border font-semibold'
                                : 'text-muted-foreground hover:text-foreground border border-transparent'
                            }`}
                          >
                            {period}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="lead-notes"
                      className="block text-sm font-medium text-foreground"
                    >
                      Breve relato clínico ou objetivo (opcional)
                    </label>
                    <textarea
                      id="lead-notes"
                      name="notes"
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Ex.: dor lombar há 3 semanas, pós-operatório de joelho ou início no Pilates clínico."
                      className="w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/70 transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/20"
                    />
                  </div>

                  <div className="pt-2">
                    <Button type="submit" size="lg" className="w-full">
                      <span>Entrar em contato</span>
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
