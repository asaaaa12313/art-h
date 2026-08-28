# Plan — v1.56 신경치료 개편 + 진료과목 이미지 재배치 + GEO 보완

작성일: 2026-08-28 / 기획: 김민우 / 의뢰: 아트에이치치과 (카카오톡 원장님 요청 5건)
기준 커밋: `bece92b` (v1.55) / 상태: **구현 완료 (2026-08-28) — 커밋 대기**

> 결정 반영: Q1(엔도 촬영본) 미확보 → **Q2=(b) 자체 SVG 모식도**로 진행 / Q3 = 4-B(신규 밴드) 단독, 4-A는 촬영본 입고 시 추가(`app/home/Home.tsx` TODO 주석) / Q4 = 기존 프로필 사진 사용 / Q5 = 확인값 미수신이라 기존 FAQ 근거(2~4회)만 사용.

---

## 0. 한 줄 요약

원장님 지적 5건은 전부 코드에서 사실로 확인됐고(특히 "신경치료에 GBT 사진" = 정확한 지적),
**엔도 장비 실사 자산이 0장**이라 요청 3·4는 촬영 또는 자체 모식도 중 하나를 골라야 합니다. GEO는 스키마·답변형 구조·크롤러 정책 8건으로 보완합니다.

---

## 1. 조사 결과 — 사진 전수 확인 (실물 열어서 검증)

### 1-1. 요청 2 "신경치료에 GBT 사진" → **지적 정확함**

현재 신경치료 대표 이미지 `treatment-room/treatment-02.jpg` 를 열어 확인한 결과,
**화면 절반을 EMS AIRFLOW MAX 핸드피스와 파우더 챔버가 차지**하는 GBT 장비 사진입니다. (파일명이 `treatment-room/`이라 그동안 진료실 사진으로 분류돼 있었음)

이 한 장이 **5곳**에서 신경치료를 대표하고 있습니다 — 전수 교체 대상:

| # | 경로 | 용도 |
|---|---|---|
| 1 | `app/home/Home.tsx:37` | 홈 진료과목 카드(신경치료) |
| 2 | `app/treatments/page.tsx:18` | 진료과목 목록 카드 |
| 3 | `app/treatments/[slug]/page.tsx:15` | 신경치료 상세 헤더 |
| 4 | `app/treatments/page.tsx:40` | 진료과목 목록 페이지 헤더 |
| 5 | `lib/copy.ts:357` | 신경치료 갤러리 1번 |

### 1-2. 요청 1 "원장님 사진이 너무 많다" → **7장 중 6장에 원장 등장**

| # | 과목 | 현재 이미지 | 원장 노출 |
|---|---|---|---|
| 01 | 임플란트 | `implant-surgery-01` 수술 장면 | O (마스크·수술복) |
| 02 | 신경치료 | `treatment-02` **← GBT 장비** | X |
| 03 | 사랑니 발치 | `xray-position` 파노라마 촬영 | O |
| 04 | 턱관절 | `tmj-tmd-monitor` 3D 영상 설명 | O |
| 05 | 의식하진정 | `sedation-monitor-01` 모니터 조작 | O |
| 06 | 잇몸·스케일링 | `gbt-treatment` GBT 시술 | O |
| 07 | 치아미백 | `whitening-lamp-01` 미백 램프 | O |

### 1-3. 요청 3·4 관련 — **엔도 자산 0장**

보유 이미지 62장 전수 확인 결과 X-Smart Pro+ · ProTaper Next · 엔도 파일이 찍힌 사진은 **한 장도 없습니다.**
원장님이 보내주신 사진은 덴츠플라이시로나 제조사 마케팅 이미지로, 그대로 홈페이지에 올리는 것은 저작권 리스크가 있습니다 → §4 Q1·Q2에서 결정 필요.

### 1-4. 요청 5 관련 — 데이터는 이미 있음

`lib/copy.ts:945` 강지수 원장 = **치과보존과 전문의**(보건복지부 인증 보존과 전문의, 대한치과보존학회 인증, 대한치과근관치료학회 정회원), 프로필 사진 `doctor/doctor-kang-profile.jpg` 보유.
그런데 **신경치료 상세 페이지에는 원장 정보가 전혀 노출되지 않습니다**(features 리스트에 "치과보존과 전문의 직접 진료" 한 줄뿐). → 신설 블록 필요.

---

## 2. 개편안

### Phase 1. 진료과목 이미지 재배치 (요청 1·2) — 원장 노출 6장 → 2장

| # | 과목 | AS-IS | TO-BE | 근거 |
|---|---|---|---|---|
| 01 | 임플란트 | implant-surgery-01 | **유지** | 얼굴 노출 적고 "전문의 집도"가 핵심 메시지 |
| 02 | 신경치료 | treatment-02 (GBT) | **엔도 촬영본** (없으면 `equipment/equipment-02` 임시) | 요청 2 |
| 03 | 사랑니 발치 | xray-position | `surgery/or-fullset` (수술실 풀세팅) | 원장 감축 |
| 04 | 턱관절 | tmj-tmd-monitor | **유지** | 3D 영상으로 설명하는 장면 = 설명력 |
| 05 | 의식하진정 | sedation-monitor-01 | `sedation/bm1-monitor` (환자 감시장치) | 원장 감축 |
| 06 | 잇몸·스케일링 | gbt-treatment | **`treatment-02` (AIRFLOW)** | 요청 2 — 원장님 지정 |
| 07 | 치아미백 | whitening-lamp-01 | `whitening/whitening-bluelight` | 원장 감축 |

- 밀려난 `gbt-treatment`·`whitening-lamp-01`·`xray-position`·`sedation-monitor-01` 은 각 상세 페이지 갤러리에 남아 계속 노출됩니다(원장 진료 장면 자체는 신뢰 자산이라 삭제하지 않음).
- 홈 / 목록 / 상세 헤더 **3개 매핑 테이블을 동시에** 수정 — 현재 같은 표가 3곳에 중복 정의돼 있어 어긋나기 쉬움. 이번에 `lib/copy.ts`의 `TREATMENTS[].card` 필드로 **단일화** 제안.

### Phase 2. 신경치료 상세 — 장비·기술 블록 신설 (요청 3)

`lib/copy.ts` root-canal 항목에 기존 컴포넌트 규격(`devicesTitle`/`devices`, `techTitle`/`tech`)으로 추가. 신규 컴포넌트 개발 없음.

**추가할 장비 블록** (제조사 공식 페이지 확인 사실 기반, 환자 언어로 번역):

| 장비 | 사실 근거(제조사 공식) | 홈페이지 표기안 |
|---|---|---|
| X-Smart Pro+ | 토크 0.2–7.5 N·cm, 100–3,000 rpm, **근관장 측정기 내장**, Dynamic Accuracy™ Auto-Reverse, 로터리·왕복(Reciprocating) 겸용, 무선 | "근관 길이를 실시간으로 확인하며 치료합니다 — 근관장 측정기가 내장돼 파일이 설정 길이를 넘지 않도록 자동으로 되돌아갑니다." |
| ProTaper Next | M-Wire® NiTi 열처리 소재, 비대칭(오프셋) 회전으로 근관벽 2점만 접촉, X1–X5 중 **대부분 X1·X2 두 개로 성형** | "유연한 니켈-티타늄 파일이 굽은 근관을 따라 움직입니다. 사용 파일 수가 적어 치료 시간과 파일 파절 위험을 줄입니다." |

- 의료광고법 유의: "최신·최고·유일·완치" 금지, 효과 보장 표현 금지 → **장비명과 기능 사실만** 기술. 수치는 rpm/Ncm 나열 대신 위처럼 환자 언어로 1차 번역하고, 정확한 사양은 캡션에 작게.
- `processes`(치료 과정 5단계)에 근관장 측정·기계적 성형 단계 반영해 문구 갱신.
- FAQ 1건 추가: "신경치료 기구는 어떤 걸 쓰나요?" → 장비명 직답(GEO 인용 유도, §3-G4와 연결).

### Phase 3. 신경치료 상세 — 보존과 전문의 블록 신설 (요청 5)

상세 페이지 상단(`txHead` 바로 아래, 모식도 앞)에 **전문의 카드 밴드** 신규 섹션:

```
[ 강지수 원장 사진 ]   ENDODONTIC SPECIALIST
                      치과보존과 전문의가 직접 진료합니다
                      보건복지부 인증 보존과 전문의 · 대한치과보존학회 인증
                      대한치과근관치료학회 정회원
                      "환자분의 이야기에 귀 기울이며, 자연치아를 최대한 보존하는 진료를 약속합니다."
                      [ 의료진 소개 보기 → ]
```

- 데이터는 `DOCTORS[1]` 재사용 — 중복 정의 없음.
- `Treatment` 타입에 `specialist?: { doctorIndex: number; label: string; title: string; desc: string }` 추가 → 향후 임플란트(구강악안면외과)에도 같은 방식 적용 가능.
- 홈 `STATS`의 "전문의 2인 협진"과 메시지 일관.

### Phase 4. 메인 첫 화면 (요청 4)

현재 히어로 = 사진 3장(대기실·외관·상담실, 2.5초씩) → 영상 4개 → 반복 구조.

| 안 | 내용 | 장단 |
|---|---|---|
| **4-A (추천)** | 히어로 사진 4번째로 **엔도 실사 1장** 추가 | 요청 그대로. 단 병원 공간 위주 톤에 제품 클로즈업이 끼어 이질감 가능 → 진료 장면(원장이 X-Smart Pro+ 사용) 촬영이면 자연스러움 |
| 4-B | 히어로 아래 신규 밴드 `ENDODONTICS` 신설 (보존과 전문의 + 엔도 시스템 + 신경치료 링크) | 톤 유지하며 첫 화면 존재감 확보. 스크롤 1회 필요 |
| 4-C | 진료과목 카드 이미지 교체로만 반영 | 최소 변경. 원장님 체감 효과 약함 |

→ **4-A + 4-B 병행 권장.** 4-A는 촬영본 확보가 전제(§4 Q1).

### Phase 5. 자체 엔도 모식도 (촬영 불가 시 대체안)

이 사이트는 이미 SVG 모식도 시스템(`components/TxDiagram.tsx`, 20종)을 갖고 있습니다. 저작권 걱정 없는 자체 자산으로 다음 3종 신규 제작 가능:

- `endo-1` 감염된 근관 → `endo-2` 파일로 근관 성형(근관장 측정 표시) → `endo-3` 거타퍼차 충전·밀폐
- 기존 `rct-1~4`(충치 진행 단계) 와 함께 배치하면 "왜 → 어떻게" 흐름이 완성됩니다.
- 제작 비용: 코드 작업 약 40분, 외부 자산 0.

---

## 3. GEO 보완 (생성형 검색 대응)

**현황**: 홈 `Dentist` 스키마 1개 + 상세 `FAQPage` 7개, sitemap·robots 존재. 그 외 없음.

| # | 항목 | 내용 | 파일 |
|---|---|---|---|
| G1 | `MedicalProcedure` 스키마 | 과목 상세 7개에 procedureType·howPerformed·preparation·followup·bodyLocation 추가. 신경치료엔 사용 장비명(X-Smart Pro+ / ProTaper Next) 명시 → **AI가 인용할 고유명사 확보** | `app/treatments/[slug]/page.tsx` |
| G2 | `Physician` 스키마 | 의료진 2인 — name·medicalSpecialty(Endodontics / OralAndMaxillofacialSurgery)·qualification·worksFor | `app/doctor/page.tsx` |
| G3 | `BreadcrumbList` | 홈 › 진료과목 › 신경치료 경로 명시 | 상세·목록 |
| G4 | **답변형 요약 박스** | 각 상세 상단에 "한눈에 보기" — 담당 전문의 / 내원 횟수 / 회당 시간 / 보험 적용 / 사용 장비를 **정의형 문장**으로. AI 검색이 그대로 인용하는 형식 | `copy.ts` + 상세 |
| G5 | `llms.txt` | 병원 정체성·전문의 구성·과목·위치·진료시간을 800자 내 요약해 루트 제공 | `public/llms.txt` |
| G6 | AI 크롤러 명시 허용 | robots에 GPTBot·ClaudeBot·PerplexityBot·Google-Extended·CCBot 등 개별 allow 명시(현재 `*` allow라 동작은 하나, 명시가 안전) | `app/robots.ts` |
| G7 | sitemap `lastModified` 고정 | 현재 `new Date()` → **빌드할 때마다 전 페이지 수정일이 바뀜**(신선도 신호 왜곡). 콘텐츠 기준 날짜 상수로 교체 | `app/sitemap.ts` |
| G8 | 지역 질의 대응 | "송도에서 신경치료 받을 수 있는 곳", "보존과 전문의가 있는 치과" 같은 실제 질의형 FAQ + 홈 JSON-LD에 `areaServed`(송도동·연수구) 추가. 과장·최상급 표현 없이 사실만 | `copy.ts`, `app/page.tsx` |

> G4·G8은 GEO 효과가 가장 큰 항목입니다. AI 검색은 "표·정의형 문장·고유명사"를 우선 인용하므로, 장비명(ProTaper Next)과 자격(보건복지부 인증 보존과 전문의)이 한 문장에 같이 있는 구조가 유리합니다.

---

## 4. 결정 필요 (원장님 확인 · ★는 진행 선행조건)

- **★Q1. 엔도 장비 실물 촬영 가능한가요?** — X-Smart Pro+ 본체·터치스크린 화면, ProTaper Next 파일 패키지, 실제 사용 장면 3컷이면 요청 3·4가 전부 해결됩니다. (기존 촬영본과 톤이 맞아 가장 좋은 결과)
- **★Q2. Q1이 어렵다면** — (a) 덴츠플라이시로나 한국지사에 이미지 사용 서면 동의 요청(딜러 경유 가능) / (b) 자체 SVG 모식도(Phase 5)로 대체. **기본값: (b)**
- Q3. 메인 첫 화면 반영 방식 — 4-A(히어로 사진 추가) / 4-B(신규 밴드) / **병행(기본값)**
- Q4. 신경치료 상세의 전문의 사진 — 기존 프로필 `doctor-kang-profile.jpg` 사용(기본값) / 진료 장면 신규 촬영
- Q5. GEO 답변형 요약에 넣을 사실 — 신경치료 평균 내원 횟수·회당 시간·보험 적용 여부를 원장님 확인값으로 받고 싶습니다(현재 FAQ의 "2~4회"는 일반론).

> Q3·Q4는 답이 없으면 기본값으로 진행합니다. Q1·Q2는 답이 있어야 Phase 2·4가 완성됩니다.

---

## 5. 검토했으나 기각한 대안

1. **덴츠플라이시로나 공식 제품 이미지를 그대로 사용** — 제조사 저작물이라 무단 사용 시 삭제 요구·손해배상 리스크. 의료기관 홈페이지는 분쟁 시 노출도가 높아 특히 부적절. → 촬영 또는 자체 모식도로 대체.
2. **신경치료를 별도 랜딩 페이지로 신설** — 유입 극대화에는 유리하나 7과목 구조가 깨지고 유지보수가 이원화됨. 기존 상세 페이지를 강화하는 편이 IA·비용 모두 유리. → 기각.

---

## 6. 변경 예정 파일

| 파일 | 내용 | Phase |
|---|---|---|
| `lib/copy.ts` | 카드 이미지 단일화 필드 / root-canal devices·tech·specialist·FAQ / GEO 요약 데이터 | 1·2·3·G |
| `app/home/Home.tsx` | TX_IMG 제거(단일화) · 히어로 사진 · ENDODONTICS 밴드 | 1·4 |
| `app/treatments/page.tsx` | TX_SRC 제거(단일화) · PageHeader 이미지 | 1 |
| `app/treatments/[slug]/page.tsx` | 전문의 밴드 · 요약 박스 · MedicalProcedure·BreadcrumbList | 1·2·3·G1·G3·G4 |
| `app/doctor/page.tsx` | Physician 스키마 | G2 |
| `app/page.tsx` | areaServed·의료진 연결 | G8 |
| `app/robots.ts` · `app/sitemap.ts` | AI 크롤러 명시 · lastModified 고정 | G6·G7 |
| `public/llms.txt` | 신규 | G5 |
| `components/TxDiagram.tsx` | endo-1~3 모식도 (Q2=b 선택 시) | 5 |
| `public/media/images/endo/` | 촬영본 (Q1 승인 시) | 2·4 |

## 7. 종료 조건 · 검증 (2026-08-28 실행 결과)

- [x] Phase 1~5 + GEO 8건 완료, Q1·Q2 결정 반영
- [x] `npx tsc --noEmit` PASS
- [x] `grep -rn "treatment-02" app lib` → `lib/copy.ts:794` 잇몸·스케일링 card 1건만 (신경치료 경로 0건)
- [x] 카드 이미지 매핑이 `lib/copy.ts` 한 곳에만 — `grep -rn "TX_IMG\|TX_SRC" app` 0건
- [x] `npx next build` 무에러 (20 페이지 생성) + 신경치료 상세·홈 데스크톱(1200px)·모바일(390px) 육안 확인
- [x] 구조화 데이터 JSON-LD 파싱 통과 — `/`(Dentist·WebSite) `/treatments`(BreadcrumbList·ItemList) `/treatments/root-canal`(MedicalWebPage·MedicalProcedure·FAQPage·BreadcrumbList) `/doctor`(Physician·BreadcrumbList)
- [x] `/llms.txt` · `/robots.txt`(AI 크롤러 12종 명시) · `/sitemap.xml`(lastmod 고정) 응답 확인
- [ ] 밖으로 나가기 직전 검수 1회 (전역 규칙 §3) — 푸시 시점에 실행
- 참고: 이 프로젝트에는 eslint 설정 파일이 없어 lint는 건너뛰고 `next build`의 타입·컴파일 검증으로 대체.

## 8. 예상 소요

| Phase | 소요 |
|---|---|
| 1. 이미지 재배치 + 매핑 단일화 | 25분 |
| 2. 신경치료 장비·기술 블록 | 35분 |
| 3. 보존과 전문의 밴드 | 30분 |
| 4. 메인 첫 화면 | 25분 |
| 5. 엔도 모식도 3종 (Q2=b 시) | 40분 |
| G. GEO 8건 | 60분 |
| 검증·검수·커밋 | 25분 |
| **합계** | **약 3시간 40분** (촬영본 대기 시간 별도) |
