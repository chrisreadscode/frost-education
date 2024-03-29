import authentication from '../authentication/tokens';
import { prisma } from '../../db';

export default async function handler(req, res) {
  const accessToken = await authentication(req, res);

  if (accessToken.success) {
    const authentication = await prisma.authentication.findUnique({
      where: { accessToken: accessToken.success },
      include: {
        student: true,
      },
    });

    const student = authentication.student;

    const { suggestion: collegeName } = req.body;

    const college = await prisma.college.update({
      where: { name: collegeName },
      data: { students: { create: { studentId: student.id } } },
    });

    res.json({ accessToken, college });
  } else
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
}
