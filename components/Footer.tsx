import Link from 'next/link';
import { SITE } from '@/lib/copy';
import Reveal from '@/components/Reveal';
import styles from './Footer.module.css';

export default function Footer() {
  const tel = SITE.phone.replace(/-/g, '');
  return (
    <footer className={styles.footer}>
      <Reveal variant="fade-up">
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
            <a href={`tel:${tel}`}>전화하기</a>
          </div>
        </div>
        <dl className={styles.biz}>
          <div>
            <dt>상호</dt>
            <dd>{SITE.business.legalName} <span className={styles.bizSub}>({SITE.business.category})</span></dd>
          </div>
          <div>
            <dt>대표자</dt>
            <dd>{SITE.business.ceo}</dd>
          </div>
          <div>
            <dt>사업자등록번호</dt>
            <dd>{SITE.business.regNo}</dd>
          </div>
          <div className={styles.bizWide}>
            <dt>주소</dt>
            <dd>{SITE.business.regAddress}</dd>
          </div>
        </dl>
        <div className={styles.copy}>
          &copy; {new Date().getFullYear()} {SITE.name}
        </div>
      </Reveal>
    </footer>
  );
}
