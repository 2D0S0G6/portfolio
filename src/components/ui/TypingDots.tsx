import { cn } from '@/lib/utils';

/** Three pulsing dots used as the assistant's loading state. */
export function TypingDots({ className }: { className?: string }) {
  return (
    <span className={cn('flex gap-[5px]', className)} role="status" aria-label="Thinking">
      <span className="bg-dim h-1.5 w-1.5 animate-[dotPulse_1.2s_ease-in-out_infinite] rounded-full" />
      <span className="bg-dim h-1.5 w-1.5 animate-[dotPulse_1.2s_ease-in-out_0.2s_infinite] rounded-full" />
      <span className="bg-dim h-1.5 w-1.5 animate-[dotPulse_1.2s_ease-in-out_0.4s_infinite] rounded-full" />
    </span>
  );
}
