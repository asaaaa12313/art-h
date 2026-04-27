import Home from './home/Home';
import { SITE } from '@/lib/copy';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://art-h-dental.example.com';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Dentist',
  name: SITE.name,
  alternateName: 'Art H Dental',
  url: SITE_URL,
  telephone: SITE.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '센트럴로 263 IBS타워 업무동 8층',
    addressLocality: '연수구',
    addressRegion: '인천광역시',
    addressCountry: 'KR',
  },
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Thursday'], opens: '09:30', closes: '20:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Friday'], opens: '09:30', closes: '18:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '09:30', closes: '14:00' },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Home />
    </>
  );
}
