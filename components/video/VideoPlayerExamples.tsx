'use client'

import React from 'react'
import { VideoPlayer, VideoGallery } from '@/components/video/VideoPlayer'
import type { VideoPlayerProps } from '@/components/video/VideoPlayer'

/**
 * Example implementations showing how to use the VideoPlayer component
 * with different configurations and video sources
 */

// ════════════════════════════════════════════════════════════════════
// 1. BASIC YOUTUBE VIDEO (Minimal Config)
// ════════════════════════════════════════════════════════════════════
export const BasicYouTubeExample = () => (
  <VideoPlayer
    source={{
      type: 'youtube',
      id: '4zX0IxgnM8M', // Bello B episode
    }}
    title="Bello B - Nanka Amaphoyisa Interview & Performance"
  />
)

// ════════════════════════════════════════════════════════════════════
// 2. YOUTUBE WITH CUSTOM PLAY BUTTON
// ════════════════════════════════════════════════════════════════════
export const CustomPlayButtonExample = () => (
  <VideoPlayer
    source={{
      type: 'youtube',
      id: 'VjtDEw4C3uA',
    }}
    title="Manny Yack - Independence & Legacy"
    playButton={{
      show: true,
      color: '#FFFF00',
      size: 100,
      opacity: 0.95,
      borderRadius: 50,
      hoverScale: 1.2,
      position: 'center',
    }}
    responsive={{
      borderRadius: 16,
      borderColor: 'rgba(255, 255, 0, 0.3)',
      borderWidth: 2,
    }}
  />
)

// ════════════════════════════════════════════════════════════════════
// 3. YOUTUBE WITH HOVER ANIMATIONS
// ════════════════════════════════════════════════════════════════════
export const HoverAnimationExample = () => (
  <VideoPlayer
    source={{
      type: 'youtube',
      id: '6dNnI1VoPUo',
    }}
    title="LaQhaSha - MR BULLY Album Breakdown"
    hover={{
      autoplay: false,
      loop: true,
      mute: true,
      showControls: false,
      animationType: 'zoomIn',
      animationDuration: 400,
      showMuteToggle: true,
    }}
    playButton={{
      size: 85,
      color: '#FFFF00',
      position: 'center',
    }}
  />
)

// ════════════════════════════════════════════════════════════════════
// 4. VIMEO VIDEO EXAMPLE
// ════════════════════════════════════════════════════════════════════
export const VimeoExample = () => (
  <VideoPlayer
    source={{
      type: 'vimeo',
      vimeoId: '123456789', // Replace with actual Vimeo ID
    }}
    title="Vimeo Video Example"
    thumbnail={{
      customUrl: 'https://via.placeholder.com/1200x675',
      overlayOpacity: 0.25,
    }}
  />
)

// ════════════════════════════════════════════════════════════════════
// 5. UPLOADED VIDEO FILE
// ════════════════════════════════════════════════════════════════════
export const UploadedVideoExample = () => (
  <VideoPlayer
    source={{
      type: 'upload',
      url: '/Video/Video_1.mp4',
    }}
    title="Barbers Showcase - Behind the Scenes"
    thumbnail={{
      customUrl: '/public/Images/barber-showcase-thumb.jpg',
    }}
    lightbox={{
      enabled: true,
      showControls: true,
      autoplay: true,
    }}
  />
)

// ════════════════════════════════════════════════════════════════════
// 6. FULL-FEATURED CONFIGURATION
// ════════════════════════════════════════════════════════════════════
export const FullFeaturedExample = () => (
  <VideoPlayer
    source={{
      type: 'youtube',
      id: 'E23Okee18hA',
    }}
    title="Campmaster Records - VATHELA Production Secrets"
    description="Music producer reveals behind-the-scenes production insights"
    thumbnail={{
      auto: true,
      customUrl: undefined, // Will auto-generate from YouTube
      overlayOpacity: 0.3,
    }}
    playButton={{
      show: true,
      color: '#FFFF00',
      size: 90,
      opacity: 0.9,
      borderRadius: 50,
      hoverScale: 1.2,
      position: 'center',
    }}
    hover={{
      autoplay: false,
      loop: true,
      mute: true,
      showControls: false,
      animationType: 'scale',
      animationDuration: 300,
      showMuteToggle: true,
    }}
    lightbox={{
      enabled: true,
      fullscreen: true,
      autoplay: true,
      showControls: true,
      showCloseButton: true,
      allowEscapeKey: true,
      scrollLock: true,
      overlayOpacity: 0.95,
      borderRadius: 20,
      zIndex: 9999,
    }}
    responsive={{
      containerWidth: '100%',
      aspectRatio: 16 / 9,
      borderRadius: 16,
      borderColor: 'rgba(255, 255, 0, 0.2)',
      borderWidth: 1,
    }}
    onPlay={() => console.log('Video started playing')}
    onClose={() => console.log('Lightbox closed')}
    className="w-full"
  />
)

// ════════════════════════════════════════════════════════════════════
// 7. VIDEO GALLERY - CAROUSEL/GRID COMPATIBLE
// ════════════════════════════════════════════════════════════════════
export const VideoGalleryExample = () => {
  const barberShowEpisodes: VideoPlayerProps[] = [
    {
      source: { type: 'youtube', id: '4zX0IxgnM8M' },
      title: 'Bello B - Nanka Amaphoyisa',
      playButton: { color: '#FFFF00', size: 80 },
    },
    {
      source: { type: 'youtube', id: 'VjtDEw4C3uA' },
      title: 'Manny Yack - Independence',
      playButton: { color: '#FFFF00', size: 80 },
    },
    {
      source: { type: 'youtube', id: '6dNnI1VoPUo' },
      title: 'LaQhaSha - MR BULLY',
      playButton: { color: '#FFFF00', size: 80 },
    },
    {
      source: { type: 'youtube', id: 'E23Okee18hA' },
      title: 'Campmaster Records',
      playButton: { color: '#FFFF00', size: 80 },
    },
  ]

  return (
    <VideoGallery
      videos={barberShowEpisodes}
      gridCols={4}
      gap={4}
      className="w-full"
    />
  )
}

// ════════════════════════════════════════════════════════════════════
// 8. RESPONSIVE GRID WITH DIFFERENT SIZES
// ════════════════════════════════════════════════════════════════════
export const ResponsiveGridExample = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
    <VideoPlayer
      source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
      title="Episode 1"
    />
    <VideoPlayer
      source={{ type: 'youtube', id: 'VjtDEw4C3uA' }}
      title="Episode 2"
    />
    <VideoPlayer
      source={{ type: 'youtube', id: '6dNnI1VoPUo' }}
      title="Episode 3"
    />
  </div>
)

// ════════════════════════════════════════════════════════════════════
// 9. HERO VIDEO WITH CUSTOM OVERLAY
// ════════════════════════════════════════════════════════════════════
export const HeroVideoExample = () => (
  <div className="relative w-full">
    <VideoPlayer
      source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
      title="The Barbershow - Season 3 Highlight"
      responsive={{
        containerWidth: '100%',
        aspectRatio: 16 / 9,
        borderRadius: 0,
      }}
      playButton={{
        size: 120,
        color: '#FFFF00',
        borderRadius: 60,
        hoverScale: 1.15,
      }}
      lightbox={{
        overlayOpacity: 0.92,
      }}
    />
  </div>
)

// ════════════════════════════════════════════════════════════════════
// 10. TICKER/SLIDESHOW COMPATIBLE SETUP
// ════════════════════════════════════════════════════════════════════
export const TickerCompatibleExample = () => (
  <div className="flex overflow-x-auto gap-4 pb-4">
    {[
      '4zX0IxgnM8M',
      'VjtDEw4C3uA',
      '6dNnI1VoPUo',
      'E23Okee18hA',
    ].map((videoId, idx) => (
      <div
        key={idx}
        className="flex-shrink-0"
        style={{ width: '300px' }}
      >
        <VideoPlayer
          source={{ type: 'youtube', id: videoId }}
          title={`Episode ${idx + 1}`}
          responsive={{
            containerWidth: '100%',
            aspectRatio: 9 / 16, // Vertical format for ticker
            borderRadius: 12,
          }}
        />
      </div>
    ))}
  </div>
)

export default VideoGalleryExample
