'use client'
import Link from 'next/link'

const navLinks = [
  { href: '#menu',     label: 'Menu' },
  { href: '#story',    label: 'O nas' },
  { href: '#gallery',  label: 'Galeria' },
  { href: '#location', label: 'Kontakt' },
]

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid rgba(200,149,108,.1)', padding: '3.5rem 3rem' }}>
      <div className="max-w-screen-xl mx-auto">

        <div className="flex items-center justify-between flex-wrap gap-8 mb-8">
          <div>
            <Link href="/" className="font-serif text-cream no-underline" style={{ fontSize: '1.6rem', letterSpacing: '.04em' }}>
              Café<span className="text-caramel">.</span>
            </Link>
            <p className="font-sans font-light text-mist mt-1" style={{ fontSize: '.8rem' }}>Specialty Coffee · Kraków</p>
          </div>

          <div className="flex gap-8 flex-wrap">
            {navLinks.map(l => (
              <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
            ))}
          </div>

          <div className="flex gap-6">
            <a href="#" className="nav-link">Instagram</a>
            <a href="#" className="nav-link">Facebook</a>
          </div>
        </div>

        <div className="hr-line" />

        <div className="flex justify-between items-center flex-wrap gap-4 mt-6">
          <p className="font-sans" style={{ fontSize: '.7rem', color: 'rgba(158,144,137,.35)' }}>
            © 2025 Café. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex items-center gap-8">
            <Link
              href="/polityka-prywatnosci"
              className="nav-link"
              style={{ fontSize: '.6rem', opacity: .4, transition: 'opacity .25s' }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '.75')}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => (e.currentTarget.style.opacity = '.4')}
            >
              Polityka prywatności
            </Link>
            <p className="font-sans" style={{ fontSize: '.7rem', color: 'rgba(158,144,137,.35)' }}>
              Stworzone z pasją do kawy.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
