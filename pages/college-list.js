import LessonButtons from '../components/lessonButtons';
import Navigation from '../components/navigation';
import { setCookie } from 'cookies-next';
import styles from '../styles/lecture.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RateAndReview from '../components/rateAndReview';
import FAQ from '../components/faq';
import CollegeList from '../components/collegeList';

export default function Lecture() {
  const router = useRouter();

  const [buttonClick, setButtonClick] = useState(false);
  const [complete, setComplete] = useState();
  const [coursePageId, setCoursePageId] = useState();
  const [nextLessonUrl, setNextLessonUrl] = useState('');
  const [openCourseMenu, setOpenCourseMenu] = useState(true);
  const [pillarId, setPillarId] = useState();
  const [positionInSection, setPositionInSection] = useState();
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  useEffect(async () => {
    if (buttonClick && complete !== undefined && coursePageId !== undefined) {
      const data = { complete, coursePageId };
      const obj = {
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      };
      const response = await fetch('/api/course-page/update', obj);

      const { accessToken, error } = await response.json();
      if (error) {
        alert(error);
        router.push('/login');
      } else setCookie('accessToken', accessToken);

      setButtonClick(false);
    }
  }, [buttonClick, complete, coursePageId]);

  useEffect(async () => {
    if (coursePageId) {
      const obj = {
        body: JSON.stringify({ coursePageId }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      };
      const response = await fetch('/api/course-page-progress', obj);
      const data = await response.json();
      const { accessToken, coursePageProgress, error } = data;
      if (error) {
        alert('Credentials have expired. Please login again.');
        router.push('/login');
      } else setCookie('accessToken', accessToken);

      setComplete(coursePageProgress.complete);
    }
  }, [coursePageId]);

  useEffect(async () => {
    // console.log(router.query)
    // if (Object.keys(router.query).length) {
    const hardcoded = { pillar: 'college-list', title: 'College List' };

    const obj = {
      body: JSON.stringify(hardcoded),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };
    const response = await fetch('/api/course-page', obj);
    const data = await response.json();

    let { accessToken, coursePage, error } = data;
    console.log({ coursePage });
    if (error) {
      alert('Credentials have expired. Please login again.');
      router.push('/login');
    } else setCookie('accessToken', accessToken);

    coursePage = coursePage.coursePages[0];
    const {
      id,
      pillarId,
      positionInSection: _positionInSection,
      title,
      videoLink,
    } = coursePage;

    setCoursePageId(id);
    setPillarId(pillarId);
    setPositionInSection(_positionInSection);
    setTitle(title);
    setUrl(videoLink);
    // }
  }, [router]);

  useEffect(async () => {
    if (pillarId && positionInSection) {
      const obj = {
        body: JSON.stringify(positionInSection),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      };
      const response = await fetch(`/api/pillarId/${pillarId}`, obj);
      const data = await response.json();
      const { accessToken, error, pillarPage } = data;
      if (error) {
        alert('Credentials have expired. Please login again.');
        router.push('/login');
      } else setCookie('accessToken', accessToken);

      const pillar = pillarPage.pillar.name;
      const category = pillarPage.category;
      if (category === 'finished') {
        setNextLessonUrl('/home');
      } else {
        const title = pillarPage.title.toLowerCase().replaceAll(' ', '-');
        const newUrl = `/${pillar}/${category}/${title}`;
        setNextLessonUrl(newUrl);
      }
    }
  }, [positionInSection]);

  const [reveal, setReveal] = useState(false);
  const [revealFAQ, setRevealFAQ] = useState(false);

  const showFAQ = () => setRevealFAQ((show) => !show);

  return (
    <>
      <Navigation navigationCategory={'home'} />
      {!reveal ? (
        <div className={styles.pageContainer}>
          <LessonButtons
            complete={complete}
            openCourseMenu={openCourseMenu}
            setOpenCourseMenu={setOpenCourseMenu}
          />
          <button className={styles.buttonFAQ} onClick={showFAQ}>
            FAQ
          </button>
          {revealFAQ ? (
            <FAQ
              pillarId={pillarId}
              positionInSection={positionInSection}
              setRevealFAQ={setRevealFAQ}
            />
          ) : null}
          <CollegeList
            complete={complete}
            setButtonClick={setButtonClick}
            setComplete={setComplete}
            setReveal={setReveal}
          />
        </div>
      ) : (
        <RateAndReview
          nextLessonUrl={nextLessonUrl}
          pillarId={pillarId}
          positionInSection={positionInSection}
          setReveal={setReveal}
        />
      )}
    </>
  );
}
