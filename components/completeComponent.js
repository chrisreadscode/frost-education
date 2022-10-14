import CompleteButton from './completeButton';
import { FaCheck } from 'react-icons/fa';
import { IoIosArrowDroprightCircle } from 'react-icons/io';
import styles from '../styles/lecture.module.css';

export default function CompleteComponent({
  complete,
  setButtonClick,
  setComplete,
  setReveal,
}) {
  const changeComplete = () => {
    setButtonClick(true);
    setComplete((bool) => !bool);
  };

  const nextLesson = () => setReveal(true);

  const GreenCheck = () => {
    return (
      <div className={styles.centerButton}>
        <div className={styles.centerButton}>
          <FaCheck color="green" size="50" />
          <div className={styles.removeClick} onClick={changeComplete}>
            (Click here to remove completion for this page)
          </div>
        </div>
        <div className={styles.arrowContainer} onClick={nextLesson}>
          <div>Next Lesson</div>
          <IoIosArrowDroprightCircle size={30} />
        </div>
      </div>
    );
  };

  return (
    <div className={styles.completeButtonContainer}>
      {complete ? <GreenCheck /> : <CompleteButton onClick={changeComplete} />}
    </div>
  );
}
