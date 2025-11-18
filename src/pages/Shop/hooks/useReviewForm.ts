import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import type { CreateReviewRequest } from '@/api/shop/entity';
import { uploadShopFiles } from '@/api/shop';
import useCreateReview from '@/pages/Shop/hooks/useCreateReview';
import { useEditReview } from '@/pages/Shop/hooks/useEditReview';
import { useToast } from '@/util/hooks/useToast';

interface LocationState {
  shopName?: string;
  review?: {
    rating: number;
    content: string;
    image_urls: string[];
    menu_names: string[];
  };
}

export function useReviewForm() {
  const [content, setContent] = useState('');
  const [menuInput, setMenuInput] = useState('');
  const [menus, setMenus] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { shopId, reviewId } = useParams<{ shopId: string; reviewId?: string }>();

  const state = location.state as LocationState | null;
  const shopName = state?.shopName ?? '';
  const numericShopId = Number(shopId);
  const numericReviewId = reviewId ? Number(reviewId) : undefined;

  const { mutate: createReview } = useCreateReview(numericShopId);
  const { mutate: updateReview } = useEditReview(numericShopId, Number(numericReviewId ?? 0));

  const isFormValid = rating > 0 && content.trim().length > 0;

  const handleAddImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);

    setImages((prev) => {
      const totalCount = existingImageUrls.length + prev.length;
      const availableSlots = 3 - totalCount;
      if (availableSlots <= 0) return prev;

      const filesToAdd = selectedFiles.slice(0, availableSlots);
      return [...prev, ...filesToAdd];
    });

    e.target.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };
  const handleRemoveExistingImage = (index: number) => {
    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();

    const value = menuInput.trim();
    if (!value) return;
    if (menus.length >= 5) return;

    if (menus.includes(value)) {
      setMenuInput('');
      return;
    }

    setMenus((prev) => [...prev, value]);
    setMenuInput('');
  };

  const handleRemoveMenu = (index: number) => {
    setMenus((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!isFormValid || !shopId) return;

    const newImageUrls = images.length > 0 ? await uploadShopFiles(images) : [];
    const allImageUrls = [...existingImageUrls, ...newImageUrls];

    const body: CreateReviewRequest = {
      rating,
      content,
      image_urls: allImageUrls,
      menu_names: menus,
    };

    if (numericReviewId) {
      updateReview(body, {
        onSuccess: async () => {
          showToast('리뷰가 수정되었어요');
          await Promise.resolve();
          navigate(-1);
        },
      });
      return;
    }

    createReview(body, {
      onSuccess: async () => {
        showToast('리뷰가 작성되었어요');
        await Promise.resolve();
        navigate(-1);
      },
    });
  };

  useEffect(() => {
    if (!numericReviewId) return;
    if (!state?.review) return;

    const { rating, content, menu_names, image_urls } = state.review;

    setRating(rating);
    setContent(content);
    setMenus(menu_names ?? []);
    setExistingImageUrls(image_urls ?? []);
  }, [numericReviewId, state]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  return {
    shopName,
    content,
    setContent,
    rating,
    setRating,
    menus,
    setMenus,
    menuInput,
    setMenuInput,
    existingImageUrls,
    setExistingImageUrls,
    images,
    setImages,
    textareaRef,
    isFormValid,
    handleAddImages,
    handleRemoveImage,
    handleMenuKeyDown,
    handleRemoveMenu,
    handleSubmit,
    handleRemoveExistingImage,
    reviewId: numericReviewId,
  };
}
