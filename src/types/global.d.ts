export {};

declare global {
  interface Window {
    /** Safari's prefixed AudioContext, used as a fallback by <SoundToggle>. */
    webkitAudioContext?: typeof AudioContext;
  }
}
