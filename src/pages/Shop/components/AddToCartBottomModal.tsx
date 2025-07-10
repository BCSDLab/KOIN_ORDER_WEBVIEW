import Button from '@/components/UI/Button';

interface AddToCartBottomModalProps {
  price: number;
  isActive: boolean;
  onAddToCart: () => void;
}

export default function AddToCartBottomModal({ price, isActive, onAddToCart }: AddToCartBottomModalProps) {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-50">
      <div className="shadow-4 flex w-full items-center justify-between rounded-t-4xl bg-white px-8 py-3">
        <Button className="h-12.25 w-full gap-2.5" state={isActive ? 'default' : 'disabled'} onClick={onAddToCart}>
          <span className="text-sm font-medium">장바구니 추가</span>
          <span className="text-lg font-semibold">{price.toLocaleString()}원</span>
        </Button>
      </div>
      <div className="h-[34px] w-full border-t border-neutral-300 bg-white" />
    </div>
  );
}
