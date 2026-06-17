'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot  = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = -100, my = -100
    let rx = -100, ry = -100
    let hovering = false
    let raf: number

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const onEnter = () => { hovering = true }
    const onLeave = () => { hovering = false }

    const tick = () => {
      // dot snaps immediately
      dot.style.transform  = `translate(${mx}px, ${my}px)`

      // ring lags behind
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.transform = `translate(${rx}px, ${ry}px)`

      const scale = hovering ? 1.8 : 1
      ring.style.scale = String(scale)

      raf = requestAnimationFrame(tick)
    }

    const interactors = 'a, button, [role="button"], input, textarea, select, label'

    const addHover = () => {
      document.querySelectorAll<HTMLElement>(interactors).forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove)
    addHover()
    raf = requestAnimationFrame(tick)

    // Re-add on DOM changes (e.g. panel opens)
    const observer = new MutationObserver(addHover)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot — sharp, instant */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: -4, left: -4,
          width: 8, height: 8,
          borderRadius: '50%',
          background: '#c8956c',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
        }}
      />
      {/* Ring — lagging, scales on hover */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: -18, left: -18,
          width: 36, height: 36,
          borderRadius: '50%',
          border: '1px solid rgba(200,149,108,.5)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform, scale',
          transition: 'scale 0.3s ease',
        }}
      />
    </>
  )
}
