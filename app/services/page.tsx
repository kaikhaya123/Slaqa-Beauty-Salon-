import Link from 'next/link'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { SERVICES } from '@/lib/constants'
import ServicesGrid from '@/components/services/ServicesGrid'

const currencyFormatter = new Intl.NumberFormat('en-ZA', {
  style: 'currency',
  currency: 'ZAR',
  maximumFractionDigits: 0,
})

export default function ServicesPage() {
  return (
    <Section background="white" padding="lg">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black text-black-900">Our Services & Prices</h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Choose from our selection of professional haircuts and grooming services.</p>
        <div className="mt-6 h-1 w-28 bg-gold-600 rounded mx-auto" />
      </div>

      <div className="mt-12">
        {/* client-side grid with filtering */}
        <ServicesGrid services={SERVICES} />
      </div>

      <p className="mt-8 text-sm text-gray-500 text-center">Prices are subject to change. If you need help choosing a service, call us at <a className="text-gold-600 font-medium" href={`tel:${process.env.NEXT_PUBLIC_PHONE || ''}`}>{process.env.NEXT_PUBLIC_PHONE || ''}</a>.</p>
    </Section>
  )
}
