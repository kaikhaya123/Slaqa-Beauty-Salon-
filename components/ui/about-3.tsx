'use client'

import { Button } from "@/components/ui/Button"
import { useState, useRef } from "react"

interface About3Props {
  title?: string
  description?: string
  mainImage?: {
    src: string
    alt: string
  }
  secondaryImage?: {
    src: string
    alt: string
    title?: string
  }
  breakout?: {
    src: string
    alt: string
    title?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
  }
  companiesTitle?: string
  companies?: Array<{
    src: string
    alt: string
  }>
  achievementsTitle?: string
  achievementsDescription?: string
  achievements?: Array<{
    label: string
    value: string
  }>
}

const defaultCompanies = [
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=80&fit=crop",
    alt: "Company Logo 1",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=80&fit=crop",
    alt: "Company Logo 2",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=80&fit=crop",
    alt: "Company Logo 3",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=80&fit=crop",
    alt: "Company Logo 4",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=80&fit=crop",
    alt: "Company Logo 5",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=80&fit=crop",
    alt: "Company Logo 6",
  },
]

const defaultAchievements = [
  { label: "Years in Business", value: "9+" },
  { label: "Happy Clients", value: "1000+" },
  { label: "Services Offered", value: "15+" },
  { label: "Social Following", value: "61.7K" },
]

export const About3 = ({
  title = "About Slaqa",
  description = "Slaqa is a beauty, hair, and lifestyle brand dedicated to empowering individuals through self-expression and professional grooming services.",
  mainImage = {
    src: "https://images.unsplash.com/photo-1560066620-dbb89639cf0d?w=600&h=620&fit=crop",
    alt: "Slaqa Salon",
  },
  secondaryImage = {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    alt: "Slaqa Team",
  },
  breakout = {
    src: "/logo/slaqa-logo.png",
    alt: "Slaqa Logo",
    title: "Experience Excellence",
    description:
      "Join thousands of satisfied clients who trust Slaqa for premium beauty and lifestyle services across multiple Durban locations.",
    buttonText: "Book Now",
    buttonUrl: "/book",
  },
  companiesTitle = "Trusted by Communities Across KwaZulu-Natal",
  companies = defaultCompanies,
  achievementsTitle = "Our Impact in Numbers",
  achievementsDescription = "Since 2015, Slaqa has been a cornerstone of beauty and lifestyle in Durban's townships, delivering excellence and fostering community.",
  achievements = defaultAchievements,
}: About3Props = {}) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlayClick = () => {
    if (videoRef.current) {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <section className="py-32 bg-black-900">
      <div className="container mx-auto">
        <div className="mb-14 grid gap-5 text-center md:grid-cols-2 md:text-left">
          <h1 className="text-5xl font-semibold text-[#FFFF00]">{title}</h1>
          <p className="text-white/80">{description}</p>
        </div>
        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={mainImage.src}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-[#FFFF00] p-7 md:w-1/2 lg:w-auto">
              <div>
                <p className="mb-2 text-lg font-semibold text-black-900">{breakout.title}</p>
                <p className="text-black-900/80">{breakout.description}</p>
              </div>
              <Button 
                variant="default" 
                className="mr-auto bg-black-900 text-[#FFFF00] hover:bg-gray-900"
                asChild
              >
                <a href={breakout.buttonUrl}>
                  {breakout.buttonText}
                </a>
              </Button>
            </div>
            {secondaryImage.src.match(/\.(mp4|webm|ogg)$/i) ? (
              <div className="flex flex-col gap-4 md:w-1/2 lg:w-auto lg:min-h-[400px]">
                <div className="relative grow basis-0 rounded-xl overflow-hidden md:w-full lg:w-full group min-h-[300px] md:min-h-[250px] lg:min-h-[380px]">
                  <video
                    ref={videoRef}
                    src={secondaryImage.src}
                    autoPlay={false}
                    loop
                    muted={!isPlaying}
                    playsInline
                    controls={isPlaying}
                    className="w-full h-full object-cover rounded-xl bg-black"
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                  />
                  {!isPlaying && (
                    <div 
                      className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black/50 transition-colors"
                      onClick={handlePlayClick}
                    >
                      <div className="bg-[#FFFF00] rounded-full p-4 group-hover:scale-110 transition-transform flex items-center justify-center">
                        <svg className="w-8 h-8 text-black-900 fill-black-900" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <polygon points="5 3 19 12 5 21" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                {secondaryImage.title && (
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-semibold text-[#FFFF00]">{secondaryImage.title}</h3>
                  </div>
                )}
              </div>
            ) : (
              <img
                src={secondaryImage.src}
                alt={secondaryImage.alt}
                className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
              />
            )}
          </div>
        </div>
        <div className="py-32">
          <p className="text-center text-white text-lg">{companiesTitle}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {companies.map((company, idx) => (
              <div className="flex items-center gap-3" key={company.src + idx}>
                <img
                  src={company.src}
                  alt={company.alt}
                  className="h-6 w-auto md:h-8 opacity-60"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-xl bg-[#FFFF00] p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-4xl font-semibold text-black-900">{achievementsTitle}</h2>
            <p className="max-w-screen-sm text-black-900/80">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p className="text-black-900/80">{item.label}</p>
                <span className="text-4xl font-semibold md:text-5xl text-black-900">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute -top-1 right-1 z-10 hidden h-full w-full bg-[linear-gradient(to_right,hsl(var(--muted-foreground))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--muted-foreground))_1px,transparent_1px)] bg-[size:80px_80px] opacity-15 [mask-image:linear-gradient(to_bottom_right,#000,transparent,transparent)] md:block"></div>
        </div>
      </div>
    </section>
  )
}
