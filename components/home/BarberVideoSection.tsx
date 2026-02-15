'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Section from '@/components/ui/Section'

export default function BarberVideoSection() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Section className="relative w-full h-screen min-h-screen bg-black overflow-hidden py-0">
      {/* Background Video Only */}
      <motion.div 
        className="absolute inset-0"
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2 }}
      >
        <motion.video
          className="w-full h-full object-cover transition-opacity duration-700"
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: visible ? 1 : 0 }}
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 1.5, delay: 0.3 }}
        >
          <source src="/Video/7697537-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </motion.video>

        {/* Dark Overlay with fade animation */}
        <motion.div 
          className="absolute inset-0 bg-black/50"
          initial={{ opacity: 0.3 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        />
      </motion.div>
    </Section>
  )
}
