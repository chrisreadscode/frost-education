import jwt from 'jsonwebtoken';
import { prisma } from '../../db';

// returns either accessToken.success with working token, or accessToken.error
export default async function (req, res) {
  const { accessToken = '', refreshToken = '' } = req.cookies;

  try {
    // if succeeds, proceed to page with existing access token
    const decodedAccess = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    return { success: accessToken };
  } catch (err) {
    console.log('authentication.js', { err });
    // failed accessToken - now check refresh token
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      try {
        const decodedRefresh = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET
        );

        // update access token with working refresh token
        // first - find student the refresh token is associated with
        const studentAuthentication = await prisma.authentication.findUnique({
          where: { refreshToken: refreshToken },
          select: {
            student: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        });

        const student = studentAuthentication.student;

        // second - create a new token
        const newToken = jwt.sign(
          { username: student.username },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '20m' }
        );

        // third - add new token to student table
        const authentication = await prisma.authentication.update({
          where: { studentId: student.id },
          data: {
            accessToken: newToken,
          },
        });

        // return new token
        return { success: newToken };
      } catch (err) {
        // if decodedRefresh fails, redirect to login page
        console.log('authentication.js', { err });
        return { error: 'login' };
      }
    } else {
      // if an unexpected case happens, redirect to login page
      return { error: 'login' };
    }
  }
}
