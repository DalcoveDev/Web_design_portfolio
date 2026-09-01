import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Dalcove — Web Designer & Frontend Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0e0e0e 0%, #141210 50%, #1c1a18 100%)',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Accent line */}
        <div
          style={{
            width: '80px',
            height: '4px',
            background: '#c45d3e',
            borderRadius: '2px',
            marginBottom: '40px',
          }}
        />

        {/* Name */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 700,
            color: '#f0ebe3',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            marginBottom: '16px',
          }}
        >
          Dalcove
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: 400,
            color: '#c45d3e',
            fontStyle: 'italic',
            marginBottom: '32px',
          }}
        >
          Web Designer & Frontend Developer
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: '22px',
            color: '#b8b0a4',
            maxWidth: '700px',
            lineHeight: 1.5,
          }}
        >
          Crafting modern, user-centered websites that merge visual beauty with functional precision.
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            right: '80px',
            fontSize: '18px',
            color: '#b8b0a4',
            opacity: 0.6,
          }}
        >
          dalcove.dev
        </div>
      </div>
    ),
    { ...size }
  );
}
