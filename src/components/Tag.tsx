import React from 'react';

export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="pixel-corners inline-flex items-center bg-paper-2 px-2.5 py-1 font-mono text-xs text-ink">
      {children}
    </span>
  );
}
