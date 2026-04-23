import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { V } from '@/lib/visuals';
import { DOCTOR } from '@/lib/copy';

export const metadata: Metadata = {
  title: '의료진',
  description: `${DOCTOR.name}의 경력과 진료 철학을 소개합니다.`,
};

export default function DoctorPage() {
  return (
    <>
      <PageHeader title="의료진" src="/media/images/doctor/doctor-02.jpg" alt="원장 프로필" objectPosition="center 25%" />

      <section style={{ background: 'var(--c-bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div className="docGrid">
          <Reveal duration="1.2s" from="translateY(20px)">
            <div className="docSticky">
              <Photo
                src="/media/images/doctor/doctor-03.jpg"
                label="원장님 프로필 사진"
                alt="아트에이치치과 원장 사진"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
            </div>
          </Reveal>
          <div>
            <Reveal delay={0.1} duration="0.6s">
              <p style={{ fontSize: 12, color: 'var(--c-text3)', letterSpacing: 3, marginBottom: 12 }}>REPRESENTATIVE</p>
            </Reveal>
            <Reveal delay={0.15} duration="0.7s">
              <h2 style={{ fontSize: 26, color: 'var(--c-dark)', fontWeight: 600, margin: '0 0 4px' }}>{DOCTOR.name}</h2>
            </Reveal>
            <Reveal delay={0.2} duration="0.7s">
              <p style={{ fontSize: 14, color: 'var(--c-text3)', fontWeight: 300, margin: '0 0 32px' }}>{DOCTOR.specialty}</p>
            </Reveal>
            <Reveal delay={0.25} duration="0.9s">
              <div style={{ background: 'var(--c-warm)', padding: '24px 28px', borderRadius: 2, marginBottom: 36 }}>
                <p style={{ fontSize: 15, color: 'var(--c-text2)', lineHeight: 2, fontWeight: 300, margin: 0, whiteSpace: 'pre-line' }}>
                  {DOCTOR.quote}
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.3} duration="0.5s">
              <div style={{ width: 24, height: 1, background: 'var(--c-text3)', marginBottom: 24 }} />
            </Reveal>
            {DOCTOR.career.map((c, i) => (
              <Reveal key={c} delay={0.35 + i * 0.05} duration="0.5s">
                <p
                  style={{
                    fontSize: 14,
                    color: 'var(--c-text2)',
                    fontWeight: 300,
                    margin: '0 0 10px',
                    paddingLeft: 14,
                    borderLeft: i === 0 ? '2px solid var(--c-gold)' : '2px solid var(--c-line)',
                  }}
                >
                  {c}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .docGrid {
          max-width: 1000px; margin: 0 auto;
          display: grid; grid-template-columns: 2fr 3fr;
          gap: clamp(40px, 5vw, 72px); align-items: start;
        }
        .docSticky {
          position: sticky; top: 90px; border-radius: 2px; overflow: hidden; aspect-ratio: 3/4;
        }
        @media (max-width: 768px) {
          .docGrid { grid-template-columns: 1fr; }
          .docSticky { position: static; max-width: 360px; }
        }
      `}</style>
    </>
  );
}
