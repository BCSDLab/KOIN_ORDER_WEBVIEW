import Bike from '@/assets/Main/agriculture.svg';
import Home from '@/assets/Main/home-icon.svg';
import University from '@/assets/Main/university-icon.svg';
import RightArrow from '@/assets/Payment/arrow-go-icon.svg';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';

export default function Payment() {
  return (
    <div className="mx-6 mt-4">
      <div className="flex items-center gap-3 text-xl font-bold">
        <Badge variant="outlined" size="md" color="primaryLight" startIcon={<Bike />} label="배달" />
        맛있는 족발 - 병천점
      </div>
      <div className="mt-6 flex flex-col gap-3">
        <div>
          <p className="text-primary-500 text-lg font-semibold">배달주소</p>
          <p className="text-xs text-neutral-600">배달 받을 위치를 선택해주세요.</p>
          <div className="shadow-1 mt-2 rounded-xl bg-white px-6 py-3">
            <div className="text-primary-500 text-sm font-semibold">어디로 배달할까요?</div>
            <div className="flex items-center justify-between py-4">
              <Button color="primary" size="md" endIcon={<University />} className="text-xs">
                <div>
                  <div>학교에서</div>
                  <div>받을게요!</div>
                </div>
              </Button>
              <Button color="neutral" size="md" endIcon={<Home />} className="text-xs">
                <div>
                  <div>밖에서</div>
                  <div>받을게요!</div>
                </div>
              </Button>
            </div>
          </div>
        </div>
        <div>
          <p className="text-primary-500 text-lg font-semibold">연락처</p>
          <Button
            color="gray"
            fullWidth
            className="mt-2 justify-normal border-0 py-4 pr-3 pl-6 text-sm font-normal text-neutral-300"
          >
            <div className="flex w-full items-center justify-between">
              <p>연락처를 입력하세요</p>
              <RightArrow />
            </div>
          </Button>
        </div>
        <div>
          <p className="text-primary-500 text-lg font-semibold">사장님에게</p>
          <Button
            color="gray"
            fullWidth
            className="mt-2 justify-normal border-0 py-4 pr-3 pl-6 text-sm font-normal text-neutral-600"
          >
            <div className="flex w-full flex-col gap-1">
              <div className="flex w-full items-center justify-between">
                <p>요청사항 없음</p>
                <RightArrow />
              </div>
              <p className="text-start font-medium text-[#3a903e]">수저 · 포크 안받기 </p>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
