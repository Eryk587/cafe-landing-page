'use client'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

const reviews = [
  {
    stars: '★★★★★',
    quote: '„Najlepsza kawa w Krakowie, bez żadnych wątpliwości. Espresso — złożone, gęste, idealne. Wracam tu co tydzień."',
    name: 'Marta K.', role: 'Freelancerka', initials: 'MK',
  },
  {
    stars: '★★★★★',
    quote: '„Klimat, który zapamiętujesz. Siedziałem tu 4 godziny i czas minął jak chwila. Croissant — absolutnie niebywały."',
    name: 'Paweł W.', role: 'Fotograf', initials: 'PW',
  },
  {
    stars: '★★★★★',
    quote: '„Obsługa na najwyższym poziomie. Barista wyjaśnił każdy szczegół. Flat white — absolutna perfekcja w filiżance."',
    name: 'Anna Z.', role: 'Architektka', initials: 'AZ',
  },
]

export default function Reviews() {
  return (
    <section className="px-5 md:px-12 py-24 max-w-screen-xl mx-auto">
      <div className="hr-line mb-0" />

      <motion.div
        className="text-center mb-16 mt-16"
        initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease }} viewport={{ once: true, margin: '-40px' }}
      >
        <p className="tag mb-3">Opinie</p>
        <h2 className="font-serif font-light" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>
          Co mówią <em className="text-caramel">goście</em>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {reviews.map((r, i) => (
          <motion.div
            key={i}
            className="p-9 transition-all duration-300"
            style={{ border: '1px solid rgba(200,149,108,.12)' }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(200,149,108,.38)'
              e.currentTarget.style.transform = 'translateY(-5px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(200,149,108,.12)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
            initial={{ opacity: 0, y: 44 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: i * 0.1 }}
            viewport={{ once: true, margin: '-40px' }}
          >
            <p className="text-caramel mb-6" style={{ fontSize: '.9rem', letterSpacing: '.1em' }}>{r.stars}</p>
            <p className="font-serif font-light italic text-cream leading-[1.7] mb-7" style={{ fontSize: '1.2rem' }}>
              {r.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-sans"
                style={{ background: 'rgba(200,149,108,.15)', fontSize: '.6rem', color: '#c8956c' }}>
                {r.initials}
              </div>
              <div>
                <p className="font-sans text-cream" style={{ fontSize: '.85rem' }}>{r.name}</p>
                <p className="tag" style={{ fontSize: '.55rem', marginTop: '.1rem' }}>{r.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
