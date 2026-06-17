import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import './globals.css'
import Providers from './providers'

const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://cafe-krakow.netlify.app'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Café — Każda filiżanka opowiada historię.',
    template: '%s · Café Kraków',
  },
  description:
    'Świeżo palona kawa specialty, rzemieślnicze wypieki i atmosfera, do której chce się wracać. Zapraszamy codziennie — Kraków, Stare Miasto, ul. Floriańska 23.',
  keywords: ['kawiarnia Kraków', 'specialty coffee Kraków', 'kawa Kraków', 'Floriańska kawiarnia', 'best coffee Kraków'],
  authors: [{ name: 'Café Kraków' }],
  creator: 'Café Kraków',
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    url: siteUrl,
    siteName: 'Café Kraków',
    title: 'Café — Każda filiżanka opowiada historię.',
    description:
      'Świeżo palona kawa specialty, rzemieślnicze wypieki i atmosfera, do której chce się wracać. Kraków, ul. Floriańska 23.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Café Kraków — Każda filiżanka opowiada historię.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Café — Każda filiżanka opowiada historię.',
    description: 'Świeżo palona kawa specialty i atmosfera, do której chce się wracać. Kraków, Stare Miasto.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl">
      <body className={`${cormorant.variable} ${dmSans.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
