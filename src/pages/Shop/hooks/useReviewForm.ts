import { useEffect, useRef, useState } from 'react';
import type React from 'react';

export function useReviewFormBase() {
  const [content, setContent] = useState('');
  const [menuInput, setMenuInput] = useState('');
  const [menus, setMenus] = useState<string[]>([]);
  const [rating, setRating] = useState(0);
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const isFormValid = rating > 0 && content.trim().length > 0;

  const handleRemoveExistingImage = (index: number) => {
    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    const value = e.currentTarget.value.trim();

    if (!value) return;

    if (menus.includes(value)) {
      setMenuInput('');
      return;
    }
    if (menus.length >= 5) return;

    setMenus((prev) => [...prev, value]);
    setMenuInput('');
  };

  const handleRemoveMenu = (index: number) => {
    setMenus((prev) => prev.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }, [content]);

  return {
    content,
    setContent,
    menuInput,
    setMenuInput,
    menus,
    setMenus,
    rating,
    setRating,
    existingImageUrls,
    setExistingImageUrls,
    textareaRef,
    isFormValid,
    handleRemoveExistingImage,
    handleMenuKeyDown,
    handleRemoveMenu,
  };
}
