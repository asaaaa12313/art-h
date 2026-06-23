# Plan — Hero 영상 순서 변경 + GBT 장비 홍보

> 작성일: 2026-06-23 / 브랜치: worktree-gbt-hero-video
> 연관: `docs/research.gbt-hero-video.md`
> ✅ **2026-06-23 구현 완료** — Phase 0~4 끝(tsc exit 0 + 검수봇 Critical/High 0). 2.mp4는 실사 부담으로 제외, 1.mp4(95초)+원장님 시술사진+장비사진 사용. Phase 5(푸시)는 사용자 명시 신호 대기.

---

## 0. 사용자 검토 메모란 (여기에 인라인 메모)

> 이 plan을 에디터로 열어 각 Phase·Open Question 옆에 메모(`<!-- 메모: ... -->`)를 달거나 직접 수정해 주세요. 그 다음 **"메모 반영해"** 또는 **"구현 시작"** 주시면 진행합니다.

### Open Questions — 결정 후 확정 (현재는 추천값으로 진행 예정)
- [ ] **Q1. 첫 영상**: 원장님 웃는 얼굴(hero-5)을 맨 앞에 두되, 인사 문구가 얼굴과 겹쳐 가독성이 떨어지면 → (a) 그대로 두기 / (b) 첫 영상만 hero-3(상담, 인물이 우측이라 좌측 텍스트 공간 넉넉)으로 교체. **추천: 일단 (a)로 구현 후 프레임 확인, 겹치면 (b)로.**
- [ ] **Q2. GBT 영상 편집 구간**: `1.mp4`는 인트로~바이오필름 설명(약 0~55초), `2.mp4`는 장비 작동 깔끔한 구간만. **정확한 구간은 구현 중 프레임 확인하며 확정.** 특정 구간 지정 원하시면 메모.
- [ ] **Q3. GBT 영상 재생 방식**: 진료과목 상세 안에서 (a) muted 자동재생 루프(배경 느낌) / (b) 포스터+클릭 재생. **추천: (b) 클릭 재생** (설명 영상은 소리/자막이 중요, 자동재생은 산만).
- [ ] **Q4. 시술 이미지**: 워터마크 없는 자체 자료로 hero-4(원장님 GBT 시술) 프레임을 쓸지. **추천: 사용** (실제 우리 원장님이라 신뢰도 ↑).

---

## 1. 목표 4요소

| 요소 | 내용 |
|---|---|
| **목표** | ① Hero에서 원장님 모습을 먼저 노출 ② 잇몸·스케일링 진료과목 + 시설에 GBT(시리지 않은 스케일링) 시각 홍보 추가 |
| **범위** | `app/home/Home.tsx`, `app/treatments/[slug]/page.tsx`, `app/facility/page.tsx`, `lib/copy.ts`(보강), `public/media/`(영상·이미지 신규). **그 외 페이지·컴포넌트 손대지 않음** |
| **종료 조건** | ① 첫 Hero 영상 = 원장님 ② Periodontics 상세에 GBT 영상+장비사진 섹션 노출 ③ 시설에 GBT 장비 블록 ④ `tsc --noEmit` + 변경파일 lint 통과 ⑤ 검수봇 Critical/High 0 |
| **검증 명령** | `npx tsc --noEmit` + `npx eslint <변경파일>` + 프레임 스크린샷 확인 (로컬 풀빌드는 최종 Vercel 위임) |

---

## 2. Phase별 체크리스트

### Phase 0 — 자료 준비 (영상 편집 · 이미지 배치)
- [ ] 0-1. `public/media/images/equipment/`에 GBT 장비사진 배치: GBT_3.jpg → `gbt-airflow.jpg` (필요 시 리사이즈/최적화)
- [ ] 0-2. (Q4 승인 시) hero-4에서 원장님 GBT 시술 프레임 추출 → `gbt-clinic.jpg`
- [ ] 0-3. `1.mp4` 편집: 인트로~바이오필름 구간 컷 → `public/media/video/gbt-intro.mp4` (+720p, H.264, web 최적화). ffmpeg 또는 video-use 스킬
- [ ] 0-4. `2.mp4` 편집: 장비 작동 깔끔 구간만(수위 조절) → `public/media/video/gbt-clinical.mp4` (+720p)
- [ ] 0-5. 영상 포스터(첫 프레임) 추출: `gbt-intro-poster.jpg` 등
- [ ] 0-6. 용량 점검 — 편집 후 각 영상이 hero 영상 수준(수 MB)인지 확인

### Phase 1 — 작업① Hero 영상 순서
- [ ] 1-1. `app/home/Home.tsx:39-45` `videos` 배열을 `hero-5 → hero-3 → hero-4 → hero-1 → hero-2` 순서로 재배치 (각 객체 내용은 그대로, **순서만**)
- [ ] 1-2. 빌드 후 첫 프레임(hero-5) + 인사 문구 겹침 확인. 겹치면 Q1-(b)로 조정
- [ ] 1-3. `tsc --noEmit` 통과

```tsx
// app/home/Home.tsx — videos 배열 (순서만 재배치)
videos={[
  { mp4: '/media/video/hero-5.mp4', mp4Mobile: '/media/video/hero-5-720.mp4' },   // 원장님 웃는 얼굴
  { mp4: '/media/video/hero-3.mp4', mp4Mobile: '/media/video/hero-3-720.mp4' },   // 원장님 상담
  { mp4: '/media/video/hero-4.mp4', mp4Mobile: '/media/video/hero-4-720.mp4' },   // 원장님 시술
  { mp4: '/media/video/hero-1.mp4', webm: '/media/video/hero-1.webm', mp4Mobile: '/media/video/hero-1-720.mp4' }, // 체어 (webm 유지)
  { mp4: '/media/video/hero-2.mp4', mp4Mobile: '/media/video/hero-2-720.mp4' },   // 복도
]}
```

### Phase 2 — 작업②-A 진료과목 GBT 시각 섹션 (Periodontics 한정)
- [ ] 2-1. `lib/copy.ts` Treatment 타입에 미디어 필드 추가 (예: `gbtMedia?: { video?: string; poster?: string; deviceImg?: string; clinicImg?: string; ... }`) — 또는 page에서 `slug==='periodontics'` 분기
- [ ] 2-2. Periodontics 항목에 미디어 경로 데이터 입력
- [ ] 2-3. `app/treatments/[slug]/page.tsx`에 GBT 시각 섹션 추가 — 기존 `txDevices`/`txTargets`와 동일 톤(네이비·골드·warm). 장비사진 + 영상(포스터+클릭재생) + 짧은 캡션
- [ ] 2-4. 섹션 CSS는 기존 `<style>` 블록에 `.txGbt*` 추가 (인라인 패턴 일관)
- [ ] 2-5. 반응형(모바일 1열) + `prefers-reduced-motion` 대응
- [ ] 2-6. `tsc --noEmit` + lint

### Phase 3 — 작업②-B 시설 GBT 장비 블록
- [ ] 3-1. `app/facility/page.tsx` 노바케어 섹션 아래에 GBT 장비 블록 추가 (`.novaSec` 패턴 복제 → `.gbtSec`)
- [ ] 3-2. 좌측 장비사진(`gbt-airflow.jpg`) + 우측 텍스트("시리지 않은 스케일링", AIRFLOW, 핵심 2줄) + 칩(파우더 세정 / 초슬림팁 / 임플란트 관리 / 착색 제거)
- [ ] 3-3. 장비사진이 가로형이라 비율 조정(노바케어는 세로형) — `aspect-ratio` 별도 지정
- [ ] 3-4. 반응형 + `tsc --noEmit` + lint

### Phase 4 — 검수 + 빌드 검증
- [ ] 4-1. 변경 파일 전체 `tsc --noEmit` 통과
- [ ] 4-2. 변경 파일 `eslint` 통과
- [ ] 4-3. 검수봇(Agent) 호출 — 디자인 6축(미감·안티슬롭·접근성·반응형·성능·완전성) + 영상 경로 무결성. Critical/High 0까지 루프
- [ ] 4-4. 변경 영상/이미지 경로가 실제 파일과 일치하는지 확인 (404 방지)

### Phase 5 — 푸시 (사용자 명시 후에만)
- [ ] 5-1. 워크트리 → main 반영 (cherry-pick 또는 머지)
- [ ] 5-2. `git fetch origin main` + ff/rebase
- [ ] 5-3. 명시 파일만 `git add` → 커밋 → push (사용자 "푸시/배포" 신호 + 검수 PASS 후)
- [ ] 5-4. Vercel READY 폴링 (70초 → 30초 간격)

---

## 3. 트레이드오프 / 고려사항
- **영상 용량**: 원본 1.mp4(94MB)/2.mp4(59MB)는 웹에 직접 못 씀 → 반드시 편집+압축. hero 영상(수 MB) 기준 맞추기.
- **첫 영상 텍스트 겹침**: 인물 얼굴 위 텍스트는 흔하지만 좌-좌 겹침 가능 → 구현 후 실측.
- **저작권**: GBT_1/2(워터마크) 제외. GBT_3(EMS 제품컷)·자체 프레임만 사용.
- **수위**: 2.mp4 실사 케이스는 일반 환자에게 부담 → 깔끔한 구간만, 애매하면 영상 제외하고 이미지만.
- **데이터 vs JSX**: 영상/이미지는 copy.ts 데이터 필드로 분리하면 재사용·관리 용이 (기존 패턴과 일관).
