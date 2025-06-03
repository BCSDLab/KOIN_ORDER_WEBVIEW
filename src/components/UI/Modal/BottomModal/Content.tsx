import React, { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export default function Content({ children, className }: ContentProps) {
  return (
    <div
      className={twMerge('flex flex-col gap-4 px-8 pt-4 pb-3 font-[Pretendard] text-sm text-neutral-600', className)}
    >
      {children}
    </div>
  );
}
