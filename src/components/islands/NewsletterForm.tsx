import { useState } from 'react';
import type { SyntheticEvent } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
function Arrow({ label }: { label: string }) {
  return <span className="arrow" aria-label={label} role="img"><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M1.5 11L6.5 6L1.5 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></span>;
}

type Status = 'idle' | 'done' | 'error';

/** Newsletter form. Static success, no backend. State and submit handler only. */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  function onSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setStatus(valid ? 'done' : 'error');
  }

  if (status === 'done') {
    return (
      <div className="success-message" role="status">
        <div>Thank you! Your submission has been received!</div>
      </div>
    );
  }

  return (
    <div className="form-block">
      <form className="form" id="email-form" name="email-form" onSubmit={onSubmit} noValidate>
        <Input className="text-field"
          id="Email-3"
          name="Email"
          type="email"
          placeholder="Email"
          required
          maxLength={256}
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-label="Email"
        />
        <Button variant="proformaCta" size="proforma" type="submit" aria-label="Subscribe">
          <Arrow label="Subscribe" />
        </Button>
      </form>
      {status === 'error' && (
        <div className="error-message" role="alert">
          <div>Oops! Something went wrong while submitting the form.</div>
        </div>
      )}
    </div>
  );
}
