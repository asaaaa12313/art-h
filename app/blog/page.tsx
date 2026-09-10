import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/Breadcrumb';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { getAllPosts, BLOG_URL, INSTAGRAM_URL } from '@/lib/blog';
import { jsonLdScript } from '@/lib/jsonld';
import { SITE } from '@/lib/copy';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

export const metadata: Metadata = {
  alternates: { canonical: '/blog' },
  title: '치과 이야기',
  description:
    '아트에이치치과가 쓰는 치과 이야기. 임플란트·사랑니·신경치료·턱관절·의식하진정 등 진료실에서 자주 받는 질문을 구강악안면외과 전문의가 정리했습니다.',
};

export default function BlogListPage() {
  const posts = getAllPosts();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        // 화면에 그린 경로(홈 › 치과 이야기)를 기계도 읽을 수 있게 같은 내용으로 선언한다
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '치과 이야기', item: `${SITE_URL}/blog` },
        ],
      },
      {
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog`,
        url: `${SITE_URL}/blog`,
        name: `${SITE.name} 치과 이야기`,
        inLanguage: 'ko',
        publisher: { '@id': `${SITE_URL}#clinic` },
        blogPost: posts.slice(0, 20).map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${encodeURIComponent(p.slug)}`,
      datePublished: p.date,
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHeader
        title="치과 이야기"
        src="/media/images/still/consult-tablet.jpg"
        alt="상담실에서 치료 계획을 설명하는 모습"
      />

      <article className="bl">
        <Breadcrumb items={[{ label: '홈', href: '/' }, { label: '치과 이야기' }]} />

        <Reveal variant="fade">
          <p className="blLead">
            진료실에서 자주 받는 질문과 치료 전후에 알아 두시면 좋은 내용을 정리했습니다.
            모든 글은 아트에이치치과가 직접 쓰고, 네이버 블로그에도 함께 올립니다.
          </p>
        </Reveal>

        <ul className="blList">
          {posts.map((p, i) => (
            <Reveal key={p.slug} as="li" variant="fold" delay={0.04 * (i % 6)} duration="0.85s" style={{ height: '100%' }}>
              <Link href={`/blog/${encodeURIComponent(p.slug)}`} className="blCard">
                <span className="blThumb">
                  {p.thumb ? (
                    <Image src={p.thumb} alt="" fill sizes="(max-width: 900px) 100vw, 400px" style={{ objectFit: 'cover' }} />
                  ) : (
                    <span className="blThumbEmpty" aria-hidden="true">Art H</span>
                  )}
                </span>
                <span className="blDate">{p.date}</span>
                <strong className="blTitle">{p.title}</strong>
                <span className="blSummary">{p.summary}</span>
              </Link>
            </Reveal>
          ))}
        </ul>

        <div className="blOut">
          <a href={BLOG_URL} target="_blank" rel="noopener noreferrer">네이버 블로그에서 보기 →</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">인스타그램 →</a>
        </div>
      </article>

      <style>{`
        .bl { max-width: 1300px; margin: 0 auto; padding: clamp(52px,6vw,80px) clamp(20px,3vw,50px) clamp(80px,9vw,120px); }
        .blLead { max-width: 860px; margin: 0 0 clamp(36px,4vw,52px); font-size: 16.5px; line-height: 1.95; color: var(--c-text2); word-break: keep-all; }
        .blList { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: clamp(18px,2.4vw,30px); }
        .blCard { height: 100%; display: grid; grid-template-rows: auto auto auto 1fr; gap: 9px; padding-bottom: 22px; border-bottom: 1px solid var(--c-line); text-decoration: none; transition: border-color .3s ease; }
        .blThumb { position: relative; display: block; aspect-ratio: 4/3; border-radius: 8px; overflow: hidden; background: var(--c-warm); margin-bottom: 6px; }
        .blThumb img { transition: transform .7s var(--ease-out); }
        .blThumbEmpty { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-family: var(--f-display); font-size: 22px; color: var(--c-navy-l); }
        .blDate { font-family: var(--f-display); font-size: 13px; letter-spacing: .08em; color: var(--c-accent-sub); }
        .blTitle { font-size: 18px; font-weight: 700; line-height: 1.5; letter-spacing: -.02em; color: var(--c-text); word-break: keep-all;
          display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .blSummary { font-size: 15.5px; line-height: 1.8; color: var(--c-text2); word-break: keep-all;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        @media (hover: hover) {
          .blCard:hover { border-color: var(--c-accent-t); }
          .blCard:hover .blThumb img { transform: scale(1.05); }
        }
        .blOut { display: flex; flex-wrap: wrap; gap: 18px; margin-top: clamp(44px,5vw,64px); }
        .blOut a { font-size: 15px; font-weight: 700; color: var(--c-accent-t); border-bottom: 1px solid var(--c-line); padding-bottom: 3px; }
        .blOut a:hover { border-bottom-color: var(--c-accent-t); }
        @media (max-width: 1000px) { .blList { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (max-width: 640px) { .blList { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
