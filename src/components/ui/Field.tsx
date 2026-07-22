import type { ReactNode } from 'react';
import { Eyebrow } from './Eyebrow';

interface FieldProps {
  label: string;
  children: ReactNode;
  className?: string;
}

/**
 * An eyebrow label above a block of content — "Problem", "Stack", "Tools",
 * "Key methods", "Results" and friends all share this shape.
 */
export function Field({ label, children, className }: FieldProps) {
  return (
    <div className={className}>
      <Eyebrow className="mb-3 block">{label}</Eyebrow>
      {children}
    </div>
  );
}

interface TagFieldProps {
  label: string;
  items: readonly string[];
  className?: string;
}

/** A Field whose content is a wrapped row of tags. */
export function TagField({ label, items, className }: TagFieldProps) {
  return (
    <Field label={label} className={className}>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <span
            key={item}
            className="border-line text-dim inline-flex border px-[11px] py-[7px] font-mono text-[11.5px]"
          >
            {item}
          </span>
        ))}
      </div>
    </Field>
  );
}
