import { ReactNode } from 'react';
import CloseIcon from '@/assets/Main/close-icon.svg';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  if (!isOpen) return null;

  return (
    <>
      <button className="fixed inset-0 z-40 bg-black/60" type="button" onClick={onClose} aria-label="모달 닫기" />

      <div className="fixed right-0 bottom-0 left-0 z-50 rounded-t-2xl bg-white">
        <div className="flex items-center justify-between border-b border-[#e1e1e1] px-8 py-3">
          <h3 className="text-[18px] font-bold text-[#b611f5]">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600" type="button" aria-label="닫기">
            <CloseIcon />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto pb-8">{children}</div>
      </div>
    </>
  );
}
