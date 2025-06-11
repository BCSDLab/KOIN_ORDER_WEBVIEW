import React, { type HTMLAttributes } from 'react';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function Header({ children, className }: HeaderProps) {
  return <div className={className}>{children}</div>;
}
