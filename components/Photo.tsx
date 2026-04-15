import { CSSProperties } from 'react';
import styles from './Photo.module.css';

type Props = {
  bg: string;
  label?: string;
  alt?: string;
  style?: CSSProperties;
};

export default function Photo({ bg, label, alt, style }: Props) {
  return (
    <div
      role="img"
      aria-label={alt || label || 'Art H Dental'}
      className={styles.photo}
      style={{ background: bg, ...style }}
    >
      <div className={styles.pattern} aria-hidden="true" />
      {label && (
        <div className={styles.label} aria-hidden="true">
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}
