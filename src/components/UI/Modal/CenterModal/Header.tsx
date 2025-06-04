import React, { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Header({ children, className }: HeaderProps) {
  return <div className={twMerge('px-8 py-3 text-lg font-semibold', className)}>{children}</div>;
}
