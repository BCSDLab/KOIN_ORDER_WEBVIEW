import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@/assets/Main/arrow-back-icon.svg';

export default function Header({ title }: { title: string }) {
  const navigate = useNavigate();

  const backToPreviousPage = () => {
    void navigate(-1);
  };

  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex items-center justify-center bg-[#f8f8fa] px-6 py-4">
      <button
        type="button"
        aria-label="뒤로가기 버튼"
        onClick={() => void backToPreviousPage()}
        className="absolute top-1/2 left-6 -translate-y-1/2"
      >
        <ArrowBackIcon />
      </button>
      <span className="font-[Pretendard] text-lg font-medium">{title}</span>
    </header>
  );
}
