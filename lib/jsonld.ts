/**
 * JSON-LD를 <script type="application/ld+json">에 안전하게 주입한다.
 *
 * JSON.stringify 결과를 그대로 넣으면 데이터 문자열 안의 `</script`가 스크립트 블록을
 * 조기 종료시켜 구조화 데이터가 통째로 무효화되고 뒤따르는 마크업이 깨진다.
 * `<`를 유니코드 이스케이프로 바꾸면 JSON 값은 그대로면서 HTML 파서가 태그로 읽지 않는다.
 */
export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

/** 의료진 JSON-LD 노드 식별자 — 홈(employee)과 /doctor가 같은 인물로 병합되도록 규칙을 한 곳에 둔다. */
export function doctorNodeId(siteUrl: string, index: number): string {
  return `${siteUrl}/doctor#doctor-${index + 1}`;
}
