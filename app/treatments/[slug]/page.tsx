import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHeader from '@/components/PageHeader';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
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
          <Reveal duration="0.7s">
            <p className="txEyebrow">{tx.en.toUpperCase()}</p>
          </Reveal>
          <Reveal delay={0.1} duration="0.9s">
            <h2 className="txSummary">{tx.summary}</h2>
          </Reveal>
          <Reveal delay={0.2} duration="0.9s">
            <p className="txIntro">{tx.intro}</p>
          </Reveal>
        </section>

        {/* 장비·브랜드 쇼케이스 (임플란트 2종 / 의식하진정 안전장비) */}
        {tx.showcase && (
          <section className="txSec txShowcase">
            <Reveal duration="0.9s">
              <div className="txShowcaseHead">
                <p className="txLabel">{tx.showcase.label}</p>
                <h3 className="txSectionTitle">{tx.showcase.title}</h3>
                <p className="txBlockDesc">{tx.showcase.desc}</p>
              </div>
            </Reveal>
            <div className="txShowcaseGrid">
              {tx.showcase.items.map((item, i) => (
                <Reveal key={item.name} delay={0.1 + i * 0.1} duration="0.8s">
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
            <Reveal duration="0.9s">
              <div className="txTechHead">
                <p className="txLabel">{tx.techTitle.label}</p>
                <h3 className="txSectionTitle">{tx.techTitle.title}</h3>
                <p className="txBlockDesc">{tx.techTitle.desc}</p>
              </div>
            </Reveal>
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
            <Reveal duration="0.9s">
              <div>
                <p className="txLabel">{tx.beforeAfter.label}</p>
                <h3 className="txSectionTitle">{tx.beforeAfter.title}</h3>
              </div>
            </Reveal>
            <div className="txBAGrid">
              <Reveal delay={0.1} duration="0.8s">
                <div className="txBAImg">
                  <Photo src={tx.beforeAfter.before} alt="상악동 거상술 전 X-RAY" sizes="(max-width: 768px) 100vw, 460px" />
                </div>
              </Reveal>
              <Reveal delay={0.18} duration="0.8s">
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

        {/* Processes */}
        <section className="txSec txSplit">
          <Reveal duration="1s" from="translateX(-20px)">
            <div>
              <p className="txLabel">PROCESS</p>
              <h3 className="txSectionTitle">치료 과정</h3>
            </div>
          </Reveal>
          <ol className="txSteps">
            {tx.processes.map((step, i) => (
              <Reveal key={step} delay={0.1 + i * 0.05} duration="0.6s">
                <li>
                  <span className="txStepNo">{String(i + 1).padStart(2, '0')}</span>
                  <span className="txStepText">{step}</span>
                </li>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* 미백 시스템 — 기기 3종 */}
        {tx.devices && tx.devicesTitle && (
          <section className="txSec txDevices">
            <Reveal duration="0.9s">
              <div>
                <p className="txLabel">{tx.devicesTitle.label}</p>
                <h3 className="txSectionTitle">{tx.devicesTitle.title}</h3>
                <p className="txBlockDesc">{tx.devicesTitle.desc}</p>
              </div>
            </Reveal>
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
        <section className="txSec txFeat">
          <Reveal duration="0.9s">
            <div>
              <p className="txLabel">FEATURES</p>
              <h3 className="txSectionTitle">아트에이치의 차별점</h3>
            </div>
          </Reveal>
          <div className="txFeatList">
            {tx.features.map((f, i) => (
              <Reveal key={f} delay={0.1 + i * 0.08} duration="0.7s">
                <div className="txFeatCard">
                  <span className="txCheck" aria-hidden="true">
                    <svg viewBox="0 0 24 24" width="18" height="18">
                      <path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" />
                    </svg>
                  </span>
                  <p>{f}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* GBT 영상 + 장비·시술 사진 */}
        {tx.media && (
          <section className="txSec txGbt">
            <Reveal duration="0.9s">
              <div className="txGbtHead">
                <p className="txLabel">{tx.media.label}</p>
                <h3 className="txSectionTitle">{tx.media.title}</h3>
                <p className="txBlockDesc">{tx.media.desc}</p>
              </div>
            </Reveal>
            {tx.media.video && (
              <Reveal delay={0.1} duration="0.9s">
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
                  <Reveal key={img.src} delay={0.12 + i * 0.08} duration="0.8s">
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
            <Reveal duration="0.9s">
              <div className="txTargetsHead">
                <p className="txLabel">{tx.targetsTitle.label}</p>
                <h3 className="txSectionTitle">{tx.targetsTitle.title}</h3>
                <p className="txBlockDesc">{tx.targetsTitle.desc}</p>
              </div>
            </Reveal>
            <ul className="txTargetList">
              {tx.targets.map((tg, i) => (
                <Reveal key={tg} delay={0.1 + i * 0.07} duration="0.6s">
                  <li className="txTargetItem">
                    <span className="txTargetCheck" aria-hidden="true">
                      <svg viewBox="0 0 24 24" width="16" height="16">
                        <path fill="currentColor" d="M9 16.2l-3.5-3.5L4 14.2l5 5 11-11-1.5-1.5z" />
                      </svg>
                    </span>
                    <span>{tg}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        <section className="txSec txFaq">
          <Reveal duration="0.9s">
            <div>
              <p className="txLabel">FAQ</p>
              <h3 className="txSectionTitle">자주 묻는 질문</h3>
            </div>
          </Reveal>
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

        /* 무통증 GBT — 대상 */
        .txTargets { background: var(--c-warm); padding: clamp(40px,5vw,60px); border-radius: 2px; }
        .txTargetsHead { max-width: 760px; }
        .txTargetList {
          list-style: none; padding: 0; margin: 28px 0 0;
          display: flex; flex-direction: column; gap: 10px;
        }
        .txTargetItem {
          display: grid; grid-template-columns: 30px 1fr; align-items: center;
          gap: 14px; padding: 18px 22px; background: #fff;
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
          padding: 18px 20px; background: var(--c-warm);
          border-left: 2px solid var(--c-navy);
          border-radius: 2px;
        }
        .txStepNo {
          font-family: var(--f-display); font-size: 15px;
          color: var(--c-navy); font-weight: 400;
          letter-spacing: 1px; align-self: center;
        }
        .txStepText {
          font-size: 15px; color: var(--c-text); line-height: 1.7;
          font-weight: 500;
        }

        .txFeat { background: var(--c-warm); padding: clamp(40px,5vw,60px); border-radius: 2px; }
        .txFeatList {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px;
          margin-top: 28px;
        }
        .txFeatCard {
          display: grid; grid-template-columns: 28px 1fr; gap: 14px;
          padding: 20px 22px; background: #fff;
          border: 1px solid var(--c-line); border-radius: 2px;
        }
        .txCheck {
          display: inline-flex; align-items: center; justify-content: center;
          width: 28px; height: 28px; border-radius: 50%;
          background: var(--c-navy); color: #fff;
        }
        .txFeatCard p { margin: 0; font-size: 14px; color: var(--c-text); line-height: 1.7; font-weight: 500; }

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

        @media (max-width: 768px) {
          .txSplit { grid-template-columns: 1fr; }
          .txFeatList { grid-template-columns: 1fr; }
          .txTechGrid { grid-template-columns: 1fr; }
          .txDevGrid { grid-template-columns: 1fr; }
          .txGbtGrid { grid-template-columns: 1fr; }
          .txBAGrid { grid-template-columns: 1fr; }
          .txNav { grid-template-columns: 1fr; text-align: center; }
          .txNavNext { text-align: center; align-items: center; }
        }
      `}</style>
    </>
  );
}
