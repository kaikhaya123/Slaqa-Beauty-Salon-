import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Bebas_Neue } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloatingButton from '@/components/ui/WhatsAppFloatingButton'

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
  description: 'Slaqa — Multi-location beauty, hair and barbering services in Durban. Professional haircuts, fades, beard trims, hot towel shaves and hair styling. Visit us in KwaMashu, Waterloo or Umlazi.',
  keywords: 'barber, hair salon, beauty services, Durban, KZN, haircut, beard trim, hair styling, fades',
  openGraph: {
    title: 'Slaqa | Beauty, Hair & Barbering Services in Durban',
    description: 'Slaqa — Professional beauty, hair and barbering services in Durban with three convenient locations.',
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
      <body className="font-sans antialiased">
        <Header />
        <main className="pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </body>
    </html>
  )
}
