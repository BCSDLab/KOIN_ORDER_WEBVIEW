import clsx from 'clsx';

interface TabProps {
  activeTab: 'past' | 'preparing';
  onTabChange: (tab: 'past' | 'preparing') => void;
}

export default function Tab({ activeTab, onTabChange }: TabProps) {
  return (
    <div className="fixed top-15 z-110 flex w-full bg-[#F8F8FA] font-semibold text-neutral-500">
      <button
        className={clsx(
          'flex-1 border-b-2 py-3',
          activeTab === 'past' ? 'text-primary-500 border-b-primary-500' : 'border-b-neutral-400 text-neutral-500',
        )}
        onClick={() => onTabChange('past')}
      >
        지난 주문
      </button>
      <button
        className={clsx(
          'flex-1 border-b-2 py-3',
          activeTab === 'preparing' ? 'text-primary-500 border-b-primary-500' : 'border-b-neutral-400 text-neutral-500',
        )}
        onClick={() => onTabChange('preparing')}
      >
        준비 중
      </button>
    </div>
  );
}
