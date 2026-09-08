/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 블로그 글의 대표 사진 — 네이버 이미지 서버에 있다.
    // `**.pstatic.net`처럼 통째로 열면 네이버에 올라간 아무 사진이나
    // 우리 도메인을 거쳐 배달되고(이미지 변환은 과금 항목이다), 그 비용을 우리가 낸다.
    // 실제로 쓰이는 네 곳만 적는다 — scripts/fetch-blog.mjs의 ALLOWED_IMG_HOSTS와 같아야 한다.
    remotePatterns: [
      { protocol: 'https', hostname: 'blogthumb.pstatic.net' },
      { protocol: 'https', hostname: 'mblogthumb-phinf.pstatic.net' },
      { protocol: 'https', hostname: 'postfiles.pstatic.net' },
      { protocol: 'https', hostname: 'phinf.pstatic.net' },
    ],
  },
};

export default nextConfig;
