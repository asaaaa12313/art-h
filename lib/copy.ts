import { V } from './visuals';

/** 콘텐츠 기준 최종 갱신일 — sitemap lastModified·JSON-LD lastReviewed 공용.
 *  빌드 시각(new Date())을 쓰면 매 배포마다 전 페이지 수정일이 바뀌어 신선도 신호가 왜곡된다. */
export const CONTENT_UPDATED = '2026-08-28';

export const SITE = {
  name: '아트에이치치과',
  nameEn: 'Art H Dental',
  slogan: '진료 너머, 사람의 고귀함을 생각합니다',
  phone: '032-831-3877',
  address: '인천광역시 연수구 센트럴로 263 IBS타워 업무동 8층',
  addressShort: '송도 IBS타워 · 국제업무지구역 5번 출구 470m',
  transit: '인천1호선 국제업무지구역 5번 출구에서 470m (G타워 방면)',
  naverPlace: 'https://naver.me/GWW5jD4j',
  hours: [
    { day: '월·목 (야간진료)', time: '09:30 — 20:30', highlight: true },
    { day: '화·수·금', time: '09:30 — 18:30', highlight: false },
    { day: '토', time: '09:30 — 14:00', highlight: false },
    { day: '점심', time: '14:00 — 15:00', highlight: false },
    { day: '일요일', time: '정기휴무', highlight: false },
  ],
};

// 헤더 개편 v1.47 (하늘리더스 방식): 병원소개는 드롭다운 하나, 진료 7과목은 탑레벨 펼침
export const NAV_ABOUT_ITEMS = [
  { href: '/about', label: '의원소개' },
  { href: '/doctor', label: '의료진' },
  { href: '/facility', label: '시설' },
  { href: '/location', label: '오시는길' },
] as const;

export const NAV_TREATMENT_ITEMS = [
  { href: '/treatments/implant', label: '임플란트' },
  { href: '/treatments/oral-surgery', label: '사랑니 발치' },
  { href: '/treatments/root-canal', label: '신경치료' },
  { href: '/treatments/tmj', label: '턱관절' },
  { href: '/treatments/sedation', label: '의식하진정' },
  { href: '/treatments/periodontics', label: '잇몸 · 스케일링' },
  { href: '/treatments/whitening', label: '치아미백' },
] as const;

type TxFaq = { q: string; a: string };
type TxSectionTitle = { label: string; title: string; desc: string };
type TxTech = { no: string; t: string; metric?: string; d: string; target: string };
type TxDevice = { name: string; role: string; d: string };
type TxMediaImage = { src: string; alt: string; caption?: string };
type TxMedia = {
  label: string;
  title: string;
  desc: string;
  video?: string;
  videoMobile?: string; // 모바일(≤768px)용 720p 파생본
  poster?: string;
  images?: TxMediaImage[];
};
type TxBeforeAfter = {
  label: string;
  title: string;
  before: string;
  after: string;
  caption: string;
  d: string;
};
type TxShowcaseItem = {
  name: string;
  tag: string;
  desc: string;
  points?: string[];
  video?: string;
  poster?: string;
  image?: string;
  imageFit?: 'cover' | 'contain';
};
type TxShowcase = {
  label: string;
  title: string;
  desc: string;
  items: TxShowcaseItem[];
};
import type { TxDiagramName } from '@/components/TxDiagram';

type TxFigure = { diagram: TxDiagramName; t: string; d: string };
type TxKindItem = { name: string; tag: string; d: string; diagram?: TxDiagramName; image?: string };
type TxKinds = { label: string; title: string; desc: string; items: TxKindItem[] };
type TxInsurance = {
  label: string;
  title: string;
  desc: string;
  rows: { k: string; v: string }[];
  notes: string[];
};
type TxAftercare = { label: string; title: string; items: string[] };
/** 생성형 검색·AI 답변이 그대로 인용할 수 있는 정의형 사실 요약 (GEO) */
type TxQuickFact = { k: string; v: string };
type TxSpecialist = {
  /** DOCTORS 배열 인덱스 — 자격·사진·문구는 의료진 데이터를 그대로 재사용 */
  doctorIndex: number;
  label: string;
  title: string;
  desc: string;
};
type TxGalleryItem = { src: string; alt: string; caption: string };

export type Treatment = {
  en: string;
  ko: string;
  slug: string;
  bg: string;
  /** 진료과목 카드·목록·상세헤더 공통 대표 이미지 (v1.56 단일화) */
  card: string;
  d: string;
  summary: string;
  intro: string;
  processes: string[];
  features: string[];
  faqs: TxFaq[];
  // 브로셔 확장 블록 (해당 과목만 — 있으면 상세에서 렌더)
  techTitle?: TxSectionTitle;
  tech?: TxTech[];
  beforeAfter?: TxBeforeAfter;
  devicesTitle?: TxSectionTitle;
  devices?: TxDevice[];
  targetsTitle?: TxSectionTitle;
  targets?: string[];
  media?: TxMedia;
  showcase?: TxShowcase;
  // 진료 개편 v1.46 (하늘리더스 참고 — 모식도 기반 확장 블록)
  stepFigures?: TxFigure[];
  kinds?: TxKinds;
  insurance?: TxInsurance;
  aftercare?: TxAftercare;
  quickFacts?: TxQuickFact[];
  specialist?: TxSpecialist;
  /** 이 페이지 내용을 검수한 의료진 (DOCTORS 인덱스). 확인된 과목에만 표기한다. */
  reviewedBy?: number;
  gallery?: TxGalleryItem[];
};

export const TREATMENTS: Treatment[] = [
  {
    en: 'Implant', ko: '임플란트', slug: 'implant', bg: V.implant,
    card: '/media/images/implant/implant-surgery-01.jpg',
    d: '디지털 가이드를 활용한 정밀 식립. 뼈이식·상악동거상 등 고난도 케이스도 안전하게.',
    summary: '상실된 자연치아의 자리를, 가장 가깝게 회복합니다.',
    intro: '임플란트는 상실된 자연치아를 대체하는 대표적인 방법입니다. 아트에이치치과는 구강악안면외과 전문의가 직접 계획하고 수술합니다. 3D CT로 골량과 신경 위치를 정밀하게 파악하고, 디지털 가이드를 제작해 예측 가능한 식립을 지향합니다.',
    reviewedBy: 0,
    quickFacts: [
      { k: '담당', v: '구강악안면외과 전문의 (최종원 대표원장)' },
      { k: '치료 기간', v: '골유착 기간 2~4개월을 포함해 진행' },
      { k: '건강보험', v: '만 65세 이상 1인 평생 2개까지 본인부담 30%' },
      { k: '진정 병행', v: '치과 공포가 있는 경우 의식하진정 병행 가능' },
    ],
    processes: [
      '3D CT · 파노라마 촬영, 구강 스캔',
      '1:1 상담과 치료 계획 수립',
      '디지털 가이드 제작 (필요 시)',
      '임플란트 식립 수술',
      '골유착 기간 (2–4개월)',
      '맞춤 보철물 제작 및 장착',
      '정기 검진 및 유지 관리',
    ],
    features: [
      '구강악안면외과 전문의가 수술 집도',
      '독립 수술실에서 무균 환경 유지',
      '뼈이식 · 상악동 거상 등 고난도 케이스 대응',
      '치과 공포가 있는 분은 의식하진정(수면마취) 병행 가능',
    ],
    faqs: [
      { q: '임플란트 수술 시간은 얼마나 걸리나요?', a: '일반적으로 1개당 약 30분~1시간입니다. 뼈이식이 필요하거나 여러 개를 식립하는 경우 더 오래 걸릴 수 있습니다.' },
      { q: '수술 당일에 바로 씹을 수 있나요?', a: '식립 직후에는 임플란트가 뼈에 고정될 시간이 필요하므로, 일반적으로 2–4개월 뒤에 최종 보철물을 장착합니다. 케이스에 따라 즉시 보철이 가능한 경우도 있습니다.' },
      { q: '임플란트는 평생 유지되나요?', a: '정기 검진과 구강 위생 관리를 꾸준히 한다면 오래 사용할 수 있습니다. 잇몸 염증(임플란트 주위염) 예방이 가장 중요합니다.' },
      { q: '임플란트 수술은 많이 아픈가요?', a: '마취 후 진행되므로 수술 중 통증은 거의 없습니다. 치과 공포가 큰 분은 의식하진정(수면마취)을 병행해 편안하게 받으실 수 있습니다.' },
      { q: '나이가 많아도 수술할 수 있나요?', a: '연령보다 전신 상태와 골량이 중요합니다. 고혈압·당뇨 등 기저질환이 있어도 조절이 잘 되면 대부분 치료할 수 있으며, 전문의가 3D CT 진단 후 정확히 안내해 드립니다.' },
    ],
    showcase: {
      label: 'PREMIUM IMPLANT SYSTEM',
      title: '검증된 정품 임플란트 2종 운용',
      desc: '환자분의 골 상태와 치료 목적에 맞춰 스위스 SIC와 국산 오스템 KS를 선택 적용합니다. 두 시스템 모두 정품만을 사용합니다.',
      items: [
        {
          name: 'SIC',
          tag: '스위스 설계 · 독일 제조',
          desc: '치과 임플란트의 본산지 스위스의 기술력으로 독일에서 제조된 프리미엄 임플란트입니다. 두꺼운 벽 두께로 장기간 안정적인 사용을 추구합니다.',
          points: ['두꺼운 벽 두께로 찢어짐 최소화', '쉽게 풀리지 않는 잠금 설계', '순수 티타늄으로 감염 위험 저감'],
          video: '/media/video/implant-sic.mp4',
          poster: '/media/video/implant-sic-poster.jpg',
        },
        {
          name: '오스템 KS',
          tag: '국산 · OSSTEM',
          desc: '국내 점유율 1위 오스템의 KS 시스템입니다. 벽 두께와 체결 깊이를 키워 더 단단한 고정력을 구현했습니다.',
          points: ['임플란트 벽 두께 +44%', '나사 체결 깊이 +50%', '직경 축소(M2.0→M1.6)로 강한 결합'],
          image: '/media/images/implant/ts-vs-ks.jpg',
          imageFit: 'contain',
        },
      ],
    },
    techTitle: {
      label: 'SWISS PREMIUM IMPLANT',
      title: '정품 스위스 SIC 임플란트',
      desc: '치과 임플란트의 본산지인 스위스의 기술력으로, 독일에서 제조된 SIC 임플란트를 사용합니다. 장기간 안정적인 임플란트 사용을 추구합니다.',
    },
    tech: [
      {
        no: '01',
        t: '정말 두꺼운 벽 두께',
        d: '탁월하게 두꺼운 SIC 임플란트 두께로, 임플란트가 찢어지는 현상을 극소화합니다.',
        target: '임플란트 찢어짐으로 재수술하신 분께',
      },
      {
        no: '02',
        t: '쉽게 풀리지 않는 잠금 기술',
        metric: '안정적인 어버트먼트 스크류 체결 설계',
        d: '스크류가 쉽게 풀리지 않도록 설계되어, 편안한 사후 관리를 돕습니다.',
        target: '잦은 스크류 풀림으로 고생하신 분께',
      },
      {
        no: '03',
        t: '감염 위험을 낮춘 설계',
        metric: '순수 티타늄 + SICmatrix',
        d: '고혈압·당뇨·천식·신부전 등 기저질환, 심장질환·골다공증 등 전신질환, 암 진단·치료 중인 분께도 적용할 수 있습니다.',
        target: '임플란트 감염으로 재수술하신 분께',
      },
    ],
    beforeAfter: {
      label: 'ADVANCED IMPLANTOLOGY',
      title: '고난이도 임플란트 · 상악동 거상술',
      before: '/media/images/xray/sinus-diagram.png',
      after: '/media/images/xray/sinus-after.jpg',
      caption: '상악동 거상술 원리 모식도 (왼쪽) · 실제 시술 후 X-RAY (오른쪽)',
      d: '① 잔존골이 부족한 상태에서 ② 상악동막을 들어올려 골이식을 하고 ③ 충분한 골량을 확보한 뒤 임플란트를 식립합니다. 아트에이치치과는 어려운 환경의 치조골에서도 구강악안면외과 전문의의 전문성을 통한 안전한 임플란트 식립을 진행합니다.',
    },
    kinds: {
      label: 'IMPLANT TYPES',
      title: '임플란트, 케이스에 따라 다르게 접근합니다',
      desc: '골량·상실 범위·전신 상태에 따라 치료 방법이 달라집니다. 3D CT 진단 후 환자분께 맞는 방식을 제안합니다.',
      items: [
        {
          name: '디지털 가이드 임플란트',
          tag: '3D 계획 · 정밀 식립',
          d: '3D CT와 구강 스캔으로 설계한 수술 가이드를 사용해, 계획한 위치와 각도 그대로 식립합니다. 절개를 최소화해 회복이 빠릅니다.',
          diagram: 'imp-guide',
        },
        {
          name: '뼈이식 임플란트',
          tag: '골량 부족 케이스',
          d: '잇몸뼈가 부족한 부위에 골이식재로 뼈 볼륨을 먼저 회복한 뒤 식립합니다. 오래 방치된 상실 부위도 치료할 수 있습니다.',
          diagram: 'imp-graft',
        },
        {
          name: '전체 임플란트',
          tag: '다수 치아 상실',
          d: '여러 개의 치아를 상실한 경우, 소수의 임플란트로 전체 치열을 회복하는 설계까지 상실 범위에 맞게 제안합니다.',
          diagram: 'imp-full',
        },
        {
          name: '보험 임플란트',
          tag: '만 65세 이상 건강보험',
          d: '만 65세 이상이라면 건강보험 적용으로 1인 평생 2개까지 본인부담 30%에 임플란트 치료가 가능합니다.',
          diagram: 'imp-senior',
        },
      ],
    },
    stepFigures: [
      { diagram: 'imp-step-1', t: '치아 상실', d: '상실 부위를 방치하면 주변 치아가 기울고 잇몸뼈가 흡수됩니다.' },
      { diagram: 'imp-step-2', t: '정밀 진단 · 계획', d: '3D CT로 골량과 신경 위치를 분석해 식립 위치를 설계합니다.' },
      { diagram: 'imp-step-3', t: '임플란트 식립', d: '계획된 위치·깊이·각도로 인공치근을 식립합니다.' },
      { diagram: 'imp-step-4', t: '골유착 기간', d: '2–4개월간 임플란트와 잇몸뼈가 단단히 결합합니다.' },
      { diagram: 'imp-step-5', t: '지대주 연결', d: '보철물을 연결하는 기둥(지대주)을 체결합니다.' },
      { diagram: 'imp-step-6', t: '크라운 장착', d: '맞춤 제작한 크라운을 장착해 치료를 마무리합니다.' },
    ],
    insurance: {
      label: 'NATIONAL HEALTH INSURANCE',
      title: '만 65세 이상, 보험 임플란트 안내',
      desc: '2018년 7월부터 만 65세 이상 어르신의 임플란트 건강보험 본인부담률이 30%로 낮아졌습니다. 대상 여부와 비용은 상담 시 정확히 안내해 드립니다.',
      rows: [
        { k: '적용 대상', v: '만 65세 이상 건강보험 가입자 또는 피부양자 (치아가 일부 남아 있는 경우)' },
        { k: '적용 개수', v: '1인 평생 2개' },
        { k: '적용 부위', v: '앞니 · 어금니 구분 없이 모든 부위 적용 가능' },
        { k: '본인 부담', v: '요양급여비용 총액의 30%' },
      ],
      notes: [
        '치아가 전혀 없는 완전 무치악은 보험 적용 대상에서 제외됩니다.',
        '차상위 계층 · 희귀난치성 질환자 등은 본인부담률이 달라질 수 있으니 상담 시 확인해 드립니다.',
      ],
    },
    aftercare: {
      label: 'AFTER SURGERY',
      title: '임플란트 수술 후 주의사항',
      items: [
        '수술 부위에 물린 거즈는 약 2시간 동안 지그시 물고 계세요. 이후에도 출혈이 계속되면 새 거즈를 1시간 더 물어주세요.',
        '입안에 고이는 침과 피는 뱉지 말고 삼키는 것이 지혈에 도움이 됩니다. 수술 당일에는 입안을 세게 헹구지 마세요.',
        '통증과 붓기는 당일 저녁에 가장 심할 수 있습니다. 냉찜질이 도움이 되며, 처방된 약은 안내대로 꼭 복용하세요.',
        '빨대 사용, 침 뱉기, 코를 세게 푸는 행동은 지혈을 방해하므로 2~3일간 피해주세요.',
        '음주는 최소 1주, 흡연은 2~3개월 삼가세요. 음주와 흡연은 임플란트 조기 실패의 주요 원인입니다.',
        '실밥은 보통 1~2주 후 제거합니다. 그 전까지 수술 부위를 손이나 혀로 만지지 마세요.',
      ],
    },
    media: {
      label: 'DIGITAL DIAGNOSIS',
      title: '영상으로 보는 정밀 진단',
      desc: '임플란트의 시작은 정확한 진단입니다. 파노라마 · 3D CT 촬영으로 골량과 신경 위치를 확인하고, 판독 영상을 함께 보며 식립 계획을 세우는 과정을 담았습니다.',
      video: '/media/video/implant-diag.mp4',
      videoMobile: '/media/video/implant-diag-720.mp4',
      poster: '/media/video/implant-diag-poster.jpg',
      images: [
        { src: '/media/images/xray/xray-reading.jpg', alt: '파노라마 영상을 판독하는 의료진', caption: '촬영 직후 판독 영상을 함께 보며 치료 계획을 설명해 드립니다' },
      ],
    },
    gallery: [
      { src: '/media/images/implant/implant-surgery-01.jpg', alt: '독립 수술실에서 진행되는 임플란트 수술', caption: '구강악안면외과 전문의가 직접 집도하는 수술' },
      { src: '/media/images/implant/implant-kit.jpg', alt: '정품 임플란트 키트 트레이', caption: '정품 임플란트 키트와 멸균 수술 기구' },
      { src: '/media/images/implant/implant-ct-check.jpg', alt: '태블릿과 3D CT 영상으로 식립 계획을 확인하는 의료진', caption: '3D CT 영상으로 식립 계획을 확인합니다' },
    ],
  },
  {
    en: 'Root Canal', ko: '신경치료', slug: 'root-canal', bg: V.gen,
    card: '/media/images/equipment/equipment-02.jpg',
    d: '근관을 정밀하게 처치하여 자연치아를 최대한 보존합니다.',
    summary: '살릴 수 있는 치아는 끝까지 살립니다.',
    intro: '신경치료는 충치가 깊어 치수(신경)까지 감염된 경우, 감염된 조직을 제거하고 근관을 소독·밀폐하여 자연치아를 보존하는 치료입니다. 아트에이치치과는 치과보존과 전문의가 직접 진료하며, X-Smart Pro+ 엔도 모터와 ProTaper Next 파일로 근관 하나하나를 정밀하게 처치합니다.',
    reviewedBy: 1,
    quickFacts: [
      { k: '담당', v: '치과보존과 전문의 (강지수 원장)' },
      { k: '내원 횟수', v: '일반적으로 2~4회 (근관 복잡도에 따라 변동)' },
      { k: '사용 장비', v: 'X-Smart Pro+ 엔도 모터 · ProTaper Next 니켈-티타늄 파일' },
      { k: '치료 마무리', v: '신경을 제거한 치아는 크라운으로 보호하는 것이 원칙' },
    ],
    processes: [
      '증상 문진과 치근단 방사선 검사',
      '마취 후 감염된 치수 제거',
      '근관장(뿌리 길이) 측정',
      '니켈-티타늄 파일로 근관 성형',
      '근관 세척 · 소독',
      '근관 충전 (Gutta-percha)',
      '코어 및 크라운 보철',
    ],
    features: [
      '치과보존과 전문의 직접 진료',
      'X-Smart Pro+ · ProTaper Next 엔도 시스템 사용',
      '자연치아 최대 보존 원칙',
      '재신경치료 케이스도 적극 대응',
    ],
    faqs: [
      { q: '신경치료는 몇 번 내원해야 하나요?', a: '일반적으로 2~4회 내원으로 마무리됩니다. 치아 상태와 근관의 복잡도에 따라 달라질 수 있습니다.' },
      { q: '치료 중 통증이 있나요?', a: '마취 하에 치료하므로 대부분 통증이 없습니다. 치료 후 일시적인 저작통이 있을 수 있지만 점차 사라집니다.' },
      { q: '신경치료 후 꼭 크라운을 씌워야 하나요?', a: '신경을 제거한 치아는 부서지기 쉬워 크라운으로 보호하는 것이 원칙입니다. 그래야 치아 수명이 오래 유지됩니다.' },
      { q: '신경치료한 치아가 또 아플 수 있나요?', a: '근관이 복잡하거나 재감염된 경우 통증이 재발할 수 있습니다. 많은 경우 재신경치료로 해결할 수 있으며, 아트에이치치과는 재신경치료 케이스도 적극 대응합니다.' },
      { q: '신경치료에 어떤 기구를 사용하나요?', a: '아트에이치치과는 덴츠플라이시로나의 X-Smart Pro+ 엔도 모터와 ProTaper Next 니켈-티타늄 파일을 사용합니다. 모터에 근관장 측정기가 내장되어 있어 치료 중 뿌리 길이를 확인하며 진행하고, 유연한 파일로 굽은 근관도 해부학적 형태를 따라 성형합니다.' },
      { q: '송도에서 치과보존과 전문의에게 신경치료를 받을 수 있나요?', a: '아트에이치치과(인천 연수구 센트럴로 263 IBS타워 업무동 8층, 국제업무지구역 5번 출구)에는 보건복지부 인증 치과보존과 전문의가 상주하며 신경치료를 직접 담당합니다. 예약은 032-831-3877로 문의해 주세요.' },
    ],
    stepFigures: [
      { diagram: 'rct-3', t: '감염 확인', d: '증상과 방사선 검사로 신경(치수)까지 감염이 진행됐는지 확인합니다.' },
      { diagram: 'endo-1', t: '근관장 측정', d: '뿌리 끝까지의 길이를 측정해 파일이 그 지점을 넘지 않도록 기준을 잡습니다.' },
      { diagram: 'endo-2', t: '근관 성형', d: '유연한 니켈-티타늄 파일이 굽은 근관의 원래 형태를 따라 안쪽을 넓힙니다.' },
      { diagram: 'endo-3', t: '세척 · 충전', d: '소독한 근관을 거타퍼차로 빈틈없이 채우고, 입구를 덮어 재감염을 막습니다.' },
      { diagram: 'rct-4', t: '크라운 보호', d: '신경을 제거한 치아는 부서지기 쉬워 크라운으로 덮어 오래 사용합니다.' },
    ],
    specialist: {
      doctorIndex: 1,
      label: 'ENDODONTIC SPECIALIST',
      title: '치과보존과 전문의가 직접 진료합니다',
      desc: '신경치료는 눈에 보이지 않는 근관을 다루는 진료입니다. 아트에이치치과는 보건복지부 인증 치과보존과 전문의가 진단부터 근관 충전, 최종 보철까지 직접 담당합니다. 재신경치료처럼 까다로운 케이스도 같은 전문의가 이어서 봅니다.',
    },
    techTitle: {
      label: 'ENDODONTIC SYSTEM',
      title: '아트에이치가 사용하는 엔도 시스템',
      desc: '신경치료의 성패는 굽고 좁은 근관을 얼마나 원래 형태 그대로, 끝까지 처치하느냐에 달려 있습니다. 아트에이치치과는 근관장 측정기를 내장한 엔도 모터와 유연한 니켈-티타늄 파일을 사용합니다.',
    },
    tech: [
      {
        no: '01',
        t: '뿌리 길이를 확인하며 치료합니다',
        metric: '근관장 측정기 내장 · Auto-Reverse',
        d: 'X-Smart Pro+는 치료 중 파일 끝의 위치를 실시간으로 확인합니다. 설정한 길이에 도달하면 파일이 자동으로 되돌아가 뿌리 끝을 넘지 않도록 돕습니다.',
        target: '신경치료 후 통증이 남았던 경험이 있는 분께',
      },
      {
        no: '02',
        t: '굽은 근관을 따라가는 유연한 파일',
        metric: 'M-Wire® 니켈-티타늄 열처리 소재',
        d: 'ProTaper Next는 열처리한 니켈-티타늄 소재로 유연합니다. 근관 벽에 두 지점만 닿는 비대칭 회전 방식이라 굽은 근관의 원래 형태를 따라 성형합니다.',
        target: '뿌리가 휘어 치료가 어렵다고 들으신 분께',
      },
      {
        no: '03',
        t: '적은 파일 수, 짧아진 의자 시간',
        metric: '대부분 X1 · X2 두 개로 성형',
        d: '기존 시스템이 네 개의 파일을 쓰던 근관도 대부분 두 개로 성형합니다. 기구를 바꿔 끼우는 횟수가 줄어 한 번에 앉아 계시는 시간이 짧아집니다.',
        target: '치과 의자에 오래 앉아 있기 힘드신 분께',
      },
    ],
    devicesTitle: {
      label: 'ENDO EQUIPMENT',
      title: '신경치료에 사용하는 장비',
      desc: '아트에이치치과는 덴츠플라이시로나(Dentsply Sirona)의 엔도 시스템을 사용합니다. 아래는 실제 진료에 쓰이는 장비의 사양입니다.',
    },
    devices: [
      {
        name: 'X-Smart Pro+',
        role: '근관 성형 엔도 모터',
        d: '토크 0.2–7.5 N·cm, 회전 속도 100–3,000 rpm 범위에서 근관 상태에 맞춰 조절합니다. 근관장 측정기가 내장되어 길이를 확인하며 치료하고, 회전(로터리)과 왕복(레시프로케이팅) 두 방식을 모두 사용할 수 있습니다.',
      },
      {
        name: 'ProTaper Next',
        role: '니켈-티타늄 근관 파일',
        d: 'M-Wire® 열처리 니켈-티타늄 소재의 회전 파일로 X1부터 X5까지 다섯 종으로 구성됩니다. 근관의 굵기와 형태에 따라 필요한 종류만 골라 사용합니다.',
      },
    ],
    kinds: {
      label: 'DECAY PROGRESSION',
      title: '충치 진행 단계와 신경치료',
      desc: '충치가 신경(치수)까지 진행되면 신경치료가 필요합니다. 단계가 깊어질수록 치료 범위가 커지므로, 시리거나 욱신거리는 증상이 있다면 빨리 진단받는 것이 좋습니다.',
      items: [
        {
          name: '1단계 · 법랑질 충치',
          tag: '간단한 충전 치료',
          d: '치아 겉면(법랑질)에 국한된 충치입니다. 통증이 거의 없고, 충치 부위를 제거한 뒤 레진 등으로 간단히 수복합니다.',
          diagram: 'rct-1',
        },
        {
          name: '2단계 · 상아질 충치',
          tag: '찬 것에 시림',
          d: '충치가 법랑질 아래 상아질까지 진행된 상태입니다. 찬 음식에 시리기 시작하며, 인레이 등 부분 수복이 필요합니다.',
          diagram: 'rct-2',
        },
        {
          name: '3단계 · 치수염',
          tag: '신경치료 필요',
          d: '세균이 신경(치수)까지 감염된 상태입니다. 가만히 있어도 욱신거리는 통증이 나타나며, 신경치료로 치아를 살립니다.',
          diagram: 'rct-3',
        },
        {
          name: '신경치료 후 크라운',
          tag: '치아 보존 완료',
          d: '감염된 신경을 제거하고 근관을 소독·밀폐한 뒤, 크라운을 씌워 치아를 오래 보존합니다.',
          diagram: 'rct-4',
        },
      ],
    },
    aftercare: {
      label: 'DURING & AFTER',
      title: '신경치료 중 · 후 주의사항',
      items: [
        '치료 중인 치아는 임시 재료로 막아 둔 상태입니다. 껌·엿·카라멜처럼 끈적한 음식은 피해주세요.',
        '치료 중인 치아로 딱딱한 음식을 씹으면 치아가 깨질 수 있습니다. 반대쪽으로 식사해주세요.',
        '치료 후 며칠간 씹을 때 불편감이 있을 수 있습니다. 시간이 지나며 점차 줄어드니 걱정하지 않으셔도 됩니다.',
        '통증이 줄었다고 치료를 중단하면 감염이 재발해 발치로 이어질 수 있습니다. 예약 일정을 꼭 지켜주세요.',
        '처방된 약이 있다면 안내된 대로 복용해주세요.',
        '신경치료가 끝난 치아는 크라운으로 보호해야 오래 사용할 수 있습니다. 최종 보철까지 마무리해주세요.',
      ],
    },
    gallery: [
      { src: '/media/images/treatment-room/treatment-01.jpg', alt: '신경치료가 이뤄지는 진료실', caption: '치료에 집중할 수 있는 진료 공간' },
      { src: '/media/images/xray/xray-02.jpg', alt: '치아 뿌리를 확인하는 영상 진단 장비', caption: '치아 뿌리 상태를 확인하는 영상 진단' },
      { src: '/media/images/treatment-room/treatment-03.jpg', alt: '위생적으로 관리되는 진료실', caption: '체계적인 멸균 · 위생 관리' },
    ],
  },
  {
    en: 'Oral Surgery', ko: '사랑니 발치', slug: 'oral-surgery', bg: V.equip,
    card: '/media/images/surgery/or-fullset.jpg',
    d: '3D CT 기반 정밀 진단. 매복 사랑니도 안전하게.',
    summary: '복잡한 매복 사랑니도, 안전하게.',
    intro: '사랑니는 위치와 방향에 따라 발치 난이도가 크게 달라집니다. 특히 신경관과 가까운 매복 사랑니는 3D CT 진단이 필수입니다. 구강악안면외과 전문의가 3D 영상 분석 후 안전한 경로로 발치합니다.',
    reviewedBy: 0,
    quickFacts: [
      { k: '담당', v: '구강악안면외과 전문의 (최종원 대표원장)' },
      { k: '사전 검사', v: '3D CT · 파노라마로 신경관과 뿌리 위치 분석' },
      { k: '대응 범위', v: '매복 · 수평 매복 · 완전 매복 사랑니' },
      { k: '진정 병행', v: '공포가 심한 경우 의식하진정 병행 가능' },
    ],
    processes: [
      '3D CT · 파노라마 촬영',
      '신경관 · 뿌리 위치 정밀 분석',
      '발치 계획 및 리스크 설명',
      '마취 후 외과적 발치',
      '지혈 및 봉합',
      '회복 관리 안내',
    ],
    features: [
      '구강악안면외과 전문의가 직접 집도',
      '3D CT로 신경관 손상 위험 최소화',
      '매복 · 수평 매복 · 완전 매복 케이스 대응',
      '공포가 심한 분은 의식하진정 가능',
    ],
    faqs: [
      { q: '사랑니는 무조건 뽑아야 하나요?', a: '똑바로 나와 잘 관리되는 사랑니는 보존할 수 있습니다. 충치가 잘 생기거나 주변 치아에 영향을 주는 경우 발치를 권장합니다.' },
      { q: '매복 사랑니 발치 시간은?', a: '난이도에 따라 20분~1시간까지 다양합니다. 복잡한 완전 매복은 외과적 접근이 필요합니다.' },
      { q: '사랑니 발치, 꼭 큰 병원으로 가야 하나요?', a: '아트에이치치과는 구강악안면외과 전문의가 직접 진료해 고난도 매복 사랑니도 원내에서 발치합니다. 다만 전신질환 등으로 대학병원 협진이 필요한 경우에는 정확히 안내해 드립니다.' },
      { q: '발치할 때 많이 아픈가요?', a: '마취 후 진행되어 발치 중 통증은 거의 없습니다. 발치 후 통증과 붓기는 처방약과 냉찜질로 대부분 조절되며, 공포가 심한 분은 의식하진정을 병행할 수 있습니다.' },
    ],
    kinds: {
      label: 'IMPACTION TYPES',
      title: '사랑니, 난 모양에 따라 난이도가 다릅니다',
      desc: '사랑니는 나는 방향과 매복 깊이에 따라 발치 난이도가 크게 달라집니다. 3D CT로 뿌리와 신경관 위치를 정확히 확인한 뒤 안전한 발치 계획을 세웁니다.',
      items: [
        {
          name: '수직 맹출',
          tag: '난이도 낮음',
          d: '똑바로 난 사랑니입니다. 관리가 잘 되면 보존할 수도 있지만, 충치나 염증이 반복되면 발치를 권합니다.',
          diagram: 'wis-vertical',
        },
        {
          name: '경사 매복',
          tag: '난이도 중간',
          d: '앞 어금니 쪽으로 기울어 난 사랑니입니다. 인접 치아를 밀거나 사이에 음식물이 끼어 충치를 유발하기 쉽습니다.',
          diagram: 'wis-mesial',
        },
        {
          name: '수평 · 완전 매복',
          tag: '난이도 높음 · 전문의 집도',
          d: '잇몸뼈 속에 누워 있는 사랑니입니다. 신경관과 가까운 경우가 많아 3D CT 분석과 외과적 접근이 필요합니다.',
          diagram: 'wis-horizontal',
        },
      ],
    },
    targetsTitle: {
      label: 'WHO NEEDS EXTRACTION',
      title: '이런 경우 발치를 권합니다',
      desc: '아래 항목에 해당한다면 사랑니 상태를 확인해 보는 것이 좋습니다. 문제가 생기기 전에 미리 진단하면 발치도 더 쉬워집니다.',
    },
    targets: [
      '사랑니에 충치가 생겼거나 반복되는 경우',
      '사랑니 주변 잇몸이 자주 붓고 아픈 경우',
      '누워서 나거나 잇몸 속에 매복된 경우',
      '인접 치아를 밀어 치열에 영향을 주는 경우',
      '칫솔이 닿지 않아 관리가 어려운 경우',
    ],
    aftercare: {
      label: 'AFTER EXTRACTION',
      title: '사랑니 발치 후 주의사항',
      items: [
        '발치 후 거즈는 약 2시간 동안 꽉 물어 지혈하세요. 침과 피는 뱉지 말고 삼키는 것이 좋습니다.',
        '발치 부위를 손가락이나 혀로 건드리지 마세요. 피딱지가 떨어지면 회복이 늦어지고 통증이 심해질 수 있습니다.',
        '마취가 풀리기 전(3~5시간)에는 입술이나 혀를 깨물 수 있으니 식사를 피해주세요.',
        '붓기는 발치 후 2~3일째 가장 심할 수 있습니다. 첫 이틀은 냉찜질이 도움이 됩니다.',
        '음주·흡연, 뜨겁거나 자극적인 음식은 최소 일주일 피해주세요. 회복을 방해합니다.',
        '다음 날 소독을 위해 내원해 주시고, 봉합한 실은 약 1주일 후 제거합니다.',
      ],
    },
    media: {
      label: 'SURGICAL EXTRACTION',
      title: '영상으로 보는 사랑니 발치',
      desc: '독립 수술실에서 구강악안면외과 전문의와 어시스트가 함께 진행하는 발치 수술 장면입니다. 진단부터 수술까지 한 공간에서 체계적으로 이뤄집니다.',
      video: '/media/video/oral-surgery-clinic.mp4',
      videoMobile: '/media/video/oral-surgery-clinic-720.mp4',
      poster: '/media/video/oral-surgery-clinic-poster.jpg',
      images: [
        { src: '/media/images/xray/xray-position.jpg', alt: '파노라마 X-레이 촬영을 준비하는 의료진', caption: '발치 전 파노라마 촬영으로 뿌리와 신경관 위치를 확인합니다' },
      ],
    },
    gallery: [
      { src: '/media/images/surgery/wisdom-surgery-01.jpg', alt: '전문의가 집도하는 사랑니 발치 수술', caption: '구강악안면외과 전문의가 직접 집도합니다' },
      { src: '/media/images/surgery/surgery-tools.jpg', alt: '멸균 포 위에 준비된 발치 수술 기구', caption: '케이스별로 준비하는 멸균 수술 기구' },
      { src: '/media/images/surgery/or-fullset.jpg', alt: '수술 준비를 마친 독립 수술실', caption: '일반 진료와 분리된 독립 수술실' },
    ],
  },
  {
    en: 'TMJ', ko: '턱관절치료', slug: 'tmj', bg: V.scan,
    card: '/media/images/tmj/tmj-tmd-monitor.jpg',
    d: '정확한 원인 진단, 물리치료와 보존적 치료로 근본 개선.',
    summary: '턱의 통증과 불편감, 원인부터 찾습니다.',
    intro: '턱관절 장애는 교합·습관·스트레스 등 복합적 원인에서 발생합니다. 일상에 지장을 주는 소리·통증·개구 장애가 지속된다면 조기 진단이 중요합니다. 영상 검사와 근육 검사를 통해 원인을 파악하고, 비수술적·보존적 치료를 우선합니다.',
    reviewedBy: 0,
    quickFacts: [
      { k: '담당', v: '구강악안면외과 전문의 (최종원 대표원장)' },
      { k: '치료 원칙', v: '수술이 아닌 보존적 치료를 우선' },
      { k: '주요 방법', v: '교합안정장치(스플린트) · 물리치료 · 약물 · 생활습관 교정' },
      { k: '병행 치료', v: '이갈이 · 사각턱 보톡스 병행 가능' },
    ],
    processes: [
      '증상 문진 및 교합 검사',
      '3D CT · 파노라마 진단',
      '근육 · 관절 상태 평가',
      '스플린트(교합안정장치) 치료',
      '물리치료 · 약물치료 병행',
      '생활습관 교정 가이드',
    ],
    features: [
      '원인 기반 맞춤 진단',
      '보존적 치료 우선',
      '스플린트 맞춤 제작',
      '필요 시 구강외과 협진',
    ],
    faqs: [
      { q: '턱에서 소리만 나는데 치료가 필요한가요?', a: '통증이 없는 단순한 관절음은 경과 관찰이 가능하지만, 소리가 점점 커지거나 통증이 생기면 진단을 받는 것이 좋습니다.' },
      { q: '스플린트는 언제까지 착용하나요?', a: '증상에 따라 보통 3~6개월 정도 야간 착용합니다. 정기 점검 후 조절합니다.' },
      { q: '턱관절 장애에 좋은 생활 습관은?', a: '딱딱한 음식 피하기, 한쪽으로만 씹지 않기, 스트레스 관리, 이악물기 습관 교정이 중요합니다.' },
      { q: '턱관절 치료는 얼마나 걸리나요?', a: '원인과 증상 정도에 따라 다르지만, 스플린트 등 보존적 치료는 보통 3~6개월 단위로 경과를 보며 조절합니다. 조기에 시작할수록 치료 기간이 짧아집니다.' },
    ],
    kinds: {
      label: 'TMJ DISORDER TYPES',
      title: '턱관절 장애, 원인에 따라 다릅니다',
      desc: '턱관절 장애는 크게 근육의 문제, 관절 사이 디스크(관절원판)의 문제, 관절 자체의 문제로 나뉩니다. 원인에 따라 치료 방향이 달라지므로 정확한 감별 진단이 먼저입니다.',
      items: [
        {
          name: '근육성 장애',
          tag: '씹는 근육의 긴장',
          d: '이악물기·이갈이·스트레스로 씹는 근육이 뭉쳐 턱과 관자놀이 주변이 아픈 유형입니다. 가장 흔한 유형으로, 습관 교정과 물리치료가 중심이 됩니다.',
          diagram: 'tmj-muscle',
        },
        {
          name: '관절원판 장애',
          tag: '디스크 위치 이상',
          d: '관절 사이에서 쿠션 역할을 하는 디스크가 제자리를 벗어나, 입을 벌릴 때 소리가 나거나 걸리는 유형입니다. 스플린트 치료가 도움이 됩니다.',
          diagram: 'tmj-disc',
        },
        {
          name: '퇴행성 관절 장애',
          tag: '관절면의 마모',
          d: '관절뼈 표면이 닳아 통증과 거친 잡음이 생기는 유형입니다. 조기에 관리할수록 진행을 늦출 수 있습니다.',
          diagram: 'tmj-arthritis',
        },
      ],
    },
    devicesTitle: {
      label: 'TREATMENT OPTIONS',
      title: '턱관절, 이렇게 치료합니다',
      desc: '턱관절 치료는 수술이 아닌 보존적 치료가 원칙입니다. 원인에 맞춰 아래 방법을 단계적으로 병행합니다.',
    },
    devices: [
      {
        name: '교합안정장치 (스플린트)',
        role: '맞춤 제작 · 야간 착용',
        d: '치아 전체를 덮는 맞춤 장치로 관절과 근육의 부담을 줄여줍니다. 보통 야간에 착용하며 정기적으로 조절합니다.',
      },
      {
        name: '물리치료 · 약물치료',
        role: '통증 · 염증 완화',
        d: '온열 등 물리치료와 소염진통제 처방을 병행해 급성 통증과 염증을 조절합니다.',
      },
      {
        name: '생활습관 교정',
        role: '재발 방지',
        d: '이악물기·한쪽 씹기·턱 괴기 같은 원인 습관을 찾아 교정하도록 안내합니다. 재발을 막는 데 가장 중요합니다.',
      },
    ],
    targetsTitle: {
      label: 'CHECK YOUR SYMPTOMS',
      title: '이런 증상이 있다면 확인해 보세요',
      desc: '턱관절 장애는 초기에 진단할수록 간단한 보존적 치료로 좋아질 수 있습니다. 아래 증상이 반복된다면 진료를 권합니다.',
    },
    targets: [
      '입을 벌리거나 다물 때 턱에서 소리가 나는 경우',
      '턱 · 귀 주변이 아프거나 뻐근한 경우',
      '입이 잘 안 벌어지거나 벌릴 때 통증이 있는 경우',
      '아침에 턱이 뻣뻣하고 두통 · 목 통증이 함께 오는 경우',
      '이갈이 · 이악물기 습관이 있는 경우',
    ],
    aftercare: {
      label: 'DAILY CARE',
      title: '턱관절 치료 중 생활 주의사항',
      items: [
        '딱딱하거나 질긴 음식(오징어·견과류·질긴 고기 등)은 치료 기간 동안 피해주세요.',
        '하품할 때는 턱을 받쳐 입이 과하게 벌어지지 않게 해주세요.',
        '턱 괴기, 한쪽으로만 씹기, 엎드려 자기 같은 습관은 턱관절에 부담을 줍니다.',
        '스플린트(교합안정장치)는 안내된 착용 시간을 지키고, 흐르는 물로 세척해 보관하세요.',
        '뻐근함이 있을 때는 따뜻한 찜질이 근육 이완에 도움이 됩니다.',
        '스트레스와 수면 부족은 이악물기를 심하게 만듭니다. 충분한 휴식을 취해주세요.',
      ],
    },
    showcase: {
      label: 'BOTOX THERAPY',
      title: '보톡스 치료 — 이갈이 · 사각턱',
      desc: '과도하게 긴장한 저작근(씹는 근육)에 보톡스를 주사해 근육의 힘을 조절하는 치료입니다. 이갈이 · 이악물기로 인한 턱관절 부담을 줄이는 데 활용하며, 스플린트 등 보존적 치료와 병행할 수 있습니다.',
      items: [
        {
          name: '이갈이 · 이악물기 보톡스',
          tag: '턱관절 부담 완화',
          desc: '수면 중 이갈이나 이악물기 습관으로 뭉친 저작근의 과활동을 줄여, 턱관절과 치아에 가해지는 부담을 덜어줍니다.',
          image: '/media/images/tmj/tmj-botox.jpg',
        },
        {
          name: '사각턱(교근) 보톡스',
          tag: '교근 긴장 완화',
          desc: '발달한 교근 부위에 소량을 나누어 주사합니다. 정품 보툴리눔 톡신만 사용하며, 상담 후 개인별 용량과 주기를 안내해 드립니다.',
          image: '/media/images/tmj/tmj-botox-2.jpg',
        },
      ],
    },
    media: {
      label: 'TMJ CARE',
      title: '영상으로 보는 턱관절 치료',
      desc: '3D 해부 영상으로 턱관절 구조와 원인을 설명하고, 힐링 레이저와 물리치료 장비로 통증을 조절하는 과정을 담았습니다.',
      video: '/media/video/tmj-care.mp4',
      videoMobile: '/media/video/tmj-care-720.mp4',
      poster: '/media/video/tmj-care-poster.jpg',
    },
    gallery: [
      { src: '/media/images/tmj/tmj-tmd-monitor.jpg', alt: '3D 해부 영상으로 턱관절 구조를 설명하는 의료진', caption: '3D 영상으로 이해하기 쉽게 설명해 드립니다' },
      { src: '/media/images/tmj/tmj-laser.jpg', alt: 'PHL-15 힐링 레이저 시술 장면', caption: '힐링 레이저로 통증 부위를 관리합니다' },
      { src: '/media/images/tmj/tmj-physio.jpg', alt: '턱관절 물리치료 장비', caption: '물리치료 장비를 활용한 근육 이완 치료' },
    ],
  },
  {
    en: 'Sedation', ko: '의식하진정', slug: 'sedation', bg: V.surg,
    card: '/media/images/sedation/bm1-live.jpg',
    d: '수면마취 하 편안한 진료. 치과 공포가 있는 분도 안심하고 치료받으실 수 있습니다.',
    summary: '불안 없이, 편안한 잠처럼 받는 진료.',
    intro: '의식하진정(Conscious Sedation)은 환자가 의식은 유지하되 긴장과 불안은 크게 줄어든 상태에서 치료받을 수 있게 하는 방법입니다. 치과 공포가 심한 분, 복잡한 임플란트 수술, 장시간 치료가 필요한 분에게 특히 권장됩니다.',
    reviewedBy: 0,
    quickFacts: [
      { k: '담당', v: '구강악안면외과 전문의 (최종원 대표원장)' },
      { k: '진행 방식', v: '의식이 남아 있는 상태의 진정 (전신마취와 다름)' },
      { k: '안전 관리', v: '치료 중 활력징후 실시간 모니터링' },
      { k: '귀가', v: '회복 관찰 후 보호자 동반 귀가' },
    ],
    processes: [
      '사전 건강 문진 및 금식 안내',
      '생체 신호 모니터링 준비',
      '진정제 투여 후 점진적 이완',
      '치료 진행 (실시간 모니터링)',
      '회복실에서 깨어난 후 경과 관찰',
      '보호자 동반 귀가',
    ],
    features: [
      '실시간 활력징후 모니터링',
      '구강악안면외과 전문의가 진행',
      '치과 공포 · 구역 반사가 심한 분에게 적합',
      '치료 시간이 짧게 느껴지는 장점',
    ],
    faqs: [
      { q: '의식하진정과 전신마취는 어떻게 다른가요?', a: '의식하진정은 의식이 있는 상태로, 간단한 지시에 반응 가능합니다. 전신마취에 비해 회복이 빠른 편이며, 의식이 유지되는 방식입니다.' },
      { q: '혼자 내원해도 되나요?', a: '진정 후에는 판단력과 운동 반응이 느려지므로, 반드시 보호자 동반으로 내원·귀가해주셔야 합니다.' },
      { q: '식사는 언제부터 가능한가요?', a: '완전히 깨어난 후 가벼운 음식부터 시작하세요. 시술 부위에 따라 별도 안내드립니다.' },
    ],
    showcase: {
      label: 'SAFETY MONITORING SYSTEM',
      title: '안전을 지키는 진정 장비',
      desc: '진정 치료 중 환자분의 활력징후를 실시간으로 감시하고, 진정제를 정밀하게 조절하여 안전한 진료 환경을 갖추었습니다.',
      items: [
        {
          name: 'BM1 환자감시장치',
          tag: '실시간 활력징후 감시',
          desc: '산소포화도·혈압·맥박·체온은 물론 호기말이산화탄소(EtCO2)까지 실시간으로 감시하여, 진정 깊이를 안전하게 관리합니다.',
          image: '/media/images/sedation/bm1-live.jpg',
        },
        {
          name: 'Agilia SP 시린지펌프',
          tag: '진정제 정밀 주입',
          desc: '진정제를 정밀한 속도로 주입하고 주입 압력을 실시간 감시하여, 일정하고 안정적인 진정 상태를 유지합니다.',
          image: '/media/images/sedation/agilia-live.jpg',
        },
      ],
    },
    kinds: {
      label: 'WHEN SEDATION HELPS',
      title: '이런 치료에 의식하진정을 활용합니다',
      desc: '의식하진정(수면마취)은 긴장이 크거나 시간이 오래 걸리는 치료에서 특히 도움이 됩니다.',
      items: [
        {
          name: '임플란트 수술',
          tag: '긴 수술도 편안하게',
          d: '식립·뼈이식처럼 수술 시간이 긴 치료를 잠자듯 편안한 상태로 받을 수 있습니다.',
        },
        {
          name: '사랑니 발치',
          tag: '공포가 큰 발치',
          d: '매복 사랑니처럼 부담이 큰 발치도 진정 상태에서 안정적으로 진행합니다.',
        },
        {
          name: '다수 치아 동시 치료',
          tag: '내원 횟수 단축',
          d: '여러 개의 충치·보철 치료를 한 번에 진행해 내원 횟수를 줄일 수 있습니다.',
        },
      ],
    },
    targetsTitle: {
      label: 'WHO NEEDS SEDATION',
      title: '이런 분께 의식하진정을 권합니다',
      desc: '진정 치료가 필요한지 고민된다면 상담 시 편하게 말씀해주세요. 전신 상태를 확인한 뒤 안전하게 진행합니다.',
    },
    targets: [
      '치과 치료에 대한 공포 · 불안이 심한 분',
      '구역 반사가 심해 입안 치료가 어려운 분',
      '임플란트 등 긴 수술을 편안하게 받고 싶은 분',
      '여러 치료를 한 번에 받고 싶은 분',
      '과거 치과 치료 중 힘들었던 경험이 있는 분',
    ],
    aftercare: {
      label: 'BEFORE & AFTER',
      title: '진정 치료 전 · 후 주의사항',
      items: [
        '치료 전 안내받은 금식 시간을 꼭 지켜주세요. 금식이 안 되면 당일 진정 치료가 어려울 수 있습니다.',
        '당일은 몸을 조이는 옷보다 편안한 복장으로 내원해주세요.',
        '반드시 보호자와 함께 내원하고, 귀가할 때도 보호자가 동반해야 합니다.',
        '치료 당일에는 운전, 기계 조작, 중요한 결정이나 계약을 피해주세요.',
        '완전히 깨어난 뒤 물부터 시작해 가벼운 음식 순서로 드세요.',
        '당일 음주는 금하고, 처방약은 안내된 대로 복용해주세요.',
      ],
    },
    gallery: [
      { src: '/media/images/sedation/sedation-pump-01.jpg', alt: '시린지펌프를 조작하는 의료진', caption: '시린지펌프로 진정제를 정밀하게 조절합니다' },
      { src: '/media/images/sedation/sedation-monitor-01.jpg', alt: 'BM1 환자감시장치를 확인하는 의료진', caption: '치료 내내 활력징후를 실시간으로 확인합니다' },
      { src: '/media/images/recovery/recovery-01.jpg', alt: '진정 치료 후 회복실', caption: '깨어난 뒤 경과를 살피는 회복실' },
    ],
  },
  {
    en: 'Periodontics', ko: '잇몸 · 스케일링', slug: 'periodontics', bg: V.white,
    card: '/media/images/treatment-room/treatment-02.jpg',
    d: '에어플로우 스케일링과 체계적 치주 관리.',
    summary: '치아의 집, 잇몸부터 건강하게.',
    intro: '잇몸 질환은 성인의 치아 상실 원인 1위입니다. 초기에는 증상이 거의 없어 정기 검진이 중요합니다. GBT(Guided Biofilm Therapy) 프로토콜에 따라 에어플로우로 치태와 착색을 부드럽게 제거하고, 체계적인 치주 관리를 제공합니다.',
    quickFacts: [
      { k: '진행 방식', v: 'GBT(Guided Biofilm Therapy) 프로토콜' },
      { k: '사용 장비', v: '스위스 EMS 에어플로우 · 초슬림팁 스케일러' },
      { k: '건강보험', v: '만 19세 이상 연 1회 스케일링 건강보험 적용' },
      { k: '권장 주기', v: '6개월~1년 (잇몸 상태에 따라 단축)' },
    ],
    processes: [
      '잇몸 상태 및 치주낭 깊이 측정',
      '디스클로징 용액으로 치태 시각화',
      '에어플로우(AIRFLOW) 치태·착색 제거',
      '초음파 스케일링',
      '치근 활택 · 폴리싱',
      '홈케어 교육 및 정기 검진 일정',
    ],
    features: [
      'GBT 프로토콜 기반 체계적 관리',
      '에어플로우로 부드러운 스케일링',
      '치주낭 깊이별 맞춤 치료',
      '1년 1회 건강보험 적용',
    ],
    faqs: [
      { q: '스케일링 후 이가 시려요. 정상인가요?', a: '치석이 제거되면서 노출된 치아 면이 일시적으로 시릴 수 있습니다. 대부분 1~2주 내 사라집니다.' },
      { q: '스케일링은 얼마나 자주 해야 하나요?', a: '일반적으로 6개월~1년에 한 번 권장합니다. 잇몸 상태에 따라 더 자주 필요할 수 있습니다.' },
      { q: '잇몸 출혈이 있는데 괜찮은가요?', a: '칫솔질 시 출혈은 잇몸 염증의 대표적 신호입니다. 방치하면 치주염으로 진행할 수 있어 진료를 권장드립니다.' },
    ],
    targetsTitle: {
      label: 'PAINLESS GBT',
      title: '시리지 않은 편안한 무통증 GBT',
      desc: '파우더로 섬세하게 세균을 관리하고, 초슬림팁으로 부드럽게 치석을 제거합니다. 자극은 줄이고 편안함은 높여 부담 없이 받으실 수 있는 잇몸 케어입니다.',
    },
    targets: [
      '스케일링이 아파서 미뤄오신 분',
      '잇몸이 자주 붓고 피가 나는 분',
      '착색 때문에 치아가 누렇게 보여 고민이신 분',
    ],
    media: {
      label: 'GBT · GUIDED BIOFILM THERAPY',
      title: '눈으로 보는 GBT',
      desc: '스위스 프리미엄 프로토콜 GBT가 실제로 어떻게 진행되는지, 아트에이치치과 진료실에서 촬영한 영상으로 확인해 보세요. 부드러운 파우더와 따뜻한 물로 치태와 착색을 섬세하게 닦아내는 과정입니다.',
      video: '/media/video/gbt-clinic.mp4',
      videoMobile: '/media/video/gbt-clinic-720.mp4',
      poster: '/media/video/gbt-clinic-poster.jpg',
      images: [
        { src: '/media/images/equipment/gbt-clinic.jpg', alt: '아트에이치치과 GBT 진료 장면', caption: '구강악안면외과 전문의가 직접 진행하는 GBT 케어' },
      ],
    },
    kinds: {
      label: 'GUM DISEASE STAGES',
      title: '잇몸병, 소리 없이 진행됩니다',
      desc: '잇몸병은 통증 없이 진행되다 뒤늦게 발견되는 경우가 많습니다. 정기적인 스케일링과 검진이 가장 기본적인 예방입니다.',
      items: [
        {
          name: '건강한 잇몸',
          tag: '단단하고 출혈 없음',
          d: '잇몸이 치아를 단단히 감싸고 있고, 칫솔질에도 피가 나지 않는 상태입니다. 정기 검진으로 유지합니다.',
          diagram: 'perio-1',
        },
        {
          name: '치은염',
          tag: '붓고 피가 나는 단계',
          d: '치석 속 세균으로 잇몸에 염증이 생긴 상태입니다. 양치할 때 피가 나면 신호입니다. 스케일링과 관리로 회복할 수 있습니다.',
          diagram: 'perio-2',
        },
        {
          name: '치주염',
          tag: '잇몸뼈까지 진행된 단계',
          d: '염증이 잇몸뼈까지 진행돼 치아가 흔들릴 수 있는 상태입니다. 잇몸 치료가 필요하며, 방치하면 발치로 이어질 수 있습니다.',
          diagram: 'perio-3',
        },
      ],
    },
    aftercare: {
      label: 'AFTER SCALING',
      title: '스케일링 후 주의사항',
      items: [
        '스케일링 후 1~3일은 시리거나 잇몸에서 피가 살짝 날 수 있습니다. 치석이 덮고 있던 부위가 드러나며 생기는 자연스러운 회복 과정입니다.',
        '당일은 맵고 뜨거운 음식, 음주, 흡연을 피해주세요.',
        '시린 증상이 있을 때는 미지근한 물로 부드럽게 양치해주세요.',
        '치실 · 치간칫솔을 함께 쓰면 스케일링 효과가 오래 유지됩니다.',
        '정기 스케일링은 보통 6개월~1년 주기를 권하며, 잇몸질환이 있다면 더 짧은 주기를 안내해 드립니다.',
        '만 19세 이상은 연 1회 스케일링에 건강보험이 적용됩니다.',
      ],
    },
    gallery: [
      { src: '/media/images/perio/gbt-treatment.jpg', alt: 'GBT 에어플로우 케어를 진행하는 의료진', caption: 'GBT 프로토콜에 따라 진행하는 잇몸 케어' },
      { src: '/media/images/perio/scaling-closeup.jpg', alt: '초슬림팁으로 진행하는 스케일링 클로즈업', caption: '초슬림팁으로 부드럽게 치석을 제거합니다' },
      { src: '/media/images/perio/airflow-device.jpg', alt: 'EMS 에어플로우 프로필락시스 마스터 장비', caption: '스위스 EMS 에어플로우 장비' },
    ],
  },
  {
    en: 'Whitening', ko: '치아미백', slug: 'whitening', bg: V.consult,
    card: '/media/images/whitening/whitening-bluelight.jpg',
    d: '전문가 오피스 미백으로 밝은 미소를 되찾아 드립니다.',
    summary: '자연스러운 결, 밝아진 미소.',
    intro: '치아 변색은 식습관·흡연·노화·약물 등 다양한 원인에서 발생합니다. 치아 상태에 따라 오피스 미백(내원)과 홈 미백(자가)을 병행해 자연스러운 밝기를 찾아갑니다.',
    quickFacts: [
      { k: '미백 방식', v: '오피스 미백 · 홈 미백 · 듀얼 미백 중 선택' },
      { k: '사전 준비', v: '스케일링과 표면 착색 제거 후 진행' },
      { k: '시림 관리', v: '시림 완화 도포제 병행' },
      { k: '유지 관리', v: '홈 미백 맞춤 트레이 제공 및 정기 관리 안내' },
    ],
    processes: [
      '치아 · 잇몸 상태 점검',
      '스케일링 및 표면 착색 제거',
      '시린 증상 예방 도포',
      '미백제 도포 및 광조사',
      '결과 확인 및 홈 미백 키트 안내',
      '정기 유지 관리',
    ],
    features: [
      '전문가 오피스 미백',
      '시림 완화 도포제 병행',
      '홈 미백 맞춤 트레이 제공',
      '유지 관리 루틴 가이드',
    ],
    faqs: [
      { q: '미백 후 얼마나 유지되나요?', a: '생활 습관에 따라 다르지만 일반적으로 1~2년 유지됩니다. 커피·와인 등 착색 음식 후 양치를 권장합니다.' },
      { q: '미백 중 시림은 어떻게 관리하나요?', a: '시림 완화 성분을 도포하고, 농도를 조절하여 최소화합니다. 심하면 일시 중단 후 재개 가능합니다.' },
      { q: '인공치아(레진·크라운)도 미백이 되나요?', a: '인공 보철물은 미백이 되지 않습니다. 미백 후 자연치아와 색을 맞추는 보철 교체가 필요할 수 있습니다.' },
    ],
    devicesTitle: {
      label: 'ADVANCED WHITENING SYSTEM',
      title: '효과는 높이고 부작용은 줄이는 미백 시스템',
      desc: '미백 효과는 최대화하고 시린 불편감은 최소화하기 위해, 단계별 전문 장비를 활용합니다.',
    },
    devices: [
      { name: 'GBT Machine', role: '미백 전 치면세정', d: '파우더 세정과 초슬림팁으로 부드럽게 치석을 제거해, 미백 효과를 최대화하는 사전 단계입니다.' },
      { name: 'Endo-Wiz', role: '시린 증상 완화', d: '미백 과정에서 생길 수 있는 시린 불편감을 최소화하는 첨단 기기입니다.' },
      { name: 'Osstem Vutees', role: '미백광 조사', d: '최적의 파장으로 미백제 활성화를 도와 미백 효과를 높입니다.' },
    ],
    kinds: {
      label: 'WHITENING OPTIONS',
      title: '미백, 생활 패턴에 맞게 선택합니다',
      desc: '치아 상태와 목표 밝기, 생활 패턴에 따라 오피스·홈·듀얼 미백 중 알맞은 방법을 안내해 드립니다.',
      items: [
        {
          name: '오피스 미백',
          tag: '치과에서 · 빠른 변화',
          d: '전문가용 미백제와 전용 광선 조사로 치과에서 진행합니다. 짧은 기간에 뚜렷한 변화를 원할 때 적합합니다.',
          diagram: 'wht-office',
        },
        {
          name: '홈 미백',
          tag: '집에서 · 맞춤 트레이',
          d: '맞춤 제작한 트레이에 미백제를 담아 집에서 진행합니다. 부드럽게 서서히 밝아지는 방식입니다.',
          diagram: 'wht-home',
        },
        {
          name: '듀얼 미백',
          tag: '오피스 + 홈 병행',
          d: '오피스 미백으로 빠르게 밝기를 올리고 홈 미백으로 유지합니다. 효과와 지속력을 함께 챙기는 방법입니다.',
          diagram: 'wht-dual',
        },
      ],
    },
    targetsTitle: {
      label: 'WHO NEEDS WHITENING',
      title: '이런 분께 치아미백을 권합니다',
      desc: '치아 상태와 변색 원인에 따라 미백 방법과 횟수가 달라집니다. 상담 후 알맞은 플랜을 안내해 드립니다.',
    },
    targets: [
      '커피 · 차 · 와인 등으로 치아가 착색된 분',
      '결혼식 · 면접 등 중요한 일정을 앞둔 분',
      '나이가 들며 치아 색이 어두워졌다고 느끼는 분',
      '미백 후 밝은 색을 오래 유지하고 싶은 분',
    ],
    aftercare: {
      label: 'AFTER WHITENING',
      title: '미백 후 주의사항',
      items: [
        '미백 후 24~48시간은 커피 · 카레 · 와인 · 콜라 등 착색이 잘 되는 음식을 피해주세요.',
        '흡연은 재변색의 가장 큰 원인입니다. 최소 48시간은 금연해주세요.',
        '일시적으로 시릴 수 있습니다. 보통 1~2일 안에 가라앉으며, 지속되면 내원해주세요.',
        '착색이 심한 음식을 먹었다면 바로 양치하거나 물로 헹궈주세요.',
        '정기 검진과 클리닝을 병행하면 밝기를 오래 유지할 수 있습니다.',
        '홈 미백을 병행하는 경우 안내된 착용 시간을 지켜주세요.',
      ],
    },
    media: {
      label: 'OFFICE WHITENING',
      title: '영상으로 보는 치아미백',
      desc: '전용 미백램프로 미백제를 활성화하는 오피스 미백 과정을 아트에이치치과 진료실에서 촬영했습니다. 시림을 줄이는 단계별 관리와 함께 진행됩니다.',
      video: '/media/video/whitening-care.mp4',
      videoMobile: '/media/video/whitening-care-720.mp4',
      poster: '/media/video/whitening-care-poster.jpg',
    },
    gallery: [
      { src: '/media/images/whitening/whitening-lamp-01.jpg', alt: '미백램프를 조정하는 의료진', caption: '전용 미백램프로 진행하는 오피스 미백' },
      { src: '/media/images/whitening/whitening-bluelight.jpg', alt: '블루라이트가 점등된 미백 장비 클로즈업', caption: '최적 파장의 블루라이트로 미백제를 활성화합니다' },
      { src: '/media/images/whitening/whitening-device.jpg', alt: '오스템 미백램프 장비', caption: '오스템 미백램프(Vutees) 장비' },
    ],
  },
];

export const DOCTORS = [
  {
    name: '최종원',
    title: '대표원장',
    specialty: '구강악안면외과 전문의',
    focus: '임플란트 · 사랑니 발치 · 턱관절 · 의식하진정(수면마취)',
    photo: '/media/images/doctor/doctor-choi-profile.jpg',
    objectPosition: 'center 20%',
    quote: '"한 분 한 분의 치아를 소중하게 대합니다."',
    careerGroups: [
      {
        label: '자격',
        items: [
          '보건복지부 인증 구강악안면외과 전문의',
          '대한악안면성형재건외과학회 인정의',
        ],
      },
      {
        label: '학력',
        items: [
          '서울대학교 졸업',
          '전북대 치의학전문대학원 졸업',
        ],
      },
      {
        label: '수련',
        items: [
          '한양대병원 인턴 수료',
          '한양대병원 구강악안면외과 레지던트 수료',
        ],
      },
      {
        label: '경력',
        items: [
          '제3기갑여단 의무중대 치과군의관',
          '국군춘천병원 구강악안면외과 과장',
          '인천공항 제1터미널 코로나19 검역관',
          '하늘리더스치과 부원장',
        ],
      },
      {
        label: '활동',
        items: [
          'Osstem master course 임상지도의',
          'DALS(치과전문소생술) provider',
          '한양대병원 치과진료부 외래교수',
        ],
      },
    ],
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
  },
  {
    name: '강지수',
    title: '원장',
    specialty: '치과보존과 전문의',
    focus: '신경치료 · 충치 치료 · 잇몸 · 치아미백',
    photo: '/media/images/doctor/doctor-kang-profile.jpg',
    objectPosition: 'center 20%',
    quote: '"환자분의 이야기에 귀 기울이며,\n자연치아를 최대한 보존하는 진료를 약속합니다."',
    careerGroups: [
      {
        label: '자격',
        items: [
          '보건복지부 인증 보존과 전문의',
          '대한치과보존학회 인증 보존과 전문의',
          '대한치과보존학회 인증 보존과 인정의',
        ],
      },
      {
        label: '학력',
        items: [
          '전남대학교 치과대학 치의학과 졸업',
          '전남대학교 치의학전문대학원 석사 졸업',
          '전남대학교 치의학전문대학원 박사 수료',
        ],
      },
      {
        label: '활동',
        items: [
          '대한치과보존학회 정회원',
          '대한치과근관치료학회 정회원',
        ],
      },
    ],
    career: [
      '보건복지부 인증 보존과 전문의',
      '대한치과보존학회 인증 보존과 전문의',
      '대한치과보존학회 인증 보존과 인정의',
      '대한치과보존학회 정회원',
      '대한치과근관치료학회 정회원',
      '전남대학교 치과대학 치의학과 졸업',
      '전남대학교 치의학전문대학원 석사 졸업',
      '전남대학교 치의학전문대학원 박사 수료',
    ],
  },
];

// 호환 alias (기존 참조 유지)
export const DOCTOR = DOCTORS[0];

export const SYSTEM_ITEMS = [
  { t: '멸균 시스템', d: '중앙공급실 방식의 Class B 고압증기멸균 시스템. 기구 세척부터 멸균, 진료수 관리까지 9단계 감염 관리 프로토콜로 눈에 보이지 않는 곳까지 철저하게.' },
  { t: '독립 수술실', d: '임플란트 수술은 완전히 분리된 1인 수술실에서 진행합니다. 외부 소음 차단, 감염 위험 최소화.' },
  { t: '치료 보증제', d: '진료 보증서를 발급하고, 정기 검진을 통해 치료받은 치아를 오래 유지할 수 있도록 끝까지 책임집니다.' },
];

// ── 디자인 개편 2026-07-23 (plan-design-refresh P2·P3) ──

// P2. 네이버 리뷰 — 링크만 노출 (건수 비노출 확정)
export const REVIEW_LINK = {
  d: '아트에이치치과의 리뷰는 네이버 플레이스에서 직접 확인하실 수 있습니다.',
  cta: '네이버 리뷰 보러가기',
};

// P2. 치료 보증제 — 우리 약속만 단일 열로 (검수: 2단 비교는 의료법 간접 비교광고 소지 → 전환)
export const WARRANTY = {
  label: 'CARE GUARANTEE',
  title: '치료가 끝나도, 관리는 계속됩니다',
  desc: '아트에이치치과는 말이 아니라 문서로 약속합니다. 진료 보증서를 발급하고, 정기 검진으로 치료받은 치아를 오래 유지하도록 함께 관리합니다.',
  items: [
    { t: '진료 보증서 발급', d: '치료 내용과 보증 기준을 문서로 남겨 드립니다.' },
    { t: '정기 검진으로 함께 확인', d: '치료 후에도 정기 검진으로 치아 상태를 같이 살핍니다.' },
    { t: '오래 쓰도록 지속 관리', d: '치료받은 치아를 오래 사용하실 수 있도록 관리 방법까지 안내합니다.' },
  ],
};

// P3. 홈 스토리 3밴드 — 한 밴드 = 한 메시지, 07.21 실사 배경 + 과목 딥링크
export const STORY_BANDS = [
  {
    en: 'SPECIALIST SURGERY',
    title: '수술은 처음부터 끝까지,\n구강악안면외과 전문의가 직접',
    d: '임플란트와 사랑니 발치 같은 수술은 구강악안면외과 전문의가 직접 계획하고 집도합니다. 고난도 케이스일수록 집도의의 경험이 중요하다고 믿기 때문입니다.',
    img: '/media/images/surgery/wisdom-surgery-01.jpg',
    alt: '독립 수술실에서 수술을 집도하는 구강악안면외과 전문의',
    href: '/treatments/implant',
    link: '임플란트 자세히 보기',
  },
  {
    en: 'STERILE OPERATION ROOM',
    title: '독립 수술실,\n9단계 멸균 시스템',
    d: '수술은 일반 진료와 완전히 분리된 1인 수술실에서 진행합니다. Class B 고압증기멸균을 포함한 9단계 감염 관리로, 보이지 않는 곳까지 철저하게 지킵니다.',
    img: '/media/images/surgery/or-fullset.jpg',
    alt: '수술 준비를 마친 아트에이치치과 독립 수술실',
    href: '/facility',
    link: '시설 둘러보기',
  },
  {
    en: 'REAL-TIME MONITORING',
    title: '의식하진정,\n잠든 동안에도 지켜봅니다',
    d: '진정 치료 중에는 환자감시장치로 산소포화도·혈압·맥박을 실시간 확인하고, 시린지펌프로 진정제를 정밀하게 조절합니다. 치과 공포가 있는 분도 한결 편안하게 치료받으실 수 있도록 돕습니다.',
    img: '/media/images/sedation/bm1-live.jpg',
    alt: 'BM1 환자감시장치로 활력징후를 확인하는 의식하진정 치료',
    href: '/treatments/sedation',
    link: '의식하진정 자세히 보기',
  },
];

export const GREETING = {
  author: '최종원',
  authorTitle: '대표원장',
  authorSpecialty: '구강악안면외과 전문의',
  headline: '진료 너머,\n사람의 고귀함을 생각합니다.',
  intro:
    '안녕하세요, 송도 Art H Dental 대표원장 최종원입니다.',
  body: [
    '구강악안면외과 전문의로서 수많은 수술을 집도하며 저 스스로에게 끊임없이 물었습니다. "이미 훌륭한 치과들이 이렇게나 많은데, 내가 또 하나의 치과를 여는 것이 세상에 어떤 의미가 있을까?"',
    '오랜 시간 진료 현장에서 고민 끝에 제가 찾은 답은 결국 사람이었습니다. 환자분의 상태를 있는 그대로 존중하고, 치료의 과정을 투명하게 소통하며, 무엇보다 편안하게 진료를 마쳤을 때 환자분이 짓는 안도의 미소가 저에게는 가장 큰 행복이었습니다.',
    'Art H Dental(아트에이치 치과)은 바로 그 진심에서 시작되었습니다. 우리는 \'H\'라는 이름에 다섯 가지 약속을 담았습니다. 따뜻한 마음(Heart)과 사람(Human)을 중심에 둔 치유(Healing), 변치 않는 가치(Heritage)를 지키며 수준 높은 진료(High-end)를 제공하겠다는 다짐입니다.',
    '편안함을 드리는 공간, 세심한 마취 기술, 그리고 자면서 치료받는 의식하 진정요법(수면치료)까지. 이 모든 것은 단순한 의술의 도구가 아닙니다. "당신의 아픔이 덜하기를 바라는 마음", 그리고 "치료 과정에서 느끼시는 감정까지 깊이 존중하겠다는 약속"을 지키기 위해 오랜 시간 준비해 온 배려의 수단들입니다.',
    '치료를 넘어 서로의 마음까지 평온해지는 경험을 나누고 싶습니다. 환자분이 머무시는 모든 순간이 안도와 편안함으로 채워질 수 있도록, 매일 정성을 다해 맞이하겠습니다. 제가 사랑하는 도시 인천 송도에서, 신뢰받는 치과를 넘어 지역 사회의 따뜻한 희망이 되는 공간을 만들어 가겠습니다.',
  ],
  closing:
    '모든 분이 오늘 하루도 건강하고 행복하시길 기원합니다. 감사합니다.',
};

export const PROMISE_ITEMS = [
  {
    no: '01',
    t: '전문의 협진 시스템',
    d: '구강악안면외과 전문의의 안전한 임플란트 수술과 치과보존과 전문의의 세밀한 자연치아 살리기. 두 분야 협진으로 최적의 치료 결과를 지향합니다.',
  },
  {
    no: '02',
    t: '자연치아 보존 최우선',
    d: '살릴 수 있는 치아는 끝까지 살리는 것 — Art H 진료의 가장 큰 가치입니다.',
  },
  {
    no: '03',
    t: '환자 중심의 편안한 소통',
    d: '환자분이 겪고 계신 불편함에 충분히 귀 기울이고, 지금 꼭 필요한 치료가 무엇인지 명확하게 설명해 드립니다.',
  },
  {
    no: '04',
    t: '회복을 위한 공간 배려',
    d: '통증을 줄이는 세심한 치료는 물론, 안내 과정 전반에서 심리적 평온함을 느끼실 수 있도록 배려합니다.',
  },
];

export const FACILITY_ROOMS = [
  { k: '대기실', e: 'Lounge', bg: V.wait },
  { k: '진료실', e: 'Treatment', bg: V.clinic },
  { k: '수술실', e: 'OR', bg: V.surg },
  { k: '상담실', e: 'Consult', bg: V.consult },
];

// 보유 장비 정보는 추후 원장님 확정 후 다시 채울 예정
export const EQUIPMENTS: { n: string; e: string }[] = [];
