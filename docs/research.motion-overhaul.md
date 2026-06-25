# 리서치 — 모션그래픽 전면 보강 (Motion Overhaul)

> 작성 2026-06-25. 목표: 레퍼런스(hnleadersdental.com)급 "고급·우아" 모션을 전체 페이지에 보강 + Lottie 아이콘 포인트 + 잘린 제목(고정 헤더 겹침) 해결.
> 사용자 확정 사항(인터뷰): ① 잘린 제목 = **여백 확보** ② 모션 강도 = **고급·우아(레퍼런스급)** ③ Lottie = **네, 아이콘·포인트에** ④ 범위 = **전체 페이지 다**

---

## 1. 현재 모션 인프라 (있는 것)

| 메커니즘 | 위치 | 동작 |
|---|---|---|
| `Reveal` 컴포넌트 | `components/Reveal.tsx` | IntersectionObserver(threshold 0.1) → opacity 0→1 + transform(기본 `translateY(36px)`→none). 전 페이지 스크롤 등장의 뼈대 |
| 패럴랙스 | `app/home/Home.tsx:98,165` | scroll offset → hero/quote 배경 `translateY` |
| 카운트업 | `Home.tsx:41-70` | 화면 진입 시 0→목표값 (easeOutCubic 1.1s). **홈에만** |
| 글로우 드리프트 | `Home.module.css:375-386` | 네이비 SYSTEM 섹션 배경 광원 14s 무한 이동 |
| `data-loaded` 페이드 | `Home.tsx` / `Nav.tsx` | 첫 로드 시 hero 요소 순차 페이드, 헤더 배경 전환 |
| 카드 호버 | 각 `.module.css` | transform translateY + box-shadow (hover 디바이스만) |

## 2. 핵심 제약·사실

- **모션 라이브러리 0개 설치** — `package.json`은 next/react/react-dom만. (framer-motion·lottie·gsap 없음)
- **스타일 방식**: 공통 컴포넌트는 `.module.css`, 페이지(about/doctor/facility/location/treatments)는 **인라인 `<style>`** 사용. Tailwind 아님.
- **8GB 맥 환경** → 번들·메모리 가볍게. 풀빌드는 Vercel 위임, 로컬은 타입검사.
- **접근성**: `prefers-reduced-motion` 일부만 적용 (globals.css 전역 + scrollHint/HeroVideo/FloatingCta). **전면 보강 시 전 모션에 일관 적용 필요.**
- **브랜드 토큰**: 네이비 `#1A2647`, 블루 액센트 `#2E6FD4`/`#6BAEE8`, warm `#F5F2ED`, ease `cubic-bezier(0.16,1,0.3,1)`. 세리프 제목 `Nanum Myeongjo`.

## 3. "잘린 제목" 원인 (확정)

- `components/Nav.module.css`: `.nav { position: fixed; top:0 }`, 높이 72px. 스크롤 시 `data-show=true` → 배경 `rgba(253,252,250,0.96)` **불투명 흰색** + blur.
- 큰 세리프 섹션 제목이 스크롤 중 이 고정 헤더 밑을 지날 때 윗부분이 가려짐 → "잘린" 것처럼 보임. **레이아웃 깨짐 아님.**
- 모든 섹션(stats/promise/treatments/doctor/system 등) 동일 원인 1개.
- ⚠️ **caveat**: `scroll-margin-top`은 **앵커/프로그램 점프**에만 효과. 자유 휠 스크롤 중 헤더 밑 통과는 고정 헤더의 정상 동작이라 완전 제거 불가 → 여백 확보 + 헤더 살짝 슬림/반투명 보강을 **병행**해야 체감 개선.

## 4. 부가 발견 (별도 버그)

- **Reveal 점프 시 미동작**: `End`/`scrollTo`/앵커/뒤로가기 복원처럼 **순간 점프**하면 IntersectionObserver가 안 켜져 콘텐츠가 opacity:0(빈 화면)로 남음. 휠 스크롤은 정상. → 초기 가시성 폴백 필요(이미 보이면 즉시 visible 처리).

## 5. Lottie 적용 후보 (포인트 아이콘)

| 페이지 | 자리 | 아이콘 |
|---|---|---|
| 홈 STATS | 숫자 4개 옆 | 멸균·전문의·진료과목·건물 |
| 홈/about PROMISE | 카드 번호 옆 | 협진·자연치아·소통·공간 |
| 홈 SYSTEM | 01~04 옆 | 멸균·수술실·원데이·보증 |
| treatments | 진료과목 행/카드 | 임플란트·신경·발치·턱관절·진정·잇몸·미백 |
| location | INFO 라벨 앞 | 핀·전화·주차·지하철·버스·시계 |
| facility | 장비 헤드라인 | 살균·스케일링 장비 |

- 출처: `text-to-lottie` 스킬(설치됨) 또는 직접 JSON 작성. 브랜드 블루로 컬러. 작게·lazy·reduced-motion 시 정지 프레임.

## 6. 데이터 구조 (lib/copy.ts) — 모션 주입 지점

- `SITE`, `NAV_ITEMS`, `TREATMENTS[8]`(en/ko/slug/processes/features/faqs/...), `DOCTORS[2]`(careerGroups), `SYSTEM_ITEMS[4]`, `PROMISE_ITEMS[4]`, `FACILITY_ROOMS[4]`. 아이콘 키 필드 추가 여지 있음(예: TREATMENTS에 `icon` slug).

## 7. 미디어 에셋

- `public/media/video`: hero-1~5(+720+webm), facility-lounge, gbt-intro, implant-sic 등 ~18개.
- `public/media/images`: doctor/treatment-room/surgery/waiting/exterior/sedation/xray/implant/equipment 등 ~40개.
- Lottie JSON 둘 자리: `public/lottie/<name>.json` (신규).

## 8. 기술 선택지 (plan에서 결정)

| 옵션 | 장점 | 단점 | 권고 |
|---|---|---|---|
| **A. CSS + Reveal 확장만** | 번들 0, 8GB 친화, 일관성 | 스크롤 연동·스프링 한계 | ✅ 90% 이걸로 |
| **B. + Lottie 플레이어** | 벡터 아이콘 모션(사용자 요청) | 의존성 1개(~경량 lottie-web) | ✅ 아이콘 한정 |
| **C. + motion(framer)** | whileInView·스프링·제스처 | 번들 ~37kb, 메모리 | ⏸ 보류(필요 시만) |

→ 결론: **A(확장된 Reveal/CSS) + B(Lottie 아이콘)** 조합이 "고급·우아 + 가벼움"에 최적. C는 명시 요청 시.
