import { Price } from '@/api/shop/entity';
import CheckboxFalse from '@/assets/Shop/checkbox-false.svg';
import CheckboxTrue from '@/assets/Shop/checkbox-true.svg';
import RadioFalse from '@/assets/Shop/radio-false.svg';
import RadioTrue from '@/assets/Shop/radio-true.svg';

interface OptionsBlockProps {
  options: Price[];
  isRadio: boolean;
}

export default function OptionSelects({ options, isRadio }: OptionsBlockProps) {
  const optionSelecStates = options.map((option) => ({
    ...option,
    selected: false,
  }));

  return (
    <div className="flex flex-col gap-5">
      {optionSelecStates.map((option) => (
        <div key={option.id} className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isRadio ? (
              option.selected ? (
                <RadioTrue />
              ) : (
                <RadioFalse />
              )
            ) : option.selected ? (
              <CheckboxTrue />
            ) : (
              <CheckboxFalse />
            )}

            <span className="h-[1.625rem] text-base">{option.name}</span>
          </div>
          <span className="text-base font-semibold">{option.price.toLocaleString()}원</span>
        </div>
      ))}
    </div>
  );
}
