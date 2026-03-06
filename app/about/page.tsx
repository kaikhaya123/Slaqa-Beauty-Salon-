'use client'

import React, { useEffect } from 'react'
import { About3 } from '@/components/ui/about-3'

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
        companiesTitle="Trusted by Communities Across KwaZulu-Natal"
        companies={[
          { src: "/logo/569626317_18086126728820606_7933996279465277143_n.jpg", alt: "Slaqa Cosmetics" },
          { src: "/logo/ChatGPT_Image_Mar_6__2026__11_33_14_AM-removebg-preview.png", alt: "The Barbershopshow Studio" },
          { src: "/Images/588620845_17866014813514627_4879679079962877394_n.jpg", alt: "Nambita Cafe" },
        ]}
        achievementsTitle="Our Impact in Numbers"
        achievementsDescription="Since 2015, Slaqa has been a cornerstone of beauty and lifestyle in Durban's townships, delivering excellence and fostering community across multiple locations."
        achievements={[
          { label: "Years in Business", value: "9+" },
          { label: "Happy Clients", value: "1000+" },
          { label: "Locations", value: "3+" },
          { label: "Social Following", value: "61.7K" },
        ]}
      />
    </main>
  )
}

export default AboutPage
