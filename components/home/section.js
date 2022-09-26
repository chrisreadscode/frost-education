import Bullet from './bullet';
import Link from 'next/Link';
import styles from '../../styles/home.module.css';

export default function Section(bullets) {
  let sectionCapitalize = '';

  const task = bullets[0];
  if (bullets && task) {
    const sectionArr = task.section.split('-');
    const sectionArrCapitalized = sectionArr.map((word) => {
      const firstLetterCapital = word[0].toUpperCase();
      return firstLetterCapital + word.substring(1);
    });
    sectionCapitalize = sectionArrCapitalized.join(' ');
  }

  return (
    <div className={styles.section}>
      {bullets && task ? (
        <>
          <Link href={bullets[0].pageLink}>
            <a className={`${styles.sectionTitle} ${styles.inherit}`}>
              {sectionCapitalize}
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
