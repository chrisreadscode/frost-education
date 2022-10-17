import authentication from './authentication/tokens';
import { prisma } from '../../db';

export default async function handler(req, res) {
  const accessToken = await authentication(req, res);

  if (accessToken.success) {
    const coursePillars = await prisma.coursePillar.findMany({
      include: {
        coursePages: true,
      },
    });

    res.json({ accessToken, coursePillars });
  } else
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
}
