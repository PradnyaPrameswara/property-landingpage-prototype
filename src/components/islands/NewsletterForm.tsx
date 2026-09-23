import { useState } from 'react';
import type { FormEvent } from 'react';
import { Button } from '../ui/button';
import { TextField } from '../ui/input';
import { Arrow } from '../ui/card';

type Status = 'idle' | 'done' | 'error';

/** Newsletter form. Static success, no backend. State and submit handler only. */
export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');

  function onSubmit(event: FormEvent<HTMLFormElement>) {
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
        <TextField
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
        <Button variant="cta" type="submit" aria-label="Subscribe">
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
