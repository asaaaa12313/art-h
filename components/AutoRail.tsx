'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import styles from './AutoRail.module.css';

type Props = {
  children: ReactNode;
  /** 한 바퀴 도는 데 걸리는 시간(초). 카드가 많을수록 길게 */
  seconds?: number;
  className?: string;
  label: string;
};

/**
 * 옆으로 계속 흘러가는 카드 줄.
 *
 * 화면을 붙잡아 두고(pin) 휠을 가로 이동에 쓰던 방식은,
 * 세로로 내리려는 동작과 가로로 넘어가는 동작이 한꺼번에 일어나 헷갈린다.
 * 그래서 휠은 평소대로 페이지를 내리게 두고, 카드 줄은 스스로 흐르게 했다.
 *
 * 같은 목록을 두 벌 붙여 놓고 절반만큼 밀면 이음매 없이 이어진다.
 * 마우스를 올리면 멈춘다 — 읽고 누를 시간을 주기 위해서다.
 * 「동작 줄이기」를 켠 환경에서는 흐르지 않고, 손으로 미는 가로 스크롤이 된다.
 */
export default function AutoRail({ children, seconds = 46, className, label }: Props) {
  const [still, setStill] = useState(false);
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setStill(m.matches);
    on();
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`${styles.wrap} ${className || ''}`}
      data-still={still}
      data-paused={paused}
      role="group"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.track} style={{ animationDuration: `${seconds}s` }}>
        <div className={styles.set}>{children}</div>
        {/* 두 번째 벌은 이음매를 메우기 위한 복제라 읽기에서는 감춘다 */}
        {!still && (
          <div className={styles.set} aria-hidden="true">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
