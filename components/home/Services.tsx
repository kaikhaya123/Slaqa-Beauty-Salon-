'use client';

import Image from 'next/image';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
  SliderBtnGroup,
  ProgressSlider,
  SliderBtn,
  SliderContent,
  SliderWrapper,
} from '@/components/ui/progressive-carousel';

const items = [
  {
    img: '/Images/slaqa_salon_1771343144242.jpeg',
    title: 'Haircut & Fade',
    desc: 'Professional haircuts with modern fades and razor-sharp clean lines. Classic to cutting-edge styles.',
    sliderName: 'haircut',
  },
  {
    img: '/Images/slaqa_salon_1771343202061.jpeg',
    title: 'Beard Trim & Shape',
    desc: 'Expert beard sculpting, lining and professional grooming for a polished, distinguished look.',
    sliderName: 'beard',
  },
  {
    img: '/Images/slaqa_salon_1771343348133.jpeg',
    title: 'Hair Styling',
    desc: 'Creative styling for events, occasions and everyday premium looks — tailored to your personality.',
    sliderName: 'styling',
  },
  {
    img: '/Images/slaqa_salon_1771343429789.jpeg',
    title: 'Hot Towel Shave',
    desc: 'Traditional wet shave with a steaming hot towel treatment. The ultimate relaxation experience.',
    sliderName: 'shave',
  },
];

export default function Services() {
  const isMobile = useMediaQuery('(min-width: 640px)');

  return (
    <>
      <ProgressSlider
        vertical={isMobile ? true : false}
        fastDuration={300}
        duration={4000}
        activeSlider='haircut'
        className='sm:flex'
      >
        <SliderBtnGroup className='sm:relative absolute bottom-0 lg:w-md sm:w-96 w-full z-10 sm:flex sm:flex-col grid grid-cols-2 sm:h-[500px] h-fit sm:bg-gray-900 bg-gray-900/80 backdrop-blur-md overflow-hidden'>
          {items.map((item, index) => (
            <SliderBtn
              key={index}
              value={item.sliderName}
              className='text-left p-3 sm:border-b border border-gray-700 sm:pl-5 sm:pb-0 pb-6 sm:flex-1'
              progressBarClass='left-0 sm:top-0 bottom-0 bg-amber-400 sm:w-1 sm:h-full h-1 w-full'
            >
              <h2 className='relative px-3 py-0.5 rounded-sm w-fit bg-amber-400 text-gray-900 font-bold text-sm mb-2'>
                {item.title}
              </h2>
              <p className='text-sm font-medium text-gray-300 line-clamp-2'>
                {item.desc}
              </p>
            </SliderBtn>
          ))}
        </SliderBtnGroup>

        <SliderContent className='w-full'>
          {items.map((item, index) => (
            <SliderWrapper
              className='h-full'
              key={index}
              value={item.sliderName}
            >
              <Image
                className='h-[500px] object-cover w-full'
                src={item.img}
                width={1900}
                height={1080}
                alt={item.title}
              />
            </SliderWrapper>
          ))}
        </SliderContent>
      </ProgressSlider>
    </>
  );
}
