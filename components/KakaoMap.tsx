'use client';

import { useEffect, useRef, useState } from 'react';
import Photo from './Photo';
import { V } from '@/lib/visuals';

declare global {
  interface Window {
    kakao: any;
  }
}

type Props = {
  lat?: number;
  lng?: number;
  label?: string;
};

// 송도 C8-2블럭 가안 좌표 (개원 시 정확한 좌표로 교체)
const DEFAULT_LAT = 37.3862;
const DEFAULT_LNG = 126.6438;

export default function KakaoMap({
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  label = '아트에이치치과',
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  const key = process.env.NEXT_PUBLIC_KAKAO_MAP_KEY;

  useEffect(() => {
    if (!key) { setFailed(true); return; }

    const init = () => {
      if (!window.kakao?.maps || !ref.current) return;
      window.kakao.maps.load(() => {
        const map = new window.kakao.maps.Map(ref.current, {
          center: new window.kakao.maps.LatLng(lat, lng),
          level: 4,
        });
        new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(lat, lng),
          map,
          title: label,
        });
        setReady(true);
      });
    };

    if (window.kakao?.maps) { init(); return; }

    const existing = document.querySelector<HTMLScriptElement>('script[data-kakao-map]');
    if (existing) {
      existing.addEventListener('load', init);
      existing.addEventListener('error', () => setFailed(true));
      return () => existing.removeEventListener('load', init);
    }

    const s = document.createElement('script');
    s.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${key}&autoload=false`;
    s.async = true;
    s.setAttribute('data-kakao-map', '1');
    s.onload = init;
    s.onerror = () => setFailed(true);
    document.head.appendChild(s);
  }, [key, lat, lng, label]);

  if (failed || !key) {
    return <Photo bg={V.city} label="송도 센트럴파크 일대" alt="지도 플레이스홀더" />;
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <div ref={ref} style={{ width: '100%', height: '100%', minHeight: 240 }} />
      {!ready && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <Photo bg={V.city} label="지도 로딩중" alt="지도 로딩중" />
        </div>
      )}
    </div>
  );
}
