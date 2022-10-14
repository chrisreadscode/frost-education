import authentication from '../utilities/authentication';
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

    const { complete, coursePageId } = req.body;

    await prisma.studentProgress.update({
      where: {
        coursePageId_studentId: {
          coursePageId: coursePageId,
          studentId: student.id,
        },
      },
      data: { complete },
    });

    res.status(200).json({ accessToken });
  } else
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
}
