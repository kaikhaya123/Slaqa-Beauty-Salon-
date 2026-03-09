'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Users, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'
import { BUSINESS_INFO } from '@/lib/constants'
import { Typewriter } from '@/components/ui/typewriter'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const leftImageRef = useRef<HTMLDivElement>(null)
  const rightImageRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const taglineRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create timeline for orchestrated animations
    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' }
    })

    // Animate left image - slide in from left
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

    // Animate right image - slide in from right
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

    // Animate gradient overlay - fade out
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

    // Split heading text for character reveal
    const heading = headingRef.current
    if (heading) {
      const text = heading.textContent || ''
      heading.innerHTML = text
        .split('')
        .map((char: string) => `<span class="inline-block" style="opacity: 0; transform: translateY(20px);">${char === ' ' ? '&nbsp;' : char}</span>`)
        .join('')

      const chars = heading.querySelectorAll('span')
      
      tl.fromTo(
        chars,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.03,
        },
        0.5
      )
    }

    // Animate tagline - fade in after heading
    tl.fromTo(
      taglineRef.current,
      {
        opacity: 0,
        y: 10,
      },
      {
        opacity: 0.9,
        y: 0,
        duration: 0.8,
      },
      1.2
    )

    // Cleanup
    return () => {
      tl.kill()
    }
  }, [])

  return (
    <section className="relative w-full h-screen overflow-hidden -mt-16 md:-mt-20">
      {/* Dual Image Split */}
      <div className="relative w-full h-full flex flex-col md:flex-row">
        
        {/* Left Image */}
        <div ref={leftImageRef} className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <Image
            src={encodeURI("/Images/ChatGPT Image Feb 19, 2026, 07_22_27 PM.png")}
            alt="Pro Barber Shop ZA"
            fill
            className="object-cover object-center brightness-90 contrast-110"
            priority
            quality={100}
          />
        </div>
        
        {/* Right Image */}
        <div ref={rightImageRef} className="relative w-full md:w-1/2 h-1/2 md:h-full">
          <Image
            src={encodeURI("/Images/ChatGPT Image Feb 19, 2026, 07_26_04 PM.png")}
            alt="Short Haircut for Women"
            fill
            className="object-cover object-center md:object-left brightness-90 contrast-110"
            priority
            quality={100}
          />
        </div>
        
        {/* Dark gradient overlay for text readability */}
        <div ref={overlayRef} className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20"></div>
        
        {/* Bottom Centered Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6 md:px-12 pb-8 md:pb-12 pt-16 md:pt-20">
          <h1 ref={headingRef} className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 lg:mb-6 leading-[0.9] max-w-4xl tracking-tight text-center">
            SLAQA SALON
          </h1>
          <div ref={taglineRef} className="text-base text-white md:text-lg lg:text-xl mb-8 lg:mb-10 max-w-2xl opacity-90 leading-relaxed">
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
