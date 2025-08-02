import { useEffect, useRef } from 'react';

interface UseOutsideClickOptions {
  onOutsideClick: () => void;
}

const useTouchModalOutside = ({ onOutsideClick }: UseOutsideClickOptions) => {
  const containerRef = useRef<HTMLDialogElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const clickedElement = e.target as Node;
      const container = containerRef.current;
      const background = backgroundRef.current;

      if (container && !container.contains(clickedElement)) {
        onOutsideClick();
      } else if (background && background === clickedElement) {
        onOutsideClick();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onOutsideClick]);

  return { containerRef, backgroundRef };
};

export default useTouchModalOutside;
