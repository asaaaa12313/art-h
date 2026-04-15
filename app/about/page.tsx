import type { Metadata } from 'next';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import { V } from '@/lib/visuals';
import { SYSTEM_ITEMS } from '@/lib/copy';

export const metadata: Metadata = {
  title: '의원소개',
  description:
    '빠른 치료보다 정확한 치료를, 많은 환자보다 한 분에게 충분한 시간을 — 아트에이치치과의 철학과 진료 시스템.',
};

export default function AboutPage() {
  return (
    <>
      <PageHeader title="의원소개" bg={V.clinic} alt="의원 내부 전경" />

      <section style={{ background: 'var(--c-bg)', padding: 'clamp(80px,12vw,160px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Reveal duration="1s">
            <h2 style={{ fontFamily: 'var(--f-heading)', fontSize: 'clamp(24px,3vw,34px)', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--c-dark)', lineHeight: 1.5, margin: '0 0 32px' }}>
              좋은 치과는<br />다시 가고 싶은 곳입니다.
            </h2>
          </Reveal>
          <Reveal delay={0.15} duration="0.9s">
            <p style={{ fontSize: 16, color: 'var(--c-text2)', lineHeight: 2.1, fontWeight: 300, margin: '0 0 20px' }}>
              아트에이치치과는 빠른 치료보다 정확한 치료를, 많은 환자보다 한 분 한 분에 충분한 시간을 드리는 것을 선택했습니다.
              치료의 결과가 자연스럽고, 오래 가고, 환자분의 일상을 더 좋게 만드는 것. 그것이 저희가 생각하는 좋은 치과의 기준입니다.
            </p>
          </Reveal>
          <Reveal delay={0.25} duration="0.9s">
            <p style={{ fontSize: 16, color: 'var(--c-text2)', lineHeight: 2.1, fontWeight: 300, margin: 0 }}>
              송도 국제도시의 중심에서, 진료 환경과 첨단 장비를 갖추고 여러분을 기다립니다.
            </p>
          </Reveal>
        </div>
      </section>

      <section style={{ background: 'var(--c-warm)', padding: 'clamp(60px,8vw,100px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          {SYSTEM_ITEMS.map((item, i) => (
            <Reveal key={item.t} delay={0.05 + i * 0.08} duration="0.7s">
              <div className="systemRow">
                <h3 className="systemT">{item.t}</h3>
                <p className="systemD">{item.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Reveal duration="1.4s" from="scale(1.02)">
        <div style={{ height: 400, overflow: 'hidden' }}>
          <Photo bg={V.wait} label="대기실 전경" alt="아트에이치치과 대기실 전경" />
        </div>
      </Reveal>

      <style>{`
        .systemRow {
          display: grid; grid-template-columns: 180px 1fr; gap: 20px;
          padding: 28px 0; border-bottom: 1px solid var(--c-line);
        }
        .systemT { font-size: 15px; color: var(--c-dark); font-weight: 600; margin: 0; }
        .systemD { font-size: 14px; color: var(--c-text2); line-height: 1.8; font-weight: 300; margin: 0; }
        @media (max-width: 600px) { .systemRow { grid-template-columns: 1fr; gap: 8px; } }
      `}</style>
    </>
  );
}
