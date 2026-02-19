'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { BARBERS as SITE_BARBERS } from '../../lib/constants'

const PREVIEW = SITE_BARBERS

export default function BarbersSection() {
  const [imgError, setImgError] = useState<Record<string, boolean>>({})

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.section 
      className="py-16 lg:py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Link href="/barbers" className="hover:underline">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-black-900 mb-12">
              MEET YOUR BARBER
            </h2>
          </Link>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {PREVIEW.map((b, index) => (
            <motion.div
              key={b.id}
              className="w-full max-w-[360px]"
              variants={itemVariants}
              whileHover={{ y: -10 }}
            >
              <Link
                href={`/barbers#${String(b.id).toLowerCase()}`}
                className="group relative w-full sm:w-[300px] md:w-[360px] rounded-2xl overflow-hidden shadow-2xl"
              >
                <motion.div 
                  className="relative w-full aspect-[4/5] bg-gray-100"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  {!imgError[b.id] ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                    >
                      <Image
                        src="/Images/Fuze Ngcobo.jpeg"
                        alt={`${b.name} barber`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 40vw"
                        priority
                        onError={() => setImgError(prev => ({ ...prev, [b.id]: true }))}
                      />
                    </motion.div>
                  ) : (
                    <motion.div 
                      className="w-full h-full bg-gradient-to-br from-gold-500 to-gold-700 flex flex-col items-center justify-center text-white"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                    >
                      <motion.div 
                        className="text-5xl font-black mb-4"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                      >
                        {b.name
                          .split(' ')
                          .map(n => n[0])
                          .join('')}
                      </motion.div>
                      <div className="text-sm font-semibold text-center px-4">{b.name}</div>
                    </motion.div>
                  )}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.1 }}
                  />

                  {/* Barber Info */}
                  <motion.div 
                    className="absolute left-4 bottom-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                  >
                    <h3 className="text-2xl font-extrabold text-white drop-shadow-lg">{b.name}</h3>
                    <p className="text-gray-100 text-sm mt-1">{b.title}</p>
                  </motion.div>

                  {/* Plus Icon */}
                  <motion.div 
                    className="absolute right-4 bottom-4"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                    whileHover={{ scale: 1.2, rotate: 90 }}
                  >
                    <div className="h-8 w-8 rounded-full bg-white/90 flex items-center justify-center text-black-900 shadow">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  )
}