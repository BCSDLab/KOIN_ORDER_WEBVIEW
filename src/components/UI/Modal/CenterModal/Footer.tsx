import React from 'react';
import { twMerge } from 'tailwind-merge';

interface FooterProps {
  children?: React.ReactNode;
  className?: React.HTMLAttributes<HTMLDivElement>['className'];
}

export default function Footer({ children, className }: FooterProps) {
  return <div className={twMerge('px-8 py-3', className)}>{children}</div>;
}
