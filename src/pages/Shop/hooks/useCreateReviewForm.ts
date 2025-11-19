import { useParams, useNavigate } from 'react-router-dom';
import { useReviewFormBase } from './useReviewForm';
import type { CreateReviewRequest } from '@/api/shop/entity';
import useCreateReview from '@/pages/Shop/hooks/useCreateReview';
import { useReviewImageUpload } from '@/util/hooks/useImageUpload';
import { useToast } from '@/util/hooks/useToast';

interface ApiErrorBody {
  message?: string;
}

export function useCreateReviewForm() {
  const base = useReviewFormBase();

  const { shopId } = useParams<{ shopId: string }>();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const numericShopId = shopId ? Number(shopId) : undefined;
  const { mutate: createReview } = useCreateReview(numericShopId ?? 0);

  const {
    imageFile: imageUrls,
    imgRef,
    saveImgFile,
    removeImage,
    uploadError,
    setImageFile,
  } = useReviewImageUpload({ maxLength: 3 });

  const handleSubmit = async () => {
    if (!base.isFormValid || numericShopId === undefined) return;

    const body: CreateReviewRequest = {
      rating: base.rating,
      content: base.content,
      image_urls: imageUrls,
      menu_names: base.menus,
    };

    createReview(body, {
      onSuccess: () => {
        showToast('리뷰가 작성되었어요');
        navigate(-1);
      },
      onError: (error) => {
        const apiError = error as ApiErrorBody;
        const raw = apiError.message;

        if (!raw) return;

        const parsed = JSON.parse(raw) as { message?: string };

        if (parsed.message) {
          showToast(parsed.message);
          navigate(-1);
          return;
        }
      },
    });
  };

  return {
    ...base,
    handleSubmit,
    reviewId: undefined,
    imageUrls,
    imgRef,
    saveImgFile,
    removeImage,
    uploadError,
    setImageFile,
  };
}
