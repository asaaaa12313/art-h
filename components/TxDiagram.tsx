import type { ReactNode } from 'react';

/**
 * 진료과목 상세용 치료 모식도 (자체 제작 SVG — 저작권 안전)
 * - 공통 무대: 잇몸(gum) 밴드 + 치조골(bone) 영역 위에 어금니 단면 스케치
 * - 색은 사이트 팔레트 고정값 사용 (SVG라 CSS 변수 대신 hex 직접 지정)
 */

const C = {
  navy: '#1A2647',
  blue: '#2E6FD4',
  blueL: '#6BAEE8',
  white: '#FFFFFF',
  gum: '#F3EBE0',
  bone: '#ECE4D6',
  dot: '#D9CFBC',
  bad: '#C05A45', // 충치·염증 표시용
};

const BONE_DOTS: [number, number][] = [
  [18, 116], [40, 138], [66, 122], [92, 148], [118, 130], [144, 142],
  [170, 120], [196, 136], [30, 158], [126, 160], [200, 154], [76, 154],
];

function Ground() {
  return (
    <g>
      <rect x="0" y="100" width="220" height="70" fill={C.bone} />
      <rect x="0" y="84" width="220" height="16" fill={C.gum} />
      <line x1="0" y1="84" x2="220" y2="84" stroke={C.navy} strokeWidth="1.5" opacity="0.45" />
      {BONE_DOTS.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="1.6" fill={C.dot} />
      ))}
    </g>
  );
}

/** 어금니 단면 패스 (crown + 2 roots). gy = 잇몸 라인 y */
function molarPath(cx: number, s = 1, gy = 84): string {
  const w = 20 * s;
  return [
    `M ${cx - w} ${gy}`,
    `L ${cx - w} ${gy - 26 * s}`,
    `Q ${cx - w} ${gy - 38 * s} ${cx - w + 9 * s} ${gy - 38 * s}`,
    `Q ${cx} ${gy - 30 * s} ${cx + w - 9 * s} ${gy - 38 * s}`,
    `Q ${cx + w} ${gy - 38 * s} ${cx + w} ${gy - 26 * s}`,
    `L ${cx + w} ${gy}`,
    `Q ${cx + w - s} ${gy + 16 * s} ${cx + w - 6 * s} ${gy + 26 * s}`,
    `Q ${cx + w - 9 * s} ${gy + 31 * s} ${cx + w - 11 * s} ${gy + 22 * s}`,
    `Q ${cx + w - 13 * s} ${gy + 12 * s} ${cx + w - 14 * s} ${gy + 5 * s}`,
    `Q ${cx} ${gy + s} ${cx - w + 14 * s} ${gy + 5 * s}`,
    `Q ${cx - w + 13 * s} ${gy + 12 * s} ${cx - w + 11 * s} ${gy + 22 * s}`,
    `Q ${cx - w + 9 * s} ${gy + 31 * s} ${cx - w + 6 * s} ${gy + 26 * s}`,
    `Q ${cx - w + s} ${gy + 16 * s} ${cx - w} ${gy}`,
    'Z',
  ].join(' ');
}

function Molar({
  cx, s = 1, gy = 84, dashed = false, opacity = 1,
}: { cx: number; s?: number; gy?: number; dashed?: boolean; opacity?: number }) {
  return (
    <path
      d={molarPath(cx, s, gy)}
      fill={dashed ? 'none' : C.white}
      stroke={C.navy}
      strokeWidth={s > 1.2 ? 2.4 : 2}
      strokeDasharray={dashed ? '5 4' : undefined}
      strokeLinejoin="round"
      opacity={opacity}
    />
  );
}

/** 임플란트 인공치근 (픽스처) */
function Fixture({ cx, small = false }: { cx: number; small?: boolean }) {
  const wTop = small ? 7 : 9;
  const wBot = small ? 4 : 5;
  const top = 86;
  const bot = small ? 122 : 128;
  const threads = small ? [94, 102, 110] : [94, 102, 110, 118];
  return (
    <g>
      <path
        d={`M ${cx - wTop} ${top} L ${cx + wTop} ${top} L ${cx + wBot} ${bot - 4} Q ${cx} ${bot + 2} ${cx - wBot} ${bot - 4} Z`}
        fill={C.blue}
        stroke={C.navy}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {threads.map((y) => {
        const t = (y - top) / (bot - top);
        const hw = wTop + (wBot - wTop) * t - 1;
        return <line key={y} x1={cx - hw} y1={y} x2={cx + hw} y2={y + 2} stroke={C.white} strokeWidth="1.6" opacity="0.85" />;
      })}
    </g>
  );
}

/** 지대주 (어버트먼트) */
function Abutment({ cx }: { cx: number }) {
  return (
    <path
      d={`M ${cx - 7} 86 L ${cx - 4} 68 L ${cx + 4} 68 L ${cx + 7} 86 Z`}
      fill={C.blueL}
      stroke={C.navy}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  );
}

/** 크라운 (뿌리 없는 보철 관) */
function CrownCap({ cx, s = 1 }: { cx: number; s?: number }) {
  const w = 18 * s;
  return (
    <path
      d={`M ${cx - w} 86 L ${cx - w} ${84 - 24 * s} Q ${cx - w} ${84 - 36 * s} ${cx - w + 8 * s} ${84 - 36 * s} Q ${cx} ${84 - 29 * s} ${cx + w - 8 * s} ${84 - 36 * s} Q ${cx + w} ${84 - 36 * s} ${cx + w} ${84 - 24 * s} L ${cx + w} 86 Z`}
      fill={C.white}
      stroke={C.navy}
      strokeWidth="2"
      strokeLinejoin="round"
    />
  );
}

/** 신경(치수) — 치수강 + 근관 2개. s=1.5 큰 어금니 전용 */
function Pulp({ color, chamber = true }: { color: string; chamber?: boolean }) {
  return (
    <g>
      {chamber && <ellipse cx="110" cy="62" rx="9" ry="10" fill={color} opacity="0.92" />}
      <path d="M104 70 Q102 92 99 112" stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M116 70 Q118 92 121 112" stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round" />
    </g>
  );
}

/** 통증 스파크 3선 */
function Sparks({ pts, color = C.bad }: { pts: [number, number, number, number][]; color?: string }) {
  return (
    <g stroke={color} strokeWidth="2.5" strokeLinecap="round">
      {pts.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
      ))}
    </g>
  );
}

/** 턱관절 측면 모식 베이스 — 위 관자뼈(오목면) + 하악 과두(원) + 관절원판(렌즈) + 턱선 */
function TmjBase({ disc = 'normal' }: { disc?: 'normal' | 'displaced' | 'none' }) {
  return (
    <g>
      <path
        d="M28 44 Q80 20 140 26 Q186 32 196 58 L196 70 Q184 62 172 62 Q160 62 154 70 Q142 58 128 62 L60 70 Q38 66 28 56 Z"
        fill={C.white}
        stroke={C.navy}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <circle cx="163" cy="82" r="11" fill={C.white} stroke={C.navy} strokeWidth="2" />
      {disc === 'normal' && <ellipse cx="163" cy="68" rx="9" ry="3.5" fill={C.blue} />}
      {disc === 'displaced' && (
        <g>
          <ellipse cx="146" cy="70" rx="9" ry="3.5" fill={C.bad} />
          <line x1="158" y1="66" x2="149" y2="68" stroke={C.bad} strokeWidth="1.8" strokeDasharray="3 2" />
        </g>
      )}
      <path
        d="M163 93 Q166 112 152 122 L96 138 Q66 144 54 134 Q46 127 56 122 L120 108 Q146 102 152 92 Z"
        fill={C.white}
        stroke={C.navy}
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </g>
  );
}

const SCENES: Record<string, () => ReactNode> = {
  /* ─── 임플란트 치료 단계 6종 ─── */
  'imp-step-1': () => (
    <>
      <Ground />
      <Molar cx={55} />
      <Molar cx={165} />
      <Molar cx={110} dashed opacity={0.45} />
    </>
  ),
  'imp-step-2': () => (
    <>
      <Ground />
      <Molar cx={55} />
      <Molar cx={165} />
      <Molar cx={110} dashed opacity={0.35} />
      <circle cx="110" cy="66" r="26" fill="none" stroke={C.blue} strokeWidth="2" strokeDasharray="4 3" />
      <line x1="110" y1="30" x2="110" y2="102" stroke={C.blue} strokeWidth="1.5" strokeDasharray="4 3" />
      <line x1="74" y1="66" x2="146" y2="66" stroke={C.blue} strokeWidth="1.5" strokeDasharray="4 3" />
    </>
  ),
  'imp-step-3': () => (
    <>
      <Ground />
      <Molar cx={55} />
      <Molar cx={165} />
      <Fixture cx={110} />
      <line x1="110" y1="34" x2="110" y2="64" stroke={C.blue} strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="103,62 117,62 110,76" fill={C.blue} />
    </>
  ),
  'imp-step-4': () => (
    <>
      <Ground />
      <Molar cx={55} />
      <Molar cx={165} />
      <Fixture cx={110} />
      {[[94, 100], [126, 100], [96, 116], [124, 116], [100, 130], [120, 130], [92, 108], [128, 108]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.2" fill={C.blue} opacity="0.55" />
      ))}
    </>
  ),
  'imp-step-5': () => (
    <>
      <Ground />
      <Molar cx={55} />
      <Molar cx={165} />
      <Fixture cx={110} />
      <Abutment cx={110} />
    </>
  ),
  'imp-step-6': () => (
    <>
      <Ground />
      <Molar cx={55} />
      <Molar cx={165} />
      <Fixture cx={110} />
      <Abutment cx={110} />
      <CrownCap cx={110} />
    </>
  ),

  /* ─── 임플란트 종류 4종 ─── */
  'imp-guide': () => (
    <>
      <Ground />
      <Molar cx={55} />
      <Molar cx={165} />
      <Molar cx={110} dashed opacity={0.35} />
      <rect x="34" y="36" width="152" height="14" rx="7" fill={C.blueL} opacity="0.5" stroke={C.blue} strokeWidth="1.5" />
      <rect x="100" y="30" width="20" height="26" rx="3" fill="none" stroke={C.blue} strokeWidth="2" />
      <line x1="110" y1="12" x2="110" y2="120" stroke={C.blue} strokeWidth="2" strokeDasharray="5 4" />
    </>
  ),
  'imp-graft': () => (
    <>
      <Ground />
      <Molar cx={55} />
      <Molar cx={165} />
      <Fixture cx={110} />
      <ellipse cx="110" cy="118" rx="27" ry="21" fill="none" stroke={C.blue} strokeWidth="1.5" strokeDasharray="4 3" />
      {[[96, 104], [90, 112], [98, 120], [94, 128], [104, 133], [116, 133], [126, 128], [122, 120], [130, 112], [124, 104], [103, 124], [117, 124]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.5" fill={C.blueL} />
      ))}
    </>
  ),
  'imp-full': () => (
    <>
      <Ground />
      <Fixture cx={40} small />
      <Fixture cx={87} small />
      <Fixture cx={133} small />
      <Fixture cx={180} small />
      <rect x="22" y="48" width="176" height="38" rx="9" fill={C.white} stroke={C.navy} strokeWidth="2" />
      {[66, 110, 154].map((x) => (
        <line key={x} x1={x} y1={52} x2={x} y2={82} stroke={C.navy} strokeWidth="1.2" opacity="0.35" />
      ))}
    </>
  ),
  'imp-senior': () => (
    <>
      <path
        d="M110 26 L152 42 L152 88 Q152 124 110 146 Q68 124 68 88 L68 42 Z"
        fill={C.white}
        stroke={C.navy}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d={molarPath(110, 0.8, 96)} fill={C.white} stroke={C.navy} strokeWidth="2" strokeLinejoin="round" />
      <line x1="76" y1="96" x2="144" y2="96" stroke={C.navy} strokeWidth="1.2" opacity="0.35" />
      <circle cx="152" cy="40" r="17" fill={C.blue} />
      <text x="152" y="44.5" textAnchor="middle" fontSize="12" fontWeight="700" fill={C.white}>65+</text>
    </>
  ),

  /* ─── 사랑니 매복 유형 3종 ─── */
  'wis-vertical': () => (
    <>
      <Ground />
      <Molar cx={75} />
      <Molar cx={150} s={0.9} />
      <polyline points="138,30 147,39 162,20" fill="none" stroke={C.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'wis-mesial': () => (
    <>
      <Ground />
      <Molar cx={70} />
      <g transform="rotate(-32 146 92)">
        <Molar cx={146} s={0.9} gy={92} />
      </g>
      <Sparks pts={[[104, 58, 96, 48], [112, 52, 108, 40], [98, 68, 86, 62]]} />
    </>
  ),
  'wis-horizontal': () => (
    <>
      <Ground />
      <g transform="rotate(-80 152 104)">
        <Molar cx={152} s={0.85} gy={104} />
      </g>
      <rect x="0" y="84" width="220" height="16" fill={C.gum} opacity="0.82" />
      <line x1="0" y1="84" x2="220" y2="84" stroke={C.navy} strokeWidth="1.5" opacity="0.45" />
      <Molar cx={70} />
      <Sparks pts={[[100, 96, 90, 90], [104, 106, 93, 104]]} />
    </>
  ),

  /* ─── 충치 진행 · 신경치료 4종 ─── */
  'rct-1': () => (
    <>
      <Ground />
      <Molar cx={110} s={1.5} />
      <Pulp color={C.dot} />
      <circle cx="124" cy="36" r="6" fill={C.bad} />
    </>
  ),
  'rct-2': () => (
    <>
      <Ground />
      <Molar cx={110} s={1.5} />
      <Pulp color={C.dot} />
      <path d="M116 29 Q133 29 135 44 Q135 54 124 56 Q112 54 112 42 Q112 29 116 29 Z" fill={C.bad} />
    </>
  ),
  'rct-3': () => (
    <>
      <Ground />
      <Molar cx={110} s={1.5} />
      <path d="M116 29 Q133 29 135 44 Q135 56 122 58 Q111 56 111 42 Q111 29 116 29 Z" fill={C.bad} />
      <Pulp color={C.bad} />
      <Sparks pts={[[84, 30, 74, 20], [94, 24, 90, 12], [76, 44, 63, 40]]} />
    </>
  ),
  /* ─── 턱관절 장애 유형 3종 ─── */
  'tmj-muscle': () => (
    <>
      <TmjBase />
      <g stroke={C.bad} strokeWidth="3" strokeLinecap="round" opacity="0.8">
        <line x1="138" y1="96" x2="128" y2="122" />
        <line x1="148" y1="94" x2="138" y2="120" />
        <line x1="158" y1="92" x2="148" y2="118" />
      </g>
      <Sparks pts={[[118, 96, 108, 86], [126, 90, 122, 78], [110, 106, 97, 102]]} />
    </>
  ),
  'tmj-disc': () => (
    <>
      <TmjBase disc="displaced" />
      <Sparks pts={[[180, 66, 190, 58], [184, 76, 196, 74], [178, 56, 186, 46]]} />
    </>
  ),
  'tmj-arthritis': () => (
    <>
      <TmjBase disc="none" />
      <path
        d="M153 78 L156 82 L153 86 L157 90 L161 87 L166 91 L170 87 L173 82"
        fill="none"
        stroke={C.bad}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {[[150, 66], [176, 70], [158, 60], [170, 58]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill={C.bad} opacity="0.7" />
      ))}
      <Sparks pts={[[184, 78, 194, 72], [180, 62, 188, 52]]} />
    </>
  ),

  /* ─── 잇몸병 진행 3단계 ─── */
  'perio-1': () => (
    <>
      <Ground />
      <Molar cx={110} s={1.2} />
      <polyline points="152,34 161,43 176,24" fill="none" stroke={C.blue} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  'perio-2': () => (
    <>
      <Ground />
      <Molar cx={110} s={1.2} />
      <ellipse cx="82" cy="84" rx="9" ry="6" fill={C.bad} opacity="0.55" />
      <ellipse cx="138" cy="84" rx="9" ry="6" fill={C.bad} opacity="0.55" />
      {[[85, 76], [135, 76], [88, 70], [132, 70]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={C.dot} stroke={C.navy} strokeWidth="0.8" />
      ))}
      <Sparks pts={[[70, 74, 60, 66], [150, 74, 160, 66]]} />
    </>
  ),
  'perio-3': () => (
    <>
      <g>
        <rect x="0" y="118" width="220" height="52" fill={C.bone} />
        <rect x="0" y="102" width="220" height="16" fill={C.gum} />
        <line x1="0" y1="102" x2="220" y2="102" stroke={C.navy} strokeWidth="1.5" opacity="0.45" />
        {[[24, 132], [60, 148], [100, 136], [140, 152], [176, 134], [204, 148]].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="1.6" fill={C.dot} />
        ))}
      </g>
      <Molar cx={110} s={1.2} />
      {[[87, 90], [133, 90], [90, 98], [130, 98]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={C.dot} stroke={C.navy} strokeWidth="0.8" />
      ))}
      <Sparks pts={[[70, 92, 60, 84], [150, 92, 160, 84]]} />
    </>
  ),

  /* ─── 미백 방법 3종 ─── */
  'wht-office': () => (
    <>
      <Ground />
      <Molar cx={110} s={1.3} />
      <rect x="160" y="14" width="26" height="12" rx="6" fill={C.blue} transform="rotate(28 173 20)" />
      <g stroke={C.blueL} strokeWidth="2.5" strokeLinecap="round">
        <line x1="160" y1="28" x2="134" y2="46" />
        <line x1="168" y1="36" x2="142" y2="54" />
        <line x1="152" y1="22" x2="126" y2="40" />
      </g>
      <path d="M78 34 L82 42 L90 46 L82 50 L78 58 L74 50 L66 46 L74 42 Z" fill={C.blue} />
    </>
  ),
  'wht-home': () => (
    <>
      <Ground />
      <Molar cx={110} s={1.3} />
      <path
        d="M78 88 L78 46 Q78 28 94 28 Q110 40 126 28 Q142 28 142 46 L142 88 Q126 96 110 96 Q94 96 78 88 Z"
        fill={C.blueL}
        fillOpacity="0.28"
        stroke={C.blue}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </>
  ),
  'wht-dual': () => (
    <>
      <Ground />
      <Molar cx={110} s={1.3} />
      <path
        d="M78 88 L78 46 Q78 28 94 28 Q110 40 126 28 Q142 28 142 46 L142 88 Q126 96 110 96 Q94 96 78 88 Z"
        fill={C.blueL}
        fillOpacity="0.22"
        stroke={C.blue}
        strokeWidth="2"
        strokeDasharray="6 4"
        strokeLinejoin="round"
      />
      <g stroke={C.blueL} strokeWidth="2.5" strokeLinecap="round">
        <line x1="176" y1="26" x2="152" y2="42" />
        <line x1="184" y1="36" x2="160" y2="52" />
      </g>
      <path d="M60 30 L63 37 L70 40 L63 43 L60 50 L57 43 L50 40 L57 37 Z" fill={C.blue} />
    </>
  ),

  'rct-4': () => (
    <>
      <Ground />
      <Molar cx={110} s={1.5} />
      <Pulp color={C.blue} chamber={false} />
      <path
        d="M80 86 L80 45 Q80 27 93.5 27 Q110 39 126.5 27 Q140 27 140 45 L140 86 Z"
        fill={C.blueL}
        fillOpacity="0.35"
        stroke={C.navy}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </>
  ),
};

export type TxDiagramName = keyof typeof SCENES;

export default function TxDiagram({
  name, title, className,
}: { name: string; title?: string; className?: string }) {
  const scene = SCENES[name];
  if (!scene) return null;
  return (
    <svg
      viewBox="0 0 220 170"
      role="img"
      aria-label={title}
      className={className}
      style={{ display: 'block', width: '100%', height: 'auto' }}
    >
      {title ? <title>{title}</title> : null}
      {scene()}
    </svg>
  );
}
