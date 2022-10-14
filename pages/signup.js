import Link from 'next/link';
import { setCookie } from 'cookies-next';
import styles from '../styles/login.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Signup() {
  const [confirmPassword, setConfirmPassword] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [submitClick, setSubmitClick] = useState(false);

  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword)
      alert(
        'Password and Confirm Password do not match. Please kindly try again'
      );
    else setSubmitClick(true);
  };

  useEffect(async () => {
    if (submitClick) {
      setSubmitClick(false);

      const data = {
        email: email,
        confirmPassword: confirmPassword,
        password: password,
        firstName: firstName,
        lastName: lastName,
      };

      const JSONdata = JSON.stringify(data);

      const endpoint = '/api/signup';

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      };

      const response = await fetch(endpoint, options);

      const result = await response.json();

      if (result.success) {
        setCookie('accessToken', result.accessToken);
        setCookie('refreshToken', result.refreshToken);
        router.push('/home');
      } else alert(result.error);
    }
  }, [submitClick]);

  return (
    <div className={styles.page}>
      <div className={styles.login}>
        <img className={styles.logo} src="/frost-education*.png" />
        <form
          action="/api/signup"
          className={`${styles.form} ${styles.form_signup}`}
          method="post"
          onSubmit={handleSubmit}
        >
          <div className={styles.formTitle}>Sign Up</div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              required
              type="email"
              value={email}
            />
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              id="password"
              minLength="5"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              value={password}
            />
            <label className={styles.label} htmlFor="confirm-password">
              Confirm Password
            </label>
            <input
              className={styles.input}
              id="confirm-password"
              minLength="5"
              name="confirm-password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              type="password"
              value={confirmPassword}
            />
            <div className={styles.name}>
              <div className={styles.nameLabelAndInput}>
                <label className={styles.label} htmlFor="first-name">
                  First Name
                </label>
                <input
                  className={styles.input}
                  id="first-name"
                  minLength="1"
                  name="first-name"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  type="text"
                  value={firstName}
                />
              </div>
              <div className={styles.nameLabelAndInput}>
                <label className={styles.label} htmlFor="first-name">
                  Last Name
                </label>
                <input
                  className={styles.input}
                  id="last-name"
                  minLength="1"
                  name="last-name"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  type="text"
                  value={lastName}
                />
              </div>
            </div>
            <button
              className={`${styles.input} ${styles.button}`}
              type="submit"
            >
              Sign Up
            </button>
          </div>
          <div className={styles.signup}>
            Already have an account?{' '}
            <Link href="/login">
              <a>Log In</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
