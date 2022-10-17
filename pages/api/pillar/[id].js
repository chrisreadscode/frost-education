import authentication from './authentication/tokens';
import { prisma } from '../../db';

export default async function handler(req, res) {
  // Left off: refactor this and maybe remove it?
  const accessToken = await authentication(req, res);

  if (accessToken.success) {
    const { id: pillarId } = req.query;

    const positionInSection = req.body;

    const pillarPages = await prisma.coursePage.findMany({
      where: { pillarId: parseInt(pillarId) },
      include: { pillar: true },
      orderBy: [{ positionInSection: 'asc' }],
    });

    let pillarPage;
    if (positionInSection < pillarPages.length)
      pillarPage = pillarPages[positionInSection];
    else if (parseInt(pillarId) < 6) {
      const pillarPages = await prisma.coursePage.findMany({
        where: { pillarId: parseInt(pillarId) + 1 },
        include: { pillar: true },
        orderBy: [{ positionInSection: 'asc' }],
      });
      pillarPage = pillarPages[0];
    } else pillarPage = { category: 'finished' };

    res.json({ accessToken: accessToken.success, pillarPage });
  } else
    res.status(400).json({
      error:
        'Credentials invalid. To resolve, please login in again. Thank you.',
    });
}
