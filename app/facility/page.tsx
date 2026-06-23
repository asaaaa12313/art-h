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

      {/* 살균수 — 노바케어(HOCL) 수관관리 */}
      <section className="novaSec">
        <div className="novaInner">
          <Reveal from="translateX(-20px)" duration="1s">
            <div className="novaImgWrap">
              <Photo
                src="/media/images/equipment/novacare.jpg"
                alt="노바케어 수관관리 시스템 장비"
                sizes="(max-width: 768px) 260px, 300px"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1} duration="0.9s">
            <div className="novaBody">
              <p className="novaEyebrow">WATER STERILIZATION · HOCL</p>
              <h2 className="novaTitle">살균수를 통한<br />청정한 치과수관 관리</h2>
              <p className="novaSystem">노바케어 시스템 (NOVACARE)</p>
              <p className="novaDesc">
                전기분해를 통해 생성된 차아염소산수(HOCL)는 대장균·살모넬라·콜레라·진균·바이러스·사상균·아포균 등 다양한 균주에 대한 강력한 살균력을 보유하고 있습니다.
              </p>
              <p className="novaHighlight">눈에 보이지 않는 진료수까지, 세심하게 관리합니다.</p>
              <ul className="novaChips">
                {['대장균', '살모넬라', '콜레라', '진균', '바이러스', '사상균', '아포균'].map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <div className="novaRange">
                <div className="novaRangeImg">
                  <Photo
                    src="/media/images/equipment/novacare-range.jpg"
                    alt="노바케어 살균 범위 비교 — 알코올·차아염소산나트륨(NaOCl) 대비 아포균·사상균까지 살균"
                    sizes="(max-width: 768px) 220px, 240px"
                    objectFit="contain"
                    bg="#fff"
                  />
                </div>
                <p className="novaRangeCap">
                  알코올·차아염소산나트륨(NaOCl)이 닿지 못하는<br />
                  <strong>아포균·사상균까지</strong> 살균하는 강력한 살균력
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* GBT — 시리지 않은 스케일링 */}
      <section className="gbtSec">
        <div className="gbtInner">
          <Reveal duration="0.9s">
            <div className="gbtBody">
              <p className="gbtEyebrow">PAINLESS SCALING · GBT</p>
              <h2 className="gbtTitle">시리지 않은 스케일링,<br />GBT 에어플로우</h2>
              <p className="gbtSystem">Guided Biofilm Therapy · 스위스 EMS</p>
              <p className="gbtDesc">
                파우더로 섬세하게 바이오필름(세균막)을 관리하고, 초슬림팁으로 부드럽게 치석을 제거합니다. 자극은 줄이고 편안함은 높여, 스케일링이 시려 미뤄오신 분도 부담 없이 받으실 수 있습니다.
              </p>
              <ul className="gbtChips">
                {['파우더 세정', '초슬림팁', '임플란트 관리', '교정장치 케어', '착색 제거'].map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1} from="translateX(20px)" duration="1s">
            <div className="gbtImgWrap">
              <Photo
                src="/media/images/equipment/gbt-airflow.jpg"
                alt="GBT 에어플로우 프로필락시스 마스터 장비"
                sizes="(max-width: 768px) 260px, 360px"
              />
            </div>
          </Reveal>
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

        /* 살균수 — 노바케어(HOCL) */
        .novaSec {
          background: var(--c-navy);
          padding: clamp(60px,8vw,100px) clamp(24px,5vw,80px);
        }
        .novaInner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 300px 1fr;
          gap: clamp(36px,5vw,72px); align-items: center;
        }
        .novaImgWrap {
          position: relative; aspect-ratio: 458 / 805; overflow: hidden;
          border-radius: 3px; background: #fff;
        }
        .novaEyebrow {
          font-family: var(--f-display); font-size: 12px; letter-spacing: 3px;
          color: var(--c-gold-l); margin: 0 0 18px;
        }
        .novaTitle {
          font-family: var(--f-heading); font-size: clamp(24px,3vw,34px);
          font-weight: 700; letter-spacing: -0.03em; color: #fff;
          line-height: 1.35; margin: 0 0 16px;
        }
        .novaSystem {
          font-size: 15px; color: var(--c-gold-l); font-weight: 600; margin: 0 0 24px;
        }
        .novaDesc {
          font-size: 15px; color: rgba(255,255,255,0.82); line-height: 1.95;
          font-weight: 400; margin: 0 0 20px; max-width: 540px;
        }
        .novaHighlight {
          font-family: var(--f-heading); font-size: clamp(17px,2vw,21px);
          font-weight: 700; color: var(--c-gold-l); line-height: 1.5;
          letter-spacing: -0.02em; margin: 0 0 28px;
        }
        .novaChips {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .novaChips li {
          font-size: 12.5px; color: rgba(255,255,255,0.9);
          border: 1px solid rgba(255,255,255,0.22);
          padding: 7px 14px; border-radius: 999px;
        }
        .novaRange {
          display: flex; align-items: center; gap: 22px;
          margin-top: 32px; flex-wrap: wrap;
        }
        .novaRangeImg {
          position: relative; width: 240px; aspect-ratio: 1 / 1;
          background: #fff; border-radius: 8px; overflow: hidden;
          flex-shrink: 0;
        }
        .novaRangeCap {
          font-size: 13.5px; color: rgba(255,255,255,0.72);
          line-height: 1.75; font-weight: 400; margin: 0; flex: 1; min-width: 200px;
        }
        .novaRangeCap strong { color: var(--c-gold-l); font-weight: 700; }

        /* GBT — 시리지 않은 스케일링 */
        .gbtSec {
          background: var(--c-warm);
          padding: clamp(60px,8vw,100px) clamp(24px,5vw,80px);
        }
        .gbtInner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 360px;
          gap: clamp(36px,5vw,72px); align-items: center;
        }
        .gbtEyebrow {
          font-family: var(--f-display); font-size: 12px; letter-spacing: 3px;
          color: var(--c-gold-d); margin: 0 0 18px;
        }
        .gbtTitle {
          font-family: var(--f-heading); font-size: clamp(24px,3vw,34px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--c-navy);
          line-height: 1.35; margin: 0 0 16px;
        }
        .gbtSystem {
          font-size: 15px; color: var(--c-gold-d); font-weight: 600; margin: 0 0 24px;
        }
        .gbtDesc {
          font-size: 15px; color: var(--c-text); line-height: 1.95;
          font-weight: 400; margin: 0 0 28px; max-width: 540px;
        }
        .gbtChips {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .gbtChips li {
          font-size: 12.5px; color: var(--c-navy);
          border: 1px solid var(--c-line);
          padding: 7px 14px; border-radius: 999px; background: #fff;
        }
        .gbtImgWrap {
          position: relative; aspect-ratio: 900 / 1095; overflow: hidden;
          border-radius: 3px; background: #fff;
        }

        @media (max-width: 768px) {
          .roomGrid { grid-template-columns: 1fr; }
          .novaInner { grid-template-columns: 1fr; justify-items: center; text-align: left; }
          .novaImgWrap { width: 260px; }
          .gbtInner { grid-template-columns: 1fr; justify-items: center; text-align: left; }
          .gbtImgWrap { width: 260px; }
        }
      `}</style>
    </>
  );
}
