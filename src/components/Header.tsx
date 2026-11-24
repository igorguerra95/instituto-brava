import * as React from 'react';
import { ArrowUpRight, Menu, Phone } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';
import { Button } from './ui/button';
import { Sheet } from './ui/sheet';

interface HeaderProps {
  onContactClick: () => void;
}

const NAV_LINKS = [
  { href: '#inicio', label: 'Início' },
  { href: '#especialidades', label: 'Especialidades' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#contato', label: 'Contato' },
] as const;

export function Header({ onContactClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleMobileContact = () => {
    setMobileMenuOpen(false);
    onContactClick();
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-8 px-4 sm:px-6 lg:px-8">
        {/* Zona 1: Wordmark em linha única */}
        <a
          href="#inicio"
          className="font-display text-lg font-bold tracking-tight text-foreground whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          {CLINIC_INFO.brandShort}
        </a>

        {/* Zona 2: 4 links de navegação concisos em linha única */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground"
        >
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm after:absolute after:inset-x-0 after:bottom-0 after:h-[1.5px] after:origin-left after:scale-x-0 after:bg-primary after:transition-transform after:duration-200 hover:after:scale-x-100"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zona 3: 1 ação primária no desktop + gatilho de menu mobile */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden md:block">
            <Button size="sm" onClick={onContactClick}>
              <span>Entrar em contato</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Abrir menu de navegação"
            aria-expanded={mobileMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring md:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Menu Mobile estilo Sheet/Drawer */}
      <Sheet
        open={mobileMenuOpen}
        onOpenChange={setMobileMenuOpen}
        title={CLINIC_INFO.brandShort}
        description="Fisioterapia Clínica, RPG e Pilates"
      >
        <div className="flex flex-col gap-6">
          <nav aria-label="Menu mobile" className="flex flex-col divide-y divide-border">
            {NAV_LINKS.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleMobileNav(item.href)}
                className="flex h-12 w-full items-center justify-between text-left font-display text-base font-medium text-foreground transition-colors hover:text-primary"
              >
                <span>{item.label}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </button>
            ))}
          </nav>

          <div className="space-y-4 border-t border-border pt-6">
            <Button size="lg" className="w-full" onClick={handleMobileContact}>
              <span>Entrar em contato</span>
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Button>

            <a
              href={CLINIC_INFO.phoneHref}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border bg-surface-subtle px-4 text-sm font-medium text-foreground transition-colors hover:border-border-strong"
            >
              <Phone className="h-4 w-4 text-primary" aria-hidden="true" />
              <span className="tabular-nums">{CLINIC_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </Sheet>
    </header>
  );
}
