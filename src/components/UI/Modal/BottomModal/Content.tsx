import React, { type HTMLAttributes } from 'react';

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
export default function Content({ children, className }: ContentProps) {
  return <div className={className}>{children}</div>;
}
