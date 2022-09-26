import { useEffect, useState } from 'react';

export default function GetStudent() {
  const [student, setStudent] = useState();

  useEffect(async () => {
    const data = await fetch('/api/student').then((res) => res.json());
    setStudent(data);
  }, []);

  return student;
}
