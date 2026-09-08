/**
 * 네이버 블로그 최신 글 — RSS를 서버에서 읽어 홈에 얹는다.
 *
 * 왜 RSS인가: 블로그에 새 글을 올리면 홈페이지에도 저절로 뜬다.
 * 원장님이 홈페이지를 따로 손댈 필요가 없고, 검색엔진과 AI가 보는 "이 병원은 살아 있다"는
 * 신호(최신성)도 같이 올라간다.
 *
 * 6시간마다 다시 읽는다(revalidate). 네이버가 응답하지 않으면 빈 배열을 돌려주고,
 * 화면에서는 그 구역이 통째로 빠진다 — 홈이 깨지지 않게 하기 위해서다.
 *
 * 파서를 따로 쓰지 않는 이유: 필요한 항목이 제목·주소·날짜·첫 사진 넉 줄뿐이라
 * 의존성을 하나 더 얹는 것보다 직접 뽑는 편이 가볍고 고장날 여지도 적다.
 */

export type BlogPost = {
  title: string;
  link: string;
  date: string;      // YYYY-MM-DD
  thumb?: string;
  summary: string;
};

export const BLOG_ID = 'lovenpositive';
export const BLOG_URL = `https://blog.naver.com/${BLOG_ID}`;
export const INSTAGRAM_URL = 'https://www.instagram.com/arthdental';

const RSS_URL = `https://rss.blog.naver.com/${BLOG_ID}.xml`;

/** <![CDATA[...]]>를 벗기고 실체 참조를 되돌린다 */
function clean(v: string): string {
  return v
    .replace(/^<!\[CDATA\[/, '')
    .replace(/\]\]>$/, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .trim();
}

function tag(block: string, name: string): string {
  const m = block.match(new RegExp(`<${name}[^>]*>([\\s\\S]*?)</${name}>`, 'i'));
  return m ? clean(m[1]) : '';
}

function toDate(raw: string): string {
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return '';
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function firstImage(html: string): string | undefined {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (!m) return undefined;
  const src = m[1];
  // RSS가 주는 건 아주 작은 목록용 썸네일(type=s3, 300px 남짓)이라 카드에서 뭉개진다.
  // 네이버 이미지 서버에서 실측으로 확인한 값 중 550px짜리(w3)로 바꾼다 —
  // w773 같은 값은 404가 나므로 임의로 늘리면 사진이 통째로 사라진다.
  return src.replace(/([?&])type=[^&]*/i, '$1type=w3');
}

function toText(html: string, max = 96): string {
  const t = clean(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/<style[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
  ).replace(/\s+/g, ' ');
  return t.length > max ? `${t.slice(0, max - 1)}…` : t;
}

export async function getBlogPosts(limit = 3): Promise<BlogPost[]> {
  try {
    const res = await fetch(RSS_URL, {
      // 6시간마다 새로 읽는다. 그 사이에는 저장된 것을 그대로 쓴다.
      next: { revalidate: 21600 },
      headers: { 'user-agent': 'Mozilla/5.0 (compatible; ArtHDentalSite/1.0)' },
    });
    if (!res.ok) return [];
    const xml = await res.text();

    const items = xml.match(/<item>[\s\S]*?<\/item>/gi) || [];
    const posts: BlogPost[] = [];
    for (const it of items) {
      const title = tag(it, 'title');
      const link = tag(it, 'link');
      if (!title || !link) continue;
      const rawDesc = it.match(/<description[^>]*>([\s\S]*?)<\/description>/i)?.[1] || '';
      const desc = clean(rawDesc);
      posts.push({
        title,
        link: link.split('?')[0],
        date: toDate(tag(it, 'pubDate')),
        thumb: firstImage(desc),
        summary: toText(desc),
      });
      if (posts.length >= limit) break;
    }
    return posts;
  } catch {
    // 네이버가 느리거나 막혀도 홈은 그대로 떠야 한다
    return [];
  }
}
