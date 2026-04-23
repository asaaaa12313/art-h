'use client';

import { useEffect, useState } from 'react';
import { SITE } from '@/lib/copy';
import styles from './FloatingCta.module.css';

const BOOKING_URL =
  process.env.NEXT_PUBLIC_NAVER_BOOKING_URL || 'https://booking.naver.com/';
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
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
        aria-label="네이버 예약"
      >
        <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
          <path
            fill="currentColor"
            d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"
          />
        </svg>
        <span className={styles.label}>예약하기</span>
      </a>

      <a
        href={PLACE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.btn}
        aria-label="네이버 플레이스 바로가기"
      >
        <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
          <path
            fill="currentColor"
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 010-5 2.5 2.5 0 010 5z"
          />
        </svg>
        <span className={styles.label}>오시는길</span>
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
