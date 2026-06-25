'use client';

import { CSSProperties, ElementType, useEffect, useRef, useState } from 'react';

// 마스크 제목 등장 — 각 줄을 overflow:hidden 안에서 아래→제자리로 밀어올림(줄 단위 stagger).
// reduced-motion·점프 시 즉시 표시.
type Props = {
  lines: string[];
  className?: string;
  as?: ElementType;
  delay?: number;
  duration?: string;
  style?: CSSProperties;
};

export default function TextReveal({
  lines,
  className,
  as: Tag = 'h2',
  delay = 0,
  duration = '0.9s',
  style,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [vis, setVis] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInstant(true);
      setVis(true);
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setVis(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Comp = Tag as ElementType;
  return (
    <Comp ref={ref} className={className} style={style}>
      {lines.map((ln, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <span
            style={{
              display: 'block',
              transform: vis ? 'none' : 'translateY(115%)',
              transition: instant ? 'none' : `transform ${duration} var(--ease-out) ${delay + i * 0.08}s`,
            }}
          >
            {ln}
          </span>
        </span>
      ))}
    </Comp>
  );
}
