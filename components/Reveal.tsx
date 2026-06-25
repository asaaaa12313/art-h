'use client';

import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from 'react';

type Variant = 'fade-up' | 'fade' | 'blur-up' | 'scale';

const FROM: Record<Variant, string> = {
  'fade-up': 'translateY(var(--m-dist))',
  fade: 'none',
  'blur-up': 'translateY(var(--m-dist))',
  scale: 'scale(0.97)',
};

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: string;
  from?: string;
  variant?: Variant;
  threshold?: number;
  style?: CSSProperties;
  as?: ElementType;
};

export default function Reveal({
  children,
  delay = 0,
  duration,
  from,
  variant = 'fade-up',
  threshold = 0.1,
  style,
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);
  // reduced-motion: 트랜지션 없이 즉시 표시 (움직임 0)
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInstant(true);
      setVisible(true);
      return;
    }

    // 마운트 시 이미 뷰포트 안이면 즉시 등장 트리거 (점프·앵커·뒤로가기 복원 시 빈 화면 방지)
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setVisible(true);
      return;
    }

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

  const dur = duration ?? 'var(--m-base)';
  const fromT = from ?? FROM[variant];
  const blur = variant === 'blur-up';

  const merged: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : fromT,
    ...(blur ? { filter: visible ? 'blur(0px)' : 'blur(12px)' } : null),
    willChange: visible ? undefined : 'opacity, transform',
    transition: instant
      ? 'none'
      : `opacity ${dur} var(--ease-out) ${delay}s, transform ${dur} var(--ease-out) ${delay}s${
          blur ? `, filter ${dur} var(--ease-out) ${delay}s` : ''
        }`,
    ...style,
  };

  const Component = Tag as ElementType;
  return (
    <Component ref={ref} style={merged}>
      {children}
    </Component>
  );
}
