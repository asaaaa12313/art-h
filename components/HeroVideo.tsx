'use client';

import { CSSProperties, useEffect, useState } from 'react';
import styles from './HeroVideo.module.css';

type Props = {
  srcMp4: string;
  srcWebm?: string;
  srcMobileMp4?: string;
  poster: string;
  alt?: string;
  style?: CSSProperties;
};

export default function HeroVideo({
  srcMp4,
  srcWebm,
  srcMobileMp4,
  poster,
  alt = '아트에이치치과 소개 영상',
  style,
}: Props) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  if (prefersReducedMotion) {
    return (
      <div className={styles.wrap} style={style} role="img" aria-label={alt}>
        <img src={poster} alt={alt} className={styles.poster} />
      </div>
    );
  }

  return (
    <div className={styles.wrap} style={style}>
      <video
        className={styles.video}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={poster}
        aria-label={alt}
      >
        {isMobile && srcMobileMp4 && <source src={srcMobileMp4} type="video/mp4" />}
        {srcWebm && <source src={srcWebm} type="video/webm" />}
        <source src={srcMp4} type="video/mp4" />
      </video>
    </div>
  );
}
