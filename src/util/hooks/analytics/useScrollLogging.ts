import { useEffect, useRef } from 'react';

interface ScrollLoggingOptions {
  throttleMilliseconds?: number;
  minimumDeltaPixels?: number;
}

export function useScrollLogging(loggingFunc: () => void, options: ScrollLoggingOptions = {}) {
  const { throttleMilliseconds = 800, minimumDeltaPixels = 8 } = options;

  const lastLoggedTimestampRef = useRef(0);
  const lastScrollTopRef = useRef(0);

  useEffect(() => {
    const scrollElement = document.scrollingElement || document.documentElement;
    lastScrollTopRef.current = scrollElement?.scrollTop ?? 0;

    const handleScroll = () => {
      const currentTime = Date.now();
      const currentScrollTop = scrollElement?.scrollTop ?? 0;
      const scrolledDistance = Math.abs(currentScrollTop - lastScrollTopRef.current);

      const isBeyondMinimumDistance = scrolledDistance >= minimumDeltaPixels;
      const isBeyondThrottleTime = currentTime - lastLoggedTimestampRef.current >= throttleMilliseconds;

      if (isBeyondMinimumDistance && isBeyondThrottleTime) {
        lastLoggedTimestampRef.current = currentTime;
        loggingFunc();
      }

      lastScrollTopRef.current = currentScrollTop;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [loggingFunc, throttleMilliseconds, minimumDeltaPixels]);
}
