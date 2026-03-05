// @ts-nocheck
'use client';
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Zap, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

interface EpisodeType {
  id: string
  title: string
  youtubeId: string
  hook?: string
  artist?: string
}

const fallbackEpisodes: EpisodeType[] = [
  {
    id: '01',
    title: 'Bello B - Nanka Amaphoyisa Interview & Performance',
    artist: 'Bello B',
    hook: 'Legendary rapper opens up on legacy, police brutality, and freestyle in the chair.',
    youtubeId: '4zX0IxgnM8M',
  },
  {
    id: '02',
    title: 'Manny Yack Speaks on Independency, Lagacy EP and Beast RSA',
    artist: 'Manny Yack (@manny_yack)',
    hook: 'Hip-hop artist breaks down independence, new music, and building his empire.',
    youtubeId: 'VjtDEw4C3uA',
  },
  {
    id: '03',
    title: 'LaQhaSha - MR BULLY Album Breakdown: The Establishment of the Qwellers',
    artist: 'LaQhaSha (@LaQhaSha)',
    hook: 'Deep dive into the MR BULLY album, the Qwellers movement, and South African hip-hop.',
    youtubeId: '6dNnI1VoPUo',
  },
  {
    id: '04',
    title: 'THE BARBERSHOW S3 EPISODE 1 - Campmaster Records Speaks on VATHELA',
    artist: 'Campmaster Records (@campmastersrecords_sa)',
    hook: 'Music producer reveals secrets behind VATHELA and the art of production.',
    youtubeId: 'E23Okee18hA',
  },
  {
    id: '05',
    title: 'INYAMA YENHLOKO IMNANDI YAZI - Lethulight x 3omncane',
    artist: 'Lethulight & 3omncane',
    hook: 'Artists collaborate on a celebration of authentic sound and cultural storytelling.',
    youtubeId: 'UCGvtrrrCzM',
  },
  {
    id: '06',
    title: 'THE BARBERSHOW SA S2 EPISODE 4 - Isthixo',
    artist: 'Isthixo (@isthixoPOD7865)',
    hook: 'Podcast icon shares insights on content creation, community, and influence.',
    youtubeId: 'hgUQ2-Poh1I',
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

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const response = await fetch('/api/youtube/latest-episodes')
        if (response.ok) {
          const data = await response.json()
          if (Array.isArray(data) && data.length > 0) {
            setEpisodes(data.slice(0, 4))
          }
        }
      } catch (error) {
        console.error('Failed to fetch episodes:', error)
      } finally {
        setIsLoadingEpisodes(false)
      }
    }

    fetchEpisodes()
  }, [])

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
      {/* HERO SECTION WITH 3D BACKGROUND */}
      <section className="relative bg-black-900 py-14 md:py-20 overflow-hidden border-t border-white/8">
        {/* 3D Shader Gradient Background - Positioned absolutely */}
        <div className="absolute inset-0 z-0 opacity-60">
          <ShaderGradientCanvas
            style={{
              width: '100%',
              height: '100%',
            }}
            lazyLoad={undefined}
            fov={undefined}
            pixelDensity={1}
            pointerEvents='none'
          >
            <ShaderGradient
              animate='on'
              type='sphere'
              wireframe={false}
              shader='defaults'
              uTime={0}
              uSpeed={0.3}
              uStrength={0.3}
              uDensity={0.8}
              uFrequency={5.5}
              uAmplitude={3.2}
              positionX={-0.1}
              positionY={0}
              positionZ={0}
              rotationX={0}
              rotationY={130}
              rotationZ={70}
              color1='#73bfc4'
              color2='#ff810a'
              color3='#8da0ce'
              reflection={0.4}
              cAzimuthAngle={270}
              cPolarAngle={180}
              cDistance={0.5}
              cameraZoom={15.1}
              lightType='env'
              brightness={0.8}
              envPreset='city'
              grain='on'
              toggleAxis={false}
              zoomOut={false}
              hoverState=''
              enableTransition={false}
            />
          </ShaderGradientCanvas>
        </div>

        {/* Content Overlay */}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-12 gap-4 overflow-hidden px-5 lg:pb-5 pb-2">
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
              <div />
            </motion.article>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ ease: 'easeOut', duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              className="col-span-12 sm:col-span-6 flex items-center justify-center"
            >
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
                  >
                    <Play size={64} className="text-white" strokeWidth={1.5} />
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* LATEST EPISODES */}
      <section className="bg-black py-14 md:py-20 overflow-hidden border-b border-white/8">
        <div className="max-w-7xl mx-auto px-5 space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ ease: 'easeOut', duration: 0.5 }}
            viewport={{ once: false }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
          >
            <div className="space-y-2">
              <h3 className="text-xs uppercase tracking-[0.22em] text-white font-semibold flex items-center gap-2">
                <Zap size={16} strokeWidth={3} />
                Latest Episodes
              </h3>
              <h2 className="text-4xl md:text-5xl font-black text-white">Conversations That Matter</h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {episodes.map((episode, i) => (
              <motion.article
                key={episode.id}
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ ease: 'easeOut', duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: false }}
                className="group relative rounded-lg overflow-hidden cursor-pointer h-full flex flex-col"
              >
                <button
                  onClick={() => setSelectedVideo(episode.youtubeId)}
                  className="relative bg-white h-40 overflow-hidden flex-shrink-0 group"
                >
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300"></div>
                </button>

                <div className="p-4 space-y-3 flex flex-col flex-1">
                  <div className="space-y-2 flex-1">
                    <h3 className="text-sm font-black text-white leading-tight line-clamp-2">
                      {episode.title}
                    </h3>
                    {episode.hook && (
                      <p className="text-xs text-white/70 leading-snug line-clamp-2">
                        {episode.hook}
                      </p>
                    )}
                    {episode.artist && (
                      <p className="text-xs text-[#FFFF00] font-semibold">
                        Feat. {episode.artist}
                      </p>
                    )}
                  </div>
                  <div />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* MOVEMENT CTA */}
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

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-10 right-0 text-white hover:text-[#FFFF00] transition-colors duration-200 z-20 p-2"
              aria-label="Close video"
              title="Close (ESC)"
            >
              <X size={28} strokeWidth={3} />
            </button>

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
