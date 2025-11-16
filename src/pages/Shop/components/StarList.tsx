import Star from '@/assets/Home/star-icon.svg';

interface StarListProps {
  average_rating: number;
}

export default function StarList({ average_rating }: StarListProps) {
  const emptyStarList = new Array(5 - Math.floor(average_rating)).fill(false);
  const starList = new Array(Math.floor(average_rating)).fill(true);

  const rating = [...starList, ...emptyStarList];

  return (
    <div className="inline-flex items-start gap-[2px]">
      {rating.map((ratio, idx) => (
        <Star key={idx} fill={ratio ? '#FFC62B' : '#D9D9D9'} />
      ))}
    </div>
  );
}
