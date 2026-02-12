'use client'

import Section from '@/components/ui/Section'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.6 },
    }),
  }

  return (
    <div>
      {/* Full Screen Hero Image Section */}
      <div className="relative w-full h-screen -mt-24 pt-24 bg-gray-900 overflow-hidden">
        {/* TODO: Add your hero image to: /public/Images/about-hero.jpg */}
        <Image
          src="/Images/nathon-oski-EW_rqoSdDes-unsplash.jpg"
          alt="Pro Barber Shop - Hero"
          fill
          className="object-cover"
          priority
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Hero Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            custom={0}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              About Pro Barber Shop
            </h1>
          </motion.div>
        </div>
      </div>

      {/* Page Content */}
      <div className="pt-0 pb-16">

      {/* Our Story */}
      <Section className="mb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={1}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          <div>
            <h2 className="text-2xl font-bold text-black mb-4">Our Story</h2>
            <p className="text-black mb-4 leading-relaxed">
              Pro Barber Shop was founded with a simple mission: to bring world-class barbering 
              services to Durban, in the township of lamontiville. We believe that a fresh haircut is more than just clean fade&mdash;it&apos;s 
              about confidence, style, and self-expression.
            </p>
            <p className="text-black mb-4 leading-relaxed">
              From our establishment in the township of lamontiville, we&apos;ve built a loyal community of clients who 
              appreciate quality craftsmanship, attention to detail, and genuine customer care. 
Every barber on our team is hand-picked for their skill and passion for the craft. </p> <p className="text-black leading-relaxed"> Today, we&apos;re proud to offer both traditional walk-in services and modern digital booking solutions, making it easier than ever to get the cut you deserve. </p> </div> <div className="relative h-80 rounded-lg overflow-hidden shadow-lg bg-white">
            {/* Hero Image Placeholder - Replace with your shop image */}
            {/* TODO: Add hero image path to: /public/Images/about-hero.jpg or .png */}
            <Image
              src="/Images/pexels-rdne-7697476.jpg"
              alt="Pro Barber Shop  - Our Story"
              fill
              className="object-cover"
              onError={(e) => {
                // Fallback to placeholder if image not found
                e.currentTarget.style.display = 'none'
              }}
            />

          </div>
        </motion.div>
      </Section>

      {/* Our Values */}
      <Section className="mb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Excellence',
                description: 'We deliver exceptional results with every cut, fade, and trim. Quality is non-negotiable.',
              },
              {
                title: 'Professionalism',
                description: 'Our team maintains the highest standards of hygiene, punctuality, and customer service.',
              },
              {
                title: 'Innovation',
                description: 'We blend traditional barbering techniques with modern technology and digital convenience.',
              },
            ].map((value, idx) => (
              <motion.div
                key={idx}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={2.3 + idx * 0.1}
                className="bg-white"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* Why Choose Us */}
      <Section className="mb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why Choose Pro Barber Shop?</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                title: 'Expert Barbers',
                description: 'Expert barbers with years of experience and proven track records',
                // TODO: Add icon image path - icon_expert_barbers.svg or .png
                icon: '/Icons/man.png',
              },
              {
                title: 'Specialized Services',
                description: 'Specialized services for all hair types and styles',
                // TODO: Add icon image path - icon_specialized_services.svg or .png
                icon: '/Icons/haircut.png',
              },
              {
                title: 'Flexible Booking',
                description: 'Flexible booking system—appointments or walk-ins welcome',
                // TODO: Add icon image path - icon_flexible_booking.svg or .png
                icon: '/Icons/online-booking.png',
              },
              {
                title: 'Digital Queue',
                description: 'Digital queue system for reduced wait times',
                // TODO: Add icon image path - icon_digital_queue.svg or .png
                icon: '/Icons/line.png',
              },
              {
                title: 'Hygiene Standards',
                description: 'Strict hygiene protocols and sanitization standards',
                // TODO: Add icon image path - icon_hygiene.svg or .png
                icon: '/Icons/hygiene.png',
              },
              {
                title: 'Competitive Pricing',
                description: 'Competitive pricing for premium quality services',
                // TODO: Add icon image path - icon_pricing.svg or .png
                icon: '/Icons/money.png',
              },
              {
                title: 'Convenient Location',
                description: 'Convenient Lamontville location in Chatsworth, Durban',
                // TODO: Add icon image path - icon_location.svg or .png
                icon: '/Icons/location (2).png',
              },
              {
                title: 'Welcoming Atmosphere',
                description: 'Friendly, welcoming atmosphere for all clients',
                // TODO: Add icon image path - icon_atmosphere.svg or .png
                icon: '/Icons/agreement.png',
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                custom={3.2 + idx * 0.05}
                className="flex items-start space-x-4 p-4 bg-white rounded-lg border border-gray-100 hover:border-gray-300 transition-colors"
              >
                {/* Icon/Image Placeholder - Replace with your icon */}
                {item.icon ? (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={64}
                    height={64}
                    className="flex-shrink-0 w-16 h-16 object-contain"
                  />
                ) : (
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-xs font-semibold text-center">
                    {item.title.split(' ')[0]}
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>
      {/* Ready to Look Fresh CTA Banner */}
      <div className="relative w-full h-96 mb-16 rounded-lg overflow-hidden shadow-lg bg-gray-100">
        {/* TODO: Add banner image to: /public/Images/cta-banner.jpg or .png */}
        <Image
          src="/Images/mid-section-view-barber-shaking-hand-with-male-client.jpg"
          alt="Ready to Look Fresh Banner"
          fill
          className="object-cover"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        {/* Banner Content */}
        <div className="relative h-full flex items-center justify-center text-center px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            custom={5}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Look Fresh?</h2>
            <p className="text-base md:text-lg text-gray-100 mb-8">
              Get the sharp, professional look you deserve. Book your appointment today and experience Pro Barber Shop excellence.
            </p>
            <a
              href="/book"
              className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Book Now
            </a>
          </motion.div>
        </div>
      </div>
      </div>
    </div>
  )
}
