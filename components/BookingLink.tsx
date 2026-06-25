'use client';

import { CSSProperties, ReactNode, useRef, useState } from 'react';

type Props = {
  children?: ReactNode;
  variant?: 'gold' | 'ghost';
  style?: CSSProperties;
};

export default function BookingLink({
  children = '예약하기',
  variant = 'gold',
  style,
}: Props) {
  const url = process.env.NEXT_PUBLIC_BOOKING_URL;
  const [hover, setHover] = useState(false);
  const [active, setActive] = useState(false);
  const reducedRef = useRef<boolean | null>(null);

  const isReduced = () => {
    if (reducedRef.current === null) {
      reducedRef.current =
        typeof window !== 'undefined' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return reducedRef.current;
  };

  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    fontFamily: 'var(--f-body)',
    fontSize: 13,
    letterSpacing: 0.5,
    padding: '10px 18px',
    transition:
      'background 0.3s, color 0.3s, border-color 0.3s, transform 0.2s var(--ease-out)',
  };

  const variantStyle: CSSProperties =
    variant === 'gold'
      ? { background: 'var(--c-gold)', color: '#fff' }
      : {
          background: 'transparent',
          color: '#fff',
          borderBottom: '1px solid rgba(255,255,255,0.35)',
          paddingBottom: 4,
          padding: '0 0 4px',
        };

  if (!url) {
    return (
      <span style={{ ...base, ...variantStyle, opacity: 0.6, ...style }}>
        {children}
      </span>
    );
  }

  const motionStyle: CSSProperties = isReduced()
    ? {}
    : {
        transform: active
          ? 'scale(0.98)'
          : hover
          ? 'translateY(-1px) scale(1.02)'
          : 'none',
      };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => {
        setHover(false);
        setActive(false);
      }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{ ...base, ...variantStyle, ...motionStyle, ...style }}
    >
      {children}
    </a>
  );
}
