import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/about', '/doctor', '/treatments', '/facility', '/location'];
  const lastModified = new Date();
  return routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified,
    changeFrequency: 'monthly',
    priority: r === '' ? 1 : 0.7,
  }));
}
