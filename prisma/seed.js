import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const student = await prisma.student.create({
    data: { firstName: 'Saul' },
  });
  console.log('Created student');

  const curriculumAdd = await prisma.curriculum.create({
    data: {
      section: 'college_list',
      title: 'Add',
      students: {
        create: [
          { assignedBy: student.firstName, student: { connect: { id: 1 } } },
        ],
      },
    },
  });
  console.log('add currriculum');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
