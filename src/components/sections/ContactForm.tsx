'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { buildMailto } from '@/lib/email';
import { Arrow } from '@/components/ui/Arrow';
import { Eyebrow } from '@/components/ui/Eyebrow';

// 16px at mobile widths keeps iOS Safari from zooming the viewport on focus.
// `outline-none` is deliberately absent so the base :focus-visible ring applies —
// the border change alone was a weaker indicator than the rest of the site uses.
const fieldClass =
  'bg-panel border-line text-text border px-[13px] py-3 text-[16px] sm:text-[15px] focus-visible:border-text';

/**
 * Opens the visitor's mail client with a pre-filled message.
 *
 * There is no backend by design — the address is assembled client-side and the
 * submission is handed to the OS, so no message data touches a server.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  // Move focus to the confirmation; the form (and the focused submit button)
  // unmounts, which would otherwise drop focus to <body>.
  useEffect(() => {
    if (sent) statusRef.current?.focus();
  }, [sent]);

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

  return (
    <div>
      <Eyebrow as="h2">Send a message</Eyebrow>

      {/*
        The live region is mounted from first render. A role="status" element
        inserted at the same moment as its content is not reliably announced —
        the region has to already exist in the accessibility tree for the
        change to register.
      */}
      <div role="status" aria-live="polite">
        {sent && (
          <div ref={statusRef} tabIndex={-1} className="border-line bg-panel mt-5 border p-7 outline-none">
            <p className="font-display text-2xl font-bold tracking-[-0.01em]">
              Thanks — your mail client should be open.
            </p>
            <p className="text-dim mt-3 text-[14.5px] leading-[1.6]">
              If nothing happened, reach me directly at the address on the left. I read everything.
            </p>
          </div>
        )}
      </div>

      {!sent && (
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
            className="bg-text border-text text-btn-ink hover:text-text inline-flex cursor-pointer items-center gap-2.5 self-start border px-5 py-[14px] font-mono text-xs tracking-[0.14em] uppercase transition-[background,color] duration-350 hover:bg-transparent"
          >
            Send
            <Arrow className="text-sm" />
          </button>
        </form>
      )}
    </div>
  );
}
