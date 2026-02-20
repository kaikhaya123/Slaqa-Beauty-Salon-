'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ArrowUp, MapPin, Phone, Mail, Clock } from 'lucide-react'
import { BUSINESS_INFO } from '@/lib/constants'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home',        href: '/' },
  { label: 'About',       href: '/about' },
  { label: 'Services',    href: '/services' },
  { label: 'Barbers',     href: '/barbers' },
  { label: 'Book',        href: '/book' },
  { label: 'Contact',     href: '/contact' },
]

const socials = [
  { label: 'Instagram', href: `https://instagram.com/${BUSINESS_INFO.instagram.replace(/^@/, '')}`, icon: '/Icons/instagram (1).png' },
  { label: 'Facebook',  href: '#',                                                                   icon: '/Icons/facebook.png' },
  { label: 'TikTok',    href: '#',                                                                   icon: '/Icons/tik-tok (2).png' },
  { label: 'WhatsApp',  href: `https://wa.me/${BUSINESS_INFO.whatsapp}`,                            icon: '/Images/whatsapp.png' },
]

export default function Footer() {
  const pathname = usePathname()
  if (pathname.startsWith('/admin')) return null

  return (
    <section className="bg-[#FFFF00] pt-40">

      {/* ── Floating CTA banner ── */}
      <div className="w-[90%] lg:w-[85%] mx-auto">
        <div className="relative z-10 -mb-24">
          <div className="rounded-2xl overflow-hidden h-80 sm:h-96 relative shadow-2xl">
            <Image
              src="/Images/andre-reis-1_DAlXy0wng-unsplash.jpg"
              alt="Slaqa Salon"
              fill
              className="object-cover object-center"
              sizes="85vw"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/55" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-16 lg:p-24">
              <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-black max-w-2xl mb-8 leading-[0.92] tracking-tight">
                Book your next<br />
                <span className="text-[#FFFF00]">Slaqa experience.</span>
              </h2>
              <Link
                href="/book"
                className="bg-[#FFFF00] text-black-900 px-8 py-4 rounded-full w-fit flex items-center gap-3 font-black text-sm uppercase tracking-widest hover:bg-white transition-colors"
              >
                Book Now
                <div className="w-8 h-8 bg-black-900 rounded-full flex items-center justify-center text-[#FFFF00]">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main black footer ── */}
      <div className="w-full">
        <div className="bg-[#FFFF00] rounded-t-3xl pt-40 pb-16 px-6 md:px-12 text-black-900">
          <div className="max-w-7xl mx-auto">

            {/* Top grid: brand + socials  |  contact info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start pb-12">

              {/* Left — brand + social icons */}
              <div className="space-y-10">
                <div>
                  <Image
                    src="/logo/Slaqa_log.png"
                    alt="Slaqa"
                    width={220}
                    height={88}
                    className="h-20 w-auto brightness-0"
                  />
                  <p className="mt-4 text-black-900 text-sm leading-relaxed max-w-sm">
                    {BUSINESS_INFO.tagline}. Three locations across Durban —
                    KwaMashu, Waterloo & Umlazi.
                  </p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-semibold text-black-900 uppercase tracking-[0.2em]">
                    Connect
                  </h4>
                  <div className="flex gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="w-10 h-10 border border-black-900/30 rounded-full flex items-center justify-center hover:bg-black-900 hover:border-black-900 transition-colors group"
                      >
                        <Image
                          src={s.icon}
                          alt={s.label}
                          width={18}
                          height={18}
                          className="h-[18px] w-[18px] object-contain group-hover:invert"
                        />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — contact details */}
              <div className="space-y-6 lg:text-right">
                <h3 className="text-lg font-semibold text-black-900">
                  Visit us at any of our three locations
                </h3>
                <ul className="space-y-4 lg:ml-auto max-w-md">
                  <li className="flex items-start gap-3 lg:flex-row-reverse">
                    <MapPin className="w-4 h-4 text-black-900 shrink-0 mt-0.5" />
                    <span className="text-sm text-black-900">{BUSINESS_INFO.address}</span>
                  </li>
                  <li className="flex items-center gap-3 lg:flex-row-reverse">
                    <Phone className="w-4 h-4 text-black-900 shrink-0" />
                    <a href={`tel:${BUSINESS_INFO.phone}`} className="text-sm text-black-900 hover:underline transition-colors">
                      {BUSINESS_INFO.phone}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 lg:flex-row-reverse">
                    <Mail className="w-4 h-4 text-black-900 shrink-0" />
                    <a href={`mailto:${BUSINESS_INFO.email}`} className="text-sm text-black-900 hover:underline transition-colors">
                      {BUSINESS_INFO.email}
                    </a>
                  </li>
                  <li className="flex items-start gap-3 lg:flex-row-reverse">
                    <Clock className="w-4 h-4 text-black-900 shrink-0 mt-0.5" />
                    <div className="text-sm text-black-900 space-y-0.5">
                      <p>Mon – Thu &amp; Sun: {BUSINESS_INFO.hours.weekdays}</p>
                      <p>Fri – Sat: {BUSINESS_INFO.hours.friday}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Nav links row */}
            <nav className="border-t border-black-900 py-8 grid grid-cols-3 md:grid-cols-6 gap-4 text-sm font-medium text-black-900">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:underline transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Bottom bar */}
            <div className="py-8 border-t border-black-900 flex flex-col md:flex-row justify-between items-center gap-6">
              <span className="font-black text-lg tracking-tight">
                Slaqa <span className="text-black-900">Salon</span>
              </span>
              <span className="text-black-900 text-sm">
                © {new Date().getFullYear()} Slaqa. All rights reserved.
              </span>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-2 text-sm text-black-900 hover:opacity-70 transition-opacity"
              >
                Back to top
                <div className="w-10 h-10 bg-black-900 text-[#FFFF00] rounded-full flex items-center justify-center">
                  <ArrowUp className="w-5 h-5" />
                </div>
              </button>
            </div>

          </div>
        </div>
      </div>

    </section>
  )
}
