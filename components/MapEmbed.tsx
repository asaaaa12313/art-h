'use client';

import styles from './MapEmbed.module.css';

type Props = {
  query?: string;
  lat?: number;
  lng?: number;
  label?: string;
  naverPlaceUrl?: string;
};

const DEFAULT_QUERY = '힐스테이트 송도 더스카이 아트에이치치과';
const DEFAULT_LAT = 37.3894;
const DEFAULT_LNG = 126.6506;

export default function MapEmbed({
  query = DEFAULT_QUERY,
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  label = '아트에이치치과',
  naverPlaceUrl = 'https://naver.me/GWW5jD4j',
}: Props) {
  const gmapsSrc = `https://www.google.com/maps?q=${encodeURIComponent(query)}&hl=ko&z=16&output=embed`;
  const kakaoUrl = `https://map.kakao.com/link/search/${encodeURIComponent(label + ' 송도')}`;
  const tmapUrl = `https://apis.openapi.sk.com/tmap/app/routes?appKey=&name=${encodeURIComponent(label)}&lon=${lng}&lat=${lat}`;

  return (
    <div className={styles.wrap}>
      <iframe
        src={gmapsSrc}
        className={styles.frame}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title={`${label} 위치 약도`}
        allowFullScreen
      />
      <div className={styles.links} role="group" aria-label="길찾기 앱으로 열기">
        <a href={naverPlaceUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <span className={styles.linkIcon} style={{ background: '#03C75A', color: '#fff' }}>N</span>
          네이버 지도
        </a>
        <a href={kakaoUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
          <span className={styles.linkIcon} style={{ background: '#FEE500', color: '#191600' }}>K</span>
          카카오 지도
        </a>
      </div>
    </div>
  );
}
