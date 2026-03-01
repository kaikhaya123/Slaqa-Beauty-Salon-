'use client'

import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export interface Testimonial {
  description: string
  image: string
  name: string
  handle: string
}

interface AnimatedTestimonialsProps {
  data: Testimonial[]
  autoplay?: boolean
  autoplayInterval?: number
}

export function AnimatedTestimonials({
  data,
  autoplay = true,
  autoplayInterval = 4000,
}: AnimatedTestimonialsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isAutoplay, setIsAutoplay] = useState(autoplay)

  useEffect(() => {
    if (!isAutoplay) return

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % data.length)
    }, autoplayInterval)

    return () => clearInterval(interval)
  }, [isAutoplay, data.length, autoplayInterval])

  const handlePrev = () => {
    setIsAutoplay(false)
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length)
  }

  const handleNext = () => {
    setIsAutoplay(false)
    setActiveIndex((prev) => (prev + 1) % data.length)
  }

  const active = data[activeIndex]

  return (
    <div className="w-full bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-black-900 mb-4 leading-none">
            Trusted by<br />
            <span className="text-black-900">Durban</span>
          </h2>
          <p className="text-base sm:text-lg text-black-900/80 max-w-2xl mx-auto">
            Real words from real clients — Experience what makes us different.
          </p>
        </motion.div>

        {/* Testimonial Container */}
        <div className="relative">
          {/* Main Testimonial Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="relative bg-white rounded-2xl border border-black-900/10 p-8 md:p-12 shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            {/* Quote Icon */}
            <div className="absolute -top-6 left-8 sm:left-12">
              <div className="size-12 rounded-full bg-[#FFFF00] border-4 border-white flex items-center justify-center shadow-lg">
                <svg className="size-6 text-black-900" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C14.8079 14 13.017 12.2091 13.017 10V5H21.017V16L19.017 21H14.017ZM3.01709 21L3.01709 18C3.01709 16.8954 3.91252 16 5.01709 16H8.01709V14H6.01709C3.80795 14 2.01709 12.2091 2.01709 10V5H10.0171V16L8.01709 21H3.01709Z" />
                </svg>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              {/* Image */}
              <motion.div
                key={`image-${activeIndex}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="flex justify-center md:justify-start"
              >
                <div className="relative size-48 sm:size-56 rounded-xl overflow-hidden border-4 border-[#FFFF00] shadow-lg">
                  <Image
                    src={active.image}
                    alt={active.name}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </motion.div>

              {/* Text Content */}
              <div className="md:col-span-2 flex flex-col justify-between h-full">
                <div>
                  {/* Description */}
                  <motion.blockquote
                    key={`quote-${activeIndex}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-xl sm:text-2xl md:text-2xl font-semibold text-black-900 mb-8 leading-relaxed italic"
                  >
                    &ldquo;{active.description}&rdquo;
                  </motion.blockquote>
                </div>

                {/* Author Info */}
                <motion.div
                  key={`author-${activeIndex}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex flex-col"
                >
                  <p className="text-lg font-black text-black-900">{active.name}</p>
                  <p className="text-sm text-black-900/60 font-medium">{active.handle}</p>

                  {/* Navigation Buttons */}
                  <div className="flex gap-3 mt-6">
                    <button
                      onClick={handlePrev}
                      aria-label="Previous testimonial"
                      className="inline-flex items-center justify-center size-12 rounded-full bg-[#FFFF00] text-black-900 hover:bg-[#FFFF00]/90 transition-colors duration-200 font-bold"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      aria-label="Next testimonial"
                      className="inline-flex items-center justify-center size-12 rounded-full bg-[#FFFF00] text-black-900 hover:bg-[#FFFF00]/90 transition-colors duration-200 font-bold"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-12">
            {data.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setIsAutoplay(false)
                  setActiveIndex(index)
                }}
                className={`rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-black-900 w-8 h-3'
                    : 'bg-black-900/30 w-3 h-3 hover:bg-black-900/50'
                }`}
                whileHover={{ scale: 1.2 }}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          {/* Autoplay Toggle */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              className="text-sm font-semibold text-black-900/60 hover:text-black-900 transition-colors underline"
            >
              {isAutoplay ? '⏸ Pause autoplay' : '▶ Resume autoplay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnimatedTestimonials
