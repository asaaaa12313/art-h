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
import { SITE, TREATMENTS } from '@/lib/copy';

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

  // 이 글이 다루는 진료과목 — 우리가 검수해 둔 문답과 안내를 함께 보여 준다.
  // 글 본문에 없는 내용을 지어내지 않으면서도, 네이버 원문에는 없는 우리 페이지만의 정보가 된다.
  const tx = post.topic ? TREATMENTS.find((t) => t.slug === post.topic) : undefined;
  // 문답은 우리가 검수해 둔 과목별 FAQ만 쓴다.
  // 글에서 뽑아 쓰는 방식은 문장이 잘려 뜻이 뒤집히는 사례가 많아 폐기했다(scripts/fetch-blog.mjs 주석).
  const clinicFaqs = tx ? tx.faqs.slice(0, 4) : [];

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

  /* FAQPage 구조화 데이터는 여기서 선언하지 않는다.
     같은 과목 문답이 블로그 글 수십 개에 똑같이 실리면 중복 선언이 되어
     구조화 데이터 스팸으로 걸릴 수 있고, 그러면 사이트 전체 검색 노출이 영향을 받는다.
     이 문답의 정본 선언은 진료 상세 페이지(/treatments/[slug]) 한 곳뿐이다.
     여기서는 읽는 사람을 위해 화면에만 보여 준다. */

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

        {/* 이 글의 핵심 — 글쓴이가 매긴 소제목을 그대로 옮겼다(문장을 새로 쓰지 않는다).
            읽는 사람은 3초 안에 무슨 글인지 알고, AI는 이 목록으로 글의 뼈대를 잡는다. */}
        {post.keyPoints && post.keyPoints.length > 0 && (
          <Reveal variant="fade" delay={0.1}>
            <aside className="bpKey" aria-label="이 글의 핵심">
              <p className="bpKeyLabel">이 글의 핵심</p>
              <ul>
                {post.keyPoints.map((k) => (
                  <li key={k}>{k}</li>
                ))}
              </ul>
            </aside>
          </Reveal>
        )}

        {/* 본문은 수집할 때 허용 태그만 남기고 씻어 둔 것이다(scripts/fetch-blog.mjs) */}
        <div className="bpBody" dangerouslySetInnerHTML={{ __html: post.bodyHtml || '' }} />

        {clinicFaqs.length > 0 && tx && (
          <section className="bpFaq" aria-labelledby="bpFaqTitle">
            <h2 id="bpFaqTitle">{tx.ko} 자주 묻는 질문</h2>
            <dl>
              {clinicFaqs.map((f) => (
                <div key={f.q}>
                  <dt>{f.q}</dt>
                  <dd>{f.a}</dd>
                </div>
              ))}
            </dl>
            <p className="bpFaqNote">
              {SITE.name}가 진료실에서 실제로 자주 받는 질문을 정리한 것입니다.
              증상과 치료 방법은 사람마다 다르므로 정확한 안내는 내원 상담 후 드립니다.
            </p>
          </section>
        )}

        {tx && (
          <section className="bpRelated" aria-label="관련 진료">
            <p className="bpRelatedLabel">이 글과 관련된 진료</p>
            <Link href={`/treatments/${tx.slug}`} className="bpRelatedCard">
              <strong>{tx.ko}</strong>
              <span>{tx.summary}</span>
              <em>
                {tx.sedationOk ? '의식하진정(수면치료) 병행 가능 · ' : ''}
                자세히 보기 →
              </em>
            </Link>
          </section>
        )}

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

        /* 이 글의 핵심 — 본문보다 먼저 읽히도록 면을 한 단 깔아 준다 */
        .bpKey { margin: 0 0 clamp(30px,3.6vw,44px); padding: clamp(20px,2.4vw,28px) clamp(20px,2.6vw,30px);
          background: var(--c-warm); border-left: 2px solid var(--c-accent-sub); border-radius: 0 6px 6px 0; }
        .bpKeyLabel { margin: 0 0 12px; font-family: var(--f-display); font-size: 12.5px; font-weight: 700;
          letter-spacing: .14em; color: var(--c-accent-sub); }
        .bpKey ul { margin: 0; padding: 0; list-style: none; display: grid; gap: 9px; }
        .bpKey li { position: relative; padding-left: 17px; font-size: 15.5px; line-height: 1.75;
          font-weight: 600; color: var(--c-text); word-break: keep-all; }
        .bpKey li::before { content: ''; position: absolute; left: 0; top: 11px; width: 6px; height: 6px;
          border-radius: 50%; background: var(--c-accent-sub); }

        /* 자주 묻는 질문 — 화면에만 보여 준다.
           구조화 데이터(FAQPage)는 진료 상세 페이지 한 곳에서만 선언한다(위 주석 참고) */
        .bpFaq { margin-top: clamp(46px,5.5vw,70px); padding-top: clamp(30px,3.4vw,42px); border-top: 1px solid var(--c-line); }
        .bpFaq h2 { margin: 0 0 20px; font-family: var(--f-serif-ko); font-size: clamp(21px,2.4vw,27px);
          font-weight: 400; letter-spacing: -.025em; color: var(--c-text); }
        .bpFaq dl { margin: 0; display: grid; gap: 2px; }
        .bpFaq dl > div { padding: 18px 0; border-bottom: 1px solid var(--c-line); }
        .bpFaq dt { margin-bottom: 8px; font-size: 16.5px; font-weight: 700; line-height: 1.6;
          letter-spacing: -.02em; color: var(--c-text); word-break: keep-all; }
        .bpFaq dt::before { content: 'Q. '; color: var(--c-accent-sub); font-family: var(--f-display); }
        .bpFaq dd { margin: 0; font-size: 15.5px; line-height: 1.9; color: var(--c-text2); word-break: keep-all; }
        .bpFaqNote { margin: 16px 0 0; font-size: 14px; color: var(--c-text3); word-break: keep-all; }

        /* 관련 진료 — 네이버 원문에는 없는, 우리 페이지만의 다음 걸음 */
        .bpRelated { margin-top: clamp(40px,4.6vw,58px); }
        .bpRelatedLabel { margin: 0 0 12px; font-family: var(--f-display); font-size: 12.5px; font-weight: 700;
          letter-spacing: .14em; color: var(--c-accent-sub); }
        .bpRelatedCard { display: grid; gap: 7px; padding: clamp(20px,2.4vw,26px); border: 1px solid var(--c-line);
          border-radius: 8px; text-decoration: none; transition: border-color .3s ease, background .3s ease; }
        .bpRelatedCard strong { font-family: var(--f-serif-ko); font-size: 21px; font-weight: 400;
          letter-spacing: -.025em; color: var(--c-text); }
        .bpRelatedCard span { font-size: 15.5px; line-height: 1.8; color: var(--c-text2); word-break: keep-all; }
        .bpRelatedCard em { font-style: normal; font-size: 14.5px; font-weight: 700; color: var(--c-accent-t); }
        .bpRelatedCard:hover { border-color: var(--c-accent-t); background: var(--c-warm); }

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
