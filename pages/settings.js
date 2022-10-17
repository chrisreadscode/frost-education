import Navigation from '../components/navigation';
import { setCookie } from 'cookies-next';
import styles from '../styles/settings.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Settings() {
  const [activeSection, setActiveSection] = useState('Profile');

  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const router = useRouter();

  useEffect(async () => {
    const endpoint = '/api/settings/profile/update';
    const response = await fetch(endpoint);
    const data = await response.json();
    const { accessToken, error, student } = data;

    if (error) {
      alert('Credentials have expired. Please login again.');
      router.push('/login');
    } else setCookie('accessToken', accessToken);

    if (student) {
      setUsername(student.username);
      setFirstName(student.firstName);
      setLastName(student.lastName);
    }
  }, []);

  const handleSubmit = async (e, dataObj) => {
    e.preventDefault();

    const JSONdata = JSON.stringify(dataObj);

    const endpoint = '/api/profile/update';

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    const data = await response.json();

    const { accessToken, error, student } = data;

    if (error) {
      alert(error);
      if (error.toLowerCase().includes('credential')) router.push('/login');
    } else setCookie('accessToken', accessToken);

    if (student) {
      setUsername(student.username);
      setFirstName(student.firstName);
      setLastName(student.lastName);
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');

      alert('Success!');
    }
  };

  const profile = (
    <div>
      <div>
        <div className={styles.profileTitle}>Username</div>
        <form
          className={styles.form}
          method="post"
          onSubmit={(e) => handleSubmit(e, { username })}
        >
          <div className={styles.inputs}>
            <div className={styles.input}>
              <label className={styles.label} htmlFor="username">
                Username
              </label>
              <input
                className={styles.textButton}
                id="username"
                minLength="1"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
                type="email"
                value={username}
              />
            </div>
          </div>
          <button className={styles.button}>Change Username</button>
        </form>
      </div>
      <div>
        <div className={styles.profileTitle}>Password</div>
        <form
          className={styles.form}
          method="post"
          onSubmit={(e) =>
            handleSubmit(e, { oldPassword, newPassword, confirmPassword })
          }
        >
          <div className={styles.inputs}>
            <div className={styles.input}>
              <label className={styles.label} htmlFor="old-password">
                Old Password
              </label>
              <input
                className={styles.textButton}
                id="old-password"
                minLength="5"
                name="old-password"
                onChange={(e) => setOldPassword(e.target.value)}
                required
                type="password"
                value={oldPassword}
              />
            </div>
            <div className={styles.input}>
              <label className={styles.label} htmlFor="new-password">
                New Password
              </label>
              <input
                className={styles.textButton}
                id="new-password"
                minLength="5"
                name="new-password"
                onChange={(e) => setNewPassword(e.target.value)}
                required
                type="password"
                value={newPassword}
              />
            </div>
            <div className={styles.input}>
              <label className={styles.label} htmlFor="confirm-password">
                Confirm New Password
              </label>
              <input
                className={styles.textButton}
                id="confirm-password"
                minLength="5"
                name="confirm-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                type="password"
                value={confirmPassword}
              />
            </div>
          </div>
          <button className={styles.button}>Change Password</button>
        </form>
      </div>
      <div>
        <div className={styles.profileTitle}>Name</div>
        <form
          className={styles.form}
          method="post"
          onSubmit={(e) => handleSubmit(e, { firstName, lastName })}
        >
          <div className={styles.inputs}>
            <div className={styles.input}>
              <label className={styles.label} htmlFor="first-name">
                First Name
              </label>
              <input
                className={styles.textButton}
                id="first-name"
                minLength="1"
                name="first-name"
                onChange={(e) => setFirstName(e.target.value)}
                required
                type="text"
                value={firstName}
              />
            </div>
            <div className={styles.input}>
              <label className={styles.label} htmlFor="last-name">
                Last Name
              </label>
              <input
                className={styles.textButton}
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
          <button className={styles.button}>Change Name</button>
        </form>
      </div>
    </div>
  );

  const billing = (
    <div>Under construction. Please kindly check back later.</div>
  );

  return (
    <>
      <Navigation navigationCategory={'profile'} />
      <div className={styles.title}>Settings</div>
      <div className={styles.pageSection}>
        <div className={styles.sectionColumn}>
          <div
            className={
              activeSection === 'Profile'
                ? `${styles.sectionTitle} ${styles.sectionActive}`
                : styles.sectionTitle
            }
            onClick={() => setActiveSection('Profile')}
          >
            Profile
          </div>
          <div
            style={{ opacity: '50%' }}
            // className={
            //   activeSection === 'Billing'
            //     ? `${styles.sectionTitle} ${styles.sectionActive}`
            //     : styles.sectionTitle
            // }
            // onClick={() => setActiveSection('Billing')}
          >
            Billing
          </div>
        </div>
        <div className={styles.dataColumn}>
          {/* {activeSection === 'Profile' ? profile : billing} */}
          {profile}
        </div>
      </div>
    </>
  );
}
