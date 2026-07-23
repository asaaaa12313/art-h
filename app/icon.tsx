import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

// 브라우저 탭 파비콘 — 잉크 네이비 바탕 + 세리프 H 워드마크
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#1A2647',
          color: '#EAF3FF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 42,
          fontFamily: 'Georgia, serif',
          borderRadius: 12,
        }}
      >
        H
      </div>
    ),
    size
  );
}
