'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import Lightbox, { LightboxImage } from '@/components/Lightbox';
import { FACILITY_ROOMS, EQUIPMENTS } from '@/lib/copy';

// 시설 · 장비 상세 갤러리 매핑
const ROOM_GALLERY: Record<string, { cover: string; desc: string; images: LightboxImage[] }> = {
  대기실: {
    cover: '/media/images/waiting/waiting-02.jpg',
    desc: '도시를 바라보는 창과 부드러운 간접조명. 치료 전의 긴장을 내려놓을 수 있는 라운지.',
    images: [
      { src: '/media/images/waiting/waiting-02.jpg', alt: '아트에이치치과 대기실 전경', caption: '창밖 송도 도시 뷰와 함께하는 라운지' },
      { src: '/media/images/waiting/waiting-01.jpg', alt: '대기실 좌석과 조명', caption: '부드러운 간접조명과 좌석' },
      { src: '/media/images/waiting/waiting-logo.jpg', alt: 'AH 로고 사인', caption: '대기실 브랜드 사인' },
    ],
  },
  진료실: {
    cover: '/media/images/treatment-room/treatment-03.jpg',
    desc: 'OSSTEM 유니트 체어와 자연광이 비치는 창문. 쾌적한 진료 환경.',
    images: [
      { src: '/media/images/treatment-room/treatment-03.jpg', alt: '진료실 전경', caption: '창 가를 따라 배치된 진료 체어' },
      { src: '/media/images/treatment-room/treatment-01.jpg', alt: '진료실 체어', caption: 'OSSTEM 진료 유니트 체어' },
      { src: '/media/images/treatment-room/treatment-02.jpg', alt: '진료실 디테일', caption: '모니터와 장비 배치' },
    ],
  },
  수술실: {
    cover: '/media/images/surgery/surgery-01.jpg',
    desc: '임플란트·사랑니 등 외과적 처치를 위한 분리된 수술실. 감염 위험을 최소화합니다.',
    images: [
      { src: '/media/images/surgery/surgery-01.jpg', alt: '독립 수술실 전경', caption: '독립 수술실 · OSSTEM 유니트' },
      { src: '/media/images/surgery/surgery-02.jpg', alt: '수술실 조명과 세부', caption: '포인트 네이비 월과 수술용 조명' },
    ],
  },
  상담실: {
    cover: '/media/images/consult/consult-01.jpg',
    desc: '1:1 상담을 위한 밝고 조용한 공간. 치료 계획을 함께 그려갑니다.',
    images: [
      { src: '/media/images/consult/consult-01.jpg', alt: '상담실 전경', caption: '창 너머 도시를 바라보는 상담실' },
      { src: '/media/images/consult/consult-02.jpg', alt: '상담실 좌석', caption: '1:1 상담을 위한 테이블' },
    ],
  },
};

const EQ_GALLERY: Record<string, { cover: string; images: LightboxImage[] }> = {
  '3D CT · 구강 스캐너': {
    cover: '/media/images/xray/xray-01.jpg',
    images: [
      { src: '/media/images/xray/xray-01.jpg', alt: 'Vatech 3D CT 파노라마', caption: 'Vatech 3D CT 파노라마 — 저선량 정밀 영상' },
      { src: '/media/images/xray/xray-02.jpg', alt: 'CT 영상 촬영', caption: '3D CT 영상' },
    ],
  },
  'CAD/CAM CEREC': {
    cover: '/media/images/equipment/equipment-02.jpg',
    images: [
      { src: '/media/images/equipment/equipment-02.jpg', alt: 'CAD/CAM 장비', caption: 'CAD/CAM 보철 제작 시스템' },
      { src: '/media/images/equipment/equipment-03.jpg', alt: 'CEREC 디테일', caption: '디지털 밀링 프로세스' },
    ],
  },
  '디지털 엑스레이': {
    cover: '/media/images/xray/xray-02.jpg',
    images: [
      { src: '/media/images/xray/xray-02.jpg', alt: '디지털 엑스레이', caption: '저선량 디지털 엑스레이' },
      { src: '/media/images/xray/xray-01.jpg', alt: '엑스레이 전경', caption: '엑스레이 룸 전경' },
    ],
  },
  '미세 현미경': {
    cover: '/media/images/equipment/equipment-01.jpg',
    images: [
      { src: '/media/images/equipment/equipment-01.jpg', alt: '치과용 장비 클로즈업', caption: '정밀 치료 장비 — GBT 에어플로우' },
      { src: '/media/images/equipment/equipment-03.jpg', alt: '진료 장비', caption: '장비 세부' },
    ],
  },
};

export default function FacilityPage() {
  const [lb, setLb] = useState<{ open: boolean; title: string; images: LightboxImage[]; index: number }>({
    open: false, title: '', images: [], index: 0,
  });

  const openLightbox = (title: string, images: LightboxImage[], index = 0) => {
    setLb({ open: true, title, images, index });
  };
  const closeLightbox = () => setLb((s) => ({ ...s, open: false }));

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
              <p className="secSub">각 공간을 눌러 사진을 더 자세히 보실 수 있습니다.</p>
            </div>
          </Reveal>

          <div className="roomGrid">
            {FACILITY_ROOMS.map((s, i) => {
              const gallery = ROOM_GALLERY[s.k];
              const count = gallery?.images.length || 0;
              return (
                <Reveal key={s.k} delay={0.08 + i * 0.08} duration="1s" from="scale(0.97)">
                  <button
                    type="button"
                    className="roomCard"
                    onClick={() => gallery && openLightbox(`${s.k} · ${s.e}`, gallery.images)}
                    aria-label={`${s.k} 갤러리 열기 (${count}장)`}
                  >
                    <Photo src={gallery?.cover} alt={`${s.k} 이미지`} sizes="(max-width: 768px) 100vw, 50vw" />
                    <div className="roomOverlay" aria-hidden="true" />
                    <div className="roomBadge" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="14" height="14">
                        <path fill="currentColor" d="M21 19V5a2 2 0 00-2-2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2zM8.9 13.98l2.1 2.53L14 12.5l4 5H6l2.9-3.52z"/>
                      </svg>
                      <span>{count}</span>
                    </div>
                    <div className="roomLabel">
                      <span className="roomE">{s.e}</span>
                      <span className="roomK">{s.k}</span>
                      {gallery?.desc && <span className="roomDesc">{gallery.desc}</span>}
                    </div>
                  </button>
                </Reveal>
              );
            })}
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
              <p className="secSub">정밀한 진단과 예측 가능한 치료를 위한 디지털 장비.</p>
            </div>
          </Reveal>

          {EQUIPMENTS.map((eq, i) => {
            const gallery = EQ_GALLERY[eq.n];
            const count = gallery?.images.length || 0;
            return (
              <Reveal key={eq.n} delay={0.05 + i * 0.06} duration="0.6s">
                <button
                  type="button"
                  className="eqRow"
                  onClick={() => gallery && openLightbox(eq.n, gallery.images)}
                  aria-label={`${eq.n} 사진 보기`}
                >
                  <div className="eqImg">
                    <Photo src={gallery?.cover} alt={`${eq.n} 이미지`} sizes="160px" />
                  </div>
                  <div className="eqInfo">
                    <h3 className="eqN">{eq.n}</h3>
                    <p className="eqD">{eq.d}</p>
                  </div>
                  <span className="eqMore" aria-hidden="true">
                    사진 {count}장 →
                  </span>
                </button>
              </Reveal>
            );
          })}
        </div>
      </section>

      <Lightbox
        open={lb.open}
        images={lb.images}
        index={lb.index}
        title={lb.title}
        onClose={closeLightbox}
        onChange={(i) => setLb((s) => ({ ...s, index: i }))}
      />

      <style>{`
        .secHead { text-align: center; margin-bottom: clamp(40px,5vw,60px); }
        .secEyebrow {
          font-size: 11px; color: var(--c-navy); opacity: 0.7; letter-spacing: 4px;
          font-weight: 700; margin: 0 0 12px;
        }
        .secTitle {
          font-family: var(--f-heading); font-size: clamp(24px,3vw,34px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--c-navy);
          margin: 0 0 14px;
        }
        .secSub {
          font-size: 14px; color: var(--c-text2); line-height: 1.8; margin: 0;
        }

        .roomGrid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 12px;
        }
        .roomCard {
          position: relative; overflow: hidden; aspect-ratio: 16/10;
          padding: 0; border: none; cursor: pointer;
          background: var(--c-warm);
          transition: transform 0.4s var(--ease-out);
        }
        .roomCard:hover { transform: translateY(-4px); }
        .roomOverlay {
          position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(15,26,53,0.05) 0%, rgba(15,26,53,0.72) 100%);
          transition: background 0.4s;
        }
        .roomCard:hover .roomOverlay {
          background: linear-gradient(180deg, rgba(15,26,53,0.02) 0%, rgba(15,26,53,0.55) 100%);
        }
        .roomBadge {
          position: absolute; top: 14px; right: 14px; z-index: 2;
          display: inline-flex; align-items: center; gap: 4px;
          padding: 5px 10px; border-radius: 999px;
          background: rgba(255,255,255,0.92); color: var(--c-navy);
          font-size: 11px; font-weight: 700; letter-spacing: 0.3px;
        }
        .roomLabel {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 0 24px 22px; z-index: 2;
          display: flex; flex-direction: column; gap: 4px;
          text-align: left;
        }
        .roomE {
          font-family: var(--f-display); font-size: 11px;
          color: var(--c-gold-l); letter-spacing: 2px;
        }
        .roomK { font-size: 20px; color: #fff; font-weight: 700; letter-spacing: -0.02em; }
        .roomDesc {
          font-size: 12px; color: rgba(255,255,255,0.8); line-height: 1.6;
          margin-top: 4px; font-weight: 400;
        }

        .eqRow {
          width: 100%;
          display: grid; grid-template-columns: 140px 1fr auto;
          gap: 24px; padding: 22px 0;
          border-bottom: 1px solid var(--c-line); align-items: center;
          background: none; border-left: none; border-right: none; border-top: none;
          cursor: pointer; text-align: left;
          transition: padding 0.3s var(--ease-out);
        }
        .eqRow:hover { padding-left: 8px; padding-right: 8px; }
        .eqRow:hover .eqMore { color: var(--c-navy); transform: translateX(4px); }
        .eqImg { border-radius: 2px; overflow: hidden; aspect-ratio: 4/3; }
        .eqInfo { min-width: 0; }
        .eqN {
          font-size: 16px; color: var(--c-navy); font-weight: 700;
          margin: 0 0 6px; letter-spacing: -0.02em;
        }
        .eqD { font-size: 14px; color: var(--c-text); font-weight: 400; line-height: 1.7; margin: 0; }
        .eqMore {
          font-size: 12px; color: var(--c-text3); letter-spacing: 0.3px;
          font-family: var(--f-display);
          transition: color 0.3s, transform 0.3s var(--ease-out);
          white-space: nowrap;
        }

        @media (max-width: 768px) {
          .roomGrid { grid-template-columns: 1fr; }
          .eqRow { grid-template-columns: 100px 1fr; gap: 16px; }
          .eqMore { display: none; }
        }
      `}</style>
    </>
  );
}
