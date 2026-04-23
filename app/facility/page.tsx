import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { FACILITY_ROOMS, EQUIPMENTS } from '@/lib/copy';

const ROOM_SRC: Record<string, string> = {
  대기실: '/media/images/waiting/waiting-02.jpg',
  진료실: '/media/images/treatment-room/treatment-03.jpg',
  수술실: '/media/images/surgery/surgery-01.jpg',
  상담실: '/media/images/consult/consult-02.jpg',
};

const EQ_SRC: Record<string, string> = {
  '3D CT · 구강 스캐너': '/media/images/xray/xray-01.jpg',
  'CAD/CAM CEREC': '/media/images/equipment/equipment-02.jpg',
  '디지털 엑스레이': '/media/images/xray/xray-02.jpg',
  '미세 현미경': '/media/images/equipment/equipment-01.jpg',
};

export const metadata: Metadata = {
  title: '시설 · 장비',
  description:
    '독립 수술실, 상담실, 3D CT, CAD/CAM CEREC, 미세현미경 등 아트에이치치과의 시설과 장비.',
};

export default function FacilityPage() {
  return (
    <>
      <PageHeader title="시설 · 장비" src="/media/images/waiting/waiting-02.jpg" alt="시설 이미지" />

      {/* 진료 공간 */}
      <section style={{ background: 'var(--c-bg)', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div className="secHead">
              <p className="secEyebrow">SPACE</p>
              <h2 className="secTitle">진료 공간</h2>
            </div>
          </Reveal>

          <div className="roomGrid">
            {FACILITY_ROOMS.map((s, i) => (
              <Reveal key={s.k} delay={0.08 + i * 0.08} duration="1s" from="scale(0.97)">
                <div className="roomCard">
                  <Photo src={ROOM_SRC[s.k]} alt={`${s.k} 이미지`} sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="roomOverlay" aria-hidden="true" />
                  <div className="roomLabel">
                    <span className="roomE">{s.e}</span>
                    <span className="roomK">{s.k}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 보유 장비 */}
      <section style={{ background: 'var(--c-warm)', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <div className="secHead">
              <p className="secEyebrow">EQUIPMENT</p>
              <h2 className="secTitle">보유 장비</h2>
            </div>
          </Reveal>

          {EQUIPMENTS.map((eq, i) => (
            <Reveal key={eq.n} delay={0.05 + i * 0.06} duration="0.6s">
              <details className="eqAcc">
                <summary className="eqRow">
                  <div className="eqImg">
                    <Photo src={EQ_SRC[eq.n]} alt={`${eq.n} 이미지`} sizes="160px" />
                  </div>
                  <div className="eqInfo">
                    <h3 className="eqN">{eq.n}</h3>
                    <p className="eqD">{eq.d}</p>
                  </div>
                  <span className="eqArrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M7 10l5 5 5-5z"/>
                    </svg>
                  </span>
                </summary>
                <div className="eqDetail">
                  {eq.brand && <p className="eqBrand">{eq.brand}</p>}
                  <ul className="eqFeatures">
                    {eq.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  {eq.uses && (
                    <div className="eqUses">
                      <span className="eqUsesLabel">활용 분야</span>
                      <span>{eq.uses}</span>
                    </div>
                  )}
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </section>

      <style>{`
        .secHead { text-align: center; margin-bottom: clamp(40px,5vw,60px); }
        .secEyebrow {
          font-size: 11px; color: var(--c-navy); opacity: 0.7; letter-spacing: 4px;
          font-weight: 700; margin: 0 0 12px;
        }
        .secTitle {
          font-family: var(--f-heading); font-size: clamp(24px,3vw,34px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--c-navy);
          margin: 0;
        }

        /* 진료 공간 2x2 */
        .roomGrid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .roomCard {
          position: relative; overflow: hidden; aspect-ratio: 16/10;
          background: var(--c-warm);
        }
        .roomOverlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(15,26,53,0.05) 0%, rgba(15,26,53,0.55) 100%);
        }
        .roomLabel {
          position: absolute; bottom: 0; left: 0;
          padding: 0 24px 22px; z-index: 2;
          display: flex; flex-direction: column; gap: 4px;
        }
        .roomE {
          font-family: var(--f-display); font-size: 11px;
          color: var(--c-gold-l); letter-spacing: 2px;
        }
        .roomK { font-size: 20px; color: #fff; font-weight: 700; letter-spacing: -0.02em; }

        /* 보유 장비 아코디언 */
        .eqAcc {
          border-bottom: 1px solid var(--c-line);
          transition: background 0.3s ease;
        }
        .eqAcc:hover { background: rgba(255, 255, 255, 0.5); }
        .eqAcc[open] { background: #fff; }

        .eqRow {
          display: grid; grid-template-columns: 140px 1fr 32px;
          gap: 24px; padding: 22px 12px;
          align-items: center;
          cursor: pointer;
          list-style: none;
        }
        .eqRow::-webkit-details-marker { display: none; }

        .eqImg { border-radius: 2px; overflow: hidden; aspect-ratio: 4/3; }
        .eqInfo { min-width: 0; }
        .eqN {
          font-size: 16px; color: var(--c-navy); font-weight: 700;
          margin: 0 0 8px; letter-spacing: -0.02em;
        }
        .eqD {
          font-size: 14px; color: var(--c-text); font-weight: 400;
          line-height: 1.75; margin: 0;
        }
        .eqArrow {
          display: inline-flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 50%;
          background: var(--c-warm); color: var(--c-navy);
          transition: transform 0.3s var(--ease-out), background 0.3s;
        }
        .eqAcc[open] .eqArrow {
          transform: rotate(-180deg);
          background: var(--c-navy); color: #fff;
        }

        .eqDetail {
          padding: 4px 12px 28px 176px;
          animation: eqReveal 0.35s ease;
        }
        @keyframes eqReveal {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: none; }
        }
        .eqBrand {
          font-family: var(--f-display); font-size: 12px;
          color: var(--c-navy); opacity: 0.7;
          letter-spacing: 3px; margin: 0 0 14px; font-weight: 500;
        }
        .eqFeatures {
          list-style: none; padding: 0; margin: 0 0 20px;
          display: flex; flex-direction: column; gap: 10px;
        }
        .eqFeatures li {
          position: relative; padding-left: 18px;
          font-size: 14px; color: var(--c-text); line-height: 1.75;
          font-weight: 400;
        }
        .eqFeatures li::before {
          content: ''; position: absolute; left: 0; top: 10px;
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--c-navy);
        }
        .eqUses {
          display: flex; gap: 12px; align-items: flex-start;
          padding: 14px 16px;
          background: var(--c-warm); border-radius: 2px;
          font-size: 13px; color: var(--c-text2); line-height: 1.7;
        }
        .eqUsesLabel {
          flex-shrink: 0;
          font-size: 11px; letter-spacing: 2px; font-weight: 700;
          color: var(--c-navy); opacity: 0.8;
          padding-top: 2px;
        }

        @media (max-width: 768px) {
          .roomGrid { grid-template-columns: 1fr; }
          .eqRow { grid-template-columns: 100px 1fr 28px; gap: 16px; padding: 18px 8px; }
          .eqDetail { padding: 4px 8px 22px 8px; }
          .eqUses { flex-direction: column; gap: 6px; }
        }
      `}</style>
    </>
  );
}
