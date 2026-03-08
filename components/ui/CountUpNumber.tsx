'use client'

import { useEffect, useRef, useState } from 'react'

interface CountUpNumberProps {
  value: string
  duration?: number
  className?: string
}

export const CountUpNumber = ({ value, duration = 2000, className = '' }: CountUpNumberProps) => {
  const [displayValue, setDisplayValue] = useState('0')
  const [hasStarted, setHasStarted] = useState(false)
  const elementRef = useRef<HTMLSpanElement>(null)

  // Extract numeric value and suffix
  const numericMatch = value.match(/^([\d.]+)/)
  const suffix = value.substring(numericMatch ? numericMatch[0].length : 0)
  const numericValue = numericMatch ? parseFloat(numericMatch[1]) : 0
  
  // Determine decimal places from original value
  const decimalPlaces = numericMatch && numericMatch[1].includes('.') 
    ? numericMatch[1].split('.')[1].length 
    : 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStarted) {
            setHasStarted(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [hasStarted])

  useEffect(() => {
    if (!hasStarted) return

    const startTime = Date.now()
    let animationFrameId: number

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = numericValue * progress

      // Format the number with appropriate decimal places
      const formatted = decimalPlaces > 0 
        ? current.toFixed(decimalPlaces)
        : Math.floor(current).toString()

      setDisplayValue(formatted)

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animate()

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [hasStarted, numericValue, duration, decimalPlaces])

  return <span ref={elementRef} className={className}>{displayValue}{suffix}</span>
}
