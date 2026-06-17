'use client'
import { motion } from 'framer-motion'

const ease = [0.16, 1, 0.3, 1] as const

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 44 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.85, ease, delay },
  viewport: { once: true, margin: '-40px' },
})

const items = [
  {
    tag: 'Espresso', name: 'Single Origin', desc: 'Intensywny, z nutą ciemnej czekolady',
    price: '9 zł', img: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&q=80',
    tall: false,
  },
  {
    tag: 'Cappuccino', name: 'Tradycyjne', desc: 'Kremowa pianka, perfekcyjny balans',
    price: '13 zł', img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&q=80',
    tall: true,
  },
  {
    tag: 'Flat White', name: 'Australijski styl', desc: 'Podwójny ristretto, aksamitne mleko',
    price: '15 zł', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80',
    tall: false,
  },
  {
    tag: 'Pieczywo', name: 'Croissant maślany', desc: 'Pieczony rano, 72h fermentacja',
    price: '11 zł', img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&q=80',
    tall: false,
  },
  {
    tag: 'Deser', name: 'Cheesecake', desc: 'Domowy, bez pieczenia, wanilia Bourbon',
    price: '16 zł', img: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&q=80',
    tall: false,
  },
]

export default function Menu() {
  return (
    <section id="menu" className="px-5 md:px-12 py-32 max-w-screen-xl mx-auto">
      {/* Header */}
      <motion.div {...reveal()} className="flex items-end justify-between mb-20 flex-wrap gap-4">
        <div>
          <p className="tag mb-3">Wybrane pozycje</p>
          <h2 className="font-serif font-light leading-[1.05]" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>
            Nasze <em className="text-caramel">bestsellery</em>
          </h2>
        </div>
        <a href="#" className="btn-s">Pełne menu →</a>
      </motion.div>

      {/* Grid */}
      <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {items.map((item, i) => (
          <motion.div
            key={i}
            {...reveal(i * 0.08)}
            className="relative overflow-hidden group"
            style={{
              aspectRatio: item.tall ? 'auto' : '3/4',
              gridRow: item.tall ? 'span 2' : undefined,
            }}
          >
            {/* Image */}
            <div className="absolute inset-0 overflow-hidden" style={{ height: item.tall ? '100%' : undefined }}>
              <img
                src={item.img}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.07]"
              />
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(15,8,5,.92) 35%, transparent 75%)' }} />

            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 z-10 p-6">
              <p className="tag mb-1">{item.tag}</p>
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-serif font-light text-cream" style={{ fontSize: '1.45rem' }}>{item.name}</p>
                  <p className="font-sans font-light text-mist mt-1" style={{ fontSize: '.8rem' }}>{item.desc}</p>
                </div>
                <span className="font-serif text-caramel ml-4" style={{ fontSize: '1.3rem' }}>{item.price}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div {...reveal(0.1)} className="text-center mt-20">
        <a href="#location" className="btn-p">Zarezerwuj stolik</a>
      </motion.div>
    </section>
  )
}
