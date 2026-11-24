import * as React from 'react';
import { Activity } from 'lucide-react';

interface ClinicalImageProps {
  src?: string;
  alt: string;
  titleFallback?: string;
  className?: string;
  imgClassName?: string;
  loading?: 'eager' | 'lazy';
}

export function ClinicalImage({
  src,
  alt,
  titleFallback = 'Instituto Brava Fisioterapia e Pilates',
  className = '',
  imgClassName = '',
  loading = 'lazy',
}: ClinicalImageProps) {
  const [hasError, setHasError] = React.useState(false);

  if (!src || hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center overflow-hidden bg-surface-subtle border border-border p-6 text-center ${className}`}
      >
        <div
          className="pointer-events-none absolute inset-0 clinical-grid-backdrop opacity-70"
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-card text-primary">
            <Activity className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="font-display text-sm font-medium text-foreground">{titleFallback}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-surface-subtle ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className={`h-full w-full object-cover ${imgClassName}`}
      />
    </div>
  );
}
