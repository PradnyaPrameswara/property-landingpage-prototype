import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'white' | 'transparent' | 'round' | 'cta';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

const variantClass: Record<ButtonVariant, string> = {
  white: 'button-white',
  transparent: 'button-transparent',
  round: 'round-button',
  cta: 'cta-round-btn',
};

export function Button({ variant = 'white', type = 'button', className = '', children, ...rest }: ButtonProps) {
  const cls = `${variantClass[variant]}${className ? ` ${className}` : ''}`;
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}

export function SwapText({ upper, lower }: { upper: string; lower: string }) {
  return (
    <span className="swap" aria-hidden={false}>
      <span>{upper}</span>
      <span aria-hidden="true">{lower}</span>
    </span>
  );
}
