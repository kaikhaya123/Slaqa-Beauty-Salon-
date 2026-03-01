'use client'

import { useState, useEffect, useRef, useCallback, ReactNode } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Play, Volume2, VolumeX } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'

/**
 * Video Source Types
 */
export type VideoSourceType = 'youtube' | 'vimeo' | 'upload'

/**
 * Video Source Configuration
 */
export interface VideoSource {
  type: VideoSourceType
  id?: string // YouTube video ID or Vimeo video ID
  url?: string // Direct file URL for uploads
  vimeoId?: string // Vimeo-specific ID
}

/**
 * Play Button Configuration
 */
export interface PlayButtonConfig {
  show?: boolean
  icon?: ReactNode
  customImage?: string
  color?: string // hex color or rgb
  size?: number // in pixels
  opacity?: number // 0-1
  borderRadius?: number // in pixels
  hoverScale?: number
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

/**
 * Hover Interaction Configuration
 */
export interface HoverConfig {
  autoplay?: boolean // autoplay on hover
  loop?: boolean // loop video
  mute?: boolean // start muted
  showControls?: boolean
  animationType?: 'fade' | 'scale' | 'zoomIn' | 'slideUp' // hover animation
  animationDuration?: number // in ms
  showMuteToggle?: boolean
}

/**
 * Thumbnail Configuration
 */
export interface ThumbnailConfig {
  auto?: boolean // auto-generate from video source
  customUrl?: string // override with custom thumbnail
  blur?: boolean
  overlayColor?: string
  overlayOpacity?: number
}

/**
 * Lightbox Configuration
 */
export interface LightboxConfig {
  enabled?: boolean
  fullscreen?: boolean
  autoplay?: boolean
  showControls?: boolean
  showCloseButton?: boolean
  allowEscapeKey?: boolean
  scrollLock?: boolean
  overlayColor?: string
  overlayOpacity?: number
  borderRadius?: number
  zIndex?: number
}

/**
 * Responsive Configuration
 */
export interface ResponsiveConfig {
  containerWidth?: string | number
  aspectRatio?: number // default 16/9
  borderRadius?: number
  borderColor?: string
  borderWidth?: number
}

/**
 * Main VideoPlayer Props
 */
export interface VideoPlayerProps {
  source: VideoSource
  title?: string
  description?: string
  thumbnail?: ThumbnailConfig
  playButton?: PlayButtonConfig
  hover?: HoverConfig
  lightbox?: LightboxConfig
  responsive?: ResponsiveConfig
  onPlay?: () => void
  onClose?: () => void
  className?: string
}

/**
 * Generates thumbnail URL based on video source
 */
const generateThumbnail = (source: VideoSource): string => {
  if (source.type === 'youtube' && source.id) {
    return `https://img.youtube.com/vi/${source.id}/maxresdefault.jpg`
  }
  if (source.type === 'vimeo' && source.vimeoId) {
    // For Vimeo, we'd need an API call or a fallback
    return `https://i.vimeocdn.com/video/${source.vimeoId}.webp`
  }
  return ''
}

/**
 * Gets embeddable URL for video player
 */
const getEmbedUrl = (source: VideoSource, autoplay: boolean = false): string => {
  const autoplayParam = autoplay ? '?autoplay=1' : ''
  
  if (source.type === 'youtube' && source.id) {
    return `https://www.youtube.com/embed/${source.id}${autoplayParam}`
  }
  if (source.type === 'vimeo' && source.vimeoId) {
    return `https://player.vimeo.com/video/${source.vimeoId}${autoplayParam}`
  }
  return source.url || ''
}

/**
 * PlayButton Component
 */
const PlayButton: React.FC<{
  config: PlayButtonConfig
  onClick: () => void
  isHovering: boolean
}> = ({ config, onClick, isHovering }) => {
  const {
    icon = <Play className="fill-current" size={40} />,
    customImage,
    color = '#FFFFFF',
    size = 80,
    opacity = 1,
    borderRadius = 50,
    hoverScale = 1.1,
    position = 'center',
  } = config

  const positionClasses = {
    center: 'inset-0 flex items-center justify-center',
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  }

  return (
    <motion.button
      onClick={onClick}
      className={`absolute ${positionClasses[position]} z-10`}
      whileHover={{ scale: hoverScale }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {customImage ? (
        <Image
          src={customImage}
          alt="Play"
          width={size}
          height={size}
          className="object-contain"
        />
      ) : (
        <motion.div
          className="flex items-center justify-center text-white"
          style={{
            backgroundColor: color,
            width: size,
            height: size,
            borderRadius,
            opacity,
          }}
          animate={{ scale: isHovering ? hoverScale : 1 }}
        >
          {icon}
        </motion.div>
      )}
    </motion.button>
  )
}

/**
 * Main VideoPlayer Component
 */
export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  source,
  title,
  thumbnail: thumbnailConfig,
  playButton: playButtonConfig,
  hover: hoverConfig,
  lightbox: lightboxConfig,
  responsive: responsiveConfig,
  onPlay,
  onClose,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const isSmallScreen = useMediaQuery('(max-width: 768px)')

  // Default configurations
  const thumbnailDefaults: ThumbnailConfig = {
    auto: true,
    overlayOpacity: 0.3,
    ...thumbnailConfig,
  }

  const playButtonDefaults: PlayButtonConfig = {
    show: true,
    size: 80,
    opacity: 1,
    hoverScale: 1.15,
    borderRadius: 50,
    position: 'center',
    ...playButtonConfig,
  }

  const hoverDefaults: HoverConfig = {
    autoplay: false,
    loop: true,
    mute: true,
    showControls: false,
    animationType: 'scale',
    animationDuration: 300,
    showMuteToggle: true,
    ...hoverConfig,
  }

  const lightboxDefaults: LightboxConfig = {
    enabled: true,
    fullscreen: true,
    autoplay: true,
    showControls: true,
    showCloseButton: true,
    allowEscapeKey: true,
    scrollLock: true,
    overlayOpacity: 0.9,
    borderRadius: 16,
    zIndex: 9999,
    ...lightboxConfig,
  }

  const responsiveDefaults: ResponsiveConfig = {
    containerWidth: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 0,
    ...responsiveConfig,
  }

  // Generate or use custom thumbnail
  const thumbnailUrl = thumbnailDefaults.customUrl || generateThumbnail(source)

  // Handle opening lightbox
  const handleOpen = useCallback(() => {
    setIsOpen(true)
    onPlay?.()
  }, [onPlay])

  // Handle closing lightbox
  const handleClose = useCallback(() => {
    setIsOpen(false)
    onClose?.()
  }, [onClose])

  // Handle scroll lock when modal opens
  useEffect(() => {
    if (isOpen && lightboxDefaults.scrollLock && typeof window !== 'undefined') {
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = 'unset'
      }
    }
  }, [isOpen, lightboxDefaults.scrollLock])

  // Handle ESC key
  useEffect(() => {
    if (!isOpen || !lightboxDefaults.allowEscapeKey) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, handleClose, lightboxDefaults.allowEscapeKey])

  const animationVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    scale: {
      initial: { scale: 0.8, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.8, opacity: 0 },
    },
    zoomIn: {
      initial: { scale: 0.5, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.5, opacity: 0 },
    },
    slideUp: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      exit: { y: 20, opacity: 0 },
    },
  }

  const selectedAnimation = animationVariants[hoverDefaults.animationType || 'scale']

  return (
    <>
      {/* Video Player Container */}
      <motion.div
        ref={containerRef}
        className={`relative overflow-hidden ${className}`}
        style={{
          width: responsiveDefaults.containerWidth,
          aspectRatio: responsiveDefaults.aspectRatio,
          borderRadius: responsiveDefaults.borderRadius,
          borderWidth: responsiveDefaults.borderWidth,
          borderColor: responsiveDefaults.borderColor,
          borderStyle: 'solid',
        }}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
      >
        {/* Thumbnail */}
        {thumbnailUrl && (
          <Image
            src={thumbnailUrl}
            alt={title || 'Video thumbnail'}
            fill
            className="object-cover"
            priority
          />
        )}

        {/* Overlay */}
        <motion.div
          className="absolute inset-0"
          style={{
            backgroundColor: thumbnailDefaults.overlayColor || 'rgba(0, 0, 0, 0.2)',
            opacity: thumbnailDefaults.overlayOpacity,
          }}
          animate={{
            opacity: isHovering ? 0.1 : (thumbnailDefaults.overlayOpacity || 0.2),
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Play Button */}
        {playButtonDefaults.show && (
          <PlayButton
            config={playButtonDefaults}
            onClick={handleOpen}
            isHovering={isHovering}
          />
        )}

        {/* Hover Controls */}
        <AnimatePresence>
          {isHovering && hoverDefaults.showMuteToggle && (
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onClick={(e) => {
                e.stopPropagation()
                setIsMuted(!isMuted)
              }}
              className="absolute top-2 right-2 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </motion.button>
          )}
        </AnimatePresence>

        {/* Title Overlay on Hover */}
        {title && isHovering && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-white text-sm font-semibold line-clamp-2">{title}</p>
          </motion.div>
        )}
      </motion.div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isOpen && lightboxDefaults.enabled && (
          <motion.div
            className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
            style={{
              backgroundColor: `rgba(0, 0, 0, ${lightboxDefaults.overlayOpacity})`,
            }}
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Close Button */}
            {lightboxDefaults.showCloseButton && (
              <motion.button
                onClick={handleClose}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 text-white hover:text-[#FFFF00] transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X size={isSmallScreen ? 24 : 32} strokeWidth={2} />
              </motion.button>
            )}

            {/* Video Container */}
            <motion.div
              className="relative w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
              variants={selectedAnimation}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: (hoverDefaults.animationDuration || 300) / 1000 }}
              style={{
                borderRadius: lightboxDefaults.borderRadius,
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
              }}
            >
              {/* Video Embed */}
              <div
                style={{
                  position: 'relative',
                  paddingBottom: '56.25%', // 16:9 aspect ratio
                  height: 0,
                  overflow: 'hidden',
                }}
              >
                {source.type === 'upload' ? (
                  <video
                    src={source.url}
                    controls={lightboxDefaults.showControls}
                    autoPlay={lightboxDefaults.autoplay}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                  />
                ) : (
                  <iframe
                    width="100%"
                    height="100%"
                    src={getEmbedUrl(source, lightboxDefaults.autoplay)}
                    title={title}
                    frameBorder="0"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                    }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                )}
              </div>
            </motion.div>

            {/* Info Section */}
            {title && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 p-4 md:p-6 bg-gradient-to-t from-black/80 to-transparent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-white text-sm md:text-base font-semibold">{title}</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

/**
 * Video Gallery Component - For displaying multiple videos in a grid/carousel
 */
export interface VideoGalleryProps {
  videos: VideoPlayerProps[]
  gridCols?: number
  gap?: number
  className?: string
}

export const VideoGallery: React.FC<VideoGalleryProps> = ({
  videos,
  gridCols = 3,
  gap = 4,
  className,
}) => {
  return (
    <div
      className={`grid gap-${gap} ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fit, minmax(300px, 1fr))`,
      }}
    >
      {videos.map((video, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <VideoPlayer {...video} />
        </motion.div>
      ))}
    </div>
  )
}

export default VideoPlayer
