# 업체 요청 3건 수정 기획 (2026-07-08)

> 아트에이치치과 홈페이지 — 업체(광고주) 요청 3건. 의료법·의료광고 심의 리스크 제거가 핵심.

## 🎯 목표 4요소
| 요소 | 내용 |
|---|---|
| 목표 | 업체 요청 3건 반영 — ①의료법 위반 문구 제거 ②전후사진 규제 회피 ③없는 장비(CEREC) 제거 |
| 범위 | `app/home/Home.tsx`, `lib/copy.ts`, `app/treatments/[slug]/page.tsx`, `app/home/Home.module.css`, 신규 `components/SinusLiftDiagram.tsx` |
| 종료조건 | 3건 반영 + 위법 소지 문구 0 + 레이아웃 안 깨짐 + `tsc --noEmit`·`eslint` PASS + 검수봇 PASS |
| 검증명령 | `npx tsc --noEmit` + `npx eslint <변경파일>` + 목업 확인 |

## 왜 이렇게 접근했나 (기각한 대안)
- **모식도 = 이미지 파일 vs 인라인 SVG** → **인라인 SVG 채택.** 이 프로젝트 `next.config.mjs`에 `dangerouslyAllowSVG`가 없어 `next/image`(Photo 컴포넌트)로 SVG를 넣으면 렌더가 막힘. 인라인 SVG는 그 이슈를 원천 회피 + 사이트 네이비/블루 토큰으로 통일 + 반응형 자동. (이미지 파일 안은 SVG 허용 설정 추가 = 전역 config 변경이라 리스크 ↑ → 기각)

---

## ① 멸균 문구 — "대학병원급" 제거 (의료법 리스크)

**의료법 체크**: "대학병원급"은 객관적 근거 없는 비교·과장 광고로 의료법 제56조(의료광고 금지) 위반 소지 → 제거 타당. "Class B 고압증기멸균", "중앙공급실 방식"은 장비·방식의 **객관적 사실 기술**이라 안전.

**확정안**: 첫 화면 숫자 카드는 축약, 상세 시스템 설명엔 전체 문구.

| 파일:줄 | before | after |
|---|---|---|
| `app/home/Home.tsx:46` | `label: '대학병원급 멸균 시스템'` | `label: 'Class B 고압증기멸균 시스템'` |
| `lib/copy.ts:492` (d) | `'9단계 감염 관리 프로토콜. 기구 세척부터 멸균, 진료수 관리까지 눈에 보이지 않는 곳까지 철저하게.'` | `'중앙공급실 방식의 Class B 고압증기멸균 시스템. 기구 세척부터 멸균, 진료수 관리까지 9단계 감염 관리 프로토콜로 눈에 보이지 않는 곳까지 철저하게.'` |

- `Home.tsx:46`의 `num: '9', unit: '단계'`는 유지 → 카드엔 "9단계 · Class B 고압증기멸균 시스템"으로 표시됨.
- 체크리스트
  - [ ] Home.tsx:46 라벨 교체
  - [ ] copy.ts:492 멸균 설명(d) 전체 문구 반영

---

## ② 상악동 거상술 — 전 사진 제거, 후 X-RAY + 모식도

**의료광고 체크**: 치료 전/후 비교 사진은 의료광고 심의 대상 + 과장·오인 소지로 규제 강함. → 실제 **후 결과 1장** + **원리 모식도**는 정보 제공 성격이라 안전.

**확정안**: 왼쪽 = 인라인 SVG 모식도(시술 원리), 오른쪽 = 실제 후 X-RAY 1장.

### 2-1. 신규 `components/SinusLiftDiagram.tsx` (인라인 SVG)
상악동 거상술 3단계 원리도. 아트에이치 컬러 토큰(`--c-navy`·`--c-blue`·`--c-blue-l`) 사용.
- **① 잔존골 부족** — 위턱뼈가 얇아 임플란트 길이 부족한 상태
- **② 상악동막 거상 + 골이식** — 상악동 점막을 들어올리고 뼈 이식재 충전
- **③ 임플란트 식립** — 충분한 골량 확보 후 안전하게 식립
- 접근성: `<title>`/`<desc>` 포함, 텍스트 라벨 SVG 내부에.

### 2-2. `lib/copy.ts:167~174` beforeAfter 수정
| 항목 | 변경 |
|---|---|
| `before` 필드 | 제거 (모식도는 컴포넌트로 렌더 → 이미지 경로 불필요) |
| `after` 필드 | 유지 (`/media/images/xray/sinus-after.jpg`) |
| `caption` | `'상악동 거상술 전 / 후 X-RAY'` → `'상악동 거상술 원리 모식도 / 실제 시술 후 X-RAY'` |
| `TxBeforeAfter` 타입 | `before: string` → `before?: string`(옵셔널)로, 또는 필드 제거 반영 |

### 2-3. `app/treatments/[slug]/page.tsx:170~181` 렌더 변경
- 왼쪽 `txBAImg`: `<Photo before>` → `<SinusLiftDiagram />` 컴포넌트
- 오른쪽 `txBAImg`: `<Photo after>` 유지, alt "상악동 거상술 후 X-RAY" 유지
- `page.tsx:173`의 alt "전 X-RAY"는 컴포넌트 교체로 자연 제거

### 2-4. 잔여 자산
- `public/media/images/xray/sinus-before.jpg` — 참조 제거 후 미사용. **파일 삭제는 선택**(다른 참조 없음 확인 완료 → 지워도 안전하나, 롤백 대비 남겨도 무방).

- 체크리스트
  - [ ] SinusLiftDiagram.tsx 생성 (SVG 3단계 모식도)
  - [ ] copy.ts beforeAfter 필드·caption 수정 + 타입 조정
  - [ ] page.tsx 렌더: 모식도 + 후 사진
  - [ ] sinus-before.jpg 참조 제거 확인

---

## ③ CEREC — "원데이 보철" 카드 통째 삭제

**사유**: CEREC = 당일 보철을 가능케 하는 장비 그 자체. 장비가 없으면 서비스도 불가 → 항목 제거.

| 파일:줄 | 변경 |
|---|---|
| `lib/copy.ts:494` | `{ t: '원데이 보철', d: '독일 CEREC 시스템으로…' }` 줄 **삭제** → SYSTEM_ITEMS 4개→3개 |
| `app/home/Home.tsx:54` | `SYSTEM_ICONS = ['shield', 'door', 'clock', 'badge']` → `['shield', 'door', 'badge']` (원데이=clock 제거) |
| `app/home/Home.module.css:402` | `.systemGrid { grid-template-columns: repeat(2, 1fr) }` → 3카드 배치 조정 |

### 그리드 레이아웃 (목업으로 확정)
- 현재 2×2(4개) → 3개가 되면 2열 유지 시 3번째가 둘째 줄에 홀로(어색).
- **1안(우선)**: 데스크탑 `repeat(3, 1fr)` 3열 1줄. 모바일은 기존 1fr 유지.
- **2안**: 2열 유지, 마지막 카드만 `grid-column: 1 / -1`로 가로 꽉 채움.
- → **구현 직전 목업 1회**로 1안/2안 실제 비교 후 확정.

- 체크리스트
  - [ ] copy.ts SYSTEM_ITEMS 원데이 보철 삭제
  - [ ] Home.tsx SYSTEM_ICONS 정리
  - [ ] Home.module.css 3카드 그리드 조정 (목업 확인 후)

---

## 최종 체크리스트
- [ ] ① 멸균 2곳 수정
- [ ] ② 상악동 모식도+후사진 (컴포넌트 신규 + copy + page)
- [ ] ③ CEREC 원데이 보철 삭제 (copy + Home.tsx + CSS)
- [ ] `npx tsc --noEmit` PASS
- [ ] `npx eslint` 변경파일 PASS
- [ ] 목업으로 ②③ 레이아웃 확인
- [ ] 검수봇(2렌즈) PASS
- [ ] 커밋 → (푸시 명시 신호 시) 푸시 → Vercel READY

## 미배포 반영 주의
- 이 수정은 **화면에 보여야 의미** → 커밋·푸시·Vercel READY까지 가야 실제 반영. 푸시는 "푸시해줘" 명시 후.
