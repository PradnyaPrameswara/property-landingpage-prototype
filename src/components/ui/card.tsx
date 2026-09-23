import type { AnchorHTMLAttributes, ReactNode } from 'react';

type CardLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export function CardLink({ className = '', children, ...rest }: CardLinkProps) {
  const cls = `card-link${className ? ` ${className}` : ''}`;
  return (
    <a className={cls} {...rest}>
      {children}
    </a>
  );
}

export function Arrow({ label = 'Open' }: { label?: string }) {
  return (
    <span className="arrow" aria-label={label} role="img">
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path
          d="M1.5 11L6.5 6L1.5 1"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
