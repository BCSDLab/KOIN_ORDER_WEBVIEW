import { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useGetReviewReportCategories } from '../../hooks/useGetReviewReportCategories';
import useReportReview from '../../hooks/useReportReview';
import CheckIcon from '@/assets/Home/check-icon.svg';
import Button from '@/components/UI/Button';
import { useToast } from '@/util/hooks/useToast';

export default function ReviewReport() {
  const [selected, setSelected] = useState<string[]>([]);
  const [etcText, setEtcText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { shopId } = useParams();
  const [searchParams] = useSearchParams();
  const reviewIdParam = searchParams.get('reviewId');
  const navigate = useNavigate();

  const { showToast } = useToast();
  const { mutate: reportReview } = useReportReview(Number(shopId), Number(reviewIdParam));
  const { data: categoriesData } = useGetReviewReportCategories();

  const options =
    categoriesData?.categories.map((category) => ({
      value: category.name,
      label: category.name,
      subtitle: category.detail || undefined,
      hasTextarea: category.name === '기타',
    })) ?? [];

  useEffect(() => {
    const trimmed = etcText.trim();

    setSelected((prev) => {
      const hasEtc = prev.includes('기타');

      if (trimmed.length > 0 && !hasEtc) {
        return [...prev, '기타'];
      }
      if (trimmed.length === 0 && hasEtc) {
        return prev.filter((v) => v !== '기타');
      }

      return prev;
    });
  }, [etcText]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [etcText, selected]);

  const isEtcSelected = selected.includes('기타');

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
      onSuccess: async () => {
        showToast('리뷰가 신고되었어요');
        await Promise.resolve();
        navigate(-1);
      },
    });
  };

  return (
    <div className="flex min-h-[calc(100vh-60px)] w-full flex-col">
      <div className="mt-6 flex flex-col items-start justify-center gap-2 px-7">
        <span className="text-[18px] font-semibold">신고 이유를 선택해주세요.</span>
        <span className="text-[14px] text-[#8E8E8E]">
          접수된 신고는 관계자 확인 하에 블라인드 처리됩니다.
          <br />
          블라인드 처리까지 시간이 소요될 수 있습니다.
        </span>
      </div>

      <div className="mt-6 flex w-full flex-1 flex-col gap-4 px-6">
        {options.map((opt) => {
          const hasSubtitle = !!opt.subtitle;
          const isEtc = !!opt.hasTextarea;
          const checked = selected.includes(opt.value);

          return (
            <label key={opt.value} className={`flex flex-col pb-4 ${isEtc ? '' : 'border-b border-neutral-300'}`}>
              <div className="flex items-start gap-4 px-2">
                <div className={`relative flex items-center ${isEtc ? 'mt-1' : 'mt-3'}`}>
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
                    <div className="font-medium">{opt.label}</div>
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
                <div className="pt-2 pr-[7px] pb-1 pl-2">
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
        <Button
          fullWidth
          color="primary"
          state={canSubmit ? 'default' : 'disabled'}
          onClick={handleSubmit}
          className="mt-auto mb-4 py-[11px] text-[15px]"
        >
          신고하기
        </Button>
      </div>
    </div>
  );
}
