import { Link } from 'react-router-dom';
import type { ShopInfoSummaryResponse, UnorderableShopDetailInfoResponse } from '@/api/shop/entity.ts';
import ChevronRightIcon from '@/assets/Common/chevron-right.svg';
import StarIcon from '@/assets/Common/star-icon.svg';
import CallIcon from '@/assets/Shop/call-icon.svg';
import SpeakerIcon from '@/assets/Shop/speaker-icon.svg';
import Badge from '@/components/UI/Badge';
import useLogger from '@/util/hooks/analytics/useLogger';

interface ShopSummaryProps {
  id: string;
  isOrderable: boolean;
  shopInfoSummary: ShopInfoSummaryResponse;
  UnOrderableShopInfo?: UnorderableShopDetailInfoResponse;
}

export default function ShopSummary({ shopInfoSummary, id, isOrderable, UnOrderableShopInfo }: ShopSummaryProps) {
  const logger = useLogger();
  const handleShopInfoClick = () => {
    logger.actionEventClick({
      team: 'BUSINESS',
      event_label: 'shop_detail_view_info',
      value: shopInfoSummary.name,
    });
  };

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
            to={isOrderable ? `/shop-detail/true/${id}` : `/shop-detail/false/${id}`}
            className="shadow-1 flex items-center justify-center gap-1 rounded-full border-[0.5px] border-neutral-400 bg-white py-1 pr-2 pl-3"
            onClick={handleShopInfoClick}
          >
            <div className="text-[10px] text-neutral-500">{isOrderable ? '가게정보·원산지' : '가게정보'}</div>
            <div className="flex h-4 w-4 items-center justify-center">
              <ChevronRightIcon fill="#CACACA" />
            </div>
          </Link>
        </div>
        {isOrderable ? (
          <div className="mt-4 flex gap-2 self-start">
            {shopInfoSummary.is_delivery_available && <Badge label="배달 가능" color="white" size="xs" font="xs" />}
            {shopInfoSummary.is_takeout_available && <Badge label="포장 가능" color="white" size="xs" font="xs" />}
          </div>
        ) : (
          <div className="mt-4 flex gap-2 self-start">
            {UnOrderableShopInfo?.delivery && <Badge label="배달 가능" color="white" size="xs" font="xs" />}
            {UnOrderableShopInfo?.pay_card && <Badge label="카드 가능" color="white" size="xs" font="xs" />}
            {UnOrderableShopInfo?.pay_bank && <Badge label="계좌이체 가능" color="white" size="xs" font="xs" />}
          </div>
        )}
        <div className="mt-4 flex w-full justify-between gap-3 self-start">
          {isOrderable && (
            <Link
              to={`/shop-detail/true/${id}#배달금액`}
              className="shadow-1 flex h-14 w-full min-w-fit items-center justify-between gap-1 rounded-xl bg-white py-2 pr-2 pl-3"
              onClick={handleShopInfoClick}
            >
              <div className="flex w-fit flex-col gap-[2px]">
                <div className="flex gap-2">
                  <span className="text-[12px] leading-[1.6] font-normal">최소주문</span>
                  <span className="text-[12px] leading-[1.6] font-normal text-neutral-500">
                    {shopInfoSummary.minimum_order_amount && shopInfoSummary.minimum_order_amount.toLocaleString()}원
                  </span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[12px] leading-[1.6] font-normal">배달금액</span>
                  <span className="text-[12px] leading-[1.6] font-normal text-neutral-500">
                    {shopInfoSummary.minimum_delivery_tip && shopInfoSummary.minimum_delivery_tip.toLocaleString()} -{' '}
                    {shopInfoSummary.maximum_delivery_tip && shopInfoSummary.maximum_delivery_tip.toLocaleString()}원
                  </span>
                </div>
              </div>
              <div className="flex h-5 w-5 items-center justify-center">
                <ChevronRightIcon fill="#727272" />
              </div>
            </Link>
          )}
          {!isOrderable && (
            <Link
              to={`/shop-detail/false/${id}#배달금액`}
              className="shadow-1 flex h-14 w-full min-w-fit items-center justify-between gap-1 rounded-xl bg-white py-2 pr-2 pl-3"
              onClick={handleShopInfoClick}
            >
              <div className="flex w-fit flex-col gap-[2px]">
                <div className="flex gap-2">
                  <span className="text-[12px] leading-[1.6] font-normal">최소주문</span>
                  <span className="text-[12px] leading-[1.6] font-normal text-neutral-500">0원</span>
                </div>
                <div className="flex gap-2">
                  <span className="text-[12px] leading-[1.6] font-normal">배달금액</span>
                  <span className="text-[12px] leading-[1.6] font-normal text-neutral-500">
                    {UnOrderableShopInfo?.delivery_price}원
                  </span>
                </div>
              </div>
              <div className="flex h-5 w-5 items-center justify-center">
                <ChevronRightIcon fill="#727272" />
              </div>
            </Link>
          )}
          <Link
            to={isOrderable ? `/shop-detail/true/${id}#가게알림` : `/shop-detail/false/${id}#가게알림`}
            className="shadow-1 flex h-14 w-full items-center justify-between gap-1 rounded-xl bg-white py-2 pr-2 pl-3"
            onClick={handleShopInfoClick}
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
        <a href={`tel:${UnOrderableShopInfo?.phone}`} className="mt-3 w-full">
          <div className="shadow-1 flex w-full items-center justify-center rounded-xl bg-white px-3 py-3 text-center">
            <CallIcon className="mr-2" />
            <div className="text-primary-500 mr-5 text-sm leading-[160%] font-semibold">가게에 전화하기</div>
            <div className="text-xs leading-[160%] font-medium">{UnOrderableShopInfo?.phone}</div>
          </div>
        </a>
      </div>
    </>
  );
}
