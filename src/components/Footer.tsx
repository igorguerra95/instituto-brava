import { CLINIC_INFO } from '../data/clinicData';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface-subtle/70 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <div className="space-y-3 md:col-span-5">
            <p className="font-display text-lg font-bold tracking-tight text-foreground">
              {CLINIC_INFO.brandFull}
            </p>
            <p className="max-w-[44ch] text-sm leading-relaxed text-muted-foreground">
              Fisioterapia clínica, Reeducação Postural Global e Pilates terapêutico com foco em
              saúde corporal e recuperação funcional baseada em evidências.
            </p>
          </div>

          <div className="space-y-3 md:col-span-3">
            <p className="font-display text-sm font-semibold text-foreground">Navegação</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#inicio" className="hover:text-primary transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#especialidades" className="hover:text-primary transition-colors">
                  Especialidades
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-primary transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3 md:col-span-4">
            <p className="font-display text-sm font-semibold text-foreground">Atendimento</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Endereço: {CLINIC_INFO.address}</li>
              <li>
                Telefone:{' '}
                <a
                  href={CLINIC_INFO.phoneHref}
                  className="tabular-nums text-foreground hover:text-primary transition-colors"
                >
                  {CLINIC_INFO.phoneDisplay}
                </a>
              </li>
              <li>Horário: {CLINIC_INFO.hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © <span className="tabular-nums">{currentYear}</span> {CLINIC_INFO.brandFull}. Todos
            os direitos reservados.
          </p>
          <p>Fisioterapia Clínica · RPG · Pilates Terapêutico</p>
        </div>
      </div>
    </footer>
  );
}
