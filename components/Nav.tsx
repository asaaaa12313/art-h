'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV_ITEMS } from '@/lib/copy';
import styles from './Nav.module.css';

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const show = scrolled || !isHome;

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
          {NAV_ITEMS.map((m) => {
            const active =
              m.href === '/' ? pathname === '/' : pathname.startsWith(m.href);
            return (
              <Link
                key={m.href}
                href={m.href}
                className={styles.link}
                data-active={active ? 'true' : 'false'}
              >
                {m.label}
              </Link>
            );
          })}
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
        <div className={styles.overlay} role="menu">
          {NAV_ITEMS.map((m) => (
            <Link
              key={m.href}
              href={m.href}
              role="menuitem"
              className={styles.overlayLink}
            >
              {m.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
