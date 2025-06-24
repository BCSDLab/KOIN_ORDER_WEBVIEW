import { useState } from 'react';
import clsx from 'clsx';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import Home from '@/assets/Main/home-icon.svg';
import University from '@/assets/Main/university-icon.svg';
import RightArrow from '@/assets/Payment/arrow-go-icon.svg';
import Badge from '@/components/UI/Badge';
import Button from '@/components/UI/Button';

export default function DeliveryAddressSection() {
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState<{
    type: 'campus' | 'outside';
    label: string;
    detail?: string;
  } | null>(null);

  return (
    <div>
      <div className={deliveryAddress ? 'flex items-center justify-between' : ''}>
        <p className="text-primary-500 text-lg font-semibold">배달주소</p>
        {deliveryAddress ? (
          <Link
            to={`/delivery/${deliveryAddress.type === 'campus' ? 'outside' : 'campus'}`}
            className="text-xs text-neutral-500 underline"
          >
            {deliveryAddress.type === 'campus' ? '교외 주소를 원하시나요?' : '교내 주소를 원하시나요?'}
          </Link>
        ) : (
          <p className="text-xs text-neutral-600">배달 받을 위치를 선택해주세요.</p>
        )}
      </div>

      <div className={twMerge(clsx('shadow-1 mt-2 rounded-xl bg-white px-6 py-3', deliveryAddress && 'py-4 pr-3'))}>
        {deliveryAddress ? (
          <div>
            <Button
              color="gray"
              fullWidth
              className="border-0 p-0 shadow-none"
              onClick={() => navigate(`/delivery/${deliveryAddress.type === 'campus' ? 'campus' : 'outside'}`)}
            >
              <div className="flex w-full items-center justify-between text-left">
                {deliveryAddress.type === 'campus' ? (
                  <Badge color="primary" size="lg" label={deliveryAddress.label} />
                ) : (
                  <span className="max-w-3xs text-xs font-normal text-neutral-600">{deliveryAddress.label}</span>
                )}
                <RightArrow />
              </div>
            </Button>

            <div className="my-4 border-t border-neutral-200" />

            <Button
              color="gray"
              fullWidth
              className="border-0 p-0 shadow-none"
              onClick={() => navigate(`/delivery/${deliveryAddress.type === 'campus' ? 'campus' : 'outside'}`)}
            >
              <div className="flex w-full items-center justify-between text-left">
                <div className="">
                  <p className="text-primary-500 text-sm font-semibold">배달기사님에게</p>
                  <p className="text-xs font-normal text-neutral-600">{deliveryAddress.detail}</p>
                </div>
                <RightArrow />
              </div>
            </Button>
          </div>
        ) : (
          <>
            <div className="text-primary-500 text-sm font-semibold">어디로 배달할까요?</div>
            <div className="flex items-center gap-5 py-4">
              <Button
                color="primary"
                size="md"
                endIcon={<University />}
                className="text-xs"
                // onClick={() => navigate('/delivery/campus')} 기존 동작 코드
                onClick={() =>
                  setDeliveryAddress({ type: 'campus', label: '105동(함지)', detail: '도착하실때 전화주세요' })
                } // UI 테스트용 코드
                fullWidth
              >
                <div className="leading-[160%]">
                  <div>학교에서</div>
                  <div>받을게요!</div>
                </div>
              </Button>

              <Button
                color="neutral"
                size="md"
                endIcon={<Home />}
                className="text-xs"
                onClick={() => navigate('/delivery/outside')}
                // onClick={() =>
                //   setDeliveryAddress({
                //     type: 'outside',
                //     label: '충남 천안시 동남구 병천면 가전8길 102 라이프원룸 404동 404호',
                //     detail: '도착하실때 전화주세요',
                //   })
                // } // UI 테스트용 코드
                fullWidth
              >
                <div className="leading-[160%]">
                  <div>밖에서</div>
                  <div>받을게요!</div>
                </div>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
