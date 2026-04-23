import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import KakaoMap from '@/components/KakaoMap';
import BookingLink from '@/components/BookingLink';
import { V } from '@/lib/visuals';
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
                  인천광역시 연수구 송도동<br />송도국제업무단지 C8-2블럭<br />업무복합시설
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} duration="0.7s">
              <div style={{ marginBottom: 36 }}>
                <p className="label">CONTACT</p>
                <p style={{ fontFamily: 'var(--f-heading)', fontSize: 28, color: 'var(--c-dark)', fontWeight: 600, letterSpacing: '-0.01em', margin: '0 0 4px' }}>
                  <a href={`tel:${SITE.phone.replace(/-/g, '')}`}>{SITE.phone}</a>
                </p>
                <p style={{ fontSize: 12, color: 'var(--c-text3)', margin: 0 }}>* 개원 시 확정</p>
              </div>
            </Reveal>
            <Reveal delay={0.15} duration="0.7s">
              <div style={{ marginBottom: 28 }}>
                <p className="label">BOOKING</p>
                <BookingLink variant="gold">네이버 예약</BookingLink>
              </div>
            </Reveal>
            <Reveal delay={0.2} duration="0.7s">
              <div>
                <p className="label">PARKING · TRANSIT</p>
                <p style={{ fontSize: 14, color: 'var(--c-text2)', fontWeight: 300, margin: 0, lineHeight: 1.8 }}>
                  건물 내 지하주차장 무료<br />1호선 국제업무지구역<br />버스 203, 205, 223, 304번
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
                    <span style={{ color: h.highlight ? 'var(--c-gold)' : 'var(--c-text)', fontWeight: h.highlight ? 600 : 300 }}>
                      {h.time}
                    </span>
                  </div>
                ))}
                <p style={{ fontSize: 12, color: 'var(--c-text3)', marginTop: 8 }}>* 개원 시 확정</p>
              </div>
            </Reveal>
            <Reveal delay={0.45} duration="1s" from="scale(0.97)">
              <div className="mapBox">
                <KakaoMap label={SITE.name} />
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
          border-radius: 2px; overflow: hidden; aspect-ratio: 16/10;
        }
        @media (max-width: 768px) {
          .locGrid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
