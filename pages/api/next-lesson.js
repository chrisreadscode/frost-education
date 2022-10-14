import authentication from './utilities/authentication';
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const accessToken = await authentication(req, res);

  if (accessToken.success) {
    const prisma = new PrismaClient();

    const authentication = await prisma.authentication.findUnique({
      where: { accessToken: accessToken.success },
      select: {
        student: {
          select: {
            id: true,
          },
        },
      },
    });

    const student = authentication.student;

    const coursePagesByPillar = await prisma.coursePillar.findMany({
      orderBy: [
        {
          order: 'asc',
        },
      ],
      include: {
        coursePages: {
          include: {
            studentsProgress: {
              where: { studentId: student.id },
            },
          },
          orderBy: [{ positionInSection: 'asc' }],
        },
      },
    });

    let nextUrl = '/home';
    let _break = false;
    let _pillarName = '';
    let _title = '';
    for (let pillar of coursePagesByPillar) {
      for (let lesson of pillar.coursePages) {
        const complete = lesson.studentsProgress[0].complete;
        if (!complete) {
          const pillarName = pillar.name;
          _pillarName = pillarName;
          const category = lesson.category;
          const title = lesson.title.toLowerCase().replaceAll(' ', '-');
          _title = lesson.title;
          nextUrl = `/${pillarName}/${category}/${title}`;
          _break = true;
          break;
        }
      }
      if (_break) break;
    }
    res.json({ accessToken, nextUrl, _pillarName, _title, });
  } else
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
}
