import React from 'react';
import { twMerge } from 'tailwind-merge';

interface ContentProps {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}
export default function Content({ children, className }: ContentProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col items-center justify-center gap-6 px-8 py-6 font-[Pretendard] text-[15px] font-medium text-neutral-600',
        className,
      )}
    >
      {children}
    </div>
  );
}
