import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Bebas_Neue } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton'
import AppShell from '@/components/layout/AppShell'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
})

const rethinkSans = localFont({
  src: [
    {
      path: '../public/Font/rethink-sans/RethinkSans[wght].ttf',
      weight: '100 900',
      style: 'normal',
    },
    {
      path: '../public/Font/rethink-sans/RethinkSans-Italic[wght].ttf',
      weight: '100 900',
      style: 'italic',
    },
  ],
  variable: '--font-rethink-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Slaqa | Beauty, Hair & Barbering Services in Durban',
  description: 'Slaqa Salon Durban offers premium haircuts, fades, beard grooming, and beauty services in KwaMashu, Waterloo, and Umlazi.',
  keywords: 'barber, hair salon, beauty services, Durban, KZN, haircut, beard trim, hair styling, fades',
  icons: {
    icon: '/logo/SLAQA_SALON_LOGO.png',
    shortcut: '/logo/SLAQA_SALON_LOGO.png',
    apple: '/logo/SLAQA_SALON_LOGO.png',
  },
  openGraph: {
    title: 'Slaqa | Beauty, Hair & Barbering Services in Durban',
    description: 'Slaqa Salon Durban offers premium haircuts, fades, beard grooming, and beauty services across three locations.',
    type: 'website',
  },
} 

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${rethinkSans.variable} ${bebasNeue.variable}`}>
      <head>
        <link rel="icon" href="/logo/SLAQA_SALON_LOGO.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo/SLAQA_SALON_LOGO.png" />
      </head>
      <body className="font-sans antialiased">
        <AppShell>
          <Header />
          <main className="pt-16 md:pt-20">
            {children}
          </main>
          <Footer />
          <WhatsAppFloatingButton />
        </AppShell>
      </body>
    </html>
  )
}
