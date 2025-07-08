import OptionSelects from './OptionSelects';
import { OptionGroup } from '@/api/shop/entity';
import Badge from '@/components/UI/Badge';

interface MenuOptionsProps {
  optionGroups: OptionGroup[];
}

export default function MenuOptions({ optionGroups }: MenuOptionsProps) {
  return (
    <div className="mb-40 flex flex-col items-center gap-3 px-6">
      {optionGroups.map((group) => (
        <div
          key={group.id}
          className="flex w-full scroll-mt-[124px] flex-col rounded-xl border border-neutral-300 bg-white px-6 py-4"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="flex h-[1.8125rem] text-lg leading-[1.6] font-semibold">{group.name}</span>
              {group.description && (
                <span className="mb-3 flex h-[1.1875rem] text-[12px] leading-[1.6] font-normal text-neutral-500">
                  {group.description}
                </span>
              )}
            </div>
            {group.isRequired && (
              <Badge
                label={group.minSelect === 1 ? '필수' : `${group.minSelect}가지 선택`}
                color="primaryLight"
                variant="outlined"
                className="justify-center p-0 px-2 py-[0.125rem] text-xs"
              />
            )}
          </div>
          <OptionSelects
            options={group.options}
            minSelect={group.minSelect}
            maxSelect={group.maxSelect}
            isSelectable={!(group.isRequired && group.minSelect === 1)}
          />
        </div>
      ))}
    </div>
  );
}
