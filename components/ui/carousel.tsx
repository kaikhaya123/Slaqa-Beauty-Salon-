'use client';

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import useEmblaCarousel, { UseEmblaCarouselType } from 'embla-carousel-react';
import { EmblaCarouselType, EmblaOptionsType, EmblaPluginType } from 'embla-carousel';

interface CarouselProps {
  options?: EmblaOptionsType;
  plugins?: EmblaPluginType[];
  children: ReactNode;
  className?: string;
}

interface CarouselContextType {
  emblaApi?: EmblaCarouselType;
  scrollSnaps: number[];
  selectedIndex: number;
}

const CarouselContext = React.createContext<CarouselContextType | undefined>(undefined);

export const Carousel = ({ options, plugins, children, className = '' }: CarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, plugins);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onInit, onSelect]);

  return (
    <CarouselContext.Provider value={{ emblaApi, scrollSnaps, selectedIndex }}>
      <div ref={emblaRef} className={`overflow-hidden ${className}`}>
        {children}
      </div>
    </CarouselContext.Provider>
  );
};

interface SliderContainerProps {
  children: ReactNode;
  className?: string;
}

export const SliderContainer = ({ children, className = '' }: SliderContainerProps) => {
  return <div className={`flex flex-col ${className}`}>{children}</div>;
};

interface SliderProps {
  children: ReactNode;
  className?: string;
}

export const Slider = ({ children, className = '' }: SliderProps) => {
  return <div className={`flex-[0_0_auto] ${className}`}>{children}</div>;
};

interface SliderSnapDisplayProps {
  className?: string;
}

export const SliderSnapDisplay = ({ className = '' }: SliderSnapDisplayProps) => {
  const context = React.useContext(CarouselContext);

  if (!context) {
    return null;
  }

  const { scrollSnaps, selectedIndex } = context;

  return (
    <div className={className}>
      {selectedIndex + 1} / {scrollSnaps.length}
    </div>
  );
};

// Optional: Carousel button components
interface CarouselButtonProps {
  onClick: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const PrevButton = ({
  onClick,
  children,
  className = '',
  disabled,
}: CarouselButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'} ${className}`}
    >
      {children}
    </button>
  );
};

export const NextButton = ({
  onClick,
  children,
  className = '',
  disabled,
}: CarouselButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 rounded-lg transition-colors ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'} ${className}`}
    >
      {children}
    </button>
  );
};

interface SliderDotButtonProps {
  onClick: () => void;
  className?: string;
  isActive?: boolean;
}

export const SliderDotButton = ({
  onClick,
  className = '',
  isActive = false,
}: SliderDotButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`w-3 h-3 rounded-full transition-all ${isActive ? 'bg-white' : 'bg-gray-400'} ${className}`}
    />
  );
};
