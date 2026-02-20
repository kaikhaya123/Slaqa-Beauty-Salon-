'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Service } from '@/lib/types'

interface Props {
  services: Service[]
}

export default function ServicesGrid({ services }: Props) {
  const categories = useMemo(() => {
    const set = new Set<string>()
    services.forEach(s => set.add(s.category || 'Uncategorized'))
    return ['All', ...Array.from(set)]
  }, [services])

  const [active, setActive] = useState('All')

  const filtered = useMemo(() => {
    if (active === 'All') return services
    return services.filter(s => (s.category || 'Uncategorized') === active)
  }, [active, services])

  return (
    <div>
      <div className="flex items-center justify-center gap-3 flex-wrap mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`px-6 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors ${
              active === cat ? 'bg-[#FFF44F] text-[#2e2e2e] shadow-lg' : 'bg-transparent text-black-900 hover:bg-gray-50'
            }`}
            aria-pressed={active === cat}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-8 max-w-6xl mx-auto">
        {filtered.map(service => (
          <div key={service.id} className="bg-white rounded-lg sm:rounded-xl lg:rounded-2xl shadow-md hover:shadow-xl transition-shadow overflow-hidden flex flex-col">
            {/* Service Image */}
            {service.image && (
              <div className="relative w-full h-48 sm:h-56 lg:h-96 overflow-hidden bg-white">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-contain transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
                />
                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300"></div>
              </div>
            )}

            {/* Service Info */}
            <div className="p-3 sm:p-4 lg:p-6 flex-1 flex flex-col">
              <div className="text-xs sm:text-sm lg:text-sm uppercase tracking-wide text-gray-500 font-semibold mb-1 lg:mb-2">
                {(service.category || 'Uncategorized').toUpperCase()}
              </div>

              <h3 className="text-sm sm:text-base lg:text-2xl font-bold text-black-900 mb-1 lg:mb-3 line-clamp-2">
                <Link
                  href={`/book?service=${service.id}#appointment`}
                  className="hover:text-[#FFF44F] transition-colors"
                >
                  {service.name}
                </Link>
              </h3>

              {service.description && (
                <p className="text-xs sm:text-sm lg:text-base text-gray-600 mb-2 lg:mb-3 line-clamp-2 lg:line-clamp-3 flex-grow">
                  {service.description}
                </p>
              )}

              {service.duration != null && (
                <div className="flex items-center gap-1 text-xs sm:text-sm lg:text-base text-gray-600 mb-2 lg:mb-4">
                  <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{service.duration}m</span>
                </div>
              )}

              <div className="flex items-center justify-between pt-2 sm:pt-3 lg:pt-4 border-t border-gray-200 mt-auto gap-2">
                <div>
                  <div className="text-xs lg:text-sm text-gray-500 uppercase tracking-wide">Price</div>
                  <div className="text-lg sm:text-xl lg:text-3xl font-black text-black-900">
                    {service.price != null ? 'R' + service.price : '—'}
                  </div>
                </div>

                <Link 
                  href={`/book?service=${service.id}#appointment`} 
                  className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 lg:w-12 lg:h-12 bg-black hover:bg-gray-800 text-white rounded-full text-xs lg:text-lg font-bold shadow-md hover:shadow-lg transition-all"
                  title="Book Now"
                >
                  →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
