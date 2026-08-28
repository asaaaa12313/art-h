import type { Metadata } from 'next';
import Home from './home/Home';
import { SITE, DOCTORS, TREATMENTS, CONTENT_UPDATED } from '@/lib/copy';
import { jsonLdScript, doctorNodeId } from '@/lib/jsonld';

// 홈 canonical — layout에 두면 하위 페이지가 상속받아 전부 '/'가 되므로 페이지마다 명시한다.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

const address = {
  '@type': 'PostalAddress',
  streetAddress: '센트럴로 263 IBS타워 업무동 8층',
  addressLocality: '연수구',
  addressRegion: '인천광역시',
  addressCountry: 'KR',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Dentist',
      '@id': `${SITE_URL}#clinic`,
      name: SITE.name,
      alternateName: 'Art H Dental',
      description:
        '인천 송도 IBS타워 업무동 8층에 위치한 치과. 구강악안면외과 전문의와 치과보존과 전문의가 함께 진료하며, 임플란트·사랑니 발치·신경치료·턱관절·의식하진정·잇몸 스케일링·치아미백을 진료합니다.',
      url: SITE_URL,
      telephone: SITE.phone,
      image: `${SITE_URL}/media/images/waiting/waiting-02.jpg`,
      sameAs: [SITE.naverPlace],
      hasMap: SITE.naverPlace,
      address,
      geo: { '@type': 'GeoCoordinates', latitude: 37.3856, longitude: 126.6438 },
      // 실제 내원 가능 지역 — "송도 치과", "연수구 치과" 같은 지역 질의 대응
      areaServed: [
        { '@type': 'AdministrativeArea', name: '인천광역시 연수구 송도동' },
        { '@type': 'AdministrativeArea', name: '인천광역시 연수구' },
        { '@type': 'Place', name: '송도국제업무단지' },
      ],
      publicAccess: true,
      isAcceptingNewPatients: true,
      currenciesAccepted: 'KRW',
      // 상주 전문의 — 어떤 전문의가 있는 치과인지 명시
      employee: DOCTORS.map((doc, i) => ({
        '@type': 'Physician',
        // /doctor의 Physician 노드와 같은 @id — 자격(hasCredential)이 병원 노드와 한 인물로 이어진다
        '@id': doctorNodeId(SITE_URL, i),
        name: `${doc.name} ${doc.title}`,
        medicalSpecialty: 'Dentistry',
        description: doc.specialty,
      })),
      availableService: TREATMENTS.map((t) => ({
        '@type': 'MedicalProcedure',
        '@id': `${SITE_URL}/treatments/${t.slug}#procedure`,
        name: t.ko,
        alternateName: t.en,
        url: `${SITE_URL}/treatments/${t.slug}`,
      })),
      openingHoursSpecification: [
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Thursday'], opens: '09:30', closes: '20:30' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Friday'], opens: '09:30', closes: '18:30' },
        { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:30', closes: '14:00' },
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      url: SITE_URL,
      name: SITE.name,
      inLanguage: 'ko-KR',
      publisher: { '@id': `${SITE_URL}#clinic` },
      dateModified: CONTENT_UPDATED,
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Home />
    </>
  );
}
