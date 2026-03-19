'use client'

import { MapPin, Phone, Clock, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const locations = [
  {
    name: 'Umlazi',
    address: '1 Swazi Rd, Umlazi A, Umlazi 4089',
    phone: '+27 65 686 6171',
    image: '/Images/slaqa_salon_3d_render.png',
    hours: [
      { days: 'Mon – Thu', time: '08:00 – 20:00' },
      { days: 'Friday',    time: '08:00 – 21:00' },
      { days: 'Saturday',  time: '08:00 – 21:00' },
      { days: 'Sunday',    time: '11:00 – 18:00' },
    ],
    mapsUrl: 'https://maps.google.com/?q=1+Swazi+Rd,+Umlazi+A,+Umlazi+4089',
  },
  {
    name: 'KwaMashu',
    address: 'F 206 Bhejane Road, KwaMashu',
    phone: '+27 66 564 1784',
    image: '/Images/slaqa_salon_3d_render.png',
    hours: [
      { days: 'Mon – Thu', time: '08:00 – 20:00' },
      { days: 'Friday',    time: '08:00 – 21:00' },
      { days: 'Saturday',  time: '08:00 – 21:00' },
      { days: 'Sunday',    time: '11:00 – 18:00' },
    ],
    mapsUrl: 'https://maps.google.com/?q=F+206+Bhejane+Road,+KwaMashu',
  },
  {
    name: 'Waterloo',
    address: '46 Pricklepear Road, Waterloo',
    phone: '+27 65 686 6171',
    image: '/Images/slaqa_salon_3d_render.png',
    hours: [
      { days: 'Mon – Thu', time: '08:00 – 20:00' },
      { days: 'Friday',    time: '08:00 – 21:00' },
      { days: 'Saturday',  time: '08:00 – 21:00' },
      { days: 'Sunday',    time: '11:00 – 18:00' },
    ],
    mapsUrl: 'https://maps.google.com/?q=46+Pricklepear+Road,+Waterloo',
  },
]

export default function LocationHours() {
  return (
    <section className="bg-black-900 py-24 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-16"
      >
        <p className="text-[#FFF44F] text-sm font-bold uppercase tracking-[0.2em] mb-3">
          Find Us
        </p>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-white mb-4 leading-none">
          Visit our<br />
          <span className="text-[#FFF44F]">Locations</span>
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl">
          Slaqa operates three convenient locations across Durban. Visit any of our salons for premium beauty, hair, and barbering services.
        </p>
      </motion.div>

      {/* Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {locations.map((loc, index) => (
          <motion.div
            key={loc.name}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="group relative flex flex-col bg-[#1e1e1e] rounded-2xl overflow-hidden border border-white/5 hover:border-[#FFF44F]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#FFF44F]/5"
          >
            {/* 3D render image */}
            <div className="relative h-72 bg-gradient-to-b from-[#111] to-[#1e1e1e] overflow-hidden">
              {/* subtle yellow glow */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-3/4 h-3/4 bg-[#FFF44F]/10 blur-3xl rounded-full" />
              </div>
              <Image
                src={loc.image}
                alt={`Slaqa Salon ${loc.name} — 3D render`}
                fill
                className="object-contain p-4 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>

            {/* Yellow accent bar */}
            <div className="h-1 w-full bg-[#FFF44F]" />

            {/* Info */}
            <div className="flex flex-col flex-1 p-7 gap-5">
              {/* Location name */}
              <div className="text-2xl font-black text-white tracking-tight">
                {loc.name}
              </div>

              {/* Address */}
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-[#FFF44F] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-semibold">Address</p>
                  <p className="text-sm text-gray-300">{loc.address}</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-[#FFF44F] mt-1 shrink-0" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-1 font-semibold">Phone</p>
                  <a
                    href={`tel:${loc.phone.replace(/\s/g, '')}`}
                    className="text-sm text-gray-300 hover:text-[#FFF44F] transition-colors"
                  >
                    {loc.phone}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-[#FFF44F] mt-1 shrink-0" />
                <div className="w-full">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-semibold">Hours</p>
                  <div className="space-y-1">
                    {loc.hours.map(({ days, time }) => (
                      <div key={days} className="flex justify-between text-sm">
                        <span className="text-gray-400">{days}</span>
                        <span className="text-gray-200 font-medium tabular-nums">{time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-auto pt-2">
                <Link
                  href={loc.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 w-full justify-center py-3 rounded-full border border-[#FFF44F] text-[#FFF44F] text-sm font-bold uppercase tracking-wider hover:bg-[#FFF44F] hover:text-[#2e2e2e] transition-all duration-300"
                >
                  Get Directions
                  <ExternalLink className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
