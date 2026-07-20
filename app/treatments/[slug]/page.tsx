import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import TextReveal from '@/components/TextReveal';
import AnimatedIcon from '@/components/AnimatedIcon';
import TxDiagram from '@/components/TxDiagram';
import { TREATMENTS } from '@/lib/copy';

const TX_SRC: Record<string, string> = {
  Implant: '/media/images/surgery/surgery-01.jpg',
  'Root Canal': '/media/images/treatment-room/treatment-01.jpg',
  'Oral Surgery': '/media/images/xray/xray-01.jpg',
  TMJ: '/media/images/xray/xray-02.jpg',
  Sedation: '/media/images/surgery/surgery-02.jpg',
  Periodontics: '/media/images/equipment/equipment-01.jpg',
  Whitening: '/media/images/consult/consult-01.jpg',
};

export function generateStaticParams() {
  return TREATMENTS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = TREATMENTS.find((x) => x.slug === slug);
  if (!t) return { title: '진료과목' };
  return {
    title: t.ko,
    description: t.summary || t.d,
  };
}

export default async function TreatmentDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tx = TREATMENTS.find((t) => t.slug === slug);
  if (!tx) notFound();

  const src = TX_SRC[tx.en];
  const idx = TREATMENTS.findIndex((t) => t.slug === slug);
  const prev = TREATMENTS[(idx - 1 + TREATMENTS.length) % TREATMENTS.length];
  const next = TREATMENTS[(idx + 1) % TREATMENTS.length];

  return (
    <>
      <PageHeader title={tx.ko} src={src} alt={`${tx.ko} 이미지`} />

      <article className="txDetail">
        {/* Summary */}
        <section className="txSec txHead">
          <Reveal variant="fade" duration="0.7s">
            <p className="txEyebrow">{tx.en.toUpperCase()}</p>
          </Reveal>
          <TextReveal as="h2" className="txSummary" lines={[tx.summary]} delay={0.1} duration="1s" />
          <Reveal variant="fade" delay={0.28} duration="0.9s">
            <p className="txIntro">{tx.intro}</p>
          </Reveal>
        </section>

        {/* 치료 종류 · 유형 (모식도 카드) */}
        {tx.kinds && (
          <section className="txSec txKinds">
            <div className="txKindsHead">
              <Reveal variant="fade">
                <p className="txLabel">{tx.kinds.label}</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={[tx.kinds.title]} delay={0.05} />
              <Reveal variant="fade" delay={0.12}>
                <p className="txBlockDesc">{tx.kinds.desc}</p>
              </Reveal>
            </div>
            <div className="txKindsGrid">
              {tx.kinds.items.map((k, i) => (
                <Reveal key={k.name} variant="blur-up" delay={0.1 + i * 0.08} duration="0.8s">
                  <div className="txKindCard">
                    {k.diagram ? (
                      <div className="txKindMedia">
                        <TxDiagram name={k.diagram} title={`${k.name} 모식도`} />
                      </div>
                    ) : k.image ? (
                      <div className="txKindMedia txKindMediaImg">
                        <Photo src={k.image} alt={`${k.name} 모식도`} objectFit="contain" bg="#fff" sizes="(max-width: 768px) 100vw, 460px" />
                      </div>
                    ) : null}
                    <div className="txKindBody">
                      <h4 className="txKindName">{k.name}</h4>
                      <p className="txKindTag">{k.tag}</p>
                      <p className="txKindD">{k.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* 치료 단계 모식도 */}
        {tx.stepFigures && (
          <section className="txSec txFigs txBandWarm">
            <div className="txFigsHead">
              <Reveal variant="fade">
                <p className="txLabel">STEP BY STEP</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={['치료 과정, 한눈에 보기']} delay={0.05} />
            </div>
            <ol className="txFigGrid">
              {tx.stepFigures.map((f, i) => (
                <Reveal key={f.t} as="li" variant="blur-up" delay={0.08 + i * 0.06} duration="0.7s">
                  <div className="txFigCard">
                    <div className="txFigMedia">
                      <TxDiagram name={f.diagram} title={`${f.t} 모식도`} />
                    </div>
                    <div className="txFigBody">
                      <span className="txFigNo">{String(i + 1).padStart(2, '0')}</span>
                      <h4 className="txFigT">{f.t}</h4>
                      <p className="txFigD">{f.d}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {/* 장비·브랜드 쇼케이스 (임플란트 2종 / 의식하진정 안전장비) */}
        {tx.showcase && (
          <section className="txSec txShowcase">
            <div className="txShowcaseHead">
              <Reveal variant="fade">
                <p className="txLabel">{tx.showcase.label}</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={[tx.showcase.title]} delay={0.05} />
              <Reveal variant="fade" delay={0.12}>
                <p className="txBlockDesc">{tx.showcase.desc}</p>
              </Reveal>
            </div>
            <div className="txShowcaseGrid">
              {tx.showcase.items.map((item, i) => (
                <Reveal key={item.name} variant="blur-up" delay={0.1 + i * 0.1} duration="0.8s">
                  <div className="txShowcaseCard">
                    <div className={item.imageFit === 'contain' ? 'txShowcaseMedia txShowcaseMediaContain' : 'txShowcaseMedia'}>
                      {item.video ? (
                        <video
                          className="txShowcaseVideo"
                          controls
                          preload="none"
                          playsInline
                          poster={item.poster}
                          aria-label={`${item.name} 소개 영상`}
                        >
                          <source src={item.video} type="video/mp4" />
                        </video>
                      ) : item.image ? (
                        <Photo
                          src={item.image}
                          alt={`${item.name} 이미지`}
                          sizes="(max-width: 768px) 100vw, 460px"
                          objectFit={item.imageFit ?? 'cover'}
                          bg="#fff"
                        />
                      ) : null}
                    </div>
                    <div className="txShowcaseBody">
                      <h4 className="txShowcaseName">{item.name}</h4>
                      <p className="txShowcaseTag">{item.tag}</p>
                      <p className="txShowcaseDesc">{item.desc}</p>
                      {item.points && item.points.length > 0 && (
                        <ul className="txShowcasePoints">
                          {item.points.map((p) => (
                            <li key={p}>
                              <span className="txShowcaseCheck" aria-hidden="true">
                                <svg viewBox="0 0 24 24" width="14" height="14">
                                  <path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" />
                                </svg>
                              </span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* SIC 정품 임플란트 — 3대 기술력 */}
        {tx.tech && tx.techTitle && (
          <section className="txSec txTech">
            <div className="txTechHead">
              <Reveal variant="fade">
                <p className="txLabel">{tx.techTitle.label}</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={[tx.techTitle.title]} delay={0.05} />
              <Reveal variant="fade" delay={0.12}>
                <p className="txBlockDesc">{tx.techTitle.desc}</p>
              </Reveal>
            </div>
            <div className="txTechGrid">
              {tx.tech.map((item, i) => (
                <Reveal key={item.no} delay={0.1 + i * 0.08} duration="0.7s">
                  <div className="txTechCard">
                    <span className="txTechNo" aria-hidden="true">{item.no}</span>
                    <h4 className="txTechName">{item.t}</h4>
                    {item.metric && <p className="txTechMetric">{item.metric}</p>}
                    <p className="txTechD">{item.d}</p>
                    <p className="txTechTarget">{item.target}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* 고난이도 임플란트 — 상악동 거상술 전/후 */}
        {tx.beforeAfter && (
          <section className="txSec txBA">
            <div>
              <Reveal variant="fade">
                <p className="txLabel">{tx.beforeAfter.label}</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={[tx.beforeAfter.title]} delay={0.05} />
            </div>
            <div className="txBAGrid">
              <Reveal variant="blur-up" delay={0.1} duration="0.8s">
                <div className="txBAImg">
                  <Photo src={tx.beforeAfter.before} alt="상악동 거상술 원리 모식도" objectFit="contain" bg="#ffffff" sizes="(max-width: 768px) 100vw, 460px" />
                </div>
              </Reveal>
              <Reveal variant="blur-up" delay={0.18} duration="0.8s">
                <div className="txBAImg">
                  <Photo src={tx.beforeAfter.after} alt="상악동 거상술 후 X-RAY" sizes="(max-width: 768px) 100vw, 460px" />
                </div>
              </Reveal>
            </div>
            <Reveal delay={0.2} duration="0.7s">
              <p className="txBACaption">{tx.beforeAfter.caption}</p>
              <p className="txBlockDesc txBADesc">{tx.beforeAfter.d}</p>
            </Reveal>
          </section>
        )}

        {/* Processes — 단계 모식도(stepFigures)가 있는 과목은 중복이라 생략 */}
        {!tx.stepFigures && (
          <section className="txSec txSplit txBandWarm">
            <div>
              <Reveal variant="fade">
                <p className="txLabel">PROCESS</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={['치료 과정']} delay={0.05} />
            </div>
            <ol className="txSteps">
              {tx.processes.map((step, i) => (
                <Reveal key={step} delay={0.1 + i * 0.05} duration="0.6s">
                  <li>
                    <span className="txStepNo">
                      <AnimatedIcon name="badge" size={22} stroke="var(--c-blue)" delay={0.1 + i * 0.05} className="txStepIcon" />
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="txStepText">{step}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {/* 미백 시스템 — 기기 3종 */}
        {tx.devices && tx.devicesTitle && (
          <section className="txSec txDevices">
            <div>
              <Reveal variant="fade">
                <p className="txLabel">{tx.devicesTitle.label}</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={[tx.devicesTitle.title]} delay={0.05} />
              <Reveal variant="fade" delay={0.12}>
                <p className="txBlockDesc">{tx.devicesTitle.desc}</p>
              </Reveal>
            </div>
            <div className="txDevGrid">
              {tx.devices.map((dv, i) => (
                <Reveal key={dv.name} delay={0.1 + i * 0.08} duration="0.7s">
                  <div className="txDevCard">
                    <span className="txDevNum" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <p className="txDevName">{dv.name}</p>
                    <p className="txDevRole">{dv.role}</p>
                    <p className="txDevD">{dv.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* Features */}
        <section className="txSec txFeat txBandNavy">
          <div>
            <Reveal variant="fade">
              <p className="txLabel">FEATURES</p>
            </Reveal>
            <TextReveal as="h3" className="txSectionTitle" lines={['아트에이치의 차별점']} delay={0.05} />
          </div>
          <div className="txFeatList">
            {tx.features.map((f, i) => (
              <Reveal key={f} delay={0.1 + i * 0.08} duration="0.7s">
                <div className="txFeatCard">
                  <span className="txCheck" aria-hidden="true">
                    <AnimatedIcon name="badge" size={18} stroke="#fff" delay={0.1 + i * 0.08} />
                  </span>
                  <p>{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* 보험 임플란트 안내 */}
        {tx.insurance && (
          <section className="txSec txIns txBandNavy">
            <div className="txInsHead">
              <Reveal variant="fade">
                <p className="txLabel">{tx.insurance.label}</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={[tx.insurance.title]} delay={0.05} />
              <Reveal variant="fade" delay={0.12}>
                <p className="txBlockDesc">{tx.insurance.desc}</p>
              </Reveal>
            </div>
            <div className="txInsGrid">
              {tx.insurance.rows.map((r, i) => (
                <Reveal key={r.k} delay={0.1 + i * 0.06} duration="0.7s">
                  <div className="txInsCard">
                    <p className="txInsK">{r.k}</p>
                    <p className="txInsV">{r.v}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal variant="fade" delay={0.2} duration="0.8s">
              <ul className="txInsNotes">
                {tx.insurance.notes.map((n) => (
                  <li key={n}>{n}</li>
                ))}
              </ul>
            </Reveal>
          </section>
        )}

        {/* GBT 영상 + 장비·시술 사진 */}
        {tx.media && (
          <section className="txSec txGbt">
            <div className="txGbtHead">
              <Reveal variant="fade">
                <p className="txLabel">{tx.media.label}</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={[tx.media.title]} delay={0.05} />
              <Reveal variant="fade" delay={0.12}>
                <p className="txBlockDesc">{tx.media.desc}</p>
              </Reveal>
            </div>
            {tx.media.video && (
              <Reveal variant="blur-up" delay={0.1} duration="0.9s">
                <div className="txGbtVideo">
                  <video
                    className="txGbtVideoEl"
                    controls
                    preload="none"
                    playsInline
                    poster={tx.media.poster}
                    aria-label={`${tx.media.title} 소개 영상`}
                  >
                    <source src={tx.media.video} type="video/mp4" />
                  </video>
                </div>
              </Reveal>
            )}
            {tx.media.images && tx.media.images.length > 0 && (
              <div className="txGbtGrid">
                {tx.media.images.map((img, i) => (
                  <Reveal key={img.src} variant="blur-up" delay={0.12 + i * 0.08} duration="0.8s">
                    <figure className="txGbtFig">
                      <div className="txGbtImg">
                        <Photo src={img.src} alt={img.alt} sizes="(max-width: 768px) 100vw, 480px" />
                      </div>
                      {img.caption && <figcaption className="txGbtCap">{img.caption}</figcaption>}
                    </figure>
                  </Reveal>
                ))}
              </div>
            )}
          </section>
        )}

        {/* 무통증 GBT — 이런 분께 권합니다 */}
        {tx.targets && tx.targetsTitle && (
          <section className="txSec txTargets">
            <div className="txTargetsHead">
              <Reveal variant="fade">
                <p className="txLabel">{tx.targetsTitle.label}</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={[tx.targetsTitle.title]} delay={0.05} />
              <Reveal variant="fade" delay={0.12}>
                <p className="txBlockDesc">{tx.targetsTitle.desc}</p>
              </Reveal>
            </div>
            <ul className="txTargetList">
              {tx.targets.map((tg, i) => (
                <Reveal key={tg} delay={0.1 + i * 0.07} duration="0.6s">
                  <li className="txTargetItem">
                    <span className="txTargetCheck" aria-hidden="true">
                      <AnimatedIcon name="users" size={16} stroke="#fff" delay={0.1 + i * 0.07} />
                    </span>
                    <span>{tg}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {/* 진료 환경 실사 갤러리 */}
        {tx.gallery && (
          <section className="txSec txGallery">
            <div>
              <Reveal variant="fade">
                <p className="txLabel">SPACE</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={['아트에이치의 진료 환경']} delay={0.05} />
            </div>
            <div className="txGalGrid">
              {tx.gallery.map((g, i) => (
                <Reveal key={`${g.src}-${g.caption}`} variant="blur-up" delay={0.1 + i * 0.08} duration="0.8s">
                  <figure className="txGalFig">
                    <div className="txGalImg">
                      <Photo src={g.src} alt={g.alt} sizes="(max-width: 768px) 100vw, 400px" />
                    </div>
                    <figcaption className="txGalCap">{g.caption}</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {/* 시술 후 주의사항 */}
        {tx.aftercare && (
          <section className="txSec txCare txBandWarm">
            <div className="txCareHead">
              <Reveal variant="fade">
                <p className="txLabel">{tx.aftercare.label}</p>
              </Reveal>
              <TextReveal as="h3" className="txSectionTitle" lines={[tx.aftercare.title]} delay={0.05} />
            </div>
            <ol className="txCareGrid">
              {tx.aftercare.items.map((it, i) => (
                <Reveal key={it} as="li" delay={0.08 + i * 0.05} duration="0.6s">
                  <div className="txCareCard">
                    <span className="txCareNo" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                    <p>{it}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </section>
        )}

        {/* FAQ */}
        <section className="txSec txFaq">
          <div>
            <Reveal variant="fade">
              <p className="txLabel">FAQ</p>
            </Reveal>
            <TextReveal as="h3" className="txSectionTitle" lines={['자주 묻는 질문']} delay={0.05} />
          </div>
          <div className="txFaqList">
            {tx.faqs.map((f, i) => (
              <Reveal key={f.q} delay={0.08 + i * 0.06} duration="0.6s">
                <details className="txFaqItem">
                  <summary>
                    <span className="txFaqQ">Q</span>
                    <span>{f.q}</span>
                    <span className="txFaqArrow" aria-hidden="true">+</span>
                  </summary>
                  <p className="txFaqA">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Navigation */}
        <nav className="txNav" aria-label="다른 진료과목 보기">
          <Link href={`/treatments/${prev.slug}`} className="txNavLink txNavPrev">
            <span className="txNavLabel">← 이전</span>
            <span className="txNavTitle">{prev.ko}</span>
          </Link>
          <Link href="/treatments" className="txNavList">전체 진료과목</Link>
          <Link href={`/treatments/${next.slug}`} className="txNavLink txNavNext">
            <span className="txNavLabel">다음 →</span>
            <span className="txNavTitle">{next.ko}</span>
          </Link>
        </nav>
      </article>

      <style>{`
        .txDetail {
          max-width: 1000px; margin: 0 auto;
          padding: clamp(60px,8vw,100px) clamp(24px,5vw,80px);
        }
        .txSec { margin-bottom: clamp(60px, 8vw, 100px); }
        .txSec:last-of-type { margin-bottom: 0; }

        /* 풀폭 배경 밴드 (하늘리더스식 리듬) — 콘텐츠 폭은 유지, 배경만 화면 끝까지 */
        .txBandWarm, .txBandNavy {
          padding-top: clamp(48px, 6vw, 80px);
          padding-bottom: clamp(48px, 6vw, 80px);
          clip-path: inset(0 -100vmax);
        }
        .txBandWarm {
          background: var(--c-warm);
          box-shadow: 0 0 0 100vmax var(--c-warm);
        }
        .txBandNavy {
          background: var(--c-navy);
          box-shadow: 0 0 0 100vmax var(--c-navy);
        }
        /* 네이비 밴드가 연달아 오면 틈 없이 이어 붙이고 얇은 구분선만 (선도 풀폭으로) */
        .txBandNavy { position: relative; }
        .txBandNavy:has(+ .txBandNavy) { margin-bottom: 0; }
        .txBandNavy + .txBandNavy::before {
          content: '';
          position: absolute;
          top: 0; left: -100vmax; right: -100vmax; height: 1px;
          background: rgba(255, 255, 255, 0.12);
        }
        .txBandNavy .txLabel { color: var(--c-blue-l); opacity: 1; }
        .txBandNavy .txSectionTitle { color: #fff; }
        .txBandNavy .txBlockDesc { color: rgba(255, 255, 255, 0.78); }

        /* 섹션 라벨 앞 짧은 선 장식 */
        .txLabel { display: flex; align-items: center; gap: 8px; }
        .txLabel::before {
          content: '';
          width: 22px; height: 1px;
          background: currentColor; opacity: 0.55;
          flex: none;
        }

        .txHead { max-width: 720px; }
        .txEyebrow {
          font-family: var(--f-display); font-size: 14px;
          color: var(--c-navy); opacity: 0.7;
          letter-spacing: 4px; margin: 0 0 16px;
        }
        .txSummary {
          font-family: var(--f-heading); font-size: clamp(26px,3.4vw,40px);
          font-weight: 700; letter-spacing: -0.03em; color: var(--c-navy);
          line-height: 1.35; margin: 0 0 28px;
        }
        .txIntro {
          font-size: 16px; color: var(--c-text); font-weight: 400;
          line-height: 2; margin: 0;
        }

        .txBlockDesc {
          font-size: 15px; color: var(--c-text2); line-height: 1.9;
          font-weight: 400; margin: 16px 0 0; max-width: 760px;
        }

        /* SIC 정품 임플란트 — 3대 기술력 */
        .txTechHead { max-width: 760px; margin-bottom: 36px; }
        .txTechGrid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .txTechCard {
          display: flex; flex-direction: column;
          padding: 28px 24px; background: var(--c-warm);
          border-top: 2px solid var(--c-navy); border-radius: 2px;
          transition: transform .35s var(--ease-out), box-shadow .35s var(--ease-out);
        }
        @media (hover: hover) {
          .txTechCard:hover { transform: translateY(-4px); box-shadow: 0 22px 46px rgba(46,111,212,.2); }
        }
        .txTechNo {
          font-family: var(--f-display); font-size: 26px; color: var(--c-gold-d);
          line-height: 1; margin-bottom: 16px;
        }
        .txTechName {
          font-family: var(--f-heading); font-size: 18px; font-weight: 700;
          color: var(--c-navy); letter-spacing: -0.02em; margin: 0 0 12px;
          line-height: 1.4;
        }
        .txTechMetric {
          font-size: 12px; color: var(--c-navy); font-weight: 600;
          background: rgba(26,38,71,0.07); border-radius: 2px;
          padding: 9px 12px; margin: 0 0 12px; line-height: 1.5;
        }
        .txTechD {
          font-size: 14px; color: var(--c-text); line-height: 1.75;
          font-weight: 400; margin: 0 0 16px; flex: 1;
        }
        .txTechTarget {
          font-size: 12.5px; color: var(--c-text2); font-weight: 500;
          padding-top: 14px; border-top: 1px solid var(--c-line); margin: 0;
        }

        /* 고난이도 임플란트 — 상악동 거상술 전/후 */
        .txBAGrid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
          margin-top: 28px;
        }
        .txBAImg {
          position: relative; aspect-ratio: 19 / 10; overflow: hidden;
          border-radius: 2px; background: #0d0d0d;
        }
        .txBACaption {
          text-align: center; font-family: var(--f-heading);
          font-size: 17px; font-weight: 700; color: var(--c-navy);
          letter-spacing: -0.01em; margin: 28px 0 0;
        }
        .txBADesc { text-align: center; margin-left: auto; margin-right: auto; }

        /* 미백 시스템 — 기기 3종 */
        .txDevGrid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
          margin-top: 28px;
        }
        .txDevCard {
          position: relative;
          padding: 26px 24px; background: #fff;
          border: 1px solid var(--c-line); border-radius: 2px;
          transition: transform .35s var(--ease-out), box-shadow .35s var(--ease-out);
        }
        @media (hover: hover) {
          .txDevCard:hover { transform: translateY(-4px); box-shadow: 0 22px 46px rgba(46,111,212,.2); }
        }
        .txDevNum {
          font-family: var(--f-display); font-size: 14px; color: var(--c-text3);
          position: absolute; top: 22px; right: 22px;
        }
        .txDevName {
          font-family: var(--f-display); font-size: 19px; color: var(--c-navy);
          margin: 0 0 4px;
        }
        .txDevRole {
          font-size: 13px; color: var(--c-gold-d); font-weight: 600;
          margin: 0 0 14px;
        }
        .txDevD {
          font-size: 14px; color: var(--c-text); line-height: 1.75;
          font-weight: 400; margin: 0;
        }

        /* 대상 체크리스트 — 크림 밴드 */
        .txTargetsHead { max-width: 760px; }
        .txTargetList {
          list-style: none; padding: 0; margin: 28px 0 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .txTargetItem {
          display: grid; grid-template-columns: 30px 1fr; align-items: center;
          gap: 14px; padding: 18px 22px; background: var(--c-warm);
          border-radius: 2px; font-size: 15px; color: var(--c-text);
          font-weight: 500;
        }
        .txTargetCheck {
          display: inline-flex; align-items: center; justify-content: center;
          width: 30px; height: 30px; border-radius: 50%;
          background: var(--c-navy); color: #fff;
        }

        .txLabel {
          font-size: 11px; color: var(--c-navy); opacity: 0.7;
          letter-spacing: 4px; font-weight: 700; margin: 0 0 12px;
        }
        .txSectionTitle {
          font-family: var(--f-heading); font-size: clamp(22px,2.6vw,30px);
          font-weight: 700; letter-spacing: -0.02em; color: var(--c-navy);
          margin: 0;
        }

        .txSplit {
          display: grid; grid-template-columns: 1fr 1.6fr;
          gap: clamp(40px, 5vw, 72px); align-items: start;
        }
        .txSteps {
          list-style: none; padding: 0; margin: 0;
          display: flex; flex-direction: column; gap: 18px;
        }
        .txSteps li {
          display: grid; grid-template-columns: 48px 1fr; gap: 16px;
          padding: 18px 20px; background: #fff;
          border-left: 2px solid var(--c-navy);
          border-radius: 2px;
        }
        .txStepNo {
          font-family: var(--f-display); font-size: 15px;
          color: var(--c-navy); font-weight: 400;
          letter-spacing: 1px; align-self: center;
          display: flex; flex-direction: column; align-items: center; gap: 6px;
        }
        .txStepIcon { opacity: 0.85; }
        .txStepText {
          font-size: 15px; color: var(--c-text); line-height: 1.7;
          font-weight: 500;
        }

        .txFeatList {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
          margin-top: 28px;
        }
        .txFeatCard {
          display: grid; grid-template-columns: 28px 1fr; gap: 14px;
          padding: 20px 22px; background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 2px;
        }
        .txCheck {
          display: inline-flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--c-blue); color: #fff;
        }
        .txFeatCard p { margin: 0; font-size: 14px; color: #fff; line-height: 1.7; font-weight: 500; }

        /* 장비·브랜드 쇼케이스 */
        .txShowcaseHead { max-width: 760px; margin-bottom: 36px; }
        .txShowcaseGrid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
        }
        .txShowcaseCard {
          display: flex; flex-direction: column;
          background: #fff; border: 1px solid var(--c-line);
          border-radius: 3px; overflow: hidden;
          transition: transform .35s var(--ease-out), box-shadow .35s var(--ease-out);
        }
        @media (hover: hover) {
          .txShowcaseCard:hover { transform: translateY(-4px); box-shadow: 0 22px 46px rgba(46,111,212,.2); }
        }
        .txShowcaseMedia {
          position: relative; aspect-ratio: 16 / 10;
          background: #0d0d0d; overflow: hidden;
        }
        .txShowcaseMediaContain { background: #fff; }
        .txShowcaseVideo {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .txShowcaseBody {
          padding: 26px 26px 28px; flex: 1;
          display: flex; flex-direction: column;
        }
        .txShowcaseName {
          font-family: var(--f-heading); font-size: 20px; font-weight: 700;
          color: var(--c-navy); letter-spacing: -0.02em; margin: 0 0 4px;
        }
        .txShowcaseTag {
          font-size: 12.5px; color: var(--c-gold-d); font-weight: 600;
          margin: 0 0 14px;
        }
        .txShowcaseDesc {
          font-size: 14px; color: var(--c-text); line-height: 1.8;
          font-weight: 400; margin: 0 0 18px;
        }
        .txShowcasePoints {
          list-style: none; padding: 0; margin: auto 0 0;
          display: flex; flex-direction: column; gap: 9px;
        }
        .txShowcasePoints li {
          display: grid; grid-template-columns: 22px 1fr; gap: 10px;
          align-items: start;
          font-size: 13.5px; color: var(--c-text2); font-weight: 500;
          line-height: 1.5;
        }
        .txShowcaseCheck {
          display: inline-flex; align-items: center; justify-content: center;
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--c-navy); color: #fff; margin-top: 1px;
        }

        /* GBT 영상 + 장비·시술 사진 */
        .txGbtHead { max-width: 760px; margin-bottom: 28px; }
        .txGbtVideo {
          position: relative; aspect-ratio: 16 / 9; overflow: hidden;
          border-radius: 3px; background: #0d0d0d;
        }
        .txGbtVideoEl {
          width: 100%; height: 100%; object-fit: cover; display: block;
        }
        .txGbtGrid {
          display: grid; grid-template-columns: 1fr; gap: 16px;
          margin-top: 16px;
        }
        .txGbtFig { margin: 0; }
        .txGbtImg {
          position: relative; aspect-ratio: 16 / 9; overflow: hidden;
          border-radius: 2px; background: var(--c-warm);
        }
        .txGbtCap {
          font-size: 12.5px; color: var(--c-text2); font-weight: 500;
          margin: 10px 0 0; text-align: center;
        }

        .txFaqList {
          margin-top: 28px; display: flex; flex-direction: column; gap: 6px;
        }
        .txFaqItem {
          border: 1px solid var(--c-line);
          border-radius: 2px; background: #fff;
          overflow: hidden; transition: border-color 0.25s;
        }
        .txFaqItem[open] { border-color: var(--c-navy); }
        .txFaqItem summary {
          display: grid; grid-template-columns: 28px 1fr 24px;
          gap: 16px; align-items: center;
          padding: 20px 24px; cursor: pointer;
          list-style: none; font-size: 15px; color: var(--c-text);
          font-weight: 500;
        }
        .txFaqItem summary::-webkit-details-marker { display: none; }
        .txFaqQ {
          font-family: var(--f-display); font-size: 16px;
          color: var(--c-navy); font-weight: 400;
        }
        .txFaqArrow {
          font-size: 20px; color: var(--c-text3); transition: transform 0.3s;
          text-align: right;
        }
        .txFaqItem[open] .txFaqArrow { transform: rotate(45deg); color: var(--c-navy); }
        .txFaqA {
          padding: 0 24px 22px 68px; margin: 0;
          font-size: 14px; color: var(--c-text2); line-height: 2;
          font-weight: 400;
        }

        .txNav {
          display: grid; grid-template-columns: 1fr auto 1fr;
          gap: 20px; align-items: center;
          border-top: 1px solid var(--c-line);
          padding-top: clamp(32px,4vw,48px);
        }
        .txNavLink {
          display: flex; flex-direction: column; gap: 4px;
          padding: 14px 4px; transition: opacity 0.25s;
        }
        .txNavNext { text-align: right; align-items: flex-end; }
        .txNavLabel {
          font-size: 11px; color: var(--c-text3); letter-spacing: 2px; font-weight: 500;
        }
        .txNavTitle {
          font-size: 15px; color: var(--c-navy); font-weight: 600;
        }
        .txNavLink:hover { opacity: 0.7; }
        .txNavList {
          font-size: 12px; color: var(--c-text2);
          padding: 10px 18px; border: 1px solid var(--c-line);
          border-radius: 999px; transition: background 0.25s;
          letter-spacing: 0.5px;
        }
        .txNavList:hover { background: var(--c-warm); }

        /* 치료 종류 · 유형 (모식도 카드) */
        .txKindsHead { max-width: 760px; margin-bottom: 36px; }
        .txKindsGrid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
        }
        .txKindCard {
          display: flex; flex-direction: column; height: 100%;
          background: #fff; border: 1px solid var(--c-line);
          border-radius: 3px; overflow: hidden;
          transition: transform .35s var(--ease-out), box-shadow .35s var(--ease-out);
        }
        @media (hover: hover) {
          .txKindCard:hover { transform: translateY(-4px); box-shadow: 0 22px 46px rgba(46,111,212,.2); }
        }
        .txKindMedia {
          padding: 18px 28px 6px; background: #fff;
          border-bottom: 1px solid var(--c-line);
        }
        .txKindMediaImg {
          position: relative; aspect-ratio: 16 / 10; padding: 0;
        }
        .txKindBody { padding: 20px 24px 24px; }
        .txKindName {
          font-family: var(--f-heading); font-size: 18px; font-weight: 700;
          color: var(--c-navy); letter-spacing: -0.02em; margin: 0 0 3px;
        }
        .txKindTag {
          font-size: 12.5px; color: var(--c-gold-d); font-weight: 600;
          margin: 0 0 12px;
        }
        .txKindD {
          font-size: 14px; color: var(--c-text); line-height: 1.8;
          font-weight: 400; margin: 0;
        }

        /* 치료 단계 모식도 */
        .txFigsHead { max-width: 760px; margin-bottom: 32px; }
        .txFigGrid {
          list-style: none; padding: 0; margin: 0;
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;
        }
        .txFigCard {
          display: flex; flex-direction: column; height: 100%;
          background: #fff; border: 1px solid var(--c-line);
          border-radius: 3px; overflow: hidden;
        }
        .txFigMedia { padding: 12px 20px 0; background: #fff; }
        .txFigBody { padding: 12px 18px 18px; }
        .txFigNo {
          font-family: var(--f-display); font-size: 13px;
          color: var(--c-gold-d); letter-spacing: 1px;
        }
        .txFigT {
          font-family: var(--f-heading); font-size: 16px; font-weight: 700;
          color: var(--c-navy); letter-spacing: -0.02em; margin: 4px 0 8px;
        }
        .txFigD {
          font-size: 13px; color: var(--c-text2); line-height: 1.7;
          font-weight: 400; margin: 0;
        }

        /* 보험 임플란트 안내 — 네이비 밴드 */
        .txInsHead { max-width: 760px; }
        .txInsGrid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
          margin-top: 32px;
        }
        .txInsCard {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.14);
          border-radius: 2px; padding: 22px 24px; height: 100%;
        }
        .txInsK {
          font-size: 12.5px; color: var(--c-blue-l); font-weight: 700;
          letter-spacing: 1px; margin: 0 0 8px;
        }
        .txInsV {
          font-size: 14.5px; color: #fff; line-height: 1.7;
          font-weight: 400; margin: 0;
        }
        .txInsNotes {
          list-style: none; padding: 0; margin: 20px 0 0;
          display: flex; flex-direction: column; gap: 6px;
        }
        .txInsNotes li {
          font-size: 12.5px; color: rgba(255,255,255,0.68); line-height: 1.6;
          padding-left: 18px; position: relative;
        }
        .txInsNotes li::before { content: '※'; position: absolute; left: 0; }

        /* 진료 환경 실사 갤러리 */
        .txGalGrid {
          display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px;
          margin-top: 28px;
        }
        .txGalFig { margin: 0; }
        .txGalImg {
          position: relative; aspect-ratio: 4 / 3; overflow: hidden;
          border-radius: 2px; background: var(--c-warm);
        }
        .txGalCap {
          font-size: 12.5px; color: var(--c-text2); font-weight: 500;
          margin: 8px 0 0; text-align: center;
        }

        /* 시술 후 주의사항 */
        .txCareHead { max-width: 760px; }
        .txCareGrid {
          list-style: none; padding: 0; margin: 28px 0 0;
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
        }
        .txCareCard {
          display: grid; grid-template-columns: 40px 1fr; gap: 14px;
          padding: 20px 22px; background: #fff;
          border-top: 2px solid var(--c-navy); border-radius: 2px;
          height: 100%;
        }
        .txCareNo {
          font-family: var(--f-display); font-size: 18px;
          color: var(--c-gold-d); line-height: 1.2;
        }
        .txCareCard p {
          margin: 0; font-size: 14px; color: var(--c-text);
          line-height: 1.75; font-weight: 400;
        }

        @media (max-width: 768px) {
          .txSplit { grid-template-columns: 1fr; }
          .txFeatList { grid-template-columns: 1fr; }
          .txTechGrid { grid-template-columns: 1fr; }
          .txDevGrid { grid-template-columns: 1fr; }
          .txGbtGrid { grid-template-columns: 1fr; }
          .txBAGrid { grid-template-columns: 1fr; }
          .txKindsGrid { grid-template-columns: 1fr; }
          .txFigGrid { grid-template-columns: repeat(2, 1fr); }
          .txInsGrid { grid-template-columns: 1fr; }
          .txCareGrid { grid-template-columns: 1fr; }
          .txGalGrid { grid-template-columns: 1fr; }
          .txNav { grid-template-columns: 1fr; text-align: center; }
          .txNavNext { text-align: center; align-items: center; }
        }
        @media (max-width: 480px) {
          .txFigGrid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
