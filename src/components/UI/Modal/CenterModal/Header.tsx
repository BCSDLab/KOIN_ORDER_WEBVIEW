import React from 'react';
import { twMerge } from 'tailwind-merge';

interface HeaderProps {
  children: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export default function Header({ children, className }: HeaderProps) {
  return <div className={twMerge('px-8 py-3 text-lg font-semibold', className)}>{children}</div>;
}
