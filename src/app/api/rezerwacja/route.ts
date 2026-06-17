import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

type ReservationData = {
  name: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  message?: string
}

function formatDate(dateStr: string) {
  try {
    const [y, m, d] = dateStr.split('-')
    return new Date(Number(y), Number(m) - 1, Number(d)).toLocaleDateString('pl-PL', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })
  } catch { return dateStr }
}

function row(label: string, value: string) {
  return `<div style="display:flex;padding:12px 0;border-bottom:1px solid rgba(200,149,108,.08);">
    <span style="font-family:Arial,sans-serif;color:#9e9089;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;width:130px;flex-shrink:0;padding-top:2px;">${label}</span>
    <span style="color:#f2e9df;font-weight:300;font-size:15px;font-family:Georgia,serif;">${value}</span>
  </div>`
}

function ownerEmailHtml(d: ReservationData) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="background:#0f0805;margin:0;padding:0;">
  <div style="max-width:560px;margin:0 auto;padding:48px 32px;font-family:Georgia,'Times New Roman',serif;">
    <p style="color:#c8956c;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 8px;">Nowa rezerwacja</p>
    <h1 style="color:#f2e9df;font-weight:300;font-size:38px;margin:0 0 40px;line-height:1;">Café<span style="color:#c8956c;">.</span></h1>
    <div style="border-top:1px solid rgba(200,149,108,.2);border-bottom:1px solid rgba(200,149,108,.2);padding:8px 0;margin-bottom:32px;">
      ${row('Gość', d.name)}
      ${row('Email', d.email)}
      ${row('Telefon', d.phone)}
      ${row('Data', formatDate(d.date))}
      ${row('Godzina', d.time)}
      ${row('Liczba osób', d.guests)}
      ${d.message ? row('Wiadomość', d.message) : ''}
    </div>
    <p style="color:#9e9089;font-family:Arial,sans-serif;font-size:12px;margin:0;letter-spacing:0.05em;">ul. Floriańska 23 · 31-021 Kraków · hello@cafe.pl</p>
  </div>
</body></html>`
}

function customerEmailHtml(d: ReservationData) {
  const firstName = d.name.split(' ')[0]
  return `<!DOCTYPE html><html><head><meta charset="utf-8"/></head>
<body style="background:#0f0805;margin:0;padding:0;">
  <div style="max-width:560px;margin:0 auto;padding:48px 32px;font-family:Georgia,'Times New Roman',serif;">
    <p style="color:#c8956c;font-family:Arial,sans-serif;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin:0 0 8px;">Potwierdzenie rezerwacji</p>
    <h1 style="color:#f2e9df;font-weight:300;font-size:38px;margin:0 0 12px;line-height:1;">Café<span style="color:#c8956c;">.</span></h1>
    <p style="color:#9e9089;font-family:Arial,sans-serif;font-size:14px;margin:0 0 40px;line-height:1.7;">Dziękujemy, <strong style="color:#f2e9df;font-weight:400;">${firstName}</strong>. Czekamy na Ciebie.</p>
    <div style="border:1px solid rgba(200,149,108,.2);padding:28px 28px 20px;margin-bottom:32px;">
      <div style="display:flex;gap:32px;flex-wrap:wrap;">
        <div style="margin-bottom:8px;">
          <p style="font-family:Arial,sans-serif;color:#9e9089;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 6px;">Data</p>
          <p style="color:#c8956c;font-size:20px;font-weight:300;margin:0;">${formatDate(d.date)}</p>
        </div>
        <div style="margin-bottom:8px;">
          <p style="font-family:Arial,sans-serif;color:#9e9089;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 6px;">Godzina</p>
          <p style="color:#c8956c;font-size:20px;font-weight:300;margin:0;">${d.time}</p>
        </div>
        <div style="margin-bottom:8px;">
          <p style="font-family:Arial,sans-serif;color:#9e9089;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;margin:0 0 6px;">Liczba osób</p>
          <p style="color:#c8956c;font-size:20px;font-weight:300;margin:0;">${d.guests}</p>
        </div>
      </div>
    </div>
    <p style="color:#9e9089;font-family:Arial,sans-serif;font-size:13px;line-height:1.8;margin:0 0 32px;">
      Rezerwacja oczekuje na potwierdzenie. Skontaktujemy się w ciągu 24 godzin.<br/>
      W razie pytań: <a href="mailto:hello@cafe.pl" style="color:#c8956c;text-decoration:none;">hello@cafe.pl</a> · <a href="tel:+48123456789" style="color:#c8956c;text-decoration:none;">+48 12 345 67 89</a>
    </p>
    <div style="border-top:1px solid rgba(200,149,108,.12);padding-top:24px;">
      <p style="color:rgba(158,144,137,.5);font-family:Arial,sans-serif;font-size:11px;margin:0;letter-spacing:0.1em;">ul. Floriańska 23 · 31-021 Kraków · Stare Miasto</p>
    </div>
  </div>
</body></html>`
}

export async function POST(req: NextRequest) {
  let body: ReservationData
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Nieprawidłowe dane' }, { status: 400 })
  }

  const { name, email, phone, date, time, guests } = body
  if (!name || !email || !phone || !date || !time || !guests) {
    return NextResponse.json({ error: 'Brakuje wymaganych pól' }, { status: 400 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'Brak konfiguracji emaila' }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    await resend.emails.send({
      from: 'Café Kraków <onboarding@resend.dev>',
      to: ['eryksapa@gmail.com'],
      subject: `Nowa rezerwacja — ${name}, ${guests} os., ${formatDate(date)} o ${time}`,
      html: ownerEmailHtml(body),
    })

    // Customer confirmation — best-effort (requires custom domain in production)
    try {
      await resend.emails.send({
        from: 'Café Kraków <onboarding@resend.dev>',
        to: [email],
        subject: 'Potwierdzenie rezerwacji — Café Kraków',
        html: customerEmailHtml(body),
      })
    } catch {
      // Non-fatal — owner email already delivered
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Błąd wysyłania. Spróbuj ponownie.' }, { status: 500 })
  }
}
