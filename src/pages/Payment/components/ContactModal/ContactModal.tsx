import { useState } from 'react';
import InputDeleteIcon from '@/assets/Payment/input-delete-icon.svg';
import Button from '@/components/UI/Button';
import BottomModal from '@/components/UI/Modal/BottomModal/index';

function formatPhoneNumber(phone: string) {
  const digits = phone.replace(/\D/g, '');

  if (digits.length <= 3) {
    return digits;
  } else if (digits.length <= 7) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  } else if (digits.length <= 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  } else {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`; // 최대 11자리까지만
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

  return (
    <BottomModal className="bottomModal" isOpen={isOpen} onClose={onClose}>
      <BottomModal.Header className="bottomModalHeader" showCloseButton>
        <div className="flex w-full justify-between">연락처</div>
      </BottomModal.Header>
      <BottomModal.Content className="bottomModalContent">
        <div className="relative">
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
            placeholder="010-1234-5678"
            className="w-full rounded-xl border border-neutral-300 px-4 py-3"
          />
          {phone && (
            <button onClick={() => setPhone('')} className="absolute right-4 translate-y-4">
              <InputDeleteIcon />
            </button>
          )}
        </div>
        <Button
          size="lg"
          onClick={() => {
            onSubmit(phone);
            onClose();
          }}
          className="rounded-xl py-2.5 text-lg"
        >
          변경하기
        </Button>
      </BottomModal.Content>
      <BottomModal.Footer className="bottomModalFooter" />
    </BottomModal>
  );
}
