interface RatingProps {
  point: '5' | '4' | '3' | '2' | '1';
  rate: number;
  count: number;
}

export default function Rating({ point, rate, count }: RatingProps) {
  return (
    <div className="inline-flex flex-col items-start">
      <div className="flex w-full items-center gap-3">
        <div className="w-[18px] text-right text-[12px] leading-[160%]">{point}점</div>
        <div className="flex-1 rounded-[10px] bg-neutral-300">
          <div className="relative h-[6px] rounded-[10px] bg-[#FFC62B]" style={{ width: `${rate}%` }} />
        </div>
        <div className="w-[15px] text-[13px] leading-[160%] text-neutral-500">{count}</div>
      </div>
    </div>
  );
}
