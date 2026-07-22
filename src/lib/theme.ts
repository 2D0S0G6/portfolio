export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'pf-theme';
export const DEFAULT_THEME: Theme = 'dark';

/**
 * Runs before first paint to apply the stored theme, preventing a flash of the
 * default dark palette for visitors who chose light. Kept as a string so it can
 * be inlined in <head>; it must stay dependency-free and synchronous.
 */
export const themeInitScript = `
(function(){
  try {
    var t = localStorage.getItem('${THEME_STORAGE_KEY}');
    document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark');
  } catch (e) {
    document.documentElement.setAttribute('data-theme', '${DEFAULT_THEME}');
  }
})();
`.trim();

export function readTheme(): Theme {
  if (typeof document === 'undefined') return DEFAULT_THEME;
  return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
}

export function applyTheme(theme: Theme): void {
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Private mode or storage disabled — the theme still applies for this page.
  }
}
