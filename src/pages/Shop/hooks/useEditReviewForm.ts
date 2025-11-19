import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetShopReviewDetail } from './useGetShopReviewDetail';
import { useReviewFormBase } from './useReviewForm';
import type { CreateReviewRequest } from '@/api/shop/entity';
import { useEditReview } from '@/pages/Shop/hooks/useEditReview';
import { useReviewImageUpload } from '@/util/hooks/useImageUpload';
import { useToast } from '@/util/hooks/useToast';

export function useEditReviewForm() {
  const base = useReviewFormBase();

  const { shopId, reviewId } = useParams<{ shopId: string; reviewId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const numericShopId = Number(shopId);
  const numericReviewId = Number(reviewId);

  const { data: reviewDetail } = useGetShopReviewDetail(numericShopId, numericReviewId);
  const { mutate: updateReview } = useEditReview(numericShopId, numericReviewId);

  const {
    imageFile: imageUrls,
    imgRef,
    saveImgFile,
    removeImage,
    uploadError,
    setImageFile,
  } = useReviewImageUpload({ maxLength: 3 });

  const handleSubmit = async () => {
    if (!base.isFormValid) return;

    const body: CreateReviewRequest = {
      rating: base.rating,
      content: base.content,
      image_urls: [...base.existingImageUrls, ...imageUrls],
      menu_names: base.menus,
    };

    updateReview(body, {
      onSuccess: () => {
        showToast('리뷰가 수정되었어요');
        navigate(-1);
      },
    });
  };

  useEffect(() => {
    if (!reviewDetail) return;

    base.setRating(reviewDetail.rating);
    base.setContent(reviewDetail.content);
    base.setMenus(reviewDetail.menu_names ?? []);
    base.setExistingImageUrls(reviewDetail.image_urls ?? []);
  }, [reviewDetail]);

  return {
    ...base,
    handleSubmit,
    reviewId: numericReviewId,
    imageUrls,
    imgRef,
    saveImgFile,
    removeImage,
    uploadError,
    setImageFile,
  };
}
