"use client"

import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { SERVICES } from '@/lib/constants'

interface TouchEventType extends React.TouchEvent<HTMLDivElement> {}

interface Service {
  id: number;
  name: string;
  price: number;
  duration: string;
  image: string;
  description: string;
}

interface OnTouchMoveEvent extends React.TouchEvent<HTMLDivElement> {}

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef(null)
  
  const services = SERVICES

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  }

  const visibleServices = [services[currentSlide]]

  // Touch swipe functionality
  const minSwipeDistance = 50

  const onTouchStart = (e: TouchEventType) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: OnTouchMoveEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance
    
    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
  }

  return (
    <Section background="black" padding="lg" className="w-full bg-black">
      <div className="w-full bg-black">
        <div className="max-w-7xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <motion.h2 
                className="text-4xl md:text-5xl lg:text-6xl font-black text-[#FFFF00] mb-6 leading-tight tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Our Services<br />
                Excellence Every Time
              </motion.h2>
            <motion.p 
              className="text-base md:text-lg text-white mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              From barbering and hair styling to beauty treatments and special event work, Slaqa delivers professional services with excellence across all three locations.
            </motion.p>
            </div>
            <div className="mb-8">
              <motion.h3 
                className="text-2xl md:text-3xl font-black text-[#FFFF00] mb-2 tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                Beauty & Lifestyle
              </motion.h3>
              <motion.h3 
                className="text-2xl md:text-3xl font-black text-white tracking-wide"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Professional Standards.
              </motion.h3>
            </div>
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Button 
                  asChild
                  variant="default" 
                  size="default"
                  className="bg-[#FFFF00] hover:bg-[#FFFF00] whitespace-nowrap text-black-900"
                >
                  <Link href="/book">
                    Book Your Service →
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="default"
                  className="border-white text-white hover:bg-[#FFFF00] hover:text-black-900 hover:border-white whitespace-nowrap"
                >
                  <Link href="/services">
                    View All Styles
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

          {/* Right Side - Swipeable Service Cards */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              ref={containerRef}
              className="flex justify-center transition-all duration-500"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {visibleServices.map((service, index) => (
                <motion.div 
                  key={service.id} 
                  className="group cursor-pointer w-full max-w-[350px]"
                  whileHover={{ y: -10 }}
                >
                  <motion.div 
                    className="bg-[#FFFF00] shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-[400px] w-full rounded-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    {/* Service Image */}
                    <div className="relative h-[400px] overflow-hidden">
                      <motion.div
                        initial={{ scale: 1.2 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                      >
                        <Image
                          src={service.image}
                          alt={service.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent"></div>
                      
                      {/* Service Info - Bottom Left Corner */}
                      <motion.div 
                        className="absolute bottom-4 left-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                      >
                        <motion.h3 
                          className="text-2xl font-black text-white mb-1 tracking-wide"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.5 }}
                        >
                          {service.name}
                        </motion.h3>
                        <motion.div 
                          className="text-3xl font-black text-white tracking-wide"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          R{service.price}
                        </motion.div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Navigation Controls - Below Images */}
            <motion.div 
              className="flex items-center justify-center space-x-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button 
                onClick={prevSlide}
                variant="outline" 
                size="sm"
                className="bg-black-900 border-black-900 text-white hover:black-900 font-black-900"
              >
                ←
              </Button>
              <motion.div 
                className="flex space-x-2"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                {services.map((_, index) => (
                  <motion.div
                    key={index}
                    layout
                    className={`w-8 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-[#FFFF00]' : 'bg-white'
                    }`}
                    animate={{
                      scale: index === currentSlide ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                ))}
              </motion.div>
              <Button 
                onClick={nextSlide}
                variant="outline" 
                size="sm"
                className="bg-black-900 border-black-900 text-white hover:brightness-100 font-black-900"
              >
                →
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
      </div>
    </Section>
  )
}
