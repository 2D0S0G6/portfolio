import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * `script-src` keeps 'unsafe-inline' because the pre-paint theme script in
 * layout.tsx is injected inline — dropping it without moving to a nonce would
 * break theme restoration and reintroduce the flash of the wrong palette.
 */
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  // Pinned because an unrelated lockfile in the parent directory would
  // otherwise be inferred as the workspace root.
  turbopack: {
    root: path.join(__dirname),
  },
  poweredByHeader: false,
  async redirects() {
    return [
      // The post is renamed each time a finding validates, so every retired
      // slug points at the current one — they are indexed and linked to.
      {
        source: '/blog/five-guardrail-jailbreaks',
        destination: '/blog/eight-guardrail-jailbreaks',
        permanent: true,
      },
      {
        source: '/blog/six-guardrail-jailbreaks',
        destination: '/blog/eight-guardrail-jailbreaks',
        permanent: true,
      },
      {
        source: '/blog/seven-guardrail-jailbreaks',
        destination: '/blog/eight-guardrail-jailbreaks',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'DENY' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ];
  },
};

export default nextConfig;
