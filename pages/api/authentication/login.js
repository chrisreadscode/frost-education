import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../db';

export default async function handler(req, res) {
  const data = req.body;
  const { email, password } = data;

  const student = await prisma.student.findUnique({
    where: { username: email },
  });

  const response = res;

  if (!student) {
    response.status(401).json({
      error:
        'Unrecognized email or password. Please try a different email or password.',
    });
  }

  bcrypt.compare(password, student.password, async function (err, res) {
    if (err) {
      console.log('err',err);
    }
    if (res) {
      const accessToken = jwt.sign(student, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '20m',
      });
      const refreshToken = jwt.sign(student, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
      });

      const authentication = await prisma.authentication.upsert({
        where: { studentId: student.id },
        update: {
          accessToken: accessToken,
          refreshToken: refreshToken,
        },
        create: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          studentId: student.id,
        },
      });

      response.status(200).json({
        success: true,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    } else {
      response.status(401).json({
        error:
          'Unrecognized email or password. Please try a different email or password.',
      });
    }
  });
}
