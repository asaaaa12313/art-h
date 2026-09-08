'use client';

import { useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** 따라오는 정도 — 0.2면 커서와의 거리의 20%만큼 끌려온다 */
  strength?: number;
  className?: string;
};

/**
 * 커서가 가까이 오면 살짝 끌려오는 버튼 — 레퍼런스가 쓰는 자석 효과와 같은 방식.
 *
 * 마우스가 있는 환경에서만 동작한다(터치에서는 커서가 없어 의미가 없고,
 * 「동작 줄이기」를 켠 환경에서는 아예 움직이지 않는다).
 * 위치 계산은 transform으로만 해서 레이아웃을 다시 계산하지 않는다 — 끊기지 않는다.
 */
export default function Magnetic({ children, strength = 0.24, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const raf = useRef(0);

  const move = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (raf.current) return;
    const { clientX, clientY } = e;
    raf.current = window.requestAnimationFrame(() => {
      raf.current = 0;
      const r = el.getBoundingClientRect();
      const dx = (clientX - (r.left + r.width / 2)) * strength;
      const dy = (clientY - (r.top + r.height / 2)) * strength;
      el.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
  };

  return (
    <span
      ref={ref}
      className={className}
      onMouseMove={move}
      onMouseLeave={reset}
      style={{ display: 'inline-block', transition: 'transform 0.5s cubic-bezier(0.22, 0.61, 0.36, 1)' }}
    >
      {children}
    </span>
  );
}
