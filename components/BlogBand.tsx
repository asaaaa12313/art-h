import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';
import TextReveal from './TextReveal';
import { BLOG_URL, INSTAGRAM_URL } from '@/lib/channels';
import type { BlogPost } from '@/lib/blog';
import styles from './BlogBand.module.css';

/**
 * 소식 구역 — 네이버 블로그 최신 글과 SNS 링크.
 *
 * 블로그에 글을 올리면 여기에 저절로 뜬다(원장님이 홈페이지를 손댈 필요가 없다).
 * 네이버가 응답하지 않아 글이 하나도 없으면 목록은 빼고 링크 두 개만 남긴다 —
 * 빈 카드가 늘어선 화면을 보여 주지 않기 위해서다.
 */
export default function BlogBand({ posts }: { posts: BlogPost[] }) {
  return (
    <section className={styles.band}>
      <div className={styles.inner}>
        <Reveal variant="fade">
          <span className={styles.label}>ART H JOURNAL</span>
        </Reveal>
        <TextReveal as="h2" className={styles.title} lines={['치과 이야기를 먼저 나눕니다']} delay={0.05} mode="char" />
        <Reveal variant="fade" delay={0.14}>
          <p className={styles.lead}>
            진료실에서 자주 받는 질문과 치료 전후에 알아 두시면 좋은 내용을 블로그에 정리하고 있습니다.
          </p>
        </Reveal>

        {posts.length > 0 && (
          <ul className={styles.list}>
            {posts.map((p, i) => (
              <Reveal key={p.link} as="li" variant="fold" delay={0.1 + i * 0.09} duration="0.9s" style={{ height: '100%' }}>
                <Link href={`/blog/${encodeURIComponent(p.slug)}`} className={styles.card} aria-label={`${p.title} 읽기`}>
                  <span className={styles.thumb}>
                    {p.thumb ? (
                      <Image src={p.thumb} alt="" fill sizes="(max-width: 900px) 100vw, 420px" style={{ objectFit: 'cover' }} />
                    ) : (
                      <span className={styles.thumbEmpty} aria-hidden="true">Art H</span>
                    )}
                  </span>
                  <span className={styles.date}>{p.date}</span>
                  <strong className={styles.cardTitle}>{p.title}</strong>
                  <span className={styles.summary}>{p.summary}</span>
                  <span className={styles.more} aria-hidden="true">글 보기 →</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal variant="fade" delay={0.3}>
          <div className={styles.links}>
            <Link href="/blog" className={styles.linkAll}>
              글 전체 보기
              <em aria-hidden="true">→</em>
            </Link>
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className={styles.linkBlog}>
              <span className={styles.badgeN} aria-hidden="true">N</span>
              네이버 블로그
              <em aria-hidden="true">→</em>
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={styles.linkInsta}>
              <span className={styles.badgeI} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
                  <circle cx="17.2" cy="6.8" r="1.3" fill="currentColor" />
                </svg>
              </span>
              인스타그램
              <em aria-hidden="true">→</em>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
