'use client';

import type { CSSProperties } from 'react';
import styles from './FlowText.module.css';

type Props = {
  text: string;
  className?: string;
  /** 한 글자씩 밀리는 간격(초). 문장이 길면 줄인다 */
  step?: number;
  /** 색이 한 바퀴 도는 데 걸리는 시간(초) */
  cycle?: number;
  /** 앞선 줄의 글자 수 — 여러 줄이 이어서 물결치게 만든다 */
  offset?: number;
  style?: CSSProperties;
};

/**
 * 글자 색이 차례로 옮겨 가며 바뀌는 문구.
 *
 * 글자마다 같은 애니메이션을 조금씩 늦게 시작시켜, 색이 왼쪽에서 오른쪽으로
 * 흘러가는 것처럼 보이게 한다. 색만 바뀌므로 글자 위치는 1픽셀도 움직이지 않는다
 * (자리가 흔들리면 읽는 데 방해가 된다).
 *
 * 글자를 낱개로 쪼개면 스크린리더가 한 자씩 끊어 읽으므로,
 * 문장은 aria-label로 통째로 주고 쪼갠 조각은 읽기에서 감춘다.
 * 「동작 줄이기」를 켠 환경에서는 색이 고정된다.
 */
export default function FlowText({ text, className, step = 0.07, cycle = 5, offset = 0, style }: Props) {
  return (
    <span className={`${styles.flow} ${className || ''}`} style={style}>
      {/* span에 붙인 aria-label은 읽기 도구에 따라 무시된다.
          그래서 진짜 문장을 눈에만 안 보이게 함께 두고, 쪼갠 글자는 읽기에서 감춘다. */}
      <span className={styles.sr}>{text}</span>
      {[...text].map((ch, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={styles.ch}
          style={{ animationDuration: `${cycle}s`, animationDelay: `${-((offset + i) * step) % cycle}s` }}
        >
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );
}
