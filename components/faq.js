import { setCookie } from 'cookies-next';
import styles from '../styles/lecture.module.css';
import { useState } from 'react';

export default function FAQ({ pillarId, positionInSection, setRevealFAQ }) {
  const [questionInFAQ, setQuestionInFAQ] = useState();

  const handleSubmitQuestion = async (e) => {
    e.preventDefault();

    if (!questionInFAQ)
      alert('Please submit a question or exit the FAQ. Thank you!');
    else {
      const data = {
        pillarId,
        positionInSection,
        question: questionInFAQ,
      };

      const JSONdata = JSON.stringify(data);

      const endpoint = '/api/question';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      };

      const response = await fetch(endpoint, options);

      const result = await response.json();

      const { accessToken, error, question } = result;

      if (error) {
        alert(error);
        if (error.toLowerCase().includes('credential')) router.push('/login');
      } else setCookie('accessToken', accessToken);

      if (question) {
        setRevealFAQ(false);
        setQuestionInFAQ();
      }
    }
  };

  return (
    <div className={styles.relative}>
      <div className={styles.containerFAQ}>
        <div className={styles.titleReview}>FAQs</div>
        <div className={styles.column}>
          <form className={styles.column} onSubmit={handleSubmitQuestion}>
            <label className={styles.extraSpacing}>
              Ask Your Question Here{' '}
              <span className={styles.italics}>
                - a member of our team will reach back out to you shortly
              </span>
            </label>
            <input
              className={styles.textButton}
              name="question"
              onChange={(e) => setQuestionInFAQ(e.target.value)}
              value={questionInFAQ}
            />
            <button className={`${styles.button} ${styles.extraMargin}`}>
              Submit Question
            </button>
          </form>
          <div className={styles.close} onClick={() => setRevealFAQ(false)}>
            Go Back?
          </div>
        </div>
      </div>
      <div className={styles.pageFAQ} />
    </div>
  );
}
