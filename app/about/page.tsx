import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { GREETING, PROMISE_ITEMS } from '@/lib/copy';

export const metadata: Metadata = {
  title: '의원소개',
  description:
    '진료 너머, 사람의 고귀함을 생각합니다. 구강악안면외과 · 치과보존과 전문의 협진으로 정교한 진료에 환자를 향한 깊은 시선을 더합니다.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="의원소개" src="/media/images/waiting/waiting-logo.jpg" alt="아트에이치치과 AH 로고" />

      {/* GREETING — 원장 인사말 */}
      <section style={{ background: 'var(--c-bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div className="greetGrid">
          <Reveal duration="1.1s" from="translateY(24px)">
            <div className="greetImg">
              <Photo
                src="/media/images/doctor/doctor-03.jpg"
                label="대표원장 최종원"
                alt="최종원 대표원장"
                sizes="(max-width: 768px) 100vw, 40vw"
                objectPosition="center 25%"
              />
            </div>
          </Reveal>
          <div className="greetBody">
            <Reveal duration="0.7s">
              <p className="greetEyebrow">GREETINGS</p>
            </Reveal>
            <Reveal delay={0.1} duration="1s">
              <h2 className="greetHeadline">{GREETING.headline}</h2>
            </Reveal>
            <Reveal delay={0.2} duration="0.9s">
              <p className="greetIntro">{GREETING.intro}</p>
            </Reveal>
            {GREETING.body.map((paragraph, i) => (
              <Reveal key={i} delay={0.3 + i * 0.1} duration="0.9s">
                <p className="greetPara">{paragraph}</p>
              </Reveal>
            ))}
            <Reveal delay={0.5} duration="0.6s">
              <div className="greetSign">
                <div className="signLine" />
                <div>
                  <p className="signRole">{GREETING.authorTitle}</p>
                  <p className="signName">{GREETING.author} <span>{GREETING.authorSpecialty}</span></p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ART H의 약속 */}
      <section style={{ background: 'var(--c-warm)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="promiseHead">
            <Reveal duration="0.7s">
              <p className="promiseEyebrow">OUR PROMISE</p>
            </Reveal>
            <Reveal delay={0.1} duration="0.9s">
              <h2 className="promiseTitle">Art H의 약속</h2>
            </Reveal>
            <Reveal delay={0.2} duration="0.9s">
              <p className="promiseLead">
                진료는 기술이지만, 진료 너머의 경험은 사람을 향한 태도에서 나옵니다.
              </p>
            </Reveal>
          </div>

          <div className="promiseGrid">
            {PROMISE_ITEMS.map((item, i) => (
              <Reveal key={item.no} delay={0.15 + i * 0.08} duration="0.8s" from="translateY(20px)">
                <article className="promiseCard">
                  <span className="promiseNo">{item.no}</span>
                  <h3 className="promiseCardTitle">{item.t}</h3>
                  <p className="promiseCardDesc">{item.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING — 에필로그 */}
      <section style={{ background: 'var(--c-bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <Reveal duration="1.1s">
          <div className="closing">
            <div className="closingDivider" />
            <p className="closingText">{GREETING.closing}</p>
          </div>
        </Reveal>
      </section>

      {/* 풀블리드 이미지 */}
      <Reveal duration="1.4s" from="scale(1.02)">
        <div style={{ height: 400, overflow: 'hidden' }}>
          <Photo
            src="/media/images/exterior/exterior-01.jpg"
            label="송도국제업무단지 · 힐스테이트 송도 더스카이"
            alt="아트에이치치과 건물 외관"
            sizes="100vw"
          />
        </div>
      </Reveal>

      <style>{`
        /* Greeting */
        .greetGrid {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 4fr 5fr;
          gap: clamp(40px, 5vw, 80px); align-items: center;
        }
        .greetImg {
          border-radius: 2px; overflow: hidden;
          aspect-ratio: 4/5;
          box-shadow: 0 20px 50px rgba(15, 26, 53, 0.08);
        }
        .greetBody { padding: 8px 0; }
        .greetEyebrow {
          font-size: 11px; color: var(--c-gold); letter-spacing: 4px;
          font-weight: 600; margin: 0 0 18px;
        }
        .greetHeadline {
          font-family: var(--f-heading); font-size: clamp(24px, 3vw, 34px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--c-navy);
          line-height: 1.4; margin: 0 0 32px; white-space: pre-line;
        }
        .greetIntro {
          font-size: 16px; color: var(--c-text); font-weight: 500;
          line-height: 1.9; margin: 0 0 20px;
        }
        .greetPara {
          font-size: 15px; color: var(--c-text2); font-weight: 400;
          line-height: 2.1; margin: 0 0 16px;
        }
        .greetSign {
          display: flex; align-items: center; gap: 16px;
          margin-top: 36px; padding-top: 28px;
          border-top: 1px solid var(--c-line);
        }
        .signLine { width: 40px; height: 1px; background: var(--c-gold); flex-shrink: 0; }
        .signRole {
          font-size: 11px; color: var(--c-text3); letter-spacing: 3px;
          margin: 0 0 4px; font-weight: 500;
        }
        .signName {
          font-size: 17px; color: var(--c-navy); font-weight: 700;
          letter-spacing: -0.01em; margin: 0;
        }
        .signName span {
          font-size: 13px; color: var(--c-text2); font-weight: 400;
          letter-spacing: 0; margin-left: 10px;
        }

        /* Promise */
        .promiseHead { text-align: center; margin-bottom: clamp(48px, 6vw, 72px); }
        .promiseEyebrow {
          font-size: 11px; color: var(--c-gold); letter-spacing: 4px;
          font-weight: 600; margin: 0 0 14px;
        }
        .promiseTitle {
          font-family: var(--f-heading); font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--c-navy);
          margin: 0 0 18px;
        }
        .promiseLead {
          font-size: 15px; color: var(--c-text2); line-height: 1.9;
          max-width: 520px; margin: 0 auto; font-weight: 400;
        }
        .promiseGrid {
          display: grid; grid-template-columns: repeat(2, 1fr);
          gap: 1px; background: var(--c-line);
          border: 1px solid var(--c-line);
        }
        .promiseCard {
          background: var(--c-white); padding: clamp(28px, 3.5vw, 48px);
          display: flex; flex-direction: column; gap: 14px;
          transition: background 0.4s ease;
          min-height: 220px;
        }
        .promiseCard:hover { background: #FCFAF5; }
        .promiseNo {
          font-family: var(--f-display); font-size: 15px; color: var(--c-gold);
          letter-spacing: 4px; font-weight: 400;
        }
        .promiseCardTitle {
          font-family: var(--f-heading); font-size: clamp(17px, 1.8vw, 21px);
          font-weight: 700; letter-spacing: -0.02em;
          color: var(--c-navy); margin: 0;
        }
        .promiseCardDesc {
          font-size: 14px; color: var(--c-text2); line-height: 1.9;
          font-weight: 400; margin: 0;
        }

        /* Closing */
        .closing {
          max-width: 720px; margin: 0 auto; text-align: center;
          display: flex; flex-direction: column; align-items: center; gap: 28px;
        }
        .closingDivider {
          width: 36px; height: 1px; background: var(--c-gold);
        }
        .closingText {
          font-family: var(--f-heading); font-size: clamp(16px, 1.9vw, 22px);
          color: var(--c-navy); font-weight: 500; line-height: 1.9;
          letter-spacing: -0.02em; margin: 0;
        }

        @media (max-width: 768px) {
          .greetGrid { grid-template-columns: 1fr; }
          .greetImg { max-width: 360px; margin: 0 auto; aspect-ratio: 4/5; }
          .promiseGrid { grid-template-columns: 1fr; }
          .promiseCard { min-height: auto; }
        }
      `}</style>
    </>
  );
}
