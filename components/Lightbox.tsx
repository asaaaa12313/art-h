'use client';

import { useEffect } from 'react';
import styles from './Lightbox.module.css';

export type LightboxImage = { src: string; alt: string; caption?: string };

type Props = {
  images: LightboxImage[];
  open: boolean;
  index: number;
  title?: string;
  onClose: () => void;
  onChange: (next: number) => void;
};

export default function Lightbox({ images, open, index, title, onClose, onChange }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') onChange((index - 1 + images.length) % images.length);
      else if (e.key === 'ArrowRight') onChange((index + 1) % images.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, index, images.length, onClose, onChange]);

  if (!open || images.length === 0) return null;
  const cur = images[index];

  return (
    <div className={styles.wrap} role="dialog" aria-modal="true" aria-label={title || '갤러리'} onClick={onClose}>
      <header className={styles.header} onClick={(e) => e.stopPropagation()}>
        <div>
          {title && <p className={styles.title}>{title}</p>}
          <p className={styles.counter}>{index + 1} / {images.length}</p>
        </div>
        <button className={styles.closeBtn} onClick={onClose} aria-label="닫기" type="button">
          <svg viewBox="0 0 24 24" width="22" height="22"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
        </button>
      </header>

      <div className={styles.stage} onClick={(e) => e.stopPropagation()}>
        <button
          className={`${styles.navBtn} ${styles.prev}`}
          onClick={() => onChange((index - 1 + images.length) % images.length)}
          aria-label="이전 사진"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6z"/></svg>
        </button>

        <figure className={styles.frame}>
          <img src={cur.src} alt={cur.alt} />
          {cur.caption && <figcaption>{cur.caption}</figcaption>}
        </figure>

        <button
          className={`${styles.navBtn} ${styles.next}`}
          onClick={() => onChange((index + 1) % images.length)}
          aria-label="다음 사진"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="26" height="26"><path fill="currentColor" d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6z"/></svg>
        </button>
      </div>

      <div className={styles.thumbs} onClick={(e) => e.stopPropagation()}>
        {images.map((img, i) => (
          <button
            key={img.src}
            className={styles.thumb}
            data-active={i === index}
            onClick={() => onChange(i)}
            aria-label={`${i + 1}번 사진으로 이동`}
            type="button"
          >
            <img src={img.src} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
}
