'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import sceneAnimation from '@/public/lottie/Scene.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function FollowRealBarbershop() {
  return (
    <section className="py-20 md:py-28 bg-[#FFFF00]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <span className="text-sm uppercase tracking-widest font-medium text-black" style={{ fontFamily: 'Quando' }}>
              Stay connected
            </span>

            <motion.h2 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black leading-tight"
              style={{ fontFamily: 'Quando' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Follow Slaqa Salon
            </motion.h2>

            <motion.p 
              className="text-lg md:text-xl text-black leading-relaxed max-w-lg"
              style={{ fontFamily: 'Quando' }}
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
                { name: 'Instagram', url: 'https://www.instagram.com/slaqa_salon/', icon: '/Icons/instagram (2).png' },
                { name: 'Facebook', url: 'https://www.facebook.com/slaqa_salon', icon: '/Icons/facebook.png'},
                { name: 'TikTok', url: 'https://www.tiktok.com/@slaqasalon', icon: '/Icons/tik-tok.png' },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 flex items-center justify-center rounded-full bg-black hover:bg-gray-900 active:scale-95 transition shadow-lg transform duration-200 hover:scale-110"
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
              className="text-sm text-black font-medium"
              style={{ fontFamily: 'Quando' }}
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
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-lg"
            >
              <Lottie
                animationData={sceneAnimation}
                loop
                autoplay
                className="w-full h-auto"
              />
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
