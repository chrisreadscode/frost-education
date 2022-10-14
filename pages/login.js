import Link from 'next/link';
import { setCookie } from 'cookies-next';
import styles from '../styles/login.module.css';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitClick, setSubmitClick] = useState(false);

  const router = useRouter();

  const mailto = `mailto:support@frost.education?subject=Password Reset&body=Please kindly send this email from your Frost associated account and we'll send you a temporary password. Thank you !`;

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitClick(true);
  };

  useEffect(async () => {
    if (submitClick) {
      setSubmitClick(false);

      const data = {
        email: email,
        password: password,
      };

      const JSONdata = JSON.stringify(data);

      const endpoint = '/api/login';

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
          action="/api/login"
          className={styles.form}
          method="post"
          onSubmit={handleSubmit}
        >
          <div className={styles.formTitle}>Sign In</div>
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
            <div className={styles.passwordTitleLine}>
              <label className={styles.label} htmlFor="password">
                Password
              </label>
              <div
                className={styles.forgot}
                onClick={() => (window.location.href = mailto)}
              >
                Forgot Password?
              </div>
            </div>
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
            <button
              className={`${styles.input} ${styles.button}`}
              type="submit"
            >
              Login
            </button>
          </div>
          <div className={styles.signup}>
            Don't have an account?{' '}
            <Link href="/signup">
              <a>Sign Up</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
