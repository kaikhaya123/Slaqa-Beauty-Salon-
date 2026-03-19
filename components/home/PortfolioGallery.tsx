'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const items = [
  {
    id: 1,
    url: '/Images/slaqa_salon_1771343144242.jpeg',
    title: 'Fade Haircut',
  },
  {
    id: 2,
    url: '/Images/1771342149544.jpeg',
    title: 'Classic Cut',
  },
  {
    id: 3,
    url: '/Images/slaqa_salon_1771564905185.jpeg',
    title: 'Barber Styling',
  },
  {
    id: 4,
    url: '/Images/1771342470193.jpeg',
    title: 'Premium Grooming',
  },
  {
    id: 5,
    url: '/Images/slaqa_salon_1771564366987.jpeg',
    title: 'Fade Haircut',
  },
  {
    id: 6,
    url: '/Images/slaqa_salon_1771575650708.jpeg',
    title: 'Classic Cut',
  },
  {
    id: 7,
    url: '/Images/slaqa_salon_1772693107248.jpeg',
    title: 'Barber Styling',
  },
  {
    id: 8,
    url: '/Images/1771342250271.jpeg',
    title: 'Premium Grooming',
  },
];

function Carousel() {
  const [activeItem, setActiveItem] = useState(items[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    // @ts-ignore
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);

  return (
    <section className='w-full py-16 md:py-24 bg-[#FFFF00]'>
      <div className='max-w-7xl mx-auto px-5'>
        <h2 className='text-5xl md:text-6xl leading-[120%] font-black mb-12 text-center text-black-900'>
          View Our Slaqa Signature Styles <br /> & Expert Craftsmanship
        </h2>
        <div className='w-full overflow-hidden'>
          <motion.div
            ref={carousel}
            drag='x'
            whileDrag={{ scale: 0.95 }}
            dragElastic={0.2}
            dragConstraints={{ right: 0, left: -width }}
            dragTransition={{ bounceDamping: 30 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className='flex will-change-transform cursor-grab active:cursor-grabbing'
          >
            {items?.map((itemData, index) => {
              return (
                <motion.div key={itemData?.id ?? itemData?.url} className='min-w-[20rem] min-h-100 p-2'>
                  <Image
                    src={itemData?.url}
                    width={400}
                    height={400}
                    alt={itemData?.title}
                    className='w-full h-full object-cover pointer-events-none  rounded-md'
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Carousel;
