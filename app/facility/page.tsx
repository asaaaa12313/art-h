import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { FACILITY_ROOMS } from '@/lib/copy';

const ROOM_SRC: Record<string, string> = {
  대기실: '/media/images/waiting/waiting-02.jpg',
  진료실: '/media/images/treatment-room/treatment-03.jpg',
  수술실: '/media/images/surgery/surgery-01.jpg',
  상담실: '/media/images/consult/consult-02.jpg',
};

export const metadata: Metadata = {
  title: '시설',
  description:
    '독립 수술실, 진료실, 상담실 등 아트에이치치과의 진료 공간 안내.',
};

export default function FacilityPage() {
  return (
    <>
      <PageHeader title="시설" src="/media/images/waiting/waiting-02.jpg" alt="시설 이미지" />

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

        @media (max-width: 768px) {
          .roomGrid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
