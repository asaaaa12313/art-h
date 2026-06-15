# 계획: 진료과목 상세 강화 + 브로셔 콘텐츠 반영

> 작성일: 2026-06-15 / 짝 문서: `research.treatments-brochure.md`
> 확정 방향: 별도 상세 페이지 강화 · 브로셔 강점을 진료과목 안에 녹이기

## 🎯 목표 4요소

| 요소 | 내용 |
|---|---|
| **목표** | 진료과목 상세 페이지를 브로셔 콘텐츠로 강화(SIC 임플란트 3대 기술·상악동 거상술·미백 기기 3종·무통증 GBT) + 노바케어 살균수는 시설 페이지에 |
| **범위** | `lib/copy.ts`, `app/treatments/[slug]/page.tsx`, `app/facility/page.tsx`, (필요 시 이미지 추출) `public/media/images/`. **그 외 파일 손대지 않음** |
| **종료 조건** | 임플란트=SIC 3대기술+상악동 전/후, 미백=기기 3종, 잇몸=무통증 GBT 대상, 시설=노바케어 섹션 노출. 기존 디자인 톤·7과목 구조 유지. `tsc` 통과 |
| **검증 명령** | `npx tsc --noEmit` + 변경 파일 `eslint` (로컬 풀빌드 X, 최종은 Vercel) |

## 접근 방식

`lib/copy.ts`의 `TREATMENTS` 항목에 **선택적 확장 필드**를 추가하고, 상세 페이지에서 "필드가 있으면 해당 블록을 렌더"하는 방식. 기존 7과목 구조와 디자인 톤을 그대로 유지하면서 브로셔 과목(임플란트·미백·잇몸)만 풍부해진다.

### 데이터 구조 (lib/copy.ts 확장)

```ts
// TREATMENTS 항목에 아래 optional 필드 추가 (있는 과목만)

// ① SIC 임플란트 3대 기술 — implant
tech?: {
  no: string;        // '01'
  t: string;         // '정말 두꺼운 벽 두께'
  metric?: string;   // '어버트먼트 토크 20Ncm (일반 30Ncm)'
  d: string;         // 설명
  target: string;    // '임플란트 찢어짐으로 재수술하신 분께'
}[];
techTitle?: { label: string; title: string; desc: string };
//   label:'SWISS PREMIUM IMPLANT', title:'정품 스위스 SIC 임플란트'

// ② 상악동 거상술 전/후 — implant
beforeAfter?: {
  label: string;     // 'ADVANCED IMPLANTOLOGY'
  title: string;     // '고난이도 임플란트 · 상악동 거상술'
  before: string;    // 이미지 경로
  after: string;
  caption: string;   // '상악동 거상술 전 / 후 X-RAY'
  d: string;         // 설명
};

// ③ 미백 기기 3종 — whitening
devices?: {
  name: string;      // 'GBT Machine'
  role: string;      // '미백 전 치면세정'
  d: string;
  img?: string;
}[];
devicesTitle?: { label: string; title: string; desc: string };

// ④ 무통증 GBT 대상 — periodontics
targets?: { title: string; sub: string };  // title:'이런 분께 권합니다', 
targetList?: string[];  // ['스케일링이 아파서 미뤄오신 분', ...]
```

### 콘텐츠 매핑 (브로셔 원문 기준)

**임플란트** — `tech[]` (3개):
1. `01 / 정말 두꺼운 벽 두께` — 탁월하게 두꺼운 SIC 임플란트 두께로 임플란트 찢어짐을 극소화합니다. → 임플란트 찢어짐으로 재수술하신 분께
2. `02 / 쉽게 풀리지 않는 잠금 기술` — metric: 어버트먼트 스크류 토크 20Ncm (일반 제품 30Ncm). 더 작은 힘으로 잠가도 쉽게 풀리지 않아 편리합니다. → 잦은 스크류 풀림으로 고생하신 분께
3. `03 / 압도적인 감염 위험도 축소` — 순수 티타늄 + SICmatrix 적용. 고혈압·당뇨·천식·신부전 등 기저질환, 심장질환·골다공증 등 전신질환, 암 치료 중인 분께도. → 임플란트 감염으로 재수술하신 분께
- 하단 문구: "치과 임플란트의 본산지 스위스의 기술력으로 독일에서 제조된 SIC 임플란트를 사용합니다."
- `beforeAfter`: 상악동 거상술 전/후 X-RAY + "어려운 환경의 치조골에서도 구강악안면외과 전문의의 전문성으로 안전하게 식립합니다."

**치아미백** — `devices[]` (3개):
1. `GBT Machine / 미백 전 치면세정` — 미백 효과를 최대화하기 위한 GBT 치면세정. 파우더 세정과 초슬림팁으로 부드럽게 치석을 제거합니다.
2. `Endo-Wiz / 시린 증상 완화` — 미백 중 시린 불편감을 최소화하는 첨단 기기입니다.
3. `Osstem Vutees / 미백광 조사` — 최적의 파장으로 미백제 활성화를 도와 미백 효과를 높입니다.

**잇몸·스케일링** — `targets`:
- title: "시리지 않은 편안한 무통증 GBT", 대상: ['스케일링이 아파서 미뤄오신 분','잇몸이 자주 붓고 피가 나는 분','착색 때문에 치아가 누렇게 보여 고민인 분']
- 기존 `features`의 GBT 항목과 중복 정리

**시설(facility)** — 노바케어 살균수 섹션:
- 제목: "살균수를 통한 청정한 치과수관 관리 — 노바케어(NOVACARE)"
- 본문: 전기분해수(HOCL) 제조장치 도입. 차아염소산수는 대장균·살모넬라·콜레라·진균·바이러스·아포균에 강력한 살균력. 노바케어는 5분 이내 아포균까지 완전히 사멸.

### 상세 페이지 렌더 순서 (변경 후)

```
PageHeader → 요약/소개 → [tech 블록] → [beforeAfter 블록] → 치료과정 
→ [devices 블록] → 차별점(features) → [targets 블록] → FAQ → 이전/다음
(대괄호 = 해당 필드 있을 때만 렌더)
```

## 수정 파일 목록

| 파일 | 변경 |
|---|---|
| `lib/copy.ts` | TREATMENTS에 optional 필드 + 임플란트/미백/잇몸 콘텐츠 추가 |
| `app/treatments/[slug]/page.tsx` | tech/beforeAfter/devices/targets 조건부 블록 + CSS |
| `app/facility/page.tsx` | 노바케어 살균수 섹션 추가 |
| `public/media/images/` | (필요 시) 브로셔에서 SIC·노바케어·미백기기·X-RAY 이미지 추출 |

## 트레이드오프 / 고려사항

- **이미지**: 기존 `xray`, `equipment`, `powder` 자산을 우선 점검 → 부적합하면 브로셔 PDF에서 추출. 추출 시 화질·라이선스(자체 브로셔라 OK) 확인
- **수치 표현(20Ncm 등)**: 의료광고 과장 표현 주의 — 브로셔 원문 그대로만 사용, 비교우위 단정 회피
- **데이터 구조**: optional 필드라 신경치료·사랑니·턱관절 등 미해당 과목은 영향 0
- **디자인 톤**: 기존 navy/warm 팔레트·`Reveal`·카드 스타일 그대로 재사용 (새 톤 도입 X)

## 작업 체크리스트 (Phase)

### Phase 0 — 이미지 점검/준비
- [x] 기존 `xray/equipment/powder` 자산이 브로셔 콘텐츠에 맞는지 육안 확인
- [x] 부족 시 브로셔 PDF에서 필요한 이미지 추출 → `public/media/images/`에 배치
- [x] 사용할 이미지 경로 확정표 작성

### Phase 1 — 데이터(copy.ts)
- [x] TREATMENTS 타입에 optional 필드 추가(tech/beforeAfter/devices/targets 등)
- [x] 임플란트: tech 3종 + techTitle + beforeAfter 입력
- [x] 치아미백: devices 3종 + devicesTitle 입력
- [x] 잇몸·스케일링: targets + targetList 입력, features 중복 정리
- [x] `tsc --noEmit` 통과 확인

### Phase 2 — 상세 페이지(page.tsx)
- [x] tech 블록(번호 카드 + 수치 + 대상) 렌더 + CSS
- [x] beforeAfter 블록(전/후 2분할 이미지 + 캡션) 렌더 + CSS
- [x] devices 블록(기기 3종 카드) 렌더 + CSS
- [x] targets 블록(대상 칩 리스트) 렌더 + CSS
- [x] 모든 블록 조건부 렌더(`tx.tech && ...`) + 반응형 확인

### Phase 3 — 시설 페이지(facility)
- [x] 노바케어 살균수(HOCL) 섹션 추가 (기존 톤 맞춤)

### Phase 4 — 검증
- [x] `npx tsc --noEmit` PASS
- [x] 변경 파일 eslint PASS
- [x] 검수 봇(디자인 6축) 호출 → Critical/High 0건
- [x] 사용자 보고 (푸시는 별도 명시 신호 후)

## 범위 밖 (Out of scope)

- 신경치료·사랑니·턱관절 콘텐츠 재작성 (현행 유지)
- 진료과목 추가/삭제, 네비게이션 구조 변경
- 홈(`Home.tsx`) 레이아웃 변경 (3카드 미리보기 유지)
- 인사말/의료진 콘텐츠 (이미 반영됨)
