import type { Metadata } from 'next';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import TextReveal from '@/components/TextReveal';
import AnimatedIcon from '@/components/AnimatedIcon';
import { DOCTORS, SITE } from '@/lib/copy';
import { jsonLdScript, doctorNodeId } from '@/lib/jsonld';
import Breadcrumb from '@/components/Breadcrumb';
import DoctorPhoto from './DoctorPhoto';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

export const metadata: Metadata = {
  alternates: { canonical: '/doctor' },
  title: '의료진',
  description:
    '구강외과(최종원 원장) · 보존과(강지수 원장) 전문의 협진. 각 분야 전문의가 한 자리에서 정확하게 진단하고 끝까지 책임집니다.',
};

function CertBadge() {
  return (
    <Image
      className="certBadge"
      src="/media/images/cert/mohw-mark.jpg"
      alt=""
      aria-hidden="true"
      width={18}
      height={18}
    />
  );
}

export default function DoctorPage() {
  // 의료진 구조화 데이터 — 검색·생성형 검색이 "어떤 전문의가 있는 치과인지" 인용할 수 있게 한다.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      ...DOCTORS.map((doc, i) => ({
        '@type': 'Physician',
        '@id': doctorNodeId(SITE_URL, i),
        name: `${doc.name} ${doc.title}`,
        jobTitle: doc.title,
        medicalSpecialty: 'Dentistry',
        description: doc.specialty,
        knowsAbout: doc.focus.split(' · '),
        image: `${SITE_URL}${doc.photo}`,
        hasCredential: doc.careerGroups
          .filter((g) => g.label === '자격')
          .flatMap((g) => g.items)
          .map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            credentialCategory: '전문의 자격',
            name: c,
          })),
        worksFor: {
          '@type': 'Dentist',
          name: SITE.name,
          url: SITE_URL,
          telephone: SITE.phone,
          address: {
            '@type': 'PostalAddress',
            streetAddress: '센트럴로 263 IBS타워 업무동 8층',
            addressLocality: '연수구',
            addressRegion: '인천광역시',
            addressCountry: 'KR',
          },
        },
      })),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '홈', item: SITE_URL },
          { '@type': 'ListItem', position: 2, name: '의료진', item: `${SITE_URL}/doctor` },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <PageHeader title="의료진" src="/media/images/doctor/doctor-02.jpg" alt="의료진 협진" objectPosition="center 55%" />

      <section style={{ background: 'var(--c-bg)', padding: 'clamp(80px,10vw,140px) clamp(24px,5vw,80px)' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <Breadcrumb items={[{ label: '홈', href: '/' }, { label: '의료진' }]} />
        </div>
        <div style={{ maxWidth: 720, margin: '0 auto 80px', textAlign: 'center' }}>
          <Reveal variant="fade" duration="0.8s">
            <p style={{ fontSize: 12, color: 'var(--c-navy)', letterSpacing: 4, margin: '0 0 14px', fontWeight: 500 }}>
              PROFESSIONAL COLLABORATION
            </p>
          </Reveal>
          <TextReveal
            as="h2"
            style={{ fontFamily: 'var(--f-heading)', fontSize: 'clamp(24px,3vw,34px)', fontWeight: 600, letterSpacing: '-0.025em', color: 'var(--c-navy)', lineHeight: 1.5, margin: '0 0 20px' }}
            lines={['구강외과 · 보존과', '전문의 협진']}
            delay={0.05}
            duration="0.9s"
          />
          <Reveal delay={0.15} duration="0.7s">
            <AnimatedIcon
              name="users"
              size={26}
              stroke="var(--c-blue)"
              delay={0.2}
              className="docIntroIcon"
            />
          </Reveal>
          <Reveal delay={0.2} duration="0.9s">
            <p style={{ fontSize: 16, color: 'var(--c-text2)', lineHeight: 2, fontWeight: 400, margin: 0 }}>
              수술은 정교하게, 자연치아는 끝까지. 각 분야의 전문의가<br />한 자리에서 정확하게 진단하고, 끝까지 책임집니다.
            </p>
          </Reveal>
        </div>

        {DOCTORS.map((doc, i) => (
          <div key={doc.name} className="docBlock" data-reverse={i % 2 === 1} data-doc-block>
            <Reveal variant="blur-up" duration="1.1s" from="translateY(24px)">
              <div className="docSticky">
                <DoctorPhoto
                  src={doc.photo}
                  label={`${doc.name} 원장`}
                  alt={`${doc.name} ${doc.title}`}
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
                <p className="docSpec">
                  <AnimatedIcon
                    name={doc.specialty.includes('보존') ? 'award' : 'badge'}
                    size={18}
                    stroke="var(--c-blue)"
                    delay={0.3}
                    className="docSpecIcon"
                  />
                  <span>{doc.specialty}</span>
                </p>
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
              {doc.careerGroups?.map((group, gi) => (
                <div key={group.label} className="careerGroup">
                  <Reveal delay={0.4 + gi * 0.06} duration="0.5s">
                    <p className="careerLabel">
                      <AnimatedIcon
                        name={group.label === '경력' ? 'calendar' : 'award'}
                        size={15}
                        stroke="var(--c-blue)"
                        delay={0.45 + gi * 0.06}
                        className="careerLabelIcon"
                      />
                      <span>{group.label}</span>
                    </p>
                  </Reveal>
                  {group.items.map((c, j) => (
                    <Reveal key={c} delay={0.42 + gi * 0.06 + j * 0.03} duration="0.45s">
                      <p className="docCareer">
                        {c.startsWith('보건복지부') && <CertBadge />}
                        <span>{c}</span>
                      </p>
                    </Reveal>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* 구강악안면외과 전문의 소개 영상 */}
      <section className="docVideo">
        <div className="docVideoInner">
          <Reveal variant="fade" duration="0.8s">
            <p className="docVideoEyebrow">INTERVIEW</p>
          </Reveal>
          <TextReveal
            as="h2"
            className="docVideoTitle"
            lines={['구강악안면외과 전문의가', '직접 전하는 진료 이야기']}
            delay={0.05}
            duration="0.9s"
          />
          <Reveal delay={0.2} duration="1s" from="scale(0.98)">
            <div className="docVideoFrame">
              <iframe
                src="https://www.youtube-nocookie.com/embed/cYeo29ukYKA"
                title="구강악안면외과 전문의 최종원 대표원장 소개 영상"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
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
          position: sticky; top: 100px;
          border-radius: 2px; overflow: hidden;
          height: calc(100vh - 140px);
          min-height: 460px;
          max-height: 760px;
          box-shadow: 0 10px 30px rgba(15, 26, 53, 0.08);
        }
        .docBody {
          padding-top: 12px;
        }
        .docRole {
          font-size: 11px; color: var(--c-navy); letter-spacing: 3px;
          margin: 0 0 14px; font-weight: 700; opacity: 0.85;
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
          display: flex; align-items: center; gap: 8px;
          font-size: 15px; color: var(--c-text); font-weight: 500;
          margin: 0 0 8px;
        }
        .docSpecIcon { flex-shrink: 0; }
        .docIntroIcon { margin: 0 auto 18px; }
        .docFocus {
          font-size: 13px; color: var(--c-text2); font-weight: 400;
          margin: 0 0 28px; letter-spacing: -0.01em;
        }
        .docQuote {
          background: var(--c-warm); padding: 24px 28px; border-radius: 2px;
          border-left: 2px solid var(--c-navy);
          margin-bottom: 32px;
          transition: transform .35s var(--ease-out), box-shadow .35s var(--ease-out);
        }
        @media (hover: hover) {
          .docQuote:hover {
            transform: translateY(-4px);
            box-shadow: 0 22px 46px rgba(46, 111, 212, 0.18);
          }
        }
        .docQuote p {
          font-size: 15px; color: var(--c-text2); line-height: 2;
          font-weight: 300; margin: 0; white-space: pre-line;
        }
        .docDivider {
          width: 24px; height: 1px; background: var(--c-text3); margin-bottom: 24px;
        }
        .careerGroup {
          margin-bottom: 22px;
        }
        .careerGroup:last-child { margin-bottom: 0; }
        .careerLabel {
          display: flex; align-items: center; gap: 7px;
          font-size: 11px; letter-spacing: 3px; font-weight: 700;
          color: var(--c-navy); opacity: 0.7;
          margin: 0 0 10px;
          text-transform: uppercase;
        }
        .careerLabelIcon { flex-shrink: 0; opacity: 0.85; }
        .docCareer {
          display: flex; align-items: center; gap: 8px;
          font-size: 14px; color: var(--c-text2); font-weight: 400;
          margin: 0 0 8px; padding-left: 14px; border-left: 2px solid var(--c-line);
          line-height: 1.6;
        }
        .docCareer .certBadge {
          flex-shrink: 0;
          display: block;
          width: 20px;
          height: 20px;
          object-fit: contain;
        }
        .docCareer:has(.certBadge) {
          border-left-color: var(--c-navy);
          color: var(--c-text);
          font-weight: 500;
        }

        /* 구강악안면외과 전문의 소개 영상 */
        .docVideo {
          background: var(--c-warm);
          padding: clamp(70px,9vw,120px) clamp(24px,5vw,80px);
        }
        .docVideoInner { max-width: 900px; margin: 0 auto; text-align: center; }
        .docVideoEyebrow {
          font-family: var(--f-display); font-size: 12px; letter-spacing: 4px;
          color: var(--c-gold-d); margin: 0 0 14px;
        }
        .docVideoTitle {
          font-family: var(--f-heading); font-size: clamp(24px,3vw,34px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--c-navy);
          line-height: 1.4; margin: 0 0 40px;
        }
        .docVideoFrame {
          position: relative; aspect-ratio: 16 / 9;
          border-radius: 4px; overflow: hidden;
          background: #0d0d0d; box-shadow: 0 10px 30px rgba(15,26,53,0.12);
          transition: transform .35s var(--ease-out), box-shadow .35s var(--ease-out);
        }
        @media (hover: hover) {
          .docVideoFrame:hover {
            transform: translateY(-4px);
            box-shadow: 0 22px 46px rgba(46, 111, 212, 0.18);
          }
        }
        .docVideoFrame iframe {
          position: absolute; inset: 0; width: 100%; height: 100%; border: 0;
        }

        @media (max-width: 768px) {
          .docBlock { grid-template-columns: 1fr; direction: ltr !important; }
          .docSticky {
            position: static;
            max-width: 360px;
            margin: 0 auto;
            height: auto;
            min-height: 0;
            max-height: none;
            aspect-ratio: 3/4;
          }
        }
      `}</style>
    </>
  );
}
