'use client';

import { CSSProperties, ElementType, ReactNode, useEffect, useRef, useState } from 'react';

/** 등장 방식. 섹션 성격에 맞춰 고른다 —
 *  같은 모션이 페이지 전체에 반복되면 스크롤이 단조로워지고, 무엇이 중요한지도 구분되지 않는다.
 *  wipe-*  : 가려진 곳에서 닦여 나오듯(사진·밴드처럼 면이 큰 요소)
 *  fold    : 위쪽을 축으로 펴짐(카드)
 *  slide-* : 옆에서 미끄러져 들어옴(목록 항목)
 *  zoom-out: 확대된 상태에서 제자리로(이미지 카드) */
type Variant =
  | 'fade-up'
  | 'fade'
  | 'blur-up'
  | 'scale'
  | 'wipe-left'
  | 'wipe-up'
  | 'fold'
  | 'slide-right'
  | 'zoom-out';

const FROM: Record<Variant, string> = {
  'fade-up': 'translateY(var(--m-dist))',
  fade: 'none',
  'blur-up': 'translateY(var(--m-dist))',
  scale: 'scale(0.97)',
  'wipe-left': 'translateX(-42px)',
  'wipe-up': 'translateY(38px) scaleY(0.94)',
  fold: 'perspective(1200px) rotateX(-12deg) translateY(18px)',
  'slide-right': 'translateX(-34px)',
  'zoom-out': 'scale(1.07)',
};

/** 기준점 — 어디를 축으로 펴지는지가 방식마다 다르다 */
const ORIGIN: Partial<Record<Variant, string>> = {
  fold: 'top center',
  'wipe-up': 'bottom center',
  'zoom-out': 'center center',
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

    let failsafe = 0;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
          window.clearInterval(failsafe);
        }
      },
      { threshold }
    );
    obs.observe(el);

    // 안전장치 — 관찰이 어떤 이유로든 발화하지 않아도 화면 안에 들어와 있으면 띄운다.
    // 등장 연출보다 "내용이 보이는 것"이 우선이다.
    let ticks = 0;
    failsafe = window.setInterval(() => {
      ticks += 1;
      const r2 = el.getBoundingClientRect();
      if (r2.top < window.innerHeight * 0.92 && r2.bottom > 0) {
        setVisible(true);
        window.clearInterval(failsafe);
        obs.disconnect();
        return;
      }
      // 관찰이 정상 동작하는 환경이면 이 확인은 필요 없다 — 몇 초만 지켜보고 멈춘다
      if (ticks >= 12) window.clearInterval(failsafe);
    }, 400);

    return () => {
      window.clearInterval(failsafe);
      obs.disconnect();
    };
  }, [threshold]);

  const dur = duration ?? 'var(--m-base)';
  const fromT = from ?? FROM[variant];
  const blur = variant === 'blur-up';
  const origin = ORIGIN[variant];

  const merged: CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'none' : fromT,
    ...(origin ? { transformOrigin: origin } : null),
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
