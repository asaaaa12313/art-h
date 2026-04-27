'use client';

import { CSSProperties, useEffect, useRef, useState } from 'react';
import styles from './HeroVideo.module.css';

export type VideoSource = {
  mp4: string;
  mp4Mobile?: string;
  webm?: string;
};

type Props = {
  videos: VideoSource[];
  poster: string;
  alt?: string;
  style?: CSSProperties;
  onIndexChange?: (index: number) => void;
};

export default function HeroVideo({ videos, poster, alt = '아트에이치치과 소개 영상', style, onIndexChange }: Props) {
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    setPrefersReducedMotion(motionQuery.matches);
    setIsMobile(mobileQuery.matches);

    const onMotion = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    const onMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    motionQuery.addEventListener('change', onMotion);
    mobileQuery.addEventListener('change', onMobile);
    return () => {
      motionQuery.removeEventListener('change', onMotion);
      mobileQuery.removeEventListener('change', onMobile);
    };
  }, []);

  // index 변경 시 비디오 리로드 + 재생
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    setReady(false);
    v.load();
    const tryPlay = () => {
      setReady(true);
      const p = v.play();
      if (p && typeof p.catch === 'function') {
        p.catch(() => {
          // autoplay 정책에 막히면 재시도 (muted라 보통은 OK)
          setTimeout(() => v.play().catch(() => {}), 100);
        });
      }
    };
    v.addEventListener('canplay', tryPlay, { once: true });
    v.addEventListener('loadeddata', tryPlay, { once: true });
    return () => {
      v.removeEventListener('canplay', tryPlay);
      v.removeEventListener('loadeddata', tryPlay);
    };
  }, [index, isMobile]);

  const handleEnded = () => {
    setIndex((prev) => {
      const next = (prev + 1) % videos.length;
      onIndexChange?.(next);
      return next;
    });
  };

  if (prefersReducedMotion) {
    return (
      <div className={styles.wrap} style={style} role="img" aria-label={alt}>
        <img src={poster} alt={alt} className={styles.poster} />
      </div>
    );
  }

  const current = videos[index];
  const nextMp4 = videos[(index + 1) % videos.length]?.mp4;

  return (
    <div className={styles.wrap} style={style}>
      <video
        ref={videoRef}
        className={styles.video}
        data-ready={ready}
        autoPlay
        muted
        playsInline
        loop={false}
        preload="auto"
        poster={poster}
        onEnded={handleEnded}
        aria-label={alt}
      >
        {isMobile && current.mp4Mobile && <source src={current.mp4Mobile} type="video/mp4" />}
        {current.webm && <source src={current.webm} type="video/webm" />}
        <source src={current.mp4} type="video/mp4" />
      </video>
      {/* 다음 영상 preload 힌트 */}
      {nextMp4 && <link rel="preload" as="video" href={nextMp4} />}
    </div>
  );
}
