'use client'
import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = 0, my = 0, rx = 0, ry = 0
    let rScale = 1, rTargetScale = 1
    let rafId = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY
      dot.style.transform = `translate3d(${mx - 3.5}px,${my - 3.5}px,0)`
    }

    const loop = () => {
      rx += (mx - rx) * .09
      ry += (my - ry) * .09
      rScale += (rTargetScale - rScale) * .12
      ring.style.transform = `translate3d(${rx - 19}px,${ry - 19}px,0) scale(${rScale.toFixed(3)})`
      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    const enterLink = () => { rTargetScale = 1.6; ring.style.borderColor = 'rgba(200,149,108,.8)' }
    const leaveLink = () => { rTargetScale = 1;   ring.style.borderColor = 'rgba(200,149,108,.45)' }

    document.addEventListener('mousemove', onMove, { passive: true })
    document.querySelectorAll('a,button').forEach(el => {
      el.addEventListener('mouseenter', enterLink)
      el.addEventListener('mouseleave', leaveLink)
    })

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        width: 7, height: 7,
        background: '#c8956c',
        borderRadius: '50%',
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 9999,
        willChange: 'transform',
      }} className="hidden md:block" />
      <div ref={ringRef} style={{
        width: 38, height: 38,
        border: '1px solid rgba(200,149,108,.45)',
        borderRadius: '50%',
        position: 'fixed', top: 0, left: 0,
        pointerEvents: 'none', zIndex: 9998,
        transition: 'border-color .2s',
        willChange: 'transform',
      }} className="hidden md:block" />
    </>
  )
}
