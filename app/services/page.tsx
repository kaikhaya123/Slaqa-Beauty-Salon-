import Link from 'next/link'
import Image from 'next/image'
import { PRICE_LIST } from '@/lib/constants'
import type { PriceEntry } from '@/lib/constants'

function PriceCell({ value }: { value?: number }) {
  if (value == null) return <td className="py-3 px-4 text-center text-gray-300 text-sm">—</td>
  return (
    <td className="py-3 px-4 text-center font-semibold text-sm text-white">
      R{value}
    </td>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#2e2e2e]">
      {/* Hero */}
      <div className="relative pt-28 pb-20 px-6 text-center overflow-hidden">
        {/* Background image */}
        <Image
          src=""
          alt="Slaqa Salon interior"
          fill
          className="object-cover object-center scale-105"
          priority
          sizes="100vw"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black" />
        {/* Content sits above overlay */}
        <div className="relative z-10">
        <p className="text-[#FFFF00] text-sm font-bold uppercase tracking-[0.25em] mb-3">Slaqa Salon</p>
        <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter">
          Services &<br />
          <span className="text-[#FFFF00]">Pricing</span>
        </h1>
        <p className="mt-5 text-gray-400 max-w-xl mx-auto text-base">
          Professional cuts, styles and grooming for men, women and kids. Three pricing tiers based on finish.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-widest text-gray-500">
          <span className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-gray-500" /> Standard — base service
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-black-900 border border-gray-500" /> Black — with black dye
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#FFFF00]" /> Colour — with colour
          </span>
        </div>
        </div>{/* end z-10 content */}
      </div>{/* end hero */}

      {/* Price tables */}
      <div className="max-w-4xl mx-auto px-4 pb-24 space-y-16">
        {PRICE_LIST.map((cat) => (
          <div key={cat.label}>
            {/* Category heading */}
            <div className="flex items-center gap-4 mb-1">
              <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter">
                {cat.label}
              </h2>
            </div>
            <div className="h-px bg-white mb-0" />

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-widest text-gray-500 w-1/2">
                      Service
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-widest text-gray-500">
                      Standard
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-widest text-gray-500">
                      Black
                    </th>
                    <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-widest text-[#FFF44F]">
                      Colour
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cat.items.map((item: PriceEntry, i: number) => (
                    <tr
                      key={item.name}
                      className={`border-b border-gray-900 transition-colors hover:bg-white/5 ${
                        i % 2 === 0 ? '' : 'bg-white/[0.02]'
                      }`}
                    >
                      <td className="py-3 px-4 text-white font-medium text-sm">{item.name}</td>
                      <PriceCell value={item.standard} />
                      <PriceCell value={item.black} />
                      <td className="py-3 px-4 text-center">
                        {item.colour != null ? (
                          <span className="font-semibold text-sm text-[#FFF44F]">R{item.colour}</span>
                        ) : (
                          <span className="text-gray-700 text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}

        {/* CTA */}
        <div className="text-center pt-8 border-t border-gray-800">
          <p className="text-gray-500 text-sm mb-6">
            Prices are subject to change. Walk-ins welcome — or book ahead to skip the queue.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-3 px-10 py-4 bg-[#FFF44F] text-[#2e2e2e] font-black text-sm uppercase tracking-widest rounded-full hover:brightness-110 transition-all duration-200 active:scale-95"
          >
            Book Appointment
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
