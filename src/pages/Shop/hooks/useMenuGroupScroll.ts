import { useState, useRef, useEffect } from 'react';

export function useMenuGroupScroll() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const menuGroupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isAutoScrolling = useRef<boolean>(false);

  const handleScrollTo = (name: string) => {
    const element = menuGroupRefs.current[name];
    if (element) {
      isAutoScrolling.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSelectedMenu(name);
    }
  };

  const handleChangeMenu = (name: string) => {
    setSelectedMenu(name);
  };

  useEffect(() => {
    const handleScrollEnd = () => {
      if (isAutoScrolling.current) {
        isAutoScrolling.current = false;
      }
    };

    window.addEventListener('scrollend', handleScrollEnd);

    return () => {
      window.removeEventListener('scrollend', handleScrollEnd);
    };
  }, []);

  return {
    selectedMenu,
    menuGroupRefs,
    isAutoScrolling,
    handleScrollTo,
    handleChangeMenu,
  };
}
