import Button from './button.js';
import CourseMenu from './courseMenu/courseMenu.js';
import { MdMenu, MdOutlineMenuOpen } from 'react-icons/md';
import styles from '../styles/lesson-buttons.module.css';

export default function LessonButtons({ complete, openCourseMenu, setOpenCourseMenu, revealFAQ, setRevealFAQ }) {
  const menu = openCourseMenu ? (
    <MdOutlineMenuOpen size="25" />
  ) : (
    <MdMenu size="25" />
  );
  const showClick = () => setOpenCourseMenu((show) => !show);

  return (
    <div className={styles.container}>
      <div className={openCourseMenu ? styles.openMenu : null}>
        {openCourseMenu ? <CourseMenu complete={complete} /> : null}
        <Button content={menu} onClick={showClick} />
      </div>
    </div>
  );
}
