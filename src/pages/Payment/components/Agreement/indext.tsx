import RightArrow from '@/assets/Payment/arrow-go-icon.svg';

const AGREEMENTGUIDES = [
  {
    title: '(주)BCSD 배달상품 주의사항 동의',
    content: '미정입니다',
  },
  {
    title: '개인정보 제3자 제공 동의',
    content: '미정입니다',
  },
  {
    title: '업주의 개인정보 처리 위탁 안내',
    content: '미정입니다',
  },
];

export default function Agreement() {
  return (
    <div className="flex flex-col gap-3">
      {AGREEMENTGUIDES.map((guide) => (
        <div className="flex items-center justify-between">
          <div className="align-middle font-[Pretendard] text-[12px] font-normal text-neutral-600">{guide.title}</div>
          <button>
            <RightArrow />
          </button>
        </div>
      ))}
    </div>
  );
}
