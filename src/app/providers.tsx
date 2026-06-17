'use client'
import { ReservationProvider } from '@/context/ReservationContext'
import ReservationPanel from '@/components/ui/ReservationPanel'
import CookieBanner from '@/components/ui/CookieBanner'
import CustomCursor from '@/components/ui/CustomCursor'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReservationProvider>
      {children}
      <ReservationPanel />
      <CookieBanner />
      <CustomCursor />
    </ReservationProvider>
  )
}
