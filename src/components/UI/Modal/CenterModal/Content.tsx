import React, { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
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
