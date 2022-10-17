import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../../db';

export default async function handler(req, res) {
  const data = req.body;
  const {
    email,
    password,
    confirmPassword,
    firstName = '',
    lastName = '',
  } = data;
  const program = 'Regular Admissions';

  if (email && email.length && email.includes('@')) {
    if (password === confirmPassword) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const student = {
        firstName,
        lastName,
        password: hashedPassword,
        program,
        username: email,
      };

      const username = student.username;

      let addStudent;
      try {
        addStudent = await prisma.student.create({ data: student });
      } catch (e) {
        console.log('err', e);
        res.status(409).json({
          error:
            'Email already exists. Please log in on the login page or try to sign up again with a different email address.',
        });
      } finally {
        // create a new course progression
        const getCourseContent = await prisma.coursePage.findMany();

        for (let coursePage of getCourseContent) {
          const newCoursePageProgressForStudent = await prisma.student.update({
            where: { id: addStudent.id },
            data: {
              studentsProgress: {
                create: {
                  coursePageId: coursePage.id,
                },
              },
            },
          });
        }

        const accessToken = jwt.sign(
          { studentEmail: username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '20m' }
        );
        const refreshToken = jwt.sign(
          { studentEmail: username },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '7d' }
        );
        const addToken = await prisma.student.update({
          where: { id: addStudent.id },
          data: {
            authentication: {
              create: { accessToken: accessToken, refreshToken: refreshToken },
            },
          },
        });
        res.status(200).json({
          success: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
    } else
      res.status(400).json({
        status: 'error',
        error: 'Passwords do not match. Please try again.',
      });
  } else
    res.status(403).json({
      status: 'error',
      error: 'Valid email input not found. Please try again.',
    });
}
