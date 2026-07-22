'use client';

import { useState, type FormEvent } from 'react';
import { buildMailto } from '@/lib/email';
import { Arrow } from '@/components/ui/Arrow';
import { Eyebrow } from '@/components/ui/Eyebrow';

const fieldClass =
  'bg-panel border-line text-text border px-[13px] py-3 text-[15px] outline-none focus-visible:border-text';

/**
 * Opens the visitor's mail client with a pre-filled message.
 *
 * There is no backend by design — the address is assembled client-side and the
 * submission is handed to the OS, so no message data touches a server.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();

    window.location.href = buildMailto(name, email, message);
    setSent(true);
  }

  if (sent) {
    return (
      <div>
        <Eyebrow as="h2">Send a message</Eyebrow>
        <div className="border-line bg-panel mt-5 border p-7" role="status">
          <p className="font-display text-2xl font-bold tracking-[-0.01em]">
            Thanks — your mail client should be open.
          </p>
          <p className="text-dim mt-3 text-[14.5px] leading-[1.6]">
            If nothing happened, reach me directly at the address on the left. I read everything.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Eyebrow as="h2">Send a message</Eyebrow>
      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-4">
        <label className="flex flex-col gap-2">
          <Eyebrow className="tracking-[0.16em]">Name</Eyebrow>
          <input name="name" required autoComplete="name" className={fieldClass} />
        </label>

        <label className="flex flex-col gap-2">
          <Eyebrow className="tracking-[0.16em]">Email</Eyebrow>
          <input name="email" type="email" required autoComplete="email" className={fieldClass} />
        </label>

        <label className="flex flex-col gap-2">
          <Eyebrow className="tracking-[0.16em]">Message</Eyebrow>
          <textarea name="message" rows={5} required className={`${fieldClass} resize-y font-sans`} />
        </label>

        <button
          type="submit"
          className="bg-text border-text text-btn-ink hover:text-text inline-flex cursor-pointer items-center gap-2.5 self-start border px-5 py-[13px] font-mono text-xs tracking-[0.14em] uppercase transition-[background,color] duration-350 hover:bg-transparent"
        >
          Send
          <Arrow className="text-sm" />
        </button>
      </form>
    </div>
  );
}
