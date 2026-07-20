'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV_ABOUT_ITEMS, NAV_TREATMENT_ITEMS } from '@/lib/copy';
import BookingLink from '@/components/BookingLink';
import styles from './Nav.module.css';

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  // 터치 기기(아이패드 가로 등)에서는 hover 이벤트로 열지 않음 — 탭(click) 토글만
  const hoverableRef = useRef<boolean | null>(null);
  const canHover = () => {
    if (hoverableRef.current === null) {
      hoverableRef.current =
        typeof window !== 'undefined' &&
        window.matchMedia('(hover: hover)').matches;
    }
    return hoverableRef.current;
  };

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    setOpen(false);
    setAboutOpen(false);
  }, [pathname]);

  const show = scrolled || !isHome;
  const aboutActive = NAV_ABOUT_ITEMS.some((m) => pathname.startsWith(m.href));

  return (
    <nav
      className={styles.nav}
      data-show={show ? 'true' : 'false'}
      aria-label="주요 메뉴"
    >
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} aria-label="Art H Dental 홈">
          <span>Art H</span>
        </Link>

        <div className={styles.desktop}>
          <div
            className={styles.drop}
            onMouseEnter={() => {
              if (canHover()) setAboutOpen(true);
            }}
            onMouseLeave={() => {
              if (canHover()) setAboutOpen(false);
            }}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setAboutOpen(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Escape') setAboutOpen(false);
            }}
          >
            <button
              type="button"
              className={styles.link}
              data-active={aboutActive ? 'true' : 'false'}
              aria-expanded={aboutOpen}
              onClick={() => setAboutOpen((v) => !v)}
            >
              병원소개
              <span className={styles.caret} data-open={aboutOpen ? 'true' : 'false'} aria-hidden="true">▾</span>
            </button>
            {aboutOpen && (
              <div className={styles.dropMenu}>
                {NAV_ABOUT_ITEMS.map((m) => (
                  <Link
                    key={m.href}
                    href={m.href}
                    className={styles.dropLink}
                    data-active={pathname.startsWith(m.href) ? 'true' : 'false'}
                  >
                    {m.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {NAV_TREATMENT_ITEMS.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              className={styles.link}
              data-active={pathname.startsWith(m.href) ? 'true' : 'false'}
            >
              {m.label}
            </Link>
          ))}
        </div>

        <div className={styles.cta}>
          <BookingLink style={{ borderRadius: 2, padding: '9px 16px', fontWeight: 600 }}>네이버 예약</BookingLink>
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span data-open={open ? 'true' : 'false'} />
          <span data-open={open ? 'true' : 'false'} />
        </button>
      </div>

      {open && (
        <div className={styles.overlay}>
          <p className={styles.overlayGroup}>진료과목</p>
          <div className={styles.overlayTxGrid}>
            {NAV_TREATMENT_ITEMS.map((m) => (
              <Link key={m.href} href={m.href} className={styles.overlayTxLink}>
                {m.label}
              </Link>
            ))}
            <Link href="/treatments" className={styles.overlayTxLink} data-all="true">
              전체 보기 →
            </Link>
          </div>
          <p className={styles.overlayGroup}>병원소개</p>
          {NAV_ABOUT_ITEMS.map((m) => (
            <Link key={m.href} href={m.href} className={styles.overlayLink}>
              {m.label}
            </Link>
          ))}
          <div className={styles.overlayCta}>
            <BookingLink style={{ borderRadius: 2, width: '100%', justifyContent: 'center', padding: '14px 18px', fontSize: 14 }}>네이버 예약</BookingLink>
          </div>
        </div>
      )}
    </nav>
  );
}
