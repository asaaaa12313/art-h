# 실사 미디어 통합 기획 (v1.4 → v1.5)

## Context

v1.4로 슬로건/진료과목 조정 완료. 이제 개원 촬영본(실제 사진/영상)을 사이트에 통합하여 CSS 그라디언트 플레이스홀더를 실사로 교체한다.

**촬영본 경로:** `/Users/kimminwoo/Library/CloudStorage/GoogleDrive-.../드림)아트에이치치과/`
- 사진보정(최종본): 외부 13장 + 내부 9개 카테고리 94장
- 영상: 가로 58개, 세로 66개 (1920×1080, MP4, 29MB~192MB)

---

## 1. 촬영본 인벤토리 & 품질 검토 결과

### 영상 (후보 검토 완료)
| 파일 | 길이 | 크기 | 내용 | 활용 후보 |
|------|------|------|------|-----------|
| C2304.MP4 | 9.0s | 64M | 건물 외관 유리파사드 + 아트H치과 간판 | 히어로 A |
| C2305.MP4 | 17.0s | 128M | 건물 외관 (와이드, 더 긴 컷) | 히어로 A-long |
| C2309.MP4 | 23.0s | 192M | 실제 진료 시술 클로즈업 | 진료과목 섹션 |
| C2310.MP4 | 19.5s | 192M | 원장님 웃는 모습 클로즈업 | 의료진 섹션 |
| DJI_...0110 | 6.9s | 29M | 고급 인테리어 복도 (간접조명) | 히어로 B / 시설 |
| DJI_...0116 | 7.2s | 30M | 리셉션 데스크 (Art H Dental Clinic 로고 선명) | 히어로 C |

### 사진 (카테고리별 샘플 검토 완료)
| 카테고리 | 장수 | 품질 | 대표 컷 (샘플 확인 완료) |
|---------|------|------|-----------------------|
| 외부 | 13장 | 우수 | 송도 고층빌딩 외관 (파란 하늘, 깨끗) |
| 대기실 | 18장 | 우수 | AH 로고 간판 포함 다양한 컷 |
| 진료실 1~4 | 16장 | 우수 | 창문 뷰 + OSSTEM 체어, 모던하고 청결 |
| 수술실 1~2 | 4장 | 양호 | 블루 포인트 벽 + 수술용 체어 |
| 원장님 | 47장 | 우수 | 자연스러운 진료 장면 (X-ray 보는 컷) |
| 상담실 | 6장 | 우수 | 심플한 밝은 공간 |
| 의료기기 | 6장 | 우수 | GBT 에어플로우 장비 클로즈업 |
| 엑스레이 | 6장 | 우수 | Vatech 파노라마 엑스레이 |
| 파우더룸 | 3장 | 우수 | 대리석 세면대 (고급감) |
| 회복실 | 3장 | 양호 | 심플 베드형 공간 |

**특이사항:** 개원(4/23) 임박 촬영으로 일부 인테리어 미완성 - 사진 선별 시 완성도 높은 컷만 사용.

---

## 2. 히어로 영상 선택 (사용자 결정 필요)

### 옵션 A: 외관 건물 + 간판 (C2305 또는 C2304)
- **장점**: 송도 랜드마크 빌딩 + 아트H치과 간판 → 병원 정체성 즉각 전달
- **단점**: 실내 공간감 안 보임, 야외라 계절/날씨 고정
- **가공**: 17초 → 8초 트리밍, 1920×1080 유지

### 옵션 B: 고급 인테리어 복도 (DJI_0110)
- **장점**: 따뜻한 간접조명 + 고급감, 공간 깊이감 표현, 이미 짧음(6.9s)
- **단점**: 아트H 브랜드 요소 직접 보이지 않음
- **가공**: 트리밍 불필요, 그대로 사용

### 옵션 C: 리셉션 데스크 (DJI_0116)
- **장점**: Art H Dental Clinic 로고 선명 + 모던한 리셉션 뷰
- **단점**: 약간 어두운 톤
- **가공**: 트리밍 불필요 (7.2s)

### 옵션 D: 혼합 (2개 영상 크로스페이드)
- **장점**: 서사 있는 소개 (외관 → 실내)
- **단점**: 편집 시간 소요, 용량 증가

**추천: 옵션 A (C2305 트리밍)** — 슬로건 '진료 너머, 사람의 고귀함을 생각합니다'는 추상적이므로 구체적인 병원 정체성(건물+간판)으로 앵커 제공.

---

## 3. 미디어 매핑 제안 (섹션별)

| 위치 | 현재 | 변경 |
|------|------|------|
| **히어로 배경** | V.hero (다크 네이비 gradient) | **[영상]** 히어로 선택 영상 + poster 프레임 |
| 홈 스토리 섹션 | V.clinic (대기실 이미지) | **[사진]** 대기실/AH 로고 컷 |
| 홈 진료카드 3종 | V.implant / V.gen / V.equip | **[사진]** 의료기기 / 진료실 / 엑스레이 |
| 홈 의료진 | V.doc | **[사진]** 원장님 진료 장면 (X-ray 보는 컷) |
| 홈 시설 3컷 | V.wait / V.surg / V.consult | **[사진]** 대기실 / 수술실 / 상담실 |
| about 페이지 헤더 | V.clinic | **[사진]** 대기실 와이드 |
| about 풀블리드 | V.wait | **[사진]** 외부 빌딩 외관 |
| doctor 페이지 | V.doc | **[사진]** 원장님 정면 포트레이트 |
| treatments 페이지 헤더 | V.chair | **[사진]** 진료실 대표 |
| treatments 각 항목 | V.* | **[사진]** (아래 테이블 참조) |
| facility 페이지 공간 | V.wait/clinic/surg/consult | **[사진]** 대기실/진료실/수술실/상담실 |
| facility 장비 | V.equip/scan/clinic/gen | **[사진]** 의료기기/엑스레이/진료실/현미경 |
| location 페이지 | V.city | **[사진]** 외부 건물 |

### 진료과목 7종 이미지 매핑
| 진료 | 현재 | 변경 |
|------|------|------|
| 임플란트 | V.implant | 수술실 (시술 임팩트) |
| 신경치료 | V.gen | 진료실 + 현미경 |
| 사랑니 발치 | V.equip | 엑스레이 장비 (3D CT 연상) |
| 턱관절치료 | V.scan | 엑스레이 또는 진료실 |
| 의식하진정 | V.surg | 수술실 (독립 수술실) |
| 잇몸·스케일링 | V.white | 의료기기 (에어플로우 GBT) |
| 치아미백 | V.consult | 상담실 또는 진료실 |

---

## 4. 기술 파이프라인

### 4.1 영상 트랜스코딩 (FFmpeg)

**목표:** 히어로용 1개 영상 → MP4(H.264) + WebM(VP9) 2종 생성, 각 3-8MB

```bash
# 1) MP4 (H.264) - 웹 표준 호환
ffmpeg -i 원본.MP4 \
  -ss 00:00:02 -t 8 \  # 2초~10초 구간 (트리밍)
  -vf "scale=1920:1080,fps=30" \
  -c:v libx264 -crf 23 -preset slow \
  -pix_fmt yuv420p \
  -movflags +faststart \
  -an \                  # 오디오 제거 (자동재생용)
  public/media/video/hero.mp4

# 2) WebM (VP9) - 더 작은 용량 (모던 브라우저)
ffmpeg -i 원본.MP4 \
  -ss 00:00:02 -t 8 \
  -vf "scale=1920:1080,fps=30" \
  -c:v libvpx-vp9 -crf 35 -b:v 0 \
  -an \
  public/media/video/hero.webm

# 3) 모바일용 720p (옵션)
ffmpeg -i 원본.MP4 \
  -ss 00:00:02 -t 8 \
  -vf "scale=1280:720,fps=30" \
  -c:v libx264 -crf 25 -preset slow \
  -pix_fmt yuv420p -movflags +faststart -an \
  public/media/video/hero-720.mp4

# 4) 포스터 프레임 (영상 로딩 전 표시)
ffmpeg -i 원본.MP4 -ss 00:00:04 -vframes 1 -q:v 2 \
  public/media/video/hero-poster.jpg
# → WebP로 한번 더 변환 (용량 절감)
```

**예상 결과 크기:** MP4 ~4MB, WebM ~2.5MB, Poster ~150KB

### 4.2 사진 최적화 (sharp / ImageMagick)

**목표:** 각 사진을 웹용 2사이즈 + WebP 포맷으로 생성

```bash
# sharp-cli 사용 (npm i -g sharp-cli) 또는 macOS sips
# - 데스크톱: 1920px 최대폭, JPEG Q80 + WebP Q80
# - 모바일:   768px 최대폭, JPEG Q80 + WebP Q80

# 예시 (sips)
sips -Z 1920 원본.jpg --out public/media/images/waiting/waiting-01.jpg
sips -Z 768 원본.jpg --out public/media/images/waiting/waiting-01-mobile.jpg

# WebP 변환 (cwebp)
cwebp -q 80 public/media/images/waiting/waiting-01.jpg \
  -o public/media/images/waiting/waiting-01.webp
```

**파일명 규칙:** `{카테고리}-{번호}.{확장자}` (영문 snake)
- 예: `waiting-01.jpg`, `doctor-01.jpg`, `treatment-room-01.jpg`

**예상 결과 크기:** 사진당 평균 200-400KB (JPEG), 100-200KB (WebP)

---

## 5. 디렉토리 구조

```
public/
  media/
    video/
      hero.mp4           (~4MB)
      hero.webm          (~2.5MB)
      hero-720.mp4       (~2MB, 모바일 폴백)
      hero-poster.jpg    (~150KB)
      hero-poster.webp   (~80KB)
    images/
      hero/              (히어로 보조용, 없어도 됨)
      exterior/          외부 건물
        exterior-01.jpg/.webp (+ mobile)
      waiting/           대기실
        waiting-01.jpg ...
      treatment-room/    진료실
      surgery/           수술실
      consult/           상담실
      xray/              엑스레이
      equipment/         의료기기
      powder/            파우더룸
      recovery/          회복실
      doctor/            원장님
        doctor-01.jpg (정면)
        doctor-02.jpg (진료 장면)
```

각 폴더에 **1~3장 선별** (과다 적재 지양).

---

## 6. 컴포넌트 변경

### 6.1 `components/Photo.tsx` 확장
현재는 CSS gradient만 지원. 실사 이미지를 받을 수 있도록 확장.

```tsx
// AS-IS
<Photo bg={V.clinic} alt="..." />  // CSS gradient

// TO-BE (오버로드)
<Photo src="/media/images/waiting/waiting-01.jpg" alt="..." />         // 실사
<Photo src="/media/images/waiting/waiting-01.jpg" fallback={V.clinic} alt="..." />  // 실사 + gradient 폴백
<Photo bg={V.clinic} alt="..." />  // 기존 gradient (여전히 작동)
```

**구현 포인트:**
- `next/image` 사용하여 자동 최적화 (WebP/AVIF 자동 서빙, 반응형 srcset)
- `priority` prop으로 above-the-fold 이미지 최적화
- fill 레이아웃으로 기존 CSS 구조 유지
- `sizes` prop으로 반응형 크기 지정

### 6.2 `components/HeroVideo.tsx` 신규
히어로 섹션 전용 비디오 배경 컴포넌트.

```tsx
<HeroVideo
  srcMp4="/media/video/hero.mp4"
  srcWebm="/media/video/hero.webm"
  poster="/media/video/hero-poster.jpg"
  mobileSrc="/media/video/hero-720.mp4"
/>
```

**구현 포인트:**
- `<video autoPlay muted loop playsInline>` 필수 (모바일 자동재생 조건)
- `poster` 속성으로 로딩 전 이미지 표시
- `preload="metadata"` (초기 로드 부담 감소)
- `<source>` 여러 개로 브라우저별 최적 포맷 선택
- `prefers-reduced-motion` 감지: 모션 민감 사용자는 poster만 표시
- 모바일(<768px)은 720p 버전 로드 (네트워크 절약)

### 6.3 `app/home/Home.tsx` 수정
```tsx
// 기존 히어로 배경 Photo → HeroVideo로 교체
<HeroVideo ... />
// 기존 자리 Photo bg={V.hero} 제거
```

### 6.4 `lib/visuals.ts` 유지
그라디언트 변수는 **폴백/개발용으로 유지** (이미지 로드 실패 시 대체).

---

## 7. 구현 단계 (Phase 별)

### Phase 1: 미디어 가공 (수동 스크립트)
- [ ] `scripts/process-media.sh` 작성
- [ ] 선택된 히어로 영상 트랜스코딩 (MP4/WebM/720p/poster)
- [ ] 각 카테고리별 사진 1-3장 선별 후 리사이즈 + WebP 변환
- [ ] `public/media/` 아래 배치

### Phase 2: 컴포넌트 확장
- [ ] `next.config.js`에 images.domains 설정 (없으면 추가)
- [ ] `Photo.tsx` `src` prop 추가 (next/image 통합)
- [ ] `HeroVideo.tsx` 신규 생성
- [ ] `Photo.module.css` 이미지 전용 스타일 추가

### Phase 3: 각 페이지 적용
- [ ] `app/home/Home.tsx`: 히어로 영상 적용, 스토리/진료/의료진/시설 실사 교체
- [ ] `app/about/page.tsx`: 헤더 + 풀블리드 실사
- [ ] `app/doctor/page.tsx`: 원장님 포트레이트
- [ ] `app/treatments/page.tsx`: 헤더 + 진료과목 7종 이미지
- [ ] `app/facility/page.tsx`: 공간 4종 + 장비 4종
- [ ] `app/location/page.tsx`: 건물 외관

### Phase 4: 최적화 & 검증
- [ ] Lighthouse 점수 확인 (LCP, CLS)
- [ ] `npm run build` 에러 0 확인
- [ ] 데스크톱/모바일 시각 검증 (Claude Preview)
- [ ] 네트워크 탭에서 파일 크기 확인 (히어로 영상 < 5MB)

### Phase 5: 배포
- [ ] 커밋 + main 푸시
- [ ] Vercel 프로덕션 배포 및 READY 확인

---

## 8. 고려 사항

### 8.1 용량 관리
- Git LFS 설정 검토 (영상/대용량 이미지)
- 현재 저장소 크기 < 10MB이므로 당분간 Git 직접 커밋 가능
- 사진 전부를 올리지 말고 **선별 소수**만 올림 (폴더당 1-3장)

### 8.2 Vercel 빌드 타임아웃
- Vercel 무료 티어 빌드 100MB 제한
- `public/media/` 총량 < 50MB 유지 목표

### 8.3 접근성
- 모든 이미지 `alt` 필수
- 비디오는 `aria-label` + decorative 처리
- `prefers-reduced-motion` 대응

### 8.4 SEO
- `<link rel="preload">` 히어로 포스터 이미지
- 각 페이지 OG 이미지를 실사로 교체

### 8.5 개원 준비 중 인테리어 미완성
- 특이사항.txt: "4월23일 개원이라 현장이 많이 어수선하고 인테리어 등 100%완성이 안됬었습니다"
- 선별 시 미완성 가구/자재/어수선함 배제

---

## 9. 미결 사항 (사용자 결정 필요)

| 항목 | 옵션 | 추천 |
|------|------|------|
| 히어로 영상 | A 외관빌딩 / B 복도 / C 리셉션 / D 혼합 | **A (외관 C2305 트리밍)** |
| 원장님 대표 컷 | 정면 포트레이트 / 진료 장면 / 웃는 모습 | **진료 장면** (이미 보신 DSC09011) |
| 사진 선별 방식 | Claude 자동 선별 / 사용자 제시 후 결정 | **Claude 선별 후 피드백** |
| Git LFS | 도입 / 미도입 | **미도입** (현재 용량 관리 가능) |

---

## 체크리스트 (실행 시)

- [ ] Phase 1: 미디어 가공
  - [ ] 히어로 영상 선택 확정
  - [ ] FFmpeg 트랜스코딩 스크립트 실행
  - [ ] 사진 카테고리별 선별 (1-3장씩)
  - [ ] sips/cwebp로 리사이즈 + WebP 변환
- [ ] Phase 2: 컴포넌트 확장
  - [ ] Photo.tsx 확장
  - [ ] HeroVideo.tsx 신규
- [ ] Phase 3: 페이지 적용 (6개 페이지)
- [ ] Phase 4: 검증
  - [ ] npm run build
  - [ ] Lighthouse LCP < 2.5s
  - [ ] 데스크톱/모바일 스크린샷 확인
- [ ] Phase 5: 배포
  - [ ] git commit + push main
  - [ ] Vercel READY 확인

---

## 예상 소요 시간

| Phase | 소요 |
|-------|------|
| 1. 미디어 가공 | 15-20분 (FFmpeg + 사진 리사이즈) |
| 2. 컴포넌트 | 10분 |
| 3. 페이지 적용 | 20분 (6개 페이지) |
| 4. 검증 | 5분 |
| 5. 배포 | 3분 |
| **총** | **~50-60분** |
