# 플랜 — 모션그래픽 전면 보강 (Motion Overhaul)

> 리서치: [research.motion-overhaul.md](research.motion-overhaul.md) · 작성 2026-06-25
> **승인 전까지 코드 작성 안 함.** 아래에 인라인 메모(가정 수정·제약 추가) 달아주시면 문서만 갱신합니다.

## 🎯 목표 4요소 (작은 계약)

| 요소 | 내용 |
|---|---|
| **목표** | 전체 페이지에 레퍼런스급 **고급·우아** 모션 보강 + **Lottie 포인트 아이콘** + 잘린 제목 **여백 확보** |
| **범위** | `app/**` 전 페이지, `components/**`, `lib/copy.ts`(아이콘 키만), `app/globals.css`(모션 토큰), `public/lottie/*`(신규). 🚫 **손대지 말 것**: 진료/의료진 정보 데이터값·카피 의미·영상 에셋·DB·결제 |
| **종료 조건** | 전 페이지 일관 모션 + `prefers-reduced-motion` 존중 + 제목 안 잘림 + Reveal 점프 버그 해결 + 타입검사·린트 PASS + 검수봇 Critical/High 0 |
| **검증 명령** | 로컬: `npx tsc --noEmit` + `eslint <변경파일>` / 최종: Vercel 빌드 READY |

## 기술 방향 (확정)

- **A. 확장된 CSS + Reveal** 로 90% 처리(번들 0, 8GB 친화) **+ B. 경량 Lottie 플레이어**로 아이콘만. framer-motion은 **보류**(필요 시 별도 승인).
- 모든 신규 모션 = `prefers-reduced-motion: reduce` 시 **정지/즉시표시**. GPU 가속(transform·opacity만, layout 트리거 금지).

## 접근 상세

### 1) 모션 토큰 (globals.css :root 추가)
```css
--m-fast: .5s; --m-base: .8s; --m-slow: 1.1s;
--m-dist: 28px;            /* reveal 기본 이동거리 */
--ease-out: cubic-bezier(.16,1,.3,1);   /* 기존 유지 */
--header-h: 72px; --header-h-scrolled: 60px;  /* 헤더 슬림 */
--anchor-offset: 88px;     /* 제목 scroll-margin-top */
```

### 2) Reveal 업그레이드 (`components/Reveal.tsx`) — 점프 버그 동시 해결
- `variant` prop 추가: `'fade-up' | 'fade' | 'blur-up' | 'scale' | 'mask'` (기본 fade-up).
- **초기 가시성 폴백**: mount 시 `getBoundingClientRect()`로 이미 뷰포트 안이면 즉시 `visible=true` → 점프/앵커/뒤로가기 빈 화면 버그 해결.
- reduced-motion이면 transition 제거하고 즉시 표시.
```tsx
useEffect(() => {
  const el = ref.current; if (!el) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) { setVisible(true); return; }
  const r = el.getBoundingClientRect();
  if (r.top < innerHeight && r.bottom > 0) { setVisible(true); return; } // 이미 보임 → 즉시
  const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting){ setVisible(true); obs.unobserve(el);} }, { threshold });
  obs.observe(el); return () => obs.disconnect();
}, [threshold]);
```

### 3) 잘린 제목 — 여백 확보(+헤더 슬림 병행)
- `Nav.module.css`: `data-show=true`일 때 `.inner { height: var(--header-h-scrolled) }` (72→60) + 배경 `rgba(253,252,250,0.9)`(살짝↓)로 제목이 비쳐 덜 답답.
- 전 섹션 제목(`.sectionTitle`, PageHeader title, 각 페이지 h2)에 `scroll-margin-top: var(--anchor-offset)` → 앵커/점프 시 헤더 밑에 안 깔림.
- 큰 섹션 첫 제목 상단 여백 소폭 ↑(토큰화).
- ⚠️ 자유 휠 스크롤 중 헤더 밑 통과는 고정 헤더 정상 동작 → 위 3개로 **체감 최대 개선**(완전 0 아님, 정직 고지).

### 4) 신규 프리미티브 (작고 재사용)
- `LottieIcon.tsx`: lazy import + IntersectionObserver 시 재생, reduced-motion 시 1프레임 정지. `public/lottie/<slug>.json` 로드.
- `CountUp.tsx`: 홈 `Home.tsx`에서 분리 → 전 페이지 재사용.
- `TextReveal.tsx`: 제목 줄/단어 단위 마스크 업(`overflow:hidden` + translateY 자식 stagger).
- `Parallax.tsx`: scroll offset 헬퍼(기존 홈 패턴 일반화, rAF).

### 5) Lottie 아이콘 세트 (`text-to-lottie` 스킬)
- 브랜드 블루 컬러, 12~14개: 멸균·전문의·진료과목(7)·소통·공간·핀·전화·주차·지하철·시계 등.
- `public/lottie/`에 저장, lazy.

## ✅ 체크리스트 (Phase = 독립 검증 단위)

> ⚙️ **결정(2026-06-25)**: 로띠 플레이어(의존성·wasm) 대신 **인라인 SVG draw-on 아이콘**(`AnimatedIcon`)으로 동일 비주얼 구현 → 번들 0, 8GB 맥 친화. 사용자 "로띠 쓰든 자체로 넣든" 승인 범위 내.

- [x] **P0. 모션 목업 1장**(`show_widget`) 시연 → 방향 확정
- [x] **P1. 모션 토큰** globals.css :root 추가
- [x] **P2. Reveal 업그레이드** (variants + 초기 가시성 폴백=점프버그 fix + reduced-motion) → `tsc` PASS
- [x] **P3. 잘린 제목 fix** (Nav 슬림 72→60 + 반투명 0.9 / scroll-margin-top)
- [x] **P4. AnimatedIcon 컴포넌트** (인라인 SVG draw-on, reduced-motion) — 로띠 대체
- [x] **P5. 아이콘 세트** (shield/users/layers/building/door/clock/badge/leaf/chat/home/pin/phone — AnimatedIcon 레지스트리 내장)
- [x] **P6. 공통 프리미티브** (CountUp 분리·TextReveal) — Parallax는 페이지 적용 시
- [x] **P7. 홈 적용** (STATS 아이콘+카운트업·PROMISE/SYSTEM 아이콘·제목 TextReveal 마스크·카드 호버 글로우) → 검수봇 Critical/High 0
- [x] **P8. PageHeader 모션** (배경 줌인 + 패럴랙스[reduced-motion 가드] + 제목 마스크)
- [x] **P9. about** 적용 (제목 마스크·약속 카드 아이콘+호버·타워 blur-up)
- [x] **P10. doctor** 적용 (제목 마스크·전공/경력 아이콘·사진 blur-up, DoctorPhoto 불변)
- [x] **P11. facility** 적용 (공간 4카드 아이콘+호버·살균/스케일링 아이콘·이미지 blur-up)
- [x] **P12. location** 적용 (INFO 7종 아이콘 inline·지도 blur-up·항목 호버)
- [x] **P13. treatments 목록** 적용 (진료과목 slug별 아이콘·행 호버 동기)
- [x] **P14. treatments/[slug] 상세** 적용 (9섹션 제목 마스크·process/feature/target 아이콘·이미지 blur-up·카드 호버)
- [x] **P15. 공통 컴포넌트** (Footer fade-up+밑줄·FloatingCta 전화 pulse+stagger·BookingLink 호버)
- [x] **P16. reduced-motion·성능 점검** + `tsc` EXIT 0 (eslint 미구성=Next16+flat config 부재)
- [x] **P17. 검수봇 2봇 병렬** (정확성/회귀/a11y + 미감/아이콘/반응형/성능) → award 아이콘 1건·패럴랙스 가드 수정 후 Critical/High 0
- [ ] **P18. 푸시 → Vercel READY 확인** (푸시 신호 대기)

## 수정될 파일 (예상)
- `app/globals.css` (토큰·scroll-margin)
- `components/Reveal.tsx`, `Nav.module.css`/`Nav.tsx`, `PageHeader.tsx`/`.module.css`, `Photo.tsx`/`.module.css`, `Footer.*`, `FloatingCta.*`, `BookingLink.tsx`, `Lightbox.*`, `KakaoMap.tsx`, `HeroVideo.*`
- 신규: `components/LottieIcon.tsx`, `components/CountUp.tsx`, `components/TextReveal.tsx`, `components/Parallax.tsx`, `public/lottie/*.json`
- `app/home/Home.tsx`/`Home.module.css`, `app/about/page.tsx`, `app/doctor/page.tsx`(+DoctorPhoto), `app/facility/page.tsx`, `app/location/page.tsx`, `app/treatments/page.tsx`, `app/treatments/[slug]/page.tsx`
- `lib/copy.ts` (TREATMENTS 등에 `icon` slug 필드 — 값만 추가, 기존 데이터 불변)

## 트레이드오프 / 고려
- **번들**: Lottie 플레이어 1개만 추가(아이콘 lazy). framer-motion 미도입(8GB 맥·가벼움).
- **성능**: transform/opacity만, will-change 최소, rAF 스로틀. 모바일·reduced-motion 정지.
- **점진 배포 가능**: P7(홈)까지만 먼저 푸시 후 반응 보고 나머지 진행 옵션. (범위=전체지만 단계 배포 가능)
- **검수 분리**: 구현 후 별도 Agent 6축 리뷰(작성자 편향 제거).

## 미해결 질문 (메모 환영)
1. 단계 배포? → 홈 먼저 푸시 후 확인 vs 전체 완성 후 한 번에. (기본: **홈 먼저**)
2. Lottie 아이콘 스타일 → 라인(외곽선) vs 솔리드(채움)? (기본: **라인 + 블루**)
3. 헤더 슬림/반투명 변경 OK? (제목 겹침 체감 개선 핵심 — 싫으면 scroll-margin만)
