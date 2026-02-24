'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export default function IntroSection() {
  return (
    <section
      className="relative pt-24 pb-32 px-6 overflow-hidden bg-black-900 text-[#FFFF00]"
      role="region"
      aria-labelledby="intro-heading"
    >
      <div className="max-w-7xl mx-auto">

        {/* Top grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          {/* Left — heading + copy + CTA */}
          <div className="space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <h2
                id="intro-heading"
                className="text-7xl md:text-8xl font-black tracking-tighter leading-none"
              >
                Our story. <br />
                <span className="text-white">Slaqa Salon.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
              className="space-y-6"
            >
              <p className="text-xl md:text-2xl text-white max-w-xl leading-relaxed">
                Slaqa Salon was born from a dream to redefine grooming and
                self-expression in South Africa — a lifestyle brand with
                thriving branches in Kwamashu, Waterloo, and Umlazi.
              </p>
              <p className="text-lg text-white max-w-lg leading-relaxed">
                Each location is a space where style, culture, and confidence
                come alive. We honour African beauty traditions while
                collaborating with brands and culture to keep grooming fresh
                and relevant.
              </p>

              <div className="pt-4">
                <Link
                  href="/book"
                  className="inline-flex items-center h-12 px-8 bg-[#FFFF00] text-black-900 rounded-full font-bold text-sm hover:brightness-110 transition-all duration-200 active:scale-95"
                >
                  Book Appointment
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right — image with spinning badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className="relative aspect-[4/5] lg:aspect-square overflow-hidden rounded-3xl shadow-2xl"
          >
            <Image
              src="/Images/1771563130149.jpeg"
              alt="Slaqa Salon"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {/* Spinning badge */}
            <div className="absolute top-8 right-8">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="size-28 rounded-full bg-black/30 backdrop-blur-md border border-white flex items-center justify-center p-4 text-center"
              >
                <span className="text-[10px] font-black uppercase text-white tracking-[0.2em] leading-tight">
                  Style · Culture · Confidence
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Bottom quote strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-32 pt-16 border-t border-black-900 flex flex-col md:flex-row justify-between gap-12"
        >
          <p className="text-3xl md:text-4xl font-medium text-white leading-[1.15] max-w-3xl">
            Founded with a vision to redefine haicuts through culture and
            community — we&apos;re more than a salon; we&apos;re a movement
            built on authenticity, innovation, and belonging.
          </p>
          <div className="text-sm font-bold text-white uppercase tracking-widest pt-2 shrink-0">
            STAY ClEAN.<br />STAY FRESH.<br />
          </div>
        </motion.div>

      </div>
    </section>
  )
}
