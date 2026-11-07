import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

export const buttonVariants = cva('', {
  variants: {
    variant: {
      white: 'button-white',
      transparent: 'button-transparent',
      round: 'round-button',
      cta: 'cta-round-btn',
    },
  },
  defaultVariants: { variant: 'white' },
});

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & { children: ReactNode };

export function Button({ variant = 'white', type = 'button', className, children, ...rest }: ButtonProps) {
  return (
    <button data-slot="button" type={type} className={cn(buttonVariants({ variant }), className)} {...rest}>
      {children}
    </button>
  );
}

export function SwapText({ upper, lower }: { upper: string; lower: string }) {
  return (
    <span className="swap">
      <span>{upper}</span>
      <span aria-hidden="true">{lower}</span>
    </span>
  );
}
