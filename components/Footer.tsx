import Link from 'next/link';
import { SITE } from '@/lib/copy';
import styles from './Footer.module.css';

export default function Footer() {
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL;
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.brand}>
          <span className={styles.name}>Art H</span>
          <span className={styles.meta}>
            {SITE.address.replace('인천광역시 연수구 송도동 ', '인천 연수구 송도동 ')} · {SITE.phone}
          </span>
        </div>
        <div className={styles.links}>
          <Link href="/about">의원소개</Link>
          <Link href="/location">오시는길</Link>
          {bookingUrl ? (
            <a href={bookingUrl} target="_blank" rel="noopener noreferrer">
              예약
            </a>
          ) : (
            <span>예약</span>
          )}
        </div>
      </div>
      <div className={styles.copy}>
        &copy; {new Date().getFullYear()} {SITE.name}
      </div>
    </footer>
  );
}
