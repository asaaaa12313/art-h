/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // 블로그 글의 대표 사진 — 네이버 이미지 서버에 있다.
    // 서버 이름이 글마다 조금씩 다르므로(blogthumb / mblogthumb-phinf / phinf …)
    // 네이버 CDN 도메인만 통째로 열어 둔다. 다른 곳은 열지 않는다 —
    // 아무 주소나 허용하면 우리 도메인이 남의 이미지 배달에 쓰인다.
    remotePatterns: [{ protocol: 'https', hostname: '**.pstatic.net' }],
  },
};

export default nextConfig;
