# Research — v1.22 → v1.23 업체 수정 요청 반영

작성일: 2026-04-27
배경: 운영 중인 아트에이치치과 홈페이지에 대해 업체(원장님)로부터 수정 요청 9건 접수.
이번 라운드의 핵심은 **주소·전화번호 정정(Critical)** 과 의료진 이력/사진 갱신, 시설 페이지 축소.

---

## 1. 현재 코드베이스 구조

```
app/
  layout.tsx              ← 사이트 메타(description/keywords/OG) "송도국제업무단지 C8-2블럭"
  page.tsx                ← JSON-LD (Dentist) streetAddress
  home/Home.tsx           ← 히어로 + 6개 섹션 (스토리/진료/의료진/시설/위치)
  home/Home.module.css    ← 히어로 텍스트 transition 정의
  about/page.tsx          ← 인사말 + Promise + 풀블리드 외관
  doctor/page.tsx         ← 의료진 2명 카드 (DOCTORS 배열 사용)
  facility/page.tsx       ← 진료 공간 4종 + 보유 장비 4종(아코디언)
  location/page.tsx       ← 주소/연락처/주차/교통/진료시간/지도
  treatments/page.tsx     ← 진료과목 7종 그리드
  treatments/[slug]/page.tsx ← 개별 진료과목 상세
components/
  HeroVideo.tsx           ← autoplay, onEnded → 다음 index, isMobile 분기
  Footer.tsx              ← SITE.address / SITE.phone 사용 (자동 동기화)
  Nav, FloatingCta, MapEmbed, KakaoMap, Photo, Reveal, Lightbox, BookingLink, PageHeader
lib/
  copy.ts                 ← SITE / NAV_ITEMS / TREATMENTS / DOCTORS / SYSTEM_ITEMS / GREETING / PROMISE_ITEMS / FACILITY_ROOMS / EQUIPMENTS
  visuals.ts              ← CSS gradient 폴백
public/media/
  video/hero-1~5.mp4 (+ -720.mp4, hero-1.webm, hero-poster.jpg)
  images/
    doctor/ doctor-01~03.jpg, doctor-choi-profile.jpg, doctor-kang-profile.jpg, doctor-female-placeholder.svg
    exterior/ exterior-01.jpg, exterior-02.jpg
    waiting, treatment-room, surgery, consult, xray, equipment, powder, recovery
```

레거시 파일(별도, 손대지 않음): `art-h-dental-v5.jsx`, `art-h-dental-prd-v1.3.md`

---

## 2. 수정 요청 9건 — 영향 범위 매핑

### 요청 1 (Critical) 주소·전화번호 정정

**현재 잘못된 값**
- 전화번호: `032-381-3877`
- 주소: `인천 연수구 인천타워대로 365 힐스테이트 송도 더스카이`
- 출구: `국제업무지구역 3번 출구 202m`

**정정 후**
- 전화번호: `032-831-3877`
- 주소: `인천광역시 연수구 센트럴로 263 IBS타워 업무동 8층`
- 출구: `국제업무지구역 5번 출구 470m (G타워 방면)`

**영향 파일 (Grep으로 확인 완료)**
| 파일 | 라인 | 항목 |
|---|---|---|
| `lib/copy.ts` | 7 | `phone` |
| `lib/copy.ts` | 8 | `address` |
| `lib/copy.ts` | 9 | `addressShort` |
| `lib/copy.ts` | 10 | `transit` |
| `app/page.tsx` | 15 | JSON-LD `streetAddress` |
| `app/layout.tsx` | 17, 25 | metadata description |
| `app/layout.tsx` | 18 | keywords (`송도국제업무단지` 유지 가능) |
| `app/home/Home.tsx` | 200 | 위치 섹션 h2 (`힐스테이트 송도 더스카이`) |
| `app/home/Home.tsx` | 201 | 위치 섹션 sub |
| `app/location/page.tsx` | 24 | ADDRESS 본문 |
| `app/location/page.tsx` | 40 | PARKING·TRANSIT 본문 |
| `app/about/page.tsx` | 106 | 풀블리드 라벨 |
| `components/MapEmbed.tsx` | 13 | 기본 지도 검색어 (`힐스테이트 송도 더스카이 아트에이치치과`) |
| `components/MapEmbed.tsx` | 25 | 카카오 검색 query suffix `송도` (유지) |
| `components/KakaoMap.tsx` | 19~21 | 좌표 (현재 37.3894, 126.6506 — 힐스테이트 좌표라 IBS타워로 갱신 필요) |

**자동 동기화 되는 곳 (수정 불필요)**
- `components/Footer.tsx` — `SITE.address` / `SITE.phone` 사용
- `app/location/page.tsx` CONTACT — `SITE.phone` 사용
- `app/home/Home.tsx` 전화 CTA — `SITE.phone` 사용
- 즉, `lib/copy.ts` SITE 객체만 바꾸면 footer/CTA/location CONTACT는 자동 반영.

**미해결**
- 네이버플레이스 URL `https://naver.me/GWW5jD4j` — 업체에서 네이버 정보도 잘못되어 수정 중이라 했음. 현재는 그대로 두고 사용자에게 확인 요청.
- KakaoMap 좌표 — IBS타워(센트럴로 263) 정확한 위경도 필요. 송도 IBS타워는 약 `37.3858, 126.6438` 추정이지만 정확값은 사용자 확인 또는 카카오/네이버 API로 조회 필요.

---

### 요청 2 메인 히어로 슬로건 수정

**파일:** `app/home/Home.tsx:50`
- AS-IS: `"한 분 한 분의 이야기에 귀 기울이며,\n끝까지 책임지는 진료를 약속합니다."`
- TO-BE: `"한 분 한 분의 이야기에 귀 기울이며,\n끝까지 책임지는 진료를 추구합니다."`

원장님 의도: "할 수 있는 범위까지만 담백하게" → 약속 → 추구 (한 단어 변경).

---

### 요청 2-bonus 메인 히어로 텍스트가 첫 영상에만 보이도록

**현재 동작**
- `app/home/Home.tsx:44~58` — 텍스트(eyebrow / title / sub / CTAs)가 `data-loaded` 상태로 페이지 로드 시 fade-in. 이후 계속 노출됨.
- `components/HeroVideo.tsx:67` — `onEnded` 핸들러로 5개 비디오 순환 재생. 부모에 인덱스 변경을 알리지 않음.

**원하는 동작**
- 첫 영상 재생 중에만 텍스트가 보이고, 두 번째 영상부터는 텍스트가 페이드 아웃.

**구현 방향 (옵션)**

| 옵션 | 방식 | 장단점 |
|---|---|---|
| A | `HeroVideo`에 `onIndexChange?: (idx: number) => void` 추가, `Home`에서 `idx > 0` 면 텍스트 hide | 자연스러움(영상 길이에 따라 자동), 텍스트와 영상 동기 |
| B | `Home`에서 `setTimeout(8s)` 후 텍스트 hide | 간단하지만 영상 길이 변동에 약함, 부정확 |

**추천: 옵션 A.** "이후엔 영상만" 메모와 가장 부합. HeroVideo 변경 최소(prop 추가 + onEnded 콜백 호출만).

---

### 요청 3 의원소개 — 마지막 건물 사진에 "IBS 타워" 금색 글자

**파일:** `app/about/page.tsx:101~111` (풀블리드 외관 이미지 영역)
- 현재 라벨: `송도국제업무단지 · 힐스테이트 송도 더스카이`
- 변경: 라벨 제거하거나 변경. **신규 오버레이로 "IBS TOWER" (또는 한글 "IBS 타워") 금색 텍스트** 추가.
- 디자인 시스템에 이미 `--c-gold`, `--c-gold-l` 변수 있음 (`globals.css` 확인 필요). DM Serif Display 폰트(`var(--f-display)`)와 잘 어울림.

**구현 옵션**
- A. 기존 `Photo` 컴포넌트 `label` prop을 활용 → 다만 현재는 흰색·작은 문자. 금색·큰 디스플레이 폰트 표현이 필요.
- B. 풀블리드 영역에 absolute positioned overlay div 추가 (gold + display font + 큰 사이즈).

**추천: B.** label prop은 시설/대기실용 작은 라벨 톤이므로, 별도 강조 오버레이가 적절.

---

### 요청 4-1 의료진 — 최종원 대표원장 사진 교체

**파일:** `public/media/images/doctor/doctor-choi-profile.jpg` 덮어쓰기
- 첨부된 새 사진(흰 가운, 안경, 미소, 검정 배경, 팔짱)
- DOCTORS[0].photo 경로(`/media/images/doctor/doctor-choi-profile.jpg`) 그대로 두고 파일만 교체 → 코드 변경 0.
- 단, `objectPosition: 'center 20%'` 값은 새 사진 비율에 맞게 재조정 필요할 수 있음 (실측 후 결정).

**검토 필요**
- About 페이지 인사말 사진(`app/about/page.tsx:24`)은 `/media/images/doctor/doctor-01.jpg` (다른 파일). 메모는 "의료진 항목"으로 한정했으므로 about은 그대로 둠. 사용자 확인 필요.

---

### 요청 4-2 의료진 슬로건 수정

**파일:** `lib/copy.ts:216` (DOCTORS[0].quote)
- AS-IS: `'"수술은 정교하게, 자연치아는 끝까지.\n한 분 한 분의 치아를 제 작품처럼 대합니다."'`
- TO-BE: `'"한 분 한 분의 치아를 소중하게 대합니다."'`

**연관 위치 (영향 검토 필요)**
- `app/doctor/page.tsx:32` — 페이지 헤더 `"수술은 정교하게, 자연치아는 끝까지. 각 분야의 전문의가..."` (총괄 서브타이틀)
- `app/home/Home.tsx:147` — 홈 의료진 섹션 `"수술은 정교하게, 자연치아는 끝까지."`

→ **사용자에게 일관성 결정 위임.** 메모는 "의료진" 한 곳만 명시하지만, 같은 슬로건이 3곳에 박혀 있어 일관 유지 vs 의료진 카드만 수정의 선택지가 필요.

---

### 요청 4-3 의료진 이력 갱신 (필수)

**파일:** `lib/copy.ts:217~222` (DOCTORS[0].career), `lib/copy.ts:232~237` (DOCTORS[1].career)

**최종원 대표원장 신규 이력 (13개)**
1. 보건복지부 인증 구강악안면외과 전문의
2. 대한악안면성형재건외과학회 인정의
3. 서울대학교 졸업
4. 전북대 치의학전문대학원 졸업
5. 한양대병원 인턴 수료
6. 한양대병원 구강악안면외과 레지던트 수료
7. 제3기갑여단 의무중대 치과군의관
8. 국군춘천병원 구강악안면외과 과장
9. 인천공항 제1터미널 코로나19 검역관
10. 하늘리더스치과 부원장
11. Osstem master course 임상지도의
12. DALS(치과전문소생술) provider
13. 한양대병원 치과진료부 외래교수

**강지수 원장 신규 이력 (9개)**
1. 보건복지부 인증 보존과 전문의
2. 대한치과보존학회 인증 보존과 전문의
3. 대한치과보존학회 인증 보존과 인정의
4. 대한치과보존학회 정회원
5. 대한치과근관치료학회 정회원
6. 전남대학교 치과대학 치의학과 졸업
7. 전남대학교 치의학전문대학원 석사 졸업
8. 전남대학교 치의학전문대학원 박사 수료

**추가 요구**: "보건복지부" 앞에 보건복지부 마크(공식 로고) 표시.
- 라이선스 이슈: 보건복지부 공식 BI(부처마크)는 정부저작물 자유이용허락 대상이지만, 의료광고 사용 시 의료법 56조(보건복지부 인증) 표기 가이드라인 준수 필요.
- 단순 텍스트 + "보건복지부 인증" 강조(아이콘) 처리도 가능.

**구현 옵션**
- A. SVG 인라인 아이콘(체크/뱃지 형태) — 라이선스 무관, 디자인 시스템 일관성 ↑
- B. 보건복지부 공식 마크 PNG/SVG를 `public/media/images/cert/mohw.png`로 추가 후 `<img>` 표시

**추천: A.** 의료광고법 안전, 공식 마크는 사용자가 별도 제공할 때 옵션 B로 전환.

또한 13개 항목의 시각 구분이 필요. 현재 `app/doctor/page.tsx:74~80`은 단순 list. 카테고리 그룹핑(자격/학력/경력/활동 등)을 추가하면 가독성↑ — 다만 메모는 단순 갱신만 요구 → 일단 단순 list로 갈지, 그룹핑할지 사용자에게 옵션 제시.

---

### 요청 5 진료과목 — 신경치료에서 "미세현미경으로" 삭제

**파일:** `lib/copy.ts` (root-canal 항목)
| 라인 | 현재 | 변경 |
|---|---|---|
| 59 | `'미세현미경으로 근관을 정밀하게. 자연치아 최대 보존이 원칙입니다.'` | `'근관을 정밀하게 처치하여 자연치아를 최대한 보존합니다.'` |
| 61 | `'...치과보존과 전문의가 미세현미경으로 근관 하나하나를 정밀하게 처치합니다.'` | `'...치과보존과 전문의가 근관 하나하나를 정밀하게 처치합니다.'` |
| 71 | `'미세현미경으로 가려진 근관까지 확인'` (features 항목) | **삭제** 또는 `'고배율 확대 시야로 정밀한 근관 확인'` 등 대체 |

원장님 메모: "현미경이 본원에 없습니다" → **모든 미세현미경 언급 제거**. 단순 삭제로 features가 4→3개로 줄어드는 게 자연스러움.

---

### 요청 6 시설 — "보유 장비" 섹션 일단 삭제

**파일:** `app/facility/page.tsx:60~104` (보유 장비 section 전체 + 관련 EQ_SRC 매핑)

**원장님 메모**: CAD/CAM CEREC, 미세현미경 본원에 없음. 3D CT와 디지털 엑스레이는 부위 겹침. → **보유 장비 섹션 통째로 제거**, 추후 저선량 CT / GBT / Endo-Wiz / 자체 기공실 / 의식하진정 장비 등으로 다시 추가 예정.

**구현 방안**
- A. JSX에서 보유 장비 section만 제거 (EQUIPMENTS 데이터는 lib/copy.ts에 그대로 보존 — 추후 활용)
- B. EQUIPMENTS 배열도 비우거나 주석 처리
- C. 페이지 하단에 "장비 정보 추후 업데이트" 안내 문구

**추천: A + 보존**. 데이터 백업 차원에서 lib/copy.ts EQUIPMENTS는 유지, 페이지에서 렌더만 제거. 추후 새 장비 정보 받으면 EQUIPMENTS 갱신 후 페이지 다시 노출.

추가 점검: facility 페이지 metadata description에 `"3D CT, CAD/CAM CEREC, 미세현미경"` 언급 → 동시 정정 필요 (`app/facility/page.tsx:23~24`).

---

### 요청 7 오시는 길 — 첨부 사진 정보 반영

**현재 (`app/location/page.tsx:36~42`)**
```
건물 내 지하주차장 이용
인천1호선 국제업무지구역
3번 출구에서 202m
```

**첨부 1번 사진의 실제 안내 정보**

#### 주차
- 지하 1~3층 주차 가능, 업무동/판매동 모두 가능
- 내원 시 '업무동 저층용' 엘리베이터 탑승 후 올라와야 함

#### 도보
- 국제업무지구역 1번 출구에서 도보 10분
- 센트럴파크역 3번 출구에서 도보 10분

#### 버스
- 정류장 번호 38515 (경제자유구역청 하차, 송도 푸르지오하버뷰 방면)
- 간선버스: 82, 92(급행), 42(순환), 43(순환)

#### 지하철
- 인천지하철 1호선 국제업무지구역 하차 5번 출구 470m (G타워 방면)

#### 자가 (내비)
- 연수구 센트럴로 263 검색
- 송도 IBS타워 업무동 8층

**구현 방안**
- 현재 1행 짜리 PARKING·TRANSIT 카드를 4~5섹션 구조로 확장. 또는 location 페이지를 재구성.
- 일관된 디자인 어조 유지(label 키워드 + 본문)
- 모바일 반응형: 단일 컬럼 stack
- 좌측 컬럼(ADDRESS/CONTACT)와 우측(HOURS/MAP) 외에 새로 OSP(주차/도보/버스/지하철/자가) 5섹션을 추가 → 페이지 길이 늘어남. 디자인 통일감을 위해 카드 스타일 + 아이콘.

#### 진료시간 검토
원장님 메모: "진료시간도 잘못되어있으니 수정 부탁드립니다."
**현재 `lib/copy.ts:12~18`**
```
월·화·수·금: 09:30 — 18:30
목 (야간진료): 09:30 — 20:30
토:           09:30 — 14:00
점심:         14:00 — 15:00
일요일:       정기휴무
```
첨부 사진에는 진료시간 정보가 직접 보이지 않음 → **올바른 진료시간을 사용자에게 추가 요청 필요** (Open Question 1).

---

### 요청 8 보건복지부 마크 (요청 4-3과 통합 처리)

위 요청 4-3 참조. SVG 아이콘 자체 제작 또는 공식 마크 첨부 사용. 사용자 결정 필요.

---

### 요청 9 (재정리) 메인 히어로 텍스트 visibility

위 요청 2-bonus 참조.

---

## 3. 핵심 의사결정 / Open Questions

| # | 항목 | 옵션 |
|---|------|------|
| Q1 | **올바른 진료시간** | 현재 정보 유지 / 신규 정보 — 업체 답변 필요 |
| Q2 | KakaoMap 좌표 (IBS타워) | 카카오 API 조회 / 네이버 좌표 직접 입력 / 일단 추정값(약 37.3858, 126.6438) |
| Q3 | 네이버플레이스 URL | 현재 URL 유지 / 신규 URL — 업체 답변 필요 |
| Q4 | 의료진 슬로건 일관성 | 의료진 카드만 수정 / Doctor 페이지 헤더·홈 모두 수정 |
| Q5 | 보건복지부 마크 | 자체 SVG 아이콘 / 공식 마크 PNG 사용 (라이선스 확인 필요) |
| Q6 | 의료진 이력 표시 | 단순 list (현재 디자인 유지) / 카테고리 그룹핑 (자격·학력·경력·활동) |
| Q7 | About 인사말 사진 (`doctor-01.jpg`) | 새 사진(`doctor-choi-profile.jpg`)으로도 변경 / 현재 유지 |
| Q8 | 신경치료 features 4번째 항목 | 단순 삭제(4→3) / 다른 항목으로 대체 |
| Q9 | 메인 히어로 텍스트 visibility 방식 | 옵션 A(영상 인덱스 기반) / 옵션 B(타이머) |

→ Q1, Q3은 사용자(업체) 답변 필수. 그 외는 plan.md에서 추천안 제시 후 사용자 인라인 메모로 확정.

---

## 4. 작업 위험·트레이드오프

| 항목 | 위험 | 완화책 |
|---|---|---|
| 주소·전화번호 누락 | 한 곳이라도 빠지면 신뢰도 타격 | 5번 요청 그대로: "홈페이지에 적혀 있는 모든 주소를 꼭 확인하고 수정해주세요" → grep으로 전수 검사 + 검수 봇 cross-check |
| KakaoMap 좌표 오류 | 잘못 표시되면 환자 헤맴 | 좌표 변경 후 실제 카카오 지도 사이트에서 확인 / 네이버지도 URL 클릭으로 더블체크 |
| HeroVideo prop 추가 | 기존 컴포넌트 동작 깨짐 | 옵셔널 prop으로 추가, 기존 호출부 변경 불필요 |
| EQUIPMENTS 데이터 보존 | 페이지엔 안 보여도 import 경로가 끊겨 빌드 에러 | facility/page.tsx에서 import만 정리, lib/copy.ts는 유지. 빌드 후 확인 |
| 의료진 이력 13개 표시 | 단순 list로 길어짐 → 가독성 저하 | 카테고리 그룹핑 옵션 제시(Q6) 또는 좁은 레이아웃에서 줄간격 조정 |
| Hero 텍스트 첫 영상에만 노출 | 영상 인덱스 동기화 누수 | onIndexChange 콜백 호출 위치 onEnded에 추가, idx state는 함수형 setter 유지 |
| 보건복지부 마크 라이선스 | 정부저작물 사용 가이드라인 위반 가능 | 자체 SVG 인증 뱃지 디자인 (방패/체크 모티프) 또는 사용자 별도 제공 |

---

## 5. 영향 받지 않는 영역 (작업 범위 제외)

- `app/treatments/[slug]/page.tsx` — 슬러그 기반 동적 페이지. 신경치료 외 진료 항목은 손대지 않음.
- `lib/visuals.ts` — CSS gradient 폴백, 데이터 변경 없음.
- `components/Nav.tsx`, `FloatingCta.tsx`, `BookingLink.tsx` — UX 흐름 변경 없음.
- `art-h-dental-v5.jsx`, `art-h-dental-prd-v1.3.md` — 레거시 참고 문서, 손대지 않음.

---

## 6. 다음 단계

1. 본 research.md 사용자 검토 → 주석 반영
2. `docs/plan.md` 작성 (Phase별 체크리스트 + 의사결정 확정)
3. 사용자 "구현 시작" 명령 후 4단계 구현 진입
