'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Clock, Phone, Instagram, MessageCircle } from 'lucide-react'
import { useState } from 'react'

interface MenuItem {
  id: string
}

interface Testimonial {
  id: string
  quote: string
  author: string
  role: string
}

const menuItems: MenuItem[] = [
  // Removed 'Rustic Loaves' and 'Soft Rolls'
  // Removed 'Bold Espresso', 'Creamy Cappuccino', 'Smooth Latte', and 'Classic Favorites'
]

const testimonials: Testimonial[] = [
  {
    id: '1',
    quote: 'The best coffee in town — rich and comforting.',
    author: 'Sipho M.',
    role: 'Regular Customer',
  },
  {
    id: '2',
    quote: 'Their bread tastes like home. I buy three loaves every week!',
    author: 'Nomsa T.',
    role: 'Bread Enthusiast',
  },
  {
    id: '3',
    quote: 'The cakes here are extraordinary. Perfect for every celebration.',
    author: 'David K.',
    role: 'Event Planner',
  },
]

export default function NambitaCafe() {
  const [activeMenu, setActiveMenu] = useState<'Bread' | 'Coffee' | 'Cake'>('Bread')

  return (
    <div className="pt-24 md:pt-28 min-h-screen" style={{ backgroundColor: '#FFFF00' }}>
        {/* ═══════════════════════════════════
          HERO SECTION
        ═══════════════════════════════════ */}
        <section className="relative bg-[#FFFF00] min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.6 }}
            className="grid grid-cols-12 gap-8 items-center"
          >
            {/* Hero Content */}
            <div className="col-span-12 md:col-span-6 space-y-6">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.22em] text-black-900 font-semibold">
                  Welcome to Nambita Café
                </span>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black text-black-900 leading-[0.9] tracking-tight">
                  Bread.<br />
                  Coffee.<br />
                  Cake.
                </h1>
              </div>

              <p className="text-lg md:text-xl text-black-900 max-w-lg leading-relaxed">
                <em>Kuyanambitheka</em> – A taste that feels like home.
              </p>

              <p className="text-base text-black-900/80 max-w-lg leading-relaxed">
                At Nambita Café, we believe in simple pleasures done right. From freshly baked bread to rich, aromatic coffee and indulgent cakes, every bite carries the warmth of tradition and the joy of community.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
              </div>
            </div>

            {/* Hero Image Placeholder */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.6, delay: 0.2 }}
              className="col-span-12 md:col-span-6 h-[400px] bg-[#FFFF00] rounded-2xl border-2 border-[#FFFF00] flex items-center justify-center"
            >
              <Image
                src="/Images/ChatGPT Image Feb 22, 2026, 11_47_47 AM.png"
                alt="Café Hero Placeholder"
                width={768}
                height={400}
                className="rounded-xl object-cover w-full h-full border-2 border-[#FFFF00]"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          ABOUT US SECTION
      ═══════════════════════════════════ */}
      <section className="bg-black-900 py-16 md:py-24 overflow-hidden border-b border-white/8">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ ease: 'easeOut', duration: 0.6 }}
            className="max-w-2xl"
          >
            <span className="text-xs uppercase tracking-[0.22em] text-[#FFFF00] font-semibold">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-6 leading-tight">About Nambita Café</h2>

            <div className="space-y-4 text-white/80 text-base md:text-lg leading-relaxed">
              <p>
                At Nambita Café, we believe in simple pleasures done right. From freshly baked bread to rich, aromatic coffee and indulgent cakes, every bite carries the warmth of tradition and the joy of community.
              </p>
              <p>
                <span className="text-[#FFFF00] font-semibold">Kuyanambitheka</span> isn&apos;t just a phrase — it&apos;s our promise that every flavor will leave you smiling.
              </p>
              <p>
                We&apos;re part of a growing family of local businesses, including Slaqa Salon and Slaqa Cosmetics, united by our commitment to quality, community, and craft.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          MENU SECTION
      ═══════════════════════════════════ */}
      <section className="bg-[#FFFF00] py-16 md:py-24 overflow-hidden border-b border-white/8">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ ease: 'easeOut', duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col items-center justify-center mb-8">
              <span className="text-xs uppercase tracking-[0.22em] text-black-900 font-semibold text-center">Culinary Delights</span>
              <h2 className="text-4xl md:text-5xl font-black text-black-900 mt-4 mb-8 leading-tight text-center">Our Menu</h2>
            </div>

            {/* Menu Price List */}
            <div className="bg-[#FFFF00] text-black-900 rounded-xl p-8 mb-12 shadow-lg">
              <h3 className="text-2xl font-black mb-6">Nambita Cafe Menu Prices</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold mb-2">Snacks (36 gram)</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/tortilla.png" alt="Simba Chips" width={32} height={32} className="rounded mr-2" />
                      Simba Chips <span className="font-semibold">R15</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Images/potato-chip.png" alt="Lays" width={32} height={32} className="rounded mr-2" />
                      Lays <span className="font-semibold">R15</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Images/nachos.png" alt="Doritos" width={32} height={32} className="rounded mr-2" />
                      Doritos <span className="font-semibold">R15</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/snack.png" alt="Fritos" width={32} height={32} className="rounded mr-2" />
                      Fritos <span className="font-semibold">R13</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/cashew.png" alt="Nuts" width={32} height={32} className="rounded mr-2" />
                      Nuts <span className="font-semibold">R13</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/chocolate-bar.png" alt="Kit Kat" width={32} height={32} className="rounded mr-2" />
                      Kit Kat <span className="font-semibold">R13</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/energy-bar.png" alt="barOne" width={32} height={32} className="rounded mr-2" />
                      barOne <span className="font-semibold">R13</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/beans.png" alt="Smarties" width={32} height={32} className="rounded mr-2" />
                      Smarties <span className="font-semibold">R13</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/chocolate.png" alt="Tex" width={32} height={32} className="rounded mr-2" />
                      Tex <span className="font-semibold">R13</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Drinks</h4>
                  <ul className="space-y-1">
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/tea-cup.png" alt="Coffee" width={32} height={32} className="rounded mr-2" />
                      Coffee <span className="font-semibold">R22</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/cappuccino.png" alt="Cappuccino" width={32} height={32} className="rounded mr-2" />
                      Cappuccino <span className="font-semibold">R28</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/hot-chocolate.png" alt="Hot Chocolate" width={32} height={32} className="rounded mr-2" />
                      Hot Chocolate <span className="font-semibold">R28</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/drink.png" alt="Refresher" width={32} height={32} className="rounded mr-2" />
                      Refresher <span className="font-semibold">R25</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/water-bottle.png" alt="Still" width={32} height={32} className="rounded mr-2" />
                      Still <span className="font-semibold">R15</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/cola.png" alt="Coke" width={32} height={32} className="rounded mr-2" />
                      Coke <span className="font-semibold">R15</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <Image src="/Icons/iced-coffee.png" alt="Iced Coffee" width={32} height={32} className="rounded mr-2" />
                      Iced Coffee <span className="font-semibold">R28</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div>
                  <h4 className="text-xl font-bold mb-2">Sandwiches</h4>
                  <ul className="space-y-1">
                    <li>Stacked Dagwood <span className="float-right font-semibold">R52</span></li>
                    <li>Chicken & Mayo <span className="float-right font-semibold">R34</span></li>
                    <li>Ham & Cheese <span className="float-right font-semibold">R32</span></li>
                    <li>Wors Roll <span className="float-right font-semibold">R35</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Chicken</h4>
                  <ul className="space-y-1">
                    <li>Chicken Wrap <span className="float-right font-semibold">R56</span></li>
                    <li>Chicken Strips <span className="float-right font-semibold">R36</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Category Tabs */}
            {/* Category Tabs removed as requested */}
          </motion.div>

          {/* Menu Grid */}
          {/* Menu Grid removed: menuItems array is empty and type errors present. */}

          {/* Download Menu Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <a
              href="/Document/slaqa_salon_1771753993897.pdf"
              download
              className="inline-flex items-center justify-center gap-2 bg-black-900 text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
            >
              Download Full Menu <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          GALLERY SECTION
      ═══════════════════════════════════ */}
      <section className="bg-black-900 py-16 md:py-24 overflow-hidden border-b border-black-900">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ ease: 'easeOut', duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col items-center justify-center text-center mb-8">
              <span className="text-xs uppercase tracking-[0.22em] text-[#FFFF00] font-semibold">Visual Journey</span>
              <h2 className="text-4xl md:text-5xl font-black text-white mt-4 leading-tight">A Glimpse Into Our Café Life</h2>
              <p className="text-white/60 text-lg mt-4 max-w-2xl">The aroma, the smiles, and the flavors that make Nambita Café special.</p>
            </div>

            {/* Instagram Gallery Fetch */}
            <div className="mb-8 flex flex-col items-center justify-center text-center">
              <p className="text-white/80 text-base mb-2">Want to see our latest café moments?</p>
              <a
                href="https://www.instagram.com/nambitacafe/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#FFFF00] text-black-900 font-bold px-6 py-3 rounded-full text-sm uppercase tracking-wider hover:bg-white transition-colors duration-200 mb-4"
              >
                View Instagram Gallery
                <Instagram size={20} className="text-black-900" />
              </a>
              <p className="text-white/60 text-xs">Gallery images are updated from our Instagram page. Click above to see more or contact us to feature your photo!</p>
            </div>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Static Gallery Images */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.05 }} className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[400px] group cursor-pointer hover:border-[#FFFF00]/50 transition-all duration-300">
              <Image src="/Images/slaqa_salon_1771754495761.jpeg" alt="Gallery Image 1" width={300} height={400} className="object-cover w-full h-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.10 }} className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[400px] group cursor-pointer hover:border-[#FFFF00]/50 transition-all duration-300">
              <Image src="/Images/slaqa_salon_1771754683173.jpeg" alt="Gallery Image 2" width={300} height={400} className="object-cover w-full h-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.15 }} className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[400px] group cursor-pointer hover:border-[#FFFF00]/50 transition-all duration-300">
              <Image src="/Images/slaqa_salon_1771754825219.jpeg" alt="Gallery Image 3" width={300} height={400} className="object-cover w-full h-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.20 }} className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[400px] group cursor-pointer hover:border-[#FFFF00]/50 transition-all duration-300">
              <Image src="/Images/slaqa_salon_1771754797744.jpeg" alt="Gallery Image 4" width={300} height={400} className="object-cover w-full h-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.25 }} className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[400px] group cursor-pointer hover:border-[#FFFF00]/50 transition-all duration-300">
              <Image src="/Images/slaqa_salon_1771754720176.jpeg" alt="Gallery Image 5" width={300} height={400} className="object-cover w-full h-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.30 }} className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[400px] group cursor-pointer hover:border-[#FFFF00]/50 transition-all duration-300">
              <Image src="/Images/slaqa_salon_1771754537497.jpeg" alt="Gallery Image 6" width={300} height={400} className="object-cover w-full h-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.35 }} className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[400px] group cursor-pointer hover:border-[#FFFF00]/50 transition-all duration-300">
              <Image src="/Images/slaqa_salon_1771749933228.jpeg" alt="Gallery Image 7" width={300} height={400} className="object-cover w-full h-full" />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false }} transition={{ duration: 0.5, delay: 0.40 }} className="relative bg-white/5 border border-white/10 rounded-lg overflow-hidden h-[400px] group cursor-pointer hover:border-[#FFFF00]/50 transition-all duration-300">
              <Image src="/Images/slaqa_salon_1771749827810.jpeg" alt="Gallery Image 8" width={300} height={400} className="object-cover w-full h-full" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          TESTIMONIALS SECTION
      ═══════════════════════════════════ */}
      <section className="bg-[#FFFF00] py-16 md:py-24 overflow-hidden border-b border-white/8">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ ease: 'easeOut', duration: 0.6 }}
            className="mb-12"
          >
            <span className="text-xs uppercase tracking-[0.22em] text-[#FFFF00] font-semibold">Love from Our Community</span>
            <h2 className="text-4xl md:text-5xl font-black text-black-900 mt-4 leading-tight">What Our Customers Say</h2>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <motion.article
                key={testimonial.id}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ ease: 'easeOut', duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-8 space-y-4 hover:border-[#FFFF00]/50 transition-all duration-300"
              >
                <p className="text-black-900 italic text-lg leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="pt-4 border-t border-black-900">
                  <p className="font-semibold text-black-900">{testimonial.author}</p>
                  <p className="text-black-900 text-sm">{testimonial.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          VISIT US SECTION
      ═══════════════════════════════════ */}
      <section id="visit" className="bg-black-900 py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-5">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false }}
            transition={{ ease: 'easeOut', duration: 0.6 }}
            className="text-center"
          >
            <span className="text-xs uppercase tracking-[0.22em] text-[#FFFF00] font-semibold">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-4 mb-12 leading-tight">Visit Nambita Café</h2>

            {/* Location Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Location */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 border border-white/10 rounded-lg p-8 space-y-4"
              >
                <div className="flex justify-center">
                  <Image src="/Icons/location (4).png" alt="Location Icon" width={32} height={32} />
                </div>
                <h3 className="text-white font-semibold text-lg">Location</h3>
                <p className="text-white/60">
                  [Insert café address]
                  <br />
                  <span className="text-sm">Walking distance from Slaqa Salon</span>
                </p>
              </motion.div>

              {/* Hours */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-lg p-8 space-y-4"
              >
                <div className="flex justify-center">
                  <Image src="/Icons/wall-clock.png" alt="Clock Icon" width={32} height={32} />
                </div>
                <h3 className="text-white font-semibold text-lg">Hours</h3>
                <p className="text-white/60">
                  08:00 AM - 18:00 PM
                  <br />
                  <span className="text-sm">Open 7 days a week</span>
                </p>
              </motion.div>

              {/* Contact */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 border border-white/10 rounded-lg p-8 space-y-4"
              >
                <div className="flex justify-center">
                  <Image src="/Icons/phone (2).png" alt="Phone Icon" width={32} height={32} />
                </div>
                <h3 className="text-white font-semibold text-lg">Contact</h3>
                <p className="text-white/60">
                  [Insert phone number]
                  <br />
                  <a
                    href="https://wa.me/27..."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#FFFF00] hover:text-white transition-colors"
                  >
                    WhatsApp Us
                  </a>
                </p>
              </motion.div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-white/60 text-lg">Ready for a taste of home?</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#FFFF00] text-black-900 font-black px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
                >
                  Get Directions <MapPin size={16} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          FOOTER CTA
      ═══════════════════════════════════ */}
      <section className="bg-[#FFFF00] py-12 md:py-16 overflow-hidden border-t border-white/8">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-black text-black-900">
              Part of the Slaqa Family
            </h2>
            <p className="text-black-900/80 text-base md:text-lg">
              Discover more from Slaqa Salon and Slaqa Cosmetics
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <Link
                href="/barbers"
                className="inline-flex items-center justify-center gap-2 bg-black-900 text-white font-semibold px-6 py-3 rounded-full text-sm uppercase tracking-wider hover:bg-white hover:text-black-900 transition-colors duration-200"
              >
                Slaqa Salon
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 bg-black-900 text-white font-semibold px-6 py-3 rounded-full text-sm uppercase tracking-wider hover:bg-white hover:text-black-900 transition-colors duration-200"
              >
                Slaqa Cosmetics
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
