import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import TextReveal from '@/components/TextReveal';
import AnimatedIcon from '@/components/AnimatedIcon';
import { FACILITY_ROOMS } from '@/lib/copy';

const ROOM_SRC: Record<string, string> = {
  대기실: '/media/images/waiting/waiting-02.jpg',
  진료실: '/media/images/treatment-room/treatment-03.jpg',
  수술실: '/media/images/surgery/surgery-01.jpg',
  상담실: '/media/images/consult/consult-02.jpg',
};

const ROOM_ICON: Record<string, string> = {
  대기실: 'home',
  진료실: 'scan',
  수술실: 'door',
  상담실: 'users',
};

// 프라임스캔 제품 이미지 (덴츠플라이 시로나 제공 원본 → 웹용 최적화)
const PRIMESCAN_SRC = '/media/images/equipment/primescan-01.jpg';

export const metadata: Metadata = {
  alternates: { canonical: '/facility' },
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
          <div className="secHead">
            <Reveal variant="fade">
              <p className="secEyebrow">SPACE</p>
            </Reveal>
            <TextReveal as="h2" className="secTitle" lines={['진료 공간']} delay={0.05} />
          </div>

          <div className="roomGrid">
            {FACILITY_ROOMS.map((s, i) => (
              <Reveal key={s.k} delay={0.08 + i * 0.08} duration="1s" from="scale(0.97)">
                <div className="roomCard">
                  <Photo src={ROOM_SRC[s.k]} alt={`${s.k} 이미지`} sizes="(max-width: 768px) 100vw, 50vw" />
                  <div className="roomOverlay" aria-hidden="true" />
                  <div className="roomLabel">
                    <AnimatedIcon
                      name={ROOM_ICON[s.k]}
                      size={26}
                      stroke="var(--c-blue-l)"
                      delay={0.2 + i * 0.08}
                      className="roomIcon"
                    />
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
          <Reveal variant="blur-up" duration="1s">
            <div className="novaImgWrap">
              <Photo
                src="/media/images/equipment/novacare.jpg"
                alt="노바케어 수관관리 시스템 장비"
                sizes="(max-width: 768px) 260px, 300px"
              />
            </div>
          </Reveal>
          <div className="novaBody">
            <Reveal variant="fade" delay={0.1}>
              <p className="novaEyebrow">WATER STERILIZATION · HOCL</p>
            </Reveal>
            <Reveal variant="fade" delay={0.15}>
              <div className="novaTitleRow">
                <AnimatedIcon name="droplet" size={30} stroke="var(--c-blue-l)" delay={0.35} className="novaTitleIcon" />
                <TextReveal as="h2" className="novaTitle" lines={['살균수를 통한', '청정한 치과수관 관리']} delay={0.2} />
              </div>
            </Reveal>
            <Reveal delay={0.25}>
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
            </Reveal>
            <Reveal variant="blur-up" delay={0.1}>
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
            </Reveal>
          </div>
        </div>
      </section>

      {/* GBT — 시리지 않은 스케일링 */}
      <section className="gbtSec">
        <div className="gbtInner">
          <div className="gbtBody">
            <Reveal variant="fade">
              <p className="gbtEyebrow">PAINLESS SCALING · GBT</p>
            </Reveal>
            <Reveal variant="fade" delay={0.05}>
              <div className="gbtTitleRow">
                <AnimatedIcon name="sparkle" size={30} stroke="var(--c-blue)" delay={0.3} className="gbtTitleIcon" />
                <TextReveal as="h2" className="gbtTitle" lines={['시리지 않은 스케일링,', 'GBT 에어플로우']} delay={0.1} />
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="gbtSystem">Guided Biofilm Therapy · 스위스 EMS</p>
              <p className="gbtDesc">
                파우더로 섬세하게 바이오필름(세균막)을 관리하고, 초슬림팁으로 부드럽게 치석을 제거합니다. 자극은 줄이고 편안함은 높여, 스케일링이 시려 미뤄오신 분도 부담 없이 받으실 수 있습니다.
              </p>
              <ul className="gbtChips">
                {['파우더 세정', '초슬림팁', '임플란트 관리', '교정장치 케어', '착색 제거'].map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal variant="blur-up" delay={0.1} duration="1s">
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

      {/* 프라임스캔 — 디지털 구강스캐너 */}
      <section className="scanSec">
        <div className="scanInner">
          <Reveal variant="blur-up" duration="1s">
            <div className="scanImgCol">
              <div className="scanImgWrap">
                <Photo
                  src={PRIMESCAN_SRC || undefined}
                  bg={PRIMESCAN_SRC ? undefined : 'var(--c-navy-l)'}
                  label={PRIMESCAN_SRC ? undefined : '프라임스캔 이미지 준비중'}
                  alt="프라임스캔 커넥트 디지털 구강스캐너 — 노트북 화면에 3D 스캔된 치아 모형과 스캐너 본체"
                  sizes="(max-width: 768px) 86vw, 560px"
                />
              </div>
              <div className="scanImgWrap2">
                <Photo
                  src="/media/images/equipment/primescan-scanner.jpg"
                  alt="프라임스캔 스캐너 본체 클로즈업 — 크래들에 놓인 무선형 구강 스캐너"
                  sizes="(max-width: 768px) 86vw, 560px"
                />
              </div>
            </div>
          </Reveal>
          <div className="scanBody">
            <Reveal variant="fade" delay={0.1}>
              <p className="scanEyebrow">DIGITAL SCAN · PRIMESCAN</p>
            </Reveal>
            <Reveal variant="fade" delay={0.15}>
              <div className="scanTitleRow">
                <AnimatedIcon name="scan" size={30} stroke="var(--c-blue-l)" delay={0.35} className="scanTitleIcon" />
                <TextReveal as="h2" className="scanTitle" lines={['본뜨지 않는 정밀 인상채득,', '디지털 구강스캐너']} delay={0.2} />
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="scanSystem">프라임스캔 커넥트 · 덴츠플라이 시로나</p>
              <p className="scanDesc">
                고무·석고로 본을 뜨던 기존 방식 대신, 입안을 카메라로 스캔해 3D 디지털 모형을 즉시 만듭니다. 구역질 나는 인상재가 없어 편안하고, 빠르며, 다시 찍기도 간편합니다.
              </p>
              <p className="scanHighlight">불편한 본뜨기 없이, 정밀하고 편안하게.</p>
              <ul className="scanChips">
                {['인상재 없음', '구역질 감소', '빠른 스캔', '3D 정밀', '임플란트·보철·교정'].map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            </Reveal>
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
          transition: transform .35s var(--ease-out), box-shadow .35s var(--ease-out);
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
        .roomIcon { margin-bottom: 8px; opacity: 0.95; }
        @media (hover: hover) {
          .roomCard:hover {
            transform: translateY(-4px);
            box-shadow: 0 22px 46px rgba(46,111,212,.22);
          }
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
        .novaTitleRow {
          display: flex; align-items: flex-start; gap: 12px; margin: 0 0 16px;
        }
        .novaTitleIcon { flex-shrink: 0; margin-top: 4px; }
        .novaTitle {
          font-family: var(--f-heading); font-size: clamp(24px,3vw,34px);
          font-weight: 700; letter-spacing: -0.03em; color: #fff;
          line-height: 1.35; margin: 0;
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
        .gbtTitleRow {
          display: flex; align-items: flex-start; gap: 12px; margin: 0 0 16px;
        }
        .gbtTitleIcon { flex-shrink: 0; margin-top: 4px; }
        .gbtTitle {
          font-family: var(--f-heading); font-size: clamp(24px,3vw,34px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--c-navy);
          line-height: 1.35; margin: 0;
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

        /* 프라임스캔 — 디지털 구강스캐너 (이미지 좌 / 텍스트 우, 네이비) */
        .scanSec {
          background: var(--c-navy);
          padding: clamp(60px,8vw,100px) clamp(24px,5vw,80px);
        }
        .scanInner {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1.1fr 0.9fr;
          gap: clamp(36px,5vw,72px); align-items: start;
        }
        .scanImgCol {
          display: flex; flex-direction: column; gap: 14px;
        }
        .scanImgWrap {
          position: relative; aspect-ratio: 3 / 2; overflow: hidden;
          border-radius: 3px; background: #fff;
        }
        .scanImgWrap2 {
          position: relative; aspect-ratio: 16 / 9; overflow: hidden;
          border-radius: 3px; background: #fff;
        }
        .scanEyebrow {
          font-family: var(--f-display); font-size: 12px; letter-spacing: 3px;
          color: var(--c-gold-l); margin: 0 0 18px;
        }
        .scanTitleRow {
          display: flex; align-items: flex-start; gap: 12px; margin: 0 0 16px;
        }
        .scanTitleIcon { flex-shrink: 0; margin-top: 4px; }
        .scanTitle {
          font-family: var(--f-heading); font-size: clamp(24px,3vw,34px);
          font-weight: 700; letter-spacing: -0.03em; color: #fff;
          line-height: 1.35; margin: 0;
        }
        .scanSystem {
          font-size: 15px; color: var(--c-gold-l); font-weight: 600; margin: 0 0 24px;
        }
        .scanDesc {
          font-size: 15px; color: rgba(255,255,255,0.82); line-height: 1.95;
          font-weight: 400; margin: 0 0 20px; max-width: 540px;
        }
        .scanHighlight {
          font-family: var(--f-heading); font-size: clamp(17px,2vw,21px);
          font-weight: 700; color: var(--c-gold-l); line-height: 1.5;
          letter-spacing: -0.02em; margin: 0 0 28px;
        }
        .scanChips {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .scanChips li {
          font-size: 12.5px; color: rgba(255,255,255,0.9);
          border: 1px solid rgba(255,255,255,0.22);
          padding: 7px 14px; border-radius: 999px;
        }

        @media (max-width: 768px) {
          .roomGrid { grid-template-columns: 1fr; }
          .novaInner { grid-template-columns: 1fr; justify-items: center; text-align: left; }
          .novaImgWrap { width: 260px; }
          .gbtInner { grid-template-columns: 1fr; justify-items: center; text-align: left; }
          .gbtImgWrap { width: 260px; }
          .scanInner { grid-template-columns: 1fr; justify-items: center; text-align: left; }
          .scanImgCol { width: min(420px, 86vw); }
        }
      `}</style>
    </>
  );
}
