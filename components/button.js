import styles from '../styles/button.module.css';

export default function Button({ content, onClick }) {
  return (
    <button className={styles.button} onClick={onClick}>
      {content}
    </button>
  );
}
