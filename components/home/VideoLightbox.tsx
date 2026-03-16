'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ExternalLink, LayoutGrid } from 'lucide-react'

export interface LightboxEpisode {
  id: string
  title: string
  youtubeId: string
  hook?: string
  artist?: string
  thumbnail?: string
}

interface Props {
  episodes: LightboxEpisode[]
  initialId: string
  onClose: () => void
}

export default function VideoLightbox({ episodes, initialId, onClose }: Props) {
  const [currentIdx, setCurrentIdx] = useState(() =>
    Math.max(0, episodes.findIndex((e) => e.youtubeId === initialId))
  )
  const [stripOpen, setStripOpen] = useState(false)
  const [controlsVisible, setControlsVisible] = useState(true)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  const current = episodes[currentIdx]
  const hasPrev = currentIdx > 0
  const hasNext = currentIdx < episodes.length - 1

  /* ── Auto-hide controls on inactivity ── */
  const revealControls = () => {
    setControlsVisible(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setControlsVisible(false), 3500)
  }
  useEffect(() => {
    revealControls()
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── Keyboard nav ── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft')  setCurrentIdx((i) => Math.max(0, i - 1))
      if (e.key === 'ArrowRight') setCurrentIdx((i) => Math.min(episodes.length - 1, i + 1))
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, episodes.length])

  /* ── Scroll active thumb into view ── */
  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return
    const thumb = strip.children[currentIdx] as HTMLElement
    thumb?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [currentIdx])

  /* ── Body scroll lock ── */
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = original }
  }, [])

  const playerSrc = (videoId: string) => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    return (
      `https://www.youtube.com/embed/${videoId}` +
      `?autoplay=1&rel=0&modestbranding=1&vq=hd1080&hd=1` +
      `&enablejsapi=1&origin=${encodeURIComponent(origin)}&playsinline=1&fs=1`
    )
  }

  const ctrl = controlsVisible ? 1 : 0

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[9999] bg-black flex flex-col select-none"
      onMouseMove={revealControls}
      onTouchStart={revealControls}
    >
      {/* ══════════════════════════ TOP BAR ══════════════════════════ */}
      <motion.div
        animate={{ opacity: ctrl, y: ctrl === 1 ? 0 : -8 }}
        transition={{ duration: 0.22 }}
        className="shrink-0 flex items-center justify-between gap-3 px-4 sm:px-6 py-3 bg-gradient-to-b from-black via-black/60 to-transparent z-10"
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="text-[#FFFF00] font-black text-xs tabular-nums shrink-0">
            {String(currentIdx + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(episodes.length).padStart(2, '0')}
          </span>
          <span className="w-px h-3 bg-white/20 shrink-0" />
          <p className="text-white/70 text-xs sm:text-sm font-semibold truncate leading-tight">
            {current.title}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className="hidden sm:flex items-center gap-1 text-[#FFFF00]/60 text-[10px] font-bold uppercase tracking-widest">
            HD 1080
          </span>
          <a
            href={`https://www.youtube.com/watch?v=${current.youtubeId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white/40 hover:text-white transition-colors text-[10px] uppercase tracking-widest"
            aria-label="Open on YouTube"
          >
            <ExternalLink size={12} />
            <span className="hidden sm:block">YouTube</span>
          </a>
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors"
            aria-label="Close"
          >
            <span className="hidden sm:block text-[10px] uppercase tracking-widest">Esc</span>
            <X size={20} strokeWidth={2} />
          </button>
        </div>
      </motion.div>

      {/* ══════════════════════ PLAYER AREA ══════════════════════════ */}
      <div className="flex-1 min-h-0 relative flex items-center justify-center bg-black">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.youtubeId}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="w-full max-w-full max-h-full aspect-video relative shadow-2xl"
          >
            <iframe
              src={playerSrc(current.youtubeId)}
              title={current.title}
              width="1920"
              height="1080"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* Prev arrow */}
        <motion.button
          animate={{ opacity: ctrl }}
          transition={{ duration: 0.22 }}
          onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
          disabled={!hasPrev}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/60 border border-white/20 text-white hover:bg-black/90 hover:border-[#FFFF00] hover:text-[#FFFF00] transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
          aria-label="Previous episode"
        >
          <ChevronLeft size={20} strokeWidth={2.5} />
        </motion.button>

        {/* Next arrow */}
        <motion.button
          animate={{ opacity: ctrl }}
          transition={{ duration: 0.22 }}
          onClick={() => setCurrentIdx((i) => Math.min(episodes.length - 1, i + 1))}
          disabled={!hasNext}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black/60 border border-white/20 text-white hover:bg-black/90 hover:border-[#FFFF00] hover:text-[#FFFF00] transition-all duration-200 disabled:opacity-20 disabled:pointer-events-none"
          aria-label="Next episode"
        >
          <ChevronRight size={20} strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* ══════════════════════ BOTTOM BAR ═══════════════════════════ */}
      <motion.div
        animate={{ opacity: ctrl, y: ctrl === 1 ? 0 : 8 }}
        transition={{ duration: 0.22 }}
        className="shrink-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10"
      >
        {/* Collapsible thumbnail strip */}
        <AnimatePresence>
          {stripOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <div
                ref={stripRef}
                className="flex gap-2 px-4 sm:px-6 pt-3 pb-1 overflow-x-auto"
                style={{ scrollbarWidth: 'none' } as React.CSSProperties}
              >
                {episodes.map((ep, idx) => (
                  <button
                    key={ep.id}
                    onClick={() => setCurrentIdx(idx)}
                    className={[
                      'relative shrink-0 w-28 sm:w-36 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-200',
                      idx === currentIdx
                        ? 'border-[#FFFF00] scale-[1.05] opacity-100'
                        : 'border-transparent opacity-40 hover:opacity-80 hover:border-white/30',
                    ].join(' ')}
                    title={ep.title}
                    aria-label={`Play ${ep.title}`}
                  >
                    <Image
                      src={ep.thumbnail ?? `https://img.youtube.com/vi/${ep.youtubeId}/mqdefault.jpg`}
                      alt={ep.title}
                      fill
                      className="object-cover"
                      unoptimized
                      sizes="(max-width: 640px) 112px, 144px"
                    />
                    {idx === currentIdx && (
                      <div className="absolute inset-0 bg-[#FFFF00]/10 pointer-events-none" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meta + controls row */}
        <div className="flex items-center justify-between gap-4 px-4 sm:px-6 py-3">
          <div className="min-w-0 flex-1">
            <h3 className="text-white font-black text-sm sm:text-base leading-snug line-clamp-1">
              {current.title}
            </h3>
            {current.artist && (
              <p className="text-[#FFFF00] text-xs mt-0.5 font-semibold truncate">
                {current.artist}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Mobile prev/next */}
            <div className="flex items-center gap-1 sm:hidden">
              <button
                onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                disabled={!hasPrev}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white disabled:opacity-20 disabled:pointer-events-none"
                aria-label="Previous"
              >
                <ChevronLeft size={15} />
              </button>
              <button
                onClick={() => setCurrentIdx((i) => Math.min(episodes.length - 1, i + 1))}
                disabled={!hasNext}
                className="w-8 h-8 rounded-full flex items-center justify-center border border-white/20 text-white disabled:opacity-20 disabled:pointer-events-none"
                aria-label="Next"
              >
                <ChevronRight size={15} />
              </button>
            </div>

            <button
              onClick={() => setStripOpen((v) => !v)}
              className={[
                'flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[10px] uppercase tracking-widest font-bold transition-all duration-200',
                stripOpen
                  ? 'border-[#FFFF00] text-[#FFFF00] bg-[#FFFF00]/10'
                  : 'border-white/20 text-white/50 hover:border-white/50 hover:text-white',
              ].join(' ')}
              aria-label="Toggle episode list"
            >
              <LayoutGrid size={11} />
              <span className="hidden sm:block">Episodes</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
