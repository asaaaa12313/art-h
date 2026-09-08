'use client';

import { CSSProperties, ElementType, useEffect, useRef, useState } from 'react';

/**
 * 제목 등장 — 가려진 칸(overflow:hidden) 안에서 아래에서 제자리로 밀려 올라온다.
 *
 * mode="line" : 줄 단위. 문장이 길거나 본문에 가까운 제목에 쓴다(차분하다).
 * mode="char" : 글자 단위로 아주 짧게 시차를 준다. 광고 영상 자막처럼 글자가 차례로 서면서
 *               섹션이 시작된다는 신호가 분명해진다 — 핵심 섹션 제목에만 쓴다.
 *
 * 글자 단위여도 낱말은 통째로 감싸 줄바꿈이 낱말 가운데서 일어나지 않게 한다.
 * 「동작 줄이기」를 켠 환경과 이미 화면에 들어와 있는 경우에는 즉시 보인다.
 */
type Props = {
  lines: string[];
  className?: string;
  as?: ElementType;
  delay?: number;
  duration?: string;
  style?: CSSProperties;
  mode?: 'line' | 'char';
  /** 글자 사이 간격(초) — mode="char"에서만 */
  step?: number;
};

export default function TextReveal({
  lines,
  className,
  as: Tag = 'h2',
  delay = 0,
  duration = '0.9s',
  style,
  mode = 'line',
  step = 0.028,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [vis, setVis] = useState(false);
  const [instant, setInstant] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInstant(true);
      setVis(true);
      return;
    }
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setVis(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Comp = Tag as ElementType;

  if (mode === 'char') {
    let n = 0;
    // 글자를 낱개로 쪼개면 스크린리더가 한 자씩 끊어 읽는다 —
    // 문장 전체를 aria-label로 주고, 쪼갠 조각은 읽기에서 감춘다.
    return (
      <Comp ref={ref} className={className} style={style} aria-label={lines.join(' ')}>
        {lines.map((li_, li) => (
          <span key={li} style={{ display: 'block' }} aria-hidden="true">
            {li_.split(' ').map((word, wi, arr) => (
              <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
                {[...word].map((ch, ci) => {
                  const d = delay + n * step;
                  n += 1;
                  return (
                    <span key={ci} style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          transform: vis ? 'none' : 'translateY(105%)',
                          opacity: vis ? 1 : 0,
                          transition: instant
                            ? 'none'
                            : `transform ${duration} var(--ease-out) ${d}s, opacity 0.4s ease ${d}s`,
                        }}
                      >
                        {ch}
                      </span>
                    </span>
                  );
                })}
                {wi < arr.length - 1 && <span style={{ display: 'inline-block', width: '0.28em' }} />}
              </span>
            ))}
          </span>
        ))}
      </Comp>
    );
  }

  return (
    <Comp ref={ref} className={className} style={style}>
      {lines.map((ln, i) => (
        <span key={i} style={{ display: 'block', overflow: 'hidden' }}>
          <span
            style={{
              display: 'block',
              transform: vis ? 'none' : 'translateY(115%)',
              transition: instant ? 'none' : `transform ${duration} var(--ease-out) ${delay + i * 0.08}s`,
            }}
          >
            {ln}
          </span>
        </span>
      ))}
    </Comp>
  );
}
