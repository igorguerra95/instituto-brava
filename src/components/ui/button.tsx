import * as React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'navy-gradient-bg text-primary-foreground shadow-sm hover:opacity-95 active:scale-[0.99]',
  secondary:
    'bg-secondary text-secondary-foreground hover:bg-muted border border-border',
  outline:
    'bg-transparent text-foreground border border-border-strong hover:bg-surface-subtle',
  ghost: 'bg-transparent text-foreground hover:bg-surface-subtle',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
  icon: 'h-11 w-11 p-0',
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={`inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap shrink-0 cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
