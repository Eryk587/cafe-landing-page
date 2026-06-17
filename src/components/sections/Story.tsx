'use client'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease, delay },
  viewport: { once: true, margin: '-40px' },
})

export default function Story() {
  return (
    <section id="story" className="px-5 md:px-12 py-24 max-w-screen-xl mx-auto">
      <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">

        {/* Image col */}
        <motion.div {...reveal()} className="relative">
          <div className="overflow-hidden" style={{ aspectRatio: '4/5' }}>
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800&q=80"
              alt="Barista"
              className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] hover:scale-[1.04]"
            />
          </div>
          {/* Badge */}
          <motion.div
            {...reveal(0.3)}
            className="absolute -bottom-6 -right-6 hidden md:block"
            style={{ background: '#c8956c', color: '#0f0805', padding: '1.5rem 1.75rem' }}
          >
            <p className="font-serif font-light leading-none" style={{ fontSize: '3rem' }}>12</p>
            <p className="tag" style={{ color: '#0f0805', marginTop: '.25rem' }}>lat pasji</p>
          </motion.div>
        </motion.div>

        {/* Text col */}
        <div>
          <motion.p {...reveal()} className="tag mb-5">Nasza historia</motion.p>

          <motion.h2
            {...reveal(0.1)}
            className="font-serif font-light leading-[1.1] mb-8"
            style={{ fontSize: 'clamp(2.4rem,4.5vw,3.8rem)' }}
          >
            Zaczęło się od<br />
            <em className="text-caramel">jednej filiżanki.</em>
          </motion.h2>

          <motion.div {...reveal(0.2)} className="flex flex-col gap-4 font-sans font-light text-mist leading-[1.8]" style={{ fontSize: '.95rem' }}>
            <p>Wszystko zaczęło się od fascynacji — nie tylko smakiem, ale całym rytuałem parzenia. Od ziarna, przez palarnię, po każdy gest baristy.</p>
            <p>Wybieramy tylko ziarna specialty od małych, pasjonackich palarni w Europie. Każda partia selekcjonowana ręcznie. Zero kompromisów.</p>
            <p>Chcieliśmy miejsca, do którego się wraca — nie z przyzwyczajenia, ale z wyboru.</p>
          </motion.div>

          <motion.div {...reveal(0.3)} className="mt-10">
            <div className="hr-line mb-8" />
            <div className="flex gap-12">
              <div>
                <p className="font-serif font-light text-caramel" style={{ fontSize: '2.8rem' }}>47+</p>
                <p className="tag mt-1">rodzajów kaw rocznie</p>
              </div>
              <div>
                <p className="font-serif font-light text-caramel" style={{ fontSize: '2.8rem' }}>∞</p>
                <p className="tag mt-1">powodów, by wrócić</p>
              </div>
            </div>
          </motion.div>

          <motion.div {...reveal(0.4)} className="mt-10">
            <a href="#" className="btn-s">Poznaj naszą filozofię →</a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
