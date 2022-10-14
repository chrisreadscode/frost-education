import Pillar from './pillar';
import { setCookie } from 'cookies-next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function CourseMenu({ complete }) {
  const [courseMenu, setCourseMenu] = useState([]);

  const router = useRouter();

  useEffect(async () => {
    const response = await fetch('/api/course-menu');
    const { accessToken, coursePagesByPillar, error } = await response.json();
    if (error) {
      alert(error);
      router.push('/login');
    } else setCookie('accessToken', accessToken);

    setCourseMenu(coursePagesByPillar);
  }, [complete]);

  return (
    <div>
      {courseMenu.map((pillarPieces) => (
        <Pillar pillarPieces={pillarPieces} />
      ))}
    </div>
  );
}
