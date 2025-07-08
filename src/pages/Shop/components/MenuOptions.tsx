import OptionSelects from './OptionSelects';
import { OptionGroup } from '@/api/shop/entity';
import Badge from '@/components/UI/Badge';

interface MenuOptionsProps {
  optionGroups: OptionGroup[];
}

export default function MenuOptions({ optionGroups }: MenuOptionsProps) {
  return (
    <div className="flex flex-col items-center">
      {optionGroups.map((group) => (
        <div
          key={group.id}
          className="mb-3 flex w-full scroll-mt-[124px] flex-col rounded-xl border border-neutral-300 bg-white px-6 py-4"
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
                label={group.min_select === 1 ? '필수' : `${group.min_select}가지 선택`}
                color="primaryLight"
                variant="outlined"
                className="justify-center p-0 px-2 py-[0.125rem] text-xs"
              />
            )}
          </div>
          <OptionSelects
            options={group.options}
            minSelect={group.min_select}
            maxSelect={group.max_select}
            isSelectable={!(group.isRequired && group.min_select === 1)}
          />
        </div>
      ))}
    </div>
  );
}
