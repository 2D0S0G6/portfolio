/**
 * Animated film-grain layer over the whole viewport.
 *
 * The noise is an inline SVG turbulence filter encoded as a data URI, so it
 * costs no network request. Opacity follows --grain-op, which differs between
 * the dark and light themes.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="animate-grain pointer-events-none fixed -inset-10 z-[55] bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%27180%27%20height=%27180%27%3E%3Cfilter%20id=%27n%27%3E%3CfeTurbulence%20type=%27fractalNoise%27%20baseFrequency=%270.9%27%20numOctaves=%272%27%20stitchTiles=%27stitch%27/%3E%3CfeColorMatrix%20type=%27saturate%27%20values=%270%27/%3E%3C/filter%3E%3Crect%20width=%27100%25%27%20height=%27100%25%27%20filter=%27url(%23n)%27/%3E%3C/svg%3E')] bg-[length:180px_180px] opacity-[var(--grain-op)] mix-blend-overlay"
    />
  );
}
