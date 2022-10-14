import authentication from './utilities/authentication';
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const accessToken = await authentication(req, res);

  if (accessToken.success) {
    const prisma = new PrismaClient();

    const authentication = await prisma.authentication.findUnique({
      where: { accessToken: accessToken.success },
      include: {
        student: {
          select: {
            id: true,
          },
        },
      },
    });

    const student = authentication.student;

    const studentColleges = await prisma.college.findMany({
      where: { students: { some: { studentId: student.id } } },
      include: { students: { where: { studentId: student.id } } },
    });

    res.json({ accessToken, studentColleges });
  } else
    res
      .status(400)
      .json({
        error:
          'Credentials invalid. To resolve, please login in again. Thank you.',
      });
}
