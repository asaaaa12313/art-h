import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { DOCTORS } from '@/lib/copy';

export const metadata: Metadata = {
  title: '의료진',
  description:
    '구강외과(최종원 원장) · 보존과(강지수 원장) 전문의 협진. 각 분야 전문의가 한 자리에서 정확하게 진단하고 끝까지 책임집니다.',
};

export default function DoctorPage() {
  return (
    <>
      <PageHeader title="의료진" src="/media/images/doctor/doctor-02.jpg" alt="의료진 협진" objectPosition="center 25%" />

      <section style={{ background: 'var(--c-bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto 80px', textAlign: 'center' }}>
          <Reveal duration="0.8s">
            <p style={{ fontSize: 12, color: 'var(--c-gold)', letterSpacing: 4, margin: '0 0 14px', fontWeight: 500 }}>
              PROFESSIONAL COLLABORATION
            </p>
          </Reveal>
          <Reveal delay={0.1} duration="0.9s">
            <h2 style={{ fontFamily: 'var(--f-heading)', fontSize: 'clamp(24px,3vw,34px)', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--c-navy)', lineHeight: 1.5, margin: '0 0 20px' }}>
              구강외과 · 보존과<br />전문의 협진
            </h2>
          </Reveal>
          <Reveal delay={0.2} duration="0.9s">
            <p style={{ fontSize: 16, color: 'var(--c-text2)', lineHeight: 2, fontWeight: 400, margin: 0 }}>
              수술은 정교하게, 자연치아는 끝까지. 각 분야의 전문의가<br />한 자리에서 정확하게 진단하고, 끝까지 책임집니다.
            </p>
          </Reveal>
        </div>

        {DOCTORS.map((doc, i) => (
          <div key={doc.name} className="docBlock" data-reverse={i % 2 === 1}>
            <Reveal duration="1.1s" from="translateY(24px)">
              <div className="docSticky">
                <Photo
                  src={doc.photo}
                  label={`${doc.name} 원장`}
                  alt={`${doc.name} ${doc.title}`}
                  sizes="(max-width: 768px) 100vw, 40vw"
                  objectPosition={doc.objectPosition}
                />
              </div>
            </Reveal>
            <div className="docBody">
              <Reveal delay={0.1} duration="0.6s">
                <p className="docRole">{doc.title.toUpperCase()}</p>
              </Reveal>
              <Reveal delay={0.15} duration="0.7s">
                <h3 className="docName">
                  <span className="docNameKo">{doc.name}</span>
                  <span className="docNameRole">{doc.title}</span>
                </h3>
              </Reveal>
              <Reveal delay={0.2} duration="0.7s">
                <p className="docSpec">{doc.specialty}</p>
              </Reveal>
              <Reveal delay={0.25} duration="0.7s">
                <p className="docFocus">{doc.focus}</p>
              </Reveal>
              <Reveal delay={0.3} duration="0.9s">
                <div className="docQuote">
                  <p>{doc.quote}</p>
                </div>
              </Reveal>
              <Reveal delay={0.35} duration="0.5s">
                <div className="docDivider" />
              </Reveal>
              {doc.career.map((c, j) => (
                <Reveal key={c} delay={0.4 + j * 0.05} duration="0.5s">
                  <p className="docCareer" style={{ borderLeftColor: j === 0 ? 'var(--c-gold)' : 'var(--c-line)' }}>
                    {c}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>

      <style>{`
        .docBlock {
          max-width: 1000px; margin: 0 auto 120px;
          display: grid; grid-template-columns: 2fr 3fr;
          gap: clamp(40px, 5vw, 72px); align-items: start;
        }
        .docBlock[data-reverse='true'] {
          direction: rtl;
        }
        .docBlock[data-reverse='true'] > * {
          direction: ltr;
        }
        .docBlock:last-of-type { margin-bottom: 0; }

        .docSticky {
          position: sticky; top: 90px;
          border-radius: 2px; overflow: hidden;
          aspect-ratio: 3/4;
          box-shadow: 0 10px 30px rgba(15, 26, 53, 0.08);
        }
        .docBody {
          padding-top: 12px;
        }
        .docRole {
          font-size: 11px; color: var(--c-gold); letter-spacing: 3px;
          margin: 0 0 14px; font-weight: 600;
        }
        .docName {
          display: flex; align-items: baseline; gap: 12px;
          margin: 0 0 6px;
        }
        .docNameKo {
          font-size: 30px; font-weight: 700; color: var(--c-navy);
          letter-spacing: -0.02em;
        }
        .docNameRole {
          font-size: 14px; color: var(--c-text3); font-weight: 400;
        }
        .docSpec {
          font-size: 15px; color: var(--c-text); font-weight: 500;
          margin: 0 0 8px;
        }
        .docFocus {
          font-size: 13px; color: var(--c-text2); font-weight: 400;
          margin: 0 0 28px; letter-spacing: -0.01em;
        }
        .docQuote {
          background: var(--c-warm); padding: 24px 28px; border-radius: 2px;
          border-left: 2px solid var(--c-gold);
          margin-bottom: 32px;
        }
        .docQuote p {
          font-size: 15px; color: var(--c-text2); line-height: 2;
          font-weight: 300; margin: 0; white-space: pre-line;
        }
        .docDivider {
          width: 24px; height: 1px; background: var(--c-text3); margin-bottom: 24px;
        }
        .docCareer {
          font-size: 14px; color: var(--c-text2); font-weight: 400;
          margin: 0 0 10px; padding-left: 14px; border-left: 2px solid var(--c-line);
        }

        @media (max-width: 768px) {
          .docBlock { grid-template-columns: 1fr; direction: ltr !important; }
          .docSticky { position: static; max-width: 360px; margin: 0 auto; }
        }
      `}</style>
    </>
  );
}
