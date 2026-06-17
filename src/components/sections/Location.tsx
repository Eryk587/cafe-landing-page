'use client'
import { motion } from 'framer-motion'
import { useReservation } from '@/context/ReservationContext'

const ease = [0.16, 1, 0.3, 1] as const

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease, delay },
  viewport: { once: true, margin: '-40px' },
})

export default function Location() {
  const { open } = useReservation()
  return (
    <section id="location" className="px-5 md:px-12 py-32 max-w-screen-xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">

        {/* Map */}
        <motion.div
          {...reveal()}
          className="overflow-hidden"
          style={{ aspectRatio: '1', border: '1px solid rgba(200,149,108,.08)' }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2561.4914986707576!2d19.936657!3d50.062615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47165b4f4a65d97f%3A0x5d0c4b0e4b0e4b0e!2sFlorianity%2023%2C%2031-021%20Krak%C3%B3w!5e0!3m2!1spl!2spl!4v1718000000000!5m2!1spl!2spl"
            width="100%" height="100%"
            style={{ border: 0, display: 'block', filter: 'grayscale(100%) invert(1) contrast(0.85) brightness(0.55) sepia(0.25)' }}
            allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        {/* Info */}
        <div>
          <motion.p {...reveal()} className="tag mb-5">Znajdź nas</motion.p>
          <motion.h2
            {...reveal(0.1)}
            className="font-serif font-light leading-[1.1] mb-12"
            style={{ fontSize: 'clamp(2.4rem,4.5vw,3.8rem)' }}
          >
            Zapraszamy<br /><em className="text-caramel">codziennie.</em>
          </motion.h2>

          <motion.div {...reveal(0.2)} className="flex flex-col gap-7">
            <div>
              <p className="tag mb-2">Adres</p>
              <p className="font-serif font-light text-cream" style={{ fontSize: '1.5rem' }}>ul. Floriańska 23</p>
              <p className="font-sans font-light text-mist" style={{ fontSize: '.9rem' }}>31-021 Kraków</p>
            </div>

            <div className="hr-line" />

            <div>
              <p className="tag mb-3">Godziny otwarcia</p>
              <div className="flex flex-col gap-2 font-sans font-light" style={{ fontSize: '.9rem' }}>
                <div className="flex justify-between text-cream">
                  <span>Poniedziałek – Piątek</span>
                  <span className="text-caramel">7:00 – 21:00</span>
                </div>
                <div className="flex justify-between text-cream">
                  <span>Sobota – Niedziela</span>
                  <span className="text-caramel">8:00 – 22:00</span>
                </div>
              </div>
            </div>

            <div className="hr-line" />

            <div>
              <p className="tag mb-2">Kontakt</p>
              <p className="font-sans font-light text-cream" style={{ fontSize: '.9rem' }}>hello@cafe.pl</p>
              <p className="font-sans font-light text-cream" style={{ fontSize: '.9rem' }}>+48 12 345 67 89</p>
            </div>
          </motion.div>

          <motion.div {...reveal(0.3)} className="flex gap-4 flex-wrap mt-10">
            <a href="https://maps.google.com/?q=Floriańska+23+Kraków" target="_blank" rel="noopener" className="btn-p">
              Wyznacz trasę
            </a>
            <button onClick={open} className="btn-s">Zarezerwuj stolik</button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
