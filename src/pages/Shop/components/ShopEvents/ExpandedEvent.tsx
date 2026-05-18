import { useRef, useState } from 'react';
import clsx from 'clsx';
import type { Events } from '@/api/shop/entity';
import UpArrow from '@/assets/Shop/chevron-up-icon.svg';
import Prepare from '@/assets/Shop/preparing-icon.svg';
import { formatDate } from '@/util/ts/formatDate';

interface EventProps {
  event: Events;
  onToggleOpen: () => void;
  contentId: string;
  isOpen: boolean;
}

export default function ExpandedEvent({ event, onToggleOpen, contentId, isOpen }: EventProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const thumbnailImages = event.thumbnail_image ?? [];
  const shouldShowIndicator = thumbnailImages.length > 1;

  const handleImageScroll = () => {
    if (!containerRef.current) return;

    const { scrollLeft, clientWidth } = containerRef.current;
    if (clientWidth === 0) return;

    const nextIndex = Math.round(scrollLeft / clientWidth);
    setCurrentImageIndex(Math.min(Math.max(nextIndex, 0), thumbnailImages.length - 1));
  };

  return (
    <div className="flex w-full flex-col gap-4 px-6 py-4">
      <div>
        <div className="flex justify-between">
          <p className="text-[15px] leading-[1.6] font-semibold">{event.title}</p>
          <button
            type="button"
            onClick={onToggleOpen}
            aria-expanded={isOpen}
            aria-controls={contentId}
            tabIndex={isOpen ? 0 : -1}
            className="flex items-center justify-center"
          >
            <p className="text-[12px] leading-[1.6] font-medium text-neutral-500">접기</p>
            <UpArrow />
          </button>
        </div>
        <p className="text-xs leading-[1.6] font-medium text-neutral-500">
          {formatDate(event.start_date)}~{formatDate(event.end_date)}
        </p>
      </div>
      <div>
        <div
          ref={containerRef}
          onScroll={handleImageScroll}
          className="scrollbar-hide flex h-55 w-full snap-x snap-mandatory overflow-x-auto scroll-smooth bg-neutral-100"
        >
          {thumbnailImages.length > 0 ? (
            thumbnailImages.map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="flex h-full w-full flex-shrink-0 snap-start items-center justify-center"
              >
                <img src={image} alt={`이벤트 이미지 ${index + 1}`} className="h-full w-full object-cover" />
              </div>
            ))
          ) : (
            <div className="flex h-full w-full flex-shrink-0 snap-start flex-col items-center justify-center">
              <Prepare className="h-[79px] w-[100px] rounded-lg object-cover" />
              <p className="text-xs leading-[1.6] font-medium text-gray-400">사장님이 이미지를 준비중이에요</p>
            </div>
          )}
        </div>
        {shouldShowIndicator && (
          <div className="mt-3 flex justify-center gap-2">
            {thumbnailImages.map((image, index) => (
              <span
                key={`${image}-${index}`}
                className={clsx({
                  'h-2 w-2 rounded-full': true,
                  'bg-primary-500': currentImageIndex === index,
                  'bg-neutral-300': currentImageIndex !== index,
                })}
              />
            ))}
          </div>
        )}
      </div>
      <div className="flex w-full flex-col">
        <div className="flex h-full flex-col justify-between">
          <p className="text-xs leading-[1.6] font-medium">{event.content}</p>
        </div>
      </div>
    </div>
  );
}
