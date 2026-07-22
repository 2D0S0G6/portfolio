import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Static at build time (nothing here touches request-time APIs), so this costs
 * nothing at runtime. Colours mirror the dark palette in globals.css.
 */
export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0d0d0d',
        color: '#ece9e3',
        padding: '72px 80px',
      }}
    >
      <div style={{ display: 'flex', fontSize: 24, letterSpacing: '0.3em', color: '#a4a19a' }}>
        {site.wordmark}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{ fontSize: 82, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>
          {site.name}
        </div>
        <div style={{ display: 'flex', height: 2, width: 220, background: '#ece9e3' }} />
        <div style={{ fontSize: 30, color: '#a4a19a', maxWidth: 900, lineHeight: 1.4 }}>{site.role}</div>
      </div>
    </div>,
    size,
  );
}
