import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { FACILITY_ROOMS, EQUIPMENTS } from '@/lib/copy';

export const metadata: Metadata = {
  title: '시설 · 장비',
  description:
    '독립 수술실, 상담실, 3D CT, CAD/CAM CEREC, 미세현미경 등 아트에이치치과의 시설과 장비.',
};

// 시설/장비 실사 매핑 (copy.ts의 k/n 값과 매칭)
const ROOM_SRC: Record<string, string> = {
  '대기실': '/media/images/waiting/waiting-02.jpg',
  '진료실': '/media/images/treatment-room/treatment-03.jpg',
  '수술실': '/media/images/surgery/surgery-01.jpg',
  '상담실': '/media/images/consult/consult-02.jpg',
};

const EQ_SRC: Record<string, string> = {
  '3D CT · 구강 스캐너': '/media/images/xray/xray-01.jpg',
  'CAD/CAM CEREC': '/media/images/equipment/equipment-02.jpg',
  '디지털 엑스레이': '/media/images/xray/xray-02.jpg',
  '미세 현미경': '/media/images/equipment/equipment-01.jpg',
};

export default function FacilityPage() {
  return (
    <>
      <PageHeader title="시설 · 장비" src="/media/images/waiting/waiting-02.jpg" alt="시설 이미지" />

      <section style={{ background: 'var(--c-bg)', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div className="roomGrid">
          {FACILITY_ROOMS.map((s, i) => (
            <Reveal key={s.k} delay={0.1 + i * 0.1} duration="1s" from="scale(0.97)">
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
      </section>

      <section style={{ background: 'var(--c-warm)', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal>
            <h2 style={{ fontFamily: 'var(--f-heading)', fontSize: 'clamp(20px,2.4vw,26px)', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--c-dark)', margin: '0 0 36px' }}>
              보유 장비
            </h2>
          </Reveal>
          {EQUIPMENTS.map((eq, i) => (
            <Reveal key={eq.n} delay={0.05 + i * 0.06} duration="0.6s">
              <div className="eqRow">
                <div className="eqImg"><Photo src={EQ_SRC[eq.n]} alt={`${eq.n} 이미지`} sizes="120px" /></div>
                <div>
                  <h3 className="eqN">{eq.n}</h3>
                  <p className="eqD">{eq.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <style>{`
        .roomGrid {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 3px;
        }
        .roomCard {
          position: relative; overflow: hidden; aspect-ratio: 16/10;
        }
        .roomOverlay {
          position: absolute; inset: 0; background: rgba(0,0,0,0.15);
        }
        .roomLabel {
          position: absolute; bottom: 0; left: 0;
          padding: 0 24px 20px; z-index: 2;
        }
        .roomE {
          font-size: 11px; color: rgba(255,255,255,0.55); letter-spacing: 2px;
          display: block; margin-bottom: 4px;
        }
        .roomK { font-size: 18px; color: #fff; font-weight: 500; }
        .eqRow {
          display: grid; grid-template-columns: 120px 1fr;
          gap: 20px; padding: 20px 0;
          border-bottom: 1px solid var(--c-line); align-items: center;
        }
        .eqImg { border-radius: 2px; overflow: hidden; aspect-ratio: 4/3; }
        .eqN { font-size: 15px; color: var(--c-dark); font-weight: 600; margin: 0 0 4px; }
        .eqD { font-size: 13px; color: var(--c-text2); font-weight: 300; margin: 0; }
        @media (max-width: 600px) {
          .roomGrid { grid-template-columns: 1fr; }
          .eqRow { grid-template-columns: 100px 1fr; gap: 16px; }
        }
      `}</style>
    </>
  );
}
