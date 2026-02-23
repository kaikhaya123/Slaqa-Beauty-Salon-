'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ImageMouseTrailProps {
  items: string[];
  maxNumberOfImages?: number;
  distance?: number;
  imgClass?: string;
  fadeAnimation?: boolean;
  children?: React.ReactNode;
}

interface TrailImage {
  id: number;
  x: number;
  y: number;
  image: string;
  opacity: number;
}

export default function ImageMouseTrail({
  items,
  maxNumberOfImages = 5,
  distance = 25,
  imgClass = 'w-40 h-48',
  fadeAnimation = true,
  children,
}: ImageMouseTrailProps) {
  const [trail, setTrail] = useState<TrailImage[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const counterRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Check if mouse is over the container
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const isOver =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      setIsHovering(isOver);

      // Only add images if hovering over container
      if (!isOver) return;

      setMousePos({ x: e.clientX, y: e.clientY });

      // Only add image if mouse has moved far enough
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > distance) {
        const randomImage = items[Math.floor(Math.random() * items.length)];
        const newImage: TrailImage = {
          id: counterRef.current++,
          x: e.clientX,
          y: e.clientY,
          image: randomImage,
          opacity: 1,
        };

        setTrail((prev) => {
          const updated = [...prev, newImage];
          // Keep only maxNumberOfImages
          return updated.slice(-maxNumberOfImages);
        });

        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
      // Clear trail when leaving the section
      setTrail([]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    containerRef.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      containerRef.current?.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [items, distance, maxNumberOfImages]);

  // Fade out animation
  useEffect(() => {
    const fadeInterval = setInterval(() => {
      setTrail((prev) =>
        prev
          .map((img) => ({
            ...img,
            opacity: fadeAnimation ? img.opacity - 0.1 : img.opacity,
          }))
          .filter((img) => img.opacity > 0)
      );
    }, 50);

    return () => clearInterval(fadeInterval);
  }, [fadeAnimation]);

  return (
    <div 
      ref={containerRef} 
      className='relative w-full min-h-screen overflow-hidden'
      style={{ isolation: 'isolate' }}
    >
      {/* Trail images - only render when hovering */}
      {isHovering &&
        trail.map((img) => (
          <div
            key={img.id}
            className='fixed pointer-events-none'
            style={{
              left: `${img.x}px`,
              top: `${img.y}px`,
              opacity: img.opacity,
              transform: 'translate(-50%, -50%)',
              transition: 'opacity 0.3s ease-out',
              zIndex: 9999,
            }}
          >
            <img
              src={img.image}
              alt='trail'
              className={`${imgClass} object-cover rounded-lg shadow-lg`}
              draggable={false}
            />
          </div>
        ))}

      {/* Content */}
      <div className='relative z-10 flex items-center justify-center min-h-screen w-full'>
        {children}
      </div>
    </div>
  );
}
