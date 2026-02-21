'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Link2, Clapperboard, Palette } from 'lucide-react'

const pillars = [
  {
    icon: Link2,
    tag: 'Brand Partnerships',
    items: [
      {
        title: 'SLAQA × BP Bridge City',
        desc: 'Creative activations that bring grooming and lifestyle together — from Valentine\'s specials to community events.',
      },
      {
        title: 'SLAQA × FARKUDE',
        desc: 'Collaborations that merge fashion, entertainment, and grooming, showcasing how style extends beyond the chair.',
      },
    ],
  },
  {
    icon: Clapperboard,
    tag: 'The Barbershow',
    items: [
      {
        title: 'More than a YouTube series',
        desc: 'A platform where artists, entrepreneurs, and cultural voices share their journeys — connecting through the clipper and blade.',
      },
      {
        title: 'Community of Creators',
        desc: 'Musicians, filmmakers, and influencers have all found a seat in the chair, cementing Slaqa as a hub for storytelling.',
      },
    ],
  },
  {
    icon: Palette,
    tag: 'Cultural Activations',
    items: [
      {
        title: 'In-Store Events',
        desc: 'Themed haircut days, lifestyle promotions, and community-driven projects — pushing the boundaries of what a salon can be.',
      },
      {
        title: 'Social Campaigns',
        desc: 'From in-store to online, every activation is built to bring the community closer and amplify Slaqa\'s cultural voice.',
      },
    ],
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { ease: 'easeOut' as const, duration: 0.6 } },
}

export default function LifestyleCollabs() {
  return (
    <section className="bg-black-900 py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 max-w-2xl"
        >
          <span className="text-xs uppercase tracking-[0.22em] text-[#FFFF00] font-semibold mb-4 block">
            Lifestyle &amp; Collaborations
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
            Grooming is just<br />
            <span className="text-[#FFFF00]">the beginning.</span>
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            At Slaqa Salon, we&apos;ve built a culture that blends style, music, and community —
            turning every haircut into part of a bigger story.
          </p>
        </motion.div>

        {/* Pillar cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-6 hover:border-[#FFFF00]/40 transition-colors duration-300"
              >
                {/* Tag */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#FFFF00] flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-black-900" strokeWidth={2.5} />
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#FFFF00] font-semibold">
                    {pillar.tag}
                  </span>
                </div>

                {/* Sub-items */}
                <div className="space-y-5 flex-1">
                  {pillar.items.map((item, j) => (
                    <div key={j} className="space-y-1.5">
                      <p className="text-white font-bold text-sm">{item.title}</p>
                      <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 flex justify-start"
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-3 bg-[#FFFF00] text-black-900 font-black px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
          >
            Discover More <ArrowRight size={16} strokeWidth={2.5} />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
