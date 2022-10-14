import { useEffect, useState } from 'react';
import CompleteComponent from '../components/completeComponent';
import { setCookie } from 'cookies-next';
import styles from '../styles/lecture.module.css';

export default function CollegeList({
  complete,
  setButtonClick,
  setComplete,
  setReveal,
}) {
  const [collegeList, setCollegeList] = useState([]);

  useEffect(async () => {
    const response = await fetch('/api/college-list');
    const { accessToken, error, studentColleges } = await response.json();
    setCollegeList([]);
    studentColleges.map((_college) => {
      setCollegeList((data) =>
        [
          ...data,
          { name: _college.name, choice: _college.students[0].choice },
        ].sort((a, b) => b.choice - a.choice)
      );
    });
    if (error) {
      alert('Credentials have expired. Please login again.');
      router.push('/login');
    } else setCookie('accessToken', accessToken);
  }, []);

  const [collegeSearch, setCollegeSearch] = useState('');

  const removeFromCollegeList = async (college) => {
    setCollegeList((data) => data.filter((ele) => ele !== college));
    const endpoint = '/api/student-colleges/delete';
    const options = {
      body: JSON.stringify(college),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    };
    const response = await fetch(endpoint, options);
    const { accessToken, error, _college } = await response.json();
    if (error) {
      alert('Credentials have expired. Please login again.');
      router.push('/login');
    } else setCookie('accessToken', accessToken);
  };

  const [suggestions, setSuggestions] = useState([]);

  const addToCollegeList = async (suggestion) => {
    if (collegeList.length < 12) {
      const alreadyInListArr = collegeList.filter(
        (college) => college.name === suggestion
      );

      if (alreadyInListArr.length === 0) {
        setCollegeList((data) =>
          [...data, { name: suggestion }].sort((a, b) => b.choice - a.choice)
        );
        const response = await fetch('/api/student-colleges/add', {
          body: JSON.stringify({ suggestion }),
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
        });
        const data = await response.json();
        const { accessToken, error } = data;
        if (error) {
          alert('Credentials have expired. Please login again.');
          router.push('/login');
        } else setCookie('accessToken', accessToken);

        setCollegeSearch('');
      }
    }
  };

  useEffect(async () => {
    const colleges = await findMatchingColleges(collegeSearch);
    const names = collegeNames(colleges);
    setSuggestions([
      ...names,
      names.length ? 'School Not Here - Ask To Add' : null,
    ]);
  }, [collegeSearch]);

  const findMatchingColleges = async (search) => {
    if (search.length > 0) {
      const urlSearch = search.replaceAll(' ', '%20');
      const response = await fetch(
        `http://universities.hipolabs.com/search?name=${urlSearch}&country=united%20states`
      );
      const data = await response.json();
      return dedupe(data);
    } else return [];
  };

  const dedupe = (colleges) => {
    const filteredColleges = [];

    for (let _college of colleges) {
      let duplicate = false;

      for (let _filteredCollege of filteredColleges) {
        if (_college.name === _filteredCollege.name) duplicate = true;
      }

      if (!duplicate) filteredColleges.push(_college);
    }

    return filteredColleges;
  };

  const collegeNames = (colleges) => {
    const collegeNames = [];
    for (let i = 0; i < 10; i++) {
      if (colleges[i]) collegeNames.push(colleges[i].name);
      else break;
    }
    return collegeNames;
  };

  const mailto = `mailto:support@frost.education?subject=College Missing&body=Please kindly let us know that we're missing a college. We'll get back to you shortly and thank you !`;

  return (
    <div className={styles.workSection}>
      <div className={styles.workSection}>
        <div className={styles.title}>College List</div>
        {/* Search */}
        <div className={styles.center}>
          {/* <label htmlFor="search">Search for a College</label> */}
          <input
            className={`${styles.textButton} ${styles.searchInput}`}
            id="search"
            placeholder="Search for a college..."
            type="text"
            onChange={(e) => setCollegeSearch(e.target.value)}
            value={collegeSearch}
          />
          <div className={styles.left}>
            {suggestions.map((suggestion) => (
              <div
                className={styles.suggestion}
                key={suggestion}
                onClick={() => {
                  if (suggestion === 'School Not Here - Ask To Add')
                    window.location.href = mailto;
                  else addToCollegeList(suggestion);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </div>
        {/* Rank by categories: top/dream and safety */}
        {/* List */}
        {collegeList.map((college, index) => {
          let alreadyChosen = false;
          return (
            <div className={styles.collegeRow} key={index}>
              <div className={styles.collegeBigBlueBox}>
                <div className={styles.collegeName}>{college.name}</div>
                <div>Choice #{college.choice ? college.choice : index + 1}</div>
              </div>
              {/* <label htmlFor="choice">Choice</label>
              <select id="choice">
                {Array.from('x'.repeat(collegeList.length)).map(
                  (_, innerIndex) => {
                    const reachedChoiceNumber =
                      college.choice === innerIndex + 1;
                    if (reachedChoiceNumber) alreadyChosen = true;
                    return (
                      <option
                        key={innerIndex}
                        selected={
                          reachedChoiceNumber ||
                          (innerIndex === index && !alreadyChosen)
                            ? 'selected'
                            : null
                        }
                        value={innerIndex + 1}
                      >
                        {innerIndex + 1}
                      </option>
                    );
                  }
                )}
              </select> */}
              <button
                className={`${styles.button} ${styles.buttonCollegeList}`}
                onClick={() => removeFromCollegeList(college)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>
      <CompleteComponent
        complete={complete}
        setButtonClick={setButtonClick}
        setComplete={setComplete}
        setReveal={setReveal}
      />
    </div>
  );
}
