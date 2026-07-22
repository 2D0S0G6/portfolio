'use client';

import { applyTheme } from '@/lib/theme';
import { useTheme } from '@/lib/hooks';
import { IconButton } from './IconButton';

/** Flips between the dark and light palettes and remembers the choice. */
export function ThemeToggle() {
  const theme = useTheme();

  return (
    <IconButton
      onClick={() => applyTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      title="Toggle theme"
    >
      <span
        aria-hidden="true"
        className="border-text h-[13px] w-[13px] rounded-full border-[1.5px] bg-[linear-gradient(90deg,var(--text)_50%,transparent_50%)]"
      />
    </IconButton>
  );
}
