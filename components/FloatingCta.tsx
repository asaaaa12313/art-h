'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/copy';
import { BLOG_URL, INSTAGRAM_URL } from '@/lib/channels';
import styles from './FloatingCta.module.css';

// 네이버 예약 URL 우선, 없으면 플레이스로 폴백
const BOOKING_URL =
  process.env.NEXT_PUBLIC_BOOKING_URL ||
  process.env.NEXT_PUBLIC_NAVER_PLACE_URL ||
  'https://naver.me/GWW5jD4j';

// 카카오톡 채널은 아직 개설 전이다. 주소가 생기면 이 환경변수만 채우면 레일에 항목이 붙는다.
const KAKAO_URL = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL || '';

// 플로팅 상담 레일 (2026-09 개편 — 레퍼런스 실측 형태)
// 데스크톱: 우측 고정 파란 상자 — 폭 68px·아이콘 26px, 흰 아이콘만 세로로 쌓고
//   맨 아래 전화 칸에는 번호를 세로 3줄로 적는다(누르지 않아도 번호가 읽힌다).
//   아이콘만으로 뜻이 안 잡히는 이용자를 위해 이름은 hover·focus에서 왼쪽으로 펼친다.
//   TOP은 상자 밖 흰 원형 버튼(레퍼런스와 같은 위치).
// 모바일(<960): 하단 고정 바 3열 — 엄지 도달 거리 최우선.
export default function FloatingCta() {
  const [pastHero, setPastHero] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [hoursOpen, setHoursOpen] = useState(false);

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
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.railBtn}
            aria-label="네이버 예약 (새 창)"
          >
            <span className={styles.naverBadge} aria-hidden="true">N</span>
            <span className={styles.railLabel}>네이버예약</span>
          </a>

          {KAKAO_URL && (
            <a
              href={KAKAO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.railBtn}
              aria-label="카카오톡 상담 (새 창)"
            >
              <span className={styles.kakaoBadge} aria-hidden="true">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M12 3C6.99 3 3 6.2 3 10.15c0 2.53 1.68 4.75 4.2 6.02l-.98 3.6c-.09.32.27.58.55.4l4.3-2.84c.3.02.61.03.93.03 5.01 0 9-3.2 9-7.21S17.01 3 12 3z"
                  />
                </svg>
              </span>
              <span className={styles.railLabel}>카톡상담</span>
            </a>
          )}

          <a
            href={BLOG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.railBtn}
            aria-label="네이버 블로그 (새 창)"
          >
            <span className={styles.blogBadge} aria-hidden="true">blog</span>
            <span className={styles.railLabel}>블로그</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.railBtn}
            aria-label="인스타그램 (새 창)"
          >
            <span className={styles.instaBadge} aria-hidden="true">
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5.4" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="17.3" cy="6.7" r="1.35" fill="currentColor" />
              </svg>
            </span>
            <span className={styles.railLabel}>인스타</span>
          </a>

          {/* 진료시간 — hover로도 열리지만, 터치·키보드에서는 hover가 없으므로 상태로도 연다 */}
          {/* 목록을 버튼 안에 넣으면 무효 마크업이 된다 — 팝오버는 형제로 두고 감싸는 층에서 hover를 받는다 */}
          <div className={styles.railSlot} onMouseLeave={() => setHoursOpen(false)}>
            <button
              type="button"
              className={styles.railBtn}
              aria-expanded={hoursOpen}
              aria-label="진료시간 보기"
              onClick={() => setHoursOpen((v) => !v)}
              onMouseEnter={() => setHoursOpen(true)}
              onFocus={() => setHoursOpen(true)}
            >
              <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm.5-13H11v6l5.2 3.1.8-1.3-4.5-2.7z"
                />
              </svg>
              <span className={styles.railLabel}>진료시간</span>
            </button>
            <div className={styles.railHours} data-open={hoursOpen} role="note">
              <strong>진료시간</strong>
              <dl>
                {SITE.hours.map((h) => (
                  <div key={h.day} data-hl={h.highlight}>
                    <dt>{h.day}</dt>
                    <dd>{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <Link href="/location" className={styles.railBtn} aria-label="오시는길">
            <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
              <path
                fill="currentColor"
                d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"
              />
            </svg>
            <span className={styles.railLabel}>오시는길</span>
          </Link>

          {/* 전화 — 레퍼런스처럼 번호를 세로로 적는다 */}
          <a
            href={phoneHref}
            className={`${styles.railBtn} ${styles.railPrimary}`}
            aria-label={`전화하기 ${SITE.phone}`}
          >
            {phoneIcon}
            <span className={styles.railPhoneNum} aria-hidden="true">
              {SITE.phone.split('-').map((seg) => (
                <span key={seg}>{seg}</span>
              ))}
            </span>
          </a>
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
        </button>
      </aside>

      {/* 모바일 — 하단 고정 바 */}
      <nav className={styles.bar} aria-label="빠른 상담">
        <a href={phoneHref} className={`${styles.barBtn} ${styles.barPrimary}`}>
          {phoneIcon}
          전화상담
        </a>
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.barBtn}
          aria-label="네이버 예약 (새 창)"
        >
          <span className={styles.naverBadge} aria-hidden="true">N</span>
          네이버예약
        </a>
        <Link href="/location" className={styles.barBtn} aria-label="오시는길">
          <svg viewBox="0 0 24 24" className={styles.icon} aria-hidden="true">
            <path
              fill="currentColor"
              d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z"
            />
          </svg>
          오시는길
        </Link>
      </nav>
    </>
  );
}
