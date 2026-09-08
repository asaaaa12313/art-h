import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import { getAllPosts, getPost, getOtherPosts, BLOG_URL } from '@/lib/blog';

/** 주소가 잘못 인코딩돼 있으면(예: /blog/%%%) decodeURIComponent가 오류를 던져 500이 된다.
 *  그런 주소는 그냥 없는 글로 취급한다. */
function safeDecode(v: string): string {
  try { return decodeURIComponent(v); } catch { return v; }
}
import { jsonLdScript } from '@/lib/jsonld';
import { SITE } from '@/lib/copy';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(safeDecode(slug));
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary.slice(0, 150),
    alternates: { canonical: `/blog/${encodeURIComponent(post.slug)}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary.slice(0, 150),
      publishedTime: post.date,
      images: post.thumb ? [post.thumb] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(safeDecode(slug));
  if (!post) notFound();

  const others = getOtherPosts(post.slug, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
    headline: post.title,
    description: post.summary.slice(0, 200),
    datePublished: post.date,
    dateModified: post.fetchedAt?.slice(0, 10) || post.date,
    inLanguage: 'ko',
    image: post.thumb,
    // 글쓴이와 발행 주체가 모두 이 병원임을 밝힌다 — AI가 출처를 병원으로 묶는다
    author: { '@id': `${SITE_URL}#clinic` },
    publisher: { '@id': `${SITE_URL}#clinic` },
    mainEntityOfPage: `${SITE_URL}/blog/${encodeURIComponent(post.slug)}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      {/* 머리 사진은 병원 사진으로 고정한다 — 글의 대표 사진은 본문 첫머리에 그대로 나오므로
          같은 그림을 두 번 보여 주지 않기 위해서다 */}
      <PageHeader
        title="치과 이야기"
        src="/media/images/still/consult-tablet.jpg"
        alt="상담실에서 치료 계획을 설명하는 모습"
      />

      <article className="bp">
        <Breadcrumb
          items={[{ label: '홈', href: '/' }, { label: '치과 이야기', href: '/blog' }, { label: post.title }]}
        />

        <Reveal variant="fade">
          <p className="bpDate">{post.date}</p>
        </Reveal>
        <Reveal variant="fade" delay={0.06}>
          <h1 className="bpTitle">{post.title}</h1>
        </Reveal>

        {/* 본문은 수집할 때 허용 태그만 남기고 씻어 둔 것이다(scripts/fetch-blog.mjs) */}
        <div className="bpBody" dangerouslySetInnerHTML={{ __html: post.bodyHtml || '' }} />

        <div className="bpFoot">
          <p className="bpNote">
            이 글은 {SITE.name}가 직접 쓴 글입니다. 증상과 치료 방법은 사람마다 다르므로,
            정확한 진단은 내원 후 검사로 확인하셔야 합니다.
          </p>
          <div className="bpLinks">
            <a href={post.link} target="_blank" rel="noopener noreferrer">네이버 블로그 원문 →</a>
            <a href={BLOG_URL} target="_blank" rel="noopener noreferrer">블로그 전체 글 →</a>
            <Link href="/blog">목록으로</Link>
          </div>
        </div>

        {others.length > 0 && (
          <section className="bpMore" aria-label="다른 글">
            <h2>다른 이야기</h2>
            <ul>
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/blog/${encodeURIComponent(o.slug)}`}>
                    <span className="bpMoreDate">{o.date}</span>
                    <strong>{o.title}</strong>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      <style>{`
        .bp { max-width: 880px; margin: 0 auto; padding: clamp(48px,6vw,76px) clamp(20px,4vw,40px) clamp(80px,9vw,120px); }
        .bpDate { margin: 0 0 12px; font-family: var(--f-display); font-size: 14px; letter-spacing: .08em; color: var(--c-accent-sub); }
        .bpTitle { margin: 0 0 clamp(28px,3.4vw,44px); font-family: var(--f-serif-ko); font-size: clamp(25px,3.2vw,36px);
          font-weight: 400; line-height: 1.45; letter-spacing: -.025em; color: var(--c-text); word-break: keep-all; }

        /* 본문 — 네이버 서식을 걷어내고 우리 글줄 규칙으로 다시 세운다 */
        .bpBody { font-size: 16.5px; line-height: 2.0; color: var(--c-text2); word-break: keep-all; }
        .bpBody p { margin: 0 0 18px; }
        .bpBody h2, .bpBody h3, .bpBody h4 { margin: clamp(34px,4vw,52px) 0 14px; font-family: var(--f-serif-ko);
          font-weight: 400; line-height: 1.5; letter-spacing: -.025em; color: var(--c-text); }
        .bpBody h2 { font-size: clamp(21px,2.4vw,27px); }
        .bpBody h3 { font-size: clamp(19px,2vw,23px); }
        .bpBody h4 { font-size: 18px; }
        .bpBody b, .bpBody strong { color: var(--c-text); font-weight: 700; }
        .bpBody img { display: block; width: 100%; height: auto; margin: clamp(22px,3vw,34px) auto; border-radius: 8px; }
        .bpBody figure { margin: clamp(22px,3vw,34px) 0; }
        .bpBody figcaption { margin-top: 8px; font-size: 14px; color: var(--c-text3); text-align: center; }
        .bpBody ul, .bpBody ol { margin: 0 0 18px; padding-left: 22px; }
        .bpBody li { margin-bottom: 8px; }
        .bpBody blockquote { margin: clamp(22px,3vw,32px) 0; padding: 18px 22px; background: var(--c-warm);
          border-left: 2px solid var(--c-accent-sub); border-radius: 0 4px 4px 0; color: var(--c-text); }
        .bpBody a { color: var(--c-accent-t); border-bottom: 1px solid var(--c-line); }
        .bpBody table { width: 100%; border-collapse: collapse; margin: 24px 0; font-size: 15px; }
        .bpBody th, .bpBody td { padding: 11px 12px; border: 1px solid var(--c-line); text-align: left; }
        .bpBody th { background: var(--c-warm); color: var(--c-text); font-weight: 700; }
        .bpBody hr { margin: clamp(28px,3.4vw,42px) 0; border: 0; border-top: 1px solid var(--c-line); }

        .bpFoot { margin-top: clamp(44px,5vw,64px); padding-top: 26px; border-top: 1px solid var(--c-line); }
        .bpNote { margin: 0 0 18px; font-size: 14.5px; line-height: 1.85; color: var(--c-text3); word-break: keep-all; }
        .bpLinks { display: flex; flex-wrap: wrap; gap: 16px; }
        .bpLinks a { font-size: 15px; font-weight: 700; color: var(--c-accent-t); border-bottom: 1px solid var(--c-line); padding-bottom: 3px; }

        .bpMore { margin-top: clamp(52px,6vw,80px); }
        .bpMore h2 { margin: 0 0 18px; font-family: var(--f-serif-ko); font-size: 21px; font-weight: 400; color: var(--c-text); }
        .bpMore ul { list-style: none; margin: 0; padding: 0; display: grid; gap: 2px; }
        .bpMore a { display: grid; gap: 4px; padding: 16px 0; border-bottom: 1px solid var(--c-line); text-decoration: none; }
        .bpMoreDate { font-family: var(--f-display); font-size: 13px; letter-spacing: .08em; color: var(--c-accent-sub); }
        .bpMore strong { font-size: 16.5px; font-weight: 600; line-height: 1.55; color: var(--c-text); word-break: keep-all; }
        .bpMore a:hover strong { color: var(--c-accent-t); }
      `}</style>
    </>
  );
}
