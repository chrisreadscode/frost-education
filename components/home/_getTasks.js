import { useEffect, useState } from 'react';

export default function GetTasks() {
  const [collegeList, setCollegeList] = useState([]);
  const [essay, setEssay] = useState([]);
  const [capstoneProject, setCapstoneProject] = useState([]);
  const [meetings, setMeetings] = useState([]);

  useEffect(async () => {
    const data = await fetch('/api/student-curriculum').then((res) =>
      res.json()
    );

    for (let task of data) {
      const _task = new Task(
        task.complete,
        task.curriculum.pageLink,
        task.curriculum.section,
        task.curriculum.title
      );
      if (_task.section === 'college-list')
        setCollegeList((data) => [...data, _task]);
      else if (_task.section === 'essay') setEssay((data) => [...data, _task]);
      else if (_task.section === 'capstone-project')
        setCapstoneProject((data) => [...data, _task]);
      else if (_task.section === 'meetings')
        setMeetings((data) => [...data, _task]);
    }

    setCollegeList((arr) => {
      const newArray = [...arr];
      return newArray.reverse();
    });
    setEssay((arr) => {
      const newArray = [...arr];
      return newArray.reverse();
    });
    setCapstoneProject((arr) => {
      const newArray = [...arr];
      return newArray.reverse();
    });
    setMeetings((arr) => {
      const newArray = [...arr];
      return newArray.reverse();
    });
  }, []);

  return {collegeList, essay, capstoneProject, meetings};
}

class Task {
  constructor(complete, pageLink, section, title) {
    this.complete = complete;
    this.pageLink = pageLink;
    this.section = section;
    this.title = title;
  }
}