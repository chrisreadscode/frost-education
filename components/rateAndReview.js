import { HiStar } from 'react-icons/hi';
import { setCookie } from 'cookies-next';
import styles from '../styles/lecture.module.css';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RateAndReview({
  nextLessonUrl,
  pillarId,
  positionInSection,
  setReveal,
}) {
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [question, setQuestion] = useState();
  const [feedback, setFeedback] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (rating === 0)
      alert('Please select a rating for this lesson. Thank you!');
    else {
      const data = {
        pillarId,
        positionInSection,
        rating,
        question,
        feedback,
      };

      const JSONdata = JSON.stringify(data);

      const endpoint = '/api/review';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      };

      const response = await fetch(endpoint, options);

      const result = await response.json();

      const { accessToken, error, review } = result;

      if (error) {
        alert(error);
        if (error.toLowerCase().includes('credential')) router.push('/login');
      } else setCookie('accessToken', accessToken);

      if (review) {
        setReveal(false);
        setRating(0);
        setQuestion();
        setFeedback();
        if (pillarId === 2 && positionInSection === 4) router.push('/home');
        else router.push(`${nextLessonUrl}`);
      }
    }
  };

  const descriptions = [
    'Confusing or completely unhelpful',
    'Minorly helpful',
    'Okay, average',
    'Helpful and clear',
    'Extremely helpful and enjoyable',
  ];

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.titleReview}>Rate and Review</div>
        <form className={styles.center} method="post" onSubmit={handleSubmit}>
          <input name="rating" required type="hidden" value={rating} />
          <div className={styles.stars}>
            <HiStar
              color={rating >= 1 ? '#3C97F7' : 'lightgrey'}
              onClick={() => setRating(1)}
              size={50}
            />
            <HiStar
              color={rating >= 2 ? '#3C97F7' : 'lightgrey'}
              onClick={() => setRating(2)}
              size={50}
            />
            <HiStar
              color={rating >= 3 ? '#3C97F7' : 'lightgrey'}
              onClick={() => setRating(3)}
              size={50}
            />
            <HiStar
              color={rating >= 4 ? '#3C97F7' : 'lightgrey'}
              onClick={() => setRating(4)}
              size={50}
            />
            <HiStar
              color={rating === 5 ? '#3C97F7' : 'lightgrey'}
              onClick={() => setRating(5)}
              size={50}
            />
          </div>
          <label className={styles.starDescription}>
            {descriptions[rating - 1]}
          </label>
          <div className={styles.reviewInput}>
            <label>Do you have any questions our teachers can answer?</label>
            <input
              className={styles.textButton}
              name="question"
              onChange={(e) => setQuestion(e.target.value)}
              type="text"
              value={question}
            />
          </div>
          <div className={styles.reviewInput}>
            <label>
              Do you have any thoughts, wishes, comments, suggestions,
              compliants, or issues?
            </label>
            <input
              className={styles.textButton}
              name="feedback"
              onChange={(e) => setFeedback(e.target.value)}
              type="text"
              value={feedback}
            />
          </div>
          <button className={styles.button} type="submit">
            Submit Rate & Review
          </button>
          <div className={styles.close} onClick={() => setReveal(false)}>
            Go Back?
          </div>
        </form>
      </div>
    </div>
  );
}
