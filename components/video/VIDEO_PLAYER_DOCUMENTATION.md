# VideoPlayer Component Documentation

A comprehensive, highly customizable video component supporting YouTube, Vimeo, and uploaded videos with advanced features like carousel/slideshow compatibility, lightbox playback, hover animations, and automatic thumbnail generation.

## Features

### 🎬 Multi-Platform Support
- **YouTube** - Auto-generate thumbnails, embed with full API support
- **Vimeo** - Native embed with custom thumbnail support
- **Uploaded Videos** - Direct file uploads with custom thumbnails

### 🖼️ Thumbnails
- Auto-generated from video sources (YouTube/Vimeo)
- Custom thumbnail override option
- Configurable overlay color and opacity
- Optional blur effect

### 🎯 Play Button
- Default SVG or custom image support
- Fully customizable:
  - Color (hex or rgb)
  - Size (in pixels)
  - Opacity (0-1)
  - Border radius
  - Hover scale effect
  - Position (center, corners)

### ✨ Hover Interactions
- **Autoplay** - Start playing on hover
- **Loop** - Loop playback
- **Mute Control** - Toggle audio on hover
- **Show/Hide Controls** - Conditional control visibility
- **Animations** - Fade, Scale, ZoomIn, SlideUp effects
- **Mute Toggle** - Quick audio control button

### 💫 Lightbox Modal
- Fullscreen overlay playback
- 16:9 responsive scaling
- Auto-play option
- ESC key support
- Scroll lock
- Customizable overlay color and opacity
- Close button
- Custom border radius

### 📱 Responsive Design
- Mobile-first approach
- Customizable aspect ratios
- Border radius and styling
- Works in grids, carousels, and sliders
- Responsive font sizes in lightbox

### 🎪 Compatibility
- **Carousels** - Tested with carousel libraries
- **Tickers** - Horizontal scroll tickers
- **Slideshows** - Slideshow transitions
- **Grids** - Responsive grid layouts

---

## Installation

```bash
# VideoPlayer component is already in your project at:
# components/video/VideoPlayer.tsx
# components/video/VideoPlayerExamples.tsx
```

### Dependencies
- React 18+
- Next.js 13+
- Framer Motion
- Lucide React
- Tailwind CSS

---

## Basic Usage

### 1. Simple YouTube Video

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

export default function SimpleExample() {
  return (
    <VideoPlayer
      source={{
        type: 'youtube',
        id: '4zX0IxgnM8M',
      }}
      title="Bello B Interview"
    />
  )
}
```

### 2. With Custom Play Button

```tsx
<VideoPlayer
  source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
  title="Episode Title"
  playButton={{
    color: '#FFFF00',
    size: 100,
    borderRadius: 50,
    hoverScale: 1.2,
  }}
/>
```

### 3. With Hover Effects

```tsx
<VideoPlayer
  source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
  title="Episode Title"
  hover={{
    animationType: 'scale', // 'fade' | 'scale' | 'zoomIn' | 'slideUp'
    animationDuration: 300,
    showMuteToggle: true,
  }}
/>
```

### 4. Vimeo Video

```tsx
<VideoPlayer
  source={{
    type: 'vimeo',
    vimeoId: '123456789',
  }}
  title="Vimeo Video"
  thumbnail={{
    customUrl: 'https://your-thumbnail-url.jpg',
  }}
/>
```

### 5. Uploaded Video File

```tsx
<VideoPlayer
  source={{
    type: 'upload',
    url: '/videos/my-video.mp4',
  }}
  title="Custom Video"
  thumbnail={{
    customUrl: '/images/custom-thumbnail.jpg',
  }}
  lightbox={{
    showControls: true,
  }}
/>
```

---

## Complete Configuration

```tsx
<VideoPlayer
  // Video source (required)
  source={{
    type: 'youtube' | 'vimeo' | 'upload',
    id?: string, // YouTube/Vimeo ID
    vimeoId?: string, // Vimeo-specific
    url?: string, // Direct URL for uploads
  }}

  // Display text
  title="Video Title"
  description="Optional description"

  // Play button customization
  playButton={{
    show: true,
    icon: <Play />, // Custom React node
    customImage: '/path/to/image.png',
    color: '#FFFF00',
    size: 80,
    opacity: 1,
    borderRadius: 50,
    hoverScale: 1.1,
    position: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right',
  }}

  // Hover interactions
  hover={{
    autoplay: false,
    loop: true,
    mute: true,
    showControls: false,
    animationType: 'scale' | 'fade' | 'zoomIn' | 'slideUp',
    animationDuration: 300,
    showMuteToggle: true,
  }}

  // Thumbnail settings
  thumbnail={{
    auto: true, // Auto-generate from source
    customUrl: 'https://custom-thumbnail.jpg', // Override
    blur: false,
    overlayColor: 'rgba(0, 0, 0, 0)',
    overlayOpacity: 0.3,
  }}

  // Lightbox modal
  lightbox={{
    enabled: true,
    fullscreen: true,
    autoplay: true,
    showControls: true,
    showCloseButton: true,
    allowEscapeKey: true,
    scrollLock: true,
    overlayColor: 'rgba(0, 0, 0, 0.9)',
    overlayOpacity: 0.9,
    borderRadius: 16,
    zIndex: 9999,
  }}

  // Responsive & styling
  responsive={{
    containerWidth: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 12,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 0,
  }}

  // Callbacks
  onPlay={() => console.log('Playing')}
  onClose={() => console.log('Closed')}

  // Additional styling
  className="w-full"
/>
```

---

## Video Gallery Component

Display multiple videos in a responsive grid:

```tsx
import { VideoGallery } from '@/components/video/VideoPlayer'

export default function Gallery() {
  const videos = [
    {
      source: { type: 'youtube', id: '4zX0IxgnM8M' },
      title: 'Episode 1',
    },
    {
      source: { type: 'youtube', id: 'VjtDEw4C3uA' },
      title: 'Episode 2',
    },
  ]

  return (
    <VideoGallery
      videos={videos}
      gridCols={3}
      gap={4}
      className="w-full"
    />
  )
}
```

---

## Integration with TheBarbershow Component

Replace the existing episode grid with the new VideoPlayer:

```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'

export default function TheBarbershow() {
  const episodes = [
    {
      id: '01',
      title: 'Bello B - Nanka Amaphoyisa Interview & Performance',
      youtubeId: '4zX0IxgnM8M',
    },
    // ... more episodes
  ]

  return (
    <section className="bg-black-900 py-14 md:py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl font-black text-white mb-12">
          Inside <span className="text-[#FFFF00]">The Barbershow</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {episodes.map((episode) => (
            <VideoPlayer
              key={episode.id}
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
                aspectRatio: 16 / 9,
                borderRadius: 12,
                borderColor: 'rgba(255, 255, 0, 0.1)',
                borderWidth: 1,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## Responsive Grids

### 2-Column Mobile, 3-Column Tablet, 4-Column Desktop

```tsx
<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
  {videos.map((video) => (
    <VideoPlayer key={video.id} {...video} />
  ))}
</div>
```

### Hero + Grid Layout

```tsx
{/* Hero Video */}
<div className="col-span-full">
  <VideoPlayer {...heroVideo} 
    responsive={{ containerWidth: '100%', aspectRatio: 21/9 }}
  />
</div>

{/* Grid of other videos */}
<div className="grid grid-cols-3 gap-4 col-span-full">
  {otherVideos.map((v) => <VideoPlayer key={v.id} {...v} />)}
</div>
```

---

## Carousel/Ticker Integration

### With Framer Motion Carousel

```tsx
import { motion } from 'framer-motion'
import { VideoPlayer } from '@/components/video/VideoPlayer'

export function VideoCarousel({ videos }) {
  return (
    <motion.div
      className="flex gap-4 overflow-x-auto"
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
    >
      {videos.map((video) => (
        <motion.div
          key={video.id}
          className="flex-shrink-0"
          style={{ width: '300px' }}
          whileHover={{ scale: 1.05 }}
        >
          <VideoPlayer {...video} />
        </motion.div>
      ))}
    </motion.div>
  )
}
```

---

## Customization Examples

### Dark theme with neon accent

```tsx
<VideoPlayer
  source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
  playButton={{
    color: '#00FF00',
    size: 90,
    borderRadius: 45,
  }}
  responsive={{
    borderColor: 'rgba(0, 255, 0, 0.3)',
    borderWidth: 2,
    borderRadius: 20,
  }}
  lightbox={{
    overlayOpacity: 0.95,
  }}
/>
```

### Minimal design - no play button

```tsx
<VideoPlayer
  source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
  playButton={{ show: false }}
  hover={{
    animationType: 'fade',
    showMuteToggle: false,
  }}
/>
```

### Square aspect ratio for Instagram-style

```tsx
<VideoPlayer
  source={{ type: 'youtube', id: '4zX0IxgnM8M' }}
  responsive={{
    aspectRatio: 1, // 1:1 square
    borderRadius: 16,
  }}
/>
```

---

## Keyboard Controls

| Key | Action |
|-----|--------|
| `ESC` | Close lightbox (if enabled) |

---

## Accessibility Features

- Semantic HTML with proper ARIA labels
- Keyboard navigation support (ESC to close)
- Focus management in modal
- Responsive text sizing
- High contrast play button
- Screen reader friendly

---

## Performance Optimization

1. **Lazy Loading** - Images and iframes load only when needed
2. **Responsive Images** - Next.js Image optimization
3. **Motion Optimization** - Framer Motion with GPU acceleration
4. **Code Splitting** - Component imports on demand

---

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Android)

---

## Troubleshooting

### Issue: Video not showing
**Solution:** Verify video ID is correct and accessible

```tsx
// YouTube ID format - last part of URL
// https://www.youtube.com/watch?v=4zX0IxgnM8M
// ID: 4zX0IxgnM8M
```

### Issue: Thumbnail not generating
**Solution:** Use custom thumbnail URL

```tsx
thumbnail={{
  auto: false,
  customUrl: 'https://your-cdn.com/thumb.jpg',
}}
```

### Issue: Lightbox not closing
**Solution:** Ensure `clickOutside` handler is not prevented

```tsx
// Don't prevent bubbling on wrapper
// onClick should fire on outer div
```

---

## Examples Reference

See `VideoPlayerExamples.tsx` for:
1. Basic YouTube video
2. Custom play button
3. Hover animations
4. Vimeo videos
5. Uploaded videos
6. Full-featured config
7. Video gallery
8. Responsive grid
9. Hero video
10. Ticker/Slideshow setup

---

## Type Definitions

```tsx
export type VideoSourceType = 'youtube' | 'vimeo' | 'upload'

export interface VideoSource {
  type: VideoSourceType
  id?: string
  url?: string
  vimeoId?: string
}

export interface PlayButtonConfig {
  show?: boolean
  icon?: ReactNode
  customImage?: string
  color?: string
  size?: number
  opacity?: number
  borderRadius?: number
  hoverScale?: number
  position?: 'center' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export interface HoverConfig {
  autoplay?: boolean
  loop?: boolean
  mute?: boolean
  showControls?: boolean
  animationType?: 'fade' | 'scale' | 'zoomIn' | 'slideUp'
  animationDuration?: number
  showMuteToggle?: boolean
}

export interface ThumbnailConfig {
  auto?: boolean
  customUrl?: string
  blur?: boolean
  overlayColor?: string
  overlayOpacity?: number
}

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

export interface ResponsiveConfig {
  containerWidth?: string | number
  aspectRatio?: number
  borderRadius?: number
  borderColor?: string
  borderWidth?: number
}

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
```

---

## Support for Multiple Platforms

### YouTube
- Auto-thumbnail generation
- 16:9 responsive embedding
- Full API support

### Vimeo
- Custom thumbnail handling
- Native embed support
- Responsive player

### Direct Uploads
- MP4, WebM support
- Custom thumbnail
- Native video element control

---

## License

Part of Slaqa Barbershop Studio project.
