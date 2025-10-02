import SleepingIcon from '@/assets/OrderHistory/sleeping-icon.svg';

interface EmptyCardProps {
  activeTab: 'past' | 'preparing';
  setActiveTab: (tab: 'past' | 'preparing') => void;
}

export default function EmptyCard({ activeTab, setActiveTab }: EmptyCardProps) {
  return (
    <div className="text-primary-500 flex flex-col items-center justify-center gap-4 py-30 text-lg font-semibold">
      <SleepingIcon />
      <div>{activeTab === 'preparing' ? '준비 중인 음식이 없어요' : '주문 내역이 없어요'}</div>
      {activeTab === 'preparing' && (
        <button
          className="shadow-1 rounded-lg bg-white p-2 text-sm text-neutral-500"
          onClick={() => setActiveTab('past')}
        >
          과거 주문 내역 보기
        </button>
      )}
    </div>
  );
}
