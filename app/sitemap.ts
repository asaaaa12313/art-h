import type { MetadataRoute } from 'next';
import { TREATMENTS, CONTENT_UPDATED } from '@/lib/copy';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/about',
    '/doctor',
    '/treatments',
    ...TREATMENTS.map((t) => `/treatments/${t.slug}`),
    '/facility',
    '/location',
    '/privacy',
  ];
  // 빌드 시각(new Date())을 쓰면 배포할 때마다 전 페이지 수정일이 갱신돼 신선도 신호가 왜곡된다.
  // 콘텐츠가 실제로 바뀐 날짜(lib/copy.ts의 CONTENT_UPDATED)를 기준으로 삼는다.
  const lastModified = new Date(CONTENT_UPDATED);
  return routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
