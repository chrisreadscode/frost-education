import authentication from '../../authentication/tokens';
import bcrypt from 'bcryptjs';
import { prisma } from '../../../db';

export default async function handler(req, res) {
  const updateStudent = async (prisma, student, data, res) => {
    try {
      const updatedStudent = await prisma.student.update({
        where: { id: student.id },
        data: { ...data },
        select: {
          firstName: true,
          lastName: true,
          username: true,
        },
      });
      return res.json({ accessToken: accessToken, student: updatedStudent });
    } catch (e) {
      return res.status(409).json({
        error: 'Error. Please kindly try again.',
      });
    }
  };

  const accessToken = await authentication(req, res);

  if (accessToken.success) {
    const authentication = await prisma.authentication.findUnique({
      where: { accessToken: accessToken.success },
      select: {
        student: { select: { id: true, password: true } },
      },
    });

    const student = authentication.student;

    let data = req.body;

    if (
      data.username &&
      (!data.username.length || !data.username.includes('@'))
    ) {
      return res.status(400).json({
        error:
          'Email cannot be used. Please kindly try an alternative email address.',
      });
    } else if (data.username || (data.firstName && data.lastName)) {
      return updateStudent(prisma, student, data, res);
    } else if (data.oldPassword) {
      const responseFromQuery = res;

      if (data.newPassword !== data.confirmPassword) {
        return responseFromQuery.status(400).json({
          error: 'New passwords do not match. Please try again.',
        });
      }

      bcrypt.compare(
        data.oldPassword,
        student.password,
        async function (err, res) {
          if (err) {
            return responseFromQuery.status(400).json({
              error: 'Error. Please try again.',
            });
          }

          if (res) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(data.newPassword, salt);

            data = { password: hashedPassword };

            return updateStudent(prisma, student, data, responseFromQuery);
          } else {
            return responseFromQuery.status(400).json({
              error:
                'Entered password does not match existing password. Please try again.',
            });
          }
        }
      );
    }
  } else {
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
  }
}
