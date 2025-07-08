import Minus from '@/assets/Shop/minus.svg';
import Plus from '@/assets/Shop/plus.svg';
import { useToast } from '@/util/hooks/useToast';

interface MenuCounterProps {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}

export default function MenuCounter({ count, increaseCount, decreaseCount }: MenuCounterProps) {
  const { showToast } = useToast();

  const MAX_COUNT = 10;

  const handleDecreaseCount = () => {
    if (count > 0) {
      decreaseCount();
    }
  };

  const handleIncreaseCount = () => {
    if (count < MAX_COUNT) {
      increaseCount();
    } else {
      showToast(`최대 주문 수량은 ${MAX_COUNT}개입니다.`);
    }
  };

  return (
    <div className="border-primary-500 flex h-9 w-26.5 items-center justify-between rounded-3xl border bg-white px-6">
      <button className="ml-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={handleDecreaseCount}>
        <Minus />
      </button>
      <span className="text-primary-500 text-xl font-bold">{count}</span>
      <button className="ml-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600" onClick={handleIncreaseCount}>
        <Plus />
      </button>
    </div>
  );
}
