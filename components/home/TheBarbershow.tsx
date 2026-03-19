'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import VideoLightbox from './VideoLightbox'

interface EpisodeType {
  id: string
  title: string
  youtubeId: string
  hook?: string
  artist?: string
  thumbnail?: string
  publishedAt?: string
}

const fallbackEpisodes: EpisodeType[] = [
  {
    id: '01',
    title: 'Bello B - Nanka Amaphoyisa Interview & Performance',
    artist: 'Bello B',
    hook: 'Legendary rapper opens up on legacy, police brutality, and freestyle in the chair.',
    youtubeId: '4zX0IxgnM8M',
    thumbnail: 'https://img.youtube.com/vi/4zX0IxgnM8M/hqdefault.jpg',
  },
  {
    id: '02',
    title: 'Manny Yack Speaks on Independency, Lagacy EP and Beast RSA',
    artist: 'Manny Yack (@manny_yack)',
    hook: 'Hip-hop artist breaks down independence, new music, and building his empire.',
    youtubeId: 'VjtDEw4C3uA',
    thumbnail: 'https://img.youtube.com/vi/VjtDEw4C3uA/hqdefault.jpg',
  },
  {
    id: '03',
    title: 'LaQhaSha - MR BULLY Album Breakdown: The Establishment of the Qwellers',
    artist: 'LaQhaSha (@LaQhaSha)',
    hook: 'Deep dive into the MR BULLY album, the Qwellers movement, and South African hip-hop.',
    youtubeId: '6dNnI1VoPUo',
    thumbnail: 'https://img.youtube.com/vi/6dNnI1VoPUo/hqdefault.jpg',
  },
  {
    id: '04',
    title: 'THE BARBERSHOW S3 EPISODE 1 - Campmaster Records Speaks on VATHELA',
    artist: 'Campmaster Records (@campmastersrecords_sa)',
    hook: 'Music producer reveals secrets behind VATHELA and the art of production.',
    youtubeId: 'E23Okee18hA',
    thumbnail: 'https://img.youtube.com/vi/E23Okee18hA/hqdefault.jpg',
  },
  {
    id: '05',
    title: 'INYAMA YENHLOKO IMNANDI YAZI - Lethulight x 3omncane',
    artist: 'Lethulight & 3omncane',
    hook: 'Artists collaborate on a celebration of authentic sound and cultural storytelling.',
    youtubeId: 'UCGvtrrrCzM',
    thumbnail: 'https://img.youtube.com/vi/UCGvtrrrCzM/hqdefault.jpg',
  },
  {
    id: '06',
    title: 'THE BARBERSHOW SA S2 EPISODE 4 - Isthixo',
    artist: 'Isthixo (@isthixoPOD7865)',
    hook: 'Podcast icon shares insights on content creation, community, and influence.',
    youtubeId: 'hgUQ2-Poh1I',
    thumbnail: 'https://img.youtube.com/vi/hgUQ2-Poh1I/hqdefault.jpg',
  },
]

export default function TheBarbershow() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [episodes, setEpisodes] = useState<EpisodeType[]>(fallbackEpisodes)
const [isLoadingEpisodes, setIsLoadingEpisodes] = useState(true)
  const [isHeroVideoPlaying, setIsHeroVideoPlaying] = useState(false)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  const handleHeroPlayClick = () => {
setIsHeroVideoPlaying(true)
    if (heroVideoRef.current) {
heroVideoRef.current.play()
}
  }

// Fetch latest episodes from YouTube API
  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('/api/youtube/latest-episodes')
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data) && data.length > 0) {
            setEpisodes(data.slice(0, 6))
          }
        }
      } catch (error) {
        console.error('Failed to fetch episodes:', error)
        // Keep fallback episodes
      } finally {
        setIsLoadingEpisodes(false)
      }
    }

    fetchEpisodes()
  }, [])

  return (
<>
{/* ═══════════════════════════════════
          THE BARBERSHOW - HERO SECTION
      ═══════════════════════════════════ */}
      <section className="bg-black-900 py-14 md:py-20 overflow-hidden border-t border-black">
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
                <span className="text-xs uppercase tracking-[0.22em] text-white font-semibold flex items-center gap-2">
                  Storytelling Platform
                </span>
                <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
                  The<br />
                  <span className="text-[#FFFF00]">Barbershow Studios</span>
                </h2>
              </div>

              <p className="text-base lg:text-lg text-white leading-relaxed max-w-lg">
                More than just a haircut. The Barbershow Studios transforms the barbershop into a stage where culture, creativity, and authentic conversation come alive. Every episode is a blend of storytelling, and community.
              </p>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <p className="text-2xl font-black text-white">50+</p>
                    <p className="text-xs text-white uppercase tracking-wider">Episodes</p>
                  </div>
                  <div className="space-y-2">
                    <Image
                      src="/Icons/mic.png"
                      alt="stories icon"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                    <p className="text-xs text-white uppercase tracking-wider">Stories</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-black text-white">1</p>
                    <p className="text-xs text-white uppercase tracking-wider">Chair</p>
                  </div>
                </div>
              </div>

              {/* CTAs removed per request */}
              <div />
            </motion.article>

            {/* Mic Drop Image */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              className="col-span-12 sm:col-span-6 flex items-center justify-center"
            >
              {/* Hidden SVG with clip path definition */}
              <svg className="absolute -top-[999px] -left-[999px] w-0 h-0">
                <defs>
                  <clipPath id="differentone9" clipPathUnits="objectBoundingBox">
                    <path
                      d="M0.751042 0.500000 L0.751042 0.251042 L0.500000 0.251042 L0.500000 0.000000 L0.000000 0.000000 L0.000000 0.500000 L0.251042 0.500000 L0.251042 0.751042 L0.500000 0.751042 L0.500000 1.000000 L1.000000 1.000000 L1.000000 0.500000 L0.751042 0.500000 Z"
                      fill="black"
                    />
                  </clipPath>
                </defs>
              </svg>
              
              <div className="bg-white relative w-full h-full min-h-[400px] sm:min-h-[500px]" style={{ clipPath: 'url(#differentone9)' }}>
<video
ref={heroVideoRef}
loop
muted
playsInline
className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
>
<source src="/Video/Video_1.mp4" type="video/mp4" />
</video>
{!isHeroVideoPlaying && (
<button
onClick={handleHeroPlayClick}
className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors duration-200"
                    aria-label="Play video"
>
<div className="pl-2 flex items-center justify-center w-20 h-20 bg-white rounded-full hover:scale-110 transition-transform duration-200">
<Play className="text-black-900 fill-black-900" size={40} />
                    </div>
</button>
)}
</div>
</motion.div>
</div>
</div>
</section>

{/* ═══════════════════════════════════
          EPISODES GRID — YouTube Feed
      ═══════════════════════════════════ */}
      <section id="episodes" className="bg-black-900 py-14 md:py-20 overflow-hidden border-t border-black">
        <div className="max-w-7xl mx-auto px-5">

          {/* Section header */}
          <div className="flex flex-col items-center text-center gap-4 mb-10">
            <div className="flex flex-col items-center">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-3"
              >
                Fresh From <span className="text-[#FFFF00]">The Chair</span>
              </motion.h2>
              <p className="text-white text-base max-w-2xl leading-relaxed text-center">
                Conversations through the clipper. Real stories from real people.
                Auto-updates with every new upload.
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 text-xs text-white/40 uppercase tracking-widest">
              <span className="inline-block w-2 h-2 rounded-full bg-[#FFFF00] animate-pulse" />
              Auto-updating feed
            </div>
          </div>

          {/* Video grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoadingEpisodes
              ? Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="rounded-xl overflow-hidden animate-pulse">
                    <div className="aspect-video bg-white/10" />
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-white/10 rounded w-3/4" />
                      <div className="h-3 bg-white/10 rounded w-1/2" />
                    </div>
                  </div>
                ))
              : episodes.map((episode, idx) => (
                  <motion.article
                    key={episode.id}
                    initial={{ y: 40, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ ease: 'easeOut', duration: 0.5, delay: idx * 0.07 }}
                    viewport={{ once: false }}
                    className="group cursor-pointer rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#FFFF00]/40 transition-all duration-300"
                    onClick={() => setSelectedVideo(episode.youtubeId)}
                  >
                    {/* Thumbnail */}
                    <div className="relative aspect-video overflow-hidden bg-black">
                      <Image
                        src={episode.thumbnail ?? `https://img.youtube.com/vi/${episode.youtubeId}/hqdefault.jpg`}
                        alt={episode.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        unoptimized
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                      {/* YouTube logo */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="group-hover:scale-110 transition-transform duration-200 drop-shadow-2xl">
                          <svg viewBox="0 0 68 48" className="w-16 h-12" aria-hidden="true">
                            <path
                              d="M66.52 7.75a8 8 0 0 0-5.64-5.66C55.9.75 34 .75 34 .75s-21.9 0-26.88 1.34A8 8 0 0 0 1.48 7.75 83.6 83.6 0 0 0 .14 24a83.6 83.6 0 0 0 1.34 16.25 8 8 0 0 0 5.64 5.66C12.1 47.25 34 47.25 34 47.25s21.9 0 26.88-1.34a8 8 0 0 0 5.64-5.66A83.6 83.6 0 0 0 67.86 24a83.6 83.6 0 0 0-1.34-16.25z"
                              fill="#FF0000"
                            />
                            <path d="m27 34 18-10-18-10z" fill="#FFFFFF" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 space-y-1">
                      <h3 className="text-sm font-black text-white leading-snug line-clamp-2 group-hover:text-[#FFFF00] transition-colors duration-200">
                        {episode.title}
                      </h3>
                      {episode.artist && (
                        <p className="text-xs text-white/50 font-medium">{episode.artist}</p>
                      )}
                    </div>
                  </motion.article>
                ))}
          </div>

          {/* Subscribe row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-between"
          >
            <p className="text-white text-sm">
              New episodes drop regularly · Subscribe to never miss one
            </p>
            <a
              href="https://www.youtube.com/@slaqasalon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#FFFF00] text-black-900 font-black px-6 py-3 rounded-full text-xs uppercase tracking-widest hover:opacity-90 transition-opacity shrink-0"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              Watch on YouTube
            </a>
          </motion.div>

        </div>
      </section>

{/* ═══════════════════════════════════
          MOVEMENT CTA
      ═══════════════════════════════════ */}
<section className="bg-black-900 py-14 md:py-20 overflow-hidden border-t border-black-900">
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
A COMMUNITY OF CREATIVES 🇿🇦, CONVERSATIONS THROUGH THE CLIPPER AND BLADE. 
</p>
</div>

<div className="flex flex-wrap gap-4 justify-center relative z-10">
<a
href="https://www.youtube.com/@slaqasalon"
target="_blank"
rel="noopener noreferrer"
className="inline-flex items-center gap-3 bg-[#FFFF00] text-black-900 font-black px-8 py-4 rounded-full text-sm uppercase tracking-widest hover:bg-[#FFFF00] transition-colors duration-200"
>
<Image
                  src="/Icons/bell.png"
                  alt="subscribe"
                  width={16}
                  height={16}
                  className="object-contain"
                />
Subscribe Now
</a>
</div>
</motion.article>
        </div>
</section>

{/* ═══════════════════════════════════
          VIDEO LIGHTBOX
      ═══════════════════════════════════ */}
      <AnimatePresence>
        {selectedVideo && (
          <VideoLightbox
            episodes={episodes}
            initialId={selectedVideo}
            onClose={() => setSelectedVideo(null)}
          />
        )}
      </AnimatePresence>
</>
  )
}
