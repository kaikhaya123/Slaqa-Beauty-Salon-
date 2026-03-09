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
    artist: 'Manny Yack',
    hook: 'Hip-hop artist breaks down independence, new music, and building his empire.',
    youtubeId: 'VjtDEw4C3uA',
  },
  {
    id: '03',
    title: 'LaQhaSha - MR BULLY Album Breakdown',
    artist: 'LaQhaSha',
    hook: 'Deep dive into the MR BULLY album and the Qwellers movement.',
    youtubeId: '6dNnI1VoPUo',
  },
  {
    id: '04',
    title: 'Campmaster Records Speaks on VATHELA',
    artist: 'Campmaster Records',
    hook: 'Producer reveals secrets behind VATHELA.',
    youtubeId: 'E23Okee18hA',
  },
]

export default function TheBarbershow() {

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [episodes, setEpisodes] = useState<EpisodeType[]>(fallbackEpisodes)
  const heroVideoRef = useRef<HTMLVideoElement>(null)

  const handleHeroPlayClick = () => {
    if (heroVideoRef.current) heroVideoRef.current.play()
  }

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const res = await fetch('/api/youtube/latest-episodes')
        if (res.ok) {
          const data = await res.json()
          if (Array.isArray(data)) setEpisodes(data.slice(0,4))
        }
      } catch {}
    }
    fetchEpisodes()
  }, [])

  useEffect(() => {
    if (selectedVideo) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
  }, [selectedVideo])

  return (
<>
{/* HERO VIDEO BANNER */}

<section className="relative bg-black overflow-hidden">

<div className="relative h-[80vh] w-full">

<video
ref={heroVideoRef}
autoPlay
loop
muted
playsInline
className="absolute inset-0 w-full h-full object-cover"
>
<source src="/Video/3806138385732261106.mp4" type="video/mp4" />
</video>

<div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center">

<div className="space-y-4 px-6">

<h1 className="text-5xl md:text-7xl font-black text-[#FFFF00] tracking-tight">
THE BARBERSHOW
</h1>

<p className="text-3xl md:text-5xl font-bold text-white">
WE TELL STORIES
</p>

<button
onClick={handleHeroPlayClick}
className="mt-6 inline-flex items-center gap-3 bg-white text-black-900 font-bold px-6 py-3 rounded-full text-sm uppercase"
>
<Play size={16}/> Watch
</button>

</div>

</div>

</div>

</section>


{/* STUDIO INTRO */}

<section className="bg-black py-20 border-b border-white/10">

<div className="max-w-7xl mx-auto px-5 grid md:grid-cols-2 gap-12 items-center">

<div className="space-y-6">

<h2 className="text-5xl font-black text-white">
Barbershow Studios
</h2>

<p className="text-white/80 text-lg leading-relaxed">
More than a haircut.  
The chair becomes a stage.  
Artists speak. Culture moves.  
Real conversations unfold.
</p>

<div className="grid grid-cols-3 gap-6 pt-4">

<div>
<p className="text-3xl font-black text-white">50+</p>
<p className="text-xs text-white/60 uppercase">Episodes</p>
</div>

<div>
<p className="text-3xl font-black text-white">100+</p>
<p className="text-xs text-white/60 uppercase">Stories</p>
</div>

<div>
<p className="text-3xl font-black text-white">1</p>
<p className="text-xs text-white/60 uppercase">Chair</p>
</div>

</div>

</div>

<div className="rounded-2xl overflow-hidden">

<video
loop
muted
playsInline
autoPlay
className="w-full h-[420px] object-cover"
>
<source src="/Video/3806138385732261106.mp4" type="video/mp4"/>
</video>

</div>

</div>

</section>


{/* LATEST EPISODES */}

<section className="bg-black py-20 border-b border-white/10">

<div className="max-w-7xl mx-auto px-5 space-y-12">

<div>

<h3 className="text-xs text-white uppercase tracking-widest">
Latest Episodes
</h3>

<h2 className="text-5xl font-black text-white">
Conversations That Matter
</h2>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

{episodes.map((ep,i)=>(

<motion.article
key={ep.id}
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
transition={{delay:i*0.1}}
className="bg-neutral-900 rounded-xl overflow-hidden cursor-pointer"
>

<button
onClick={()=>setSelectedVideo(ep.youtubeId)}
className="h-40 w-full bg-neutral-800"
/>

<div className="p-4 space-y-2">

<h3 className="text-sm font-bold text-white line-clamp-2">
{ep.title}
</h3>

{ep.hook && (
<p className="text-xs text-white/60 line-clamp-2">
{ep.hook}
</p>
)}

{ep.artist && (
<p className="text-xs text-yellow-400 font-semibold">
Feat. {ep.artist}
</p>
)}

</div>

</motion.article>

))}

</div>

</div>

</section>


{/* CTA */}

<section className="bg-black py-20">

<div className="max-w-6xl mx-auto px-5 text-center space-y-8">

<h2 className="text-5xl font-black text-white">
More Than Content
</h2>

<p className="text-white/70 max-w-xl mx-auto">
A community of creatives. Conversations through the clipper and blade.
</p>

<a
href="https://www.youtube.com/@slaqasalon"
target="_blank"
className="inline-flex items-center gap-3 bg-yellow-400 text-black font-bold px-8 py-4 rounded-full uppercase text-sm"
>
Subscribe
</a>

</div>

</section>


{/* VIDEO MODAL */}

{selectedVideo && (

<div
className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
onClick={()=>setSelectedVideo(null)}
>

<div
className="w-full max-w-3xl"
onClick={(e)=>e.stopPropagation()}
>

<div className="aspect-video">

<iframe
width="100%"
height="100%"
src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
allowFullScreen
/>

</div>

</div>

</div>

)}

</>
)
}