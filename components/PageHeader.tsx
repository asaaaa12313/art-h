'use client';

import { useEffect, useState } from 'react';
import Photo from './Photo';
import styles from './PageHeader.module.css';

type Props = {
  title: string;
  bg?: string;
  src?: string;
  alt?: string;
  objectPosition?: string;
  /** 제목 띠를 어떤 태그로 그릴지.
   *  기본 h1 — 대부분의 페이지에서 이 띠의 글자가 곧 페이지 제목이다.
   *  글 상세처럼 본문에 진짜 제목(h1)이 따로 있는 페이지는 'p'로 낮춘다
   *  (h1이 두 개면 검색엔진이 어느 쪽이 이 페이지의 주제인지 판단하지 못한다). */
  titleAs?: 'h1' | 'p';
};

/**
 * 하위 페이지 머리 — 레퍼런스와 같은 구조.
 * 위: 글자를 얹지 않은 사진 띠(들어오는 순간 아주 천천히 당겨진다),
 * 아래: 남색 띠 한 줄에 페이지 이름을 가운데 흰 글씨로.
 *
 * 사진 위에 제목을 얹지 않기 때문에 사진을 어둡게 덮을 필요가 없다 —
 * 촬영본이 그대로 보이고, 제목은 남색 띠에서 대비 12:1로 읽힌다.
 */
export default function PageHeader({ title, bg, src, alt, objectPosition, titleAs = 'h1' }: Props) {
  const TitleTag = titleAs;
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
      <div className={styles.band}>
        <div className={styles.bg} style={{ transform: `translateY(${offset * 0.12}px)` }}>
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
        <div className={styles.veil} aria-hidden="true" />
      </div>

      <div className={styles.bar}>
        <TitleTag className={styles.title}>
          <span className={styles.titleMask}>
            <span className={styles.titleInner} style={{ transform: loaded ? 'none' : 'translateY(110%)' }}>
              {title}
            </span>
          </span>
        </TitleTag>
      </div>
    </section>
  );
}
