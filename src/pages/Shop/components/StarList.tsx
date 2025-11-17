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

  return (
    <div className="inline-flex items-start gap-[2px]">
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
