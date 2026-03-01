# VideoPlayer - Quick Reference Card

**Print this or bookmark for quick lookups!**

---

## 🎯 Import

```tsx
import { VideoPlayer, VideoGallery } from '@/components/video/VideoPlayer'
```

---

## 📹 Video Sources

### YouTube
```tsx
source={{ type: 'youtube', id: 'dQw4w9WgXcQ' }}
```

### Vimeo  
```tsx
source={{ type: 'vimeo', vimeoId: '123456789' }}
```

### Upload
```tsx
source={{ type: 'upload', url: '/videos/file.mp4' }}
```

---

## 🎬 Basic Usage

```tsx
<VideoPlayer
  source={{ type: 'youtube', id: 'VIDEO_ID' }}
  title="Video Title"
/>
```

---

## 🎨 Play Button Options

```tsx
playButton={{
  show: true,                    // Show/hide
  color: '#FFFF00',              // Hex/RGB
  size: 90,                      // Pixels
  opacity: 0.95,                 // 0-1
  borderRadius: 50,              // 0-100+
  hoverScale: 1.2,               // 1.0-2.0+
  position: 'center',            // 9 positions
  customImage: '/img.png',       // Path
}}
```

**Positions:** `center` | `top-left` | `top-right` | `bottom-left` | `bottom-right`

---

## ✨ Hover Effects

```tsx
hover={{
  autoplay: false,               // Play on hover
  loop: true,                    // Loop video
  mute: true,                    // Start muted
  showControls: false,           // Show controls
  animationType: 'scale',        // Animation type
  animationDuration: 300,        // Milliseconds
  showMuteToggle: true,          // Mute button
}}
```

**Animation Types:** `'fade'` | `'scale'` | `'zoomIn'` | `'slideUp'`

---

## 🎥 Lightbox Modal

```tsx
lightbox={{
  enabled: true,                 // Enable/disable
  fullscreen: true,              // Fullscreen mode
  autoplay: true,                // Auto-play
  showControls: true,            // Show controls
  showCloseButton: true,         // X button
  allowEscapeKey: true,          // ESC to close
  scrollLock: true,              // Lock scroll
  overlayOpacity: 0.9,           // 0-1
  borderRadius: 16,              // Pixels
  zIndex: 9999,                  // Layer
}}
```

---

## 📐 Responsive Options

```tsx
responsive={{
  containerWidth: '100%',        // Width
  aspectRatio: 16 / 9,           // Ratio
  borderRadius: 12,              // Rounding
  borderColor: '#FFF',           // Color
  borderWidth: 1,                // Pixels
}}
```

**Common Ratios:** `16/9` | `4/3` | `1/1` (square) | `9/16` (vertical)

---

## 🖼️ Thumbnails

```tsx
thumbnail={{
  auto: true,                    // Auto-generate
  customUrl: '/thumb.jpg',       // Override
  blur: false,                   // Blur effect
  overlayOpacity: 0.3,           // 0-1
}}
```

---

## 📱 Responsive Grid

### 1-Column Mobile
```tsx
<div className="grid grid-cols-1">
```

### 2-Column Tablet
```tsx
<div className="grid grid-cols-1 md:grid-cols-2">
```

### 4-Column Desktop
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
```

### Horizontal Ticker
```tsx
<div className="flex overflow-x-auto gap-4">
  <div style={{ width: '300px' }}>
```

---

## 🎪 Gallery Component

```tsx
<VideoGallery
  videos={videoArray}    // Array of VideoPlayerProps
  gridCols={4}           // Number of columns
  gap={4}                // Gap size
  className="w-full"     // Custom classes
/>
```

---

## 🎯 Events/Callbacks

```tsx
<VideoPlayer
  ...
  onPlay={() => {
    console.log('Video started')
    // Send analytics
  }}
  onClose={() => {
    console.log('Modal closed')
  }}
/>
```

---

## 🎨 Slaqa Yellow Theme

```tsx
playButton={{
  color: '#FFFF00',              // Yellow
  size: 85,
  hoverScale: 1.2,
}}
responsive={{
  borderColor: 'rgba(255, 255, 0, 0.2)',
  borderWidth: 1,
}}
lightbox={{
  overlayOpacity: 0.95,
}}
```

---

## 🎯 Common Patterns

### Simple Video
```tsx
<VideoPlayer source={{ type: 'youtube', id: 'ID' }} title="Title" />
```

### Branded Video
```tsx
<VideoPlayer
  source={{ type: 'youtube', id: 'ID' }}
  title="Title"
  playButton={{ color: '#FFFF00', size: 90 }}
  responsive={{ borderColor: 'rgba(255, 255, 0, 0.2)', borderWidth: 1 }}
/>
```

### Video Grid
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {videos.map(v => <VideoPlayer key={v.id} {...v} />)}
</div>
```

### Hero Section
```tsx
<VideoPlayer
  source={{ type: 'youtube', id: 'ID' }}
  responsive={{ containerWidth: '100%', aspectRatio: 16/9, borderRadius: 0 }}
/>
```

### Carousel
```tsx
<div className="flex overflow-x-auto gap-4">
  {videos.map(v => (
    <div key={v.id} style={{ width: '300px' }}>
      <VideoPlayer {...v} />
    </div>
  ))}
</div>
```

---

## ⌨️ Keyboard Controls

| Key | Action |
|-----|--------|
| `ESC` | Close lightbox |

---

## 🔗 Related Files

- **Main Component**: `VideoPlayer.tsx`
- **Examples**: `VideoPlayerExamples.tsx`
- **Full Docs**: `VIDEO_PLAYER_DOCUMENTATION.md`
- **Integration**: `INTEGRATION_GUIDE.md`
- **Quick Start**: `QUICK_START.md`
- **Index**: `README.md`

---

## 💾 TypeScript Types

```tsx
// Video source
type VideoSourceType = 'youtube' | 'vimeo' | 'upload'

interface VideoSource {
  type: VideoSourceType
  id?: string
  vimeoId?: string
  url?: string
}

// Props
interface VideoPlayerProps {
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

## 🚨 Common Issues & Fixes

| Issue | Fix |
|-------|-----|
| Video not showing | Check video ID is correct |
| No thumbnail | Add custom thumbnail URL |
| Lightbox not closing | Ensure onClick on wrapper div |
| Mobile layout broken | Check aspect ratio, use `grid-cols-1` |
| Play button hidden | Set `playButton.show: true` |
| Animations laggy | Reduce `animationDuration` |
| Branding colors wrong | Check hex values in playButton |

---

## 📊 Performance Tips

```tsx
// Lazy load component
const VideoPlayer = dynamic(
  () => import('@/components/video/VideoPlayer'),
  { loading: () => <div>Loading...</div> }
)

// Memoize props
const videoProps = useMemo(() => [{...}], [deps])

// Intersection Observer (lazy render)
import { useInView } from 'react-intersection-observer'
```

---

## 🎯 30-Second Setup

1. Import component
```tsx
import { VideoPlayer } from '@/components/video/VideoPlayer'
```

2. Add to component
```tsx
<VideoPlayer 
  source={{ type: 'youtube', id: 'VIDEO_ID' }}
  title="Title"
/>
```

3. Customize colors (optional)
```tsx
playButton={{ color: '#FFFF00' }}
```

4. Done! ✅

---

## 📚 Documentation Map

```
Start Here: README.md
    ↓
Choose path:
├─→ Quick Start (30 min)
│   └─ QUICK_START.md
├─→ TheBarbershow Integration (45 min)
│   └─ INTEGRATION_GUIDE.md
└─→ Deep Dive (2 hours)
    ├─ VIDEO_PLAYER_DOCUMENTATION.md
    ├─ VideoPlayerExamples.tsx
    └─ VideoPlayer.tsx source
```

---

## 🔥 Pro Tips

✅ Use `VideoGallery` for quick grids
✅ Combine with Framer Motion for extra flair
✅ Track video views with `onPlay` callback
✅ Test responsive design on mobile
✅ Use custom thumbnails for better branding
✅ Cache video props with `useMemo`
✅ Use `dynamic()` import for lazy loading
✅ ESC key closes modal automatically
✅ Scroll locks when modal opens
✅ Click outside to close modal

---

## 📞 Quick Links

- **Need code?** → [QUICK_START.md](./QUICK_START.md)
- **Need integration help?** → [INTEGRATION_GUIDE.md](./INTEGRATION_GUIDE.md)
- **Need API details?** → [VIDEO_PLAYER_DOCUMENTATION.md](./VIDEO_PLAYER_DOCUMENTATION.md)
- **Need examples?** → [VideoPlayerExamples.tsx](./VideoPlayerExamples.tsx)
- **Need overview?** → [README.md](./README.md)

---

**✨ Happy coding! ✨**

*Slaqa Barbershop - VideoPlayer Component System*
