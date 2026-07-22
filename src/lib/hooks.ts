'use client';

import { useSyncExternalStore } from 'react';
import { DEFAULT_THEME, type Theme } from './theme';

const noopSubscribe = () => () => {};

/**
 * True only after hydration. Lets a component render server-safe placeholder
 * markup and swap in client-only content without a hydration mismatch.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/**
 * Tracks `prefers-reduced-motion`, staying live if the visitor changes the
 * setting mid-session. Reported as `false` on the server, where motion is moot.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia('(prefers-reduced-motion: reduce)');
      query.addEventListener('change', onChange);
      return () => query.removeEventListener('change', onChange);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
}

/**
 * Reads the active theme straight off <html data-theme>, which the pre-paint
 * script sets before React ever runs.
 *
 * The DOM attribute is the single source of truth — `applyTheme` mutates it and
 * the MutationObserver here pushes the change back into React, so the toggle
 * and the rendered palette can never disagree.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(
    (onChange) => {
      const observer = new MutationObserver(onChange);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
      return () => observer.disconnect();
    },
    () => (document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark'),
    () => DEFAULT_THEME,
  );
}
