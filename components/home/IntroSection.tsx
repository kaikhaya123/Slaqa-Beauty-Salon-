'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import Button from '@/components/ui/Button'

export default function IntroSection() {
  type IntroImage = {
    src: string
    alt: string
  }

  const images: IntroImage[] = [
    {
      src: '/Images/pexels-rafael-quaty-37077235-13450758.jpg',
      alt: 'Barber performing a clean fade haircut',
    },
    {
      src: '/Images/pexels-sephina-cornwall-759251776-32351047.jpg',
      alt: 'Barber shop interior with tools and mirrors',
    },
    {
      src: '/Images/pexels-rdne-7697383.jpg',
      alt: 'Barber shaping a haircut with clippers',
    },
    {
      src: '/Images/bapesidechick (1).jpg',
      alt: 'Barber finishing a fade haircut',
    },
    {
      src: '/Images/download (20).jpg',
      alt: 'Fresh haircut with clean lineup',
    },
    { src: '/Images/clinton-dube-84lpzy66IZk-unsplash.jpg', alt: 'Add image description' },
    { src: '/Images/download (1).jpg', alt: 'Add image description' },
    // Add or replace images here.
    // Add or replace images here.
    // Example:
    // { src: '/Images/your-image.jpg', alt: 'Describe the image' },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length)
    }, 3500)

    return () => clearInterval(interval)
  }, [images.length])


  return (
    <section
      className="bg-cream-50 py-20 md:py-28 font-sans"
      role="region"
      aria-labelledby="intro-heading"
    >
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center min-h-[75vh]">

          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-10"
          >
            <div className="space-y-5">
              <h2
                id="intro-heading"
                className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-dark-900 leading-tight"
              >
                More than a haircut.
                <span className="block text-gray-600 text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold">
                  It&#39;s a culture.
                </span>
              </h2>

              <p className="text-lg md:text-xl text-dark-700 leading-relaxed max-w-lg">
                Premium haircuts by skilled barbers in Lamontville. Clean fades,
                precise grooming, modern style.
              </p>
            </div>

            {/* Key Points */}
            <ul className="space-y-3 max-w-md">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-dark-900 rounded-full mt-2" />
                <span className="text-dark-800 font-medium">
                  Experienced professional barbers
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-dark-900 rounded-full mt-2" />
                <span className="text-dark-800 font-medium">
                  Premium tools and products
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 bg-dark-900 rounded-full mt-2" />
                <span className="text-dark-800 font-medium">
                  Comfortable, welcoming space
                </span>
              </li>
            </ul>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button
                href="/book"
                size="lg"
                variant="primary"
                className="w-full sm:w-auto"
              >
                Book Appointment
              </Button>
              <Button
                href="/barbers"
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Meet the Barbers
              </Button>
            </div>
          </motion.div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative h-[520px] md:h-[650px] rounded-2xl overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={images[activeIndex].src}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={images[activeIndex].src}
                    alt={images[activeIndex].alt}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

          </motion.div>
        </div>

        {/* Community Impact Gallery removed */}

      </div>
    </section>
  )
}
