'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './HeroStage.module.css';

export type Slide =
  | { kind: 'photo'; src: string; alt: string; hold?: number; focus?: string }
  | { kind: 'video'; mp4: string; mp4Mobile?: string; poster: string; alt: string; focus?: string };

type Props = {
  slides: Slide[];
  /** 사진 한 장이 머무는 기본 시간(ms). 영상은 끝날 때까지 재생한다. */
  photoHold?: number;
  /** 현재 장면과 이동 함수를 부모에게 알린다 — 도트를 히어로 콘텐츠 층에서 그리기 위해서다.
   *  무대 안에 두면 배경의 시차 이동·초과 높이에 같이 잘린다. */
  onState?: (state: { index: number; total: number; goTo: (i: number) => void }) => void;
};

/**
 * 히어로 무대 — 사진과 영상이 번갈아 나온다.
 *
 * 전환은 "접히며 사라진다"는 요구에 맞춰 두 겹으로 만든다.
 *  · 나가는 장면: 위아래로 눌려 접히고(scaleY) 동시에 옆으로 닦여 나간다(clip-path)
 *  · 들어오는 장면: 반대편에서 펼쳐지며 살짝 확대된 상태로 시작해 제자리를 찾는다
 * 두 장면이 같은 순간에 겹쳐 있어야 하므로 레이어를 두 장 유지한다(현재/직전).
 *
 * 영상은 필요한 순간에만 로드한다. 사진 구간에서는 <video>를 만들지 않으므로
 * 첫 화면 로딩에 영상 무게가 얹히지 않는다.
 */
export default function HeroStage({ slides, photoHold = 3400, onState }: Props) {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobile = window.matchMedia('(max-width: 768px)');
    setReduced(motion.matches);
    setIsMobile(mobile.matches);
    const onMotion = (e: MediaQueryListEvent) => setReduced(e.matches);
    const onMobile = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    motion.addEventListener('change', onMotion);
    mobile.addEventListener('change', onMobile);
    return () => {
      motion.removeEventListener('change', onMotion);
      mobile.removeEventListener('change', onMobile);
    };
  }, []);

  const go = useCallback(
    (next: number) => {
      setPrev(index);
      setIndex(next);
      // 전환이 끝나면 직전 레이어를 치운다(계속 쌓이면 메모리·페인트 비용이 는다)
      window.setTimeout(() => setPrev(null), 1200);
    },
    [index]
  );

  const advance = useCallback(() => {
    go((index + 1) % slides.length);
  }, [go, index, slides.length]);

  // 사진 구간만 타이머로 넘긴다. 영상은 onEnded가 넘긴다.
  useEffect(() => {
    const cur = slides[index];
    window.clearTimeout(timer.current);
    if (cur.kind === 'photo') {
      const hold = cur.hold ?? photoHold;
      timer.current = window.setTimeout(advance, hold);
    }
    return () => window.clearTimeout(timer.current);
  }, [index, slides, photoHold, advance]);

  // 영상 슬라이드로 들어오면 처음부터 재생.
  // 자동재생이 막히거나(저전력 모드·데이터 절약) 디코딩이 실패하면 onEnded가 오지 않아
  // 그 장면에서 영영 멈춘다 — 재생 길이를 못 얻어도 넘어가도록 최대 대기 시간을 함께 건다.
  useEffect(() => {
    const cur = slides[index];
    if (cur.kind !== 'video') return;
    const v = videoRef.current;
    if (!v) return;

    let watchdog = 0;
    const arm = (ms: number) => {
      window.clearTimeout(watchdog);
      watchdog = window.setTimeout(advance, ms);
    };

    v.load();
    const play = () => {
      const p = v.play();
      if (p && typeof p.catch === 'function') p.catch(() => arm(2000));
      // 길이를 알면 그보다 2초 길게, 모르면 12초 뒤에는 무조건 넘긴다
      arm(Number.isFinite(v.duration) && v.duration > 0 ? v.duration * 1000 + 2000 : 12000);
    };
    const fail = () => arm(600);

    v.addEventListener('canplay', play, { once: true });
    v.addEventListener('error', fail, { once: true });
    arm(12000);

    return () => {
      window.clearTimeout(watchdog);
      v.removeEventListener('canplay', play);
      v.removeEventListener('error', fail);
    };
  }, [index, slides, isMobile, advance]);

  // 부모(히어로)가 도트를 그릴 수 있도록 현재 상태를 올려 준다
  useEffect(() => {
    onState?.({ index, total: slides.length, goTo: go });
  }, [index, slides.length, go, onState]);

  // 전환 방식을 회차마다 바꾼다 — 같은 동작이 반복되면 두 번째부터는 눈에 안 들어온다.
  // 0 접힘 / 1 닦임 / 2 확대 / 3 밀림
  const anim = index % 4;

  const render = (i: number, role: 'current' | 'prev') => {
    const s = slides[i];
    const key = `${role}-${i}`;
    if (s.kind === 'photo') {
      return (
        <div key={key} className={styles.layer} data-role={role} data-anim={anim}>
          <Image
            src={s.src}
            alt={role === 'current' ? s.alt : ''}
            fill
            priority={i === 0}
            sizes="100vw"
            className={styles.media}
            style={s.focus ? { objectPosition: s.focus } : undefined}
          />
        </div>
      );
    }
    return (
      <div key={key} className={styles.layer} data-role={role} data-anim={anim}>
        {role === 'current' ? (
          <video
            ref={videoRef}
            className={styles.media}
            poster={s.poster}
            autoPlay
            muted
            playsInline
            preload="auto"
            onEnded={advance}
            aria-label={s.alt}
          >
            {isMobile && s.mp4Mobile && <source src={s.mp4Mobile} type="video/mp4" />}
            <source src={s.mp4} type="video/mp4" />
          </video>
        ) : (
          // 나가는 영상은 포스터로 대체한다 — 같은 영상을 두 번 디코딩하지 않게
          <Image src={s.poster} alt="" fill sizes="100vw" className={styles.media} />
        )}
      </div>
    );
  };

  // 모션을 줄이는 설정이면 첫 장면만 정지 상태로 보여 준다
  if (reduced) {
    const first = slides[0];
    const src = first.kind === 'photo' ? first.src : first.poster;
    return (
      <div className={styles.stage}>
        <div className={styles.layer} data-role="current" data-static="true">
          <Image src={src} alt={first.alt} fill priority sizes="100vw" className={styles.media} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.stage}>
      {prev !== null && prev !== index && render(prev, 'prev')}
      {render(index, 'current')}

    </div>
  );
}
