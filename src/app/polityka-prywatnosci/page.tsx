import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Polityka Prywatności — Café',
}

export default function PrivacyPolicy() {
  return (
    <>
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.6rem 3rem', borderBottom: '1px solid rgba(200,149,108,.08)' }}>
        <Link href="/" className="font-serif text-cream no-underline" style={{ fontSize: '1.5rem', letterSpacing: '.04em' }}>
          Café<span className="text-caramel">.</span>
        </Link>
        <Link href="/" className="nav-link">← Wróć na stronę główną</Link>
      </nav>

      <main style={{ maxWidth: 760, margin: '0 auto', padding: '5rem 3rem 8rem' }}>
        <p className="tag" style={{ marginBottom: '1.5rem' }}>Dokumenty prawne</p>
        <h1 className="font-serif font-light" style={{ fontSize: 'clamp(2.5rem,5vw,4rem)', lineHeight: 1.05 }}>
          Polityka<br /><em className="text-caramel italic">Prywatności</em>
        </h1>

        <p className="font-sans font-light" style={{ marginTop: '1.5rem', marginBottom: '3rem', color: '#9e9089', fontSize: '.92rem' }}>
          Ostatnia aktualizacja: <strong style={{ color: '#c8956c', fontWeight: 400 }}>1 stycznia 2025</strong>
        </p>

        <div className="hr-line" style={{ marginBottom: '3rem' }} />

        {[
          {
            title: '1. Administrator danych',
            content: <p>Administratorem danych osobowych jest <strong style={{ color: '#c8956c', fontWeight: 400 }}>Café Sp. z o.o.</strong> z siedzibą przy ul. Floriańskiej 23, 31-021 Kraków, NIP: 123-456-78-90. Kontakt: <a href="mailto:hello@cafe.pl" style={{ color: '#c8956c' }}>hello@cafe.pl</a>.</p>
          },
          {
            title: '2. Jakie dane zbieramy',
            content: <>
              <p>W zależności od sposobu korzystania ze strony możemy zbierać:</p>
              <ul style={{ marginTop: '.75rem', display: 'flex', flexDirection: 'column', gap: '.4rem', marginLeft: '1.2rem', listStyle: 'disc' }}>
                <li>dane kontaktowe (imię, e-mail, telefon) — przy rezerwacji;</li>
                <li>dane techniczne (IP, przeglądarka, czas wizyty) — zbierane automatycznie;</li>
                <li>dane analityczne — za Twoją zgodą.</li>
              </ul>
            </>
          },
          {
            title: '3. Cel i podstawa przetwarzania',
            content: <ul style={{ marginTop: '.75rem', display: 'flex', flexDirection: 'column', gap: '.4rem', marginLeft: '1.2rem', listStyle: 'disc' }}>
              <li><strong style={{ color: '#c8956c', fontWeight: 400 }}>Realizacja rezerwacji</strong> — art. 6 ust. 1 lit. b RODO;</li>
              <li><strong style={{ color: '#c8956c', fontWeight: 400 }}>Odpowiedź na zapytanie</strong> — art. 6 ust. 1 lit. f RODO;</li>
              <li><strong style={{ color: '#c8956c', fontWeight: 400 }}>Analityka</strong> — art. 6 ust. 1 lit. a RODO (zgoda).</li>
            </ul>
          },
          {
            title: '4. Okres przechowywania danych',
            content: <p>Dane rezerwacji: <strong style={{ color: '#c8956c', fontWeight: 400 }}>3 lata</strong>. Dane analityczne (zanonimizowane): <strong style={{ color: '#c8956c', fontWeight: 400 }}>26 miesięcy</strong>. Dane marketingowe: do cofnięcia zgody.</p>
          },
          {
            title: '5. Twoje prawa',
            content: <>
              <p>Zgodnie z RODO masz prawo do:</p>
              <ul style={{ marginTop: '.75rem', display: 'flex', flexDirection: 'column', gap: '.4rem', marginLeft: '1.2rem', listStyle: 'disc' }}>
                <li>dostępu do swoich danych;</li>
                <li>sprostowania, usunięcia, ograniczenia przetwarzania;</li>
                <li>przenoszenia danych i wniesienia sprzeciwu;</li>
                <li>cofnięcia zgody w dowolnym momencie.</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>Kontakt: <a href="mailto:hello@cafe.pl" style={{ color: '#c8956c' }}>hello@cafe.pl</a>. Przysługuje Ci też prawo skargi do PUODO.</p>
            </>
          },
          {
            title: '6. Pliki cookies',
            content: <p>Używamy cookies niezbędnych technicznie oraz — za Twoją zgodą — cookies analitycznych. Możesz zarządzać nimi w ustawieniach przeglądarki.</p>
          },
          {
            title: '7. Udostępnianie danych',
            content: <p>Nie sprzedajemy danych. Możemy je udostępniać zaufanym podwykonawcom (hosting, system rezerwacji) na podstawie umów powierzenia przetwarzania.</p>
          },
          {
            title: '8. Bezpieczeństwo',
            content: <p>Stosujemy odpowiednie środki techniczne i organizacyjne. Transmisja danych odbywa się przez szyfrowane połączenie HTTPS.</p>
          },
          {
            title: '9. Zmiany polityki',
            content: <p>Zastrzegamy prawo do aktualizacji polityki. O istotnych zmianach poinformujemy na stronie.</p>
          },
          {
            title: '10. Kontakt',
            content: <p>
              <a href="mailto:hello@cafe.pl" style={{ color: '#c8956c' }}>hello@cafe.pl</a> &nbsp;·&nbsp; +48 12 345 67 89<br />
              ul. Floriańska 23, 31-021 Kraków
            </p>
          },
        ].map(({ title, content }) => (
          <section key={title}>
            <h2 className="font-serif font-light text-cream" style={{ fontSize: '1.6rem', marginTop: '2.5rem', marginBottom: '.75rem' }}>
              {title}
            </h2>
            <div className="font-sans font-light leading-[1.85]" style={{ fontSize: '.92rem', color: '#9e9089' }}>
              {content}
            </div>
          </section>
        ))}

        <div className="hr-line" style={{ marginTop: '4rem', marginBottom: '2rem' }} />
        <p className="font-sans" style={{ fontSize: '.75rem', opacity: .4 }}>© 2025 Café. Wszelkie prawa zastrzeżone.</p>
      </main>
    </>
  )
}
