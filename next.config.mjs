/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 네이버 블로그 최신 글의 대표 사진 — 우리 서버에 없는 이미지라 출처를 열어 둬야 한다.
    // 이 두 곳만 허용한다(아무 주소나 열면 우리 도메인이 남의 이미지 배달에 쓰인다).
    remotePatterns: [
      { protocol: 'https', hostname: 'blogthumb.pstatic.net' },
      { protocol: 'https', hostname: 'postfiles.pstatic.net' },
    ],
  },
};

export default nextConfig;
