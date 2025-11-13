import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import useReportReview from '../../hooks/useReportReview';
import CheckIcon from '@/assets/Home/check-icon.svg';
import { useToast } from '@/util/hooks/useToast';

export default function ReviewReport() {
  const [selected, setSelected] = useState<string[]>([]);
  const [etcText, setEtcText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { showToast } = useToast();
  const { shopId } = useParams();
  const [searchParams] = useSearchParams();
  const reviewIdParam = searchParams.get('reviewId');
  const navigate = useNavigate();
  const { mutate: reportReview } = useReportReview(String(shopId), Number(reviewIdParam));

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [etcText, selected]);

  const options: { value: string; label: string; subtitle?: string; hasTextarea?: boolean }[] = [
    { value: '1', label: '주제와 맞지 않음', subtitle: '분실물과 관련 없는 내용입니다.' },
    { value: '2', label: '스팸', subtitle: '홍보성 글입니다.' },
    { value: '3', label: '욕설', subtitle: '비방, 모욕 등이 포함된 글입니다.' },
    { value: '4', label: '개인정보', subtitle: '개인정보가 포함된 글입니다.' },
    { value: '5', label: '기타', hasTextarea: true },
  ];

  const isEtcSelected = selected.includes('5');

  const canSubmit = Boolean(selected.length > 0 && (!isEtcSelected || etcText.trim().length > 0));

  const toggleSelect = (value: string) => {
    setSelected((prev) => (prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;

    const selectedOption = options.find((o) => o.value === selected[0]);
    if (!selectedOption) return;

    const body = {
      reports: [
        {
          title: selectedOption.label,
          content: isEtcSelected ? etcText.trim() : (selectedOption.subtitle ?? ''),
        },
      ],
    };
    reportReview(body, {
      onSuccess: () => {
        setTimeout(() => {
          showToast('리뷰가 신고되었어요');
        }, 0);

        navigate(-1);
      },
    });
  };

  return (
    <div className="flex w-full flex-col">
      <div className="mt-6 mr-[71px] ml-7 flex flex-col items-start justify-center gap-2 pr-1">
        <span className="text-[18px] font-semibold">신고 이유를 선택해주세요.</span>
        <span className="text-[14px] text-[#8E8E8E]">
          접수된 신고는 관계자 확인 하에 블라인드 처리됩니다.
          <br />
          블라인드 처리까지 시간이 소요될 수 있습니다.
        </span>
      </div>

      <div className="mt-6 flex w-full flex-col gap-4 px-6 pb-24">
        {options.map((opt) => {
          const hasSubtitle = Boolean(opt.subtitle);
          const isEtc = Boolean(opt.hasTextarea);
          const checked = selected.includes(opt.value);
          return (
            <label key={opt.value} className={`flex flex-col pb-4 ${isEtc ? '' : 'border-b border-neutral-300'}`}>
              <div className="flex items-start gap-4 px-2">
                <div className={`relative flex items-center ${isEtc ? '' : 'mt-3'}`}>
                  <input
                    name="reason"
                    type="checkbox"
                    id={opt.value}
                    value={opt.value}
                    className="peer sr-only"
                    checked={checked}
                    onChange={() => toggleSelect(opt.value)}
                  />
                  <div className="peer-checked:bg-primary-500 h-4 w-4 rounded-full border border-[#8E8E8E] peer-checked:border-transparent" />
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 peer-checked:opacity-100">
                    <CheckIcon className="fill-white" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-[16px] font-medium">{opt.label}</div>
                    {isEtc && (
                      <div className={`text-[12px] text-neutral-400 ${etcText.length > 0 ? 'text-primary-500' : ''}`}>
                        {etcText.length}/150
                      </div>
                    )}
                  </div>
                  {hasSubtitle && <div className="text-[14px] text-neutral-500">{opt.subtitle}</div>}
                </div>
              </div>

              {isEtc && (
                <div className="pt-2 pr-[7px] pl-2">
                  <textarea
                    ref={textareaRef}
                    className="w-full resize-none overflow-hidden rounded-[5px] border border-neutral-300 bg-white px-4 pt-2 text-[14px] text-[#8E8E8E] placeholder:text-neutral-400 focus:outline-none"
                    placeholder="신고 사유를 입력해주세요."
                    maxLength={150}
                    value={etcText}
                    onChange={(e) => setEtcText(e.target.value.slice(0, 150))}
                    rows={2}
                  />
                </div>
              )}
            </label>
          );
        })}
      </div>

      <div
        className={`fixed right-0 bottom-0 left-0 mx-6 flex gap-[10px] rounded-[8px] ${
          canSubmit ? 'bg-primary-500 text-white' : 'bg-neutral-300 text-white'
        }`}
      >
        <button
          disabled={!canSubmit}
          onClick={handleSubmit}
          className="flex w-full items-center justify-center py-[11px] text-[15px] font-semibold"
        >
          신고하기
        </button>
      </div>
    </div>
  );
}
