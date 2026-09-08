'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import HeroStage, { type Slide } from '@/components/HeroStage';
import CountUp from '@/components/CountUp';
import AnimatedIcon from '@/components/AnimatedIcon';
import TextReveal from '@/components/TextReveal';
import PinnedRail from '@/components/PinnedRail';
import Magnetic from '@/components/Magnetic';
import { SITE, TREATMENTS, DOCTORS, REVIEW_LINK, HERO_COPY, HOME_CALM, HOME_DEFINE, SEDATION_BAND, HOME_SPECIAL, HOME_EQUIPMENT } from '@/lib/copy';
import styles from './Home.module.css';

// Hero 영상 — 사진 인트로 후 재생되는 시퀀스.
// 휴게실(라운지)·복도는 제외하고 수술실 → 원장님 영상 2개 → 수술실 풀세팅(07.21 촬영) 순 4개 재생.
// 시퀀스가 끝나면 영상 루프 대신 사진 인트로부터 다시 시작(Home의 cycle 참조).
// 히어로 무대 — 사진과 영상을 번갈아 세운다.
// 사진은 첫 화면을 가볍게 띄우는 역할(영상은 그때 아직 로드되지 않는다),
// 영상은 사람과 공간이 실제로 움직이는 장면을 보여 주는 역할.
// 순서는 「공간 → 사람(상담) → 진료 → 수술」로, 컨셉(불안을 가라앉힌 뒤 진료)을 따라간다.
const HERO_SLIDES: Slide[] = [
  { kind: 'photo', src: '/media/images/exterior/exterior-01.jpg', alt: '아트에이치치과가 있는 송도 IBS타워', hold: 3400, focus: 'center 34%' },
  { kind: 'photo', src: '/media/images/still/explain-screen.jpg', alt: '화면을 보며 상태와 치료 계획을 설명하는 원장', hold: 3000 },
  { kind: 'video', mp4: '/media/video/hero-3.mp4', mp4Mobile: '/media/video/hero-3-720.mp4', poster: '/media/video/hero-3-poster.jpg', alt: '덴티폼으로 치료 계획을 설명하는 원장' },
  { kind: 'photo', src: '/media/images/still/consult-tablet.jpg', alt: '3D 영상을 함께 확인하며 치료 계획을 정하는 의료진', hold: 3000 },
  { kind: 'video', mp4: '/media/video/hero-1.mp4', mp4Mobile: '/media/video/hero-1-720.mp4', poster: '/media/video/hero-1-poster.jpg', alt: '진료 준비를 마친 진료실' },
  { kind: 'video', mp4: '/media/video/hero-6.mp4', mp4Mobile: '/media/video/hero-6-720.mp4', poster: '/media/video/hero-6-poster.jpg', alt: '수술 준비를 마친 독립 수술실' },
];


// 숫자 임팩트 — 전부 실재 사실 (copy.ts 근거)
const STATS = [
  { en: 'STERILIZATION', num: '9', unit: '단계', label: 'Class B 고압증기멸균 시스템', icon: 'shield' },
  { en: 'SPECIALISTS', num: '2', unit: '인', label: '구강악안면외과 · 보존과 전문의 협진', icon: 'users' },
  { en: 'TREATMENTS', num: '7', unit: '과목', label: '임플란트부터 미백까지 전 진료', icon: 'layers' },
  { en: 'SONGDO IBS', num: '8', unit: '층', label: '국제업무지구역 IBS타워', icon: 'building' },
];


export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  // 히어로 장면 도트 — 무대(배경 층)가 아니라 콘텐츠 층에서 그린다(배경은 시차로 밀려 잘린다)
  const [heroState, setHeroState] = useState<{ index: number; total: number; goTo: (i: number) => void } | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 150);
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        setOffset(window.scrollY);
        raf = 0;
      });
    };
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', on);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        {/* 배경만 시차로 밀되(115%), 장면 선택 도트는 히어로 안에 남아야 해서 무대 밖으로 뺐다 */}
        <div className={styles.heroBg} style={{ transform: `translateY(${offset * 0.08}px)`, height: '115%' }}>
          <HeroStage slides={HERO_SLIDES} onState={setHeroState} />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.heroLine} data-loaded={loaded} aria-hidden="true" />
          <p className={styles.heroEyebrow} data-loaded={loaded}>{HERO_COPY.eyebrow}</p>
          {/* 글자가 한 자씩 서면서 제목이 완성된다 — 첫 화면의 시선을 붙드는 자리 */}
          <h1
            className={styles.heroTitle}
            data-loaded={loaded}
            // 글자를 낱개 span으로 쪼개면 스크린리더가 한 자씩 끊어 읽는다 —
            // 문장을 aria-label로 따로 주고 쪼갠 글자는 읽기에서 감춘다.
            aria-label={HERO_COPY.title.replace(/\n/g, ' ')}
          >
            {HERO_COPY.title.split('\n').map((line, li) => (
              <span key={line} className={styles.heroLineText} aria-hidden="true">
                {[...line].map((ch, ci) => (
                  <span
                    key={ci}
                    className={styles.heroChar}
                    style={{ transitionDelay: `${0.5 + li * 0.26 + ci * 0.035}s` }}
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className={styles.heroSub} data-loaded={loaded}>
            {HERO_COPY.sub.split('\n').map((line, i) => (
              <span key={line}>{line}{i === 0 && <br />}</span>
            ))}
          </p>
          <div className={styles.heroCtas} data-loaded={loaded}>
            {HERO_COPY.ctas.map((c) => (
              <Link key={c.href} href={c.href} className={styles.heroCta}>{c.label}</Link>
            ))}
            <Magnetic>
              <a href={`tel:${SITE.phone.replace(/-/g, '')}`} className={styles.heroCtaPrimary}>전화하기</a>
            </Magnetic>
          </div>
          {heroState && heroState.total > 1 && (
            <div className={styles.heroDots} role="tablist" aria-label="히어로 장면 선택">
              {Array.from({ length: heroState.total }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === heroState.index}
                  aria-label={`${i + 1}번째 장면 보기`}
                  className={styles.heroDot}
                  data-on={i === heroState.index}
                  onClick={() => i !== heroState.index && heroState.goTo(i)}
                />
              ))}
            </div>
          )}
        </div>
        <div className={styles.scrollHint} data-loaded={loaded} aria-hidden="true">
          <span>SCROLL</span>
          <div className={styles.scrollHintLine} />
        </div>
      </section>

      {/* ===== ABOUT CTA — 비주얼 다음에 병원 소개로 한 번 보내는 자리(레퍼런스 구조) ===== */}
      <section className={styles.aboutCta}>
        <div className={styles.inner}>
          <Reveal variant="fade">
            <p className={styles.aboutCtaEn}>ART H DENTAL CLINIC</p>
          </Reveal>
          <TextReveal
            as="p"
            className={styles.aboutCtaText}
            lines={['치과가 무서워 미뤄오셨다면,', '그 마음부터 듣고 시작하겠습니다.']}
            delay={0.05}
          />
          <Reveal variant="fade" delay={0.2}>
            <Magnetic strength={0.18}>
              <Link href="/about" className={styles.aboutCtaLink}>
                아트에이치치과 자세히 알아보기
                <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ===== CALM — 축① 진료 전에 불안을 가라앉히는 방법 ===== */}
      <section className={styles.calm}>
        <div className={styles.inner}>
          <Reveal variant="fade">
            <span className={styles.label}><i />{HOME_CALM.label}</span>
          </Reveal>
          <div className={styles.calmHead}>
            <TextReveal as="h2" className={styles.sectionTitle} lines={HOME_CALM.title.split('\n')} delay={0.05} />
            <Reveal variant="fade" delay={0.15}>
              <p className={styles.calmDesc}>{HOME_CALM.desc}</p>
            </Reveal>
          </div>
          {/* 정의문 — 화면과 AI 답변이 같은 문장을 쓰도록 llms.txt와 같은 문장을 노출한다 */}
          <Reveal variant="fade" delay={0.2}>
            <p className={styles.calmDefine}>{HOME_DEFINE}</p>
          </Reveal>
          <div className={styles.calmGrid}>
            {HOME_CALM.cards.map((c, i) => (
              <Reveal key={c.no} variant="fold" delay={0.1 + i * 0.1} duration="0.95s" style={{ height: '100%' }}>
                <article className={styles.calmCard}>
                  <span className={styles.calmNo}>{c.no}</span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  {c.href && (
                    <Link href={c.href} className={styles.calmLink}>
                      {c.link}
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== DOCTOR — 전문의 2인 협진 ===== */}
      <section className={styles.doctor}>
        <div className={styles.inner}>
          <Reveal variant="fade">
            <span className={styles.labelCenter}><i />DOCTORS</span>
          </Reveal>
          <TextReveal as="h2" className={styles.sectionTitleCenter} lines={['구강악안면외과 · 보존과 전문의 협진']} delay={0.05} mode="char" />
          <Reveal variant="fade" delay={0.15}>
            <p className={styles.sectionLeadCenter}>
              수술은 정교하게, 자연치아는 끝까지. 두 분야 전문의가 한 자리에서 정확하게 진단하고 끝까지 책임집니다.
            </p>
          </Reveal>
          <div className={styles.doctorGrid}>
            {DOCTORS.map((d, i) => (
              <Reveal key={d.name} variant="wipe-up" delay={0.12 * i} duration="1.1s" style={{ height: '100%' }}>
                <div className={styles.doctorCard}>
                  <div className={styles.doctorPhoto}>
                    <Photo
                      src={d.photo}
                      alt={`${d.name} ${d.title}`}
                      sizes="(max-width: 768px) 100vw, 40vw"
                      objectPosition={d.objectPosition}
                    />
                  </div>
                  <div className={styles.doctorInfo}>
                    <p className={styles.doctorSpecialty}>{d.specialty}</p>
                    <h3 className={styles.doctorName}>
                      {d.name} <span>{d.title}</span>
                    </h3>
                    <p className={styles.doctorFocus}>{d.focus}</p>
                    <ul className={styles.doctorCareer}>
                      {d.career.slice(0, 3).map((c) => (
                        <li key={c}>{c}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} duration="0.6s">
            <div className={styles.centerLink}>
              <Link href="/doctor" className={styles.underline}>의료진 자세히 보기</Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== TREATMENTS — 7개 ===== */}
      <section className={styles.tx}>
        <div className={styles.inner}>
          <Reveal variant="fade">
            <span className={styles.labelCenter}><i />TREATMENTS</span>
          </Reveal>
          <TextReveal as="h2" className={styles.sectionTitleCenter} lines={['아트에이치치과 진료과목']} delay={0.05} mode="char" />
          <Reveal variant="fade" delay={0.14}>
            <p className={styles.sectionLeadCenter}>
              불편함을 덜고 일상으로 돌아가실 수 있도록, 진단부터 사후관리까지 한 곳에서 진행합니다.
            </p>
          </Reveal>
        </div>

        {/* 카드가 화면에 붙은 채 옆으로 흐른다 — 레퍼런스의 진료과목 구간과 같은 방식 */}
        <PinnedRail count={TREATMENTS.length} label="진료과목 목록" className={styles.txRail}>
          {TREATMENTS.map((t, i) => (
            <Link key={t.slug} href={`/treatments/${t.slug}`} className={styles.txCard} aria-label={`${t.ko} 자세히 보기`}>
              <div className={styles.txImg}>
                <Photo src={t.card} alt={`${t.ko} 이미지`} sizes="(max-width: 768px) 78vw, 340px" />
                <div className={styles.txOverlay} aria-hidden="true" />
                <span className={styles.txNo}>{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className={styles.txLabel}>
                <span className={styles.txEn}>{t.en}</span>
                <span className={styles.txKo}>{t.ko}</span>
                <span className={styles.txSummary}>{t.summary}</span>
                {t.sedationOk && (
                  <span className={styles.txChip}>의식하진정 병행 가능</span>
                )}
              </div>
            </Link>
          ))}
        </PinnedRail>

        <div className={styles.inner}>
          <Reveal variant="fade" delay={0.1}>
            <Magnetic strength={0.18}>
              <Link href="/treatments" className={styles.txMore}>
                진료과목 전체보기
                <span aria-hidden="true">→</span>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </section>

      {/* ===== SPECIAL — 아트에이치의 특별함 01~04 (레퍼런스의 「특별함」 구조) ===== */}
      <section className={styles.special}>
        <div className={styles.inner}>
          <Reveal variant="fade">
            <span className={styles.labelCenter}><i />{HOME_SPECIAL.label}</span>
          </Reveal>
          <TextReveal as="h2" className={styles.sectionTitleCenter} lines={[HOME_SPECIAL.title]} delay={0.05} mode="char" />
          <Reveal variant="fade" delay={0.14}>
            <p className={styles.sectionLeadCenter}>{HOME_SPECIAL.desc}</p>
          </Reveal>
        </div>
        <div className={styles.specialList}>
          {HOME_SPECIAL.items.map((it, i) => (
            <div key={it.no} className={styles.specialRow} data-flip={i % 2 === 1 ? 'true' : undefined}>
              {/* 사진 칸이 격자의 한 칸이어야 좌우 교차(order)와 화면 끝 라운드가 먹는다 */}
              <div className={styles.specialImg}>
                <Reveal variant="zoom-out" duration="1.1s" style={{ height: '100%' }}>
                  <Photo src={it.img} alt={it.alt} sizes="(max-width: 900px) 100vw, 56vw" />
                </Reveal>
              </div>
              <div className={styles.specialBody}>
                <Reveal variant="fade">
                  <span className={styles.specialNo}>{it.no}</span>
                </Reveal>
                <Reveal variant="wipe-left" delay={0.08} duration="1s">
                  <h3>{it.t}</h3>
                </Reveal>
                <Reveal variant="fade" delay={0.18}>
                  <p>{it.d}</p>
                </Reveal>
                {'points' in it && Array.isArray(it.points) && (
                  <ul className={styles.specialPoints}>
                    {it.points.map((pt, pi) => (
                      <li key={pt}>
                        <b>{pi + 1}</b>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <Reveal variant="fade" delay={0.26}>
                  <Link href={it.href} className={styles.specialLink}>
                    {it.link}
                    <span aria-hidden="true">→</span>
                  </Link>
                </Reveal>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== SEDATION — 축① 핵심 증거: 전문의 × 의식하진정 (원장님 지정 조합) ===== */}
      <section className={styles.sedation}>
        <div className={styles.sedationBg} aria-hidden="true">
          <Photo src={SEDATION_BAND.img} alt="" sizes="100vw" />
          <div className={styles.sedationVeil} />
        </div>
        <div className={styles.inner}>
          <div className={styles.sedationBody}>
            <Reveal variant="fade">
              <span className={styles.labelOnDark}><i />{SEDATION_BAND.en}</span>
            </Reveal>
            <TextReveal as="h2" className={styles.sedationTitle} lines={SEDATION_BAND.title.split('\n')} delay={0.06} mode="char" step={0.022} />
            <Reveal variant="fade" delay={0.16}>
              <p className={styles.sedationDesc}>{SEDATION_BAND.d}</p>
            </Reveal>
            <ul className={styles.sedationPoints}>
              {SEDATION_BAND.points.map((pt, i) => (
                <Reveal key={pt.t} as="li" variant="slide-right" delay={0.24 + i * 0.08} duration="0.75s">
                  <AnimatedIcon name="badge" size={18} stroke="var(--c-accent)" delay={0.3 + i * 0.07} />
                  <strong>{pt.t}</strong>
                  <span>{pt.d}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal variant="fade" delay={0.44}>
              <Link href={SEDATION_BAND.href} className={styles.sedationLink}>
                {SEDATION_BAND.link}
                <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== EQUIPMENT — 장비를 한자리에(레퍼런스 구조) ===== */}
      <section className={styles.equip}>
        <div className={styles.inner}>
          <Reveal variant="fade">
            <span className={styles.labelCenter}><i />{HOME_EQUIPMENT.label}</span>
          </Reveal>
          <TextReveal as="h2" className={styles.sectionTitleCenter} lines={[HOME_EQUIPMENT.title]} delay={0.05} mode="char" />
          <Reveal variant="fade" delay={0.14}>
            <p className={styles.sectionLeadCenter}>{HOME_EQUIPMENT.desc}</p>
          </Reveal>
          <div className={styles.equipGrid}>
            {HOME_EQUIPMENT.items.map((it, i) => (
              <Reveal key={it.n} variant="fold" delay={0.08 + i * 0.09} duration="0.95s" style={{ height: '100%' }}>
                <Link href={it.href} className={styles.equipCard}>
                  <div className={styles.equipImg}>
                    <Photo src={it.img} alt={it.alt} sizes="(max-width: 900px) 50vw, 25vw" />
                  </div>
                  <span className={styles.equipEn}>{it.e}</span>
                  <strong className={styles.equipName}>{it.n}</strong>
                  <p className={styles.equipDesc}>{it.d}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FACILITY — 풀블리드 시네마틱 영상 ===== */}
      <section className={styles.facility}>
        <div className={styles.facilityVideoWrap}>
          <video
            className={styles.facilityVideoEl}
            autoPlay
            muted
            playsInline
            loop
            preload="none"
            poster="/media/images/waiting/lounge-video-poster.jpg"
            aria-label="아트에이치치과 대기실 라운지 영상"
          >
            <source src="/media/video/facility-lounge-720.mp4" media="(max-width: 768px)" type="video/mp4" />
            <source src="/media/video/facility-lounge.mp4" type="video/mp4" />
          </video>
          <div className={styles.facilityVideoOverlay} aria-hidden="true" />
          <div className={styles.facilityVideoText}>
            <Reveal duration="0.7s">
              <span className={styles.facilityCaption}>｜ WAITING LOUNGE ｜</span>
            </Reveal>
            <Reveal delay={0.12} duration="0.9s">
              <h2 className={styles.facilityTitle}>송도의 하늘과 맞닿은,<br />편안함을 설계한 공간</h2>
            </Reveal>
          </div>
        </div>
        <div className={styles.inner}>
          <div className={styles.facilityHead}>
            <span className={styles.label}><i />FACILITY</span>
            <Link href="/facility" className={styles.moreLink}>시설 전체보기</Link>
          </div>
          <div className={styles.facilityGrid}>
            {[
              { src: '/media/images/surgery/surgery-02.jpg', label: '수술실 Operation Room' },
              { src: '/media/images/consult/consult-01.jpg', label: '상담실 Consultation' },
              { src: '/media/images/treatment-room/treatment-03.jpg', label: '진료실 Treatment' },
              { src: '/media/images/exterior/exterior-01.jpg', label: '외관 Exterior' },
            ].map((f, i) => (
              <Reveal key={f.src} variant="zoom-out" delay={0.09 * i} duration="1s" style={{ overflow: 'hidden' }}>
                <div className={styles.facilityCell}>
                  <Photo src={f.src} label={f.label} alt={f.label} sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== STATS — 숫자 임팩트 ===== */}
      <section className={styles.stats}>
        <div className={styles.inner}>
          <Reveal variant="fade">
            <span className={styles.labelCenter}><i />WHY ART H</span>
          </Reveal>
          <TextReveal as="h2" className={styles.sectionTitleCenter} lines={['믿고 맡기실 수 있는 이유']} delay={0.05} mode="char" />
          <div className={styles.statsGrid}>
            {STATS.map((s, i) => (
              <Reveal key={s.en} delay={0.08 * i} duration="0.8s" from="translateY(20px)">
                <div className={styles.statItem}>
                  <AnimatedIcon name={s.icon} size={34} stroke="var(--c-blue-text)" delay={0.1 + 0.08 * i} className={styles.statIcon} />
                  <span className={styles.statEn}>{s.en}</span>
                  <p className={styles.statNum}>
                    <CountUp target={parseInt(s.num, 10)} /><em>{s.unit}</em>
                  </p>
                  <p className={styles.statLabel}>{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} duration="0.7s">
            <div className={styles.reviewRow}>
              <p className={styles.reviewText}>{REVIEW_LINK.d}</p>
              <a
                href={SITE.naverPlace}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.reviewBtn}
                aria-label="네이버 플레이스 리뷰 보러가기 (새 창)"
              >
                <span className={styles.reviewDot} aria-hidden="true" />
                {REVIEW_LINK.cta}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== LOCATION ===== */}
      <section className={styles.location}>
        <div className={styles.inner}>
          <div className={styles.locationRow}>
            <div>
              <Reveal duration="0.6s"><span className={styles.label}><i />LOCATION</span></Reveal>
              <Reveal delay={0.1} duration="0.7s"><h2 className={styles.locTitle}>송도 IBS타워 · 업무동 8층</h2></Reveal>
              <Reveal delay={0.15} duration="0.7s"><p className={styles.locSub}>{SITE.address} · 국제업무지구역 5번 출구 470m</p></Reveal>
            </div>
            <Reveal delay={0.2} duration="0.5s">
              <Link href="/location" className={styles.underline}>오시는길 안내</Link>
            </Reveal>
          </div>

          <div className={styles.locContent}>
            <div className={styles.locCardGrid}>
              <Reveal delay={0.1} duration="0.7s" from="translateY(16px)">
                <div className={styles.locCard}>
                  <span className={styles.locCardLabel}>SUBWAY</span>
                  <p className={styles.locCardText}>인천1호선 국제업무지구역<br /><strong>5번 출구 470m</strong> (G타워 방면)</p>
                </div>
              </Reveal>
              <Reveal delay={0.18} duration="0.7s" from="translateY(16px)">
                <div className={styles.locCard}>
                  <span className={styles.locCardLabel}>PARKING</span>
                  <p className={styles.locCardText}>지하 1~3층 주차 가능<br /><strong>‘업무동 저층용’</strong> 엘리베이터 이용</p>
                </div>
              </Reveal>
              <Reveal delay={0.26} duration="0.7s" from="translateY(16px)">
                <div className={styles.locCard}>
                  <span className={styles.locCardLabel}>HOURS</span>
                  <p className={styles.locCardText}>월·목 야간 <strong>~20:30</strong><br />평일 09:30~18:30 · 토 ~14:00</p>
                </div>
              </Reveal>
              <Reveal delay={0.34} duration="0.7s" from="translateY(16px)">
                <div className={styles.locCard}>
                  <span className={styles.locCardLabel}>CALL</span>
                  <p className={styles.locCardText}>예약 및 문의<br /><strong>{SITE.phone}</strong></p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.4} duration="0.9s" from="translateY(20px)" style={{ height: '100%' }}>
              <Link href="/location" className={styles.locMapWrap} aria-label="오시는길 약도 — 자세히 보기">
                <Image
                  src="/media/images/exterior/map-illustration.jpg"
                  alt="아트에이치치과 약도 — 송도 IBS타워, 국제업무지구역 5번 출구 도보 5분"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: 'contain' }}
                />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
