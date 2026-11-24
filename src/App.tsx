import * as React from 'react';
import { MotionConfig } from 'motion/react';
import { AboutAndTestimonialsSection } from './components/AboutAndTestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { SpecialtiesSection } from './components/SpecialtiesSection';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import type { SpecialtyId } from './types';

export default function App() {
  const [selectedSpecialty, setSelectedSpecialty] = React.useState<SpecialtyId>('rpg');
  const nameInputRef = React.useRef<HTMLInputElement | null>(null);

  const scrollToContactAndFocus = React.useCallback(() => {
    const contactEl = document.getElementById('contato');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.setTimeout(() => {
      nameInputRef.current?.focus({ preventScroll: true });
    }, 450);
  }, []);

  const handleSelectSpecialty = React.useCallback(
    (specialtyId: SpecialtyId) => {
      setSelectedSpecialty(specialtyId);
      scrollToContactAndFocus();
    },
    [scrollToContactAndFocus]
  );

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/15 selection:text-primary">
        <a
          href="#conteudo-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
        >
          Ir para o conteúdo principal
        </a>

        <Header onContactClick={scrollToContactAndFocus} />

        <main id="conteudo-principal">
          <HeroSection onContactClick={scrollToContactAndFocus} />
          <SpecialtiesSection onSelectSpecialty={handleSelectSpecialty} />
          <AboutAndTestimonialsSection onContactClick={scrollToContactAndFocus} />
          <ContactSection
            selectedSpecialty={selectedSpecialty}
            onSpecialtyChange={setSelectedSpecialty}
            nameInputRef={nameInputRef}
          />
        </main>

        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </MotionConfig>
  );
}
