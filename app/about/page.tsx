'use client'

import React, { useEffect } from 'react'
import { motion } from 'motion/react'
import Image from 'next/image'

const AboutPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && document) {
      document.body.classList.add('about-header-transparent')
      return () => document.body.classList.remove('about-header-transparent')
    }
  }, [])

  return (
    <div className="bg-black-900 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-24">
        <Image
          src="/Images/yellow-feather-boa-with-copy-space.jpg"
          alt="Slaqa Salon Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center px-4 max-w-3xl"
        >
          <h1 className="text-5xl md:text-7xl font-black text-[#FFFF00] mb-4 leading-tight">
            Slaqa: Where Style Meets Culture
          </h1>
          <p className="text-xl md:text-2xl text-white drop-shadow-lg">
            Shaping confidence and community through beauty, hair, and lifestyle since 2015.
          </p>
        </motion.div>
      </section>

      {/* Founders Section */}
      <section className="max-w-7xl mx-auto py-20 px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        {/* Left: Founder Video */}
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
          <video
            src="/Video/3656156610225655993.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-contain rounded-xl"
            poster="/Images/1771342133405.jpeg"
          />
        </div>
        {/* Right: Founder Story */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          <h2 className="text-3xl md:text-4xl font-black text-[#FFFF00] mb-4">Visionaries Behind Slaqa</h2>
          <p className="text-white/80 text-lg mb-6">
            The founders established Slaqa in 2015 with the goal of redefining beauty and lifestyle in Durban&apos;s townships. Their vision was to create a brand that not only offers professional grooming but also celebrates identity, culture, and community.
          </p>
          <ul className="list-disc list-inside space-y-2 mt-4 text-white/80 mb-6">
            <li>Started with a passion for hair artistry and lifestyle branding.</li>
            <li>Expanded into multiple branches to serve diverse communities.</li>
            <li>Built a strong digital presence, now with <span className="font-bold text-[#FFFF00]">61.7K Instagram followers</span>, showcasing their influence and reach.</li>
            <li>Known for blending local authenticity with modern aesthetics, making Slaqa a recognizable name in the beauty industry.</li>
          </ul>
          <blockquote className="text-xl font-semibold text-[#FFFF00] border-l-4 border-[#FFFF00] pl-4 mb-4">
            &quot;Beauty is more than appearance&mdash;it&apos;s confidence, culture, and connection.&quot;
          </blockquote>
          <p className="text-white/80">This guiding principle drives the founders to continually innovate while staying true to their roots.</p>
        </motion.div>
      </section>

      {/* Brand Essence Section */}
      <section className="bg-[#FFFF00] py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-black text-black-900 mb-6">Brand Essence</h2>
            <p className="text-lg md:text-xl text-black-900 mb-8">
              Slaqa is a beauty, hair, and lifestyle brand that has been shaping style and confidence since 2015. With a strong presence in KwaZulu-Natal, the salon blends modern trends with authentic local culture, offering clients more than just grooming&mdash;it&apos;s a lifestyle experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-black-900 mb-4">Mission</h3>
              <p className="text-black-900 mb-6">To empower individuals through beauty and self-expression, creating spaces where style meets community. Slaqa is committed to delivering professional services while fostering creativity, confidence, and cultural pride.</p>
              
              <h3 className="text-2xl font-bold text-black-900 mb-4">Values</h3>
              <ul className="list-disc list-inside text-black-900 space-y-2">
                <li><span className="font-semibold">Authenticity:</span> Rooted in local culture and community.</li>
                <li><span className="font-semibold">Innovation:</span> Keeping up with evolving beauty and lifestyle trends.</li>
                <li><span className="font-semibold">Excellence:</span> High-quality service and customer care.</li>
                <li><span className="font-semibold">Community:</span> Building relationships beyond the salon chair.</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold text-black-900 mb-4">Locations</h3>
              <ul className="space-y-2 text-black-900 mb-8">
                <li><span className="font-semibold">Kwamashu:</span> F 206 Bhejane Road</li>
                <li><span className="font-semibold">Waterloo:</span> 46 Pricklepear Road</li>
                <li><span className="font-semibold">Umlazi:</span> A Section 1 Swaziland</li>
              </ul>
              
              <h3 className="text-2xl font-bold text-black-900 mb-4">Lifestyle Collaborations</h3>
              <p className="text-black-900">Partnerships with brands like Nambita Café and creative showcases such as The Barbershow highlight Slaqa&apos;s role as more than a salon&mdash;it&apos;s a hub for lifestyle and cultural exchange.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage
