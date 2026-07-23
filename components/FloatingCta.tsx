'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/copy';
import styles from './FloatingCta.module.css';

// 네이버 예약 URL 우선, 없으면 플레이스로 폴백
const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  process.env.NEXT_PUBLIC_NAVER_PLACE_URL ||
  'https://naver.me/GWW5jD4j';

// 플로팅 상담 레일 (plan-design-refresh P1)
// 데스크톱: 우측 고정 세로 레일(전화·네이버 예약·오시는길 + TOP) — 잉크 네이비 바탕.
// 모바일: 하단 고정 바(전화·네이버 예약 2버튼) — 엄지 도달 거리 최우선.
// 항상 노출하되 히어로 구간에서는 반투명, 본문부터 불투명.
export default function FloatingCta() {
  const [pastHero, setPastHero] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setPastHero(y > window.innerHeight * 0.72);
      setShowTop(y > 300);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const phoneHref = `tel:${SITE.phone.replace(/-/g, '')}`;

  const phoneIcon = (
    <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24 11.36 11.36 0 003.57.57 1 1 0 011 1v3.45a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1 11.36 11.36 0 00.57 3.57 1 1 0 01-.24 1.05z"
      />
    </svg>
  );

  return (
    <>
      {/* 데스크톱 — 우측 세로 레일 */}
      <aside className={styles.rail} data-solid={pastHero} aria-label="빠른 상담">
        <div className={styles.railBox}>
          <a href={phoneHref} className={styles.railBtn} aria-label={`전화하기 ${SITE.phone}`}>
            {phoneIcon}
            <span className={styles.railLabel}>전화하기</span>
            <span className={styles.railPhone} aria-hidden="true">{SITE.phone}</span>
          </a>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.railBtn}
            aria-label="네이버 예약 (새 창)"
          >
            <span className={styles.naverBadge} aria-hidden="true">N</span>
            <span className={styles.railLabel}>네이버 예약</span>
          </a>
          <Link href="/location" className={styles.railBtn} aria-label="오시는길">
            <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"
              />
            </svg>
            <span className={styles.railLabel}>오시는길</span>
          </Link>
        </div>
        <button
          type="button"
          onClick={scrollTop}
          className={styles.railTop}
          data-visible={showTop}
          aria-label="맨 위로"
          tabIndex={showTop ? 0 : -1}
        >
          <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
            <path fill="currentColor" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
          </svg>
          <span className={styles.railLabel}>TOP</span>
        </button>
      </aside>

      {/* 모바일 — 하단 고정 바 */}
      <nav className={styles.bar} aria-label="빠른 상담">
        <a href={phoneHref} className={styles.barBtn}>
          {phoneIcon}
          전화하기
        </a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.barBtn} ${styles.barNaver}`}
          aria-label="네이버 예약 (새 창)"
        >
          <span className={styles.naverBadge} aria-hidden="true">N</span>
          네이버 예약
        </a>
      </nav>
    </>
  );
}
