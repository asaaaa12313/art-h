import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import MapEmbed from '@/components/MapEmbed';
import { SITE } from '@/lib/copy';

export const metadata: Metadata = {
  title: '오시는길',
  description: `${SITE.address} · ${SITE.phone}. 주차 · 대중교통 안내.`,
};

export default function LocationPage() {
  return (
    <>
      <PageHeader title="오시는길" src="/media/images/exterior/exterior-02.jpg" alt="송도국제업무단지 건물 외관" />

      <section style={{ background: 'var(--c-bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div className="locGrid">
          <div>
            <Reveal duration="0.7s">
              <div style={{ marginBottom: 36 }}>
                <p className="label">ADDRESS</p>
                <p style={{ fontSize: 16, color: 'var(--c-text)', fontWeight: 400, margin: 0, lineHeight: 1.8 }}>
                  인천 연수구 인천타워대로 365<br />힐스테이트 송도 더스카이<br />송도국제업무단지
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} duration="0.7s">
              <div style={{ marginBottom: 36 }}>
                <p className="label">CONTACT</p>
                <p style={{ fontFamily: 'var(--f-heading)', fontSize: 28, color: 'var(--c-navy)', fontWeight: 600, letterSpacing: '-0.01em', margin: 0 }}>
                  <a href={`tel:${SITE.phone.replace(/-/g, '')}`}>{SITE.phone}</a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.2} duration="0.7s">
              <div>
                <p className="label">PARKING · TRANSIT</p>
                <p style={{ fontSize: 14, color: 'var(--c-text)', fontWeight: 400, margin: 0, lineHeight: 1.8 }}>
                  건물 내 지하주차장 이용<br />인천1호선 국제업무지구역<br />3번 출구에서 202m
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.1} duration="0.7s">
              <div style={{ marginBottom: 32 }}>
                <p className="label">HOURS</p>
                {SITE.hours.map((h, i) => (
                  <div
                    key={h.day}
                    className="hourRow"
                    style={{
                      animationDelay: `${0.15 + i * 0.04}s`,
                    }}
                  >
                    <span style={{ color: 'var(--c-text)' }}>{h.day}</span>
                    <span style={{ color: h.highlight ? 'var(--c-gold)' : 'var(--c-text)', fontWeight: h.highlight ? 600 : 400 }}>
                      {h.time}
                    </span>
                  </div>
                ))}
                <p style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 8 }}>* 점심시간은 토요일에 적용되지 않습니다</p>
              </div>
            </Reveal>
            <Reveal delay={0.45} duration="1s" from="scale(0.97)">
              <div className="mapBox">
                <MapEmbed label={SITE.name} naverPlaceUrl={SITE.naverPlace} />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        .locGrid {
          max-width: 900px; margin: 0 auto;
          display: grid; grid-template-columns: 5fr 4fr;
          gap: clamp(40px, 5vw, 72px);
        }
        .label {
          font-size: 12px; color: var(--c-text3); letter-spacing: 3px; margin-bottom: 10px;
        }
        .hourRow {
          display: flex; justify-content: space-between;
          padding: 10px 0; border-bottom: 1px solid var(--c-line);
          font-size: 14px;
        }
        .mapBox {
          border-radius: 2px; overflow: hidden; min-height: 380px;
          display: flex; flex-direction: column;
        }
        @media (max-width: 768px) {
          .locGrid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
