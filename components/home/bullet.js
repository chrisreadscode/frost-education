import Link from 'next/Link';
import styles from '../../styles/home.module.css';

export default function Bullet(bullet) {
  const circleStyle = bullet.complete ? `${styles.bulletCircle} ${styles.bulletCompletedCircle}`: styles.bulletCircle;

  return (
    <Link href={`${bullet.section}/${bullet.pageLink}`}>
      <a className={`${styles.bulletRow} ${styles.inherit}`}>
        <div className={circleStyle} />
        <div>{bullet.title}</div>
      </a>
    </Link>
  );
}
