/**
 * 블로그 글 — 홈페이지 안에 옮겨 적어 둔 것을 읽는다.
 *
 * `data/blog-posts.json`은 예전에 받아 둔 블로그 글을 홈페이지용으로 다시 쓴 변환본이다(원본 보관본은 저장소 밖 tools/blog-convert/work/art-h/source.json).
 * 2026-09-10 네이버 데이터 정책 개정에 맞춰 네이버 서버를 읽어 오는 자동 수집은 모두 끊었다.
 * 새 글은 별도 절차(원고 기준)로 넣기 전까지 추가되지 않는다.
 *
 * 화면에서 네이버를 실시간으로 부르지 않는 이유:
 *  - 네이버가 느리거나 막히면 우리 페이지까지 같이 느려진다.
 *  - 글 내용이 우리 저장소 안에 있어야 검색·AI가 이 병원 이야기로 확실히 인용한다.
 */

import data from '@/data/blog-posts.json';

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  /** 네이버 원문 주소 */
  link: string;
  date: string;      // YYYY-MM-DD
  thumb?: string;
  summary: string;
  bodyHtml?: string;
  images?: { src: string; alt: string }[];
  wordCount?: number;
  fetchedAt?: string;
  /** 글쓴이가 매긴 소제목을 그대로 옮긴 목차 (수집 때 뽑는다) */
  keyPoints?: string[];
  /** 이 글이 다루는 진료과목 slug — 관련 진료 안내를 붙이는 데 쓴다 */
  topic?: string | null;
};

export { BLOG_ID, BLOG_URL, INSTAGRAM_URL } from './channels';

const ALL = (data.posts as BlogPost[]) || [];

/** 최신순 전체 */
export function getAllPosts(): BlogPost[] {
  return ALL;
}

/** 홈 등에서 쓰는 최신 몇 건 */
export function getRecentPosts(limit = 3): BlogPost[] {
  return ALL.slice(0, limit);
}

export function getPost(slug: string): BlogPost | undefined {
  return ALL.find((p) => p.slug === slug);
}

/** 같은 글 아래에 붙일 다른 글 — 지금 글은 빼고 최신순으로 */
export function getOtherPosts(slug: string, limit = 3): BlogPost[] {
  return ALL.filter((p) => p.slug !== slug).slice(0, limit);
}

export const BLOG_UPDATED_AT: string = (data as { updatedAt?: string }).updatedAt || '';
