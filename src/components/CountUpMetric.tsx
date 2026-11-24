import * as React from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';

interface CountUpMetricProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

export function CountUpMetric({ value, suffix = '', prefix = '' }: CountUpMetricProps) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const prefersReducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = React.useState<number>(value);

  React.useEffect(() => {
    if (prefersReducedMotion || !isInView) {
      setDisplayValue(value);
      return;
    }

    const controls = animate(0, value, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        setDisplayValue(Math.round(latest));
      },
    });

    return () => controls.stop();
  }, [isInView, prefersReducedMotion, value]);

  const formatted = new Intl.NumberFormat('pt-BR').format(displayValue);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
