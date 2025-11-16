import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddThumbnail from '@/assets/Shop/add-thumbnail.svg';
import Button from '@/components/UI/Button';
import Modal from '@/components/UI/CenterModal/Modal';
import StarList from '@/pages/Shop/components/StarList';
import { useReviewForm } from '@/pages/Shop/hooks/useReviewForm';

export default function ReviewForm() {
  const {
    shopName,
    content,
    setContent,
    rating,
    setRating,
    menus,
    menuInput,
    setMenuInput,
    existingImageUrls,
    images,
    textareaRef,
    isFormValid,
    handleAddImages,
    handleRemoveImage,
    handleMenuKeyDown,
    handleRemoveMenu,
    handleRemoveExistingImage,
    handleSubmit,
    reviewId,
  } = useReviewForm();

  const [exitModalOpen, setExitModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setExitModalOpen(true);
    window.addEventListener('openReviewExitModal', handler);
    return () => window.removeEventListener('openReviewExitModal', handler);
  }, []);

  return (
    <div className="flex w-full flex-col pb-32">
      <div className="mt-6 mr-[50px] ml-6 flex flex-col items-start justify-center gap-[5px]">
        <span className="text-[20px] font-[700]">{shopName}</span>
        <span className="text-[14px] text-neutral-500">
          리뷰를 남겨주시면 사장님과 다른 분들에게 도움이 됩니다.
          <br />
          또한, 악의적인 리뷰는 관리자에 의해 삭제될 수 있습니다.
        </span>
      </div>

      <div className="mt-4 flex items-center gap-[10px] pr-[139px] pl-6">
        <StarList average_rating={rating} size={40} editable value={rating} onChange={setRating} />
        <span className="text-[16px] font-semibold">{rating}</span>
      </div>

      <div className="mt-6 px-5">
        <div className="h-[1px] w-full bg-neutral-300" />
      </div>

      <div className="mt-6 flex flex-col items-start px-6">
        <span className="font-nomal text-[16px]">사진</span>
        <span className="text-[12px] text-neutral-500">리뷰와 관련된 사진을 업로드해주세요.</span>
      </div>

      <div className="flex flex-nowrap gap-4 overflow-x-scroll overflow-y-visible pt-[6px] pl-6">
        <label className="flex h-[96px] w-[96px] shrink-0 flex-col items-center justify-center rounded-[8px] border-[2px] border-dashed border-neutral-300 bg-white">
          <AddThumbnail />
          <span className="text-[14px] font-medium text-neutral-500">{existingImageUrls.length + images.length}/3</span>
          <input
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleAddImages}
            disabled={existingImageUrls.length + images.length >= 3}
          />
        </label>

        {existingImageUrls.map((url, idx) => (
          <div key={url} className="relative h-[96px] w-[96px] shrink-0">
            <img src={url} alt={`existing-${idx}`} className="h-full w-full rounded-[8px] object-cover" />
            <button
              type="button"
              onClick={() => handleRemoveExistingImage(idx)}
              className="absolute top-[-5px] right-[-5px] flex h-4 w-4 items-center justify-center rounded-full bg-neutral-500 text-[14px] text-white"
            >
              ×
            </button>
          </div>
        ))}

        {images.map((file, idx) => (
          <div key={idx} className="relative h-[96px] w-[96px] shrink-0">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview-${idx}`}
              className="h-full w-full rounded-[8px] object-cover"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(idx)}
              className="absolute top-[-5px] right-[-5px] flex h-4 w-4 items-center justify-center rounded-full bg-neutral-500 text-[14px] text-white"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <div className="mb-3 flex items-center justify-between px-6">
          <span className="text-[16px] font-[500]">내용</span>
          <span className="text-[12px] text-neutral-500">{content.length}/500</span>
        </div>
        <div className="mx-6 rounded-[4px] border border-neutral-300 bg-white px-4 py-3">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, 500))}
            placeholder="리뷰를 작성해주세요"
            maxLength={500}
            className="w-full resize-none overflow-hidden text-[14px] placeholder-neutral-400 outline-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-3 flex flex-col px-6">
          <span className="text-[16px] font-[500]">주문메뉴</span>

          <div className="flex items-center justify-between">
            <span className="text-[12px] text-neutral-500">입력한 메뉴가 태그로 추가돼요</span>
            {menus.length > 0 && <span className="text-[12px] text-neutral-500">{menus.length}/5</span>}
          </div>

          {menus.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-2">
              {menus.map((menu, idx) => (
                <div
                  key={idx}
                  className="border-primary-300 text-primary-300 flex items-center gap-1 rounded-[5px] border px-[10px] py-[3px] text-[12px]"
                >
                  <span>{menu}</span>
                  <button onClick={() => handleRemoveMenu(idx)} className="text-primary-300 text-[12px]">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mx-6 rounded-[4px] border border-neutral-300 bg-white px-4 py-3">
          <textarea
            value={menuInput}
            onChange={(e) => setMenuInput(e.target.value)}
            onKeyDown={handleMenuKeyDown}
            placeholder="메뉴명을 입력해주세요"
            rows={1}
            className="w-full resize-none text-[14px] placeholder-neutral-400 outline-none"
          />
        </div>
      </div>

      <div
        className={`fixed right-0 bottom-[20px] left-0 mx-6 flex gap-[10px] rounded-[8px] text-white ${isFormValid ? 'bg-primary-500' : 'bg-neutral-300'
          }`}
      >
        <Button
          fullWidth
          color="primary"
          onClick={handleSubmit}
          state={isFormValid ? 'default' : 'disabled'}
          className="py-[11px] text-[15px]"
        >
          {reviewId ? '수정하기' : '작성하기'}
        </Button>
      </div>
      <Modal isOpen={exitModalOpen} onClose={() => setExitModalOpen(false)}>
        <div className="flex flex-col items-center justify-center gap-6 px-8 py-6">
          <p className="text-center text-[15px] text-neutral-600">리뷰 수정을 그만하시겠어요?</p>

          <div className="flex w-full gap-2">
            <Button
              color="gray"
              size="lg"
              className="flex-1 font-medium text-neutral-600 shadow-none"
              onClick={() => navigate(-1)}
            >
              그만하기
            </Button>

            <Button
              color="primary"
              size="lg"
              className="flex-1 font-medium shadow-none"
              onClick={() => setExitModalOpen(false)}
            >
              계속쓰기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
