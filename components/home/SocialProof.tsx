'use client'

import { cn } from '@/lib/utils'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState, useRef } from 'react'

const testimonials = [
  {
    id: 1,
    quote: 'Good service all round \u2014 from the moment you walk in,',
    highlight: 'their professionalism is tops.',
    quoteEnd: '',
    name: 'Sifiso Digga Gumede',
    role: 'Facebook Review · Dec 2020',
    avatar: '/Icons/user(1).png',
  },
  {
    id: 2,
    quote: 'I will keep supporting them till the end.',
    highlight: 'Professional hair products',
    quoteEnd: 'and a truly godly atmosphere.',
    name: 'Vuma Lakhe Ngcobo',
    role: 'Facebook Review · Sep 2021',
    avatar: '/Icons/user(1).png',
  },
  {
    id: 3,
    quote: 'Beautiful work on a matric dance hair.',
    highlight: 'The lady at the reception is super welcoming',
    quoteEnd: 'too.',
    name: 'Anonymous',
    role: 'AfricaBZ Review · Feb 2024',
    avatar: '/Icons/user(1).png',
  },
  {
    id: 4,
    quote: 'Great experience \u2014',
    highlight: 'the atmosphere was mainly professional',
    quoteEnd: 'and I loved meeting new people every day.',
    name: 'Former Team Member',
    role: 'Indeed Review · 2019',
    avatar: '/Icons/user(1).png',
  },
]

type StatCounterProps = {
  value: number
  suffix?: string
  label: string
  decimals?: number
}

function StatCounter({ value, suffix = '', label, decimals = 0 }: StatCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (hasAnimated) return
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setHasAnimated(true) }) },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasAnimated])

  useEffect(() => {
    if (!hasAnimated) return
    let start = 0
    const duration = 1200
    const increment = value / (duration / 16)
    let raf: number
    function animate() {
      start += increment
      if (start < value) {
        setCount(Number(start.toFixed(decimals)))
        raf = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }
    animate()
    return () => cancelAnimationFrame(raf)
  }, [hasAnimated, value, decimals])

  const display = decimals > 0 ? count.toFixed(decimals) : String(Math.round(count))

  return (
    <div ref={ref}>
      <div className="text-4xl font-bold text-black-900 mb-2">{display}{suffix}</div>
      <div className="text-sm text-black-900 uppercase tracking-widest">{label}</div>
    </div>
  )
}

export default function SocialProof() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const active = testimonials[activeIndex]

  return (
    <section className="bg-white min-h-screen flex flex-col justify-center py-24 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto mb-16 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-black-900 mb-4 leading-none">
          Trusted by<br />
          <span className="text-black-900">Durban</span>
        </h2>
        <p className="text-lg text-black-900 max-w-2xl mx-auto">
          Real words from real clients — Facebook, AfricaBZ &amp; more.
        </p>
      </motion.div>

      {/* Testimonial */}
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Quote icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="size-16 rounded-full bg-[#FFF44F]/10 border border-[#FFF44F]/30 flex items-center justify-center mb-10"
        >
          <svg className="size-8 text-black-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017V14H17.017C14.8079 14 13.017 12.2091 13.017 10V5H21.017V16L19.017 21H14.017ZM3.01709 21L3.01709 18C3.01709 16.8954 3.91252 16 5.01709 16H8.01709V14H6.01709C3.80795 14 2.01709 12.2091 2.01709 10V5H10.0171V16L8.01709 21H3.01709Z" />
          </svg>
        </motion.div>

        {/* Quote text */}
        <div className="relative min-h-[180px] flex items-center justify-center mb-8 w-full">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
              className="text-2xl sm:text-4xl font-semibold tracking-tight text-black-900 leading-tight [text-wrap:balance]"
            >
              &ldquo;{active.quote}{' '}
              <span className="text-black-900 italic">{active.highlight}</span>{' '}
              {active.quoteEnd}&rdquo;
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Avatar + name */}
        <div className="relative min-h-24 flex items-center mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="flex flex-col items-center gap-2"
            >
              <Image
                src={active.avatar}
                alt={active.name}
                width={56}
                height={56}
                className="size-14 rounded-full object-cover border-2 border-[#000000] mb-1"
              />
              <p className="text-sm font-black text-black-900 uppercase tracking-widest">{active.name}</p>
              <p className="text-xs text-black-900 font-medium">{active.role}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex gap-1.5">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
              className={cn(
                'h-2 rounded-full transition-all duration-300',
                index === activeIndex
                  ? 'bg-black-900 w-8'
                  : 'bg-gray-600 w-2 hover:bg-gray-400'
              )}
            />
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mt-24 border-t border-white pt-16 max-w-4xl mx-auto w-full"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <StatCounter value={98} suffix="%" label="Satisfaction" />
          <StatCounter value={1000} suffix="+" label="Monthly Clients" />
          <StatCounter value={4.9} suffix="&#9733;" label="Avg Rating" decimals={1} />
          <StatCounter value={10} suffix="+" label="Years Trusted" />
        </div>
      </motion.div>
    </section>
  )
}
