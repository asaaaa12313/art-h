import Link from 'next/link';
import styles from './Breadcrumb.module.css';

export type Crumb = { label: string; href?: string };

/**
 * 탐색 경로 표시 — 각 페이지의 BreadcrumbList JSON-LD와 같은 항목·순서를 쓴다.
 * 구조화 데이터는 "화면에 보이는 사실"을 설명하는 수단이므로 둘이 어긋나면 안 된다.
 */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className={styles.nav} aria-label="현재 위치">
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${i}-${c.label}`}>
            {c.href && !last ? (
              <Link href={c.href} className={styles.link}>{c.label}</Link>
            ) : (
              <span className={styles.current} aria-current={last ? 'page' : undefined}>{c.label}</span>
            )}
            {!last && <span className={styles.sep} aria-hidden="true">›</span>}
          </span>
        );
      })}
    </nav>
  );
}
