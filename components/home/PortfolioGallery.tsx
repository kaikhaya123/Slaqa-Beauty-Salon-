"use client"

import { motion, useTransform, useScroll } from "framer-motion"
import { useRef } from "react"

const PortfolioGallery = () => {
  return (
    <div className="bg-[#FFFF00] mt-24 md:mt-32 lg:mt-40">
      <div className="flex min-h-32 sm:min-h-40 md:min-h-48 lg:min-h-56 xl:min-h-64 items-center justify-center px-4 py-8 md:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-bebas text-5xl text-black-900 sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-wide text-center leading-none hover:scale-105 transition-all duration-300">
            <motion.span 
              className="text-black"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              SIGNATURE CUTS
            </motion.span>{" "}
            <motion.span 
              className="text-black"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              BY SLAQA SALON
            </motion.span>
          </h2>
        </motion.div>
      </div>
      <HorizontalScrollCarousel />
    </div>
  )
}

const HorizontalScrollCarousel = () => {
  const targetRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
  })

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-85%"])

  return (
    <section ref={targetRef} className="relative h-[250vh] bg-black -mt-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-80 right-20 text-4xl font-bold text-black transform rotate-12"></div>
        <div className="absolute bottom-40 left-20 text-5xl font-bold text-black transform -rotate-6"></div>
      </div>
      
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-8">
          {portfolioCards.map((card) => {
            return (
              <Card key={card.id} card={card} />
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

interface CardType {
  id: number
  url: string
}

const Card = ({ card }: { card: CardType }) => {
  return (
    <motion.div 
      className="group relative h-[400px] w-[350px] overflow-hidden bg-[#FFFF00]  rounded-xl shadow-lg"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
    >
      <motion.div
        style={{
          backgroundImage: `url(${card.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110"
        initial={{ scale: 1.2, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      ></motion.div>
      
    </motion.div>
  )
}

export default PortfolioGallery

const portfolioCards: CardType[] = [
  {
    url: "/Images/1771341907168.jpeg",
    id: 1,
  },
  {
    url: "/Images/slaqa_salon_1771343144242.jpeg",
    id: 2,
  },
  {
    url: "/Images/1771342250271.jpeg",
    id: 3,
  },
  {
    url: "/Images/slaqa_salon_1771343202061.jpeg",
    id: 4,
  },
  {
    url: "/Images/slaqa_salon_1771343429789.jpeg",
    id: 5,
  },
  {
    url: "/Images/1771341949554.jpeg",
    id: 6,
  },
  {
    url: "/Images/1771342519304.jpeg",
    id: 7,
  },
  {
    url: "/Images/1771342149544.jpeg",
    id: 8,
  },
  {
    url: "/Images/1771342602428.jpeg",
    id: 9,
  },
  {
    url: "/Images/1771342549447.jpeg",
    id: 10,
  },
]
