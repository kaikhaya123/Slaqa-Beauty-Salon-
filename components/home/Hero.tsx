'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Users, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { BUSINESS_INFO } from '@/lib/constants'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden -mt-16 md:-mt-20">
      {/* Dual Image Split */}
      <div className="relative w-full h-full flex flex-col md:flex-row">
        
        {/* Left Image with Parallax */}
        <motion.div 
          className="relative w-full md:w-1/2 h-1/2 md:h-full"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src={encodeURI("/Images/daniel-mitchel.jpg")}
            alt="Pro Barber Shop ZA"
            fill
            className="object-cover object-center brightness-90 contrast-110"
            priority
            quality={100}
          />
        </motion.div>
        
        {/* Right Image with Parallax */}
        <motion.div 
          className="relative w-full md:w-1/2 h-1/2 md:h-full"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <Image
            src={encodeURI("/Images/Gemini_Generated_Image_pbg9bcpbg9bcpbg9.png")}
            alt="Short Haircut for Women"
            fill
            className="object-cover object-center md:object-left brightness-90 contrast-110"
            priority
            quality={100}
          />
        </motion.div>
        
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
        
        {/* Bottom Centered Text Overlay */}
        <motion.div 
          className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 md:px-12 pb-8 md:pb-12 pt-16 md:pt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <motion.h1 
            className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 lg:mb-6 leading-[0.9] max-w-4xl tracking-tight text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Built for your best look.
          </motion.h1>
          <motion.p 
            className="text-base md:text-lg lg:text-xl mb-8 lg:mb-10 max-w-2xl opacity-90 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Clean fades. Sharp lines. Every time.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
