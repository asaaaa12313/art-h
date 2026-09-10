import type { Metadata } from 'next';
import { DM_Serif_Display } from 'next/font/google';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import { SITE } from '@/lib/copy';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

/* 영문 세리프 — next/font가 빌드 때 폰트를 우리 서버로 가져와 심는다.
   구글 서버로 나가는 stylesheet 요청이 사라져 첫 화면을 막지 않는다. */
const dmSerif = DM_Serif_Display({
  weight: '400',
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-serif',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | ${SITE.slogan}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    '송도 IBS타워 업무동 8층. 구강악안면외과·치과보존과 전문의가 진료하며, 치과가 무섭거나 통증이 걱정되는 분을 위해 충분한 설명과 의식하진정(수면치료)을 함께 운영합니다.',
  keywords: [
    '송도치과', '아트에이치치과', '송도국제업무단지', 'IBS타워', '연수구치과', '국제업무지구역 치과',
    '임플란트', '신경치료', '사랑니발치', '턱관절', '잇몸치료', '치아미백',
    // 환자가 실제로 검색하는 말 — 본문에는 단정 표현을 쓰지 않되 검색어로는 남긴다
    '수면치과', '의식하진정', '치과공포', '겁많은사람치과',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.slogan}`,
    description: '송도 IBS타워 업무동 8층. 전문의 진료와 의식하진정(수면치료)을 함께 운영합니다.',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.name,
    description: SITE.slogan,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // 일부 브라우저 확장이 <html>에 자기 속성을 붙여 서버·클라이언트 마크업이 어긋난 것처럼 보인다.
    // 우리 마크업 문제가 아니라 이 경고만 끈다.
    <html lang="ko" className={dmSerif.variable} suppressHydrationWarning>
      <head>
        {/* 한글 명조는 자체 호스팅 리디바탕(globals.css @font-face) — 제목에 바로 쓰이므로 미리 받는다.
            영문 세리프(DM Serif Display)는 next/font가 빌드 때 우리 서버로 가져와 심으므로
            구글로 나가는 요청이 없다. */}
        <link
          rel="preload"
          href="/fonts/RIDIBatang.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* 본문 한글 폰트 — 글자 묶음별로 쪼개져 있어 실제로 쓰는 조각만 받는다.
            화면이 그려진 뒤에 붙이는 방법도 시도했으나 되돌렸다: 본문 글꼴이 페이지 전체를
            지배해서, 자바스크립트가 다 뜬 뒤 바뀌면 글자가 한 번에 갈리며 줄이 밀린다.
            먼저 연결을 터 두어 받는 시간을 줄이는 선에서 멈춘다. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body>
        <a href="#main" className="skip-link">본문 바로가기</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
