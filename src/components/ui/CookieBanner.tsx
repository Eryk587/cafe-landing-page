'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

const STORAGE_KEY = 'cafe_cookie_consent'

export default function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true)
  }, [])

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'all')
    setVisible(false)
  }

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'necessary')
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '110%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 500,
            background: 'rgba(15,8,5,.97)',
            borderTop: '1px solid rgba(200,149,108,.15)',
            backdropFilter: 'blur(12px)',
            padding: '1.25rem 1.5rem',
          }}
        >
          <div style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}>
            {/* Text */}
            <p style={{
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              fontSize: '.78rem',
              fontWeight: 300,
              color: 'rgba(158,144,137,.85)',
              lineHeight: 1.65,
              maxWidth: '60ch',
              margin: 0,
            }}>
              Używamy plików cookies, aby zapewnić najlepsze doświadczenie na naszej stronie.{' '}
              <Link
                href="/polityka-prywatnosci"
                style={{ color: '#c8956c', textDecoration: 'none', borderBottom: '1px solid rgba(200,149,108,.35)' }}
              >
                Polityka prywatności
              </Link>
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '.75rem', flexShrink: 0, flexWrap: 'wrap' }}>
              <button
                onClick={reject}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(242,233,223,.15)',
                  color: 'rgba(242,233,223,.55)',
                  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                  fontSize: '.6rem',
                  fontWeight: 400,
                  letterSpacing: '.22em',
                  textTransform: 'uppercase',
                  padding: '.7rem 1.4rem',
                  cursor: 'pointer',
                  transition: 'border-color .2s, color .2s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(242,233,223,.35)'
                  e.currentTarget.style.color = 'rgba(242,233,223,.8)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(242,233,223,.15)'
                  e.currentTarget.style.color = 'rgba(242,233,223,.55)'
                }}
              >
                Tylko niezbędne
              </button>
              <button
                onClick={accept}
                style={{
                  background: '#c8956c',
                  border: '1px solid #c8956c',
                  color: '#0f0805',
                  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                  fontSize: '.6rem',
                  fontWeight: 500,
                  letterSpacing: '.22em',
                  textTransform: 'uppercase',
                  padding: '.7rem 1.4rem',
                  cursor: 'pointer',
                  transition: 'background .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#d4a47a' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#c8956c' }}
              >
                Akceptuję
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
