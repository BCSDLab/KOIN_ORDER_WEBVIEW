import { useParams, Link } from 'react-router-dom';
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
  const { isOrderable } = useParams();

  if (isOrderable !== 'true' && isOrderable !== 'false') {
    throw new Error('isOrderable parameter is required');
  }

  const isOrderableBoolean = isOrderable === 'true';

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
          <Link
            to={`/shop-detail/${isOrderable}/${id}`}
            className="shadow-1 flex items-center justify-center gap-1 rounded-full border-[0.5px] border-neutral-400 bg-white py-1 pr-2 pl-3"
          >
            <div className="text-[10px] text-neutral-500">가게정보·원산지</div>
            <div className="flex h-4 w-4 items-center justify-center">
              <ChevronRightIcon fill="#CACACA" />
            </div>
          </Link>
        </div>
        {shopInfoSummary.is_delivery_available ||
          (shopInfoSummary.is_takeout_available && (
            <div className="mt-4 self-start">
              {shopInfoSummary.is_delivery_available && <Badge label="배달 가능" color="white" size="sm" />}
              {shopInfoSummary.is_takeout_available && <Badge label="포장 가능" color="white" size="sm" />}
            </div>
          ))}
        <div className="mt-4 flex w-full justify-between gap-3 self-start">
          {isOrderableBoolean && (
            <Link
              to={`/shop-detail/${isOrderable}/${id}#배달금액`}
              className="shadow-1 flex h-14 w-full min-w-fit items-center justify-between gap-1 rounded-xl bg-white py-2 pr-2 pl-3"
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
                    {shopInfoSummary.minimum_delivery_tip.toLocaleString()} -{' '}
                    {shopInfoSummary.maximum_delivery_tip.toLocaleString()}원
                  </span>
                </div>
              </div>
              <div className="flex h-5 w-5 items-center justify-center">
                <ChevronRightIcon fill="#727272" />
              </div>
            </Link>
          )}
          {!isOrderableBoolean && (
            <div className="shadow-1 flex h-14 w-full justify-center gap-1 rounded-xl bg-white py-2 pr-2 pl-3">
              <div className="text-center text-xs leading-[1.6] font-medium text-neutral-400">
                코인 주문이 <br />
                불가능한 매장이예요.
              </div>
            </div>
          )}
          <Link
            to={`/shop-detail/${isOrderable}/${id}#가게알림`}
            className="shadow-1 flex h-14 w-full items-center justify-between gap-1 rounded-xl bg-white py-2 pr-2 pl-3"
          >
            <SpeakerIcon />
            <span className="h-9.5 w-24 overflow-hidden text-[12px] leading-[1.6] text-ellipsis">
              {shopInfoSummary.introduction}
            </span>
            <div className="flex h-5 w-5 items-center justify-center">
              <ChevronRightIcon fill="#727272" />
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
