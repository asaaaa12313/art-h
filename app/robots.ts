import type { MetadataRoute } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

// 생성형 검색(AI 답변) 크롤러를 명시적으로 허용한다.
// `*` 규칙만으로도 허용되지만, 봇별 정책을 읽는 크롤러가 있어 명시해 두는 편이 안전하다.
const AI_AGENTS = [
  'GPTBot',            // OpenAI 검색·학습
  'OAI-SearchBot',     // ChatGPT 검색
  'ChatGPT-User',      // ChatGPT 사용자 요청 fetch
  'ClaudeBot',         // Anthropic
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',   // Gemini·AI Overviews 학습 허용
  'Applebot-Extended',
  'Bingbot',
  'CCBot',
  'Yeti',              // 네이버 검색
  'Daumoa',            // 다음 검색
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_AGENTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
