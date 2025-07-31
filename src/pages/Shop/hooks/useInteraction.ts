import { useState, useRef } from 'react';

export function useInteraction() {
  const [selectedMenu, setSelectedMenu] = useState('');
  const menuGroupRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const isAutoScrolling = useRef<boolean>(false);

  const handleScrollTo = (name: string) => {
    const element = menuGroupRefs.current[name];
    if (element) {
      isAutoScrolling.current = true;
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setSelectedMenu(name);
      setTimeout(() => {
        isAutoScrolling.current = false;
      }, 500);
    }
  };

  const handleChangeMenu = (name: string) => {
    if (!isAutoScrolling.current) {
      setSelectedMenu(name);
    }
  };

  return {
    selectedMenu,
    menuGroupRefs,
    isAutoScrolling,
    handleScrollTo,
    handleChangeMenu,
  };
}
