import type { Metadata } from 'next';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import AnimatedIcon from '@/components/AnimatedIcon';
import Breadcrumb from '@/components/Breadcrumb';
import { TREATMENTS } from '@/lib/copy';
import { jsonLdScript } from '@/lib/jsonld';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

export const metadata: Metadata = {
  alternates: { canonical: '/treatments' },
  title: '진료과목',
  description:
    '임플란트, 신경치료, 사랑니 발치, 턱관절, 의식하진정(수면마취), 잇몸·스케일링, 미백 — 아트에이치치과의 진료 영역.',
};

// 진료과목 slug별 라인 아이콘 매핑 (없는 slug는 tooth 기본)
const TX_ICON: Record<string, string> = {
  implant: 'scan',
  'root-canal': 'tooth',
  'oral-surgery': 'tooth',
  tmj: 'badge',
  sedation: 'droplet',
  periodontics: 'sparkle',
  whitening: 'sparkle',
};

export default function TreatmentsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '진료과목', item: `${SITE_URL}/treatments` },
        ],
      },
      {
        '@type': 'ItemList',
        name: '아트에이치치과 진료과목',
        itemListElement: TREATMENTS.map((t, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: t.ko,
          description: t.d,
          url: `${SITE_URL}/treatments/${t.slug}`,
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <PageHeader title="진료과목" src="/media/images/treatment-room/treatment-01.jpg" alt="아트에이치치과 진료실" />

      <section style={{ background: 'var(--c-bg)', padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Breadcrumb items={[{ label: '홈', href: '/' }, { label: '진료과목' }]} />
          {TREATMENTS.map((t, i) => (
            <Reveal key={t.en} delay={0.03 + i * 0.04} duration="0.6s">
              <Link href={`/treatments/${t.slug}`} className="txRow" aria-label={`${t.ko} 상세 보기`}>
                <div className="txImg">
                  <Photo src={t.card} alt={`${t.ko} 이미지`} sizes="200px" />
                </div>
                <div className="txBody">
                  <div className="txHead">
                    <span className="txIcon">
                      <AnimatedIcon name={TX_ICON[t.slug] ?? 'tooth'} size={26} delay={0.18 + i * 0.04} />
                    </span>
                    <span className="txEn">{t.en}</span>
                    <span className="txKo">{t.ko}</span>
                  </div>
                  <p className="txD">{t.d}</p>
                </div>
                <span className="txArrow" aria-hidden="true">→</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <style>{`
        .txRow {
          display: grid; grid-template-columns: 200px 1fr auto;
          gap: 0;
          border-bottom: 1px solid var(--c-line);
          transition: background 0.3s;
          text-decoration: none; color: inherit;
          align-items: center;
        }
        .txRow:hover { background: var(--c-warm); }
        .txRow:hover .txEn { color: var(--c-navy); }
        .txRow:hover .txArrow { transform: translateX(4px); color: var(--c-navy); }
        .txRow:hover .txIcon { color: var(--c-navy); transform: translateY(-1px); }
        .txImg { overflow: hidden; height: 140px; }
        .txBody {
          padding: 24px 32px; display: flex; flex-direction: column; justify-content: center;
        }
        .txHead { display: flex; align-items: baseline; gap: 10px; margin-bottom: 6px; }
        .txIcon {
          align-self: center; color: var(--c-blue);
          transition: color 0.3s, transform 0.3s var(--ease-out);
        }
        .txIcon svg { stroke: currentColor; }
        .txEn { font-family: var(--f-display); font-size: 18px; color: var(--c-navy); transition: color 0.3s; }
        .txKo { font-size: 15px; color: var(--c-text2); font-weight: 500; }
        .txD { font-size: 14px; color: var(--c-text); line-height: 1.75; font-weight: 400; margin: 0; }
        .txArrow {
          padding-right: 28px; font-size: 22px; color: var(--c-text3);
          transition: transform 0.3s var(--ease-out), color 0.3s;
          font-family: var(--f-display);
        }
        @media (max-width: 600px) {
          .txRow { grid-template-columns: 1fr; }
          .txImg { height: 180px; }
          .txBody { padding: 20px 24px; }
          .txArrow { display: none; }
        }
      `}</style>
    </>
  );
}
