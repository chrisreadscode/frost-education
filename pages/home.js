import GetStudent from '../components/_getStudent';
import GetTasks from '../components/home/_getTasks';
import Link from 'next/Link';
import Section from '../components/home/section';
import styles from '../styles/home.module.css';
import { useEffect, useState } from 'react';

export default function Home() {
  const tasks = GetTasks();

  const [collegeList, setCollegeList] = useState([]);
  const [essay, setEssay] = useState([]);
  const [capstoneProject, setCapstoneProject] = useState([]);
  const [meetings, setMeetings] = useState([]);

  const student = GetStudent();

  useEffect(() => {
    setCollegeList(tasks.collegeList);
    setEssay(tasks.essay);
    setCapstoneProject(tasks.capstoneProject);
    setMeetings(tasks.meetings);
  }, [tasks]);

  const colleges = [
    'Harvard',
    'MIT',
    'USC',
    'LSE',
    'Charles Uni',
    'U Michigan',
    'UCLA',
  ];

  const mailto = `mailto:support@frost.education?subject=Support | ${student ? student.firstName : ''}&body=Please kindly let us know here what issue you're facing. We'll get back to you shortly !`;

  return (
    <div className={styles.blueBackground}>
      <button
        className={`${styles.support} ${styles.inherit}`}
        onClick={() => {
          window.location.href = mailto;
        }}
      >
        <div>Tech Support &</div>
        <div>Report a Problem</div>
      </button>
      <Link href="/home">
        <a className={`${styles.frostTitle} ${styles.inherit}`}>
          Frost Education*
        </a>
      </Link>
      <div className={styles.sections}>
        {Section(collegeList)}
        {Section(essay)}
        {Section(capstoneProject)}
        {Section(meetings)}
      </div>
      <div className={styles.collegeList}>
        {colleges.map((college) => (
          <div className={styles.college}>{college}</div>
        ))}
      </div>
      <style jsx global>{`
        html,
        body {
          background: #5695f0;
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
      `}</style>
    </div>
  );
}
