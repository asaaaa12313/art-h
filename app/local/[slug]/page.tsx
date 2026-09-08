import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import MapEmbed from '@/components/MapEmbed';
import { SITE, LOCAL_PAGES, DOCTORS, CONTENT_UPDATED } from '@/lib/copy';
import { jsonLdScript } from '@/lib/jsonld';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

export function generateStaticParams() {
  return LOCAL_PAGES.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = LOCAL_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  return {
    alternates: { canonical: `/local/${page.slug}` },
    title: page.title,
    description: `${page.lead} 진료시간·교통편·주차 안내와 함께 ${SITE.name} 위치를 확인하세요.`,
  };
}

export default async function LocalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = LOCAL_PAGES.find((p) => p.slug === slug);
  if (!page) notFound();

  const pageUrl = `${SITE_URL}/local/${page.slug}`;

  // 지역 페이지가 병원 실체와 이어지도록 Dentist 노드를 함께 준다.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': pageUrl,
        url: pageUrl,
        name: `${page.title} | ${SITE.name}`,
        description: page.lead,
        dateModified: CONTENT_UPDATED,
        about: { '@id': `${SITE_URL}#clinic` },
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: page.faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
      {
        '@type': 'Dentist',
        '@id': `${SITE_URL}#clinic`,
        name: SITE.name,
        url: SITE_URL,
        telephone: SITE.phone,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.address,
          addressLocality: '인천광역시 연수구',
          addressCountry: 'KR',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />

      <PageHeader
        title={page.title}
        src="/media/images/exterior/exterior-01.jpg"
        alt="송도 IBS타워 외관"
      />

      <article className="lc">
        <Breadcrumb
          items={[
            { href: '/', label: '홈' },
            { href: '/location', label: '오시는길' },
            { label: page.area },
          ]}
        />

        <Reveal variant="fade">
          <p className="lcLead">{page.lead}</p>
        </Reveal>

        <Reveal variant="fade" delay={0.06}>
          <p className="lcDefine">{page.intro}</p>
        </Reveal>

        <section className="lcSec">
          <h2>{page.area}에서 오시는 방법</h2>
          <dl className="lcRoutes">
            {page.routes.map((r) => (
              <div key={r.k}>
                <dt>{r.k}</dt>
                <dd>{r.v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="lcSec">
          <h2>이런 것들이 보이면 제대로 오신 겁니다</h2>
          <ul className="lcMarks">
            {page.landmarks.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </section>

        <section className="lcSec">
          <h2>오시기 전에 알아두시면 좋은 것</h2>
          <ul className="lcNotes">
            {page.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </section>

        <section className="lcSec">
          <h2>진료시간</h2>
          <dl className="lcHours">
            {SITE.hours.map((h) => (
              <div key={h.day} data-hl={h.highlight}>
                <dt>{h.day}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="lcSec">
          <h2>진료하는 의료진</h2>
          <ul className="lcDocs">
            {DOCTORS.map((d) => (
              <li key={d.name}>
                <strong>
                  {d.name} {d.title}
                </strong>
                <span>{d.specialty}</span>
                <span className="lcFocus">{d.focus}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="lcSec">
          <h2>{page.area}에서 오시는 분들이 자주 묻는 것</h2>
          <dl className="lcFaq">
            {page.faqs.map((f) => (
              <div key={f.q}>
                <dt>{f.q}</dt>
                <dd>{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="lcSec">
          <h2>위치</h2>
          <p className="lcAddr">
            {SITE.address}
            <br />
            {SITE.transit}
          </p>
          <MapEmbed />
        </section>

        <nav className="lcMore" aria-label="관련 안내">
          <Link href="/location">오시는길 자세히</Link>
          <Link href="/treatments/sedation">의식하진정 안내</Link>
          <Link href="/pricing">진료비 안내</Link>
          <a href={`tel:${SITE.phone.replace(/-/g, '')}`}>전화 {SITE.phone}</a>
        </nav>

        <nav className="lcSiblings" aria-label="다른 지역 안내">
          {LOCAL_PAGES.filter((p) => p.slug !== page.slug).map((p) => (
            <Link key={p.slug} href={`/local/${p.slug}`}>
              {p.area}에서 오시는 길
            </Link>
          ))}
        </nav>
      </article>

      <style>{`
        .lc {
          max-width: 880px; margin: 0 auto;
          padding: clamp(56px, 7vw, 88px) clamp(24px, 5vw, 40px) clamp(72px, 9vw, 110px);
        }
        .lcLead {
          margin: 28px 0 0; font-size: clamp(17px, 2vw, 20px); line-height: 1.85;
          color: var(--c-text); word-break: keep-all;
        }
        .lcDefine {
          margin: 22px 0 0; padding: clamp(20px, 3vw, 28px);
          background: var(--c-warm); border-left: 2px solid var(--c-accent-t);
          font-size: 16px; line-height: 1.9; color: var(--c-text2); word-break: keep-all;
        }
        .lcSec { margin-top: clamp(44px, 5.5vw, 68px); }
        .lcSec h2 {
          margin: 0 0 16px; font-family: var(--f-serif-ko);
          font-size: clamp(21px, 2.5vw, 26px); font-weight: 400; letter-spacing: -0.02em;
          color: var(--c-text); word-break: keep-all;
        }
        .lcRoutes, .lcHours { margin: 0; display: grid; gap: 12px; }
        .lcRoutes > div, .lcHours > div {
          display: grid; grid-template-columns: 148px 1fr; gap: 16px;
          padding-bottom: 12px; border-bottom: 1px solid var(--c-line);
        }
        .lcRoutes dt, .lcHours dt {
          font-size: 15.5px; font-weight: 600; color: var(--c-text2);
        }
        .lcRoutes dd, .lcHours dd {
          margin: 0; font-size: 16px; line-height: 1.75; color: var(--c-text);
          word-break: keep-all; font-variant-numeric: tabular-nums;
        }
        .lcHours > div[data-hl='true'] dt, .lcHours > div[data-hl='true'] dd { color: var(--c-accent-t); }
        .lcNotes { margin: 0; padding: 0; list-style: none; display: grid; gap: 12px; }
        .lcNotes li {
          position: relative; padding-left: 18px; font-size: 16px; line-height: 1.9;
          color: var(--c-text2); word-break: keep-all;
        }
        .lcNotes li::before {
          content: ''; position: absolute; left: 0; top: 11px;
          width: 6px; height: 6px; border-radius: 50%; background: var(--c-accent-t);
        }
        .lcMarks { margin: 0; padding: 0; list-style: none; display: grid; gap: 10px; }
        .lcMarks li {
          position: relative; padding: 14px 18px 14px 40px;
          background: var(--c-white); border: 1px solid var(--c-line); border-radius: 4px;
          font-size: 16px; line-height: 1.75; color: var(--c-text); word-break: keep-all;
        }
        .lcMarks li::before {
          content: ''; position: absolute; left: 18px; top: 21px;
          width: 8px; height: 8px; border: 2px solid var(--c-accent-t); border-radius: 50%;
        }
        .lcFaq { margin: 0; display: grid; gap: 20px; }
        .lcFaq dt {
          font-size: 17px; font-weight: 600; color: var(--c-text);
          margin-bottom: 8px; word-break: keep-all;
        }
        .lcFaq dd {
          margin: 0; padding-left: 14px; border-left: 2px solid var(--c-line);
          font-size: 16px; line-height: 1.9; color: var(--c-text2); word-break: keep-all;
        }
        .lcDocs { margin: 0; padding: 0; list-style: none; display: grid; gap: 16px; }
        .lcDocs li {
          display: grid; gap: 4px; padding: 18px 20px;
          border: 1px solid var(--c-line); border-radius: 4px;
        }
        .lcDocs strong { font-size: 17.5px; color: var(--c-text); }
        .lcDocs span { font-size: 15.5px; color: var(--c-text2); }
        .lcFocus { color: var(--c-text2); }
        .lcAddr {
          margin: 0 0 18px; font-size: 16.5px; line-height: 1.9; color: var(--c-text);
        }
        .lcMore, .lcSiblings {
          margin-top: clamp(40px, 5vw, 56px); display: flex; flex-wrap: wrap; gap: 10px;
        }
        .lcMore a, .lcSiblings a {
          padding: 11px 18px; border: 1px solid var(--c-line); border-radius: 999px;
          font-size: 13.5px; font-weight: 600; color: var(--c-text2); text-decoration: none;
          transition: border-color .25s ease, color .25s ease;
        }
        .lcMore a:hover, .lcMore a:focus-visible,
        .lcSiblings a:hover, .lcSiblings a:focus-visible {
          border-color: var(--c-accent-t); color: var(--c-accent-t);
        }
        .lcSiblings { margin-top: 12px; }
        @media (max-width: 600px) {
          .lcRoutes > div, .lcHours > div { grid-template-columns: 1fr; gap: 4px; }
        }
      `}</style>
    </>
  );
}
