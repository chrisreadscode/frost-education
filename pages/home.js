import '@gouch/to-title-case';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import styles from '../styles/home.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Navigation from '../components/navigation';

export default function Home() {
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [pillar, setPillar] = useState('');
  const [title, setTitle] = useState('');
  const [nextUrl, setNextUrl] = useState('');

  useEffect(async () => {
    const response = await fetch('/api/student');
    const data = await response.json();

    const { accessToken, error, student } = data;

    if (error) {
      alert('Credentials have expired. Please login again.');
      router.push('/login');
    } else setCookie('accessToken', accessToken);

    if (student) setFirstName(student.firstName);
  }, []);

  useEffect(async () => {
    const endpoint = '/api/next-lesson';
    const response = await fetch(endpoint);
    const data = await response.json();

    const { accessToken, error, nextUrl, _pillarName, _title } = data;

    if (error) {
      alert(error);
      if (error.toLowerCase().includes('credential')) router.push('/login');
    } else setCookie('accessToken', accessToken);

    if (_pillarName) setPillar(_pillarName.toTitleCase());
    if (_title) setTitle(_title);
    if (nextUrl) setNextUrl(nextUrl);
  }, []);

  const mailto = `mailto:support@frost.education?subject=Office Hours | Ivy League Consultants | ${firstName}&body=Please kindly let us know if you're interested in speaking with Ivy League Consultants. We'll get back to you shortly !`;

  return (
    <>
      <Navigation navigationCategory={'home'} />
      <div className={styles.welcome}>
        Welcome back{firstName.length ? `, ${firstName}!` : '!'}
      </div>
      <div className={styles.courseBoxesContainer}>
        <div className={styles.containerTitle}>Continue Your Journey</div>
        <div className={styles.row}>
          <Link href={nextUrl}>
            <div className={styles.bigBlueSquare}>
              <div className={styles.containerTitle}>
                {pillar.toUpperCase()}
              </div>
              <div className={styles.containerTitle}>{title}</div>
            </div>
          </Link>
          <div className={styles.smallerSquaresContainer}>
            <div>
              <div className={styles.smallerSquare}>College To Do List</div>
              <Link href="/college-list">
                <div
                  className={`${styles.smallerSquare} ${styles.smallerSquareUnlocked}`}
                >
                  College List
                </div>
              </Link>
            </div>
            <div>
              <div className={styles.smallerSquare}>Personal Essay</div>
              <div className={styles.smallerSquare}>Expert Contacts</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.frostNewsContainer}>
        <div className={styles.containerTitle}>Frost News</div>
        <div
          className={`${styles.smallerSquare} ${styles.frostNewsSquare}`}
          onClick={() => {
            window.location.href = mailto;
          }}
        >
          <div className={styles.frostNewsSquareText}>Office Hours</div>
          <div className={styles.frostNewsSquareText}>
            Speak with Ivy League Consultants
          </div>
          <div className={styles.frostNewsSquareText}>Click to Signup!</div>
        </div>
      </div>
    </>
  );
}
