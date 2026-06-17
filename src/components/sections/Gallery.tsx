'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'

const ease = [0.16, 1, 0.3, 1] as const

const photos = [
  { src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80', alt: 'Wnętrze kawiarni', tall: false },
  { src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=600&q=80', alt: 'Kawa', tall: true },
  { src: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=600&q=80', alt: 'Latte art', tall: false },
  { src: 'https://images.unsplash.com/photo-1493770348161-369560ae357d?w=600&q=80', alt: 'Okno kawiarni', tall: false },
  { src: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80', alt: 'Szczegół', tall: false },
]

export default function Gallery() {
  return (
    <section id="gallery" className="px-5 md:px-12 py-32 max-w-screen-xl mx-auto">
      <motion.div
        className="mb-20"
        initial={{ opacity: 0, y: 44 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.85, ease }}
        viewport={{ once: true, margin: '-40px' }}
      >
        <p className="tag mb-3">Atmosfera</p>
        <h2 className="font-serif font-light" style={{ fontSize: 'clamp(2.4rem,5vw,4rem)' }}>
          Poczuj <em className="text-caramel">klimat</em>
        </h2>
      </motion.div>

      <div
        className="grid gap-3"
        style={{ gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'auto auto' }}
      >
        {photos.map((p, i) => (
          <motion.div
            key={i}
            className="overflow-hidden group"
            style={{
              aspectRatio: p.tall ? undefined : '1',
              gridRow: p.tall ? 'span 2' : undefined,
              position: 'relative',
            }}
            initial={{ opacity: 0, scale: 0.92, y: i % 2 === 0 ? 50 : 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: i * 0.09 }}
            viewport={{ once: true, margin: '-60px' }}
            whileHover={{ scale: 1.01 }}
          >
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.06]"
            />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
