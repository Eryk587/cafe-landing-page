import { ImageResponse } from 'next/og'

export const alt = 'Café — Każda filiżanka opowiada historię.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#0f0805',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Georgia, serif',
        position: 'relative',
      }}
    >
      {/* Subtle accent line top */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1,
          height: 80,
          background: 'rgba(200,149,108,.4)',
        }}
      />

      {/* Tag */}
      <div
        style={{
          color: '#c8956c',
          fontSize: 13,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          marginBottom: 32,
          display: 'flex',
        }}
      >
        Specialty Coffee · Kraków
      </div>

      {/* Main headline */}
      <div
        style={{
          color: '#f2e9df',
          fontSize: 96,
          fontWeight: 300,
          lineHeight: 0.95,
          marginBottom: 12,
          display: 'flex',
        }}
      >
        Café
      </div>

      {/* Divider */}
      <div
        style={{
          width: 48,
          height: 1,
          background: 'rgba(200,149,108,.45)',
          margin: '28px 0',
          display: 'flex',
        }}
      />

      {/* Subtitle */}
      <div
        style={{
          color: '#9e9089',
          fontSize: 24,
          fontWeight: 300,
          lineHeight: 1.4,
          maxWidth: 560,
          textAlign: 'center',
          display: 'flex',
        }}
      >
        Każda filiżanka opowiada historię.
      </div>

      {/* Address footer */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          color: 'rgba(200,149,108,.6)',
          fontSize: 12,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          display: 'flex',
        }}
      >
        ul. Floriańska 23 · Stare Miasto · Kraków
      </div>

      {/* Accent line bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 1,
          height: 40,
          background: 'rgba(200,149,108,.4)',
          display: 'flex',
        }}
      />
    </div>,
    { ...size },
  )
}
