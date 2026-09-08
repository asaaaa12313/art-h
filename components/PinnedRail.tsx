'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './PinnedRail.module.css';

type Props = {
  children: React.ReactNode;
  /** 카드 장수 — 이동 거리를 계산할 때만 쓴다 */
  count: number;
  className?: string;
  /** 스크린리더·키보드 안내용 이름 */
  label: string;
};

/**
 * 가로로 흘러가는 고정 갤러리 — 레퍼런스(하늘리더스)의 진료과목 구간과 같은 구조.
 *
 * 세로로 스크롤하면 화면이 그 자리에 붙어 있고(pin) 카드가 옆으로 흐른다.
 * 스크롤 양을 그대로 가로 이동에 쓰기 때문에 사용자가 속도를 쥐고 있고,
 * 손을 멈추면 화면도 멈춘다 — 자동 재생 슬라이더와 달리 끊기는 느낌이 없다.
 *
 * 좁은 화면과 「동작 줄이기」를 켠 환경에서는 고정을 걸지 않는다.
 * 대신 손가락으로 미는 가로 스크롤(스냅)로 떨어뜨린다 — 같은 내용을 같은 순서로 볼 수 있다.
 */
export default function PinnedRail({ children, count, className, label }: Props) {
  const secRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);
  const [pinned, setPinned] = useState(false);
  const [progress, setProgress] = useState(0);

  // 이동 거리 = 카드 줄 전체 폭 − 화면 폭. 화면이 바뀔 때마다 다시 잰다.
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const wide = window.matchMedia('(min-width: 1024px)').matches;
      const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (!wide || still) {
        setPinned(false);
        setTravel(0);
        return;
      }
      setPinned(true);
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener('resize', measure);
    const t = window.setTimeout(measure, 600); // 사진이 자리를 잡은 뒤 한 번 더
    return () => {
      window.removeEventListener('resize', measure);
      window.clearTimeout(t);
    };
  }, [count]);

  useEffect(() => {
    if (!pinned || travel <= 0) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        const el = secRef.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        // 구간 안에서 얼마나 왔는지 0~1
        const total = el.offsetHeight - window.innerHeight;
        const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [pinned, travel]);

  const height = pinned && travel > 0 ? `calc(100vh + ${travel}px)` : undefined;

  return (
    <div
      ref={secRef}
      className={`${styles.section} ${className || ''}`}
      style={height ? { height } : undefined}
      data-pinned={pinned && travel > 0}
    >
      <div className={styles.sticky}>
        <div
          ref={trackRef}
          className={styles.track}
          style={pinned && travel > 0 ? { transform: `translate3d(${-progress * travel}px,0,0)` } : undefined}
          role="group"
          aria-label={label}
        >
          {children}
        </div>
        {pinned && travel > 0 && (
          <div className={styles.progress} aria-hidden="true">
            <span style={{ transform: `scaleX(${Math.max(0.04, progress)})` }} />
          </div>
        )}
      </div>
    </div>
  );
}
