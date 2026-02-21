'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface EpisodeType {
  id: string
  title: string
  youtubeId: string
}

const episodes: EpisodeType[] = [
  {
    id: '01',
    title: 'THE BARBERSHOW S3 EPISODE 2 | @manny_yack Speaks on Independency, Lagacy EP and speaks on Beast Rsa.',
    youtubeId: 'VjtDEw4C3uA',
  },
  {
    id: '02',
    title: 'Bello B - Nanka Amaphoyisa Interview & Performance',

    youtubeId: 'j7icV2qvHIo',
  },
  {
    id: '03',
    title: 'THE BARBERSHOW S3 EPISODE 1 | @campmastersrecords_sa Speaks on VATHELA, AFROTAINMENT & SMOKOLO',
    youtubeId: 'UCGvtrrrCzM',
  },
  {
    id: '04',
    title: 'THE BARBERSHOW SA S2 EPISODE 4 | @isthixoPOD7865',
    youtubeId: 'hgUQ2-Poh1I',
  },
]

export default function TheBarbershow() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (selectedVideo) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedVideo])

  return (
    <>
      {/* ═══════════════════════════════════
          THE BARBERSHOW - HERO SECTION
      ═══════════════════════════════════ */}
      <section className="bg-[#FFFF00] py-14 md:py-20 overflow-hidden border-t border-white/8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-4 overflow-hidden px-5 lg:pb-5 pb-2">
            {/* Hero Content */}
            <motion.article
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.6 }}
              viewport={{ once: false }}
              className="relative col-span-12 sm:col-span-6 flex flex-col justify-between space-y-8"
            >
              <div className="space-y-3">
                <span className="text-xs uppercase tracking-[0.22em] text-black-900 font-semibold flex items-center gap-2">
                  Storytelling Platform
                </span>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-black-900 leading-[0.9] tracking-tight">
                  The<br />
                  <span className="text-black-900">Barbershow</span>
                </h2>
              </div>

              <p className="text-base lg:text-lg text-black-900 leading-relaxed max-w-lg">
                More than just a haircut. The Barbershow transforms the barbershop into a stage where culture, creativity, and authentic conversation come alive. Every episode is a blend of grooming, storytelling, and community.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-2xl font-black text-black-900">50+</p>
                    <p className="text-xs text-black-900 uppercase tracking-wider">Episodes</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-black text-black-900">∞</p>
                    <p className="text-xs text-black-900 uppercase tracking-wider">Stories</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-black text-black-900">1</p>
                    <p className="text-xs text-black-900 uppercase tracking-wider">Chair</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.youtube.com/@slaqasalon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-black-900 text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
                >
                  <Play size={16} strokeWidth={2.5} fill="currentColor" />
                  Subscribe on YouTube
                </a>
                <Link
                  href="#episodes"
                  className="inline-flex items-center justify-center gap-2 border-2 border-black-900 text-black-900 font-semibold px-8 py-4 rounded-full text-sm uppercase tracking-wider hover:border-black-900 hover:black-900 transition-colors duration-200"
                >
                  Watch Episodes <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>

            {/* Mic Drop Image */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              className="col-span-12 sm:col-span-6 flex items-center justify-center"
            >
              <div className="relative w-full h-full min-h-[400px] sm:min-h-[500px]">
                <Image
                  src="/Images/barbershop full of clients-cuate.png"
                  alt="Mic drop"
                  fill
                  className="object-contain object-center"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          EPISODES GRID
      ═══════════════════════════════════ */}
      <section id="episodes" className="bg-black-900 py-14 md:py-20 overflow-hidden border-t border-white/8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-12 px-5"
          >
            Latest <span className="text-white">Episodes</span>
          </motion.h2>

          <div className="grid grid-cols-12 gap-3 overflow-hidden px-5">
            {episodes.map((episode, idx) => (
              <motion.article
                key={episode.id}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeOut', duration: 0.55, delay: idx * 0.1 }}
                viewport={{ once: false }}
                className="col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-3 rounded-lg overflow-hidden bg-white/5 border border-white/10 hover:border-[#FFFF00]/50 transition-all duration-300 group cursor-pointer"
              >
                {/* Video Embed Container */}
                <button
                  onClick={() => setSelectedVideo(episode.youtubeId)}
                  className="relative w-full aspect-square bg-black/50 block overflow-hidden group-hover:brightness-110 transition-all duration-300"
                >
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${episode.youtubeId}`}
                    title={episode.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    className="pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                </button>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs uppercase tracking-[0.18em] text-[#FFFF00] font-bold">
                    </span>
                    <h3 className="text-sm font-black text-white leading-tight line-clamp-2">
                      {episode.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => setSelectedVideo(episode.youtubeId)}
                    className="inline-flex items-center gap-1 text-[#FFFF00] font-semibold text-xs hover:translate-x-1 transition-transform duration-200"
                  >
                    Watch Now <ArrowRight size={12} />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* View All CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-14 text-center"
          >
            <a
              href="https://www.youtube.com/@slaqasalon/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#FFFF00] text-black-900 font-black px-10 py-5 rounded-full text-sm uppercase tracking-widest hover:bg-white transition-colors duration-200"
            >
              View All Episodes <ArrowRight size={16} strokeWidth={2.5} />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════
          MOVEMENT CTA
      ═══════════════════════════════════ */}
      <section className="bg-black-900 py-14 md:py-20 overflow-hidden border-t border-white/8">
        <div className="max-w-7xl mx-auto px-5">
          <motion.article
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: 'easeOut', duration: 0.6 }}
            viewport={{ once: false }}
            className="relative rounded-2xl bg-gradient-to-r from-[#FFFF00] to-yellow-300 p-12 lg:p-16 text-center space-y-8 overflow-hidden"
            style={{
              backgroundImage: 'url(/Images/black_and_yellow_grunge_background.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="space-y-4 relative z-10">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight">
                More Than<br />Just Content
              </h2>
              <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed">
                The Barbershow is a movement. Join us as we redefine the barbershop as a space for storytelling, culture, and transformation.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center relative z-10">
              <a
                href="https://www.youtube.com/@slaqasalon"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-[#FFFF00] text-black-900 font-black px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#FFFF00] transition-colors duration-200"
              >
                <Play size={16} strokeWidth={2.5} fill="currentColor" />
                Subscribe Now
              </a>
            </div>
          </motion.article>
        </div>
      </section>

      {/* ═══════════════════════════════════
          VIDEO MODAL
      ═══════════════════════════════════ */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button - Visible and accessible */}
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#FFFF00] transition-colors duration-200 z-20 p-2"
              aria-label="Close video"
              title="Close (ESC)"
            >
              <X size={28} strokeWidth={3} />
            </button>

            {/* Video container - Compact */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-2xl border-2 border-[#FFFF00]/20">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Episode Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Footer - Compact */}
            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-between items-center sm:items-end">
              <p className="text-white/60 text-xs uppercase tracking-wider">Full Immersive Experience</p>
              <div className="flex gap-3">
                <a
                  href={`https://www.youtube.com/watch?v=${selectedVideo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-red-600 text-white font-bold px-5 py-2 rounded-full text-xs uppercase tracking-widest hover:bg-red-600 transition-colors duration-200"
                >
                  YouTube <ArrowRight size={12} strokeWidth={2.5} />
                </a>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="inline-flex items-center gap-2 border-2 border-white/30 text-white font-bold px-5 py-2 rounded-full text-xs uppercase tracking-widest hover:border-[#FFFF00] hover:text-[#FFFF00] transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
