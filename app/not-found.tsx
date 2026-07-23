import Link from 'next/link';

// 404 — 브랜드 톤(세리프·잉크 네이비) 유지 + 이탈 회수 링크
export default function NotFound() {
  return (
    <section
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '80px 24px',
        background: 'var(--c-bg)',
      }}
    >
      <p
        style={{
          fontFamily: 'var(--f-display)',
          fontSize: 'clamp(64px, 10vw, 110px)',
          color: 'var(--c-navy)',
          lineHeight: 1,
          margin: '0 0 18px',
          opacity: 0.92,
        }}
      >
        404
      </p>
      <h1
        style={{
          fontFamily: 'var(--f-serif-ko)',
          fontSize: 'clamp(20px, 3vw, 28px)',
          fontWeight: 700,
          color: 'var(--c-navy)',
          margin: '0 0 10px',
          wordBreak: 'keep-all',
        }}
      >
        찾으시는 페이지가 없습니다
      </h1>
      <p
        style={{
          fontSize: 14,
          color: 'var(--c-text2)',
          lineHeight: 1.8,
          margin: '0 0 32px',
          wordBreak: 'keep-all',
        }}
      >
        주소가 바뀌었거나 잘못 입력된 것 같습니다.
      </p>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/"
          style={{
            background: 'var(--c-navy)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 500,
            padding: '12px 26px',
            borderRadius: 2,
          }}
        >
          홈으로
        </Link>
        <Link
          href="/treatments"
          style={{
            border: '1px solid var(--c-navy)',
            color: 'var(--c-navy)',
            fontSize: 14,
            fontWeight: 500,
            padding: '11px 25px',
            borderRadius: 2,
          }}
        >
          진료과목 보기
        </Link>
      </div>
    </section>
  );
}
