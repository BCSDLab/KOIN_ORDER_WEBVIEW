import React, { type HTMLAttributes } from 'react';

interface FooterProps extends HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export default function Footer({ children, className }: FooterProps) {
  return <div className={className}>{children}</div>;
}
