'use client';

import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from 'react';

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: string;
  from?: string;
  threshold?: number;
  style?: CSSProperties;
  as?: ElementType;
};

export default function Reveal({
  children,
  delay = 0,
  duration = '0.8s',
  from = 'translateY(36px)',
  threshold = 0.1,
  style,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const merged: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : from,
    transition: `opacity ${duration} var(--ease-out) ${delay}s, transform ${duration} var(--ease-out) ${delay}s`,
    ...style,
  };

  const Component = Tag as any;
  return (
    <Component ref={ref as any} style={merged}>
      {children}
    </Component>
  );
}
