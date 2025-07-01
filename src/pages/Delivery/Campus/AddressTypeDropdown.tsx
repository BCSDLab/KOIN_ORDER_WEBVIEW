import { Suspense } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import useCampusDeliveryAddress from '../hooks/useCampusDeliveryAddress';
import ChevronDown from '@/assets/Delivery/chevron-down.svg';
import Button from '@/components/UI/Button';
import { AddressCategory } from '@/types/api/deliveryCampus';

interface Place {
  id: number;
  full_address: string;
  short_address: string;
}

interface AddressTypeDropdownProps {
  type: AddressCategory;
  selectedCategory: AddressCategory | null;
  selectedPlace: Place | null;
  setSelectedCategory: (type: AddressCategory | null) => void;
  setSelectedPlace: (place: Place | null) => void;
  icon: React.ReactNode;
}

export default function AddressTypeDropdown({
  type,
  selectedCategory,
  selectedPlace,
  setSelectedCategory,
  setSelectedPlace,
  icon,
}: AddressTypeDropdownProps) {
  const { data } = useCampusDeliveryAddress({ filter: type });
  const { addresses } = data;

  const isSelected = selectedCategory === type;

  return (
    <Suspense fallback={null}>
      <div
        className={twMerge(
          clsx(
            'box-content flex flex-col items-center bg-white',
            isSelected && 'w-full overflow-hidden rounded-lg border border-neutral-300',
            !isSelected && 'rounded-lg border border-neutral-300',
          ),
        )}
      >
        <div className="flex w-full flex-col items-center gap-2">
          <button
            type="button"
            className="flex h-14 w-full items-center justify-between p-4 font-semibold transition-colors"
            onClick={() => {
              if (isSelected) {
                setSelectedCategory(null);
                return;
              }
              setSelectedCategory(type);
            }}
          >
            <div className="flex items-center gap-2">
              <span className="text-primary-500 text-sm">{addresses[0].type}</span>
              {icon && icon}
            </div>
            <span className={clsx('transition-transform', isSelected && 'rotate-180')}>
              <ChevronDown />
            </span>
          </button>
        </div>
        {isSelected && (
          <>
            <div className="h-[1px] w-[310px] bg-[#eee]" />
            <div className="mx-auto flex w-full flex-wrap justify-center gap-x-3 gap-y-2 bg-white px-[10px] py-4 break-all">
              {addresses.map((address) => (
                <Button
                  key={address.id}
                  color={selectedPlace?.id === address.id ? 'primary' : 'gray'}
                  size="sm"
                  onClick={() => setSelectedPlace(address)}
                >
                  {address.short_address}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </Suspense>
  );
}
