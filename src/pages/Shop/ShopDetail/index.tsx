import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DAYS } from '../constants/day';
import { ShopDetailInfoResponse } from '@/api/shop/entity';

interface ShopDetailProps {
  shopInfo: ShopDetailInfoResponse;
}

export default function ShopDetail({ shopInfo }: ShopDetailProps) {
  const { id } = useParams();
  if (!id) {
    return <div className="p-6">가게 정보를 불러올 수 없습니다.</div>;
  }

  useEffect(() => {
    if (window.location.hash) {
      const decodedId = decodeURIComponent(window.location.hash.replace('#', ''));
      const target = document.getElementById(decodedId);
      if (target) {
        setTimeout(() => {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }, 50);
      }
    }
  }, []);

  return (
    <div className="flex h-full flex-col gap-1.5 peer-first:bg-white">
      <div className="bg-white px-6 py-3">
        <p className="py-3 text-[15px] leading-[1.6] font-semibold">{shopInfo?.name}</p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 text-sm leading-[1.6] font-medium">
            <p className="w-14 shrink-0">상호명</p>
            <p>{shopInfo?.name}</p>
          </div>
          <div className="flex gap-4 text-sm leading-[1.6] font-medium">
            <p className="w-14 shrink-0">주소</p>
            <p>{shopInfo?.address}</p>
          </div>
          <div className="flex gap-4 text-sm leading-[1.6] font-medium">
            <p className="w-14 shrink-0">운영시간</p>
            <p>
              {shopInfo?.open_time?.slice(0, 5)} ~ {shopInfo?.close_time?.slice(0, 5)}
            </p>
          </div>
          <div className="flex gap-4 text-sm leading-[1.6] font-medium">
            <p className="w-14 shrink-0">휴무일</p>
            <p>
              {shopInfo?.closed_days.length === 0
                ? '연중무휴'
                : `매주 ${shopInfo?.closed_days.map((day) => DAYS[day]).join(', ')}`}
            </p>
          </div>
          <div className="flex gap-4 text-sm leading-[1.6] font-medium">
            <p className="w-14 shrink-0">전화번호</p>
            <p>{shopInfo?.phone}</p>
          </div>
        </div>
      </div>
      <div className="bg-white px-6 py-3">
        <p className="py-3 text-[15px] leading-[1.6] font-semibold">가게 소개</p>
        <p className="text-sm leading-[1.6] font-medium">{shopInfo?.introduction}</p>
      </div>
      <div id="가게알림" className="bg-white px-6 py-3">
        <p className="py-3 text-[15px] leading-[1.6] font-semibold">가게 알림</p>
        <p className="text-sm leading-[1.6] font-medium">{shopInfo?.notice}</p>
      </div>
      <div id="배달금액" className="bg-white px-6 py-3">
        <p className="py-3 text-[15px] leading-[1.6] font-semibold">주문금액별 총 배달팁</p>
        <table className="w-full border border-gray-200 text-left text-sm">
          <tbody>
            {shopInfo?.delivery_tips.map((tips) => (
              <tr key={`${tips.from_amount}-${tips.to_amount}-${tips.fee}`} className="border-b border-gray-200">
                <td className="border-r border-gray-200 px-4 py-2">
                  {tips?.to_amount
                    ? `${tips.from_amount.toLocaleString()} ~ ${tips.to_amount.toLocaleString()}원 미만`
                    : `${tips.from_amount.toLocaleString()} 이상`}
                </td>
                <td className="px-4 py-2">{tips.fee.toLocaleString()}원</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white px-6 py-3">
        <p className="py-3 text-[15px] leading-[1.6] font-semibold">사업자 정보</p>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4 text-sm leading-[1.6] font-medium">
            <p className="w-24 shrink-0">대표자명</p>
            <p>{shopInfo?.owner_info.name}</p>
          </div>
          <div className="flex gap-4 text-sm leading-[1.6] font-medium">
            <p className="w-24 shrink-0">상호명</p>
            <p>{shopInfo?.owner_info.shop_name}</p>
          </div>
          <div className="flex gap-4 text-sm leading-[1.6] font-medium">
            <p className="w-24 shrink-0">사업자 주소</p>
            <p>{shopInfo?.owner_info.address}</p>
          </div>
          <div className="flex gap-4 text-sm leading-[1.6] font-medium">
            <p className="w-24 shrink-0">사업자 등록 번호</p>
            <p>{shopInfo?.owner_info.company_registration_number}</p>
          </div>
        </div>
      </div>
      <div className="mb-10 bg-white px-6 py-3">
        <p className="py-3 text-[15px] leading-[1.6] font-semibold">원산지 표기</p>
        <p className="text-sm leading-[1.6] font-medium">
          {shopInfo?.origins.map((value) => `${value.ingredient}(${value.origin})`).join(', ')}
        </p>
      </div>
    </div>
  );
}
