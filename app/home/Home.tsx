'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import HeroVideo from '@/components/HeroVideo';
import CountUp from '@/components/CountUp';
import AnimatedIcon from '@/components/AnimatedIcon';
import TextReveal from '@/components/TextReveal';
import HeroIntro from '@/components/HeroIntro';
import { SITE, TREATMENTS, DOCTORS, PROMISE_ITEMS, SYSTEM_ITEMS } from '@/lib/copy';
import styles from './Home.module.css';

// Hero 사진 인트로 — 사진 3장(대기실·외관·상담실)을 줌+크로스페이드로 먼저 보여준 뒤 영상으로 전환.
// 인사 문구는 사진 인트로에서만 노출되고, 영상으로 넘어가면 사라진다. CTA는 계속 유지.
const HERO_PHOTOS = [
  { src: '/media/images/waiting/waiting-01.jpg', alt: '아트에이치치과 대기실 라운지' },
  { src: '/media/images/exterior/exterior-01.jpg', alt: '송도 IBS타워 외관' },
  { src: '/media/images/consult/consult-01.jpg', alt: '아트에이치치과 상담실' },
];

// Hero 영상 — 사진 인트로 후 재생되는 시퀀스.
// 휴게실(라운지)·복도는 제외하고 수술실 → 원장님 영상 2개 → 수술실 풀세팅(07.21 촬영) 순 4개 재생.
// 시퀀스가 끝나면 영상 루프 대신 사진 인트로부터 다시 시작(Home의 cycle 참조).
const HERO_VIDEOS = [
  { mp4: '/media/video/hero-1.mp4', mp4Mobile: '/media/video/hero-1-720.mp4' }, // 진료실 유닛체어(수술실)
  { mp4: '/media/video/hero-3.mp4', mp4Mobile: '/media/video/hero-3-720.mp4' }, // 원장님 덴티폼 상담
  { mp4: '/media/video/hero-5.mp4', mp4Mobile: '/media/video/hero-5-720.mp4' }, // 원장님 미소
  { mp4: '/media/video/hero-6.mp4', mp4Mobile: '/media/video/hero-6-720.mp4' }, // 수술실 풀세팅 짐벌(07.21 촬영)
];

// 진료과목 카드 이미지 (slug → 실사 매핑)
const TX_IMG: Record<string, string> = {
  implant: '/media/images/surgery/surgery-01.jpg',
  'root-canal': '/media/images/treatment-room/treatment-01.jpg',
  'oral-surgery': '/media/images/xray/xray-01.jpg',
  tmj: '/media/images/treatment-room/treatment-02.jpg',
  sedation: '/media/images/recovery/recovery-01.jpg',
  periodontics: '/media/images/equipment/gbt-clinic.jpg',
  whitening: '/media/images/consult/consult-02.jpg',
};

// 숫자 임팩트 — 전부 실재 사실 (copy.ts 근거)
const STATS = [
  { en: 'STERILIZATION', num: '9', unit: '단계', label: 'Class B 고압증기멸균 시스템', icon: 'shield' },
  { en: 'SPECIALISTS', num: '2', unit: '인', label: '구강악안면외과 · 보존과 전문의 협진', icon: 'users' },
  { en: 'TREATMENTS', num: '7', unit: '과목', label: '임플란트부터 미백까지 전 진료', icon: 'layers' },
  { en: 'SONGDO IBS', num: '8', unit: '층', label: '국제업무지구역 IBS타워', icon: 'building' },
];

// 약속·시스템 카드 라인 아이콘 (순서 = copy.ts 배열 순서)
const PROMISE_ICONS = ['users', 'leaf', 'chat', 'home'];
const SYSTEM_ICONS = ['shield', 'door', 'badge'];

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [heroPhase, setHeroPhase] = useState<'photos' | 'video'>('photos');
  const [cycle, setCycle] = useState(0); // 사진→영상→사진 순환 카운터 (HeroIntro 리마운트용)
  const inIntro = heroPhase === 'photos';

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
        <div className={styles.heroBg} style={{ transform: `translateY(${offset * 0.08}px)`, height: '115%' }}>
          {heroPhase === 'video' && (
            <HeroVideo
              videos={HERO_VIDEOS}
              poster="/media/video/hero-1-poster.jpg"
              alt="아트에이치치과 병원 소개 영상"
              onComplete={() => {
                // 영상 시퀀스 종료 → 영상 루프 대신 사진 인트로부터 다시 시작
                setHeroPhase('photos');
                setCycle((c) => c + 1);
              }}
            />
          )}
          <HeroIntro key={cycle} photos={HERO_PHOTOS} perSlide={2500} onComplete={() => setHeroPhase('video')} />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <div className={styles.heroLine} data-loaded={loaded && inIntro} data-exit={!inIntro ? 'true' : undefined} aria-hidden="true" />
          <p className={styles.heroEyebrow} data-loaded={loaded && inIntro} data-exit={!inIntro ? 'true' : undefined}>SONGDO · ART H DENTAL</p>
          <h1 className={styles.heroTitle} data-loaded={loaded && inIntro} data-exit={!inIntro ? 'true' : undefined}>
            진료 너머,<br />사람의 고귀함을<br />생각합니다
          </h1>
          <p className={styles.heroSub} data-loaded={loaded && inIntro} data-exit={!inIntro ? 'true' : undefined}>
            한 분 한 분의 이야기에 귀 기울이며,<br />끝까지 책임지는 진료를 추구합니다.
          </p>
          <div className={styles.heroCtas} data-loaded={loaded}>
            <Link href="/about" className={styles.heroCta}>의원소개</Link>
            <Link href="/treatments" className={styles.heroCta}>진료과목</Link>
            <Link href="/location" className={styles.heroCta}>오시는길</Link>
            <a href={`tel:${SITE.phone.replace(/-/g, '')}`} className={styles.heroCtaPrimary}>전화문의</a>
          </div>
        </div>
        <div className={styles.scrollHint} data-loaded={loaded} aria-hidden="true">
          <span>SCROLL</span>
          <div className={styles.scrollHintLine} />
        </div>
      </section>

      {/* ===== INTRO — 감성 1인칭 ===== */}
      <section className={styles.intro}>
        <div className={styles.introGrid}>
          <div>
            <Reveal duration="0.6s">
              <span className={styles.label}><i />BEYOND TREATMENT</span>
            </Reveal>
            <Reveal delay={0.1} duration="0.8s">
              <h2 className={styles.introTitle}>
                치과는 늘 망설여지던 곳,<br />이제는 마음 편히<br />찾을 수 있는 곳으로.
              </h2>
            </Reveal>
            <Reveal delay={0.2} duration="0.9s">
              <p className={styles.introBody}>
                좋은 치과는 치료를 잘하는 곳이 아니라,<br className={styles.brPc} /> 다시 가고 싶은 곳이라 믿습니다.
              </p>
              <p className={styles.introBody}>
                아트에이치치과는 처음 문을 여는 순간부터<br className={styles.brPc} /> 치료가 끝나고 일상으로 돌아가는 순간까지,<br className={styles.brPc} /> 머무시는 모든 시간을 세심하게 설계합니다.
              </p>
            </Reveal>
            <Reveal delay={0.3} duration="0.6s">
              <Link href="/about" className={styles.underline}>아트에이치 이야기</Link>
            </Reveal>
          </div>
          <Reveal delay={0.15} duration="1.2s" from="translateX(40px)">
            <div className={styles.introImg}>
              <Photo
                src="/media/images/waiting/waiting-01.jpg"
                alt="아트에이치치과 대기실"
                sizes="(max-width: 768px) 100vw, 48vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ===== QUOTE — 풀블리드 에디토리얼 ===== */}
      <section className={styles.quote}>
        <div className={styles.quoteBg} style={{ transform: `translateY(${(offset - 900) * 0.04}px)` }}>
          <Photo
            src="/media/images/waiting/waiting-02.jpg"
            alt="아트에이치치과 대기실 라운지"
            sizes="100vw"
            objectPosition="center 55%"
          />
          <div className={styles.quoteOverlay} aria-hidden="true" />
        </div>
        <div className={styles.quoteContent}>
          <Reveal duration="0.7s">
            <span className={styles.quoteCaption}>｜ A PLACE TO RETURN ｜</span>
          </Reveal>
          <Reveal delay={0.12} duration="0.9s">
            <p className={styles.quoteText}>
              충분한 시간을 드리는 것,<br />그것이 우리가 선택한 방식입니다.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ===== STATS — 숫자 임팩트 ===== */}
      <section className={styles.stats}>
        <div className={styles.inner}>
          <Reveal variant="fade">
            <span className={styles.labelCenter}><i />WHY ART H</span>
          </Reveal>
          <TextReveal as="h2" className={styles.sectionTitleCenter} lines={['믿고 맡기실 수 있는 이유']} delay={0.05} />
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
        </div>
      </section>

      {/* ===== PROMISE — 약속 4 ===== */}
      <section className={styles.promise}>
        <div className={styles.inner}>
          <Reveal variant="fade">
            <span className={styles.label}><i />OUR PROMISE</span>
          </Reveal>
          <TextReveal as="h2" className={styles.sectionTitle} lines={['아트에이치치과의 네 가지 약속']} delay={0.05} />
          <div className={styles.promiseGrid}>
            {PROMISE_ITEMS.map((p, i) => (
              <Reveal key={p.no} delay={0.08 * i} duration="0.8s" from="translateY(20px)" style={{ height: '100%' }}>
                <div className={styles.promiseCard}>
                  <div className={styles.promiseTop}>
                    <span className={styles.promiseNo}>{p.no}</span>
                    <AnimatedIcon name={PROMISE_ICONS[i % PROMISE_ICONS.length]} size={26} stroke="var(--c-blue)" delay={0.2} className={styles.promiseIcon} />
                  </div>
                  <h3 className={styles.promiseT}>{p.t}</h3>
                  <p className={styles.promiseD}>{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TREATMENTS — 7개 ===== */}
      <section className={styles.tx}>
        <div className={styles.inner}>
          <Reveal>
            <div className={styles.sectionHead}>
              <div>
                <span className={styles.label}><i />TREATMENTS</span>
                <h2 className={styles.sectionTitle}>진료과목</h2>
              </div>
              <Link href="/treatments" className={styles.moreLink}>전체보기</Link>
            </div>
          </Reveal>
          <div className={styles.txGrid}>
            {TREATMENTS.map((t, i) => (
              <Reveal key={t.slug} delay={0.05 + (i % 3) * 0.08} duration="0.9s" from="scale(0.97)" style={{ height: '100%' }}>
                <Link href={`/treatments/${t.slug}`} className={styles.txCard} aria-label={`${t.ko} 자세히 보기`}>
                  <div className={styles.txImg}>
                    <Photo src={TX_IMG[t.slug]} alt={`${t.ko} 이미지`} sizes="(max-width: 768px) 50vw, 33vw" />
                    <div className={styles.txOverlay} aria-hidden="true" />
                    <span className={styles.txNo}>{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className={styles.txLabel}>
                    <span className={styles.txEn}>{t.en}</span>
                    <span className={styles.txKo}>{t.ko}</span>
                    <span className={styles.txSummary}>{t.summary}</span>
                  </div>
                </Link>
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
          <TextReveal as="h2" className={styles.sectionTitleCenter} lines={['구강악안면외과 · 보존과 전문의 협진']} delay={0.05} />
          <Reveal variant="fade" delay={0.15}>
            <p className={styles.sectionLeadCenter}>
              수술은 정교하게, 자연치아는 끝까지. 두 분야 전문의가 한 자리에서 정확하게 진단하고 끝까지 책임집니다.
            </p>
          </Reveal>
          <div className={styles.doctorGrid}>
            {DOCTORS.map((d, i) => (
              <Reveal key={d.name} delay={0.1 * i} duration="0.9s" from="translateY(24px)" style={{ height: '100%' }}>
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

      {/* ===== SYSTEM — 진료 시스템 4 (네이비) ===== */}
      <section className={styles.system}>
        <div className={styles.inner}>
          <Reveal variant="fade">
            <span className={styles.label}><i />CARE SYSTEM</span>
          </Reveal>
          <TextReveal as="h2" className={styles.sectionTitle} lines={['믿고 맡기실 수 있는 진료 시스템']} delay={0.05} />
          <div className={styles.systemGrid}>
            {SYSTEM_ITEMS.map((s, i) => (
              <Reveal key={s.t} delay={0.07 * i} duration="0.8s" from="translateY(18px)" style={{ height: '100%' }}>
                <div className={styles.systemRow}>
                  <span className={styles.systemNo}>{String(i + 1).padStart(2, '0')}</span>
                  <div className={styles.systemBody}>
                    <h3 className={styles.systemT}>{s.t}</h3>
                    <p className={styles.systemD}>{s.d}</p>
                  </div>
                  <AnimatedIcon name={SYSTEM_ICONS[i % SYSTEM_ICONS.length]} size={30} stroke="var(--c-blue-l)" delay={0.1 + 0.07 * i} className={styles.systemIcon} />
                </div>
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
              <Reveal key={f.src} delay={0.08 * i} duration="0.9s" from="translateY(18px)" style={{ overflow: 'hidden' }}>
                <div className={styles.facilityCell}>
                  <Photo src={f.src} label={f.label} alt={f.label} sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
              </Reveal>
            ))}
          </div>
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
