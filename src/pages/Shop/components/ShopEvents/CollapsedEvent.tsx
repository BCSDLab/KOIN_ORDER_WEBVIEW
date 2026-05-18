import Lottie from 'lottie-react';
import type { Events } from '@/api/shop/entity';
import LoadingLottie from '@/assets/lottie/jumping.json';
import DownArrow from '@/assets/Shop/chevron-down-icon.svg';
import useLogger from '@/util/hooks/analytics/useLogger';
import { formatDate } from '@/util/ts/formatDate';

interface EventProps {
  event: Events;
  onToggleOpen: () => void;
  contentId: string;
  isOpen: boolean;
}

export default function CollapsedEvent({ event, onToggleOpen, contentId, isOpen }: EventProps) {
  const thumbnailImage = event.thumbnail_image?.[0];
  const logger = useLogger();

  const handleDetailClick = () => {
    logger.actionEventClick({
      team: 'BUSINESS',
      event_label: 'shop_benefit_detail',
      value: event.shop_name,
    });

    onToggleOpen();
  };

  return (
    <div className="flex w-full px-6 py-3">
      <div>
        {thumbnailImage ? (
          <img src={thumbnailImage} alt="이벤트 이미지" className="h-[70px] w-[70px] rounded-lg object-cover" />
        ) : (
          <Lottie animationData={LoadingLottie} className="h-[70px] w-[70px] rounded-lg" />
        )}
      </div>
      <div className="ml-3 flex min-h-[70px] w-full flex-col">
        <div className="flex w-full justify-between">
          <p className="text-[15px] leading-[1.6] font-semibold">{event.title}</p>
          <button
            type="button"
            onClick={handleDetailClick}
            aria-expanded={isOpen}
            aria-controls={contentId}
            tabIndex={isOpen ? -1 : 0}
            className="flex items-center justify-center"
          >
            <p className="text-xs leading-[1.6] font-medium text-neutral-500">상세보기</p>
            <DownArrow />
          </button>
        </div>
        <div className="flex h-full flex-col justify-between">
          <p className="line-clamp-2 text-xs leading-[1.6] font-medium">{event.content}</p>
          <p className="text-xs leading-[1.6] font-[400] text-gray-400">
            {formatDate(event.start_date)}~{formatDate(event.end_date)}
          </p>
        </div>
      </div>
    </div>
  );
}
