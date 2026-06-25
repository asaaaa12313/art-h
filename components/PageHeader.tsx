'use client';

import { useEffect, useState } from 'react';
import Photo from './Photo';
import styles from './PageHeader.module.css';

type Props = { title: string; bg?: string; src?: string; alt?: string; objectPosition?: string };

export default function PageHeader({ title, bg, src, alt, objectPosition }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setLoaded(false);
    const id = window.setTimeout(() => setLoaded(true), 80);
    // reduced-motion: 패럴랙스 비활성 (배경 고정)
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return () => window.clearTimeout(id);
    }
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setOffset(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.clearTimeout(id);
      window.removeEventListener('scroll', on);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [title]);

  return (
    <section className={styles.wrap}>
      <div className={styles.bg} style={{ transform: `translateY(${offset * 0.1}px)` }}>
        <div className={styles.bgInner}>
          <Photo
            bg={bg}
            src={src}
            alt={alt || title}
            style={{ position: 'absolute', inset: 0 }}
            priority
            sizes="100vw"
            objectPosition={objectPosition}
          />
        </div>
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={styles.title}>
          <span className={styles.titleMask}>
            <span className={styles.titleInner} style={{ transform: loaded ? 'none' : 'translateY(110%)' }}>
              {title}
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
