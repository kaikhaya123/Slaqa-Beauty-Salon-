// @ts-nocheck
'use client';

import { useScroll, useTransform, motion } from 'motion/react';
import { useRef } from 'react';
import Image from 'next/image';

export default function Index() {
  const container = useRef();
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  return (
    <>
      <main ref={container} className='relative bg-black'>
        <Section1 scrollYProgress={scrollYProgress} />
        <Section2 scrollYProgress={scrollYProgress} />
        <footer className='relative bg-black-900 overflow-hidden'>
          <div 
            className='absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30'
            style={{
              backgroundImage: 'url(/Images/giorgio-trovato-k5xtu6DApUk-unsplash.jpg)',
            }}
          ></div>
          <div className='absolute inset-0 bg-black/70'></div>
          
          <section className='relative z-10 py-20 md:py-32'>
            <div className='max-w-5xl mx-auto px-5 text-center'>
              <h2 className='text-5xl md:text-7xl font-black text-white mb-6 leading-tight'>
                Ready for Your <br /> Next Haircut?
              </h2>
              <p className='text-lg md:text-xl text-white mb-8 max-w-2xl mx-auto'>
                Experience premium barbering and professional grooming at Slaqa Salon. Let our expert barbers craft the perfect style for you.
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                <a
                  href='/book'
                  className='bg-[#FFFF00] text-black-900 font-black px-8 py-4 rounded-full text-lg hover:bg-white transition-colors duration-300 hover:shadow-lg hover:shadow-[#FFFF00]/50'
                >
                  Book Now
                </a>
                <a
                  href='/barbers'
                  className='border-2 border-white text-white font-black px-8 py-4 rounded-full text-lg hover:bg-[#FFFF00] hover:text-black-900 transition-colors duration-300'
                >
                  View Our Barbers
                </a>
              </div>
            </div>
          </section>
        </footer>
      </main>
    </>
  );
}

const Section1 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.5], [0, -5]);
  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative h-screen bg-linear-to-t to-[#FFFF00] from-[#ffeb3b] flex flex-col items-center justify-center text-black-900'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

      <h1 className='2xl:text-7xl text-5xl md:text-6xl px-8 font-black text-center tracking-tight leading-[120%] relative z-10'>
        WELCOME TO SLAQA<br /> SALON, BEAUTY BARBERING
      </h1>
    </motion.section>
  );
};

const Section2 = ({ scrollYProgress }) => {
  const scale = useTransform(scrollYProgress, [0.5, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0.5, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='relative min-h-screen bg-[#FFFF00] text-black-900 py-16 md:py-24'
    >
      <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#FFFF001a_1px,transparent_1px),linear-gradient(to_bottom,#FFFF001a_1px,transparent_1px)] bg-[size:54px_54px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>
      <article className='max-w-7xl mx-auto px-5 relative z-10'>
        <h1 className='text-5xl md:text-6xl leading-[120%] font-black mb-12 text-black-900'>
          View Our Signature Styles <br /> & Expert Craftsmanship
        </h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          <figure className='relative h-96 rounded-lg overflow-hidden group'>
            <Image
              src='/Images/1771342133405.jpeg'
              alt='Fade Haircut'
              fill
              className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 rounded-lg'
            />
          </figure>
          <figure className='relative h-96 rounded-lg overflow-hidden group'>
            <Image
              src='/Images/1771342149544.jpeg'
              alt='Classic Cut'
              fill
              className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 rounded-lg'
            />
          </figure>
          <figure className='relative h-96 rounded-lg overflow-hidden group'>
            <Image
              src='/Images/1771342602428.jpeg'
              alt='Barber Styling'
              fill
              className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 rounded-lg'
            />
          </figure>
          <figure className='relative h-96 rounded-lg overflow-hidden group'>
            <Image
              src='/Images/1771341907168.jpeg'
              alt='Premium Grooming'
              fill
              className='object-cover w-full h-full group-hover:scale-110 transition-transform duration-300 rounded-lg'
            />
          </figure>
        </div>
      </article>
    </motion.section>
  );
};
