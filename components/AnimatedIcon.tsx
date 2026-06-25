'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';

// 브랜드 라인 아이콘 — 화면 진입 시 선이 그려짐(draw-on). 로띠 대신 인라인 SVG(의존성 0, 8GB 맥 친화).
// 각 아이콘 = stroke path d 배열. pathLength=1 + dashoffset 트랜지션으로 그려지는 효과.
const ICONS: Record<string, string[]> = {
  shield: ['M12 3 L19 6 V11 C19 15.5 16 18.8 12 20.5 C8 18.8 5 15.5 5 11 V6 Z', 'M8.8 11.4 l2.2 2.2 l4.2 -4.6'],
  users: ['M9 10.5 a3 3 0 1 0 0.001 -6 A3 3 0 0 0 9 10.5 Z', 'M3.5 19 C3.5 15.4 6 13 9 13 C12 13 14.5 15.4 14.5 19', 'M15.5 5 a2.6 2.6 0 0 1 0 5', 'M16 13.2 C18.4 13.6 20.5 15.6 20.5 19'],
  layers: ['M12 3.5 L20.5 8 L12 12.5 L3.5 8 Z', 'M3.5 12 L12 16.5 L20.5 12', 'M3.5 16 L12 20.5 L20.5 16'],
  building: ['M6 20.5 V5 a1 1 0 0 1 1 -1 H17 a1 1 0 0 1 1 1 V20.5', 'M3.5 20.5 H20.5', 'M9 8 H10.5 M13.5 8 H15 M9 12 H10.5 M13.5 12 H15', 'M10.5 20.5 V16.5 H13.5 V20.5'],
  door: ['M6 20.5 V4.5 a1 1 0 0 1 1 -1 H17 a1 1 0 0 1 1 1 V20.5', 'M3.5 20.5 H20.5', 'M14.2 12.4 v1.2'],
  clock: ['M12 21 a9 9 0 1 1 0.001 -18 A9 9 0 0 1 12 21 Z', 'M12 7 V12 L15.5 14'],
  badge: ['M12 14.5 a5.5 5.5 0 1 1 0.001 -11 A5.5 5.5 0 0 1 12 14.5 Z', 'M8.8 9 l2.2 2.2 l4 -4.2', 'M8.5 14 L7 21 l5 -2.4 l5 2.4 l-1.5 -7'],
  leaf: ['M5 19 C5 11 9.5 5.5 19 5 C18.5 14.5 13 19 5 19 Z', 'M5 19 C8.5 14.5 12 11.5 16 9.5'],
  chat: ['M4 5.5 a1.5 1.5 0 0 1 1.5 -1.5 H18.5 a1.5 1.5 0 0 1 1.5 1.5 V14 a1.5 1.5 0 0 1 -1.5 1.5 H9 L5 19 V15.5 H5.5 a1.5 1.5 0 0 1 -1.5 -1.5 Z'],
  home: ['M4 11 L12 4 L20 11', 'M6 9.5 V20 H18 V9.5', 'M10 20 V14 H14 V20'],
  pin: ['M12 21 C12 21 5.5 14.5 5.5 9.5 a6.5 6.5 0 0 1 13 0 C18.5 14.5 12 21 12 21 Z', 'M12 12 a2.4 2.4 0 1 1 0.001 -4.8 A2.4 2.4 0 0 1 12 12 Z'],
  phone: ['M6.5 4 H9 L10.5 8 L8.5 9.5 C9.3 11.5 12.5 14.7 14.5 15.5 L16 13.5 L20 15 V17.5 a2 2 0 0 1 -2 2 C10.5 19.5 4.5 13.5 4.5 6 a2 2 0 0 1 2 -2 Z'],
  clock2: ['M12 21 a9 9 0 1 1 0.001 -18 A9 9 0 0 1 12 21 Z', 'M12 7 V12 L15.5 14'],
  car: ['M5 13 L6.4 8.8 A2 2 0 0 1 8.3 7.5 H15.7 A2 2 0 0 1 17.6 8.8 L19 13', 'M4 13 H20 V15.5 H4 Z', 'M8 17.6 a1.6 1.6 0 1 0 -0.01 0', 'M16 17.6 a1.6 1.6 0 1 0 -0.01 0'],
  train: ['M7.5 4 H16.5 A1.5 1.5 0 0 1 18 5.5 V14 A1.5 1.5 0 0 1 16.5 15.5 H7.5 A1.5 1.5 0 0 1 6 14 V5.5 A1.5 1.5 0 0 1 7.5 4 Z', 'M6 9.5 H18', 'M9.5 19 L7.5 16', 'M14.5 19 L16.5 16'],
  bus: ['M6 5 H18 A1 1 0 0 1 19 6 V15 A1 1 0 0 1 18 16 H6 A1 1 0 0 1 5 15 V6 A1 1 0 0 1 6 5 Z', 'M5 10 H19', 'M8 18.2 a1.4 1.4 0 1 0 -0.01 0', 'M16 18.2 a1.4 1.4 0 1 0 -0.01 0'],
  walk: ['M12 5.4 a1.5 1.5 0 1 0 -0.01 0', 'M12 8 V14', 'M12 14 L9.5 19.5', 'M12 14 L14.5 19.5', 'M12 10 L15 12'],
  tooth: ['M12 4.2 C9.2 4.2 8.2 5.2 6.6 5.2 C4.6 5.2 4.2 7.2 4.7 9.6 C5.2 12 5.6 13 6.1 16 C6.5 18.4 7 20 8 20 C9 20 9 17.6 9.5 16.2 C9.9 14.8 10.8 14.2 12 14.2 C13.2 14.2 14.1 14.8 14.5 16.2 C15 17.6 15 20 16 20 C17 20 17.5 18.4 17.9 16 C18.4 13 18.8 12 19.3 9.6 C19.8 7.2 19.4 5.2 17.4 5.2 C15.8 5.2 14.8 4.2 12 4.2 Z'],
  sparkle: ['M12 4 L13.4 10.6 L20 12 L13.4 13.4 L12 20 L10.6 13.4 L4 12 L10.6 10.6 Z', 'M18.6 4.8 L19.1 6.9 L21.2 7.4 L19.1 7.9 L18.6 10 L18.1 7.9 L16 7.4 L18.1 6.9 Z'],
  droplet: ['M12 4 C12 4 6 11 6 15 A6 6 0 0 0 18 15 C18 11 12 4 12 4 Z', 'M9.6 15.2 A2.4 2.4 0 0 0 12 17.6'],
  scan: ['M4 8 V6 A2 2 0 0 1 6 4 H8', 'M16 4 H18 A2 2 0 0 1 20 6 V8', 'M20 16 V18 A2 2 0 0 1 18 20 H16', 'M8 20 H6 A2 2 0 0 1 4 18 V16', 'M4 12 H20'],
  award: ['M12 14 a5 5 0 1 0 -0.01 0', 'M9 17.4 L7.5 21 L12 19 L16.5 21 L15 17.4'],
  calendar: ['M5 6 H19 A1 1 0 0 1 20 7 V19 A1 1 0 0 1 19 20 H5 A1 1 0 0 1 4 19 V7 A1 1 0 0 1 5 6 Z', 'M4 10 H20', 'M8 4 V7.5', 'M16 4 V7.5'],
};

type Props = {
  name: keyof typeof ICONS | string;
  size?: number;
  stroke?: string;
  strokeWidth?: number;
  delay?: number;
  className?: string;
  style?: CSSProperties;
};

export default function AnimatedIcon({
  name,
  size = 28,
  stroke = 'var(--c-blue)',
  strokeWidth = 1.6,
  delay = 0,
  className,
  style,
}: Props) {
  const ref = useRef<SVGSVGElement | null>(null);
  const [drawn, setDrawn] = useState(false);
  const [instant, setInstant] = useState(false);
  const paths = ICONS[name] ?? ICONS.badge;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInstant(true);
      setDrawn(true);
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setDrawn(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setDrawn(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={{ display: 'block', ...style }}
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          pathLength={1}
          style={{
            strokeDasharray: 1,
            strokeDashoffset: drawn ? 0 : 1,
            transition: instant
              ? 'none'
              : `stroke-dashoffset 0.85s var(--ease-out) ${delay + i * 0.12}s`,
          }}
        />
      ))}
    </svg>
  );
}
