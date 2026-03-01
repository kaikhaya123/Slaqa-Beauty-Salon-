# VideoPlayer - Quick Start Guide

Copy-paste snippets for common implementations.

## 1️⃣ Single YouTube Video (Minimal)

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

export default function SingleVideo() {
  return (
    <VideoPlayer
      source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
      title="Video Title"
    />
  )
}
```

---

## 2️⃣ YouTube with Slaqa Branding (Yellow)

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

export default function BrandedVideo() {
  return (
    <VideoPlayer
      source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
      title="Bello B Interview"
      playButton={{
        color: '#FFFF00',
        size: 90,
        borderRadius: 50,
        hoverScale: 1.2,
      }}
      responsive={{
        borderRadius: 12,
        borderColor: 'rgba(255, 255, 0, 0.2)',
        borderWidth: 1,
      }}
    />
  )
}
```

---

## 3️⃣ Video Grid (4 Videos)

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

const episodes = [
  { id: '4zX0IxgnM8M', title: 'Bello B' },
  { id: 'VjtDEw4C3uA', title: 'Manny Yack' },
  { id: '6dNnI1VoPUo', title: 'LaQhaSha' },
  { id: 'E23Okee18hA', title: 'Campmaster Records' },
]

export default function VideoGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {episodes.map((ep) => (
        <VideoPlayer
          key={ep.id}
          source={{ type: 'youtube', id: ep.id }}
          title={ep.title}
        />
      ))}
    </div>
  )
}
```

---

## 4️⃣ Hero Video (Full Width)

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

export default function HeroVideo() {
  return (
    <div className="w-full">
      <VideoPlayer
        source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
        title="The Barbershow Highlight"
        responsive={{
          containerWidth: '100%',
          aspectRatio: 16 / 9,
          borderRadius: 0,
        }}
        playButton={{
          size: 120,
          color: '#FFFF00',
          hoverScale: 1.15,
        }}
      />
    </div>
  )
}
```

---

## 5️⃣ Horizontal Ticker/Carousel

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

const videoIds = [
  '4zX0IxgnM8M',
  'VjtDEw4C3uA',
  '6dNnI1VoPUo',
  'E23Okee18hA',
]

export default function VideoTicker() {
  return (
    <div className="flex overflow-x-auto gap-4 pb-4">
      {videoIds.map((id, idx) => (
        <div key={idx} className="flex-shrink-0" style={{ width: '280px' }}>
          <VideoPlayer
            source={{ type: 'youtube', id }}
            title={`Episode ${idx + 1}`}
          />
        </div>
      ))}
    </div>
  )
}
```

---

## 6️⃣ Uploaded Video File

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

export default function UploadedVideo() {
  return (
    <VideoPlayer
      source={{
        type: 'upload',
        url: '/videos/barber-showcase.mp4',
      }}
      title="Barber Showcase - Behind the Scenes"
      thumbnail={{
        customUrl: '/images/barber-thumbnail.jpg',
      }}
      lightbox={{
        showControls: true,
        autoplay: true,
      }}
    />
  )
}
```

---

## 7️⃣ Vimeo Video

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

export default function VimeoVideo() {
  return (
    <VideoPlayer
      source={{
        type: 'vimeo',
        vimeoId: '123456789',
      }}
      title="Vimeo Video"
      thumbnail={{
        customUrl: 'https://path-to-vimeo-thumbnail.jpg',
      }}
    />
  )
}
```

---

## 8️⃣ With Animations & Hover Effects

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

export default function AnimatedVideo() {
  return (
    <VideoPlayer
      source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
      title="Interactive Video"
      hover={{
        animationType: 'zoomIn', // 'fade' | 'scale' | 'zoomIn' | 'slideUp'
        animationDuration: 400,
        showMuteToggle: true,
      }}
      playButton={{
        color: '#FFFF00',
        size: 85,
        hoverScale: 1.25, // Grows on hover
      }}
    />
  )
}
```

---

## 9️⃣ Video Gallery Component (Easiest)

```tsx
import { VideoGallery } from '@/components/video/VideoPlayer'

const videos = [
  { source: { type: 'youtube', id: '4zX0IxgnM8M' }, title: 'Episode 1' },
  { source: { type: 'youtube', id: 'VjtDEw4C3uA' }, title: 'Episode 2' },
  { source: { type: 'youtube', id: '6dNnI1VoPUo' }, title: 'Episode 3' },
]

export default function Gallery() {
  return (
    <VideoGallery
      videos={videos}
      gridCols={3}
      gap={4}
    />
  )
}
```

---

## 🔟 With Custom Events & Tracking

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

export default function TrackedVideo() {
  return (
    <VideoPlayer
      source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
      title="Analytics Video"
      onPlay={() => {
        console.log('Video started')
        // Send to analytics
        // gtag.event('video_play', { title: 'Bello B Interview' })
      }}
      onClose={() => {
        console.log('Modal closed')
      }}
    />
  )
}
```

---

## 🎨 Themed Variants

### Dark Theme (Standard Slaqa)
```tsx
<VideoPlayer
  source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
  responsive={{
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
  }}
  lightbox={{
    overlayOpacity: 0.9,
  }}
/>
```

### Light Theme
```tsx
<VideoPlayer
  source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
  responsive={{
    containerWidth: '100%',
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
  }}
/>
```

### Neon Accent
```tsx
<VideoPlayer
  source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
  playButton={{
    color: '#00FF00', // Neon green
    size: 100,
  }}
  responsive={{
    borderColor: 'rgba(0, 255, 0, 0.4)',
    borderWidth: 2,
  }}
/>
```

---

## 📱 Responsive Grid Layouts

### Auto Responsive
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
  {videos.map((v) => <VideoPlayer key={v.id} {...v} />)}
</div>
```

### Mobile First
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
  {videos.map((v) => <VideoPlayer key={v.id} {...v} />)}
</div>
```

### With Sidebar
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Main video */}
  <div className="lg:col-span-2">
    <VideoPlayer {...mainVideo} />
  </div>
  
  {/* Sidebar videos */}
  <div className="space-y-4">
    {sidebarVideos.map((v) => (
      <VideoPlayer key={v.id} {...v} responsive={{ aspectRatio: 16/9 }} />
    ))}
  </div>
</div>
```

---

## ⚡ Performance Tips

### Lazy Load Videos
```tsx
import dynamic from 'next/dynamic'

const VideoPlayer = dynamic(
  () => import('@/components/video/VideoPlayer'),
  { loading: () => <LoadingPlaceholder /> }
)
```

### Use Intersection Observer
```tsx
// Videos only render when in viewport
<div className="grid grid-cols-4 gap-4">
  {videos.map((v) => (
    <Intersection key={v.id}>
      <VideoPlayer {...v} />
    </Intersection>
  ))}
</div>
```

### Memoize Video Props
```tsx
import { useMemo } from 'react'

export default function OptimizedGallery() {
  const videoProps = useMemo(() => 
    episodes.map(ep => ({
      source: { type: 'youtube', id: ep.youtubeId },
      title: ep.title,
    })),
    [episodes]
  )

  return <VideoGallery videos={videoProps} />
}
```

---

## 🔗 Complete TheBarbershow Integration

Replace your current episodes grid with this:

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'
import { motion } from 'framer-motion'

export default function TheBarbershow() {
  const [episodes, setEpisodes] = useState([...])

  return (
    <section id="episodes" className="bg-black-900 py-14 md:py-20">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-4xl sm:text-6xl font-black text-white mb-12">
          Inside <span className="text-[#FFFF00]">The Barbershow</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {episodes.map((episode, idx) => (
            <motion.div
              key={episode.id}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
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
                }}
                responsive={{
                  borderRadius: 12,
                  borderColor: 'rgba(255, 255, 0, 0.1)',
                  borderWidth: 1,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## 🎯 Common Use Cases

| Use Case | Config |
|----------|--------|
| Grid gallery | `<VideoGallery videos={videos} gridCols={4} />` |
| Carousel | `flex overflow-x-auto gap-4` |
| Hero section | `responsive={{ containerWidth: '100%' }}` |
| Featured + grid | `lg:col-span-2` + grid layout |
| Ticker | `style={{ width: '280px' }}` + flex scroll |
| Slideshow | Use external carousel library |
| Modal preview | Default lightbox enabled |
| Fullscreen | lightbox with `fullscreen: true` |

---

## ✅ Testing Checklist

- [ ] Videos load in grid
- [ ] Play button visible and clickable
- [ ] Lightbox opens on play click
- [ ] ESC key closes modal
- [ ] Mobile responsive
- [ ] Thumbnails display
- [ ] Hover effects work
- [ ] Multiple videos don't interfere
- [ ] Scroll locks when modal open
- [ ] Analytics events fire (if configured)

---

## 🚀 Next Steps

1. Choose which snippet matches your use case
2. Copy and paste into your component
3. Replace video IDs with your actual IDs
4. Test in browser
5. Customize colors/sizes as needed
6. Refer to full documentation if tweaking needed

**Need more help?** See `VIDEO_PLAYER_DOCUMENTATION.md` for complete API reference.
