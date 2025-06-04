import { useEffect } from 'react';

type Params = (event?: KeyboardEvent) => void;

function useEscapeKeyDown(handler: Params) {
  useEffect(() => {
    function keyDownEscapeHandler(event: KeyboardEvent) {
      if (event.key === 'Escape') handler(event);
    }

    document.addEventListener('keydown', keyDownEscapeHandler);

    return () => {
      document.removeEventListener('keydown', keyDownEscapeHandler);
    };
  }, []);
}

export default useEscapeKeyDown;
