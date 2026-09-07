'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './BeforeAfter.module.css';

type Props = {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
};

/**
 * 치료 전후 비교 — 손잡이를 좌우로 움직여 두 장을 겹쳐 본다.
 *
 * 두 장을 나란히 놓으면 눈이 번갈아 옮겨 다녀야 해서 차이를 읽기 어렵다.
 * 같은 자리에 겹쳐 두고 경계를 움직이면 바뀐 부분만 남는다.
 *
 * 마우스·터치는 드래그로, 키보드는 화살표로 움직인다(range 입력을 그대로 쓴다 —
 * 스크린리더에서도 "몇 퍼센트 지점"으로 읽히고 조작법을 따로 배울 필요가 없다).
 */
export default function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = 'BEFORE',
  afterLabel = 'AFTER',
}: Props) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const moveTo = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging.current) return;
      e.preventDefault();
      moveTo(e.clientX);
    };
    const stop = () => {
      dragging.current = false;
    };
    window.addEventListener('pointermove', onMove, { passive: false });
    window.addEventListener('pointerup', stop);
    window.addEventListener('pointercancel', stop);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', stop);
      window.removeEventListener('pointercancel', stop);
    };
  }, [moveTo]);

  return (
    <div className={styles.wrap}>
      <div
        ref={wrapRef}
        className={styles.stage}
        onPointerDown={(e) => {
          dragging.current = true;
          moveTo(e.clientX);
        }}
      >
        {/* 아래층 = 치료 후 */}
        <Image src={after} alt={afterAlt} fill sizes="(max-width: 768px) 100vw, 720px" className={styles.img} />
        {/* 위층 = 치료 전. 손잡이 위치까지만 보인다 */}
        <div className={styles.beforeLayer} style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={before} alt={beforeAlt} fill sizes="(max-width: 768px) 100vw, 720px" className={styles.img} />
        </div>

        <span className={styles.tagBefore} aria-hidden="true" data-dim={pos < 16}>{beforeLabel}</span>
        <span className={styles.tagAfter} aria-hidden="true" data-dim={pos > 84}>{afterLabel}</span>

        <div className={styles.divider} style={{ left: `${pos}%` }} aria-hidden="true">
          <span className={styles.knob}>
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path fill="currentColor" d="M9.5 7.5 5 12l4.5 4.5V7.5zm5 0v9L19 12l-4.5-4.5z" />
            </svg>
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={100}
          step={1}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className={styles.range}
          aria-label="치료 전후 비교 — 좌우로 움직여 확인하세요"
        />
      </div>
      <p className={styles.hint}>손잡이를 좌우로 움직여 치료 전후를 확인해 보세요.</p>
    </div>
  );
}
