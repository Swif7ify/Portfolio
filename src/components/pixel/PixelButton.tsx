import React from 'react';

type PixelButtonProps = {
  children: React.ReactNode;
  variant?: 'solid' | 'soft' | 'light';
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  icon?: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
};

const VARIANTS = {
  solid: 'bg-ink text-paper hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink',
  soft: 'bg-paper-2 text-ink hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper',
  light: 'bg-paper text-ink hover:bg-accent hover:text-accent-ink focus-visible:bg-accent focus-visible:text-accent-ink',
};

export function PixelButton({
  children,
  variant = 'solid',
  href,
  onClick,
  icon,
  className = '',
  target,
  rel,
}: PixelButtonProps) {
  const classes = `pixel-corners group inline-flex h-12 items-center gap-3 whitespace-nowrap px-5 font-mono text-sm transition-colors duration-150 ease-out focus-visible:outline-none ${VARIANTS[variant]} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <span aria-hidden className="transition-transform duration-150 ease-out group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <a href={href} onClick={onClick} target={target} rel={rel} className={classes}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {content}
    </button>
  );
}
