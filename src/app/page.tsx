import Cursor from '@/components/ui/Cursor'
import Nav from '@/components/ui/Nav'
import Hero from '@/components/sections/Hero'
import Menu from '@/components/sections/Menu'
import Story from '@/components/sections/Story'
import Experience from '@/components/sections/Experience'
import Gallery from '@/components/sections/Gallery'
import Reviews from '@/components/sections/Reviews'
import Location from '@/components/sections/Location'
import Footer from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Menu />
        <Story />
        <Experience />
        <Gallery />
        <Reviews />
        <Location />
      </main>
      <Footer />
    </>
  )
}
