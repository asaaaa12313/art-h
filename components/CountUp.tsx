'use client';

import { useEffect, useRef, useState } from 'react';

// 숫자 카운트업 — 화면 진입 시 0 → 목표값 (easeOutCubic). reduced-motion 시 즉시 목표값.
export default function CountUp({ target, duration = 1100 }: { target: number; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target);
      return;
    }
    const run = () => {
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      run();
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.unobserve(el);
        run();
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{n}</span>;
}
