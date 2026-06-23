# Plan — 장비·콘텐츠 보강 (임플란트 2종 · 의식하진정 · 노바케어 · GBT · 의료진 영상)

> 작성일: 2026-06-23 / 작성: Claude (UltraPlan)
> 연관: `docs/research.gbt-hero-video.md`(직전 GBT 작업), `lib/copy.ts`(데이터), `app/treatments/[slug]/page.tsx`(상세), `app/facility/page.tsx`(시설), `app/doctor/page.tsx`(의료진)
> 상태: ✅ **2026-06-23 구현 완료** — Phase 0~6 끝(tsc exit 0 + 검수봇 Critical/High 0, 미결 Q1~Q5 추천값 적용). Phase 7(푸시)은 사용자 명시 신호 대기.

---

## 0. 사용자 검토 메모란 (여기에 인라인 메모)

> 이 plan을 에디터로 열어 각 항목·미결질문 옆에 메모(`<!-- 메모: ... -->`)를 달거나 직접 수정해 주세요.
> 그 다음 **"메모 반영해"** 또는 **"구현 시작"** 주시면 진행합니다. (승인 전엔 코드를 작성하지 않습니다.)

---

## 1. 목표 4요소

| 요소 | 내용 |
|---|---|
| **목표** | 받은 자료로 ① 임플란트(SIC+오스템KS 2종 시각화) ② 의식하진정(안전장비 BM1·Agilia SP 섹션 신규) ③ 노바케어(시설 섹션 보강) ④ GBT(영상 보강) ⑤ 의료진 페이지에 최종원 원장 유튜브 영상 추가 |
| **범위** | `lib/copy.ts`, `app/treatments/[slug]/page.tsx`, `app/facility/page.tsx`, `app/doctor/page.tsx`, `public/media/`(영상·이미지 신규). **그 외 페이지·컴포넌트(home·about·location·Nav 등)는 손대지 않음** |
| **종료 조건** | ① 임플란트 상세에 2-브랜드 시각 섹션 ② 의식하진정 상세에 안전장비 섹션 ③ 시설 노바케어 보강(균 비교 이미지) ④ GBT 영상 교체/보강 ⑤ 의료진 맨 아래 유튜브 섹션 ⑥ `tsc --noEmit` + 변경파일 lint 통과 ⑦ 검수봇 Critical/High 0 |
| **검증 명령** | `npx tsc --noEmit` + `npx eslint <변경파일>` + 영상/이미지 경로 404 점검 (로컬 풀빌드는 Vercel 위임) |

---

## 2. 자료 인벤토리 — 받은 것 → 어디에 쓰나

| 파트 | 받은 자료 | 가공 | 최종 배치 |
|---|---|---|---|
| **임플란트 KS** | `KS 동영상.mp4`(32초, **세로** 1080×1920), `TSvsKS.png`(벽두께+44%·체결깊이+50% 비교) | 비교이미지 최적화 / 세로영상 편집 | 임플란트 상세 — 오스템KS 브랜드 카드 |
| **임플란트 SIC** | `SIC_1_.mp4`(110초, 720p), `SIC 임플란트 포스터(A2).pdf`(66MB) | 영상 핵심구간 컷 / 포스터 대표컷 추출 | 임플란트 상세 — SIC 브랜드 카드 |
| **의식하진정** | `BM1카탈로그.pdf`(환자감시 SpO2·혈압·체온·EtCO2), `Agilia SP카탈로그.pdf`(시린지펌프 0.1~1200mL/h) | 스펙 텍스트 정리 / 제품컷 추출 | 의식하진정 상세 — 안전장비 2종 섹션 |
| **노바케어** | `노바케어전면컷.jpg`, `다이아프램.jpg`(노바케어>NaOCl>알코올 살균범위), `브로슈어.pdf` | 균 비교 이미지 최적화 | 시설 노바케어 섹션 보강 |
| **GBT** | `Airflowing.mp4`(22초·가로·깔끔), `PIEZON slow motion.mp4`(69초), `에어플로우 MAX.mp4`(59초) | 핵심구간 컷·압축 | 진료(잇몸) GBT media 영상 교체 |
| **의료진** | YouTube `cYeo29ukYKA` (구강악안면외과 전문의 = 최종원 원장) | iframe 임베드 | 의료진 페이지 맨 아래 |

> **PDF 직접 임베드 안 함**: 카탈로그·포스터 PDF는 웹에 무겁고 부적합 → 핵심 스펙/이미지만 뽑아 우리 톤으로 재구성.

---

## 3. 데이터·컴포넌트 설계

진료과목 상세(`[slug]/page.tsx`)는 **데이터 주도** — `lib/copy.ts`의 Treatment에 필드가 있으면 해당 섹션이 자동 렌더. 기존 패턴(`tech`/`devices`/`media`/`beforeAfter`/`targets`)을 최대한 재사용.

### 3-1. 임플란트 — 2-브랜드 시각 섹션 (신규 패턴)

현재 임플란트엔 `tech`(SIC 3대 기술력 글)만 있음. **브랜드 2종 시각 카드**를 새로 추가.

```ts
// lib/copy.ts — Treatment 타입에 추가
type TxBrand = {
  name: string;        // 'SIC' | 'OSSTEM KS'
  origin: string;      // '스위스 설계 · 독일 제조' / '국산 · 오스템'
  tagline: string;     // 한 줄 강점
  points: string[];    // 강점 2~3개 (KS는 TSvsKS 수치)
  video?: string;      // 편집 영상
  poster?: string;
  image?: string;      // TSvsKS 비교이미지 등
};
type TxBrandsBlock = { label: string; title: string; desc: string; brands: TxBrand[] };
// Treatment에 brandsBlock?: TxBrandsBlock 추가

// Implant 항목에 데이터 입력 (예시)
brandsBlock: {
  label: 'PREMIUM IMPLANT SYSTEM',
  title: '검증된 정품 임플란트 2종 운용',
  desc: '환자의 골 상태·치료 목적에 맞춰 스위스 SIC와 국산 오스템 KS를 선택 적용합니다.',
  brands: [
    { name: 'SIC', origin: '스위스 설계 · 독일 제조',
      tagline: '두꺼운 벽두께로 안정적인 장기 사용',
      points: ['찢어짐 최소화 두께', '쉽게 풀리지 않는 잠금', '순수 티타늄 감염 저감'],
      video: '/media/video/implant-sic.mp4', poster: '/media/video/implant-sic-poster.jpg' },
    { name: 'OSSTEM KS', origin: '오스템 · 국산',
      tagline: '벽두께 +44%, 체결깊이 +50%로 더 강해진 KS',
      points: ['임플란트 벽두께 +44%', '체결 깊이 +50%', 'M2.0→M1.6 직경 축소'],
      image: '/media/images/implant/ts-vs-ks.jpg' },
  ],
}
```

- page.tsx에 `{tx.brandsBlock && (<section className="txBrands">...)}` 추가. 카드 2개 그리드(좌 SIC / 우 KS), 각 카드에 영상 또는 비교이미지 + 강점 리스트.
- 기존 `tech`(SIC 3대 기술력)는 유지 → 브랜드 카드 아래 SIC 상세로 자연스럽게 연결.

### 3-2. 의식하진정 — 안전장비 섹션 (기존 `devices` 패턴 재사용)

미백의 `devices`(기기 3종)와 동일 구조. Sedation 항목에 `devicesTitle` + `devices` 추가.

```ts
// Sedation 항목에 추가
devicesTitle: {
  label: 'SAFETY MONITORING SYSTEM',
  title: '실시간 감시로 안전을 지키는 진정 장비',
  desc: '진정 치료 중 환자의 활력징후를 실시간으로 감시하고, 진정제를 정밀하게 조절합니다.',
},
devices: [
  { name: 'BM1 환자감시장치', role: '실시간 활력징후 감시',
    d: '산소포화도·혈압·맥박·체온·호기말이산화탄소(EtCO2)를 실시간 모니터링해 진정 깊이를 안전하게 관리합니다.' },
  { name: 'Agilia SP 시린지펌프', role: '진정제 정밀 주입',
    d: '0.1~1200mL/h 범위로 진정제를 정밀하게 주입하고, 압력을 감시해 안정적인 진정 상태를 유지합니다.' },
],
```

- 추가 코드 0 — page.tsx의 `txDevices` 섹션이 이미 있어 데이터만 넣으면 렌더.
- (선택) 장비 제품컷 이미지 → `media`로 보조 추가 가능. 미결 Q2 참조.

### 3-3. 노바케어 — 시설 섹션 보강 (`facility/page.tsx` 직접)

현재 `.novaSec`(HOCL 살균수 + 균 칩 7개)에 **살균범위 비교 이미지** 추가.

- `다이아프램.jpg` → `/media/images/equipment/novacare-range.jpg`로 배치.
- 기존 균 칩 리스트 아래 또는 옆에 "노바케어 > NaOCl > 알코올" 비교 이미지 1장 삽입(설명 캡션).
- 레이아웃: 현재 2-column(장비사진 | 텍스트) → 텍스트 하단에 비교이미지 추가하거나, 균 칩을 이미지로 대체. **미결 Q3**.

### 3-4. GBT — 영상 교체 (`lib/copy.ts` Periodontics.media)

- 현재 `media.video: '/media/video/gbt-intro.mp4'` 유지하되, 새 자료 `Airflowing.mp4`(22초·가로·깔끔)가 더 좋으면 교체.
- 또는 시설 GBT 섹션(`gbtSec`)에 짧은 영상 추가.
- **미결 Q4** — 교체 vs 추가.

### 3-5. 의료진 영상 — 유튜브 임베드 (`doctor/page.tsx`)

- DOCTORS 맵 렌더가 끝난 `</section>` **다음**에 새 섹션 추가.
- 반응형 16:9 iframe(`youtube.com/embed/cYeo29ukYKA`), lazy-load, 제목·캡션("구강악안면외과 전문의 최종원 원장").
- 개인정보·성능: `loading="lazy"`, `youtube-nocookie.com` 도메인 사용 권장.

---

## 4. Phase별 체크리스트

### Phase 0 — 자료 가공 (영상 편집 · 이미지 배치)
- [ ] 0-1. `public/media/images/implant/` 생성 → `TSvsKS.png` 최적화 후 `ts-vs-ks.jpg`
- [ ] 0-2. `SIC_1_.mp4`(110초) 핵심 구간 ~20-30초 컷 → `public/media/video/implant-sic.mp4`(720p, H.264, web 최적화) + 포스터
- [ ] 0-3. `KS 동영상.mp4`(세로 32초) 처리 방침 확정 후 가공(미결 Q1) → `implant-ks.mp4` 또는 프레임 캡처
- [ ] 0-4. `다이아프램.jpg` 최적화 → `public/media/images/equipment/novacare-range.jpg`
- [ ] 0-5. (GBT 교체 시) `Airflowing.mp4`(22초) 압축 → `gbt-intro.mp4` 교체 또는 신규 (미결 Q4)
- [ ] 0-6. 의식하진정 장비 제품컷 필요 시 PDF에서 추출 (미결 Q2)
- [ ] 0-7. 용량 점검 — 각 영상 hero 수준(수 MB)인지 확인

### Phase 1 — 데이터: 임플란트 2-브랜드
- [ ] 1-1. `lib/copy.ts`에 `TxBrand`/`TxBrandsBlock` 타입 + `Treatment.brandsBlock?` 추가
- [ ] 1-2. Implant 항목에 `brandsBlock` 데이터 입력 (SIC + 오스템KS)
- [ ] 1-3. `app/treatments/[slug]/page.tsx`에 `.txBrands` 섹션 + CSS 추가 (기존 네이비·골드·warm 톤)
- [ ] 1-4. 반응형(모바일 1열) + `prefers-reduced-motion`
- [ ] 1-5. `tsc --noEmit` + lint

### Phase 2 — 데이터: 의식하진정 안전장비
- [ ] 2-1. `lib/copy.ts` Sedation 항목에 `devicesTitle` + `devices`(BM1·Agilia SP) 입력
- [ ] 2-2. (선택) 장비 이미지 `media` 추가
- [ ] 2-3. 렌더 확인 — 기존 `txDevices` 섹션 재사용이라 page.tsx 수정 거의 없음
- [ ] 2-4. `tsc --noEmit` + lint

### Phase 3 — 시설 노바케어 보강
- [ ] 3-1. `app/facility/page.tsx` `.novaSec`에 살균범위 비교 이미지 삽입 + 캡션
- [ ] 3-2. 레이아웃 방침 반영(미결 Q3) + 반응형
- [ ] 3-3. `tsc --noEmit` + lint

### Phase 4 — GBT 영상 보강
- [ ] 4-1. 방침 확정(교체/추가) 후 `lib/copy.ts` Periodontics.media 또는 `facility` gbtSec 반영
- [ ] 4-2. 경로 404 점검

### Phase 5 — 의료진 유튜브 섹션
- [ ] 5-1. `app/doctor/page.tsx` 맨 아래 유튜브 임베드 섹션 추가 (반응형 16:9, lazy)
- [ ] 5-2. 제목·캡션 + 접근성(title 속성, focus) + `prefers-reduced-motion` 무관
- [ ] 5-3. `tsc --noEmit` + lint

### Phase 6 — 검수 + 빌드 검증
- [ ] 6-1. 변경 파일 전체 `tsc --noEmit` 통과
- [ ] 6-2. 변경 파일 `eslint` 통과
- [ ] 6-3. 검수봇(Agent) — 디자인 6축(미감·안티슬롭·접근성·반응형·성능·완전성) + 영상/이미지 경로 무결성. Critical/High 0까지 루프
- [ ] 6-4. 모든 미디어 경로가 실제 파일과 일치(404 방지)

### Phase 7 — 푸시 (사용자 명시 후에만)
- [ ] 7-1. `git fetch origin main` + ff/rebase
- [ ] 7-2. 명시 파일만 `git add` → 커밋 → push (사용자 "푸시/배포" 신호 + 검수 PASS 후)
- [ ] 7-3. Vercel READY 폴링 (70초 → 30초 간격)

---

## 5. 트레이드오프 / 고려사항

- **영상 용량**: 원본 합계 350MB+ → 반드시 편집·압축. hero 영상(수 MB) 기준. 큰 원본(PIEZON 100MB·MAX 124MB)은 핵심 구간만.
- **KS 영상이 세로(1080×1920)**: 진료과목 영상 슬롯은 16:9 가로 → 세로영상은 양옆 여백 발생. **비교이미지(TSvsKS)가 정보 전달 더 좋음** → KS는 이미지 메인 권장(미결 Q1).
- **SIC 영상 110초**: 길어서 핵심만 컷. 제품 광고 톤이면 수위 조절.
- **저작권**: 제조사 제공 제품영상/이미지는 사용 OK. 워터마크·타 병원 로고 있으면 제외.
- **두 브랜드 노출 균형**: 환자에게 "정품 2종 선택 적용" = 신뢰 ↑. 특정 브랜드 과대광고 톤 지양.
- **데이터 vs JSX**: 진료과목은 copy.ts 데이터로(재사용), 시설·의료진은 JSX 직접(1회성 레이아웃).

---

## 6. 미결 질문 (구현 전 확정 — 현재 추천값으로 진행 예정)

- [ ] **Q1. 오스템 KS 영상**: 세로 영상이라 진료 페이지에 어색. (a) TSvsKS 비교이미지만 사용 / (b) 비교이미지 + 세로영상 보조 / (c) 영상을 가로로 편집. **추천: (a)** 비교이미지가 강점 수치를 명확히 전달.
- [ ] **Q2. 의식하진정 장비 이미지**: 제품 카탈로그에서 BM1·Agilia SP 제품컷을 뽑아 넣을지. **추천: 넣기** (글만보다 장비 사진이 신뢰 ↑). 단 카탈로그 이미지 화질·배경 확인 후.
- [ ] **Q3. 노바케어 레이아웃**: 균 비교 이미지를 (a) 기존 균 칩 아래 추가 / (b) 균 칩을 이미지로 대체. **추천: (a)** 칩 유지 + 이미지 보강.
- [ ] **Q4. GBT 영상**: 기존 `gbt-intro.mp4`를 (a) 유지 / (b) `Airflowing.mp4`로 교체 / (c) 시설에 영상 추가. **추천: (b)** Airflowing이 짧고 깔끔.
- [ ] **Q5. SIC 포스터(A2 66MB)**: 대형 인쇄용 → 웹엔 일부만. 대표 컷 1장 추출해 SIC 카드 보조로 쓸지. **추천: 영상 우선, 포스터는 생략 가능.**
