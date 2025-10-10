import clsx from 'clsx';

interface TabProps {
  activeTab: 'past' | 'preparing';
  onTabChange: (tab: 'past' | 'preparing') => void;
}

export default function Tab({ activeTab, onTabChange }: TabProps) {
  return (
    <div className="fixed top-15 right-0 left-0 z-110 flex w-full border-b border-b-neutral-400 bg-[#F8F8FA] font-semibold text-neutral-500">
      <button
        className={clsx('flex-1 py-3', activeTab === 'past' && 'text-primary-500 border-b-primary-500 border-b-2')}
        onClick={() => onTabChange('past')}
      >
        지난 주문
      </button>
      <button
        className={clsx('flex-1 py-3', activeTab === 'preparing' && 'text-primary-500 border-b-primary-500 border-b-2')}
        onClick={() => onTabChange('preparing')}
      >
        준비 중
      </button>
    </div>
  );
}
