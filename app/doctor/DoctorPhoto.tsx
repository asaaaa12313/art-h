'use client';

import { useEffect, useRef } from 'react';
import Photo from '@/components/Photo';

type Props = {
  src: string;
  label: string;
  alt: string;
};

// 약력 영역 스크롤 진행도에 따라 사진의 object-position Y를
// 15%(상단) → 85%(하단)로 패닝. setState 대신 DOM 직접 조작으로 리렌더 회피.
// 모바일(<=768px)은 sticky 미사용·정적 비율이므로 listener 등록 자체 skip.
export default function DoctorPhoto({ src, label, alt }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    const wrap = wrapRef.current;
    if (!wrap) return;
    const block = wrap.closest('[data-doc-block]') as HTMLElement | null;
    if (!block) return;

    let rafId = 0;
    const apply = () => {
      rafId = 0;
      const img = wrap.querySelector('img');
      if (!img) return;
      const rect = block.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const total = rect.height + vh;
      const scrolled = vh - rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      const y = (15 + p * 70).toFixed(1);
      img.style.objectPosition = `center ${y}%`;
    };

    const onScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={wrapRef} style={{ width: '100%', height: '100%' }}>
      <Photo
        src={src}
        label={label}
        alt={alt}
        sizes="(max-width: 768px) 100vw, 40vw"
        objectPosition="center 50%"
      />
    </div>
  );
}
