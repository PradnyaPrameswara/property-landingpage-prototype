import type { InputHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

export function TextField({ className, ...rest }: TextFieldProps) {
  return <input data-slot="input" className={cn('text-field', className)} {...rest} />;
}
