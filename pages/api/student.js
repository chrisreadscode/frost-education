import { PrismaClient } from '@prisma/client';

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  const student = await prisma.student.findUnique({
    where: { email: 'saul@saul.com' },
  });

  res.json(student);
}
