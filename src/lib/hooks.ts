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

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Subscribe/snapshot pairs live at module scope so their identity is stable.
 * An inline arrow would be a new function on every render, and
 * `useSyncExternalStore` tears down and re-establishes the subscription
 * whenever `subscribe` changes identity.
 */
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const getReducedMotion = () => window.matchMedia(REDUCED_MOTION_QUERY).matches;
const getReducedMotionServer = () => false;

/**
 * Tracks `prefers-reduced-motion`, staying live if the visitor changes the
 * setting mid-session. Reported as `false` on the server, where motion is moot.
 */
export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribeReducedMotion, getReducedMotion, getReducedMotionServer);
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}

const getTheme = (): Theme =>
  document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
const getThemeServer = (): Theme => DEFAULT_THEME;

/**
 * Reads the active theme straight off <html data-theme>, which the pre-paint
 * script sets before React ever runs.
 *
 * The DOM attribute is the single source of truth — `applyTheme` mutates it and
 * the MutationObserver here pushes the change back into React, so the toggle
 * and the rendered palette can never disagree.
 */
export function useTheme(): Theme {
  return useSyncExternalStore(subscribeTheme, getTheme, getThemeServer);
}
