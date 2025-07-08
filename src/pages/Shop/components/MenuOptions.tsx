import TypeIcon from './TypeIcon';
import { OptionGroup } from '@/api/shop/entity';

interface SelectedOption {
  optionGroupId: number;
  optionId: number;
}

interface MenuOptionsProps {
  optionGroups: OptionGroup[];
  selectedOptions: SelectedOption[];
  selectOption: (optionGroupId: number, optionId: number, isSingle: boolean) => void;
}

export default function MenuOptions({ optionGroups, selectedOptions, selectOption }: MenuOptionsProps) {
  return (
    <div className="flex flex-col items-center">
      {optionGroups.map((group) => {
        const isSingle = group.min_select === 1 && group.max_select === 1;
        const groupSelected = selectedOptions
          .filter((opt) => opt.optionGroupId === group.id)
          .map((opt) => opt.optionId);

        return (
          <div
            key={group.id}
            className="mb-3 flex w-full scroll-mt-[124px] flex-col rounded-xl border border-neutral-300 bg-white px-6 py-4"
          >
            <div className="flex flex-col gap-5">
              {group.options.map((option) => {
                const checked = groupSelected.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    className="flex items-center gap-2 py-2"
                    onClick={() => selectOption(group.id, option.id, isSingle)}
                    role={isSingle ? 'radio' : 'checkbox'}
                    aria-checked={checked}
                  >
                    <TypeIcon isSingle={isSingle} checked={checked} />
                    <span className="text-base">{option.name}</span>
                    <span className="ml-auto text-base font-semibold">{option.price.toLocaleString()}원</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
