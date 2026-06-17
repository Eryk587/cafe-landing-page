'use client'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

const tags = ['Praca zdalna', 'Spotkania', 'Czas dla siebie', 'Relaks', 'Inspiracja']

export default function Experience() {
  return (
    <section className="relative py-36 px-5 md:px-12 text-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1920&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(15,8,5,.78)' }} />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        <motion.p
          className="tag mb-6"
          initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }} viewport={{ once: true, margin: '-40px' }}
        >
          Doświadczenie
        </motion.p>

        <motion.h2
          className="font-serif font-light leading-[.95] mb-6"
          style={{ fontSize: 'clamp(3rem,8vw,6.5rem)' }}
          initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.1 }} viewport={{ once: true, margin: '-40px' }}
        >
          Więcej niż<br /><em className="text-caramel">kawa.</em>
        </motion.h2>

        <motion.p
          className="font-sans font-light text-mist leading-[1.75] mx-auto mb-12"
          style={{ fontSize: '1.1rem', maxWidth: '44ch' }}
          initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.2 }} viewport={{ once: true, margin: '-40px' }}
        >
          Miejsce, gdzie koncentracja przychodzi sama. Spotkanie, które trwa dłużej niż planowałeś. Chwila, która zostaje w pamięci.
        </motion.p>

        <motion.div
          className="flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease, delay: 0.3 }} viewport={{ once: true, margin: '-40px' }}
        >
          {tags.map(t => (
            <span
              key={t}
              className="font-sans"
              style={{
                border: '1px solid rgba(200,149,108,.3)',
                color: 'rgba(200,149,108,.75)',
                padding: '.6rem 1.4rem',
                fontSize: '.62rem',
                letterSpacing: '.28em',
                textTransform: 'uppercase',
              }}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
