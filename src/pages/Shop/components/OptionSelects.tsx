import { Price } from '@/api/shop/entity';

interface OptionsBlockProps {
  options: Price[];
}

export default function OptionSelects({ options }: OptionsBlockProps) {
  return (
    <div className="flex flex-col gap-5">
      {options.map((option) => (
        <>
          <div key={option.id} className="flex items-center justify-between">
            <span className="h-[1.625rem] text-base">{option.name}</span>
            <span className="text-base font-semibold">{option.price.toLocaleString()}원</span>
          </div>
        </>
      ))}
    </div>
  );
}
