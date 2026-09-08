/**
 * 네이버 블로그 → 홈페이지 글로 옮겨 적는다.
 *
 * 하는 일
 *  1) RSS로 글 목록을 받고(제목·주소·날짜·대표사진)
 *  2) 각 글의 모바일 페이지에서 본문을 긁어 와
 *  3) 허용한 태그만 남기고 씻어서 data/blog-posts.json에 쌓는다.
 *
 * 왜 이렇게 하나
 *  - 블로그 글이 우리 도메인 안에도 있어야 검색·AI가 이 병원 이야기로 인용한다.
 *  - 원장님은 블로그에만 쓰면 되고, 홈페이지는 매주 월요일에 저절로 따라온다.
 *  - 이미 받아 둔 글은 다시 긁지 않는다(증분) — 네이버에 불필요한 부담을 주지 않기 위해서다.
 *
 * 실행:  node scripts/fetch-blog.mjs
 * 환경변수:
 *   NAVER_BLOG_ID   기본 lovenpositive
 *   MAX_POSTS       보관할 최대 글 수 (기본 200)
 *   FORCE_REFETCH   '1'이면 본문을 전부 다시 받는다
 *   FETCH_DELAY_MS  글 사이 간격 (기본 700ms)
 */

import { load } from 'cheerio';
import fs from 'node:fs/promises';
import path from 'node:path';

const BLOG_ID = process.env.NAVER_BLOG_ID || 'lovenpositive';
const MAX_POSTS = parseInt(process.env.MAX_POSTS || '200', 10);
const FORCE = process.env.FORCE_REFETCH === '1';
const DELAY = parseInt(process.env.FETCH_DELAY_MS || '700', 10);

const RSS_URL = `https://rss.blog.naver.com/${BLOG_ID}.xml`;
const OUT = path.resolve('data', 'blog-posts.json');
const UA =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ── 본문에 남길 태그와 속성 ───────────────────────────────
   네이버 에디터가 붙이는 style·class·data-*는 우리 디자인과 충돌하므로 전부 버린다.
   남기는 건 글의 뼈대(문단·제목·목록·표)와 사진·링크뿐이다. */
const ALLOWED_TAGS = new Set([
  'p', 'h2', 'h3', 'h4', 'strong', 'em', 'b', 'i',
  'ul', 'ol', 'li', 'blockquote', 'figure', 'figcaption',
  'img', 'br', 'a', 'hr', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
]);
const ALLOWED_ATTRS = {
  img: ['src', 'alt'],
  a: ['href'],
  td: ['colspan', 'rowspan'],
  th: ['colspan', 'rowspan'],
};

const clean = (v) =>
  String(v || '')
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();

const tagOf = (block, name) => {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? clean(m[1]) : '';
};

function toDate(raw) {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return '';
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

/** 네이버 이미지 주소 정리 — 목록·본문에 박혀 오는 축소본을 쓸 만한 크기로 올린다.
 *
 *  주의 두 가지(둘 다 실제로 겪어서 값을 실측했다):
 *   - type 값을 숫자만 바꾸면 `w80_blur` 같은 값에서 `_blur`가 남아 흐린 사진이 그대로 나온다.
 *     그래서 type 값 전체(다음 & 전까지)를 통째로 바꾼다.
 *   - 서버마다 받는 값이 다르다. blogthumb는 w773이 404이고 w3(550px)까지만 되며,
 *     본문 이미지 서버(mblogthumb-phinf)는 w773(773px)이 정상이다. */
function normalizeSrc(src) {
  if (!src) return null;
  if (src.startsWith('data:')) return null;
  let s = src;
  if (s.startsWith('//')) s = `https:${s}`;
  if (s.startsWith('/')) s = `https://m.blog.naver.com${s}`;
  const small = /blogthumb\.pstatic\.net/i.test(s);
  const want = small ? 'w3' : 'w773';
  if (/([?&])type=/i.test(s)) return s.replace(/([?&])type=[^&]*/i, `$1type=${want}`);
  return `${s}${s.includes('?') ? '&' : '?'}type=${want}`;
}

/** 제목에서 주소에 쓸 이름을 만든다(한글 그대로 — 검색에서 무엇에 관한 글인지 읽힌다) */
function slugify(title) {
  return String(title || '')
    .replace(/[?!.,;:'"“”‘’()[\]{}<>~`@#$%^&*+=|\\/]/g, ' ')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
    .replace(/-+$/, '');
}

function uniqueSlug(title, id, taken) {
  const base = slugify(title);
  if (!base) return String(id);
  if (!taken.has(base)) return base;
  for (const len of [4, 6, 8]) {
    const c = `${base}-${String(id).slice(-len)}`;
    if (!taken.has(c)) return c;
  }
  return `${base}-${id}`;
}

function idOf(link) {
  const m = String(link || '').match(/\/(\d{10,})(?:[/?#]|$)/);
  return m ? m[1] : String(link || '');
}

/* ── 본문 씻기 ─────────────────────────────────────────── */
function sanitize($, $root, title) {
  $root
    .find(
      [
        'script', 'style', 'iframe', 'embed', 'object', 'video', 'audio',
        'button', 'input', 'form', 'nav', 'aside', 'noscript',
        '.se-sticker', '.se-video', '.se-oglink', '.se-placesMap', '.se-map',
        '.__se_object', '.se-mention', '.se-pollComponent', '.se-recentBlog',
        '.se-codeBlock', '.se-quotation-container cite',
      ].join(', ')
    )
    .remove();

  // 본문의 h1은 페이지 제목과 충돌하므로 한 단 내린다
  $root.find('h1').each((_, el) => { el.tagName = 'h2'; });

  let n = 0;
  $root.find('*').each((_, el) => {
    const tag = (el.tagName || '').toLowerCase();
    if (!tag) return;
    const $el = $(el);

    if (tag === 'img') {
      const raw =
        el.attribs?.src || el.attribs?.['data-lazy-src'] ||
        el.attribs?.['data-src'] || el.attribs?.['data-original'];
      const src = normalizeSrc(raw);
      if (!src) { $el.remove(); return; }
      n += 1;
      el.attribs = {
        src,
        alt: (el.attribs?.alt || '').trim() || `${title} 본문 이미지 ${n}`,
        loading: 'lazy',
        referrerpolicy: 'no-referrer',
      };
      return;
    }

    if (tag === 'a') {
      const href = el.attribs?.href || '';
      if (!href || href.startsWith('#')) { $el.replaceWith($el.contents()); return; }
      el.attribs = { href, rel: 'nofollow noopener', target: '_blank' };
      return;
    }

    if (!ALLOWED_TAGS.has(tag)) { $el.replaceWith($el.contents()); return; }

    const allow = new Set(ALLOWED_ATTRS[tag] || []);
    for (const k of Object.keys(el.attribs || {})) if (!allow.has(k)) delete el.attribs[k];
  });

  // 글자도 사진도 없는 빈 칸 정리
  const blank = (t) => !t || !t.replace(/[\s​-‍﻿]/g, '').length;
  for (let guard = 0; guard < 5; guard += 1) {
    let removed = false;
    $root.find('p, li, blockquote, figure, h2, h3, h4').each((_, el) => {
      const $el = $(el);
      if (blank($el.text()) && !$el.find('img, br, hr').length) { $el.remove(); removed = true; }
    });
    if (!removed) break;
  }
  $root.find('br + br + br').remove();
}

const compact = (html) =>
  String(html || '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/>\s+</g, '><')
    .replace(/\s{2,}/g, ' ')
    .trim();

const toText = (html) =>
  String(html || '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();

async function fetchBody(logNo, title) {
  const url = `https://m.blog.naver.com/${BLOG_ID}/${logNo}`;
  const res = await fetch(url, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`본문 ${res.status}`);
  const $ = load(await res.text());
  const $root =
    $('.se-main-container').first().length ? $('.se-main-container').first()
      : $('#viewTypeSelector').first().length ? $('#viewTypeSelector').first()
        : $('.post-view').first();
  if (!$root.length) throw new Error('본문 영역을 못 찾음');
  sanitize($, $root, title);
  const bodyHtml = compact($root.html());
  const bodyText = toText(bodyHtml);
  const images = [];
  $root.find('img').each((_, el) => {
    if (el.attribs?.src) images.push({ src: el.attribs.src, alt: el.attribs.alt || '' });
  });
  return { bodyHtml, bodyText, images };
}

async function main() {
  // 이미 받아 둔 것 읽기 — 지워진 글도 홈페이지에서는 남겨 둔다(주소가 죽지 않게)
  let prev = [];
  try { prev = JSON.parse(await fs.readFile(OUT, 'utf8')).posts || []; } catch { /* 첫 실행 */ }
  const byId = new Map(prev.map((p) => [p.id, p]));

  const res = await fetch(RSS_URL, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`RSS ${res.status}`);
  const xml = await res.text();
  const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
  console.log(`RSS에서 ${items.length}건 확인`);

  const taken = new Set(prev.map((p) => p.slug));
  let added = 0;
  let bodies = 0;

  for (const it of items) {
    const title = tagOf(it, 'title');
    const link = (tagOf(it, 'link') || '').split('?')[0];
    if (!title || !link) continue;
    const id = idOf(link);
    const rawDesc = clean(it.match(/<description[^>]*>([\s\S]*?)<\/description>/i)?.[1] || '');
    const thumb = normalizeSrc(rawDesc.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1]);

    const existing = byId.get(id);
    const post = existing || {
      id,
      slug: uniqueSlug(title, id, taken),
      title,
      link,
      date: toDate(tagOf(it, 'pubDate')),
      thumb,
      summary: '',
    };
    if (!existing) { taken.add(post.slug); byId.set(id, post); added += 1; }
    // 제목·날짜는 원문이 바뀌었을 수 있으니 항상 최신으로
    post.title = title;
    post.date = toDate(tagOf(it, 'pubDate')) || post.date;
    if (thumb) post.thumb = thumb;

    if (!FORCE && post.bodyHtml && post.fetchedAt) continue;

    try {
      const b = await fetchBody(id, title);
      post.bodyHtml = b.bodyHtml;
      post.images = b.images;
      post.summary = b.bodyText.slice(0, 150);
      post.wordCount = b.bodyText.length;
      post.fetchedAt = new Date().toISOString();
      bodies += 1;
      console.log(`  본문 받음: ${title.slice(0, 34)}…  (${b.bodyText.length}자)`);
    } catch (e) {
      console.warn(`  본문 실패(건너뜀): ${title.slice(0, 30)}… — ${e.message}`);
    }
    await sleep(DELAY);
  }

  const posts = [...byId.values()]
    .filter((p) => p.bodyHtml)                       // 본문이 없는 글은 페이지를 만들지 않는다
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, MAX_POSTS);

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, `${JSON.stringify({ blogId: BLOG_ID, updatedAt: new Date().toISOString(), posts }, null, 2)}\n`);
  console.log(`저장 완료: ${posts.length}건 (새 글 ${added} · 본문 새로 받음 ${bodies}) → ${OUT}`);
}

main().catch((e) => { console.error('실패:', e.message); process.exit(1); });
