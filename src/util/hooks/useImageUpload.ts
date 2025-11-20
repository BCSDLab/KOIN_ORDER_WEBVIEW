import { useRef, useState } from 'react';
import { uploadShopFiles } from '@/api/shop';
import { useToast } from '@/util/hooks/useToast';

export type UploadError =
  | '413' // Payload too large
  | '415' // Unsupported file type
  | '404' // Endpoint not found
  | '422' // File processing error
  | 'networkError'
  | '401' // Unauthorized
  | 'unknown'
  | '';

const MAXSIZE = 10 * 1024 * 1024;

interface UseReviewImageUploadOptions {
  maxLength?: number;
}

export function useReviewImageUpload({ maxLength = 3 }: UseReviewImageUploadOptions = {}) {
  const { showToast } = useToast();
  const [imageFile, setImageFile] = useState<string[]>([]);
  const [uploadError, setUploadError] = useState<UploadError>('');
  const imgRef = useRef<HTMLInputElement | null>(null);

  const saveImgFile = async (): Promise<void> => {
    const files = imgRef.current?.files;
    if (!files || files.length === 0) return;

    const existingCount = imageFile.length;
    const remainingSlots = maxLength - existingCount;

    if (remainingSlots <= 0) {
      showToast(`이미지는 최대 ${maxLength}개까지 업로드할 수 있어요.`);
      if (imgRef.current) imgRef.current.value = '';
      return;
    }

    const fileArr = Array.from(files);

    const onlyImages = fileArr.filter((file) => file.type.startsWith('image/'));
    if (onlyImages.length !== fileArr.length) {
      setUploadError('415');
      showToast('이미지 파일만 업로드할 수 있어요.');
      if (imgRef.current) imgRef.current.value = '';
      return;
    }

    const toUpload = onlyImages.slice(0, remainingSlots);

    if (onlyImages.length > remainingSlots) {
      showToast(`이미지는 최대 ${maxLength}개까지만 업로드되어, 일부 이미지는 제외됐어요.`);
    }

    const oversizeFiles = toUpload.filter((file) => file.size > MAXSIZE);
    const validFiles = toUpload.filter((file) => file.size <= MAXSIZE);

    if (oversizeFiles.length > 0) {
      setUploadError('413');
      showToast('이미지 용량은 10MB 이하로 업로드해주세요.');
    }

    if (validFiles.length === 0) {
      if (imgRef.current) imgRef.current.value = '';
      return;
    }

    try {
      const uploadedUrls: string[] = await uploadShopFiles(validFiles);

      setImageFile((prev) => [...prev, ...uploadedUrls]);
      setUploadError('');
    } catch (error) {
      const err = error as { response?: { status?: number } };
      const status = err.response?.status;

      let type: UploadError = 'unknown';
      if (status === 415) type = '415';
      else if (status === 404) type = '404';
      else if (status === 422) type = '422';
      else if (status === 401) type = '401';
      else type = 'networkError';

      setUploadError(type);
      showToast('이미지 업로드 중 오류가 발생했어요.');
    } finally {
      if (imgRef.current) imgRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    setImageFile((prev) => prev.filter((_, i) => i !== index));
  };

  return {
    imageFile,
    imgRef,
    saveImgFile,
    removeImage,
    uploadError,
    setImageFile,
  };
}
