import { SITE, DOCTORS, TREATMENTS, CONTENT_UPDATED } from '@/lib/copy';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

export const dynamic = 'force-static';

/**
 * /llms.txt — 생성형 검색·AI 어시스턴트가 병원 정보를 정확히 인용하도록 돕는 요약 파일.
 * 사실만 담고 과장·최상급 표현은 쓰지 않는다(의료광고 심의 기준).
 * 데이터는 lib/copy.ts를 그대로 참조하므로 본문 수정 시 자동 반영된다.
 */
export function GET() {
  const doctors = DOCTORS.map((d) => {
    const certs = d.careerGroups
      .filter((g) => g.label === '자격')
      .flatMap((g) => g.items)
      .join(', ');
    return `- ${d.name} ${d.title} — ${d.specialty} (${certs}). 주 진료: ${d.focus}`;
  }).join('\n');

  const treatments = TREATMENTS.map(
    (t) => `- [${t.ko}](${SITE_URL}/treatments/${t.slug}): ${t.d}`
  ).join('\n');

  const hours = SITE.hours.map((h) => `- ${h.day}: ${h.time}`).join('\n');

  const body = `# ${SITE.name} (Art H Dental Clinic)

> 인천 송도 IBS타워 업무동 8층에 있는 치과입니다. 구강악안면외과 전문의와 치과보존과 전문의가 함께 진료하며, 한 분에게 충분한 시간을 드리는 진료를 지향합니다.

## 기본 정보
- 병원명: ${SITE.name}
- 주소: ${SITE.address}
- 전화: ${SITE.phone}
- 교통: ${SITE.transit}
- 네이버 플레이스: ${SITE.naverPlace}
- 최종 갱신일: ${CONTENT_UPDATED}

## 진료시간
${hours}

## 의료진
${doctors}

## 진료과목
${treatments}

## 신경치료에 사용하는 장비
- X-Smart Pro+ (Dentsply Sirona) — 근관 성형 엔도 모터. 토크 0.2–7.5 N·cm, 회전 속도 100–3,000 rpm, 근관장 측정기 내장, 회전(로터리)·왕복(레시프로케이팅) 모드 지원.
- ProTaper Next (Dentsply Sirona) — M-Wire 열처리 니켈-티타늄 근관 파일. X1–X5 다섯 종.

## 안내
- 신경치료는 치과보존과 전문의(강지수 원장)가 담당합니다.
- 임플란트 · 사랑니 발치 · 턱관절 · 의식하진정은 구강악안면외과 전문의(최종원 대표원장)가 담당합니다.
- 진료 내용과 비용은 개인의 구강 상태에 따라 달라지므로, 정확한 안내는 내원 상담 후 제공됩니다.

## 주요 페이지
- [의원소개](${SITE_URL}/about)
- [의료진](${SITE_URL}/doctor)
- [진료과목](${SITE_URL}/treatments)
- [시설](${SITE_URL}/facility)
- [오시는 길](${SITE_URL}/location)
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
