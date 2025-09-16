import Delivery from '@/assets/Home/delivery-icon.svg';
import StarIcon from '@/assets/Home/star-icon.svg';

interface MenuCardProps {
  name: string;
  rating: number;
  reviewCount: number;
  deliver: number;
  isTakeout: boolean;
  isService: boolean;
  img: OrderableShopsImg[];
}

interface OrderableShopsImg {
  image_url: string;
  is_thumbnail: boolean;
}

export default function ShopCard({ name, rating, reviewCount, deliver, isTakeout, isService, img }: MenuCardProps) {
  const thumbnailUrl = img.find((image) => image.is_thumbnail)?.image_url || '';

  return (
    <div className="flex items-center gap-5 rounded-lg bg-[#f8f8fa]">
      {thumbnailUrl ? (
        <img src={thumbnailUrl} alt={name} className="h-32 w-32 rounded-lg" />
      ) : (
        <div className="flex h-32 w-32 items-center justify-center rounded-lg text-gray-400">이미지 준비중</div>
      )}

      <div className="flex flex-col gap-2 pr-16">
        <div className="font-bold">{name}</div>

        <div className="flex gap-1 text-xs">
          <div className="flex items-center gap-1">
            <StarIcon fill="#ffc62b" />
            <div>{rating}</div>
          </div>
          <div className="text-[#767676]">( 리뷰 {reviewCount}개 )</div>
        </div>

        <div className="flex gap-1 text-xs">
          <Delivery fill="#c358fc" />
          <div>배달비 {deliver}원</div>
        </div>

        <div className="flex items-center gap-2">
          {isTakeout && (
            <span className="rounded-[999px] bg-[#f2f2f2] px-[10px] py-0.5 text-xs text-[#4b4b4b]">픽업가능</span>
          )}
          {isTakeout && isService && '  |  '}
          {isService && (
            <span className="rounded-[999px] bg-[#f2f2f2] px-[10px] py-0.5 text-xs text-[#4b4b4b]">서비스 증정</span>
          )}
        </div>
      </div>
    </div>
  );
}
