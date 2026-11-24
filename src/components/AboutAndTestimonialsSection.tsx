import { motion } from 'motion/react';
import { ArrowUpRight, GraduationCap } from 'lucide-react';
import {
  ACADEMIC_CREDENTIALS,
  CLINIC_INFO,
  RECOVERY_TESTIMONIALS,
} from '../data/clinicData';
import { ClinicalImage } from './ClinicalImage';
import { Button } from './ui/button';

interface AboutAndTestimonialsSectionProps {
  onContactClick: () => void;
}

export function AboutAndTestimonialsSection({
  onContactClick,
}: AboutAndTestimonialsSectionProps) {
  return (
    <section
      id="sobre"
      className="border-b border-border bg-surface-subtle/65 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Bloco 1: Sobre o Instituto e Formação Acadêmica */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-5"
          >
            <div className="clinical-surface h-full overflow-hidden rounded-2xl p-2">
              <ClinicalImage
                src={CLINIC_INFO.directorImage}
                alt={CLINIC_INFO.directorImageAlt}
                titleFallback={CLINIC_INFO.brandFull}
                className="aspect-[3/4] w-full rounded-xl lg:h-full lg:aspect-auto"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.08, ease: 'easeOut' }}
            className="flex flex-col justify-between space-y-8 lg:col-span-7"
          >
            <div className="space-y-4">
              <p className="text-xs font-medium tracking-wide text-primary sm:text-sm">
                Sobre o Instituto e Formação Acadêmica
              </p>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Rigor acadêmico aplicado à recuperação funcional.
              </h2>
              <p className="max-w-[65ch] text-base leading-relaxed text-muted-foreground">
                O {CLINIC_INFO.brandFull} nasceu com o propósito de oferecer fisioterapia clínica de
                alta precisão em um ambiente calmo, reservado e livre de protocolos padronizados.
                Cada atendimento é conduzido diretamente por fisioterapeutas com sólida formação
                acadêmica em biomecânica, terapia manual e controle motor.
              </p>
            </div>

            {/* Lista Estruturada de Formação Acadêmica */}
            <div className="clinical-surface overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <span className="font-display text-sm font-semibold text-foreground">
                  Trajetória de Formação e Especializações
                </span>
                <GraduationCap className="h-4 w-4 text-primary" aria-hidden="true" />
              </div>

              <ul className="divide-y divide-border">
                {ACADEMIC_CREDENTIALS.map((cred) => (
                  <li
                    key={cred.title}
                    className="grid grid-cols-1 gap-2 px-6 py-4 sm:grid-cols-12 sm:gap-4"
                  >
                    <span className="font-display text-sm font-semibold text-primary tabular-nums sm:col-span-2">
                      {cred.year}
                    </span>
                    <div className="space-y-1 sm:col-span-10">
                      <p className="text-sm font-semibold text-foreground">{cred.title}</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {cred.institution}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <p className="text-xs text-muted-foreground">
                Atendimento exclusivo mediante agendamento · Avaliação clínica inicial de 50 minutos
              </p>
              <Button onClick={onContactClick}>
                <span>Entrar em contato</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Bloco 2: Depoimentos de Recuperação (Adjacente à Formação e Claims) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.18 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-16 border-t border-border pt-14 lg:mt-20 lg:pt-16"
        >
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="space-y-2">
              <p className="text-xs font-medium tracking-wide text-primary sm:text-sm">
                Depoimentos de Recuperação
              </p>
              <h3 className="font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                Evoluções clínicas documentadas em nossos pacientes.
              </h3>
            </div>
            <p className="max-w-[44ch] text-xs leading-relaxed text-muted-foreground sm:text-sm">
              Relatos reais de retorno à funcionalidade após acompanhamento estruturado em RPG,
              Pilates clínico e reabilitação ortopédica.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {RECOVERY_TESTIMONIALS.map((item, idx) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: 'easeOut' }}
                className="clinical-surface clinical-surface-hover flex flex-col justify-between rounded-2xl p-6 sm:p-7"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="font-display text-base font-bold text-foreground">
                      {item.patientName}
                    </p>
                    <p className="text-xs text-primary">{item.clinicalContext}</p>
                    <p className="text-xs text-muted-foreground">{item.duration}</p>
                  </div>

                  <blockquote className="text-sm leading-relaxed text-foreground">
                    “{item.quote}”
                  </blockquote>
                </div>

                <div className="mt-6 space-y-2 border-t border-border pt-4 text-xs">
                  <div>
                    <span className="font-semibold text-foreground">Quadro inicial: </span>
                    <span className="text-muted-foreground">{item.beforeSummary}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-primary">Resultado: </span>
                    <span className="text-muted-foreground">{item.outcomeSummary}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
