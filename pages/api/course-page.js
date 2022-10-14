import authentication from './utilities/authentication';
import '@gouch/to-title-case';
import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const accessToken = await authentication(req, res);

  if (accessToken.success) {
    const prisma = new PrismaClient();

    const { pillar: pillarName, title: urlTitle } = req.body;

    const capitals = urlTitle.toTitleCase();
    const title = capitals.replaceAll('-', ' ');

    try {
      const coursePage = await prisma.coursePillar.findUnique({
        where: {
          name: pillarName,
        },
        include: {
          coursePages: {
            where: { title: title },
          },
        },
      });
      res.json({ accessToken, coursePage });
    } catch (err) {
      if (!err.message.includes('toTitleCase'))
        res.status(500).json({ accessToken, error: 'internal server error' });
    }
  } else
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
}
