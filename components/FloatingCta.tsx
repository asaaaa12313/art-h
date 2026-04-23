'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/lib/copy';
import styles from './FloatingCta.module.css';

const PLACE_URL =
  process.env.NEXT_PUBLIC_NAVER_PLACE_URL || 'https://naver.me/GWW5jD4j';

export default function FloatingCta() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 200);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneHref = `tel:${SITE.phone.replace(/-/g, '')}`;

  return (
    <aside
      className={styles.wrap}
      data-visible={scrolled}
      aria-label="빠른 연락"
    >
      <a
        href={phoneHref}
        className={`${styles.btn} ${styles.primary}`}
        aria-label="전화하기"
      >
        <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
          <path
            fill="currentColor"
            d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.57.57 1 1 0 011 1v3.45a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.24 1.05z"
          />
        </svg>
        <span className={styles.label}>전화하기</span>
      </a>

      <a
        href={PLACE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${styles.btn} ${styles.place}`}
        aria-label="네이버 플레이스 바로가기"
      >
        <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
          <path
            fill="currentColor"
            d="M19 4H5a1 1 0 00-1 1v14a1 1 0 001 1h7v-7h-2v-2h2V9.5A2.5 2.5 0 0114.5 7H17v2h-2a.5.5 0 00-.5.5V11h2.5l-.5 2h-2v7h4a1 1 0 001-1V5a1 1 0 00-1-1z"
          />
        </svg>
        <span className={styles.label}>플레이스</span>
      </a>

      <button
        type="button"
        onClick={scrollTop}
        className={`${styles.btn} ${styles.top}`}
        aria-label="맨 위로"
      >
        <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
          <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg>
        <span className={styles.label}>TOP</span>
      </button>
    </aside>
  );
}
