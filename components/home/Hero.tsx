'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Users, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { BUSINESS_INFO } from '@/lib/constants'
import { Typewriter } from '@/components/ui/typewriter'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const heroHeading = 'SLAQA SALON'
  const sectionRef = useRef<HTMLElement>(null)
  const leftImageRef = useRef<HTMLDivElement>(null)
  const rightImageRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // PAGE LOAD ANIMATIONS
    // =====================
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' }
    })

    // 1. IMAGE REVEALS - Clip-path from edges
    // Left image reveals from left to right
    tl.fromTo(
      leftImageRef.current,
      {
        clipPath: 'inset(0 100% 0 0)',
      },
      {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.2,
      },
      0
    )

    // Right image reveals from right to left
    tl.fromTo(
      rightImageRef.current,
      {
        clipPath: 'inset(0 0 0 100%)',
      },
      {
        clipPath: 'inset(0 0 0 0%)',
        duration: 1.2,
      },
      0
    )

    // 2. LUXURY HEADING TEXT - Character blur and stagger
    const heading = headingRef.current
    if (heading) {
      const chars = heading.querySelectorAll('[data-hero-char]')
      
      tl.fromTo(
        chars,
        {
          opacity: 0,
          y: 40,
          filter: 'blur(10px)',
        },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.6,
          stagger: 0.04,
        },
        0.5
      )
    }

    // 3. TAGLINE FADE IN
    tl.fromTo(
      taglineRef.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 0.9,
        y: 0,
        duration: 0.8,
      },
      1.0
    )

    // 4. OVERLAY FADE OUT
    tl.fromTo(
      overlayRef.current,
      {
        opacity: 1,
      },
      {
        opacity: 0,
        duration: 0.8,
      },
      0.4
    )

    // CONTINUOUS CINEMATIC MOTION
    // ============================
    // Smooth subtle zoom on both images - 10 to 12 seconds, no loop
    gsap.fromTo(
      [leftImageRef.current, rightImageRef.current],
      {
        scale: 1,
      },
      {
        scale: 1.08,
        duration: 11,
        ease: 'power1.out',
      }
    )

    // SCROLL INTERACTIONS - Parallax effect
    // ======================================
    if (sectionRef.current) {
      // Left image moves upward on scroll
      gsap.to(leftImageRef.current, {
        y: -80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          markers: false,
        },
      })

      // Right image moves downward on scroll
      gsap.to(rightImageRef.current, {
        y: 80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          markers: false,
        },
      })
    }

    // CLEANUP
    // =======
    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative w-full h-screen overflow-hidden -mt-16 md:-mt-20">
      {/* Dual Image Split */}
      <div className="relative w-full h-full flex flex-col md:flex-row">
        
        {/* Left Image - Premium Photography */}
        <div ref={leftImageRef} className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden will-change-transform">
          <Image
            src={encodeURI("/Images/ChatGPT Image Feb 19, 2026, 07_22_27 PM.png")}
            alt="Pro Barber Shop ZA"
            fill
            className="object-cover object-center brightness-90 contrast-110"
            priority
            quality={65}
          />
        </div>
        
        {/* Right Image - Premium Photography */}
        <div ref={rightImageRef} className="relative w-full md:w-1/2 h-1/2 md:h-full overflow-hidden will-change-transform">
          <Image
            src={encodeURI("/Images/ChatGPT Image Feb 19, 2026, 07_26_04 PM.png")}
            alt="Short Haircut for Women"
            fill
            className="object-cover object-center md:object-left brightness-90 contrast-110"
            priority
            quality={65}
          />
        </div>
        
        {/* Dark Gradient Overlay - Reveals during page load */}
        <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 pointer-events-none"></div>
        
        {/* Bottom Centered Text Overlay - Editorial Style */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 md:px-12 pb-8 md:pb-12 pt-16 md:pt-20 pointer-events-none">
          {/* Luxury Heading - Character Stagger */}
          <h1 
            ref={headingRef} 
            className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 lg:mb-6 leading-[0.9] max-w-4xl tracking-tight text-center will-change-transform"
          >
            {heroHeading.split('').map((char, index) => (
              <span key={`${char}-${index}`} data-hero-char className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Tagline with Typewriter Effect - Fade In */}
          <div ref={taglineRef} className="text-base text-white md:text-lg lg:text-xl mb-8 lg:mb-10 max-w-2xl opacity-90 leading-relaxed will-change-transform">
            <Typewriter
              text={["Beauty, Hair & Lifestyle.", "Stay clean, Stay Fresh"]}
              speed={50}
              deleteSpeed={30}
              waitTime={2000}
              className="text-base md:text-lg lg:text-xl"
              showCursor={true}
              cursorChar="|"
              cursorClassName="ml-1"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
