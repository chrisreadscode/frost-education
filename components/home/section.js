import Bullet from './bullet';
import capitalize from '../../utilities';
import Link from 'next/Link';
import styles from '../../styles/home.module.css';

export default function Section(bullets) {
  let sectionTitle = '';

  const task = bullets[0];
  if (bullets && task) sectionTitle = capitalize(task.section)

  return (
    <div className={styles.section}>
      {bullets && task ? (
        <>
          <Link href={bullets[0].section}>
            <a className={`${styles.sectionTitle} ${styles.inherit}`}>
              {sectionTitle}
            </a>
          </Link>
          <div className={styles.bullets}>
            {bullets.map((bullet) => Bullet(bullet))}
          </div>
        </>
      ) : null}
    </div>
  );
}
