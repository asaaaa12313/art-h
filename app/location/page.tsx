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
      <PageHeader title="오시는길" src="/media/images/exterior/exterior-02.jpg" alt="송도 IBS타워 외관" />

      <section style={{ background: 'var(--c-bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div className="locGrid">
          <div>
            <Reveal duration="0.7s">
              <div style={{ marginBottom: 36 }}>
                <p className="label">ADDRESS</p>
                <p className="locText">
                  인천광역시 연수구 센트럴로 263<br />IBS타워 업무동 8층<br />송도국제업무단지
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
            <Reveal delay={0.18} duration="0.7s">
              <div style={{ marginBottom: 32 }}>
                <p className="label">PARKING</p>
                <p className="locText">
                  지하 1~3층 주차 가능 (업무동·판매동 모두 가능)<br />
                  내원 시 ‘업무동 저층용’ 엘리베이터 탑승 후 8층
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.24} duration="0.7s">
              <div style={{ marginBottom: 32 }}>
                <p className="label">SUBWAY</p>
                <p className="locText">
                  인천1호선 국제업무지구역 5번 출구 470m<br />
                  (G타워 방면)
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3} duration="0.7s">
              <div style={{ marginBottom: 32 }}>
                <p className="label">BUS</p>
                <p className="locText">
                  정류장 38515 · 경제자유구역청 하차<br />
                  송도 푸르지오하버뷰 방면<br />
                  간선 82 / 92(급행) / 42(순환) / 43(순환)
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.36} duration="0.7s">
              <div style={{ marginBottom: 32 }}>
                <p className="label">WALK</p>
                <p className="locText">
                  국제업무지구역 1번 출구 도보 10분<br />
                  센트럴파크역 3번 출구 도보 10분
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.42} duration="0.7s">
              <div>
                <p className="label">CAR</p>
                <p className="locText">
                  내비게이션: ‘연수구 센트럴로 263’ 검색<br />
                  송도 IBS타워 업무동 8층
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
        .locText {
          font-size: 14.5px; color: var(--c-text); font-weight: 400;
          margin: 0; line-height: 1.85;
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
