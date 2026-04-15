import { V } from './visuals';

export const SITE = {
  name: '아트에이치치과',
  nameEn: 'Art H Dental',
  slogan: '치료가 예술이 되는 곳.',
  phone: '032-000-0000',
  address: '인천광역시 연수구 송도동 송도국제업무단지 C8-2블럭',
  hours: [
    { day: '월·수·목', time: '09:30 — 18:30', highlight: false },
    { day: '화·금', time: '09:30 — 20:30', highlight: true },
    { day: '토', time: '09:30 — 14:00', highlight: false },
    { day: '점심', time: '13:00 — 14:00', highlight: false },
    { day: '일·공휴일', time: '휴진', highlight: false },
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
  { en: 'Implant', ko: '임플란트', d: '디지털 가이드를 활용한 정밀 식립. 뼈이식이 필요한 고난도 케이스도 안전하게.', bg: V.implant },
  { en: 'Aesthetics', ko: '심미보철', d: '라미네이트, 올세라믹. 원데이 CEREC 시스템으로 당일 완성 가능.', bg: V.chair },
  { en: 'Orthodontics', ko: '교정치료', d: '인비절라인, 클리피씨 등 라이프스타일에 맞는 최적의 교정.', bg: V.ortho },
  { en: 'General', ko: '충치 · 신경치료', d: '미세현미경 정밀 치료. 자연치아 최대 보존이 원칙.', bg: V.gen },
  { en: 'Periodontics', ko: '잇몸 · 스케일링', d: '에어플로우 스케일링과 체계적 치주 관리.', bg: V.white },
  { en: 'Whitening', ko: '치아미백', d: '전문가 오피스 미백으로 밝은 미소를 되찾아 드립니다.', bg: V.consult },
  { en: 'TMJ', ko: '턱관절치료', d: '정확한 원인 진단, 물리치료와 보존적 치료로 근본 개선.', bg: V.scan },
  { en: 'Oral Surgery', ko: '사랑니 발치', d: '3D CT 기반 정밀 진단. 매복 사랑니도 안전하게.', bg: V.equip },
];

export const DOCTOR = {
  name: 'OOO 원장',
  specialty: 'OO과 전문의',
  quote: '"빠르게 많은 환자를 보는 것보다,\n한 분에게 충분한 시간을 드리는 것이\n더 좋은 결과를 만든다고 믿습니다."',
  career: [
    'OO대학교 치의학과 졸업',
    'OO대학교 대학원 석사',
    'OO대학병원 인턴 · 레지던트 수료',
    '대한치과의사협회 정회원',
    '대한구강악안면외과학회 정회원',
    '전) OO치과의원 진료원장',
  ],
};

export const SYSTEM_ITEMS = [
  { t: '멸균 시스템', d: '9단계 감염 관리 프로토콜. 기구 세척부터 멸균, 진료수 관리까지 눈에 보이지 않는 곳까지 철저하게.' },
  { t: '독립 수술실', d: '임플란트 수술은 완전히 분리된 1인 수술실에서 진행합니다. 외부 소음 차단, 감염 위험 최소화.' },
  { t: '원데이 보철', d: '독일 CEREC 시스템으로 본 뜨는 불편함 없이, 하루 만에 보철물을 완성합니다.' },
  { t: '치료 보증제', d: '진료 보증서를 발급하고, 정기 검진을 통해 치료받은 치아를 오래 유지할 수 있도록 끝까지 책임집니다.' },
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
