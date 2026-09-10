import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

/**
 * 브라우저 탭 파비콘 — 실제 병원 간판과 같은 남색 원판에 금색 A + 흰 H.
 * 16px까지 줄어들므로 월계관은 넣지 않는다(뭉개져서 얼룩으로만 보인다).
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#14245A',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 32,
          border: '3px solid #C9A44C',
          fontFamily: 'Georgia, serif',
          position: 'relative',
        }}
      >
        <span style={{ fontSize: 40, color: '#D9B65C', marginRight: -6, marginTop: -4 }}>A</span>
        <span style={{ fontSize: 36, color: '#FFFFFF', marginTop: 6 }}>H</span>
      </div>
    ),
    size
  );
}
