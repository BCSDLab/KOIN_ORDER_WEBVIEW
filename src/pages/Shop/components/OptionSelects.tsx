import { useState } from 'react';
import { Price } from '@/api/shop/entity';
import CheckboxFalse from '@/assets/Shop/checkbox-false.svg';
import CheckboxTrue from '@/assets/Shop/checkbox-true.svg';
import RadioFalse from '@/assets/Shop/radio-false.svg';
import RadioTrue from '@/assets/Shop/radio-true.svg';
import { useToast } from '@/util/hooks/useToast';

interface OptionsBlockProps {
  options: Price[];
  minSelect: number;
  maxSelect: number;
  isSelectable: boolean;
}

export default function OptionSelects({ options, minSelect, maxSelect, isSelectable }: OptionsBlockProps) {
  const { showToast } = useToast();
  const [optionSelecStates, setOptionSelecState] = useState(
    options.map((option) => ({
      ...option,
      selected: false,
    })),
  );

  const isRadio = minSelect === 1 && maxSelect === 1;

  const toggleOptionSelection = (id: number) => {
    setOptionSelecState((prev) =>
      prev.map((option) =>
        option.id === id
          ? { ...option, selected: !option.selected }
          : isRadio
            ? { ...option, selected: false }
            : option,
      ),
    );
  };

  const handleOptionClick = (id: number) => {
    if (isRadio) {
      toggleOptionSelection(id);
    } else {
      const selectedCount = optionSelecStates.filter((option) => option.selected).length;
      if (selectedCount < maxSelect || optionSelecStates.find((option) => option.id === id)?.selected) {
        toggleOptionSelection(id);
      } else {
        showToast(`최대 ${maxSelect}개까지 선택할 수 있습니다.`);
      }
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {optionSelecStates.map((option) => (
        <button
          key={option.id}
          className="flex items-center justify-between"
          onClick={() => handleOptionClick(option.id)}
          type="button"
        >
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
          <span className="text-base font-semibold">
            {isSelectable && '+'}
            {option.price.toLocaleString()}원
          </span>
        </button>
      ))}
    </div>
  );
}
