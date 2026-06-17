'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '7%'])

  return (
    <section ref={ref} id="hero" className="relative h-screen overflow-hidden">
      {/* Video bg with parallax */}
      <motion.div style={{ y }} className="absolute inset-0 scale-[1.15] will-change-transform">
        <video
          autoPlay loop muted playsInline
          preload="none"
          className="w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_3ExDMAbMgv1zj4nHDN284Sb3ram/hf_20260615_190750_0bdfaa76-4356-49d3-8b4f-18bc5b5a6200.mp4"
            type="video/mp4"
          />
        </video>
      </motion.div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(170deg, rgba(15,8,5,.25) 0%, rgba(15,8,5,.55) 55%, rgba(15,8,5,.92) 100%)' }}
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 md:pb-20 px-5 md:px-12 max-w-screen-xl mx-auto">
        <motion.p
          className="tag mb-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease, delay: 0.3 }}
        >
          Specialty Coffee · Kraków
        </motion.p>

        {/* Headline — each line reveals from behind a clip mask */}
        <h1
          className="font-serif font-light leading-[.95] text-cream mb-5"
          style={{ fontSize: 'clamp(2.6rem, 8vw, 7.5rem)' }}
        >
          <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.15, ease, delay: 0.52 }}
            >
              Każda filiżanka
            </motion.div>
          </div>
          <div style={{ overflow: 'hidden', paddingBottom: '0.06em' }}>
            <motion.div
              initial={{ y: '105%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 1.15, ease, delay: 0.7 }}
            >
              <em className="text-caramel italic">opowiada historię.</em>
            </motion.div>
          </div>
        </h1>

        <motion.p
          className="font-sans font-light text-mist leading-[1.7] mb-11"
          style={{ fontSize: '1.05rem', maxWidth: '38ch' }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 1.05 }}
        >
          Świeżo palona kawa, rzemieślnicze wypieki<br />i atmosfera, do której chce się wracać.
        </motion.p>

        <motion.div
          className="flex gap-4 flex-wrap"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease, delay: 1.3 }}
        >
          <a href="#menu" className="btn-p">Zobacz menu</a>
          <a href="#location" className="btn-s">Sprawdź lokalizację</a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute right-12 bottom-20 flex-col items-center gap-3 hidden md:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.9 }}
      >
        <span className="tag text-[.55rem]" style={{ writingMode: 'vertical-rl' }}>Przewiń</span>
        <div
          className="w-px h-14 bg-gradient-to-b from-caramel to-transparent"
          style={{ animation: 'scrollPulse 2s ease-in-out infinite' }}
        />
      </motion.div>
    </section>
  )
}
