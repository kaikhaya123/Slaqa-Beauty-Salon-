'use client'

import Section from '@/components/ui/Section'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function FollowRealBarbershop() {
  return (
    <Section className="py-20 md:py-28 bg-white">
      <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <span className="text-sm uppercase tracking-widest font-medium text-gray-600">
            Stay connected
          </span>

          <motion.h2 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black-900 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Follow Slaqa
          </motion.h2>

          <motion.p 
            className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Follow our journey across three locations. See our latest cuts, styling work and special collaborations. Join our growing community of satisfied clients.
          </motion.p>

          {/* SOCIAL CTA */}
          <motion.div 
            className="mt-10 flex items-center gap-6"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {[
              { name: 'Instagram', url: 'https://www.instagram.com/slaqa_salon/', icon: '/Images/instagram.png' },
              { name: 'WhatsApp', url: 'https://wa.me/27656866171', icon: '/Images/whatsapp.png' },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 flex items-center justify-center rounded-full bg-black-900 hover:bg-gray-900 active:scale-95 transition shadow-lg transform duration-200 hover:scale-108"
                aria-label={social.name}
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 + 0.3 }}
              >
                <Image
                  src={social.icon}
                  alt={social.name}
                  width={28}
                  height={28}
                  className="invert"
                />
              </motion.a>
            ))}
          </motion.div>

          {/* MICRO TRUST */}
          <motion.p 
            className="text-sm text-gray-600 font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Stay Updated daily
          </motion.p>
        </motion.div>

        {/* RIGHT VISUAL */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, x: 20 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex justify-center items-center min-h-[600px]"
        >
          <motion.div 
            className="relative w-full max-w-sm h-auto"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Image
                src="/Images/574405738_18334801651233342_8526109735161689353_n-landscape.png"
                alt="Slaqa Salon"
                width={400}
                height={600}
                className="object-contain w-full h-auto"
                priority
              />
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </Section>
  )
}
