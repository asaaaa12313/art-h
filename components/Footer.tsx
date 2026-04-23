import Link from 'next/link';
import { SITE } from '@/lib/copy';
import styles from './Footer.module.css';

export default function Footer() {
  const tel = SITE.phone.replace(/-/g, '');
  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.brand}>
          <span className={styles.name}>Art H</span>
          <span className={styles.meta}>
            {SITE.address} · {SITE.phone}
          </span>
        </div>
        <div className={styles.links}>
          <Link href="/about">의원소개</Link>
          <Link href="/location">오시는길</Link>
          <a href={`tel:${tel}`}>전화문의</a>
        </div>
      </div>
      <div className={styles.copy}>
        &copy; {new Date().getFullYear()} {SITE.name}
      </div>
    </footer>
  );
}
