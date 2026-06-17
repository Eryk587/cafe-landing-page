'use client'
import { createContext, useContext, useState } from 'react'

type Ctx = { isOpen: boolean; open: () => void; close: () => void }

const ReservationContext = createContext<Ctx>({ isOpen: false, open: () => {}, close: () => {} })

export function ReservationProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <ReservationContext.Provider value={{ isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </ReservationContext.Provider>
  )
}

export const useReservation = () => useContext(ReservationContext)
