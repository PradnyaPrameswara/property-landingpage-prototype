import type { InputHTMLAttributes } from 'react';

type TextFieldProps = InputHTMLAttributes<HTMLInputElement>;

export function TextField({ className = '', ...rest }: TextFieldProps) {
  const cls = `text-field${className ? ` ${className}` : ''}`;
  return <input className={cls} {...rest} />;
}
