/**
 * 병원 공식 채널 주소.
 *
 * `lib/blog.ts`에 두면 안 되는 이유: 그 파일은 블로그 본문 전체(수백 KB JSON)를 불러온다.
 * 헤더·상담 레일 같은 클라이언트 컴포넌트가 주소 두 줄 때문에 그 파일을 부르면
 * 모든 페이지의 자바스크립트에 본문 뭉치가 딸려 갈 수 있다. 그래서 상수만 따로 둔다.
 */
export const BLOG_ID = 'lovenpositive';
export const BLOG_URL = `https://blog.naver.com/${BLOG_ID}`;
export const INSTAGRAM_URL = 'https://www.instagram.com/arthdental';
