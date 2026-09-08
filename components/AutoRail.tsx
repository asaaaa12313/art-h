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
  /** 멈춤 단추로 붙잡아 둔 상태 — 마우스를 떼도 풀리지 않는다 */
  const [held, setHeld] = useState(false);
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
      data-paused={paused || held}
      role="group"
      aria-label={label}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className={styles.track} style={{ animationDuration: `${seconds}s` }}>
        <div className={styles.set}>{children}</div>
        {/* 두 번째 벌은 이음매를 메우기 위한 복제다.
            읽기에서 감추는 것만으로는 부족하다 — inert를 함께 걸지 않으면
            키보드 Tab이 화면에 읽히지도 않는 링크로 들어가 갇힌다. */}
        {!still && (
          <div className={styles.set} aria-hidden="true" inert>
            {children}
          </div>
        )}
      </div>

      {/* 멈춤 단추 — 마우스가 없는 기기에는 멈출 방법이 아예 없었다.
          5초 넘게 저절로 움직이는 것에는 멈출 수단이 있어야 한다(WCAG 2.2.2). */}
      {!still && (
        <button
          type="button"
          className={styles.pause}
          aria-pressed={held}
          onClick={() => setHeld((v) => !v)}
        >
          {held ? (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M8 5v14l11-7z" /></svg>
              다시 흐르게
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="13" height="13" aria-hidden="true"><path fill="currentColor" d="M6 5h4v14H6zm8 0h4v14h-4z" /></svg>
              멈춤
            </>
          )}
        </button>
      )}
    </div>
  );
}
