import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import AnimatedIcon from '@/components/AnimatedIcon';
import MapEmbed from '@/components/MapEmbed';
import { SITE } from '@/lib/copy';

export const metadata: Metadata = {
  alternates: { canonical: '/location' },
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
              <div className="infoItem" style={{ marginBottom: 36 }}>
                <p className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <AnimatedIcon name="pin" size={22} stroke="var(--c-blue)" delay={0.2} />
                  ADDRESS
                </p>
                <p className="locText">
                  인천광역시 연수구 센트럴로 263<br />IBS타워 업무동 8층<br />송도국제업무단지
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} duration="0.7s">
              <div className="infoItem" style={{ marginBottom: 36 }}>
                <p className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <AnimatedIcon name="phone" size={22} stroke="var(--c-blue)" delay={0.3} />
                  CONTACT
                </p>
                <p style={{ fontFamily: 'var(--f-heading)', fontSize: 28, color: 'var(--c-navy)', fontWeight: 600, letterSpacing: '-0.01em', margin: 0 }}>
                  <a href={`tel:${SITE.phone.replace(/-/g, '')}`}>{SITE.phone}</a>
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.18} duration="0.7s">
              <div className="infoItem" style={{ marginBottom: 32 }}>
                <p className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <AnimatedIcon name="car" size={22} stroke="var(--c-blue)" delay={0.38} />
                  PARKING
                </p>
                <p className="locText">
                  지하 1~3층 주차 가능 (업무동·판매동 모두 가능)<br />
                  내원 시 ‘업무동 저층용’ 엘리베이터 탑승 후 8층
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.24} duration="0.7s">
              <div className="infoItem" style={{ marginBottom: 32 }}>
                <p className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <AnimatedIcon name="train" size={22} stroke="var(--c-blue)" delay={0.44} />
                  SUBWAY
                </p>
                <p className="locText">
                  인천1호선 국제업무지구역 5번 출구 470m<br />
                  (G타워 방면)
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3} duration="0.7s">
              <div className="infoItem" style={{ marginBottom: 32 }}>
                <p className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <AnimatedIcon name="bus" size={22} stroke="var(--c-blue)" delay={0.5} />
                  BUS
                </p>
                <p className="locText">
                  정류장 38515 · 경제자유구역청 하차<br />
                  송도 푸르지오하버뷰 방면<br />
                  간선 82 / 92(급행) / 42(순환) / 43(순환)
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.36} duration="0.7s">
              <div className="infoItem" style={{ marginBottom: 32 }}>
                <p className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <AnimatedIcon name="walk" size={22} stroke="var(--c-blue)" delay={0.56} />
                  WALK
                </p>
                <p className="locText">
                  국제업무지구역 1번 출구 도보 10분<br />
                  센트럴파크역 3번 출구 도보 10분
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.42} duration="0.7s">
              <div className="infoItem">
                <p className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <AnimatedIcon name="car" size={22} stroke="var(--c-blue)" delay={0.62} />
                  CAR
                </p>
                <p className="locText">
                  내비게이션: ‘연수구 센트럴로 263’ 검색<br />
                  송도 IBS타워 업무동 8층
                </p>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.1} duration="0.7s">
              <div className="infoItem" style={{ marginBottom: 32 }}>
                <p className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <AnimatedIcon name="clock" size={22} stroke="var(--c-blue)" delay={0.3} />
                  HOURS
                </p>
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
            <Reveal variant="blur-up" delay={0.45} duration="1s">
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
        .infoItem {
          padding: 12px 20px;
          margin-left: -20px; margin-right: -20px;
          border-radius: 6px;
          border: 1px solid transparent;
          transition: transform .3s var(--ease-out), box-shadow .3s var(--ease-out), border-color .3s var(--ease-out), background-color .3s var(--ease-out);
        }
        @media (hover: hover) {
          .infoItem:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, .55);
            box-shadow: 0 12px 30px rgba(15, 26, 53, .08);
            border-color: var(--c-line);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .infoItem { transition: none; }
          .infoItem:hover { transform: none; }
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
          border-radius: 2px; overflow: hidden;
          min-height: 460px;
          display: flex; flex-direction: column;
        }
        @media (max-width: 768px) {
          .locGrid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
