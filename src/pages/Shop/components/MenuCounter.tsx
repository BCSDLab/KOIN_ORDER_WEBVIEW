import Minus from '@/assets/Shop/minus.svg';
import Plus from '@/assets/Shop/plus.svg';

interface MenuCounterProps {
  count: number;
  increaseCount: () => void;
  decreaseCount: () => void;
}

export default function MenuCounter({ count, increaseCount, decreaseCount }: MenuCounterProps) {
  const MAX_COUNT = 10;

  const handleDecreaseCount = () => {
    if (count > 0) {
      decreaseCount();
    }
  };

  const handleIncreaseCount = () => {
    if (count < MAX_COUNT) {
      increaseCount();
    }
  };

  return (
    <div className="flex h-17 items-center justify-end">
      <div className="border-primary-500 flex h-9 w-26.5 items-center justify-between rounded-3xl border bg-white px-4">
        <button className="" onClick={handleDecreaseCount}>
          <Minus />
        </button>
        <span className="text-primary-500 text-xl font-bold">{count}</span>
        <button className="" onClick={handleIncreaseCount}>
          <Plus />
        </button>
      </div>
    </div>
  );
}
