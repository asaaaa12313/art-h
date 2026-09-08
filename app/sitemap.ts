import type { MetadataRoute } from 'next';
import { TREATMENTS, LOCAL_PAGES, CONTENT_UPDATED } from '@/lib/copy';
import { LOCALES } from '@/lib/i18n';
import { getAllPosts } from '@/lib/blog';

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
    ...LOCAL_PAGES.map((p) => `/local/${p.slug}`),
    ...LOCALES.map((l) => `/${l}`),
    '/pricing',
    '/privacy',
    '/blog',
  ];
  // 빌드 시각(new Date())을 쓰면 배포할 때마다 전 페이지 수정일이 갱신돼 신선도 신호가 왜곡된다.
  // 콘텐츠가 실제로 바뀐 날짜(lib/copy.ts의 CONTENT_UPDATED)를 기준으로 삼는다.
  const lastModified = new Date(CONTENT_UPDATED);
  // 법적 고지 등 보조 페이지는 진료 페이지와 같은 비중으로 선언하지 않는다.
  const SUPPORT_PAGES = ['/privacy'];
  const base: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : SUPPORT_PAGES.includes(r) ? 0.3 : 0.7,
  }));

  // 블로그 글 — 글마다 실제 발행일을 수정일로 쓴다(고정 페이지와 신선도가 다르다).
  const posts: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/blog/${encodeURIComponent(p.slug)}`,
    lastModified: new Date(p.date),
    changeFrequency: 'yearly',
    priority: 0.5,
  }));

  return [...base, ...posts];
}
