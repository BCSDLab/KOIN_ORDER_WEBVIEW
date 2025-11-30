import { useState, useEffect } from 'react';
import type { ReviewSorter } from '@/api/shop/entity';
import CheckIcon from '@/assets/Home/check-icon.svg';
import CloseIcon from '@/assets/Main/close-icon.svg';
import BottomModal, {
  BottomModalContent,
  BottomModalFooter,
  BottomModalHeader,
} from '@/components/UI/BottomModal/BottomModal';
import useLogger from '@/util/hooks/analytics/useLogger';

export const sortOptions: { id: ReviewSorter; label: string }[] = [
  { id: 'LATEST', label: '최신순' },
  { id: 'OLDEST', label: '오래된순' },
  { id: 'HIGHEST_RATING', label: '평점 높은순' },
  { id: 'LOWEST_RATING', label: '평점 낮은순' },
];

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (sort: ReviewSorter) => void;
  defaultSort: ReviewSorter;
}

export default function SortModal({ isOpen, onClose, onApply, defaultSort }: SortModalProps) {
  const [selectedSort, setSelectedSort] = useState<ReviewSorter>('LATEST');
  const logger = useLogger();

  const handleSelect = (sortId: ReviewSorter) => {
    const selectedLabel = sortOptions.find((opt) => opt.id === sortId)?.label ?? '';

    logger.actionEventClick({
      team: 'BUSINESS',
      event_label: 'shop_detail_view_review_can',
      value: selectedLabel,
    });

    setSelectedSort(sortId);
    onApply(sortId);
    onClose();
  };

  useEffect(() => {
    if (isOpen) setSelectedSort(defaultSort);
  }, [isOpen, defaultSort]);

  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <BottomModalHeader className="flex items-center justify-center gap-[10px] px-8 py-3">
        <div className="w-full text-[18px] font-semibold">정렬</div>
        <button onClick={onClose}>
          <CloseIcon />
        </button>
      </BottomModalHeader>

      <BottomModalContent className="px-8 pt-4 pb-3">
        <div className="flex flex-col items-start gap-5">
          {sortOptions.map((option) => {
            const isActive = selectedSort === option.id;
            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`flex w-full items-center justify-between ${isActive ? 'text-primary-500' : ''}`}
              >
                {option.label}
                {isActive && <CheckIcon className="fill-primary-500" />}
              </button>
            );
          })}
        </div>
      </BottomModalContent>

      <BottomModalFooter />
    </BottomModal>
  );
}
