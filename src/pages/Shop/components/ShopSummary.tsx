import { useNavigate } from 'react-router-dom';
import type { ShopInfoSummaryResponse } from '@/api/shop/entity.ts';
import ChevronRightIcon from '@/assets/Common/chevron-right.svg';
import StarIcon from '@/assets/Common/star-icon.svg';
import SpeakerIcon from '@/assets/Shop/speaker-icon.svg';
import Badge from '@/components/UI/Badge';

interface ShopSummaryProps {
  id: string;
  shopInfoSummary: ShopInfoSummaryResponse;
}

export default function ShopSummary({ shopInfoSummary, id }: ShopSummaryProps) {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col items-center justify-center p-6">
        <span className="mb-2 self-start text-xl leading-[1.6] font-bold">{shopInfoSummary.name}</span>
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-between gap-1">
            <div className="flex h-[25px] w-[25px] items-center justify-center">
              <StarIcon />
            </div>
            <span className="text-sm leading-[1.6] font-semibold">{shopInfoSummary.rating_average}</span>
            <span className="text-sm leading-[1.6] font-semibold">·</span>
            <span className="text-sm leading-[1.6] font-semibold">리뷰 {shopInfoSummary.review_count}</span>
            <div className="flex h-5 w-5 items-center justify-center">
              <ChevronRightIcon fill="black" />
            </div>
          </div>
          <div
            className="shadow-1 flex items-center justify-center gap-1 rounded-full border-[0.5px] border-neutral-400 bg-white py-1 pr-2 pl-3"
            onClick={() => navigate(`/shop-detail/${id}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/shop-detail/${id}`);
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed="false"
          >
            <div className="text-[10px] text-neutral-500">가게정보·원산지</div>
            <div className="flex h-4 w-4 items-center justify-center">
              <ChevronRightIcon fill="#CACACA" />
            </div>
          </div>
        </div>
        {shopInfoSummary.is_delivery_available ||
          (shopInfoSummary.is_takeout_available && (
            <div className="mt-4 self-start">
              {shopInfoSummary.is_delivery_available && <Badge label="배달 가능" color="white" size="sm" />}
              {shopInfoSummary.is_takeout_available && <Badge label="포장 가능" color="white" size="sm" />}
            </div>
          ))}
        <div className="mt-4 flex w-full justify-between gap-3 self-start">
          <a
            href="#배달금액"
            className="shadow-1 flex h-14 w-full min-w-fit items-center justify-between gap-3 rounded-xl bg-white py-2 pr-2 pl-3"
            onClick={() => navigate(`/shop-detail/${id}#배달금액`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/shop-detail/${id}#배달금액`);
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed="false"
          >
            <div className="flex w-fit flex-col gap-[2px]">
              <div className="flex gap-2">
                <span className="text-[12px] leading-[1.6] font-normal">최소주문</span>
                <span className="text-[12px] leading-[1.6] font-normal text-neutral-500">
                  {shopInfoSummary.minimum_order_amount.toLocaleString()}원
                </span>
              </div>
              <div className="flex gap-2">
                <span className="text-[12px] leading-[1.6] font-normal">배달금액</span>
                <span className="text-[12px] leading-[1.6] font-normal text-neutral-500">
                  {shopInfoSummary.minimum_delivery_tip} - {shopInfoSummary.maximum_delivery_tip}원
                </span>
              </div>
            </div>
            <div className="flex items-center justify-center pr-1">
              <ChevronRightIcon fill="#727272" />
            </div>
          </a>
          <a
            href="#가게알림"
            className="shadow-1 flex h-14 w-full items-center justify-between gap-2 rounded-xl bg-white py-2 pr-2 pl-3"
            onClick={() => navigate(`/shop-detail/${id}#가게알림`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate(`/shop-detail/${id}#가게알림`);
              }
            }}
            tabIndex={0}
            role="button"
            aria-pressed="false"
          >
            <div className="flex items-center gap-2">
              <SpeakerIcon />
              <span className="line-clamp-2 w-full text-[12px] leading-[1.6]">{shopInfoSummary.introduction}</span>
            </div>
            <div className="flex items-center justify-center pr-1">
              <ChevronRightIcon fill="#727272" />
            </div>
          </a>
        </div>
      </div>
    </>
  );
}
