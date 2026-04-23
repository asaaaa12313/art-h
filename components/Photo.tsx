import { CSSProperties } from 'react';
import Image from 'next/image';
import styles from './Photo.module.css';

type Props = {
  bg?: string;
  src?: string;
  label?: string;
  alt?: string;
  style?: CSSProperties;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
};

export default function Photo({
  bg,
  src,
  label,
  alt,
  style,
  priority = false,
  sizes = '100vw',
  objectPosition = 'center',
}: Props) {
  const ariaLabel = alt || label || 'Art H Dental';

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={styles.photo}
      style={{ background: bg || 'var(--c-warm)', ...style }}
    >
      {src && (
        <Image
          src={src}
          alt={ariaLabel}
          fill
          priority={priority}
          sizes={sizes}
          style={{ objectFit: 'cover', objectPosition }}
          className={styles.image}
        />
      )}
      {!src && <div className={styles.pattern} aria-hidden="true" />}
      {label && (
        <div className={styles.label} aria-hidden="true">
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}
