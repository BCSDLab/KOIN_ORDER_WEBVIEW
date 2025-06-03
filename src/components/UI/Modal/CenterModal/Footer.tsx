import React, { type HTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function Footer({ children, className }: FooterProps) {
  return <div className={twMerge('px-8 py-3', className)}>{children}</div>;
}
