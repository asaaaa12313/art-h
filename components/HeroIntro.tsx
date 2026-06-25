'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './HeroIntro.module.css';

export type IntroPhoto = { src: string; alt: string; objectPosition?: string };

type Props = {
  photos: IntroPhoto[];
  perSlide?: number; // 사진 1장당 노출 시간(ms)
  onComplete?: () => void; // 마지막 사진 후 영상으로 넘길 때
};

// 메인 히어로 사진 인트로 — 사진 N장을 줌(Ken Burns)+크로스페이드로 보여준 뒤 영상으로 전환.
// reduced-motion: 첫 사진만 정적 표시(전환·영상 진입 없음).
export default function HeroIntro({ photos, perSlide = 2500, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const done = useRef(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return; // 첫 사진 고정
    }
    let t: number;
    if (idx < photos.length - 1) {
      t = window.setTimeout(() => setIdx((i) => i + 1), perSlide);
    } else {
      t = window.setTimeout(() => {
        if (done.current) return;
        done.current = true;
        setFading(true); // 영상 위로 페이드아웃
        onComplete?.();
      }, perSlide);
    }
    return () => window.clearTimeout(t);
  }, [idx, photos.length, perSlide, onComplete]);

  return (
    <div className={styles.wrap} data-fading={fading} aria-hidden={fading ? 'true' : undefined}>
      {photos.map((p, i) => (
        <div key={p.src} className={styles.slide} data-on={i === idx ? 'true' : 'false'}>
          {/* 일반 img — SSR HTML에 직접 jpg가 박혀 즉시 페인트(최적화 경유 지연 없음). 히어로 첫인상 회색 깜빡임 방지 */}
          <img
            src={p.src}
            alt={p.alt}
            loading={i === 0 ? 'eager' : 'lazy'}
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.objectPosition || 'center' }}
          />
        </div>
      ))}
    </div>
  );
}
