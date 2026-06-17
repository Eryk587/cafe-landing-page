'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '#menu',     label: 'Menu' },
  { href: '#story',    label: 'O nas' },
  { href: '#gallery',  label: 'Galeria' },
  { href: '#location', label: 'Lokalizacja' },
]

export default function Nav() {
  const [stuck, setStuck] = useState(false)
  const [open,  setOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 md:px-12 py-6 transition-all duration-400"
        style={stuck ? { background: 'rgba(15,8,5,.88)', backdropFilter: 'blur(14px)' } : {}}
      >
        <Link href="/" className="font-serif text-[1.6rem] text-cream no-underline tracking-[.04em]">
          Café<span className="text-caramel">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-10 items-center">
          {links.map(l => (
            <a key={l.href} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </div>

        <a href="#menu" className="btn-p hidden md:inline-block" style={{ padding: '.7rem 1.6rem' }}>
          Zobacz menu
        </a>

        {/* Hamburger */}
        <button
          onClick={() => setOpen(v => !v)}
          aria-label="Otwórz menu"
          className="flex md:hidden flex-col justify-center gap-[5px] bg-transparent border-0 p-2 z-[201] relative"
          style={{ cursor: 'pointer' }}
        >
          <span className="block w-[22px] h-[1.5px] bg-cream origin-center transition-all duration-350"
            style={{ transform: open ? 'translateY(6.5px) rotate(45deg)' : undefined }} />
          <span className="block w-[22px] h-[1.5px] bg-cream transition-all duration-350"
            style={{ opacity: open ? 0 : 1 }} />
          <span className="block w-[22px] h-[1.5px] bg-cream origin-center transition-all duration-350"
            style={{ transform: open ? 'translateY(-6.5px) rotate(-45deg)' : undefined }} />
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] flex flex-col items-center justify-center gap-10"
            style={{ background: '#0f0805' }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="font-serif font-light no-underline transition-colors duration-250"
                style={{ fontSize: '2.8rem', color: 'rgba(242,233,223,.65)', letterSpacing: '.02em' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#c8956c')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,233,223,.65)')}
                onClick={close}
              >
                {l.label}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.32 }} className="mt-4">
              <a href="#location" className="btn-p" onClick={close}>Zarezerwuj stolik</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
