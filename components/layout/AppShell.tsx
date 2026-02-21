'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import logoAnimation from '@/public/lottie/Logo-2-remix.json'
import PageLoader from '@/components/ui/PageLoader'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isFirst = useRef(true)
  const [transitioning, setTransitioning] = useState(false)

  useEffect(() => {
    // Skip the very first render — PageLoader handles the initial visit
    if (isFirst.current) {
      isFirst.current = false
      return
    }
    // Show brief loader on route change
    setTransitioning(true)
    const t = setTimeout(() => setTransitioning(false), 1800)
    return () => clearTimeout(t)
  }, [pathname])

  return (
    <>
      {/* Initial page load intro */}
      <PageLoader />

      {/* Route-change overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            key="route-loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9998] flex items-center justify-center bg-[#FFFF00]"
          >
            <div className="w-44 sm:w-56">
              <Lottie
                animationData={logoAnimation}
                loop={false}
                autoplay
                onComplete={() => setTransitioning(false)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </>
  )
}
