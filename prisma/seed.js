import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const Saul = { email: 'saul@saul.com', firstName: 'Saul' };

  const student = await prisma.student.create({
    data: Saul,
  });
  console.log('Created student', student);

  const tasks = [
    {
      pageLink: 'intro-1',
      section: 'college-list',
      title: 'intro 1',
    },
    {
      pageLink: 'exercise-1',
      section: 'college-list',
      title: 'exercise 1',
    },
    {
      pageLink: 'lecture-1',
      section: 'college-list',
      title: 'lecture 1',
    },
    {
      pageLink: 'lecture-1',
      section: 'essay',
      title: 'lecture 1',
    },
    {
      pageLink: 'exercise-1',
      section: 'essay',
      title: 'exercise 1',
    },
    {
      pageLink: 'exercise-2',
      section: 'essay',
      title: 'exercise 2',
    },
    {
      pageLink: 'lecture-2',
      section: 'essay',
      title: 'lecture 2',
    },
    {
      pageLink: 'peer-edits',
      section: 'essay',
      title: 'peer edits',
    },
    {
      pageLink: 'exercise-1',
      section: 'capstone-project',
      title: 'exercise 1',
    },
    {
      pageLink: 'lecture-1',
      section: 'capstone-project',
      title: 'lecture 1',
    },
    {
      pageLink: 'lecture-2',
      section: 'capstone-project',
      title: 'lecture 2',
    },
    {
      pageLink: 'exercise-2',
      section: 'capstone-project',
      title: 'exercise 2',
    },
    {
      pageLink: 'lecture-1',
      section: 'meetings',
      title: 'lecture 1',
    },
    {
      pageLink: 'exercise-1',
      section: 'meetings',
      title: 'exercise 1',
    },
    {
      pageLink: 'exercise-2',
      section: 'meetings',
      title: 'exercise 2',
    },
    {
      pageLink: 'lecture-2',
      section: 'meetings',
      title: 'lecture 2',
    },
    {
      pageLink: 'exercise-3',
      section: 'meetings',
      title: 'exercise 3',
    },
  ];

  const curriculum = await prisma.curriculum.createMany({
    data: tasks,
  });
  console.log('added currriculum', curriculum);

  const getCurriculum = await prisma.curriculum.findMany();

  for (let task of getCurriculum) {
    const newTask = await prisma.student.update({
      where: { id: student.id },
      data: {
        curriculum: {
          create: {
            curriculumId: task.id,
          },
        },
      },
    });
    console.log(newTask);
  }
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
