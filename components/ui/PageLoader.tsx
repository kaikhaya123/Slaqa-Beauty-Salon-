'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import logoAnimation from '@/public/lottie/Scene-Cinematic (2).json'

const Lottie = dynamic(() => import('lottie-react'), { ssr: false })

interface PageLoaderProps {
  pathname: string
}

export default function PageLoader({ pathname }: PageLoaderProps) {
  const [shouldRender, setShouldRender] = useState(false)
  const [visible, setVisible] = useState(false)

  const [animationDone, setAnimationDone] = useState(false)
  const [minTimePassed, setMinTimePassed] = useState(false)

  useEffect(() => {
    const isHomePage = pathname === '/'
    if (!isHomePage) return

    const alreadyShown = localStorage.getItem('pageLoaderShown')
    if (alreadyShown) return

    // Start loader
    setShouldRender(true)
    setVisible(true)

    // Force minimum display time (3.5s)
    const timer = setTimeout(() => {
      setMinTimePassed(true)
    }, 3500)

    return () => clearTimeout(timer)
  }, [pathname])

  // Only hide when BOTH animation AND minimum time complete
  useEffect(() => {
    if (animationDone && minTimePassed) {
      localStorage.setItem('pageLoaderShown', 'true')
      setVisible(false)
    }
  }, [animationDone, minTimePassed])

  if (!shouldRender) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#FFFF00]"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="w-72 sm:w-96 md:w-[28rem]"
          >
            <Lottie
              animationData={logoAnimation}
              loop={false}
              autoplay
              onComplete={() => setAnimationDone(true)}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}