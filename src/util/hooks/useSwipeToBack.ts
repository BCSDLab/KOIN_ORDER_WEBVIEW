import { useEffect } from 'react';

export const useSwipeToBack = (key: string = 'swipeToBack') => {
  useEffect(() => {
    sessionStorage.setItem(key, 'false');

    let startX = 0;
    let startY = 0;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaX < -100) {
        sessionStorage.setItem(key, 'true');
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      startX = touch.clientX;
      startY = touch.clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      const diffX = touch.clientX - startX;
      const diffY = touch.clientY - startY;

      if (Math.abs(diffX) > Math.abs(diffY) && diffX < -60) {
        sessionStorage.setItem(key, 'true');
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [key]);
};
