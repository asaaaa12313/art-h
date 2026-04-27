import Image from 'next/image';
import styles from './MapEmbed.module.css';

type Props = {
  label?: string;
  naverPlaceUrl?: string;
};

const MAP_IMAGE = '/media/images/exterior/map-illustration.jpg';

export default function MapEmbed({
  label = '아트에이치치과',
  naverPlaceUrl = 'https://naver.me/GWW5jD4j',
}: Props) {
  const kakaoUrl = `https://map.kakao.com/link/search/${encodeURIComponent(label + ' 송도 IBS타워')}`;

  return (
    <div className={styles.wrap}>
      <div className={styles.frame}>
        <Image
          src={MAP_IMAGE}
          alt={`${label} 약도 — 송도 IBS타워, 국제업무지구역 1·3·5번 출구 도보 5분`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: 'contain' }}
        />
      </div>
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
