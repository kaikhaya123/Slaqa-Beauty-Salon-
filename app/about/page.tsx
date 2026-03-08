'use client'

import React, { useEffect } from 'react'
import { About3 } from '@/components/ui/about-3'
import { LogoCarousel } from '@/components/ui/logo-carousel'
import { GradientHeading } from '@/components/ui/gradient-heading'

const AboutPage = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && document) {
      document.body.classList.add('about-header-transparent')
      return () => document.body.classList.remove('about-header-transparent')
    }
  }, [])

  return (
    <main className="bg-black-900 min-h-screen">
      <About3
        title="About Slaqa Salon"
        description="Slaqa is a beauty, hair, and lifestyle brand dedicated to empowering individuals through self-expression and professional grooming services since 2015."
        mainImage={{
          src: "/Images/slaqa_salon_1772786049168.jpeg",
          alt: "Slaqa Salon",
        }}
        secondaryImage={{
          src: "/Video/3656156610225655993.mp4",
          alt: "Slaqa Founder's Story",
          title: "Founder's Story",
        }}
        breakout={{
          src: "/logo/slaqa-logo.png",
          alt: "Slaqa Logo",
          title: "Visionaries Behind Slaqa",
          description:
            "The founders established Slaqa in 2015 with the goal of redefining beauty and lifestyle in Durban's townships. Blending local authenticity with modern aesthetics.",
          buttonText: "Book Now",
          buttonUrl: "/book",
        }}
        achievementsTitle="Our Impact in Numbers"
        achievementsDescription="Since 2015, Slaqa has been a cornerstone of beauty and lifestyle in Durban's townships, delivering excellence and fostering community across multiple locations."
        achievements={[
          { label: "Years in Business", value: "9+" },
          { label: "Happy Clients", value: "1000+" },
          { label: "Locations", value: "3+" },
        ]}
      />
      
      {/* Logo Carousel Section */}
      <section className="w-full py-24 bg-black-900">
        <div className="mx-auto flex w-full max-w-screen-lg flex-col items-center space-y-12 px-6 md:px-12">
          <div className="text-center space-y-4">
            <GradientHeading variant="secondary" size="lg">
              Trusted by Communities
            </GradientHeading>
            <GradientHeading variant="default" size="xl" weight="black">
              Across KwaZulu-Natal
            </GradientHeading>
            <p className="text-neutral-400 mt-4 max-w-2xl mx-auto">
              Partnering with local businesses and communities to deliver excellence in beauty and lifestyle
            </p>
          </div>

          <LogoCarousel 
            columnCount={3} 
            logos={[
              { name: "Slaqa Cosmetics", id: 1, src: "/logo/ChatGPT_Image_Mar_8__2026__07_49_05_PM-removebg-preview.png", alt: "Slaqa Cosmetics" },
              { name: "The Barbershopshow Studio", id: 2, src: "/logo/ChatGPT_Image_Mar_6__2026__11_33_14_AM-removebg-preview.png", alt: "The Barbershopshow Studio" },
              { name: "Nambita Cafe", id: 3, src: "/logo/ChatGPT_Image_Mar_8__2026__07_43_33_PM-removebg-preview.png", alt: "Nambita Cafe" },

            ]}
          />
        </div>
      </section>
    </main>
  )
}

export default AboutPage
