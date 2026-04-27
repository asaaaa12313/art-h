'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Photo from '@/components/Photo';
import Reveal from '@/components/Reveal';
import HeroVideo from '@/components/HeroVideo';
import { V } from '@/lib/visuals';
import { SITE } from '@/lib/copy';
import styles from './Home.module.css';

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [offset, setOffset] = useState(0);
  const [showHeroText, setShowHeroText] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setLoaded(true), 150);
    const on = () => setOffset(window.scrollY);
    window.addEventListener('scroll', on, { passive: true });
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('scroll', on);
    };
  }, []);

  // 첫 영상이 끝나면 텍스트 영구 숨김 — 이후 영상 사이클 되돌아와도 재노출 X
  const handleVideoIndexChange = (idx: number) => {
    if (idx > 0) setShowHeroText(false);
  };

  return (
    <>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroBg} style={{ transform: `translateY(${offset * 0.1}px)`, height: '115%' }}>
          <HeroVideo
            videos={[
              { mp4: '/media/video/hero-1.mp4', webm: '/media/video/hero-1.webm', mp4Mobile: '/media/video/hero-1-720.mp4' },
              { mp4: '/media/video/hero-2.mp4', mp4Mobile: '/media/video/hero-2-720.mp4' },
              { mp4: '/media/video/hero-3.mp4', mp4Mobile: '/media/video/hero-3-720.mp4' },
              { mp4: '/media/video/hero-4.mp4', mp4Mobile: '/media/video/hero-4-720.mp4' },
              { mp4: '/media/video/hero-5.mp4', mp4Mobile: '/media/video/hero-5-720.mp4' },
            ]}
            poster="/media/video/hero-poster.jpg"
            alt="아트에이치치과 병원 소개 영상"
            onIndexChange={handleVideoIndexChange}
          />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className={styles.heroContent}>
          <p className={styles.heroEyebrow} data-loaded={loaded} data-visible={showHeroText}>송도 국제도시</p>
          <h1 className={styles.heroTitle} data-loaded={loaded} data-visible={showHeroText}>
            진료 너머,<br />사람의 고귀함을<br />생각합니다
          </h1>
          <p className={styles.heroSub} data-loaded={loaded} data-visible={showHeroText}>
            한 분 한 분의 이야기에 귀 기울이며,<br />끝까지 책임지는 진료를 추구합니다.
          </p>
          <div className={styles.heroCtas} data-loaded={loaded} data-visible={showHeroText}>
            <Link href="/about" className={styles.heroCta}>의원소개</Link>
            <Link href="/treatments" className={styles.heroCta}>진료과목</Link>
            <Link href="/location" className={styles.heroCta}>오시는길</Link>
            <a href={`tel:${SITE.phone.replace(/-/g, '')}`} className={styles.heroCta}>전화문의</a>
          </div>
        </div>
        <div className={styles.scrollHint} data-loaded={loaded} data-visible={showHeroText} aria-hidden="true">
          <span>SCROLL</span>
          <div className={styles.scrollHintLine} />
        </div>
      </section>

      {/* STORY — asymmetric 5:4 */}
      <section className={styles.story}>
        <div className={styles.storyGrid}>
          <div>
            <Reveal duration="0.7s">
              <h2 className={styles.storyTitle}>
                치과는 항상 꺼려졌는데,<br />이제는 마음 편하게<br />방문할 수 있어요.
              </h2>
            </Reveal>
            <Reveal delay={0.15} duration="0.9s">
              <p className={styles.storyText}>
                좋은 치과는 치료를 잘하는 곳이 아니라, 다시 가고 싶은 곳이라고 생각합니다.
                아트에이치치과는 처음 문을 여는 순간부터 치료가 끝난 뒤 일상으로 돌아가는 순간까지, 모든 경험을 설계합니다.
              </p>
            </Reveal>
            <Reveal delay={0.25} duration="0.6s">
              <Link href="/about" className={styles.underline}>더 알아보기</Link>
            </Reveal>
          </div>
          <Reveal delay={0.2} duration="1.2s" from="translateX(40px)">
            <div className={styles.storyImg}>
              <Photo
                src="/media/images/waiting/waiting-01.jpg"
                alt="아트에이치치과 대기실"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* TREATMENTS — 3 image cards */}
      <section className={styles.tx}>
        <div className={styles.txHead}>
          <Reveal>
            <div className={styles.sectionHead}>
              <h2 className={styles.h2}>진료과목</h2>
              <Link href="/treatments" className={styles.moreLink}>전체보기</Link>
            </div>
          </Reveal>
        </div>
        <div className={styles.txGrid}>
          {[
            { en: 'Implant', ko: '임플란트', src: '/media/images/surgery/surgery-01.jpg' },
            { en: 'Root Canal', ko: '신경치료', src: '/media/images/treatment-room/treatment-01.jpg' },
            { en: 'Oral Surgery', ko: '사랑니 발치', src: '/media/images/xray/xray-01.jpg' },
          ].map((t, i) => (
            <Reveal key={t.en} delay={0.1 + i * 0.12} duration="1s" from="scale(0.96)">
              <Link href="/treatments" className={styles.txCard} aria-label={`${t.ko} 자세히 보기`}>
                <Photo src={t.src} alt={`${t.ko} 이미지`} sizes="(max-width: 768px) 100vw, 33vw" />
                <div className={styles.txOverlay} aria-hidden="true" />
                <div className={styles.txLabel}>
                  <span className={styles.txEn}>{t.en}</span>
                  <span className={styles.txKo}>{t.ko}</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DOCTOR — full bleed split */}
      <section className={styles.doctor}>
        <Reveal duration="1.3s" from="scale(1.03)" style={{ overflow: 'hidden', height: '100%' }}>
          <Photo
            src="/media/images/doctor/doctor-01.jpg"
            alt="아트에이치치과 원장 진료 장면"
            sizes="(max-width: 768px) 100vw, 55vw"
            objectPosition="center 45%"
          />
        </Reveal>
        <div className={styles.doctorBody}>
          <Reveal delay={0.2} duration="0.6s">
            <p className={styles.eyebrow}>DOCTORS</p>
          </Reveal>
          <Reveal delay={0.3} duration="0.7s">
            <h2 className={styles.doctorTitle}>
              구강외과 · 보존과<br />전문의 협진
            </h2>
          </Reveal>
          <Reveal delay={0.4} duration="0.8s">
            <p className={styles.doctorText}>
              수술은 정교하게, 자연치아는 끝까지.<br />
              <strong style={{ color: 'var(--c-navy)', fontWeight: 600 }}>최종원 원장</strong>(구강외과)과 <strong style={{ color: 'var(--c-navy)', fontWeight: 600 }}>강지수 원장</strong>(보존과)이 한 자리에서 정확하게 진단하고 끝까지 책임집니다.
            </p>
          </Reveal>
          <Reveal delay={0.5} duration="0.5s">
            <Link href="/doctor" className={styles.underline}>의료진 소개</Link>
          </Reveal>
        </div>
      </section>

      {/* FACILITY — 2:1 masonry */}
      <section className={styles.facility}>
        <div className={styles.facilityInner}>
          <Reveal>
            <div className={styles.sectionHead}>
              <h2 className={styles.h2}>시설안내</h2>
              <Link href="/facility" className={styles.moreLink}>전체보기</Link>
            </div>
          </Reveal>
          <div className={styles.facilityGrid}>
            <Reveal duration="1.1s" from="scale(0.97)" style={{ gridRow: '1/3', overflow: 'hidden' }}>
              <Photo
                src="/media/images/waiting/waiting-02.jpg"
                label="대기실 Waiting Lounge"
                alt="아트에이치치과 대기실"
                sizes="(max-width: 768px) 100vw, 66vw"
              />
            </Reveal>
            <Reveal delay={0.15} duration="1s" from="translateX(30px)" style={{ overflow: 'hidden' }}>
              <Photo
                src="/media/images/surgery/surgery-02.jpg"
                label="수술실 Operation Room"
                alt="아트에이치치과 수술실"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </Reveal>
            <Reveal delay={0.25} duration="1s" from="translateX(30px)" style={{ overflow: 'hidden' }}>
              <Photo
                src="/media/images/consult/consult-01.jpg"
                label="상담실 Consultation"
                alt="아트에이치치과 상담실"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section className={styles.location}>
        <div className={styles.locationInner}>
          <div className={styles.locationRow}>
            <div>
              <Reveal duration="0.6s"><p className={styles.eyebrow}>LOCATION</p></Reveal>
              <Reveal delay={0.1} duration="0.7s"><h2 className={styles.locTitle}>송도 IBS타워 · 업무동 8층</h2></Reveal>
              <Reveal delay={0.15} duration="0.7s"><p className={styles.locSub}>인천광역시 연수구 센트럴로 263 · 국제업무지구역 5번 출구 470m</p></Reveal>
            </div>
            <Reveal delay={0.2} duration="0.5s">
              <Link href="/location" className={styles.underline}>오시는길 안내</Link>
            </Reveal>
          </div>

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
                <span className={styles.locCardLabel}>BUS</span>
                <p className={styles.locCardText}>경제자유구역청 하차 (38515)<br /><strong>82 / 92 / 42 / 43</strong></p>
              </div>
            </Reveal>
            <Reveal delay={0.34} duration="0.7s" from="translateY(16px)">
              <div className={styles.locCard}>
                <span className={styles.locCardLabel}>CAR</span>
                <p className={styles.locCardText}>내비게이션 검색<br /><strong>‘연수구 센트럴로 263’</strong></p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.4} duration="0.9s" from="translateY(20px)">
            <Link href="/location" className={styles.locMapWrap} aria-label="오시는길 약도 — 자세히 보기">
              <Image
                src="/media/images/exterior/map-illustration.jpg"
                alt="아트에이치치과 약도 — 송도 IBS타워, 국제업무지구역 1·3·5번 출구 도보 5분"
                fill
                sizes="(max-width: 768px) 100vw, 1100px"
                style={{ objectFit: 'contain' }}
              />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
