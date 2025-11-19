import { useRef } from 'react';
import Star from '@/assets/Home/star-icon.svg';

interface StarListProps {
  average_rating: number;
  size?: number;
  editable?: boolean;
  value?: number;
  onChange?: (value: number) => void;
}

export default function StarList({ average_rating, size = 16, editable = false, value = 0, onChange }: StarListProps) {
  const displayRating = editable ? value : average_rating;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateRatingByTouch = (e: React.TouchEvent) => {
    if (!editable || !onChange || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const touchX = e.touches[0].clientX;
    const relativeX = touchX - rect.left;

    const starWidth = size;
    let newValue = Math.ceil(relativeX / starWidth);

    if (newValue < 1) newValue = 1;
    if (newValue > 5) newValue = 5;

    onChange(newValue);
  };

  return (
    <div
      ref={containerRef}
      className="inline-flex items-start gap-[2px]"
      onTouchStart={updateRatingByTouch}
      onTouchMove={updateRatingByTouch}
    >
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isActive = starValue <= displayRating;

        const handleClick = () => {
          if (!editable || !onChange) return;
          onChange(starValue);
        };

        return (
          <button
            key={starValue}
            type="button"
            onClick={handleClick}
            disabled={!editable}
            className={editable ? 'cursor-pointer' : 'cursor-default'}
          >
            <Star width={size} height={size} fill={isActive ? '#FFC62B' : '#D9D9D9'} />
          </button>
        );
      })}
    </div>
  );
}
