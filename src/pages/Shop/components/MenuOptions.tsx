import OptionSelects from './OptionSelects';
import { OptionGroup } from '@/api/shop/entity';

interface MenuOptionsProps {
  optionGroups: OptionGroup[];
}

export default function MenuOptions({ optionGroups }: MenuOptionsProps) {
  return (
    <div className="mb-40 flex flex-col items-center gap-3 px-6">
      {optionGroups.map((group) => (
        <div
          key={group.id}
          className="flex w-full scroll-mt-[124px] flex-col rounded-xl border border-neutral-300 bg-white px-4 py-6"
        >
          <span className="flex h-[1.8125rem] text-lg leading-[1.6] font-semibold">{group.name}</span>
          {group.description && (
            <span className="mb-3 flex h-[1.1875rem] text-[12px] leading-[1.6] font-normal text-neutral-500">
              {group.description}
            </span>
          )}
          <OptionSelects options={group.options} />
        </div>
      ))}
    </div>
  );
}
