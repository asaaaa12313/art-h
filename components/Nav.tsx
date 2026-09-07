'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV_ABOUT_ITEMS, NAV_TREATMENT_ITEMS } from '@/lib/copy';
import { LOCALES, LOCALE_LABEL, LOCALE_HTML_LANG } from '@/lib/i18n';

import styles from './Nav.module.css';

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
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
      {/* 윗줄 — 로고와 병원 성격을 먼저 보여 준다(레퍼런스 구조) */}
      <div className={styles.topRow}>
        <div className={styles.topInner}>
          <Link href="/" className={styles.brand} aria-label="Art H Dental 홈">
            <span className={styles.brandMark} aria-hidden="true">
              <svg viewBox="0 0 64 64" width="52" height="52">
                <circle cx="32" cy="32" r="29" fill="none" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M32 17c-7 0-12 5-12 11 0 7 5 11 12 18 7-7 12-11 12-18 0-6-5-11-12-11z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </span>
            <span className={styles.brandText}>Art H</span>
          </Link>

          <p className={styles.tagline}>
            <em>Before Treatment</em>
            마음이 편안해진 뒤에,
            <br />
            진료를 시작하는 아트에이치치과
          </p>

          <div className={styles.langWrap} onMouseLeave={() => setLangOpen(false)}>
            <button
              type="button"
              className={styles.langBtn}
              aria-expanded={langOpen}
              aria-haspopup="true"
              onClick={() => setLangOpen((v) => !v)}
              onMouseEnter={() => setLangOpen(true)}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 100 20 10 10 0 000-20zm6.9 6h-2.6a15.6 15.6 0 00-1.4-3.6A8 8 0 0118.9 8zM12 4c.7 1 1.3 2.4 1.7 4h-3.4C10.7 6.4 11.3 5 12 4zM4.3 14a8 8 0 010-4h3a18 18 0 000 4zm.8 2h2.6c.3 1.3.8 2.5 1.4 3.6A8 8 0 015.1 16zm2.6-8H5.1a8 8 0 013.9-3.6A15.6 15.6 0 007.7 8zM12 20c-.7-1-1.3-2.4-1.7-4h3.4c-.4 1.6-1 3-1.7 4zm2.1-6H9.9a16 16 0 010-4h4.2a16 16 0 010 4zm.5 5.6c.6-1.1 1-2.3 1.4-3.6h2.6a8 8 0 01-4 3.6zM16.3 14a18 18 0 000-4h3a8 8 0 010 4z"
                />
              </svg>
              <span>한국어</span>
              <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" data-open={langOpen}>
                <path fill="currentColor" d="M7.4 9.6 12 14.2l4.6-4.6L18 11l-6 6-6-6z" />
              </svg>
            </button>
            {langOpen && (
              <div className={styles.langMenu} role="menu">
                <Link href="/" hrefLang="ko" role="menuitem" data-on="true" onClick={() => setLangOpen(false)}>
                  한국어
                </Link>
                {LOCALES.map((l) => (
                  <Link
                    key={l}
                    href={`/${l}`}
                    hrefLang={LOCALE_HTML_LANG[l]}
                    role="menuitem"
                    onClick={() => setLangOpen(false)}
                  >
                    {LOCALE_LABEL[l]}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 아랫줄 — 메뉴 */}
      <div className={styles.inner}>
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
            <div className={styles.overlayLang}>
              <Link href="/" hrefLang="ko" onClick={() => setOpen(false)} data-on="true">한국어</Link>
              {LOCALES.map((l) => (
                <Link key={l} href={`/${l}`} hrefLang={LOCALE_HTML_LANG[l]} onClick={() => setOpen(false)}>
                  {LOCALE_LABEL[l]}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
