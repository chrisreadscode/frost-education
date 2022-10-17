import authentication from '../authentication/tokens';
import '@gouch/to-title-case';
import { prisma } from '../../db';

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

    const { coursePageId } = req.body;

    const coursePageProgress = await prisma.studentProgress.findUnique({
      where: {
        coursePageId_studentId: {
          coursePageId: coursePageId,
          studentId: student.id,
        },
      },
    });

    res.json({ accessToken, coursePageProgress });
  } else
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
}
