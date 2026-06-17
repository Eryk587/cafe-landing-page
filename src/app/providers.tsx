'use client'
import { ReservationProvider } from '@/context/ReservationContext'
import ReservationPanel from '@/components/ui/ReservationPanel'

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReservationProvider>
      {children}
      <ReservationPanel />
    </ReservationProvider>
  )
}
