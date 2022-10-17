import authentication from './utilities/authentication';
import '@gouch/to-title-case';
import { prisma } from '../db';

export default async function handler(req, res) {
  const accessToken = await authentication(req, res);

  if (accessToken.success) {
    const { pillarId, positionInSection, rating, question, feedback } =
      req.body;

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

    const coursePage = await prisma.coursePage.findUnique({
      where: {
        coursePagePillarPositionInSection: {
          pillarId: pillarId,
          positionInSection: positionInSection,
        },
      },
      select: {
        id: true,
      },
    });

    const review = await prisma.review.create({
      data: {
        coursePageId: coursePage.id,
        studentId: student.id,
        rating,
        question,
        feedback,
      },
    });

    res.json({ accessToken, review });
  } else
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
}
