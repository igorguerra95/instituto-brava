import { motion } from 'motion/react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { CLINIC_INFO, CLINICAL_METRICS } from '../data/clinicData';
import { ClinicalImage } from './ClinicalImage';
import { CountUpMetric } from './CountUpMetric';
import { Button } from './ui/button';

interface HeroSectionProps {
  onContactClick: () => void;
}

const heroContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export function HeroSection({ onContactClick }: HeroSectionProps) {
  return (
    <section
      id="inicio"
      className="relative border-b border-border clinical-grid-backdrop"
    >
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-14 sm:px-6 sm:pt-14 sm:pb-16 lg:px-8 lg:pt-18 lg:pb-20">
        {/* Split Assimétrico 12 Colunas */}
        <div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12 lg:gap-12">
          <motion.div
            variants={heroContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col justify-between lg:col-span-6"
          >
            <div className="space-y-6">
              <motion.p
                variants={heroItemVariants}
                className="text-xs font-medium tracking-wide text-primary sm:text-sm"
              >
                Instituto Brava Fisioterapia e Pilates · Reabilitação e RPG
              </motion.p>

              <motion.h1
                variants={heroItemVariants}
                className="font-display text-[clamp(3rem,5.2vw,5.25rem)] font-bold leading-[1.01] tracking-[-0.035em] text-foreground"
              >
                Precisão clínica que devolve liberdade ao movimento.
              </motion.h1>

              <motion.p
                variants={heroItemVariants}
                className="max-w-[54ch] text-base leading-relaxed text-muted-foreground sm:text-lg"
              >
                Cada plano terapêutico nasce de uma avaliação biomecânica detalhada. Integramos
                fisioterapia ortopédica, Reeducação Postural Global (RPG) e Pilates clínico para
                restaurar função, reduzir dores persistentes e prevenir recidivas.
              </motion.p>
            </div>

            <motion.div
              variants={heroItemVariants}
              className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10"
            >
              <Button size="lg" onClick={onContactClick}>
                <span>Entrar em contato</span>
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>

              <a
                href="#especialidades"
                className="inline-flex h-12 items-center gap-2 rounded-lg border border-border bg-card px-5 text-sm font-medium text-foreground whitespace-nowrap shrink-0 transition-colors duration-150 hover:border-border-strong hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <span>Conhecer especialidades</span>
                <ArrowDownRight className="h-4 w-4 text-primary" aria-hidden="true" />
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="clinical-surface h-full overflow-hidden rounded-2xl p-2">
              <ClinicalImage
                src={CLINIC_INFO.heroImage}
                alt={CLINIC_INFO.heroImageAlt}
                titleFallback={CLINIC_INFO.brandFull}
                loading="eager"
                className="aspect-[16/10] w-full rounded-xl lg:aspect-auto lg:h-full lg:min-h-[460px]"
              />
            </div>
          </motion.div>
        </div>

        {/* Faixa de Métricas Clínicas em 4 Colunas abaixo do Hero Split */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="mt-12 grid grid-cols-1 divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)] sm:grid-cols-2 sm:divide-y-0 sm:divide-x lg:mt-16 lg:grid-cols-4"
        >
          {CLINICAL_METRICS.map((metric, idx) => (
            <div
              key={metric.id}
              className={`flex flex-col justify-between gap-3 p-6 ${
                idx >= 2 ? 'sm:border-t sm:border-border lg:border-t-0' : ''
              }`}
            >
              <div className="font-display text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                <CountUpMetric
                  value={metric.value}
                  suffix={metric.suffix}
                  prefix={metric.prefix}
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-foreground">{metric.label}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{metric.detail}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
