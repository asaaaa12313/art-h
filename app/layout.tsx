import type { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatingCta from '@/components/FloatingCta';
import { SITE } from '@/lib/copy';
import './globals.css';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.name} | ${SITE.slogan}`,
    template: `%s | ${SITE.name}`,
  },
  description:
    '송도 IBS타워 업무동 8층. 한 분에게 충분한 시간을 드리는 치과, 아트에이치치과입니다.',
  keywords: ['송도치과', '아트에이치치과', '송도국제업무단지', 'IBS타워', '임플란트', '신경치료', '사랑니발치', '턱관절', '수면마취'],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.slogan}`,
    description: '송도 IBS타워 업무동 8층. 아트에이치치과.',
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
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap"
        />
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
