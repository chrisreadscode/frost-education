import authentication from './authentication/tokens';
import { prisma } from '../db';

export default async function handler(req, res) {
  const accessToken = await authentication(req, res);

  if (accessToken.success) {
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
      include: {
        coursePages: {
          include: {
            studentsProgress: { where: { studentId: student.id } },
          },
          orderBy: [{ positionInSection: 'asc' }],
        },
      },
    });

    res.json({ accessToken, coursePagesByPillar });
  } else
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
}
