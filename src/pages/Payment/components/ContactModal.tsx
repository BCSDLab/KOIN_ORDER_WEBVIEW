import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import useSendSmsVerification from '../hooks/useSendSmsVerification';
import CloseIcon from '@/assets/Main/close-icon.svg';
import WarningIcon from '@/assets/Payment/warning.svg';
import BottomModal, {
  BottomModalHeader,
  BottomModalFooter,
  BottomModalContent,
} from '@/components/UI/BottomModal/BottomModal';
import Button from '@/components/UI/Button';
import { MESSAGES } from '@/constants/message';
import { INQUIRE_FORM } from '@/constants/url';
import useBooleanState from '@/util/hooks/useBooleanState';
import { useToast } from '@/util/hooks/useToast';
import formatPhoneNumber from '@/util/ts/formatPhoneNumber';

interface ContactFormProps {
  currentContact: string;
  onClose: () => void;
  onSubmit: (contact: string) => void;
}

const formatTime = (seconds: number) => {
  const m = String(Math.floor(seconds / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${m}:${s}`;
};

const SMS_CODE_LENGTH = 6;
const PHONE_NUMBER_LENGTH = 11;
const CODE_EXPIRE_SECONDS = 180;

function ContactForm({ currentContact, onClose, onSubmit }: ContactFormProps) {
  const { showToast } = useToast();

  const { sendSms, verifySms } = useSendSmsVerification();
  const { mutate: sendSmsVerification } = sendSms;
  const { mutate: verifySmsCode } = verifySms;

  const [timer, setTimer] = useState(0);
  const [authCode, setAuthCode] = useState('');
  const [draftPhone, setDraftPhone] = useState('');
  const [codeErrorMessage, setCodeErrorMessage] = useState('');
  const [phoneErrorMessage, setPhoneErrorMessage] = useState('');
  const [isCodeSent, isCodeSentTrue, isCodeSentFalse] = useBooleanState(false);
  const [isPhoneChanging, startPhoneChanging, stopPhoneChanging] = useBooleanState(false);

  const expiresAtRef = useRef<number | null>(null);
  const intervalIdRef = useRef<number | null>(null);

  const isEditing = isPhoneChanging || !currentContact;
  const phone = isEditing ? draftPhone : (currentContact ?? '');

  const isPhoneValid = phone.length === PHONE_NUMBER_LENGTH;
  const shouldDisableSubmit = !isPhoneValid || authCode.length !== SMS_CODE_LENGTH || timer === 0;

  useEffect(() => {
    if (intervalIdRef.current != null) return;

    intervalIdRef.current = window.setInterval(() => {
      if (!expiresAtRef.current) return;

      const remain = Math.max(0, Math.ceil((expiresAtRef.current - Date.now()) / 1000));
      setTimer(remain);

      if (remain === 0) expiresAtRef.current = null;
    }, 1000);

    return () => {
      if (intervalIdRef.current != null) {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
      }
    };
  }, []);

  const resetState = () => {
    setDraftPhone('');
    setAuthCode('');
    isCodeSentFalse();
    setCodeErrorMessage('');
    setPhoneErrorMessage('');
    setTimer(0);
    if (currentContact) stopPhoneChanging();
    else startPhoneChanging();
  };

  const closeModal = () => {
    resetState();
    onClose();
  };

  const handleClickSend = () => {
    setPhoneErrorMessage('');
    if (!isPhoneValid) {
      setPhoneErrorMessage(MESSAGES.PHONE.INVALID);
      return;
    }

    sendSmsVerification(phone, {
      onSuccess: () => {
        isCodeSentTrue();
        setTimer(CODE_EXPIRE_SECONDS);
        showToast(MESSAGES.VERIFICATION.CODE_SENT);
      },
      onError: (error) => {
        const errorCode = JSON.parse(error.message);
        if (errorCode.code === 'INVALID_REQUEST_BODY') {
          setPhoneErrorMessage(MESSAGES.PHONE.INVALID);
        }
      },
    });
  };

  const handleClickSubmit = () => {
    verifySmsCode(
      { phone, code: authCode },
      {
        onSuccess: () => {
          setCodeErrorMessage('');
          onSubmit(phone);
          closeModal();
          showToast(MESSAGES.TOAST.VERIFIED);
        },
        onError: (error) => {
          const errorCode = JSON.parse(error.message);
          if (errorCode.code === 'NOT_MATCHED_VERIFICATION_CODE') {
            setCodeErrorMessage(MESSAGES.VERIFICATION.INCORRECT);
          }
        },
      },
    );
  };

  return (
    <>
      <div className="relative">
        <input
          type="tel"
          maxLength={13}
          disabled={!isEditing}
          value={formatPhoneNumber(phone)}
          onChange={(e) => {
            const onlyDigits = e.target.value.replace(/[^0-9]/g, '');
            setDraftPhone(onlyDigits);
          }}
          placeholder="010-1234-5678"
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none"
        />
        {phoneErrorMessage && (
          <div className="text-sub-500 mt-1 flex items-center gap-1 text-xs leading-[160%]">
            <WarningIcon />
            {phoneErrorMessage}
          </div>
        )}

        {currentContact && !isEditing && (
          <Button
            color="gray"
            className="absolute top-2 right-4 px-2.5 text-xs font-normal text-neutral-600 shadow-none"
            onClick={() => {
              startPhoneChanging();
              setDraftPhone('');
              isCodeSentFalse();
              setAuthCode('');
              setTimer(0);
              setCodeErrorMessage('');
              setPhoneErrorMessage('');
            }}
          >
            번호 변경
          </Button>
        )}

        {isEditing && (
          <Button
            color="gray"
            disabled={!isPhoneValid}
            className={twMerge(
              clsx(
                'absolute top-2 right-4 px-2.5 text-xs font-normal text-neutral-600 shadow-none',
                !isPhoneValid && 'cursor-not-allowed text-neutral-300',
              ),
            )}
            onClick={handleClickSend}
          >
            {isCodeSent ? '인증번호 재발송' : '인증번호 발송'}
          </Button>
        )}
      </div>

      {isCodeSent && (
        <>
          <div>
            <div className="relative">
              <input
                type="text"
                maxLength={6}
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="6자리를 입력해주세요"
                className="w-full rounded-xl border border-neutral-300 px-4 py-3 outline-none"
              />
              <span className="text-danger-600 absolute top-1/2 right-4 -translate-y-1/2 text-sm">
                {formatTime(timer)}
              </span>
            </div>

            {timer === 0 ? (
              <div className="text-sub-500 mt-1 flex items-center gap-1 text-xs leading-[160%]">
                <WarningIcon />
                {MESSAGES.VERIFICATION.TIMEOUT}
              </div>
            ) : codeErrorMessage ? (
              <div className="text-sub-500 mt-1 flex items-center gap-1 text-xs leading-[160%]">
                <WarningIcon />
                {codeErrorMessage}
              </div>
            ) : (
              <div className="mt-1 text-sm leading-[160%] text-neutral-500">
                {MESSAGES.VERIFICATION.DEFAULT}{' '}
                <a href={INQUIRE_FORM} className="text-info-500 underline">
                  문의하기
                </a>
              </div>
            )}
          </div>

          <Button
            size="lg"
            onClick={handleClickSubmit}
            className="rounded-xl py-2.5 text-lg"
            disabled={shouldDisableSubmit}
            state={shouldDisableSubmit ? 'disabled' : 'default'}
          >
            확인
          </Button>
        </>
      )}
    </>
  );
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentContact: string;
  onSubmit: (contact: string) => void;
}

export default function ContactModal({ isOpen, onClose, currentContact, onSubmit }: ContactModalProps) {
  return (
    <BottomModal className="bottomModal" isOpen={isOpen} onClose={onClose}>
      <BottomModalHeader>
        <div className="flex w-full justify-between">연락처</div>
        <button type="button" onClick={onClose}>
          <CloseIcon />
        </button>
      </BottomModalHeader>
      <BottomModalContent>
        <ContactForm key={currentContact} currentContact={currentContact} onClose={onClose} onSubmit={onSubmit} />
      </BottomModalContent>
      <BottomModalFooter />
    </BottomModal>
  );
}
