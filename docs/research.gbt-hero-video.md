# Research — Hero 영상 순서 변경 + GBT 장비 홍보

> 작성일: 2026-06-23 · 브랜치: worktree-gbt-hero-video

## 1. 프로젝트 개요
- **스택**: Next.js 16 (App Router) + TypeScript
- 콘텐츠는 `lib/copy.ts`에 데이터로 분리 → 페이지가 조건부 렌더

## 2. 작업 ① — Hero 영상 재생 순서

### 현황: hero 영상 5개 정체 (프레임 추출로 식별)
| 파일 | 내용 | 길이 |
|---|---|---|
| hero-1 | 빈 치과 체어(OSSTEM 진료의자) | 8.0초 |
| hero-2 | 인테리어 복도 | 6.9초 |
| hero-3 | 원장님 상담(치아모형 설명) | 7.0초 |
| hero-4 | 원장님 시술 중 (배경에 GBT 핑크 포스터) | 7.0초 |
| hero-5 | 원장님 환하게 웃는 얼굴 (배경 GBT 포스터) | 7.0초 |

- **문제**: 현재 배열 `[1,2,3,4,5]` → 원장님 웃는 얼굴(hero-5)까지 **약 29초** 대기.
- **정의 위치**: `app/home/Home.tsx:39-45` `videos` 배열. 배열 순서 = 재생 순서.
- **전환 로직**: `components/HeroVideo.tsx:67-73` `onEnded` → `(index+1) % length` 순환.
- **첫 영상 텍스트**: `Home.tsx:29-31` `showHeroText` — index 0(첫 영상)에만 인사 문구("진료 너머, 사람의 고귀함을…") 오버레이. 이후 영구 숨김.
- **주의**: hero-1 객체만 `webm` 소스 보유. 순서만 재배치하고 **각 객체(파일명·webm·720p)는 그대로 유지**.

### 결정 (사용자)
- "원장님 3장면 먼저" → 순서: **hero-5 → hero-3 → hero-4 → hero-1 → hero-2**
- 첫 화면 = hero-5(웃는 얼굴) 위 인사 문구 겹침 → **가독성 구현 후 프레임으로 확인** (얼굴 좌측, 텍스트도 좌측 → `heroOverlay` 그라데이션으로 일부 커버)

## 3. 작업 ② — GBT 장비 홍보

### GBT = Guided Biofilm Therapy (EMS AIRFLOW 장비) = "시리지 않은 스케일링"

### 핵심 발견: 텍스트는 이미 거의 완성
`lib/copy.ts` Periodontics(잇몸·스케일링, 225-258행)가 이미 GBT를 충실히 반영:
- `intro`: "GBT(Guided Biofilm Therapy) 프로토콜에 따라 에어플로우로…"
- `processes`: "에어플로우(AIRFLOW) 치태·착색 제거" 포함
- `features`: "GBT 프로토콜 기반 체계적 관리"
- `targetsTitle`: **"PAINLESS GBT / 시리지 않은 편안한 무통증 GBT"** + 공식 카피 메시지("파우더로 섬세하게 세균 관리, 초슬림팁으로 부드럽게 치석 제거")
- `targets`: "스케일링이 아파서 미뤄오신 분" 등
- Whitening의 `devices`에도 "GBT Machine" 존재

→ **부족한 것 = 시각 자료(영상·장비사진).** 작업의 실체는 "GBT 시각 섹션 신설".

### 자료 분석 (`/Users/kimminwoo/Desktop/GBT 스케일링.zip`)
| 자료 | 정체 | 사용 가능성 |
|---|---|---|
| GBT_1.jpg | 공식 광고 포스터(덴탈아리랑) | ❌ 워터마크 — 사용 불가 |
| GBT_2.png | 교정치아 시술 클로즈업 | ❌ 워터마크 |
| GBT_3.jpg | AIRFLOW 장비 본체(EMS 제품컷) | ✅ 워터마크 없음 |
| 1.mp4 (154초) | 한국어 환자 교육 애니메이션(자막) | ✅ 짧게 편집 |
| 2.mp4 (186초) | 실사 임상 케이스(미백) | △ 피·잇몸 적나라 → 수위 조절 편집 |
| 중첩 zip | EMS 공식 GBT 케이스 영상 16종 | 참고용 소스 |

- **자체 시술 이미지 대안**: hero-4(원장님 GBT 시술)에서 프레임 추출 → 워터마크 없는 자체 자료로 활용 가능.

### 추가할 위치 (사용자: "둘 다")
1. **진료과목 > 잇몸·스케일링 상세** (`app/treatments/[slug]/page.tsx`): GBT 영상 + 장비사진 시각 섹션 신설 (Periodontics 한정 렌더)
2. **시설 소개** (`app/facility/page.tsx`): 노바케어(`.novaSec`) 패턴으로 GBT 장비 블록 추가

### 영상 처리 (사용자: "둘 다 편집")
- `1.mp4` → 인트로+바이오필름 설명 구간 ~40-60초로 컷, 웹최적화(H.264 720p, muted)
- `2.mp4` → 깔끔한 장비 작동 구간만 ~20-30초, 적나라한 부분 제외
- 배치: `public/media/video/gbt-*.mp4`

### 문구·톤 (사용자: "카피 차용 + 우리 톤")
- 공식 카피 핵심 메시지는 이미 copy.ts에 반영됨 → 시각 섹션 캡션만 기존 네이비·골드 톤으로 신규 작성
- 워터마크 없는 GBT_3 + 자체 프레임만 사용

## 4. 영향 파일
| 파일 | 변경 |
|---|---|
| `app/home/Home.tsx` | videos 배열 순서 재배치 |
| `app/treatments/[slug]/page.tsx` | Periodontics GBT 시각 섹션 추가 |
| `app/facility/page.tsx` | GBT 장비 블록 추가 |
| `lib/copy.ts` | (선택) 미디어 경로 필드 보강 |
| `public/media/video/gbt-*.mp4` | 편집 영상 신규 |
| `public/media/images/equipment/gbt-*.jpg` | 장비/시술 이미지 신규 |
