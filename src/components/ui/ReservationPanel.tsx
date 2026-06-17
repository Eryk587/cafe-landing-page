'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { motion, AnimatePresence } from 'framer-motion'
import { useReservation } from '@/context/ReservationContext'

const ease = [0.16, 1, 0.3, 1] as const

const GUEST_OPTIONS = ['1', '2', '3', '4', '5', '6+']

const TIME_SLOTS = Array.from({ length: 31 }, (_, i) => {
  const mins = 7 * 60 + i * 30
  const h = Math.floor(mins / 60)
  const m = mins % 60
  return `${h}:${m.toString().padStart(2, '0')}`
})

type FormData = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  message: string
}

/* ─── Label + input wrapper ──────────────────────────────────────────── */
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '1.3rem' }}>
      <label style={{
        display: 'block',
        color: 'rgba(158,144,137,.75)',
        fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
        fontSize: '.6rem',
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        marginBottom: '.55rem',
      }}>
        {label}
      </label>
      {children}
      {error && (
        <p style={{ color: 'rgba(210,80,80,.85)', fontFamily: 'var(--font-dm-sans)', fontSize: '.72rem', marginTop: '.3rem' }}>
          {error}
        </p>
      )}
    </div>
  )
}

/* ─── Success screen ─────────────────────────────────────────────────── */
function SuccessView({ data, onClose }: { data: FormData; onClose: () => void }) {
  const dateLabel = (() => {
    try {
      const [y, m, d] = data.date.split('-')
      return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('pl-PL', {
        weekday: 'long', day: 'numeric', month: 'long',
      })
    } catch { return data.date }
  })()

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease }}
    >
      <div style={{
        width: 52, height: 52,
        border: '1px solid #c8956c',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#c8956c', fontSize: '1.3rem',
        marginBottom: '2rem',
      }}>
        ✓
      </div>

      <p style={{ color: '#c8956c', fontFamily: 'var(--font-dm-sans)', fontSize: '.6rem', letterSpacing: '.28em', textTransform: 'uppercase', margin: '0 0 .5rem' }}>
        Rezerwacja przyjęta
      </p>
      <h3 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300, fontSize: 'clamp(1.9rem,4vw,2.4rem)', color: '#f2e9df', margin: '0 0 .25rem', lineHeight: 1.1 }}>
        Dziękujemy,<br /><em style={{ color: '#c8956c' }}>{data.name.split(' ')[0]}.</em>
      </h3>

      <div style={{ height: 1, background: 'rgba(200,149,108,.18)', margin: '1.75rem 0' }} />

      {[
        ['Data', dateLabel],
        ['Godzina', data.time],
        ['Liczba osób', data.guests],
        ['Email', data.email],
      ].map(([label, value]) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '.85rem 0', borderBottom: '1px solid rgba(200,149,108,.08)' }}>
          <span style={{ fontFamily: 'var(--font-dm-sans)', color: '#9e9089', fontSize: '.62rem', letterSpacing: '.15em', textTransform: 'uppercase' }}>
            {label}
          </span>
          <span style={{ fontFamily: 'var(--font-dm-sans)', color: '#f2e9df', fontSize: '.88rem', fontWeight: 300, textAlign: 'right', maxWidth: '60%' }}>
            {value}
          </span>
        </div>
      ))}

      <p style={{ marginTop: '1.5rem', color: 'rgba(158,144,137,.55)', fontFamily: 'var(--font-dm-sans)', fontSize: '.78rem', lineHeight: 1.75 }}>
        Skontaktujemy się z Tobą w ciągu 24 godzin, aby potwierdzić rezerwację.
      </p>

      <button
        onClick={onClose}
        className="btn-s"
        style={{ marginTop: '2rem', width: '100%', justifyContent: 'center' }}
      >
        Zamknij
      </button>
    </motion.div>
  )
}

/* ─── Main panel ─────────────────────────────────────────────────────── */
export default function ReservationPanel() {
  const { isOpen, close } = useReservation()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [submitted, setSubmitted] = useState<FormData | null>(null)

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm<FormData>()
  const guests = watch('guests')
  const today = new Date().toISOString().split('T')[0]

  const onSubmit = async (data: FormData) => {
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/rezerwacja', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json.error || 'Błąd serwera')
      setSubmitted(data)
      setStatus('success')
    } catch (e) {
      setErrorMsg(e instanceof Error ? e.message : 'Błąd. Spróbuj ponownie.')
      setStatus('error')
    }
  }

  const handleClose = () => {
    close()
    setTimeout(() => { setStatus('idle'); setErrorMsg(''); setSubmitted(null); reset() }, 450)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            style={{ position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(15,8,5,.78)', backdropFilter: 'blur(6px)' }}
          />

          {/* Slide-in panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.62, ease }}
            style={{
              position: 'fixed', top: 0, right: 0, bottom: 0,
              width: 'min(520px, 100vw)',
              zIndex: 400,
              background: '#0f0805',
              borderLeft: '1px solid rgba(200,149,108,.1)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div style={{ padding: '2.25rem 2.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <p style={{ color: '#c8956c', fontFamily: 'var(--font-dm-sans)', fontSize: '.6rem', letterSpacing: '.28em', textTransform: 'uppercase', margin: '0 0 .55rem' }}>
                  Rezerwacja online
                </p>
                <h2 style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontWeight: 300, fontSize: 'clamp(2rem,5vw,2.75rem)', lineHeight: 1, color: '#f2e9df', margin: 0 }}>
                  Zarezerwuj<br /><em style={{ color: '#c8956c' }}>stolik.</em>
                </h2>
              </div>
              <button
                onClick={handleClose}
                aria-label="Zamknij panel"
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(242,233,223,.35)', fontSize: '1.3rem', lineHeight: 1,
                  padding: '.25rem', transition: 'color .2s', flexShrink: 0, marginTop: '.2rem',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#f2e9df')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,233,223,.35)')}
              >
                ✕
              </button>
            </div>

            <div style={{ height: 1, background: 'rgba(200,149,108,.15)', margin: '1.75rem 2.5rem' }} />

            {/* Body */}
            <div style={{ padding: '0 2.5rem 3rem', flex: 1 }}>
              {status === 'success' && submitted ? (
                <SuccessView data={submitted} onClose={handleClose} />
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                  {/* Name */}
                  <Field label="Imię i nazwisko" error={errors.name?.message}>
                    <input
                      type="text"
                      placeholder="Jan Kowalski"
                      className={`form-input${errors.name ? ' form-input-error' : ''}`}
                      {...register('name', {
                        required: 'Pole wymagane',
                        minLength: { value: 2, message: 'Min. 2 znaki' },
                      })}
                    />
                  </Field>

                  {/* Email + Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="Email" error={errors.email?.message}>
                      <input
                        type="email"
                        placeholder="jan@email.pl"
                        className={`form-input${errors.email ? ' form-input-error' : ''}`}
                        {...register('email', {
                          required: 'Pole wymagane',
                          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Nieprawidłowy email' },
                        })}
                      />
                    </Field>
                    <Field label="Telefon" error={errors.phone?.message}>
                      <input
                        type="tel"
                        placeholder="+48 600 000 000"
                        className={`form-input${errors.phone ? ' form-input-error' : ''}`}
                        {...register('phone', {
                          required: 'Pole wymagane',
                          minLength: { value: 9, message: 'Min. 9 cyfr' },
                        })}
                      />
                    </Field>
                  </div>

                  {/* Date + Time */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <Field label="Data" error={errors.date?.message}>
                      <input
                        type="date"
                        min={today}
                        className={`form-input${errors.date ? ' form-input-error' : ''}`}
                        {...register('date', { required: 'Wybierz datę' })}
                      />
                    </Field>
                    <Field label="Godzina" error={errors.time?.message}>
                      <select
                        className={`form-input${errors.time ? ' form-input-error' : ''}`}
                        {...register('time', { required: 'Wybierz godzinę' })}
                      >
                        <option value="">— wybierz —</option>
                        {TIME_SLOTS.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </Field>
                  </div>

                  {/* Guests */}
                  <Field label="Liczba osób" error={errors.guests?.message}>
                    <input type="hidden" {...register('guests', { required: 'Wybierz liczbę osób' })} />
                    <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                      {GUEST_OPTIONS.map(n => (
                        <button
                          key={n}
                          type="button"
                          onClick={() => setValue('guests', n, { shouldValidate: true })}
                          style={{
                            width: '3rem', height: '3rem',
                            border: `1px solid ${guests === n ? '#c8956c' : 'rgba(200,149,108,.2)'}`,
                            background: guests === n ? '#c8956c' : 'transparent',
                            color: guests === n ? '#0f0805' : 'rgba(242,233,223,.45)',
                            fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                            fontSize: '.85rem',
                            fontWeight: guests === n ? 500 : 300,
                            cursor: 'pointer',
                            transition: 'all .2s ease',
                          }}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Optional message */}
                  <Field label="Wiadomość (opcjonalne)">
                    <textarea
                      rows={3}
                      placeholder="Urodziny, alergie, specjalne życzenia…"
                      className="form-input"
                      style={{ resize: 'none', lineHeight: 1.65 }}
                      {...register('message')}
                    />
                  </Field>

                  {/* Server error */}
                  {status === 'error' && (
                    <p style={{ color: 'rgba(210,80,80,.85)', fontFamily: 'var(--font-dm-sans)', fontSize: '.82rem', marginBottom: '1rem' }}>
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="btn-p"
                    style={{ width: '100%', opacity: status === 'loading' ? .6 : 1, cursor: status === 'loading' ? 'wait' : 'pointer' }}
                  >
                    {status === 'loading' ? 'Wysyłanie…' : 'Zarezerwuj stolik'}
                  </button>

                  <p style={{ marginTop: '1rem', color: 'rgba(158,144,137,.45)', fontFamily: 'var(--font-dm-sans)', fontSize: '.72rem', textAlign: 'center', lineHeight: 1.7 }}>
                    Potwierdzenie zostanie wysłane na podany email.<br />
                    Czynni pn–pt 7:00–21:00 · sb–nd 8:00–22:00.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
