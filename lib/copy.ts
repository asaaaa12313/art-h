import { V } from './visuals';

export const SITE = {
  name: '아트에이치치과',
  nameEn: 'Art H Dental',
  slogan: '진료 너머, 사람의 고귀함을 생각합니다',
  phone: '032-381-3877',
  address: '인천 연수구 인천타워대로 365 힐스테이트 송도 더스카이',
  addressShort: '송도국제업무단지 · 국제업무지구역 3번 출구 202m',
  transit: '인천1호선 국제업무지구역 3번 출구에서 202m',
  naverPlace: 'https://naver.me/GWW5jD4j',
  hours: [
    { day: '월·화·수·금', time: '09:30 — 18:30', highlight: false },
    { day: '목 (야간진료)', time: '09:30 — 20:30', highlight: true },
    { day: '토', time: '09:30 — 14:00', highlight: false },
    { day: '점심', time: '14:00 — 15:00', highlight: false },
    { day: '일요일', time: '정기휴무', highlight: false },
  ],
};

export const NAV_ITEMS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: '의원소개' },
  { href: '/doctor', label: '의료진' },
  { href: '/treatments', label: '진료과목' },
  { href: '/facility', label: '시설' },
  { href: '/location', label: '오시는길' },
] as const;

export const TREATMENTS = [
  { en: 'Implant', ko: '임플란트', d: '디지털 가이드를 활용한 정밀 식립. 뼈이식·상악동거상 등 고난도 케이스도 안전하게.', bg: V.implant },
  { en: 'Root Canal', ko: '신경치료', d: '미세현미경으로 근관을 정밀하게. 자연치아 최대 보존이 원칙입니다.', bg: V.gen },
  { en: 'Oral Surgery', ko: '사랑니 발치', d: '3D CT 기반 정밀 진단. 매복 사랑니도 안전하게.', bg: V.equip },
  { en: 'TMJ', ko: '턱관절치료', d: '정확한 원인 진단, 물리치료와 보존적 치료로 근본 개선.', bg: V.scan },
  { en: 'Sedation', ko: '의식하진정', d: '수면마취 하 편안한 진료. 치과 공포가 있는 분도 안심하고 치료받으실 수 있습니다.', bg: V.surg },
  { en: 'Periodontics', ko: '잇몸 · 스케일링', d: '에어플로우 스케일링과 체계적 치주 관리.', bg: V.white },
  { en: 'Whitening', ko: '치아미백', d: '전문가 오피스 미백으로 밝은 미소를 되찾아 드립니다.', bg: V.consult },
];

export const DOCTORS = [
  {
    name: '최종원',
    title: '대표원장',
    specialty: '구강외과 전문의',
    focus: '임플란트 · 사랑니 발치 · 턱관절 · 의식하진정(수면마취)',
    photo: '/media/images/doctor/doctor-01.jpg',
    objectPosition: 'center 30%',
    quote: '"수술은 정교하게, 자연치아는 끝까지.\n한 분 한 분의 치아를 제 작품처럼 대합니다."',
    career: [
      '구강악안면외과 전문의',
      '대한치과의사협회 정회원',
      '대한구강악안면외과학회 정회원',
      '대한치과이식임플란트학회 정회원',
    ],
  },
  {
    name: '강지수',
    title: '진료원장',
    specialty: '보존과 전문의',
    focus: '신경치료 · 충치 치료 · 잇몸 · 치아미백',
    photo: '/media/images/doctor/doctor-female-placeholder.svg',
    objectPosition: 'center center',
    quote: '"환자분의 이야기에 귀 기울이며,\n자연치아를 최대한 보존하는 진료를 약속합니다."',
    career: [
      '치과보존과 전문의',
      '대한치과의사협회 정회원',
      '대한치과보존학회 정회원',
      '대한치과근관치료학회 정회원',
    ],
  },
];

// 호환 alias (기존 참조 유지)
export const DOCTOR = DOCTORS[0];

export const SYSTEM_ITEMS = [
  { t: '멸균 시스템', d: '9단계 감염 관리 프로토콜. 기구 세척부터 멸균, 진료수 관리까지 눈에 보이지 않는 곳까지 철저하게.' },
  { t: '독립 수술실', d: '임플란트 수술은 완전히 분리된 1인 수술실에서 진행합니다. 외부 소음 차단, 감염 위험 최소화.' },
  { t: '원데이 보철', d: '독일 CEREC 시스템으로 본 뜨는 불편함 없이, 하루 만에 보철물을 완성합니다.' },
  { t: '치료 보증제', d: '진료 보증서를 발급하고, 정기 검진을 통해 치료받은 치아를 오래 유지할 수 있도록 끝까지 책임집니다.' },
];

export const GREETING = {
  author: '최종원',
  authorTitle: '대표원장',
  authorSpecialty: '구강악안면외과 전문의',
  headline: '진료 너머,\n사람의 고귀함을 생각합니다.',
  intro:
    '안녕하세요, 송도 Art H Dental 대표원장 최종원입니다.',
  body: [
    '저희는 치아 하나를 치료하는 의술을 넘어, 내원하시는 모든 분이 머무는 순간의 편안함을 느끼고 한 사람으로서 존중받는 경험을 하시기를 바랍니다.',
    '구강악안면외과와 치과보존과 전문의 협진을 통해, 정교한 진료에 환자를 향한 깊은 시선을 더하겠습니다.',
  ],
  closing:
    '단순히 질병을 고치는 곳이 아닌, 환자분이 건강한 일상을 행복하게 영위하실 수 있는 든든한 토대가 되어드리고 싶습니다. 당신이 머무는 이 순간이 가장 편안하도록, 진심을 다하겠습니다.',
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

export const EQUIPMENTS = [
  { n: '3D CT · 구강 스캐너', d: '본 뜨는 불편함 없이 3D 스캔으로 정밀한 데이터를 확보합니다.', bg: V.equip },
  { n: 'CAD/CAM CEREC', d: '디지털 설계와 밀링으로 당일 보철물 제작이 가능합니다.', bg: V.scan },
  { n: '디지털 엑스레이', d: '낮은 방사선량의 선명한 영상으로 정확한 진단을 돕습니다.', bg: V.clinic },
  { n: '미세 현미경', d: '20배 이상 확대로 미세한 치아 구조까지 정밀하게 확인합니다.', bg: V.gen },
];
