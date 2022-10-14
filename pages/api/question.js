import authentication from './utilities/authentication';
import '@gouch/to-title-case';
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const accessToken = await authentication(req, res);

  if (accessToken.success) {
    const prisma = new PrismaClient();

    const { pillarId, positionInSection, question } = req.body;

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

    const questionPrisma = await prisma.question.create({
      data: {
        coursePageId: coursePage.id,
        studentId: student.id,
        question,
      },
    });

    res.json({ accessToken, question: questionPrisma });
  } else
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
}
