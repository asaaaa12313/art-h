import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { TREATMENTS } from '@/lib/copy';

export const metadata: Metadata = {
  title: '진료과목',
  description:
    '임플란트, 신경치료, 사랑니 발치, 턱관절, 의식하진정(수면마취), 잇몸·스케일링, 미백 — 아트에이치치과의 진료 영역.',
};

// 진료과목별 실사 매핑 (copy.ts의 en 값과 매칭)
const TX_SRC: Record<string, string> = {
  'Implant': '/media/images/surgery/surgery-01.jpg',
  'Root Canal': '/media/images/treatment-room/treatment-01.jpg',
  'Oral Surgery': '/media/images/xray/xray-01.jpg',
  'TMJ': '/media/images/xray/xray-02.jpg',
  'Sedation': '/media/images/surgery/surgery-02.jpg',
  'Periodontics': '/media/images/equipment/equipment-01.jpg',
  'Whitening': '/media/images/consult/consult-01.jpg',
};

export default function TreatmentsPage() {
  return (
    <>
      <PageHeader title="진료과목" src="/media/images/treatment-room/treatment-02.jpg" alt="진료실 이미지" />

      <section style={{ background: 'var(--c-bg)', padding: 'clamp(48px,6vw,80px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          {TREATMENTS.map((t, i) => (
            <Reveal key={t.en} delay={0.03 + i * 0.04} duration="0.6s">
              <article className="txRow">
                <div className="txImg">
                  <Photo src={TX_SRC[t.en]} alt={`${t.ko} 이미지`} sizes="200px" />
                </div>
                <div className="txBody">
                  <div className="txHead">
                    <span className="txEn">{t.en}</span>
                    <span className="txKo">{t.ko}</span>
                  </div>
                  <p className="txD">{t.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <style>{`
        .txRow {
          display: grid; grid-template-columns: 200px 1fr;
          border-bottom: 1px solid var(--c-line);
          transition: background 0.3s;
        }
        .txRow:hover { background: var(--c-warm); }
        .txRow:hover .txEn { color: var(--c-gold); }
        .txImg { overflow: hidden; height: 140px; }
        .txBody {
          padding: 24px 32px; display: flex; flex-direction: column; justify-content: center;
        }
        .txHead { display: flex; align-items: baseline; gap: 10px; margin-bottom: 6px; }
        .txEn { font-family: var(--f-display); font-size: 18px; color: var(--c-dark); transition: color 0.3s; }
        .txKo { font-size: 14px; color: var(--c-text3); }
        .txD { font-size: 13px; color: var(--c-text2); line-height: 1.7; font-weight: 300; margin: 0; }
        @media (max-width: 600px) {
          .txRow { grid-template-columns: 1fr; }
          .txImg { height: 180px; }
          .txBody { padding: 20px 24px; }
        }
      `}</style>
    </>
  );
}
