import * as React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { SPECIALTIES } from '../data/clinicData';
import type { SpecialtyId } from '../types';
import { ClinicalImage } from './ClinicalImage';
import { Button } from './ui/button';

interface SpecialtiesSectionProps {
  onSelectSpecialty: (specialtyId: SpecialtyId) => void;
}

type FilterOption = 'all' | 'coluna' | 'movimento';

const FILTER_TABS: { id: FilterOption; label: string }[] = [
  { id: 'all', label: 'Todas as especialidades' },
  { id: 'coluna', label: 'Coluna e Dor' },
  { id: 'movimento', label: 'Pilates e Ortopedia' },
];

export function SpecialtiesSection({ onSelectSpecialty }: SpecialtiesSectionProps) {
  const [activeFilter, setActiveFilter] = React.useState<FilterOption>('all');

  const visibleSpecialties = React.useMemo(() => {
    if (activeFilter === 'coluna') {
      return SPECIALTIES.filter((s) => s.id === 'rpg' || s.id === 'terapia-manual');
    }
    if (activeFilter === 'movimento') {
      return SPECIALTIES.filter((s) => s.id === 'pilates' || s.id === 'reabilitacao');
    }
    return SPECIALTIES;
  }, [activeFilter]);

  return (
    <section
      id="especialidades"
      className="border-b border-border bg-background py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho da Seção */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12"
        >
          <div className="space-y-4 lg:col-span-7">
            <p className="text-xs font-medium tracking-wide text-primary sm:text-sm">
              Especialidades Clínicas
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Protocolos terapêuticos orientados à causa biomecânica.
            </h2>
          </div>

          <div className="space-y-4 lg:col-span-5">
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Atuamos desde o alívio inicial da dor aguda até a consolidação do controle motor,
              unindo recursos manuais e treinamento clínico supervisionado.
            </p>

            {/* Controle interativo de filtro funcional */}
            <div
              role="group"
              aria-label="Filtrar especialidades clínicas"
              className="inline-flex flex-wrap items-center gap-1 rounded-xl border border-border bg-surface-subtle p-1"
            >
              {FILTER_TABS.map((tab) => {
                const isActive = activeFilter === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFilter(tab.id)}
                    aria-pressed={isActive}
                    className={`rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                      isActive
                        ? 'bg-card text-primary shadow-sm border border-border'
                        : 'text-muted-foreground hover:text-foreground border border-transparent'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Bento Grid Assimétrico (12 Colunas) */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {visibleSpecialties.map((item, idx) => {
            const colSpan =
              visibleSpecialties.length <= 2 ? 'lg:col-span-6' : item.spanClass;

            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.18 }}
                transition={{ duration: 0.6, delay: idx * 0.06, ease: 'easeOut' }}
                className={`clinical-surface clinical-surface-hover flex flex-col justify-between overflow-hidden rounded-2xl ${colSpan}`}
              >
                <div>
                  {item.image && (
                    <div className="border-b border-border p-2">
                      <ClinicalImage
                        src={item.image}
                        alt={item.imageAlt || item.title}
                        titleFallback={item.title}
                        className="aspect-[16/10] w-full rounded-xl"
                      />
                    </div>
                  )}

                  <div className="space-y-4 p-6 sm:p-8">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
                      <span className="font-display text-sm font-semibold text-primary tabular-nums">
                        {item.index}
                      </span>
                      {item.metadata.map((meta, mIdx) => (
                        <React.Fragment key={meta}>
                          <span aria-hidden="true">·</span>
                          <span>{meta}</span>
                          {mIdx === item.metadata.length - 1 ? null : null}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display text-2xl font-bold tracking-tight text-foreground">
                        {item.title}
                      </h3>
                      <p className="text-sm font-medium text-primary">{item.subtitle}</p>
                    </div>

                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 border-t border-border bg-surface-subtle/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                  <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-[38ch]">
                    {item.clinicalFocus}
                  </p>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSelectSpecialty(item.id)}
                  >
                    <span>Entrar em contato</span>
                    <ArrowUpRight className="h-4 w-4 text-primary" aria-hidden="true" />
                  </Button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
