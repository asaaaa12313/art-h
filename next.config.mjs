/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 블로그 사진은 우리 저장소(public/media/blog)에 보관한다 — 외부 이미지 호스트 허용 목록 없음.
  // (2026-09-10 네이버 데이터 정책 개정에 맞춰 네이버 서버 접근을 모두 끊었다.)
  images: {},
};

export default nextConfig;
