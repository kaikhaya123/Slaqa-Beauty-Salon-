'use client'

import { useEffect, useState } from 'react'
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
      <div className="absolute inset-0">
        <video
          className="w-full h-full object-cover transition-opacity duration-700"
          autoPlay
          muted
          loop
          playsInline
          style={{ opacity: visible ? 1 : 0 }}
        >
          <source src="/Video/7697537-hd_1920_1080_30fps.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50" />
      </div>
    </Section>
  )
}
