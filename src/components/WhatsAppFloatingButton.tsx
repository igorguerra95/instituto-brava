import { MessageCircle } from 'lucide-react';
import { CLINIC_INFO } from '../data/clinicData';

export function WhatsAppFloatingButton() {
  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      <div className="relative flex items-center justify-center">
        {/* Pulso discreto ao redor do botão */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full bg-primary/25 animate-ping"
          style={{ animationDuration: '2.8s' }}
        />

        <a
          href={CLINIC_INFO.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Entrar em contato pelo WhatsApp (00) 00000-0000"
          title="Entrar em contato pelo WhatsApp"
          className="navy-gradient-bg relative inline-flex h-12 w-12 items-center justify-center rounded-full text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform duration-150 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:h-12 sm:w-auto sm:gap-2.5 sm:px-5"
        >
          <MessageCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span className="hidden text-sm font-medium whitespace-nowrap sm:inline">
            Entrar em contato
          </span>
        </a>
      </div>
    </div>
  );
}
