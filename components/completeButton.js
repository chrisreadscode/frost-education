import styles from '../styles/complete-button.module.css';

export default function CompleteButton({ onClick }) {
  return (
    <div className={styles.completeButtonContainer}>
      <button className={styles.button} onClick={onClick}>
        Mark as Complete
      </button>
    </div>
  );
}
