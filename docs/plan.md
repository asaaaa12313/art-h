# Plan — v1.22 → v1.23 업체 수정 요청 반영

작성일: 2026-04-27 / 기획자: 김민우 / 의뢰: 아트에이치치과 원장님
연관 문서: `docs/research.md`, 이전 미디어 통합 plan은 `docs/plan.v1.5-media.md`로 백업.

---

## 0. 사용자 검토 메모란 (이 영역에 인라인 메모 달아주세요)

> **검토 가이드**: 이 plan을 에디터에서 직접 열어 각 Phase·Open Question 옆에 메모(`<!-- 메모: ... -->`) 또는 텍스트 수정으로 의견 주세요. 그 다음 "문서에 메모 추가했으니 반영해" 또는 "구현 시작" 명령 주시면 반영/실행합니다.

### Open Questions — 결정 후 진행

- [ ] **Q1. 진료시간**: 현재(월·화·수·금 09:30–18:30 / 목 야간 09:30–20:30 / 토 09:30–14:00 / 점심 14:00–15:00 / 일 휴무) 그대로? 아니면 새 진료시간을 알려주세요.
- [ ] **Q2. KakaoMap 좌표(IBS타워)**: 추정값 약 `37.3858, 126.6438` 사용해도 될까요? 정확한 좌표 있으시면 알려주세요. (또는 카카오/네이버 지도 URL을 주시면 그 좌표로 사용)
- [ ] **Q3. 네이버플레이스 URL**: 현재 `https://naver.me/GWW5jD4j`. 네이버 정보 수정 후 새 URL이 있다면 알려주세요. 없으면 일단 현재 URL 유지.
- [ ] **Q4. 의료진 슬로건 일관성**: "수술은 정교하게, 자연치아는 끝까지" 문구가 (a) DOCTORS[0].quote, (b) Doctor 페이지 헤더, (c) Home doctor 섹션 — 3곳에 있음. 어디까지 수정?
  - **추천 A**: 의료진 카드만 수정 (요청 그대로) → 다른 2곳은 "수술은 정교하게, 자연치아는 끝까지" 유지
  - **추천 B**: 3곳 모두 새 슬로건으로 통일 (일관성 ↑)
  - 기본값: **A**
- [ ] **Q5. 보건복지부 마크**: (a) 자체 SVG 뱃지 아이콘 / (b) 보건복지부 공식 마크 PNG 사용
  - 기본값: **a (자체 SVG)** — 의료광고법 안전 + 디자인 시스템 일관성
- [ ] **Q6. 의료진 이력 표시**: (a) 현재처럼 단순 list (13개·9개 그대로 한 줄씩) / (b) 카테고리 그룹핑 (자격·학력·경력·활동)
  - 기본값: **b (카테고리 그룹핑)** — 13개는 단순 list로 길어 가독성 저하 우려
- [ ] **Q7. About 인사말 사진**: 현재 `/media/images/doctor/doctor-01.jpg`(진료 장면). 새 프로필 사진(`doctor-choi-profile.jpg`)으로도 변경?
  - 기본값: **현재 유지** (메모는 "의료진 항목"으로 한정)
- [ ] **Q8. 신경치료 features 4번째 항목**: `미세현미경으로 가려진 근관까지 확인` 처리
  - 기본값: **단순 삭제(4→3)** — 자연스러움
- [ ] **Q9. Hero 텍스트 visibility**: (a) 영상 인덱스 기반 (idx > 0 → 텍스트 hide) / (b) 타이머 기반
  - 기본값: **a** — "처음에만 나오고 이후엔 영상만" 메모와 일치

> ※ 빈칸으로 두시면 위 기본값으로 진행.

---

## 1. 작업 개요

운영 중인 아트에이치치과 홈페이지에 9건 수정 반영:
1. 주소·전화번호 정정 (Critical, 전수 점검)
2. 메인 히어로 슬로건 1곳 수정 (`약속` → `추구`)
3. 메인 히어로 텍스트 첫 영상에만 노출
4. 의원소개 마지막 외관 사진에 "IBS 타워" 금색 오버레이
5. 의료진 — 최종원 원장 사진 교체 + 슬로건 + 이력 13개로 갱신
6. 의료진 — 강지수 원장 이력 9개로 갱신
7. 진료과목 — 신경치료에서 "미세현미경" 표현 제거
8. 시설 — "보유 장비" 섹션 통째로 제거 (데이터는 보존)
9. 오시는 길 — 첨부 안내 정보 그대로 반영, 좌표/주소/전화/출구 갱신

---

## 2. Phase 분해 (10개)

### Phase 1. 마스터 데이터 정정 — `lib/copy.ts` SITE 객체

```ts
// AS-IS (lib/copy.ts:3~19)
export const SITE = {
  name: '아트에이치치과',
  nameEn: 'Art H Dental',
  slogan: '진료 너머, 사람의 고귀함을 생각합니다',
  phone: '032-381-3877',                                                // ← 변경
  address: '인천 연수구 인천타워대로 365 힐스테이트 송도 더스카이',     // ← 변경
  addressShort: '송도국제업무단지 · 국제업무지구역 3번 출구 202m',       // ← 변경
  transit: '인천1호선 국제업무지구역 3번 출구에서 202m',                // ← 변경
  ...
};

// TO-BE
export const SITE = {
  name: '아트에이치치과',
  nameEn: 'Art H Dental',
  slogan: '진료 너머, 사람의 고귀함을 생각합니다',
  phone: '032-831-3877',
  address: '인천광역시 연수구 센트럴로 263 IBS타워 업무동 8층',
  addressShort: '송도 IBS타워 · 국제업무지구역 5번 출구 470m',
  transit: '인천1호선 국제업무지구역 5번 출구에서 470m (G타워 방면)',
  naverPlace: 'https://naver.me/GWW5jD4j',  // Q3 답변 반영
  hours: [...],  // Q1 답변 반영 (없으면 현재 유지)
};
```

이 한 군데만 바꾸면 Footer / FloatingCta / Home 전화 CTA / Location CONTACT가 자동 동기화 됨.

- [ ] 1.1 `lib/copy.ts:7` `phone` 정정
- [ ] 1.2 `lib/copy.ts:8` `address` 정정
- [ ] 1.3 `lib/copy.ts:9` `addressShort` 정정
- [ ] 1.4 `lib/copy.ts:10` `transit` 정정
- [ ] 1.5 (Q1) hours 갱신 (답변 시)
- [ ] 1.6 (Q3) naverPlace 갱신 (답변 시)

**검증:** `grep -n "381-3877\|인천타워대로 365\|3번 출구\|힐스테이트 송도"` 결과가 lib/copy.ts 밖에서 0건이 되거나, 남은 부분은 의도된 곳(레거시 art-h-dental-v5.jsx 제외).

---

### Phase 2. 사이트 메타·JSON-LD 정정

- [ ] 2.1 `app/page.tsx:14~19` JSON-LD streetAddress
  ```ts
  // AS-IS: streetAddress: '송도국제업무단지 C8-2블럭'
  // TO-BE: streetAddress: '센트럴로 263 IBS타워 업무동 8층'
  // (addressLocality '연수구', addressRegion '인천광역시'는 유지)
  ```
- [ ] 2.2 `app/layout.tsx:17` description
  ```ts
  // AS-IS: '송도국제업무단지 C8-2블럭. 한 분에게 충분한 시간을 드리는 치과...'
  // TO-BE: '송도 IBS타워. 한 분에게 충분한 시간을 드리는 치과, 아트에이치치과입니다.'
  ```
- [ ] 2.3 `app/layout.tsx:25` OG description (위와 동일 톤)
- [ ] 2.4 `app/layout.tsx:18` keywords — `'송도국제업무단지'` 유지 (지역 SEO에 도움), `'IBS타워'` 키워드 추가 검토

---

### Phase 3. 홈 위치 섹션 + 히어로 슬로건

- [ ] 3.1 `app/home/Home.tsx:200` h2 텍스트 변경
  ```tsx
  // AS-IS: <h2>힐스테이트 송도 더스카이</h2>
  // TO-BE: <h2>송도 IBS타워 · 업무동 8층</h2>
  ```
- [ ] 3.2 `app/home/Home.tsx:201` locSub 변경
  ```tsx
  // AS-IS: 인천 연수구 인천타워대로 365 · 국제업무지구역 3번 출구 202m
  // TO-BE: 인천광역시 연수구 센트럴로 263 · 국제업무지구역 5번 출구 470m
  ```
- [ ] 3.3 `app/home/Home.tsx:50` 히어로 sub
  ```tsx
  // AS-IS: 한 분 한 분의 이야기에 귀 기울이며,\n끝까지 책임지는 진료를 약속합니다.
  // TO-BE: 한 분 한 분의 이야기에 귀 기울이며,\n끝까지 책임지는 진료를 추구합니다.
  ```

---

### Phase 4. 히어로 텍스트 첫 영상에만 노출 (옵션 A)

#### 4.1 `components/HeroVideo.tsx` — 인덱스 변경 콜백 prop 추가

```tsx
// 변경 1: Props 타입 확장
type Props = {
  videos: VideoSource[];
  poster: string;
  alt?: string;
  style?: CSSProperties;
  onIndexChange?: (index: number) => void;  // ← 추가
};

// 변경 2: 함수 시그니처에서 prop 받기
export default function HeroVideo({ videos, poster, alt, style, onIndexChange }: Props) {

// 변경 3: handleEnded에서 콜백 호출
const handleEnded = () => {
  setIndex((prev) => {
    const next = (prev + 1) % videos.length;
    onIndexChange?.(next);
    return next;
  });
};

// 변경 4: 첫 마운트 시에도 0 알림 (선택)
useEffect(() => { onIndexChange?.(0); }, []);  // 또는 부모에서 0 초기값 사용
```

- [ ] 4.1 HeroVideo `onIndexChange` prop 추가 + `handleEnded`에서 콜백 호출

#### 4.2 `app/home/Home.tsx` — 텍스트 visibility state

```tsx
const [videoIndex, setVideoIndex] = useState(0);
const showHeroText = videoIndex === 0;  // 첫 영상일 때만 텍스트 노출

<HeroVideo
  videos={[...]}
  poster={...}
  alt={...}
  onIndexChange={setVideoIndex}
/>

// 텍스트 영역에 data attribute 추가
<p className={styles.heroEyebrow} data-loaded={loaded} data-visible={showHeroText}>...</p>
<h1 className={styles.heroTitle} data-loaded={loaded} data-visible={showHeroText}>...</h1>
<p className={styles.heroSub} data-loaded={loaded} data-visible={showHeroText}>...</p>
<div className={styles.heroCtas} data-loaded={loaded} data-visible={showHeroText}>...</div>
```

- [ ] 4.2 Home.tsx에 videoIndex state 추가, 텍스트에 `data-visible` attr 추가

#### 4.3 `app/home/Home.module.css` — fade-out 트랜지션

```css
/* 추가: data-visible="false" 일 때 페이드 아웃 */
.heroEyebrow[data-visible='false'],
.heroTitle[data-visible='false'],
.heroSub[data-visible='false'],
.heroCtas[data-visible='false'] {
  opacity: 0;
  transform: translateY(-12px);
  transition: opacity 1.2s var(--ease-out), transform 1.2s var(--ease-out);
  pointer-events: none;
}
```

- [ ] 4.3 Home.module.css에 `[data-visible='false']` 스타일 추가
- [ ] 4.4 `prefers-reduced-motion` 분기 검토 (HeroVideo가 정지 이미지일 때는 영상이 안 끝나므로 텍스트 계속 보여야 함 — 모션 감소 사용자에게는 텍스트가 영원히 보이는 게 맞음)

---

### Phase 5. 의원소개 외관 사진 "IBS 타워" 금색 오버레이

#### 5.1 `app/about/page.tsx:101~111` 풀블리드 영역 수정

```tsx
// AS-IS
<Reveal duration="1.4s" from="scale(1.02)">
  <div style={{ height: 400, overflow: 'hidden' }}>
    <Photo
      src="/media/images/exterior/exterior-01.jpg"
      label="송도국제업무단지 · 힐스테이트 송도 더스카이"
      alt="아트에이치치과 건물 외관"
      sizes="100vw"
    />
  </div>
</Reveal>

// TO-BE
<Reveal duration="1.4s" from="scale(1.02)">
  <div className="ibsWrap">
    <Photo
      src="/media/images/exterior/exterior-01.jpg"
      alt="송도 IBS타워 외관 — 아트에이치치과 입주"
      sizes="100vw"
    />
    <div className="ibsOverlay" aria-hidden="true">
      <span className="ibsLabel">SONGDO</span>
      <span className="ibsTitle">IBS TOWER</span>
      <span className="ibsSub">업무동 8층 · 아트에이치치과</span>
    </div>
  </div>
</Reveal>
```

#### 5.2 추가 스타일 (style 블록 안에)

```css
.ibsWrap {
  position: relative;
  height: 400px;
  overflow: hidden;
}
.ibsOverlay {
  position: absolute; inset: 0;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 8px;
  background: linear-gradient(
    180deg,
    rgba(15, 26, 53, 0.05) 0%,
    rgba(15, 26, 53, 0.45) 70%,
    rgba(15, 26, 53, 0.6) 100%
  );
  text-align: center;
}
.ibsLabel {
  font-family: var(--f-display);
  font-size: 14px;
  letter-spacing: 6px;
  color: var(--c-gold-l);
  text-shadow: 0 2px 12px rgba(0,0,0,0.5);
}
.ibsTitle {
  font-family: var(--f-display);
  font-size: clamp(38px, 5.5vw, 64px);
  font-weight: 400;
  letter-spacing: 4px;
  color: var(--c-gold);
  text-shadow: 0 4px 24px rgba(0,0,0,0.55), 0 1px 4px rgba(0,0,0,0.4);
}
.ibsSub {
  font-size: 13px;
  letter-spacing: 2px;
  color: rgba(255,255,255,0.92);
  margin-top: 6px;
  text-shadow: 0 1px 8px rgba(0,0,0,0.5);
}
@media (max-width: 768px) {
  .ibsWrap { height: 320px; }
}
```

- [ ] 5.1 about page 풀블리드 영역 마크업 변경
- [ ] 5.2 ibsWrap/ibsOverlay/ibsLabel/ibsTitle/ibsSub 스타일 추가

> ⚠️ `globals.css`에 `--c-gold`, `--c-gold-l` 변수 정의 확인 필요. 없으면 정의 추가 (Phase 5.3).

---

### Phase 6. 의료진 사진·이력·슬로건 갱신

#### 6.1 사진 교체 (파일 시스템)

- [ ] 6.1.1 첨부된 새 사진을 `/public/media/images/doctor/doctor-choi-profile.jpg`로 덮어쓰기 (파일명 그대로)
- [ ] 6.1.2 새 사진 비율 확인 후 `lib/copy.ts:215` `objectPosition` 조정 (필요시)

> ※ 사용자가 첨부한 사진은 채팅 메시지의 두 번째 이미지(흰 가운, 안경, 미소). 파일을 워크트리로 가져와야 함. 사용자에게 파일 경로 또는 다운로드 가능한 위치를 알려달라고 요청 → 또는 base64로 첨부 받기.

#### 6.2 슬로건 변경 — `lib/copy.ts:216`

```ts
// AS-IS
quote: '"수술은 정교하게, 자연치아는 끝까지.\n한 분 한 분의 치아를 제 작품처럼 대합니다."',

// TO-BE
quote: '"한 분 한 분의 치아를 소중하게 대합니다."',
```

- [ ] 6.2 DOCTORS[0].quote 변경

#### 6.3 (Q4) 다른 위치의 동일 슬로건 처리 — 기본값 A(의료진 카드만)

- A 선택 시: 변경 없음
- B 선택 시:
  - [ ] 6.3.1 `app/doctor/page.tsx:32` 헤더 본문
  - [ ] 6.3.2 `app/home/Home.tsx:147` 홈 의료진 섹션 본문

#### 6.4 이력 갱신 — `lib/copy.ts` DOCTORS

(Q6) 기본값 b (카테고리 그룹핑) 적용 시 데이터 구조 확장:

```ts
// AS-IS
career: [
  '구강악안면외과 전문의',
  '대한치과의사협회 정회원',
  ...
],

// TO-BE (그룹핑)
careerGroups: [
  { label: '자격', items: ['보건복지부 인증 구강악안면외과 전문의', '대한악안면성형재건외과학회 인정의'] },
  { label: '학력', items: ['서울대학교 졸업', '전북대 치의학전문대학원 졸업'] },
  { label: '수련', items: ['한양대병원 인턴 수료', '한양대병원 구강악안면외과 레지던트 수료'] },
  { label: '경력', items: ['제3기갑여단 의무중대 치과군의관', '국군춘천병원 구강악안면외과 과장', '인천공항 제1터미널 코로나19 검역관', '하늘리더스치과 부원장'] },
  { label: '활동', items: ['Osstem master course 임상지도의', 'DALS(치과전문소생술) provider', '한양대병원 치과진료부 외래교수'] },
],
career: [...]  // 호환 유지: 그룹핑 무시하고 전체 펼친 list (구버전 호환)
```

(Q6) 기본값 a 선택 시 단순 list:

```ts
career: [
  '보건복지부 인증 구강악안면외과 전문의',
  '대한악안면성형재건외과학회 인정의',
  '서울대학교 졸업',
  '전북대 치의학전문대학원 졸업',
  '한양대병원 인턴 수료',
  '한양대병원 구강악안면외과 레지던트 수료',
  '제3기갑여단 의무중대 치과군의관',
  '국군춘천병원 구강악안면외과 과장',
  '인천공항 제1터미널 코로나19 검역관',
  '하늘리더스치과 부원장',
  'Osstem master course 임상지도의',
  'DALS(치과전문소생술) provider',
  '한양대병원 치과진료부 외래교수',
],
```

강지수 원장도 동일하게 처리.

- [ ] 6.4.1 DOCTORS[0].career 배열 전면 갱신 (13개)
- [ ] 6.4.2 DOCTORS[1].career 배열 전면 갱신 (9개)
- [ ] 6.4.3 (Q6=b 선택 시) careerGroups 필드 추가 + Doctor 페이지 렌더 로직 수정

#### 6.5 보건복지부 인증 마크 (Q5)

기본값 a (자체 SVG) 적용:

```tsx
// app/doctor/page.tsx — career 항목 렌더 부분에 마크 prefix 추가
{c.startsWith('보건복지부') && <BadgeIcon />}
{c}
```

```tsx
// 또는 별도 컴포넌트
function CertBadge() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
      <circle cx="8" cy="8" r="7" fill="var(--c-navy)"/>
      <path d="M5 8.5 L7 10.5 L11 6" stroke="white" strokeWidth="1.5" fill="none"/>
    </svg>
  );
}
```

- [ ] 6.5.1 `<CertBadge />` 컴포넌트 생성 (또는 inline SVG)
- [ ] 6.5.2 Doctor 페이지 career 렌더 부분에서 "보건복지부 인증" 시작 항목에 prefix 표시
- [ ] 6.5.3 (Q5=b 선택 시) 공식 마크 PNG `public/media/images/cert/mohw.png` 추가 + img 사용

---

### Phase 7. 진료과목 — 미세현미경 표현 제거

`lib/copy.ts` root-canal 항목 수정:

```ts
// 라인 59
// AS-IS: d: '미세현미경으로 근관을 정밀하게. 자연치아 최대 보존이 원칙입니다.',
// TO-BE: d: '근관을 정밀하게 처치하여 자연치아를 최대한 보존합니다.',

// 라인 61
// AS-IS: intro: '...치과보존과 전문의가 미세현미경으로 근관 하나하나를 정밀하게 처치합니다.',
// TO-BE: intro: '...치과보존과 전문의가 근관 하나하나를 정밀하게 처치합니다.',

// 라인 71 (features 두 번째 항목)
// AS-IS: '미세현미경으로 가려진 근관까지 확인',
// TO-BE: 삭제 (Q8 기본값) → features 4→3개로 줄어듦
```

- [ ] 7.1 root-canal `d` 수정
- [ ] 7.2 root-canal `intro` 수정
- [ ] 7.3 root-canal `features` 항목 삭제 (Q8=a) 또는 대체 (Q8=b)

**검증:** `grep -n "미세현미경" lib/copy.ts` 결과 0건. 단, 시설 페이지의 EQUIPMENTS 데이터에는 "미세 현미경" 항목 남아있어도 됨(Phase 8에서 페이지 렌더만 제거하므로 영향 없음).

---

### Phase 8. 시설 — 보유 장비 섹션 제거

#### 8.1 `app/facility/page.tsx`

- [ ] 8.1.1 `:14~19` `EQ_SRC` 매핑 객체 삭제 (또는 주석)
- [ ] 8.1.2 `:5` import에서 `EQUIPMENTS` 제거
- [ ] 8.1.3 `:60~104` "보유 장비" section 전체 JSX 제거
- [ ] 8.1.4 `:23~24` metadata description에서 `"3D CT, CAD/CAM CEREC, 미세현미경"` 표현 제거 — 시설/장비 → 시설로 톤 다운
  ```ts
  // TO-BE
  description: '독립 수술실, 진료 공간 등 아트에이치치과의 시설 안내.',
  ```
- [ ] 8.1.5 `:22` title `'시설 · 장비'` → `'시설'`로 변경 검토

#### 8.2 `lib/copy.ts:296~349` EQUIPMENTS 배열 — **데이터 보존**

향후 저선량 CT / GBT / Endo-Wiz / 자체 기공실 / 의식하진정 장비 등으로 갱신 예정. 일단 그대로 둠.

#### 8.3 Nav 메뉴 라벨 검토

`lib/copy.ts:21~28` `NAV_ITEMS` 의 `시설` 라벨은 그대로 유지 (사용자 메모는 보유장비만 제거).

---

### Phase 9. 오시는 길 페이지 재구성

#### 9.1 `app/location/page.tsx` 본문 재배치

기존 구조: 좌측(ADDRESS / CONTACT / PARKING·TRANSIT) + 우측(HOURS / MAP)

신규 구조: 좌측 컬럼은 그대로 두되 PARKING·TRANSIT 카드를 5섹션으로 확장 (또는 별도 섹션으로 분리).

```tsx
// 좌측 컬럼 — ADDRESS / CONTACT는 유지, 그 아래 5개 카드 추가
<Reveal delay={0.2} duration="0.7s">
  <div style={{ marginBottom: 36 }}>
    <p className="label">PARKING</p>
    <p className="locText">
      지하 1~3층 주차 가능 (업무동·판매동 모두 가능)<br />
      내원 시 '업무동 저층용' 엘리베이터 탑승
    </p>
  </div>
</Reveal>
<Reveal delay={0.25} duration="0.7s">
  <div style={{ marginBottom: 36 }}>
    <p className="label">SUBWAY</p>
    <p className="locText">
      인천1호선 국제업무지구역 5번 출구 470m<br />
      (G타워 방면)
    </p>
  </div>
</Reveal>
<Reveal delay={0.3} duration="0.7s">
  <div style={{ marginBottom: 36 }}>
    <p className="label">BUS</p>
    <p className="locText">
      정류장 38515 · 경제자유구역청 하차<br />
      간선 82 / 92(급행) / 42(순환) / 43(순환)
    </p>
  </div>
</Reveal>
<Reveal delay={0.35} duration="0.7s">
  <div style={{ marginBottom: 36 }}>
    <p className="label">WALK</p>
    <p className="locText">
      국제업무지구역 1번 출구 도보 10분<br />
      센트럴파크역 3번 출구 도보 10분
    </p>
  </div>
</Reveal>
<Reveal delay={0.4} duration="0.7s">
  <div>
    <p className="label">CAR</p>
    <p className="locText">
      내비게이션: '연수구 센트럴로 263' 검색<br />
      송도 IBS타워 업무동 8층
    </p>
  </div>
</Reveal>
```

- [ ] 9.1.1 ADDRESS 카드 본문 변경 (인천광역시 연수구 센트럴로 263 / IBS타워 업무동 8층 / 송도국제업무단지)
- [ ] 9.1.2 CONTACT 카드 — `SITE.phone` 자동 반영(Phase 1 완료 시)
- [ ] 9.1.3 PARKING·TRANSIT 카드를 5개 카드(PARKING / SUBWAY / BUS / WALK / CAR)로 분리
- [ ] 9.1.4 우측 컬럼(HOURS / MAP) 그대로 유지 (HOURS는 Phase 1.5에서 갱신)
- [ ] 9.1.5 모바일 반응형 검증 — 5섹션이 단일 컬럼으로 stacking 잘 되는지

#### 9.2 `components/MapEmbed.tsx`

- [ ] 9.2.1 `:13` `DEFAULT_QUERY` 변경
  ```ts
  // AS-IS: '힐스테이트 송도 더스카이 아트에이치치과'
  // TO-BE: '송도 IBS타워 아트에이치치과' 또는 '센트럴로 263 아트에이치치과'
  ```
- [ ] 9.2.2 `:14~15` `DEFAULT_LAT`, `DEFAULT_LNG` 갱신 (Q2 답변 반영)

#### 9.3 `components/KakaoMap.tsx`

- [ ] 9.3.1 `:19~21` 좌표 주석 + 값 갱신 (Q2 답변)
  ```ts
  // 송도 IBS타워 좌표 (인천광역시 연수구 센트럴로 263)
  const DEFAULT_LAT = ___;  // Q2 답변
  const DEFAULT_LNG = ___;
  ```

#### 9.4 PageHeader 이미지 — 외관 사진

- [ ] 9.4.1 `app/location/page.tsx:15` PageHeader src `/media/images/exterior/exterior-02.jpg` — 그대로 유지(외관 이미지)
- [ ] 9.4.2 alt 텍스트 갱신: `'송도국제업무단지 건물 외관'` → `'송도 IBS타워 외관'`

---

### Phase 10. 검증 + 빌드 + 배포

- [ ] 10.1 `npm run build` 무에러 확인
- [ ] 10.2 `npm run dev` 후 메인/about/doctor/treatments(신경치료)/facility/location 6개 페이지 시각 검증
  - 데스크톱: hero 텍스트가 첫 영상 종료와 함께 페이드아웃 되는지
  - 모바일: 반응형 깨지지 않는지
- [ ] 10.3 grep 전수 점검:
  ```bash
  grep -rn "381-3877\|인천타워대로 365\|3번 출구\|힐스테이트 송도 더스카이\|미세현미경\|미세 현미경" app components lib
  ```
  결과가 의도한 곳(art-h-dental-v5.jsx 레거시 / EQUIPMENTS 데이터 보존 영역) 이외 0건이어야 함.
- [ ] 10.4 검수 봇 호출 (`Agent` w/ `team-reviewer` 또는 `general-purpose` + `model: opus`) — 변경 파일 + 변경 의도 + plan.md 경로 전달, 보안·a11y·일관성 점검
- [ ] 10.5 검수 결과 0건이 될 때까지 수정 루프
- [ ] 10.6 git commit (제목: `v1.23: 업체 수정 요청 반영 — 주소·전화·의료진·시설·오시는길`)
- [ ] 10.7 main push + Vercel READY 확인 (사용자 명시 명령 후)

---

## 3. 변경 파일 목록 (예상)

| 파일 | 변경 유형 | Phase |
|---|---|---|
| `lib/copy.ts` | 데이터 정정·갱신 | 1, 6, 7 |
| `app/page.tsx` | JSON-LD 정정 | 2 |
| `app/layout.tsx` | metadata 정정 | 2 |
| `app/home/Home.tsx` | 슬로건 + 위치 + hero text visibility | 3, 4 |
| `app/home/Home.module.css` | hero text fade-out 추가 | 4 |
| `components/HeroVideo.tsx` | onIndexChange prop 추가 | 4 |
| `app/about/page.tsx` | IBS 타워 오버레이 + 라벨 정정 | 5 |
| `app/doctor/page.tsx` | 카테고리 그룹핑(Q6=b 시) + 보건복지부 마크 | 6 |
| `app/facility/page.tsx` | 보유 장비 섹션 제거 + metadata | 8 |
| `app/location/page.tsx` | 5섹션 카드 + alt 갱신 | 9 |
| `components/MapEmbed.tsx` | 검색어 + 좌표 갱신 | 9 |
| `components/KakaoMap.tsx` | 좌표 갱신 | 9 |
| `public/media/images/doctor/doctor-choi-profile.jpg` | 사진 교체 | 6 |

신규 파일 가능성: `components/CertBadge.tsx` (Q5=a 시 SVG 컴포넌트, 또는 doctor page 내 inline SVG로도 충분)

---

## 4. 트레이드오프

- **단순 수정 vs 구조 개편**: 시설 페이지에서 EQUIPMENTS 데이터 자체를 비우는 게 더 깔끔하지만, 추후 저선량 CT/GBT 등으로 다시 채울 예정이라 데이터는 보존하고 페이지 렌더만 제거.
- **카테고리 그룹핑 vs 단순 list**: 그룹핑이 가독성 ↑이지만 현재 디자인 컴포넌트 변경 폭 확대. 메모는 단순 갱신만 요구 → 사용자 결정 위임.
- **Hero 텍스트 첫 영상 한정**: 옵션 A(인덱스 기반)는 영상 길이 변경 시 자동 적응. 옵션 B(타이머)는 단순하나 부정확. A 선택.
- **보건복지부 마크**: 자체 SVG는 라이선스 안전, 공식 마크는 권위감 ↑. 의료광고법 56조 가이드라인 영향 → 공식 마크 사용 시 사용자가 라이선스 확인 후 첨부 제공.
- **좌표 정확도**: KakaoMap 좌표가 잘못되면 환자 헤맴. 추정값 사용 시 사용자 검증 필수 → 가능하면 카카오/네이버 지도에서 IBS타워 검색 후 좌표 가져오는 게 안전.

---

## 5. 사용자 확인 요청 사항 (요약)

1. **Q1 진료시간**: 새 진료시간이 있다면 알려주세요.
2. **Q2 IBS타워 좌표**: 정확한 위경도 또는 카카오/네이버 지도 URL.
3. **Q3 네이버플레이스 URL**: 새 URL 있다면.
4. **Q4 슬로건 일관성**: 의료진 카드만 수정 vs 3곳 모두.
5. **Q5 보건복지부 마크**: 자체 SVG vs 공식 마크 PNG (제공 가능 여부).
6. **Q6 의료진 이력 표시**: 단순 list vs 카테고리 그룹핑.
7. **Q7 About 인사말 사진**: 새 프로필로 변경할지.
8. **Q8 신경치료 features**: 4번째 항목 삭제 vs 대체.
9. **Q9 Hero 텍스트 visibility**: 인덱스 기반 vs 타이머.
10. **새 사진 파일**: 첨부 사진을 워크트리로 가져올 방법 (다운로드 위치 또는 base64로 다시 첨부).

→ Q1, Q2, Q3, 새 사진 파일은 사용자 답변 필요 항목.
→ Q4~Q9는 인라인 메모 없으면 위 기본값으로 진행.

---

## 6. 예상 소요

| Phase | 소요 |
|---|---|
| 1. SITE 데이터 정정 | 2분 |
| 2. metadata / JSON-LD | 3분 |
| 3. 홈 슬로건/위치 | 3분 |
| 4. Hero 텍스트 visibility | 8분 |
| 5. IBS 타워 오버레이 | 8분 |
| 6. 의료진 사진/이력/마크 | 15분 (Q6=b 시 +10분) |
| 7. 신경치료 미세현미경 제거 | 2분 |
| 8. 시설 보유 장비 제거 | 4분 |
| 9. 오시는 길 5섹션 재구성 | 12분 |
| 10. 빌드·시각검증·검수·커밋·배포 | 15분 |
| **총** | **~70분** (Q 답변 시간 별도) |

---

## 7. 작업 순서 가이드

1. **사용자 검토** → Q 답변 + 인라인 메모
2. Phase 1 → 2 → 3 (안전한 데이터 정정 우선)
3. Phase 4 → 5 (UX 개선)
4. Phase 6 → 7 → 8 (콘텐츠 갱신)
5. Phase 9 (오시는 길 — 가장 큰 마크업 변경)
6. Phase 10 (검증 + 검수 + 배포)

→ Phase 1~3은 위험 낮음. Phase 4~9는 검수 봇 필수. Phase 10은 사용자 명시 명령 후 push.
