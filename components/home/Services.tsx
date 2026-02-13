"use client"

import Image from 'next/image'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { useState, useEffect, useRef } from 'react'

export default function Services() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const containerRef = useRef(null)
  
  const services = [
    {
      id: 1,
      name: 'DROP FADE & DYE',
      price: 150,
      duration: '45 min',
      image: '/Images/1767772041818.jpeg',
      description: 'Traditional haircut with modern finishing touches'
    },
    {
      id: 2,
      name: 'TAPER FADE & DYE',
      price: 150,
      duration: '60 min', 
      image: '/Images/1767771187352.jpeg',
      description: 'Precision fade with personalized styling'
    },
    {
      id: 3,
      name: 'FADE & DYE',
      price: 150,
      duration: '60 min', 
      image: '/Images/Dye cut .jpeg',
      description: 'Precision fade with personalized styling'
    },
    {
      id: 4,
      name: 'KIDDIES CUT & STYLE',
      price: 150,
      duration: '30 min',
      image: '/Images/1767771103496.jpeg',
      description: 'Professional beard shaping and grooming'
    },
    {
      id: 5,
      name: 'KIDDIES FADE & DYE',
      price: 150,
      duration: '45 min',
      image: '/Images/1767770857424.jpeg',
      description: 'Traditional wet shave with hot towel treatment'
    },
    {
      id: 6,
      name: 'PLAIN FADE',
      price: 60,
      duration: '45 min',
      image: '/Images/1767770790764.jpeg',
      description: 'Traditional wet shave with hot towel treatment'
    },
    {
      id: 7,
      name: 'FADE DYE WITH DESIGNS',
      price: 200,
      duration: '45 min',
      image: '/Images/WhatsApp Image 2026-01-07 at 10.20.34.jpeg',
      description: 'Traditional haircut with modern finishing touches'
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % services.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + services.length) % services.length)
  }

  const visibleServices = [services[currentSlide]]

  // Touch swipe functionality
  const minSwipeDistance = 50

  interface TouchEventType extends React.TouchEvent<HTMLDivElement> {}

  interface Service {
    id: number;
    name: string;
    price: number;
    duration: string;
    image: string;
    description: string;
  }

  const onTouchStart = (e: TouchEventType) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  interface OnTouchMoveEvent extends React.TouchEvent<HTMLDivElement> {}

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
    <Section background="white" padding="lg">
      <div className="max-w-7xl mx-auto">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Text Content */}
          <div>
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-dark-900 mb-6 leading-tight tracking-wide">
                Our Professional<br />
                Services
              </h2>
              <p className="text-base md:text-lg text-dark-600 mb-6 leading-relaxed">
                Choose from our range of premium grooming services, each delivered with precision and care by our experienced barbers.
              </p>
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-black text-dark-900 mb-2 tracking-wide">
                  Quality You Can Trust.
                </h3>
                <h3 className="text-2xl md:text-3xl font-black text-accent-600 tracking-wide">
                  Style You&#39;ll Love.
                </h3>
              </div>
              
              <div className="flex items-center gap-2 sm:gap-4 flex-nowrap whitespace-nowrap overflow-x-auto">
                <Button 
                  asLink 
                  href="/book" 
                  variant="primary" 
                  size="md"
                  className="bg-dark-900 hover:bg-dark-800 whitespace-nowrap text-white"
                >
                  Book Your Service →
                </Button>

                <Button
                  asLink
                  href="/services"
                  variant="outline"
                  size="md"
                  className="border-dark-200 text-dark-700 hover:bg-dark-900 hover:text-white hover:border-dark-900 whitespace-nowrap"
                >
                  View All Styles
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Swipeable Service Cards */}
          <div className="relative">
            <div 
              ref={containerRef}
              className="flex justify-center transition-all duration-500"
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {visibleServices.map((service, index) => (
                <div key={service.id} className="group cursor-pointer w-full max-w-[350px]">
                  <div className="bg-white shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden h-[400px] w-full rounded-lg">
                    {/* Service Image */}
                    <div className="relative h-[400px] overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-black/40"></div>
                      
                      {/* Service Info - Bottom Left Corner */}
                      <div className="absolute bottom-4 left-4">
                        <h3 className="text-2xl font-black text-white mb-1 tracking-wide">
                          {service.name}
                        </h3>
                        <div className="text-3xl font-black text-black tracking-wide">
                          R{service.price}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Controls - Below Images */}
            <div className="flex items-center justify-center space-x-4 mt-8">
              <Button 
                onClick={prevSlide}
                variant="outline" 
                size="sm"
                className="border-dark-200 text-dark-700 hover:bg-dark-900 hover:text-white hover:border-dark-900"
              >
                ←
              </Button>
              <div className="flex space-x-2">
                {services.map((_, index) => (
                  <div
                    key={index}
                    className={`w-8 h-2 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-dark-900' : 'bg-gray-300'
                    }`}
                  ></div>
                ))}
              </div>
              <Button 
                onClick={nextSlide}
                variant="outline" 
                size="sm"
                className="border-dark-200 text-dark-700 hover:bg-dark-900 hover:text-white hover:border-dark-900"
              >
                →
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}
