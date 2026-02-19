'use client'

import { BARBERS } from '@/lib/constants'
import { Service, Barber } from '@/lib/types'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'

interface BarberSelectorProps {
  service: Service
  onSelect: (barber: Barber) => void
  onBack: () => void
}

export default function BarberSelector({ service, onSelect, onBack }: BarberSelectorProps) {
  const availableBarbers = BARBERS
  const [selectedBarber, setSelectedBarber] = useState<Barber | null>(null)
  const [imgErrorIds, setImgErrorIds] = useState<Record<string, boolean>>({})

  // Auto-select the only barber
  useEffect(() => {
    if (availableBarbers.length === 1 && !selectedBarber) {
      setSelectedBarber(availableBarbers[0])
      onSelect(availableBarbers[0])
    }
  }, [availableBarbers, selectedBarber, onSelect])

  const handleSelect = (barber: Barber) => {
    console.log('BarberSelector - Selected barber:', barber, 'ID:', barber.id, 'type:', typeof barber.id)
    setSelectedBarber(barber)
    onSelect(barber)
  }

  return (
    <div className="space-y-12">
      
      {/* Header */}
      <div className="relative">
        <button
          onClick={onBack}
          className="text-gold-600 hover:text-gold-700 text-sm absolute left-0 top-0"
        >
          ← Back to services
        </button>

        <div className="min-h-[120px] flex flex-col items-center justify-center">
          <h2 className="text-3xl md:text-4xl font-black text-black-900 text-center">
            YOUR BARBER
          </h2>

          <p className="text-gray-600 mt-2 text-center">
            Service: <span className="font-semibold">{service.name}</span>
          </p>
        </div>
      </div>

      {/* Featured Section */}
      {selectedBarber && (
        <section className="w-full mx-auto max-w-7xl px-6 mb-10">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative rounded-3xl overflow-hidden bg-black shadow-2xl"
            >
              <div className="relative h-[420px] md:h-[520px]">
                <Image
                  src={
                    imgErrorIds[selectedBarber.id]
                      ? '/Images/1767460172187.webp'
                      : selectedBarber.image
                  }
                  alt={selectedBarber.name}
                  fill
                  className="object-cover"
                  onError={() =>
                    setImgErrorIds(prev => ({ ...prev, [selectedBarber.id]: true }))
                  }
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute bottom-6 left-6">
                  <p className="text-cream-200 text-sm tracking-wide mb-2">SELECTED BARBER</p>
                  <h3 className="text-3xl md:text-4xl font-black text-white">{selectedBarber.name}</h3>
                  <p className="text-cream-200 mt-1">{selectedBarber.title}</p>
                </div>

                <div className="absolute top-6 right-6 bg-white rounded-full p-2 text-gold-600 shadow-lg">
                  <CheckCircle className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>
      )}

      {/* Available barbers */}
      <section className="w-full mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-center">
          {selectedBarber && (
            <motion.div
              key={selectedBarber.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-lg overflow-hidden text-left bg-gray-900 shadow-2xl ring-4 ring-gold-500 w-full sm:w-[300px] md:w-[360px]"
            >
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src={
                    imgErrorIds[selectedBarber.id]
                      ? '/Images/1767460172187.webp'
                      : selectedBarber.image
                  }
                  alt={selectedBarber.name}
                  fill
                  className="object-cover"
                  onError={() =>
                    setImgErrorIds(prev => ({ ...prev, [selectedBarber.id]: true }))
                  }
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-white font-black text-2xl md:text-3xl leading-tight mb-1">
                        {selectedBarber.name}
                      </h4>
                      <p className="text-gray-200 text-sm">{selectedBarber.title}</p>
                      <p className="text-gray-100 text-xs mt-2">{selectedBarber.experience} experience</p>
                    </div>
                    <div className="bg-white rounded-full p-2 text-gold-600 shadow-lg flex-shrink-0">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
