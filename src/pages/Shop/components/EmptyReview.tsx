import WizIcon from '@/assets/Shop/wiz-icon.svg';

export default function EmptyReview() {
  return (
    <div className="mt-[140px] flex w-full flex-col items-center justify-center">
      <WizIcon />
      <p className="text-primary-500 mt-3 text-[18px] font-semibold">작성된 리뷰가 없어요</p>
      <p className="text-[14px] text-neutral-600">첫 번째 리뷰를 작성해보세요!</p>
    </div>
  );
}
