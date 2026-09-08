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

/** 응답이 없으면 20초에 끊는다 — 안 그러면 주간 작업이 몇 시간씩 매달려 있는다 */
function fetchWithTimeout(url, opts = {}, ms = 20000) {
  return fetch(url, { ...opts, signal: AbortSignal.timeout(ms) });
}

/* ── 본문에 남길 태그와 속성 ───────────────────────────────
   네이버 에디터가 붙이는 style·class·data-*는 우리 디자인과 충돌하므로 전부 버린다.
   남기는 건 글의 뼈대(문단·제목·목록·표)와 사진·링크뿐이다. */
const ALLOWED_TAGS = new Set([
  'p', 'h2', 'h3', 'h4', 'strong', 'em', 'b', 'i',
  'ul', 'ol', 'li', 'blockquote', 'figure', 'figcaption',
  'img', 'br', 'a', 'hr', 'table', 'thead', 'tbody', 'tr', 'td', 'th',
]);
/** 본문 링크에 허용하는 주소 — 이 밖의 스킴(javascript:, data: 등)은 링크를 벗긴다 */
const SAFE_HREF = /^(https?:\/\/|mailto:|tel:)/i;

/** 사진을 가져올 수 있는 곳 — next.config.mjs의 images.remotePatterns와 같은 목록이어야 한다.
 *  여기 없는 곳의 사진을 대표사진으로 저장하면, 배포할 때 next/image가 막아 빌드가 통째로 실패한다.
 *  주 1회 자동으로 도는 작업이라 사람이 없는 시각에 터진다. */
const ALLOWED_IMG_HOSTS = [
  'blogthumb.pstatic.net',
  'mblogthumb-phinf.pstatic.net',
  'postfiles.pstatic.net',
  'phinf.pstatic.net',
];

function imgHostOk(url) {
  try { return ALLOWED_IMG_HOSTS.includes(new URL(url).hostname); } catch { return false; }
}

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
  if (!imgHostOk(s)) return null;   // 모르는 곳의 사진은 아예 쓰지 않는다
  const host = new URL(s).hostname;
  // 크기 값을 바꿔도 되는 곳만 바꾼다. 다른 서버(phinf 등)는 우리가 아는 값이 없어
  // 임의로 w773을 붙이면 404가 나고 사진이 통째로 사라진다 — 원래 주소를 그대로 둔다.
  const want =
    host === 'blogthumb.pstatic.net' ? 'w3' :
    host === 'mblogthumb-phinf.pstatic.net' ? 'w773' : null;
  if (!want) return s;
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
      const href = (el.attribs?.href || '').trim();
      // 스킴을 확인하지 않으면 원문에 섞인 javascript: 링크가 우리 도메인에서 실행된다.
      // 허용 목록 방식으로만 통과시키고, 나머지는 링크를 벗겨 글자만 남긴다.
      if (!href || !SAFE_HREF.test(href)) { $el.replaceWith($el.contents()); return; }
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
  const res = await fetchWithTimeout(url, { headers: { 'user-agent': UA } });
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

/* ── 의료광고 금칙 표현 검사 ────────────────────────────
   블로그 글이 검수 없이 홈페이지 본문이 되는 구조라, 의료법 제56조가 금지하는
   표현(최상급·보장·비교·환자 유인)이 섞이면 병원이 그대로 책임을 진다.
   걸린 글은 홈페이지에 싣지 않고 `needsReview`로 표시해 두었다가 사람이 확인한다. */
const BANNED = [
  /최고(의|급)?\s*(치과|기술|의료진)?/, /유일(한|무이)/, /최초(로)?\s*(도입|개발)/,
  /100\s*%/, /완치/, /부작용\s*(이)?\s*(전혀)?\s*없/, /보장(합니다|해\s*드립니다|해드립니다)/,
  /(무통|안\s*아픈)\s*(치료|시술)\s*(보장|약속)/,
  /타\s*(병원|치과)\s*(보다|대비)/, /(가장|제일)\s*(저렴|싼|빠른|좋은)/,
  /(이벤트|할인|무료\s*시술|사은품|경품)/, /(치료|시술)\s*후기/,
  /전문\s*병원/,
];
function screenAd(text) {
  const hits = [];
  for (const re of BANNED) {
    const m = String(text || '').match(re);
    if (m) hits.push(m[0].trim());
  }
  return hits;
}

/* ── 글에서 뼈대 뽑기 ────────────────────────────────────
   문장을 새로 쓰지 않는다. 글쓴이가 쓴 소제목과 문장을 그대로 옮겨 담을 뿐이다.
   의료 내용이라 없는 말을 지어내면 그 순간 잘못된 의료 정보가 되기 때문이다.
   여기서 만드는 것은 「이 글의 핵심」 목록과, 이 글이 어느 진료과목 이야기인지뿐이다.
   문답은 만들지 않는다(아래 폐기 사유 참고). */

const textOf = (html) => String(html || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
/** 「🩺 1. 치료 전에는 …」 같은 번호 소제목. 글쓴이가 직접 나눈 목차다 */
const HEAD_RE = /^[^\w가-힣]{0,4}\s*(\d{1,2})[.)]\s*(.{4,60})$/;

/** 앞머리 장식 제거 — 이모지·번호(「🩺 3. 」)와 「Q. 」 같은 표식은 문장이 아니다.
 *  Q는 \w라서 기호 제거 정규식에 걸리지 않으므로 따로 떼어 낸다. */
function stripLead(t) {
  return String(t)
    .replace(/^[^\w가-힣]+/, '')
    .replace(/^[QAqa][.)]\s*/, '')
    .replace(/^\d{1,2}[.)]\s*/, '')
    .trim();
}

/** 끝맺은 문장인지 — 소제목이 두 줄로 나뉘면 앞 조각만 잡혀 말이 끊긴다.
 *  종결형으로 끝나지 않으면 「핵심」으로 쓰지 않는다. */
const ENDS_OK = /(다|요|까|함|음|죠|네|\?|!|\.)\s*$/;
const DANGLING = /(며|고|서|는|을|를|와|과|의|및|등|나|이|가|로|에|한|된|,)\s*$/;
function isWholeLine(t) {
  return t.length >= 8 && ENDS_OK.test(t) && !DANGLING.test(t);
}

function outline(bodyHtml) {
  const paras = [...bodyHtml.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => textOf(m[1])).filter(Boolean);

  // 1순위 — 글쓴이가 매긴 번호 소제목
  const heads = [];
  for (const t of paras) {
    const m = t.match(HEAD_RE);
    if (m) {
      const t = stripLead(m[2]);
      if (isWholeLine(t)) heads.push(t);
    }
  }
  if (heads.length >= 3) return heads.slice(0, 5);

  // 2순위 — 소제목이 없는 글: 스스로 던진 질문을 목차로 쓴다
  const asks = paras
    .map((t) => stripLead(t))
    .filter((t) => t.endsWith('?') && t.length >= 12 && t.length <= 80);
  if (asks.length >= 3) return asks.slice(0, 5);

  // 셋 다 아니면 목록을 만들지 않는다.
  // 아무 문장이나 「핵심」으로 올리면(생일파티 글의 「…바쁘게 하루를 보내지만,」)
  // 읽는 사람에게 아무 정보도 주지 못하면서 글의 품질만 깎는다.
  return [];
}

/* 글 안의 문답을 뽑아 쓰는 방식은 폐기했다.
   네이버 에디터는 문장 중간에서 문단(<p>)을 끊기 때문에, 어디서 잘라도
   「…반드시 발치해야 하는 것은 아닙니다. 다만, 다음과 같은 경우에는」처럼
   조건이 사라진 채 끝나 뜻이 뒤집힌다(실측 99쌍 중 34쌍이 종결어미 없이 잘림).
   의료 내용에서 이런 잘림은 잘못된 정보와 같으므로, 문답은 우리가 검수해 둔
   과목별 FAQ(lib/copy.ts)만 쓴다. */

/** 이 글이 어느 진료과목 이야기인지 — 관련 진료 안내를 붙이기 위해서다.
 *  lib/copy.ts의 slug와 같은 값을 쓴다(화면에서 그 과목 정보를 찾아 보여 준다). */
const TOPIC_KEYS = [
  ['implant', ['임플란트', '뼈이식', '상악동', '골이식']],
  // oral-surgery 페이지는 '사랑니 발치'다. '구강외과'는 진료과 이름일 뿐이라
  // 구취·소개 글까지 끌어와 「사랑니 발치」 카드를 붙이게 되므로 판정에서 뺀다.
  // '발치'도 임플란트·외상 글에 흔한 일반어라 제목 판정용(앞 3개)에서 제외한다.
  ['oral-surgery', ['사랑니', '매복', '지치', '발치']],
  ['root-canal', ['신경치료', '근관', '치수', '크라운']],
  ['tmj', ['턱관절', '이갈이', '악관절', '턱에서']],
  ['sedation', ['의식하진정', '수면치료', '수면마취', '치과공포', '진정치료']],
  ['periodontics', ['잇몸', '치주', '스케일링', '치석', '풍치']],
  ['whitening', ['미백', '화이트닝']],
];
/** 본문 빈도만 보면 「금간 치아」 글이 턱관절로, 「소아 충치」 글이 신경치료로 붙는다.
 *  (실측 44건 중 8건 오분류) 그래서 **제목에 그 과목의 대표 낱말이 있을 때만** 연결한다.
 *  애매하면 아무것도 붙이지 않는다 — 엉뚱한 과목 문답을 붙이는 것보다 없는 편이 낫다. */
function topicOf(title, text) {
  let best = null;
  let bestN = 0;
  for (const [slug, keys] of TOPIC_KEYS) {
    // 제목에 대표 낱말(앞 3개)이 들어 있어야 후보가 된다
    const inTitle = keys.slice(0, 3).some((k) => title.includes(k));
    if (!inTitle) continue;
    let n = 0;
    for (const k of keys) n += (`${title} ${title} ${text.slice(0, 1500)}`.split(k).length - 1);
    if (n > bestN) { bestN = n; best = slug; }
  }
  return bestN >= 3 ? best : null;
}

async function main() {
  // 이미 받아 둔 것 읽기 — 지워진 글도 홈페이지에서는 남겨 둔다(주소가 죽지 않게)
  let prev = [];
  try { prev = JSON.parse(await fs.readFile(OUT, 'utf8')).posts || []; } catch { /* 첫 실행 */ }
  const byId = new Map(prev.map((p) => [p.id, p]));

  const res = await fetchWithTimeout(RSS_URL, { headers: { 'user-agent': UA } });
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
      post.keyPoints = outline(b.bodyHtml);
      delete post.selfQnA;   // 폐기한 항목이 예전 수집분에 남아 있을 수 있다
      post.topic = topicOf(title, b.bodyText);
      const hits = screenAd(`${title} ${b.bodyText}`);
      if (hits.length) {
        post.needsReview = hits;
        console.warn(`  ⚠︎ 광고 표현 검토 필요(홈페이지에 싣지 않음): ${title.slice(0, 26)}… — ${hits.join(', ')}`);
      } else {
        delete post.needsReview;
      }
      bodies += 1;
      console.log(`  본문 받음: ${title.slice(0, 34)}…  (${b.bodyText.length}자)`);
    } catch (e) {
      console.warn(`  본문 실패(건너뜀): ${title.slice(0, 30)}… — ${e.message}`);
    }
    await sleep(DELAY);
  }

  const flagged = [...byId.values()].filter((p) => p.needsReview?.length).length;
  const posts = [...byId.values()]
    .filter((p) => p.bodyHtml)                       // 본문이 없는 글은 페이지를 만들지 않는다
    .filter((p) => !p.needsReview?.length)           // 광고 표현이 걸린 글은 사람이 볼 때까지 뺀다
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, MAX_POSTS);

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, `${JSON.stringify({ blogId: BLOG_ID, updatedAt: new Date().toISOString(), posts }, null, 2)}\n`);
  console.log(`저장 완료: ${posts.length}건 (새 글 ${added} · 본문 새로 받음 ${bodies}` +
    `${flagged ? ` · 광고 표현으로 보류 ${flagged}` : ''}) → ${OUT}`);
}

main().catch((e) => { console.error('실패:', e.message); process.exit(1); });
