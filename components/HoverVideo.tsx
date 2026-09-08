'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  mp4: string;
  mp4Mobile?: string;
  /** 재생 전까지 보이는 사진 */
  poster: string;
  className?: string;
};

/**
 * 마우스를 올리면 재생되는 카드 영상.
 *
 * 처음부터 자동 재생하지 않는 이유: 카드가 여러 장이라 한꺼번에 틀면
 * 첫 화면이 무거워지고, 배터리를 쓰는 기기에서 발열까지 생긴다.
 * 그래서 `preload="none"`으로 두고, 마우스를 올린 그 카드 한 장만 불러 재생한다.
 * 손을 떼면 멈추고 처음으로 되감아 사진으로 돌아간다.
 *
 * 터치 기기와 「동작 줄이기」를 켠 환경에서는 아예 불러오지 않는다 — 사진만 보인다.
 */
export default function HoverVideo({ mp4, mp4Mobile, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia('(hover: hover)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setEnabled(ok);
  }, []);

  // 부모 카드의 hover를 그대로 받는다 — 카드 어디에 올려도 재생된다
  useEffect(() => {
    if (!enabled) return;
    const v = ref.current;
    const card = v?.closest('a');
    if (!v || !card) return;

    const on = () => {
      setPlaying(true);
      v.play().catch(() => setPlaying(false)); // 자동재생이 막히면 사진 그대로
    };
    const off = () => {
      setPlaying(false);
      v.pause();
      v.currentTime = 0;
    };
    card.addEventListener('mouseenter', on);
    card.addEventListener('mouseleave', off);
    card.addEventListener('focusin', on);
    card.addEventListener('focusout', off);
    return () => {
      card.removeEventListener('mouseenter', on);
      card.removeEventListener('mouseleave', off);
      card.removeEventListener('focusin', on);
      card.removeEventListener('focusout', off);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <video
      ref={ref}
      className={className}
      data-on={playing}
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-hidden="true"
      tabIndex={-1}
    >
      {mp4Mobile && <source src={mp4Mobile} media="(max-width: 768px)" type="video/mp4" />}
      <source src={mp4} type="video/mp4" />
    </video>
  );
}
