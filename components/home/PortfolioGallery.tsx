"use client"

import { motion, useTransform, useScroll } from "framer-motion"
import { useRef } from "react"

const PortfolioGallery = () => {
  return (
    <div className="bg-black mt-24 md:mt-32 lg:mt-40">
      <div className="flex min-h-32 sm:min-h-40 md:min-h-48 lg:min-h-56 xl:min-h-64 items-center justify-center px-4 py-8 md:py-12 lg:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-wide text-center leading-tight transform hover:scale-105 transition-all duration-300 drop-shadow-2xl">
            <motion.span 
              className="text-white"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              OUR
            </motion.span>{" "}
            <motion.span 
              className="text-white"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              PRO BARBER SHOP HAIRCUTS
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
        <div className="absolute top-80 right-20 text-4xl font-bold text-white transform rotate-12">CUTS</div>
        <div className="absolute bottom-40 left-20 text-5xl font-bold text-white transform -rotate-6">STYLE</div>
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
      className="group relative h-[400px] w-[350px] overflow-hidden bg-cream-100 rounded-xl shadow-lg"
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
    url: "/Images/1767770754149.jpeg",
    id: 1,
  },
  {
    url: "/Images/1767770724602.jpeg",
    id: 2,
  },
  {
    url: "/Images/1767770814779.jpeg",
    id: 3,
  },
  {
    url: "/Images/1767770899302.jpeg",
    id: 4,
  },
  {
    url: "/Images/1767770830465.jpeg",
    id: 5,
  },
  {
    url: "/Images/1767770936409.jpeg",
    id: 6,
  },
  {
    url: "/Images/1767771103496.jpeg",
    id: 7,
  },
  {
    url: "/Images/1767770857424.jpeg",
    id: 8,
  },
  {
    url: "/Images/1767771187352.jpeg",
    id: 9,
  },
]
