import { ReactNode, Suspense, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PageViewTracker from '../analytics/PageViewTracker';

interface WrapperProps {
  title: string;
  element: ReactNode;
}

export default function Wrapper({ title, element }: WrapperProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `코인 - ${title}`;
  }, [title, pathname]);

  return (
    <>
      {element}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
