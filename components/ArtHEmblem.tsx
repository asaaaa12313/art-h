/**
 * 아트에이치치과 엠블럼 — 실제 병원 간판(남색 원판·금색 월계관·AH 모노그램)을 그대로 옮긴 것.
 * 사진을 쓰지 않고 벡터로 그린 이유: 파비콘 16px부터 배너 크기까지 같은 파일 하나로 또렷하다.
 * 원본 svg는 public/media/brand/art-h-emblem.svg (외부에 로고를 보낼 때 이 파일을 쓴다).
 */
export default function ArtHEmblem({ size = 52, className }: { size?: number; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="아트에이치치과 엠블럼"
    >
      <defs>
      <linearGradient id="ahGold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stopColor="#EBCE86"/>
      <stop offset="45%" stopColor="#C9A44C"/>
      <stop offset="100%" stopColor="#A07C2C"/>
      </linearGradient>
      <path id="ahLeaf" d="M0 0 C 6 -5.6, 16 -5.2, 20 0 C 16 5.2, 6 5.6, 0 0 Z"/>
      </defs>
      <circle cx="100" cy="100" r="97" fill="url(#ahGold)"/>
      <circle cx="100" cy="100" r="92.5" fill="#14245A"/>
      <circle cx="100" cy="100" r="86" fill="none" stroke="url(#ahGold)" strokeWidth="1.5" opacity="0.8"/>
      <g fill="url(#ahGold)" stroke="none">
      <g transform="translate(100 100)">
      <g transform="rotate(200) translate(0 -70) rotate(-34)"><use href="#ahLeaf" transform="scale(1.0)"/></g>
      <g transform="rotate(216) translate(0 -70) rotate(-34)"><use href="#ahLeaf" transform="scale(1.0)"/></g>
      <g transform="rotate(232) translate(0 -70) rotate(-34)"><use href="#ahLeaf" transform="scale(1.0)"/></g>
      <g transform="rotate(249) translate(0 -70) rotate(-34)"><use href="#ahLeaf" transform="scale(1.0)"/></g>
      <g transform="rotate(265) translate(0 -70) rotate(-34)"><use href="#ahLeaf" transform="scale(1.0)"/></g>
      <g transform="rotate(281) translate(0 -70) rotate(-34)"><use href="#ahLeaf" transform="scale(1.0)"/></g>
      <g transform="rotate(298) translate(0 -70) rotate(-34)"><use href="#ahLeaf" transform="scale(1.0)"/></g>
      <g transform="rotate(314) translate(0 -70) rotate(-34)"><use href="#ahLeaf" transform="scale(1.0)"/></g>
      <g transform="rotate(330) translate(0 -70) rotate(-34)"><use href="#ahLeaf" transform="scale(1.0)"/></g>
      </g>
      <g transform="translate(100 100)" opacity="0.95">
      <g transform="rotate(214) translate(0 -55) rotate(-34)"><use href="#ahLeaf" transform="scale(0.76)"/></g>
      <g transform="rotate(231) translate(0 -55) rotate(-34)"><use href="#ahLeaf" transform="scale(0.76)"/></g>
      <g transform="rotate(248) translate(0 -55) rotate(-34)"><use href="#ahLeaf" transform="scale(0.76)"/></g>
      <g transform="rotate(265) translate(0 -55) rotate(-34)"><use href="#ahLeaf" transform="scale(0.76)"/></g>
      <g transform="rotate(282) translate(0 -55) rotate(-34)"><use href="#ahLeaf" transform="scale(0.76)"/></g>
      <g transform="rotate(299) translate(0 -55) rotate(-34)"><use href="#ahLeaf" transform="scale(0.76)"/></g>
      <g transform="rotate(316) translate(0 -55) rotate(-34)"><use href="#ahLeaf" transform="scale(0.76)"/></g>
      </g>
      </g>
      <text x="86" y="120" textAnchor="middle" fontFamily="'Times New Roman', Georgia, serif" fontSize="88" fill="url(#ahGold)">A</text>
      <text x="120" y="142" textAnchor="middle" fontFamily="'Times New Roman', Georgia, serif" fontSize="78" fill="#FFFFFF">H</text>
      <circle cx="150" cy="98" r="5.2" fill="#FFFFFF"/>
    </svg>
  );
}
