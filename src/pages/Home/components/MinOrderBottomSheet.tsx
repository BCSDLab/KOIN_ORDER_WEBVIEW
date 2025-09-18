import { useState, useEffect } from 'react';
import BottomSheet from './BottomSheet';
import PlanetIcon from '@/assets/Home/planet-icon.svg';

interface MinOrderBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  initialValue: number | null;
  onApply: (amount: number | null) => void;
}

const ALL_VALUE = 99999;

const MIN_ORDER_OPTIONS = [
  { value: 0, label: '0' },
  { value: 5000, label: '5,000' },
  { value: 10000, label: '10,000' },
  { value: 15000, label: '15,000' },
  { value: 20000, label: '20,000' },
  { value: ALL_VALUE, label: '전체' },
];

export default function MinOrderBottomSheet({ isOpen, onClose, initialValue, onApply }: MinOrderBottomSheetProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(initialValue);

  useEffect(() => {
    setSelectedValue(initialValue);
  }, [initialValue]);

  const handleApply = () => {
    onApply(selectedValue);
    onClose();
  };

  const getSliderPosition = () => {
    if (selectedValue === null) return 100;
    const index = MIN_ORDER_OPTIONS.findIndex((opt) => opt.value === selectedValue);
    return (index / (MIN_ORDER_OPTIONS.length - 1)) * 100;
  };

  const isPointActive = (optionValue: number) => {
    if (selectedValue === null) return optionValue === ALL_VALUE;
    return optionValue <= selectedValue;
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="최소주문금액">
      <div className="px-8 py-9">
        <div className="relative mb-9">
          <div className="relative h-2 w-full rounded-full bg-[#E9EBED]">
            <div className="absolute h-2 rounded-full bg-[#C358FC]" style={{ width: `${getSliderPosition()}%` }} />
            <div className="absolute inset-0 flex items-center justify-between">
              {MIN_ORDER_OPTIONS.map((option) => (
                <button
                  key={option.label}
                  onClick={() => setSelectedValue(option.value)}
                  className="relative flex h-4 w-4 items-center justify-center"
                  type="button"
                >
                  <div
                    className={`h-1 w-1 rounded-full ${
                      isPointActive(option.value) ? 'bg-[#fff]' : 'border-2 border-[#cacaca]'
                    }`}
                  />
                </button>
              ))}
            </div>
            <div
              className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{ left: `${getSliderPosition()}%` }}
            >
              <PlanetIcon />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between px-1">
            {MIN_ORDER_OPTIONS.map((option) => (
              <button
                key={option.label}
                onClick={() => setSelectedValue(option.value)}
                className={`text-[14px] ${selectedValue === option.value ? 'font-bold text-[#b611f5]' : 'text-black'}`}
                type="button"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleApply}
          className="w-full rounded-xl bg-[#b611f5] py-[10px] text-center text-[18px] text-white"
          type="button"
        >
          적용하기
        </button>
      </div>
    </BottomSheet>
  );
}
