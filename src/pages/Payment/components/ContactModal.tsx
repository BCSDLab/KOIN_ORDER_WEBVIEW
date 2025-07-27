import { useState } from 'react';
import CloseIcon from '@/assets/Main/close-icon.svg';
import InputDeleteIcon from '@/assets/Payment/input-delete-icon.svg';
import BottomModal, {
  BottomModalContent,
  BottomModalFooter,
  BottomModalHeader,
} from '@/components/UI/BottomModal/BottomModal';
import Button from '@/components/UI/Button';

function formatPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, '');

  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  } else if (digits.length <= 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  } else {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContact: string;
  onSubmit: (contact: string) => void;
}

export default function ContactModal({ isOpen, onClose, currentContact, onSubmit }: ContactModalProps) {
  const [phone, setPhone] = useState(currentContact);

  const handleClickSubmit = () => {
    onSubmit(phone.replace(/-/g, ''));
    onClose();
  };

  return (
    <BottomModal className="bottomModal" isOpen={isOpen} onClose={onClose}>
      <BottomModalHeader>
        <div className="flex w-full justify-between">연락처</div>
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      </BottomModalHeader>
      <BottomModalContent>
        <div className="relative">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            placeholder="010-1234-5678"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none"
          />
          {phone && (
            <button onClick={() => setPhone('')} className="absolute right-4 translate-y-4">
              <InputDeleteIcon />
            </button>
          )}
        </div>
        <Button size="lg" onClick={handleClickSubmit} className="rounded-xl py-2.5 text-lg">
          변경하기
        </Button>
      </BottomModalContent>
      <BottomModalFooter />
    </BottomModal>
  );
}
