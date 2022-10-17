import Link from 'next/link';
import { setCookie } from 'cookies-next';
import styles from '../styles/navigation.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import next from 'next';

export default function Navigation({ navigationCategory }) {
  const router = useRouter();

  const [supportActivated, setSupportActivated] = useState(false);
  const [nextLessonUrl, setNextLessonUrl] = useState('/home');
  const [firstName, setFirstName] = useState('');

  const student = 'Saul';
  const mailto = `mailto:support@frost.education?subject=Support | ${firstName}&body=Please kindly let us know here what issue you're facing. We'll get back to you shortly !`;

  const square = styles.square;
  const squareActive = `${styles.square} ${styles.squareActive}`;

  const profile = styles.profile;
  const profileActive = `${styles.profile} ${styles.profileActive}`;

  useEffect(async () => {
    const endpoint = '/api/next-lesson';
    const response = await fetch(endpoint);
    const data = await response.json();

    const { accessToken, error, nextUrl } = data;

    if (error) {
      alert(error);
      if (error.toLowerCase().includes('credential')) router.push('/login');
    } else setCookie('accessToken', accessToken);

    setNextLessonUrl(nextUrl);
  }, []);

  useEffect(async () => {
    const endpoint = '/api/settings/profile/update';
    const response = await fetch(endpoint);
    const data = await response.json();

    const { accessToken, error, student } = data;

    if (error) {
      alert(error);
      if (error.toLowerCase().includes('credential')) router.push('/login');
    } else setCookie('accessToken', accessToken);

    setFirstName(student.firstName);
  }, []);

  return (
    <>
      <Link href="/home">
        <img className={styles.image} src="/frost-education*.png" width={200} />
      </Link>
      <div className={styles.navigationBar}>
        <div className={styles.linksContainer}>
          <Link href="/home">
            <div className={styles.linkContainer}>
              <div
                className={
                  navigationCategory === 'home' ? squareActive : square
                }
              />
              <a className={styles.link}>Home</a>
            </div>
          </Link>
          <Link href={nextLessonUrl}>
            <div className={styles.linkContainer}>
              <div
                className={
                  navigationCategory === 'lessons' ? squareActive : square
                }
              />
              <a className={styles.link}>Lessons</a>
            </div>
          </Link>
          <div
            className={styles.support}
            onClick={() => {
              setSupportActivated(true);
              window.location.href = mailto;
            }}
          >
            <div className={styles.linkContainer}>
              <div className={supportActivated ? squareActive : square} />
              <a className={styles.link}>Support</a>
            </div>
          </div>
          <Link href="/settings">
            <div className={styles.linkContainer}>
              <div
                className={
                  navigationCategory === 'profile' ? profileActive : profile
                }
              />
              <a className={styles.link}>Profile</a>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
