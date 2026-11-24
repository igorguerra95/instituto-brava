import * as React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function Sheet({ open, onOpenChange, title, description, children }: SheetProps) {
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onOpenChange(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex justify-end"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
            className="fixed inset-0 bg-foreground/35 backdrop-blur-[2px]"
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex h-full w-full max-w-xs flex-col justify-between bg-background border-l border-border p-6 shadow-2xl"
          >
            <div>
              <div className="flex items-start justify-between gap-4 border-b border-border pb-4">
                <div>
                  <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                    {title}
                  </h2>
                  {description && (
                    <p className="mt-1 text-xs text-muted-foreground">{description}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => onOpenChange(false)}
                  aria-label="Fechar menu de navegação"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground transition-colors hover:bg-surface-subtle focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <X className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6">{children}</div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
