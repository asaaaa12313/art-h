'use client';

import { useEffect, useState } from 'react';
import Photo from './Photo';
import styles from './PageHeader.module.css';

type Props = { title: string; bg: string; alt?: string };

export default function PageHeader({ title, bg, alt }: Props) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(false);
    const id = window.setTimeout(() => setLoaded(true), 80);
    return () => window.clearTimeout(id);
  }, [title]);

  return (
    <section className={styles.wrap}>
      <Photo bg={bg} alt={alt || title} style={{ position: 'absolute', inset: 0 }} />
      <div className={styles.overlay} aria-hidden="true" />
      <div className={styles.content}>
        <h1
          className={styles.title}
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? 'none' : 'translateY(24px)',
          }}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
