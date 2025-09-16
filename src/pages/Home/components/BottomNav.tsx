import HomeIcon from '/src/assets/Home/home-icon.svg';
import StoreIcon from '/src/assets/Home/store-icon.svg';
import PaperIcon from '/src/assets/Home/paper-icon.svg';

export default function BottomNav() {
  return (
    <div className="fixed right-0 bottom-0 left-0 z-40 flex items-center justify-between bg-white px-12 py-4 text-[12px]">
      <button className="flex w-[42px] flex-col items-center gap-0.5">
        <HomeIcon fill="black" />홈
      </button>

      <button className="flex w-[42px] flex-col items-center gap-0.5">
        <StoreIcon fill="black" />
        주변상점
      </button>

      <button className="flex w-[42px] flex-col items-center gap-0.5">
        <PaperIcon fill="black" />
        주문내역
      </button>
    </div>
  );
}
