import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import MapEmbed from '@/components/MapEmbed';
import { SITE } from '@/lib/copy';
import { LOCALES, LOCALE_CONTENT, LOCALE_LABEL, LOCALE_HTML_LANG, type Locale } from '@/lib/i18n';
import { jsonLdScript } from '@/lib/jsonld';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || SITE.naverPlace;

const isLocale = (v: string): v is Locale => (LOCALES as readonly string[]).includes(v);

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const c = LOCALE_CONTENT[locale];
  return {
    title: c.title,
    description: c.metaDescription,
    alternates: {
      canonical: `/${locale}`,
      // 같은 병원의 다른 언어판임을 검색엔진에 알린다 — 각 언어가 서로를 가리켜야 인정된다
      languages: {
        ko: '/',
        ...Object.fromEntries(LOCALES.map((l) => [LOCALE_HTML_LANG[l], `/${l}`])),
      },
    },
    openGraph: {
      title: c.title,
      description: c.metaDescription,
      locale: LOCALE_HTML_LANG[locale],
      // openGraph를 통째로 덮어쓰면 루트에서 물려받던 대표 이미지(app/opengraph-image.jpg)가
      // 함께 지워진다. 공유했을 때 그림 없는 링크가 되므로 여기서 다시 지정한다.
      images: ['/opengraph-image.jpg'],
    },
  };
}

export default async function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const c = LOCALE_CONTENT[locale];
  const phoneHref = `tel:${SITE.phone.replace(/-/g, '')}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/${locale}`,
    url: `${SITE_URL}/${locale}`,
    name: c.title,
    description: c.metaDescription,
    inLanguage: LOCALE_HTML_LANG[locale],
    about: { '@id': `${SITE_URL}#clinic` },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }} />

      <PageHeader
        title={c.title}
        src="/media/images/still/consult-tablet.jpg"
        alt="Art H Dental Clinic — treatment planning"
      />

      {/* 이 구역만 해당 언어다 — 스크린리더가 한국어 발음으로 읽지 않도록 lang을 명시한다 */}
      <article className="lg" lang={LOCALE_HTML_LANG[locale]}>
        <nav className="lgSwitch" aria-label="Language">
          <Link href="/" hrefLang="ko">한국어</Link>
          {LOCALES.map((l) => (
            <Link key={l} href={`/${l}`} hrefLang={LOCALE_HTML_LANG[l]} aria-current={l === locale ? 'page' : undefined}>
              {LOCALE_LABEL[l]}
            </Link>
          ))}
        </nav>

        <Reveal variant="fade">
          <p className="lgTagline">{c.tagline}</p>
        </Reveal>
        <Reveal variant="fade" delay={0.08}>
          <p className="lgLead">{c.lead}</p>
        </Reveal>

        {c.sections.map((s, i) => (
          <section key={s.h} className="lgSec">
            <Reveal variant={i % 2 === 0 ? 'wipe-up' : 'slide-right'}>
              <h2>{s.h}</h2>
            </Reveal>
            {s.body && (
              <Reveal variant="fade" delay={0.08}>
                <p className="lgBody">{s.body}</p>
              </Reveal>
            )}
            {s.rows && (
              <Reveal variant="fade" delay={0.08}>
                <dl className="lgRows">
                  {s.rows.map((r) => (
                    <div key={r.k}>
                      <dt>{r.k}</dt>
                      <dd>{r.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            )}
            {s.list && (
              <Reveal variant="fade" delay={0.08}>
                <ul className="lgList">
                  {s.list.map((v) => (
                    <li key={v}>{v}</li>
                  ))}
                </ul>
              </Reveal>
            )}
          </section>
        ))}

        <section className="lgSec">
          <MapEmbed />
        </section>

        <div className="lgCta">
          <a href={phoneHref} className="lgCall">
            {c.cta.call} · {SITE.phone}
          </a>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="lgGhost">
            {c.cta.book}
          </a>
          <Link href="/" className="lgGhost" hrefLang="ko">
            {c.cta.korean}
          </Link>
        </div>

        <p className="lgNote">{c.backToKorean}</p>
      </article>

      <style>{`
        .lg {
          max-width: 880px; margin: 0 auto;
          padding: clamp(48px, 6vw, 76px) clamp(24px, 5vw, 40px) clamp(72px, 9vw, 110px);
        }
        .lgSwitch { display: flex; flex-wrap: wrap; gap: 8px; }
        .lgSwitch a {
          padding: 9px 16px; border: 1px solid var(--c-line); border-radius: 999px;
          font-size: 13px; font-weight: 600; color: var(--c-text2); text-decoration: none;
          transition: border-color .25s ease, color .25s ease;
        }
        .lgSwitch a[aria-current='page'] {
          border-color: var(--c-accent-t); color: var(--c-accent-t); background: var(--c-warm);
        }
        .lgSwitch a:hover, .lgSwitch a:focus-visible { border-color: var(--c-accent-t); color: var(--c-accent-t); }
        .lgTagline {
          margin: 34px 0 0; font-family: var(--f-serif-ko);
          font-size: clamp(24px, 3.2vw, 36px); font-weight: 400; line-height: 1.45;
          letter-spacing: -0.02em; color: var(--c-text); word-break: keep-all;
        }
        .lgLead {
          margin: 18px 0 0; font-size: 17px; line-height: 1.95; color: var(--c-text2);
          word-break: keep-all;
        }
        .lgSec { margin-top: clamp(40px, 5vw, 62px); }
        .lgSec h2 {
          margin: 0 0 16px; font-family: var(--f-serif-ko);
          font-size: clamp(20px, 2.4vw, 25px); font-weight: 400; letter-spacing: -0.02em;
          color: var(--c-text);
        }
        .lgBody { margin: 0; font-size: 16.5px; line-height: 1.95; color: var(--c-text2); word-break: keep-all; }
        .lgRows { margin: 0; display: grid; gap: 14px; }
        .lgRows > div {
          display: grid; grid-template-columns: 190px 1fr; gap: 20px;
          padding-bottom: 14px; border-bottom: 1px solid var(--c-line);
        }
        .lgRows dt { font-size: 15.5px; font-weight: 600; color: var(--c-text2); }
        .lgRows dd { margin: 0; font-size: 16.5px; line-height: 1.8; color: var(--c-text); word-break: keep-all; }
        .lgList { margin: 0; padding: 0; list-style: none; display: grid; gap: 11px; }
        .lgList li {
          position: relative; padding-left: 18px; font-size: 16.5px; line-height: 1.85;
          color: var(--c-text); word-break: keep-all;
        }
        .lgList li::before {
          content: ''; position: absolute; left: 0; top: 11px;
          width: 6px; height: 6px; border-radius: 50%; background: var(--c-accent-t);
        }
        .lgCta {
          margin-top: clamp(44px, 5vw, 64px); display: flex; flex-wrap: wrap; gap: 10px;
        }
        .lgCall {
          display: inline-flex; align-items: center; height: 52px; padding: 0 26px;
          background: var(--c-accent-t); color: #fff; border-radius: 3px;
          font-size: 16px; font-weight: 700; text-decoration: none;
        }
        .lgGhost {
          display: inline-flex; align-items: center; height: 52px; padding: 0 22px;
          border: 1px solid var(--c-line); border-radius: 3px;
          font-size: 15.5px; font-weight: 600; color: var(--c-text2); text-decoration: none;
        }
        .lgGhost:hover, .lgGhost:focus-visible { border-color: var(--c-accent-t); color: var(--c-accent-t); }
        .lgNote { margin: 22px 0 0; font-size: 13px; color: var(--c-text2); }
        @media (max-width: 600px) {
          .lgRows > div { grid-template-columns: 1fr; gap: 4px; }
        }
      `}</style>
    </>
  );
}
