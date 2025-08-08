import { useEffect } from 'react';

interface UseOutsideClickProps<
  Container extends HTMLElement = HTMLElement,
  Background extends HTMLElement = HTMLElement,
> {
  containerRef: React.RefObject<Container | null>;
  backgroundRef: React.RefObject<Background | null>;
  onOutsideClick: (e: MouseEvent | TouchEvent) => void;
}

const useHandleOutside = <Container extends HTMLElement = HTMLElement, Background extends HTMLElement = HTMLElement>({
  containerRef,
  backgroundRef,
  onOutsideClick,
}: UseOutsideClickProps<Container, Background>) => {
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (!(e.target instanceof Node)) return;

      const target = e.target;
      const container = containerRef.current;
      const background = backgroundRef.current;

      if (container && !container.contains(target)) {
        onOutsideClick(e);
      } else if (background && background === target) {
        onOutsideClick(e);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchend', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchend', handleOutsideClick);
    };
  }, [containerRef, backgroundRef, onOutsideClick]);
};

export default useHandleOutside;
