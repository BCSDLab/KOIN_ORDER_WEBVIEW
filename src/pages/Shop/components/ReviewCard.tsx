import { useState } from 'react';
import clsx from 'clsx';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteReview } from '../hooks/useDeleteReview';
import LoginRequiredModal from './LoginRequiredModal';
import StarList from './StarList';
import type { Review } from '@/api/shop/entity';
import CheckBookMark from '@/assets/Shop/check-bookmark.svg';
import NoImageIcon from '@/assets/Shop/no-image-icon.svg';
import Portal from '@/components/Portal';
import Button from '@/components/UI/Button';
import Modal from '@/components/UI/CenterModal/Modal';
import useBooleanState from '@/util/hooks/useBooleanState';
import useScrollLock from '@/util/hooks/useScrollLock';
import { useToast } from '@/util/hooks/useToast';
import { getCookie } from '@/util/ts/cookie';
import { formatDate } from '@/util/ts/formatDate';

interface ReviewCardProps {
  review: Review;
}
export default function ReviewCard({ review }: ReviewCardProps) {
  const [loginModalOpen, openLoginModal, closeLoginModal] = useBooleanState(false);
  const [previewOpen, openPreview, closePreview] = useBooleanState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [deleteModalOpen, openDeleteModal, closeDeleteModal] = useBooleanState(false);

  useScrollLock(previewOpen);
  const navigate = useNavigate();
  const { shopId } = useParams();
  const { showToast } = useToast();

  const { rating, nick_name, content, image_urls, menu_names, is_mine, is_reported, created_at, review_id } = review;

  if (!shopId) return null;

  const { mutate: deleteReview } = DeleteReview(Number(shopId), review_id);

  if (is_reported) {
    return (
      <div className="flex w-full items-center gap-2 py-3">
        <NoImageIcon />
        <span className="text-[14px] font-medium text-neutral-500">신고에 의해 숨김 처리 되었습니다.</span>
      </div>
    );
  }

  const ensureLogin = () => {
    const isLogin = getCookie('AUTH_TOKEN_KEY');
    if (!isLogin) {
      openLoginModal();
      return false;
    }
    return true;
  };

  const handleReportClick = () => {
    if (!ensureLogin()) return;
    navigate(`/review/report/${shopId}?reviewId=${review_id}`);
  };

  const handleEditClick = () => {
    if (!ensureLogin()) return;

    navigate(`/review/edit/${shopId}/${review_id}`, {
      state: {
        review: {
          rating,
          content,
          menu_names,
          image_urls,
        },
      },
    });
  };

  const handleDeleteClick = () => {
    if (!ensureLogin()) return;
    openDeleteModal();
  };

  const handleConfirmDelete = () => {
    deleteReview(undefined, {
      onSuccess: () => {
        showToast('리뷰가 삭제되었어요');
        closeDeleteModal();
        navigate(0);
      },
    });
  };

  const handleImageClick = (src: string) => {
    if (previewOpen) return;
    setPreviewImage(src);
    openPreview();
  };

  const handleClosePreview = () => {
    closePreview();
    setPreviewImage(null);
  };

  return (
    <div className={clsx('flex w-full flex-col items-start gap-[10px] pb-1', previewOpen && 'pointer-events-none')}>
      {is_mine && (
        <div className="text-primary-500 flex items-center text-[12px]">
          <CheckBookMark />
          <span>내가 작성한 리뷰</span>
        </div>
      )}
      <div className="flex w-full items-center justify-between gap-[6px]">
        <span className="text-[16px] font-medium">{nick_name}</span>
        {is_mine ? (
          <div className="flex gap-[6px]">
            <Button color="darkGray" size="sm" className="text-[12px] !shadow-none" onClick={handleEditClick}>
              수정
            </Button>
            <Button color="darkGray" size="sm" className="text-[12px] !shadow-none" onClick={handleDeleteClick}>
              삭제
            </Button>
          </div>
        ) : (
          <button className="text-[14px] text-neutral-500" onClick={handleReportClick} disabled={is_reported}>
            신고하기
          </button>
        )}
      </div>
      <div className="flex items-center gap-3 text-[12px] text-neutral-500">
        <StarList average_rating={rating} />
        <span>{formatDate(created_at)}</span>
      </div>
      <span className="flex text-[14px]">{content}</span>
      {image_urls?.length > 0 && (
        <div className="scrollbar-hide flex w-full gap-2 overflow-x-auto">
          {image_urls.map((url, idx) => (
            <button key={idx} type="button" className="shrink-0" onClick={() => handleImageClick(url)}>
              <img
                key={idx}
                src={url}
                alt={content}
                className="h-[148px] w-[148px] rounded-[10px] bg-center bg-no-repeat object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {menu_names?.length > 0 && (
        <div className="flex w-full flex-wrap items-start gap-[10px]">
          {menu_names.map((name, idx) => (
            <span
              key={idx}
              className="border-primary-300 text-primary-300 rounded-[5px] border px-[10px] py-[3px] text-[12px] break-all"
            >
              {name}
            </span>
          ))}
        </div>
      )}

      <LoginRequiredModal
        isOpen={loginModalOpen}
        onClose={closeLoginModal}
        title={`리뷰를 작성하기 위해\n로그인이 필요해요.`}
        subTitle={`리뷰작성은 회원만 사용 가능합니다.`}
      />

      {previewOpen && previewImage && (
        <Portal>
          <div
            role="presentation"
            tabIndex={-1}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80"
            onClick={handleClosePreview}
          >
            <div
              role="presentation"
              tabIndex={-1}
              className="max-h-[90vh] max-w-[90vw]"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={previewImage} className="max-h-[90vh] max-w-[90vw] rounded-[12px] object-contain" />
            </div>
          </div>
        </Portal>
      )}

      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <div className="flex flex-col items-center justify-center gap-6 px-8 py-6">
          <p className="text-center text-[15px] font-[400] text-neutral-600">
            삭제한 리뷰는 되돌릴 수 없습니다. <br /> 삭제 하시겠습니까?
          </p>
          <div className="flex w-full gap-2">
            <Button type="button" color="gray" size="lg" className="shodow-none flex-1" onClick={closeDeleteModal}>
              취소
            </Button>

            <Button
              type="button"
              color="primary"
              size="lg"
              className="shodow-none flex-1"
              onClick={handleConfirmDelete}
            >
              삭제하기
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
