import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import {
  SITE,
  PRICING,
  PRICING_NOTES,
  PRICING_UPDATED,
  CERTIFICATE_FEES,
  type PriceRow,
} from '@/lib/copy';
import { jsonLdScript } from '@/lib/jsonld';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

export const metadata: Metadata = {
  alternates: { canonical: '/pricing' },
  title: '비급여 진료비 안내',
  description:
    '아트에이치치과 비급여 진료비와 제증명 수수료 안내. 임플란트·보철·틀니·보존·소아·교정·의식하진정·미백 항목별 금액을 게시합니다. (의료법 제45조)',
};

const updated = `${PRICING_UPDATED.slice(0, 4)}년 ${Number(PRICING_UPDATED.slice(5, 7))}월 ${Number(PRICING_UPDATED.slice(8, 10))}일`;

// 표는 구분별로 끊어 보여준다 — 40행을 한 표에 쏟으면 찾고 싶은 항목에 도달하지 못한다.
const GROUPS: string[] = PRICING.reduce<string[]>((acc, r) => {
  if (!acc.includes(r.group)) acc.push(r.group);
  return acc;
}, []);

const GROUP_LEAD: Record<string, string> = {
  임플란트: '식립하는 임플란트 종류와 뼈이식 범위에 따라 금액이 달라집니다. 치아 1개 기준입니다.',
  보철: '크라운·인레이는 재료와 위치(앞니·어금니)에 따라 나뉩니다. 1개 기준입니다.',
  틀니: '잇몸 상태와 남은 치아 수에 따라 종류가 달라집니다. 한 악(위턱 또는 아래턱) 기준입니다.',
  '보존 치료': '충치 범위와 치아 손상 정도에 따라 레진·코어 종류가 달라집니다.',
  '소아 치료': '유치 치료와 예방 처치 항목입니다.',
  '예방 치료': '건강보험이 적용되지 않는 경우의 스케일링 금액입니다. 만 19세 이상은 연 1회 보험이 적용됩니다.',
  '교정 치료': '장치 재제작·유지장치 등 교정 관련 개별 항목입니다.',
  '기타 치료': '이갈이·턱관절 장치와 의식하진정(수면치료) 항목입니다.',
  '미용 치료': '미백과 보톡스 항목입니다. 이 구분의 금액은 부가가치세가 별도로 부과됩니다.',
};

const anchorId = (g: string) => `g-${GROUPS.indexOf(g)}`;
const won = (n: number) => n.toLocaleString('ko-KR');

function PriceTable({ rows }: { rows: PriceRow[] }) {
  return (
    <div className="prScroll">
      <table className="prTable">
        <thead>
          <tr>
            <th scope="col">진료 항목</th>
            <th scope="col">세부 내용</th>
            <th scope="col" className="prNum">비용</th>
            <th scope="col">기준</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={`${r.item}-${r.detail}`}>
              <td>{r.item}</td>
              <td>{r.detail}</td>
              <td className="prNum">{won(r.price)}원</td>
              <td className="prUnit">{r.unit}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PricingPage() {
  const priceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${SITE_URL}/pricing`,
    url: `${SITE_URL}/pricing`,
    name: `비급여 진료비 안내 | ${SITE.name}`,
    description: '아트에이치치과가 게시하는 비급여 진료비용과 제증명 수수료입니다.',
    dateModified: PRICING_UPDATED,
    isPartOf: { '@type': 'WebSite', '@id': `${SITE_URL}#website` },
    // 병원 엔티티는 홈(#clinic)이 정본 — 페이지마다 새 노드를 만들면 같은 병원이 여러 개로 파싱된다
    about: { '@id': `${SITE_URL}#clinic` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(priceJsonLd) }}
      />

      <PageHeader
        title="비급여 진료비 안내"
        src="/media/images/consult/consult-01.jpg"
        alt="상담실에서 치료 계획과 비용을 설명하는 모습"
      />

      <article className="pr">
        <Breadcrumb items={[{ href: '/', label: '홈' }, { label: '비급여 진료비 안내' }]} />

        <Reveal variant="fade">
          <p className="prIntro">
            「의료법」 제45조와 같은 법 시행규칙 제42조의2에 따라 본원의 비급여 진료비용을 게시합니다.
            아래 금액은 {updated} 기준이며, 변경되면 이 페이지에 먼저 반영합니다.
          </p>
        </Reveal>

        <Reveal variant="fade" delay={0.08}>
          <ul className="prNotes">
            {PRICING_NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Reveal>

        {/* 40행을 한 번에 훑기 어려워 구분으로 바로 가는 앵커를 둔다 */}
        <Reveal variant="fade" delay={0.12}>
          <nav className="prJump" aria-label="진료비 구분 바로가기">
            {GROUPS.map((g) => (
              <a key={g} href={`#${anchorId(g)}`}>{g}</a>
            ))}
            <a href="#certificate">제증명 수수료</a>
          </nav>
        </Reveal>

        {GROUPS.map((g) => (
          <section key={g} className="prSec" id={anchorId(g)}>
            <h2>{g}</h2>
            {GROUP_LEAD[g] && <p className="prLead">{GROUP_LEAD[g]}</p>}
            <PriceTable rows={PRICING.filter((r) => r.group === g)} />
          </section>
        ))}

        <section className="prSec" id="certificate">
          <h2>제증명 수수료</h2>
          <p className="prLead">
            진단서·소견서 등 서류 발급 수수료입니다. 「의료법 시행규칙」 제1조의3에 따라 따로 게시합니다.
          </p>
          <div className="prScroll">
            <table className="prTable">
              <thead>
                <tr>
                  <th scope="col">증명서 종류</th>
                  <th scope="col" className="prNum">비용</th>
                  <th scope="col">기준</th>
                </tr>
              </thead>
              <tbody>
                {CERTIFICATE_FEES.map((c) => (
                  <tr key={c.name}>
                    <td>{c.name}</td>
                    <td className="prNum">{c.price === 0 ? '무료' : `${won(c.price)}원`}</td>
                    <td className="prUnit">{c.unit || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="prUpdated">게시 기준일 {updated}</p>

        <section className="prAsk">
          <h2>비용이 궁금하시면 먼저 물어보셔도 됩니다</h2>
          <p>
            치료 계획에 따라 필요한 항목이 달라집니다. 전화로 대략적인 범위를 여쭤보시거나,
            검사 후 상담에서 항목별 금액과 포함·제외 조건을 함께 확인하실 수 있습니다.
          </p>
          <a href={`tel:${SITE.phone.replace(/-/g, '')}`} className="prCall">
            {SITE.phone}
            <span aria-hidden="true">→</span>
          </a>
        </section>
      </article>

      <style>{`
        .pr {
          max-width: 980px; margin: 0 auto;
          padding: clamp(56px, 7vw, 88px) clamp(24px, 5vw, 40px) clamp(72px, 9vw, 110px);
        }
        .prIntro {
          margin: 28px 0 0; font-size: 17px; line-height: 1.95;
          color: var(--c-text); word-break: keep-all;
        }
        .prNotes {
          margin: 22px 0 0; padding: clamp(20px, 3vw, 28px) clamp(20px, 3vw, 30px) clamp(20px, 3vw, 28px) clamp(38px, 5vw, 48px);
          background: var(--c-warm); border-left: 2px solid var(--c-accent-t);
          display: grid; gap: 10px;
        }
        .prNotes li {
          font-size: 16px; line-height: 1.85; color: var(--c-text2); word-break: keep-all;
        }
        .prJump {
          margin: 34px 0 0; display: flex; flex-wrap: wrap; gap: 8px;
        }
        .prJump a {
          padding: 9px 15px; border: 1px solid var(--c-line); border-radius: 999px;
          font-size: 13px; font-weight: 600; color: var(--c-text2); text-decoration: none;
          transition: border-color .25s ease, color .25s ease;
        }
        .prJump a:hover, .prJump a:focus-visible { border-color: var(--c-accent-t); color: var(--c-accent-t); }
        .prSec { margin-top: clamp(48px, 6vw, 76px); scroll-margin-top: var(--anchor-offset); }
        .prSec h2 {
          margin: 0 0 10px; font-family: var(--f-serif-ko);
          font-size: clamp(22px, 2.6vw, 28px); font-weight: 400; letter-spacing: -0.02em;
          color: var(--c-text);
        }
        .prLead {
          margin: 0 0 18px; font-size: 16px; line-height: 1.85;
          color: var(--c-text2); word-break: keep-all;
        }
        /* 표는 좁은 화면에서 가로로만 스크롤한다 — 본문이 옆으로 밀리지 않게 */
        .prScroll { overflow-x: auto; -webkit-overflow-scrolling: touch; }
        .prTable {
          width: 100%; border-collapse: collapse; font-size: 16px;
          min-width: 520px;
        }
        .prTable th, .prTable td {
          padding: 14px 12px; text-align: left; vertical-align: top;
          border-bottom: 1px solid var(--c-line); word-break: keep-all;
        }
        .prTable thead th {
          font-size: 12.5px; font-weight: 700; letter-spacing: 0.02em;
          color: var(--c-text2); border-bottom: 1px solid var(--c-text3);
          white-space: nowrap;
        }
        .prTable td { color: var(--c-text); line-height: 1.6; }
        .prNum {
          text-align: right; font-variant-numeric: tabular-nums;
          font-weight: 600; white-space: nowrap;
        }
        .prUnit { color: var(--c-text2); font-size: 13.5px; white-space: nowrap; }
        .prUpdated {
          margin: clamp(40px, 5vw, 60px) 0 0; font-size: 13px; color: var(--c-text2);
        }
        .prAsk {
          margin-top: clamp(48px, 6vw, 72px); padding: clamp(30px, 4vw, 44px);
          background: var(--c-dark); border-radius: 4px;
        }
        .prAsk h2 {
          margin: 0 0 12px; font-family: var(--f-serif-ko);
          font-size: clamp(20px, 2.4vw, 26px); font-weight: 400; letter-spacing: -0.02em;
          color: #fff; word-break: keep-all;
        }
        .prAsk p {
          margin: 0 0 22px; font-size: 16px; line-height: 1.9;
          color: var(--c-text-on-dark-2); word-break: keep-all;
        }
        .prCall {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 14px 28px; background: var(--c-accent); color: var(--c-navy);
          font-family: var(--f-display); font-size: 20.5px; letter-spacing: 1px;
          text-decoration: none; border-radius: 3px;
        }
        @media (max-width: 600px) {
          .prTable { font-size: 13.5px; }
          .prTable th, .prTable td { padding: 12px 10px; }
        }
      `}</style>
    </>
  );
}
