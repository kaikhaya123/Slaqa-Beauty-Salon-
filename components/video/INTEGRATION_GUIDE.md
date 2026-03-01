# VideoPlayer Integration Guide

Quick guide to integrate the new VideoPlayer component into your Slaqa Barbershop website.

## Step 1: File Structure

The new VideoPlayer component is located at:
```
components/
  └── video/
      ├── VideoPlayer.tsx (Main component)
      ├── VideoPlayerExamples.tsx (10 example implementations)
      └── VIDEO_PLAYER_DOCUMENTATION.md (Full documentation)
```

## Step 2: Integration into TheBarbershow Component

### Option A: Replace Episodes Grid (Recommended)

In `components/home/TheBarbershow.tsx`, update the episodes grid section:

**Before:**
```tsx
<div className="grid grid-cols-12 gap-3 overflow-hidden px-5">
  {episodes.map((episode, idx) => (
    <motion.article
      key={episode.id}
      className="col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-2 ..."
    >
      {/* Old iframe implementation */}
      <button onClick={() => setSelectedVideo(episode.youtubeId)}>
        <iframe src={...} />
      </button>
    </motion.article>
  ))}
</div>
```

**After:**
```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

<div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-3 xl:grid-cols-4 gap-3 overflow-hidden px-5">
  {episodes.map((episode, idx) => (
    <motion.div
      key={episode.id}
      initial={{ y: 50, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: 'easeOut', duration: 0.55, delay: idx * 0.1 }}
      viewport={{ once: false }}
    >
      <VideoPlayer
        source={{
          type: 'youtube',
          id: episode.youtubeId,
        }}
        title={episode.title}
        playButton={{
          color: '#FFFF00',
          size: 80,
          hoverScale: 1.15,
        }}
        responsive={{
          aspectRatio: 16 / 9,
          borderRadius: 12,
          borderColor: 'rgba(255, 255, 0, 0.1)',
          borderWidth: 1,
        }}
        hover={{
          animationType: 'scalme',
          showMuteToggle: true,
        }}
      />
    </motion.div>
  ))}
</div>
```

## Step 3: Remove Old Modal Code

You can remove the existing modal code from TheBarbershow since VideoPlayer handles it internally:

```tsx
// DELETE THIS SECTION
{selectedVideo && (
  <div className="fixed inset-0 z-[9999] ...">
    {/* Old modal implementation */}
  </div>
)}

// DELETE THESE STATES
const [selectedVideo, setSelectedVideo] = useState<string | null>(null)

// DELETE THIS useEffect
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
```

## Step 4: Using VideoGallery Component

For a cleaner implementation with gallery support:

```tsx
import { VideoGallery } from '@/components/video/VideoPlayer'
import type { VideoPlayerProps } from '@/components/video/VideoPlayer'

export default function TheBarbershow() {
  const [episodes, setEpisodes] = useState([...])

  // Convert episodes to VideoPlayerProps
  const videoGalleryProps: VideoPlayerProps[] = episodes.map((episode) => ({
    source: {
      type: 'youtube',
      id: episode.youtubeId,
    },
    title: episode.title,
    description: episode.hook,
    playButton: {
      color: '#FFFF00',
      size: 80,
    },
    responsive: {
      borderRadius: 12,
      borderColor: 'rgba(255, 255, 0, 0.1)',
      borderWidth: 1,
    },
  }))

  return (
    <section>
      <VideoGallery
        videos={videoGalleryProps}
        gridCols={4}
        gap={3}
      />
    </section>
  )
}
```

## Step 5: Styling Integration

The VideoPlayer component uses Tailwind CSS and integrates with your existing design system:

### Yellow Theme (Slaqa Colors)
```tsx
<VideoPlayer
  source={{ type: 'youtube', id: 'VIDEO_ID' }}
  playButton={{
    color: '#FFFF00', // Your brand yellow
    size: 80,
  }}
  responsive={{
    borderColor: 'rgba(255, 255, 0, 0.1)',
    borderWidth: 1,
  }}
/>
```

### Dark Theme (Black-900)
```tsx
<section className="bg-black-900 py-14">
  <VideoPlayer
    source={{ type: 'youtube', id: 'VIDEO_ID' }}
    lightbox={{
      overlayOpacity: 0.95,
    }}
  />
</section>
```

## Step 6: Hero Video Section

Update the hero video to use the new component:

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

{/* Mic Drop Image */}
<motion.div className="col-span-12 sm:col-span-6">
  <VideoPlayer
    source={{
      type: 'upload',
      url: '/Video/Video_1.mp4',
    }}
    title="The Barbershow - Behind the Scenes"
    responsive={{
      containerWidth: '100%',
      aspectRatio: 16 / 9,
      borderRadius: 16,
    }}
    playButton={{
      size: 100,
      color: '#FFFF00',
      hoverScale: 1.15,
    }}
  />
</motion.div>
```

## Step 7: Carousel/Ticker Implementation

For horizontal scrolling (ticker):

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

<div className="overflow-x-auto pb-4">
  <div className="flex gap-4 flex-nowrap">
    {episodes.map((episode) => (
      <div key={episode.id} className="flex-shrink-0" style={{ width: '300px' }}>
        <VideoPlayer
          source={{
            type: 'youtube',
            id: episode.youtubeId,
          }}
          title={episode.title}
          responsive={{
            containerWidth: '100%',
            aspectRatio: 9 / 16, // Vertical for ticker
          }}
        />
      </div>
    ))}
  </div>
</div>
```

## Step 8: Callbacks and Analytics

Track video interactions:

```tsx
<VideoPlayer
  source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
  onPlay={() => {
    console.log('Video started playing')
    // Send analytics event
    trackEvent('video_played', {
      title: 'Episode Name',
      timestamp: new Date(),
    })
  }}
  onClose={() => {
    console.log('Lightbox closed')
    // Track view duration, etc.
  }}
/>
```

## Step 9: Responsive Breakpoints

The component automatically handles responsive design:

- **Mobile (< 640px)**: Single column, full-width videos
- **Tablet (640px - 1024px)**: 2-3 columns
- **Desktop (> 1024px)**: 4 columns

### Custom Breakpoints
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {episodes.map((ep) => (
    <VideoPlayer key={ep.id} {...videoProps} />
  ))}
</div>
```

## Step 10: Migration Checklist

- [ ] Import VideoPlayer component
- [ ] Remove old modal state and useEffect
- [ ] Update episodes grid with VideoPlayer
- [ ] Test YouTube video playback
- [ ] Test lightbox modal
- [ ] Test mobile responsiveness
- [ ] Test hover animations
- [ ] Verify Tailwind styling applies correctly
- [ ] Test keyboard controls (ESC to close)
- [ ] Remove old iframe code
- [ ] Test with real episodes from YouTube API

## Features You Get After Integration

✅ Multi-platform video support (YouTube, Vimeo, uploads)
✅ Auto-generated thumbnails with custom override
✅ Customizable play button with color and size options
✅ Hover animations (fade, scale, zoomIn, slideUp)
✅ Lightbox modal with fullscreen playback
✅ Responsive design (mobile/tablet/desktop)
✅ Carousel/slider/ticker compatibility
✅ ESC key support to close modal
✅ Scroll lock prevention
✅ Framer Motion animations
✅ TypeScript support
✅ Accessibility features

## Example: Complete Episode Card Replacement

**Old Implementation:**
```tsx
<article className="col-span-2 rounded-lg bg-white/5 border border-white/10">
  <button onClick={() => setSelectedVideo(episode.youtubeId)}>
    <iframe src={`https://www.youtube.com/embed/${episode.youtubeId}`} />
    <div className="absolute inset-0 bg-black/40"></div>
  </button>
  <div className="p-4 space-y-3">
    <h3>{episode.title}</h3>
    <p>{episode.hook}</p>
    <button onClick={() => setSelectedVideo(episode.youtubeId)}>
      Watch Now
    </button>
  </div>
</article>
```

**New Implementation:**
```tsx
<VideoPlayer
  source={{ type: 'youtube', id: episode.youtubeId }}
  title={episode.title}
  description={episode.hook}
  playButton={{ color: '#FFFF00', size: 85 }}
  responsive={{ borderRadius: 12 }}
/>
```

Much cleaner! 🎉

---

## Need Help?

Refer to:
1. `VideoPlayerExamples.tsx` - 10 working examples
2. `VIDEO_PLAYER_DOCUMENTATION.md` - Complete API reference
3. This file - Integration guide

---

## Questions?

The VideoPlayer component is fully documented with TypeScript types and JSDoc comments. Hover over properties in your IDE for full documentation.
