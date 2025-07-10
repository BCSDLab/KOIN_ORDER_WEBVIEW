import { useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import { ShopInfoSummaryResponse } from '@/api/shop/entity';

interface ImageCarouselProps {
  images: ShopInfoSummaryResponse['images'];
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function ImageCarousel({ images, targetRef }: ImageCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * containerRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isInteracting) return;

    const interval = setInterval(() => {
      const nextIndex = (scrollIndex + 1) % images.length;
      scrollToIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length, isInteracting, scrollIndex]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollLeft = containerRef.current.scrollLeft;
    const width = containerRef.current.clientWidth;
    const index = Math.round(scrollLeft / width);
    setScrollIndex(index);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const startInteraction = () => setIsInteracting(true);
    const endInteraction = () => setTimeout(() => setIsInteracting(false), 200);

    container.addEventListener('touchstart', startInteraction);
    container.addEventListener('touchend', endInteraction);
    container.addEventListener('mousedown', startInteraction);
    container.addEventListener('mouseup', endInteraction);
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('touchstart', startInteraction);
      container.removeEventListener('touchend', endInteraction);
      container.removeEventListener('mousedown', startInteraction);
      container.removeEventListener('mouseup', endInteraction);
      container.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative h-[350px] w-full overflow-hidden" ref={targetRef}>
      <div
        ref={containerRef}
        className="scrollbar-hide flex h-full w-full snap-x snap-mandatory overflow-x-scroll scroll-smooth"
      >
        {images.map((image, index) => (
          <div key={index} className="h-full w-full flex-shrink-0 snap-start">
            <img src={image.image_url} alt={`slide ${index}`} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1">
        {images.length > 1 &&
          images.map((_, index) => (
            <div
              key={index}
              className={clsx(
                'h-1.5 w-1.5 rounded-full transition-colors duration-300',
                scrollIndex === index ? 'bg-white' : 'bg-neutral-400',
              )}
            />
          ))}
      </div>
    </div>
  );
}
