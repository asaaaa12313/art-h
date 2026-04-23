import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { TREATMENTS } from '@/lib/copy';

const TX_SRC: Record<string, string> = {
  Implant: '/media/images/surgery/surgery-01.jpg',
  'Root Canal': '/media/images/treatment-room/treatment-01.jpg',
  'Oral Surgery': '/media/images/xray/xray-01.jpg',
  TMJ: '/media/images/xray/xray-02.jpg',
  Sedation: '/media/images/surgery/surgery-02.jpg',
  Periodontics: '/media/images/equipment/equipment-01.jpg',
  Whitening: '/media/images/consult/consult-01.jpg',
};

export function generateStaticParams() {
  return TREATMENTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = TREATMENTS.find((x) => x.slug === slug);
  if (!t) return { title: '진료과목' };
  return {
    title: t.ko,
    description: t.summary || t.d,
  };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tx = TREATMENTS.find((t) => t.slug === slug);
  if (!tx) notFound();

  const src = TX_SRC[tx.en];
  const idx = TREATMENTS.findIndex((t) => t.slug === slug);
  const prev = TREATMENTS[(idx - 1 + TREATMENTS.length) % TREATMENTS.length];
  const next = TREATMENTS[(idx + 1) % TREATMENTS.length];

  return (
    <>
      <PageHeader title={tx.ko} src={src} alt={`${tx.ko} 이미지`} />

      <article className="txDetail">
        {/* Summary */}
        <section className="txSec txHead">
          <Reveal duration="0.7s">
            <p className="txEyebrow">{tx.en.toUpperCase()}</p>
          </Reveal>
          <Reveal delay={0.1} duration="0.9s">
            <h2 className="txSummary">{tx.summary}</h2>
          </Reveal>
          <Reveal delay={0.2} duration="0.9s">
            <p className="txIntro">{tx.intro}</p>
          </Reveal>
        </section>

        {/* Processes */}
        <section className="txSec txSplit">
          <Reveal duration="1s" from="translateX(-20px)">
            <div>
              <p className="txLabel">PROCESS</p>
              <h3 className="txSectionTitle">치료 과정</h3>
            </div>
          </Reveal>
          <ol className="txSteps">
            {tx.processes.map((step, i) => (
              <Reveal key={step} delay={0.1 + i * 0.05} duration="0.6s">
                <li>
                  <span className="txStepNo">{String(i + 1).padStart(2, '0')}</span>
                  <span className="txStepText">{step}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section className="txSec txFeat">
          <Reveal duration="0.9s">
            <div>
              <p className="txLabel">FEATURES</p>
              <h3 className="txSectionTitle">아트에이치의 차별점</h3>
            </div>
          </Reveal>
          <div className="txFeatList">
            {tx.features.map((f, i) => (
              <Reveal key={f} delay={0.1 + i * 0.08} duration="0.7s">
                <div className="txFeatCard">
                  <span className="txCheck" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" />
                    </svg>
                  </span>
                  <p>{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="txSec txFaq">
          <Reveal duration="0.9s">
            <div>
              <p className="txLabel">FAQ</p>
              <h3 className="txSectionTitle">자주 묻는 질문</h3>
            </div>
          </Reveal>
          <div className="txFaqList">
            {tx.faqs.map((f, i) => (
              <Reveal key={f.q} delay={0.08 + i * 0.06} duration="0.6s">
                <details className="txFaqItem">
                  <summary>
                    <span className="txFaqQ">Q</span>
                    <span>{f.q}</span>
                    <span className="txFaqArrow" aria-hidden="true">+</span>
                  </summary>
                  <p className="txFaqA">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="txNav" aria-label="다른 진료과목 보기">
          <Link href={`/treatments/${prev.slug}`} className="txNavLink txNavPrev">
            <span className="txNavLabel">← 이전</span>
            <span className="txNavTitle">{prev.ko}</span>
          </Link>
          <Link href="/treatments" className="txNavList">전체 진료과목</Link>
          <Link href={`/treatments/${next.slug}`} className="txNavLink txNavNext">
            <span className="txNavLabel">다음 →</span>
            <span className="txNavTitle">{next.ko}</span>
          </Link>
        </nav>
      </article>

      <style>{`
        .txDetail {
          max-width: 1000px; margin: 0 auto;
          padding: clamp(60px,8vw,100px) clamp(24px,5vw,80px);
        }
        .txSec { margin-bottom: clamp(60px, 8vw, 100px); }
        .txSec:last-of-type { margin-bottom: 0; }

        .txHead { max-width: 720px; }
        .txEyebrow {
          font-family: var(--f-display); font-size: 14px;
          color: var(--c-navy); opacity: 0.7;
          letter-spacing: 4px; margin: 0 0 16px;
        }
        .txSummary {
          font-family: var(--f-heading); font-size: clamp(26px,3.4vw,40px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--c-navy);
          line-height: 1.35; margin: 0 0 28px;
        }
        .txIntro {
          font-size: 16px; color: var(--c-text); font-weight: 400;
          line-height: 2; margin: 0;
        }

        .txLabel {
          font-size: 11px; color: var(--c-navy); opacity: 0.7;
          letter-spacing: 4px; font-weight: 700; margin: 0 0 12px;
        }
        .txSectionTitle {
          font-family: var(--f-heading); font-size: clamp(22px,2.6vw,30px);
          font-weight: 700; letter-spacing: -0.02em; color: var(--c-navy);
          margin: 0;
        }

        .txSplit {
          display: grid; grid-template-columns: 1fr 1.6fr;
          gap: clamp(40px, 5vw, 72px); align-items: start;
        }
        .txSteps {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 18px;
        }
        .txSteps li {
          display: grid; grid-template-columns: 48px 1fr; gap: 16px;
          padding: 18px 20px; background: var(--c-warm);
          border-left: 2px solid var(--c-navy);
          border-radius: 2px;
        }
        .txStepNo {
          font-family: var(--f-display); font-size: 15px;
          color: var(--c-navy); font-weight: 400;
          letter-spacing: 1px; align-self: center;
        }
        .txStepText {
          font-size: 15px; color: var(--c-text); line-height: 1.7;
          font-weight: 500;
        }

        .txFeat { background: var(--c-warm); padding: clamp(40px,5vw,60px); border-radius: 2px; }
        .txFeatList {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
          margin-top: 28px;
        }
        .txFeatCard {
          display: grid; grid-template-columns: 28px 1fr; gap: 14px;
          padding: 20px 22px; background: #fff;
          border: 1px solid var(--c-line); border-radius: 2px;
        }
        .txCheck {
          display: inline-flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--c-navy); color: #fff;
        }
        .txFeatCard p { margin: 0; font-size: 14px; color: var(--c-text); line-height: 1.7; font-weight: 500; }

        .txFaqList {
          margin-top: 28px; display: flex; flex-direction: column; gap: 6px;
        }
        .txFaqItem {
          border: 1px solid var(--c-line);
          border-radius: 2px; background: #fff;
          overflow: hidden; transition: border-color 0.25s;
        }
        .txFaqItem[open] { border-color: var(--c-navy); }
        .txFaqItem summary {
          display: grid; grid-template-columns: 28px 1fr 24px;
          gap: 16px; align-items: center;
          padding: 20px 24px; cursor: pointer;
          list-style: none; font-size: 15px; color: var(--c-text);
          font-weight: 500;
        }
        .txFaqItem summary::-webkit-details-marker { display: none; }
        .txFaqQ {
          font-family: var(--f-display); font-size: 16px;
          color: var(--c-navy); font-weight: 400;
        }
        .txFaqArrow {
          font-size: 20px; color: var(--c-text3); transition: transform 0.3s;
          text-align: right;
        }
        .txFaqItem[open] .txFaqArrow { transform: rotate(45deg); color: var(--c-navy); }
        .txFaqA {
          padding: 0 24px 22px 68px; margin: 0;
          font-size: 14px; color: var(--c-text2); line-height: 2;
          font-weight: 400;
        }

        .txNav {
          display: grid; grid-template-columns: 1fr auto 1fr;
          gap: 20px; align-items: center;
          border-top: 1px solid var(--c-line);
          padding-top: clamp(32px,4vw,48px);
        }
        .txNavLink {
          display: flex; flex-direction: column; gap: 4px;
          padding: 14px 4px; transition: opacity 0.25s;
        }
        .txNavNext { text-align: right; align-items: flex-end; }
        .txNavLabel {
          font-size: 11px; color: var(--c-text3); letter-spacing: 2px; font-weight: 500;
        }
        .txNavTitle {
          font-size: 15px; color: var(--c-navy); font-weight: 600;
        }
        .txNavLink:hover { opacity: 0.7; }
        .txNavList {
          font-size: 12px; color: var(--c-text2);
          padding: 10px 18px; border: 1px solid var(--c-line);
          border-radius: 999px; transition: background 0.25s;
          letter-spacing: 0.5px;
        }
        .txNavList:hover { background: var(--c-warm); }

        @media (max-width: 768px) {
          .txSplit { grid-template-columns: 1fr; }
          .txFeatList { grid-template-columns: 1fr; }
          .txNav { grid-template-columns: 1fr; text-align: center; }
          .txNavNext { text-align: center; align-items: center; }
        }
      `}</style>
    </>
  );
}
