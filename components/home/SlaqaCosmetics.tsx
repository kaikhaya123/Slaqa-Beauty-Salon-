'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MoveUpRight, ShoppingBag } from 'lucide-react'

interface ProductType {
  id: string
  name: string
  desc: string
  price: string
  img: string
}

const products: ProductType[] = [
  { id: '01', name: 'Beard Oil', desc: 'Argan & jojoba for supreme softness', price: 'R 95', img: '/Images/slaqa_salon_1771343429789.jpeg' },
]

interface CollageType { id: string; src: string; label: string }
const collageItems: CollageType[] = [
  { id: '01', src: '/Images/slaqa_salon_1771605137243.jpeg', label: 'SHOP' },
  { id: '02', src: '/Images/slaqa_salon_1771606417838.jpeg', label: 'PICK n PAY EXPRESS' },
  { id: '03', src: '/Images/slaqacosmetics_1771606295354.jpeg', label: 'BEARD QABUNGA' },
]

export default function SlaqaCosmetics() {
  return (
    <>
      {/* ═══════════════════════════════════
          1  HERO STRIP
          Large image (col-span-7) + copy tile (col-span-5)
      ═══════════════════════════════════ */}
      <section className="bg-black-900 py-10 md:py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-4 overflow-hidden px-5 pb-2 lg:pb-5">

            {/* Copy tile */}
            <motion.article
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.6 }}
              viewport={{ once: false }}
              className="relative sm:col-span-5 col-span-12 rounded-xl bg-[#FFFF00] flex flex-col justify-between p-8 lg:p-12 h-[320px] sm:h-[560px] lg:h-[640px]"
            >
              <span className="text-lg uppercase tracking-[0.22em] text-black-900/50 font-semibold">
                Introducing
              </span>
              <div className="space-y-5">
                <h2 className="text-5xl lg:text-7xl font-black text-black-900 leading-[0.9] tracking-tight">
                  Slaqa<br />Cosmetics
                </h2>
                <p className="text-base lg:text-lg text-black-900/70 leading-relaxed max-w-sm">
                  A curated range built in the chair. Products tested on every texture,
                  every grain — because your look deserves Slaqa-level standards.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 bg-black-900 text-[#FFFF00]font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider hover:bg-black-700 transition-colors duration-200"
                >
                  Shop the Range <ArrowRight size={15} />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 border border-black-900/30 text-black-900 font-medium px-6 py-3 rounded-full text-sm uppercase tracking-wider hover:border-black-900 transition-colors duration-200"
                >
                  Our Story
                </Link>
              </div>
            </motion.article>

            {/* Hero video */}
            <motion.article
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.6, delay: 0.15 }}
              viewport={{ once: false }}
              className="relative sm:col-span-7 col-span-12 h-[420px] sm:h-[560px] lg:h-[640px]"
            >
              <div className="w-full h-full overflow-hidden rounded-xl">
                <video
                  src="/Video/3770841207342444387.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover object-center brightness-90"
                />
              </div>
              <div className="absolute bottom-0 w-full p-4 flex justify-between items-center">
                <h3 className="lg:text-xl text-sm bg-black text-white rounded-xl p-2 px-4">
                  Slaqa Cosmetics
                </h3>
                <div className="lg:w-12 w-10 lg:h-12 h-10 text-white grid place-content-center rounded-full bg-black">
                  <MoveUpRight />
                </div>
              </div>
            </motion.article>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          3  SHOP CTA
          3-tile collage grid + CTA tile
      ═══════════════════════════════════ */}
      <section className="bg-black-900 border-t border-white/8 py-14 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-4 overflow-hidden px-5 lg:pb-5 pb-2">

            {collageItems.map((item, index) => {
              let colSpanClass = 'sm:col-span-4 col-span-12'
              if (index === 0) colSpanClass = 'sm:col-span-5 col-span-12'
              else if (index === 1) colSpanClass = 'sm:col-span-4 col-span-6'
              else if (index === 2) colSpanClass = 'sm:col-span-3 col-span-6'
              return (
                <motion.article
                  key={item.id}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ ease: 'easeOut', duration: 0.55, delay: index * 0.1 }}
                  viewport={{ once: false }}
                  className={`relative ${colSpanClass} h-[300px] sm:h-[460px] lg:h-[540px]`}
                >
                  <div className="w-auto h-full">
                    <Image
                      src={item.src}
                      alt={item.label}
                      height={540}
                      width={900}
                      className="h-full w-full object-cover rounded-xl brightness-75"
                    />
                  </div>
                  <div className="absolute lg:bottom-2 bottom-0 w-full p-4 flex justify-between items-center">
                    <h3 className="lg:text-xl text-sm bg-black text-white rounded-xl p-2 px-4">
                      {item.label}
                    </h3>
                    <div className="lg:w-12 w-10 lg:h-12 h-10 text-white grid place-content-center rounded-full bg-black">
                      <MoveUpRight />
                    </div>
                  </div>
                </motion.article>
              )
            })}

            {/* CTA tile */}
            <motion.article
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.55, delay: 0.3 }}
              viewport={{ once: false }}
              className="relative sm:col-span-12 col-span-12 rounded-xl overflow-hidden min-h-[480px] sm:min-h-[560px] lg:min-h-[620px]"
            >
              {/* Background image */}
              <Image
                src="/Images/PnP-Express-1920-1080.jpg.png"
                alt="Pick n Pay Express Bridge City"
                fill
                className="object-cover object-center"
              />

              {/* Mobile overlay: full dark base for perfect readability */}
              <div
                className="absolute inset-0 sm:block"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 75%, transparent 100%)' }}
                aria-hidden="true"
              />

              {/* Desktop overlay: strong left-side gradient, fades to transparent on the right */}
              <div
                className="absolute inset-0 hidden sm:block"
                style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.55) 55%, rgba(0,0,0,0.15) 75%, transparent 100%)' }}
                aria-hidden="true"
              />

              {/* Content — bottom-left */}
              <div className="absolute bottom-0 left-0 z-10 p-8 lg:p-12 flex flex-col gap-6 max-w-xl">
                <div className="space-y-3">
                  <span className="text-xs uppercase tracking-[0.22em] text-white font-semibold">
                    One Vision, One Beard Qabunga off the Shelves
                  </span>
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.9] tracking-tight">
                    It&apos;s not just Oil,<br />
                    <span className="text-white">it&apos;s Beard Qabunga.</span>
                  </h2>
                  <p className="text-base text-white leading-relaxed max-w-sm">
                    Now available in-store at{' '}
                    <strong className="text-[#FFFF00]">@bpbridgecity Pick n Pay Express</strong>{' '}
                    for only <strong className="text-[#FFFF00]">R95</strong>.
                    Walk in and grab it off the shelf.
                  </p>
                </div>

                {/* Stats row */}
                <div className="flex gap-8 pt-4 border-t border-white/20">
                  {[
                    { n: 'R95', label: 'In-Store Price' },
                    { n: 'PnP', label: 'Express' },
                    { n: 'BP',  label: 'Bridge City' },
                  ].map((s) => (
                    <div key={s.label} className="space-y-0.5">
                      <p className="text-2xl font-black text-[#FFFF00]">{s.n}</p>
                      <p className="text-xs text-white uppercase tracking-wider">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://maps.google.com/?q=Bridge+City+Pick+n+Pay+Express+KwaMashu"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 bg-[#FFFF00] text-black-900 font-black px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
                  >
                    <ShoppingBag size={16} strokeWidth={2.5} />
                    Get Directions
                  </a>
                  <Link
                    href="/book"
                    className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:border-[#FFFF00] hover:text-[#FFFF00] transition-colors duration-200"
                  >
                    Book a Consult <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </motion.article>

          </div>
        </div>
      </section>
    </>
  )
}
