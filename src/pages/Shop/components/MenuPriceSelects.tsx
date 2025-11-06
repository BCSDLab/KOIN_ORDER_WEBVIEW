import type { Price } from '@/api/shop/entity';
import CheckboxFalse from '@/assets/Shop/checkbox-false.svg';
import CheckboxTrue from '@/assets/Shop/checkbox-true.svg';
import RadioFalse from '@/assets/Shop/radio-false.svg';
import RadioTrue from '@/assets/Shop/radio-true.svg';

interface MenuPriceSelectsProps {
  prices: Price[];
  selectedPriceId: number;
  selectPrice: (priceId: number) => void;
  label?: string;
  description?: string;
  required?: boolean;
}

interface TypeIconProps {
  isSingle: boolean;
  checked: boolean;
}
const TypeIcon = ({ isSingle, checked }: TypeIconProps) => {
  if (isSingle) return checked ? <RadioTrue /> : <RadioFalse />;
  if (!isSingle) return checked ? <CheckboxTrue /> : <CheckboxFalse />;
};

export default function MenuPriceSelects({
  prices,
  selectedPriceId,
  selectPrice,
  label = '가격',
  description,
  required = true,
}: MenuPriceSelectsProps) {
  if (prices.length <= 1) return null;

  return (
    <div className="mb-3 w-full rounded-xl border border-neutral-300 bg-white px-6 py-4">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <span className="block h-[1.8125rem] text-lg leading-[1.6] font-semibold">{label}</span>
          {description && (
            <span className="block h-[1.1875rem] text-[12px] leading-[1.6] font-normal text-neutral-500">
              {description}
            </span>
          )}
        </div>
        {required && (
          <span className="border-primary-300 bg-primary-50 text-primary-500 rounded-full border px-2 py-[0.125rem] text-xs">
            필수
          </span>
        )}
      </div>
      <div className="flex flex-col gap-2">
        {prices.map((price) => (
          <button
            key={price.id}
            type="button"
            className="flex items-center gap-2 py-2"
            onClick={() => selectPrice(price.id)}
            role="radio"
            aria-checked={selectedPriceId === price.id}
          >
            <TypeIcon isSingle={true} checked={selectedPriceId === price.id} />
            <span className="text-base">{price.name}</span>
            <span className="ml-auto text-base font-semibold">{price.price.toLocaleString()}원</span>
          </button>
        ))}
      </div>
    </div>
  );
}
