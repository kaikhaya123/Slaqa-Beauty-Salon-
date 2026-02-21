'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import logoAnimation from '@/public/lottie/Logo-2-remix.json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

export default function PageLoader() {
  const [visible, setVisible] = useState(false)

  // Only show on first visit - tracked via sessionStorage
  useEffect(() => {
    const pageLoaderShown = sessionStorage.getItem('pageLoaderShown')
    
    if (!pageLoaderShown) {
      // First visit - show loader
      setVisible(true)
      sessionStorage.setItem('pageLoaderShown', 'true')
    }
  }, [])

  // Fallback: hide after 3.5 s in case onComplete never fires
  useEffect(() => {
    if (visible) {
      const t = setTimeout(() => setVisible(false), 3500)
      return () => clearTimeout(t)
    }
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFFF00]"
        >
          <div className="w-56 sm:w-72">
            <Lottie
              animationData={logoAnimation}
              loop={false}
              autoplay
              onComplete={() => setVisible(false)}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
