// npx prisma db seed
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const password = 'password'
  const salt = await bcrypt.genSalt()
  const hashedPassword = await bcrypt.hash(password, salt);
  const Saul = {
    username: 'saul@saul.com',
    firstName: 'Saul',
    password: hashedPassword,
  };

  const student = await prisma.student.create({
    data: Saul,
  });

  const pillarIds = [
    { name: 'introduction', order: 1 },
    { name: 'college-list', order: 2 },
    { name: 'logistics', order: 3 },
    { name: 'essay', order: 4 },
    { name: 'capstone-project', order: 5 },
    { name: 'meetings', order: 6 },
  ];

  const coursePillars = await prisma.coursePillar.createMany({
    data: pillarIds
  });

  const tasks = [
    {
      category: 'lecture',
      pillarId: 1,
      positionInSection: 2,
      title: 'Intro 1',
    },
    {
      category: 'lecture',
      pillarId: 1,
      positionInSection: 1,
      title: 'Welcome to the Course',
      videoLink: 'https://www.youtube.com/watch?v=h21OmjyviC4',
    },
    {
      category: 'exercise',
      pillarId: 1,
      positionInSection: 3,
      title: 'Exercise 1',
    },
    {
      category: 'article',
      pillarId: 2,
      positionInSection: 1,
      title: 'Intro 1',
    },
    {
      category: 'exercise',
      pillarId: 2,
      positionInSection: 2,
      title: 'Exercise 1',
    },
    {
      category: 'lecture',
      pillarId: 2,
      positionInSection: 3,
      title: 'Lecture 1',
    },
    {
      category: 'project',
      pillarId: 2,
      positionInSection: 4,
      title: 'College List',
    },
    {
      category: 'lecture',
      pillarId: 4,
      positionInSection: 1,
      title: 'Lecture 1',
    },
    {
      category: 'exercise',
      pillarId: 4,
      positionInSection: 2,
      title: 'Exercise 1',
    },
    {
      category: 'exercise',
      pillarId: 4,
      positionInSection: 3,
      title: 'Exercise 2',
    },
    {
      category: 'lecture',
      pillarId: 4,
      positionInSection: 4,
      title: 'Lecture 2',
    },
    {
      category: 'exercise',
      pillarId: 4,
      positionInSection: 5,
      title: 'Peer Edits',
    },
    {
      category: 'project',
      pillarId: 4,
      positionInSection: 6,
      title: 'Essay',
    },
    {
      category: 'exercise',
      pillarId: 5,
      positionInSection: 1,
      title: 'Exercise 1',
    },
    {
      category: 'lecture',
      pillarId: 5,
      positionInSection: 2,
      title: 'Lecture 1',
    },
    {
      category: 'lecture',
      pillarId: 5,
      positionInSection: 3,
      title: 'Lecture 2',
    },
    {
      category: 'exercise',
      pillarId: 5,
      positionInSection: 4,
      title: 'Exercise 2',
    },
    {
      category: 'project',
      pillarId: 5,
      positionInSection: 5,
      title: 'Capstone Project',
    },
    {
      category: 'article',
      pillarId: 3,
      positionInSection: 1,
      title: 'Introduction',
    },
    {
      category: 'project',
      pillarId: 3,
      positionInSection: 2,
      title: 'Billing',
    },
    {
      category: 'lecture',
      pillarId: 6,
      positionInSection: 1,
      title: 'Lecture 1',
    },
    {
      category: 'exercise',
      pillarId: 6,
      positionInSection: 2,
      title: 'Exercise 1',
    },
    {
      category: 'exercise',
      pillarId: 6,
      positionInSection: 3,
      title: 'Exercise 2',
    },
    {
      category: 'lecture',
      pillarId: 6,
      positionInSection: 4,
      title: 'Lecture 2',
    },
    {
      category: 'exercise',
      pillarId: 6,
      positionInSection: 5,
      title: 'Exercise 3',
    },
    {
      category: 'project',
      pillarId: 6,
      positionInSection: 6,
      title: 'Meetings',
    },
  ];

  const coursePage = await prisma.coursePage.createMany({
    data: tasks,
  });

  const getCourseContent = await prisma.coursePage.findMany();

  for (let task of getCourseContent) {
    const newTask = await prisma.student.update({
      where: { id: student.id },
      data: {
        studentsProgress: {
          create: {
            coursePageId: task.id,
          },
        },
      },
    });
  }

  const allColleges = await fetch(
    `http://universities.hipolabs.com/search?country=united%20states`
  );
  const data = await allColleges.json();

  const collegeNames = data.map((college) => college.name);

  const dedupe = [...new Set(collegeNames)];

  const colleges = dedupe.map((collegeName) => {
    return { name: collegeName };
  });

  const createColleges = await prisma.college.createMany({
    data: colleges,
  });

  const harvard = await prisma.college.findUnique({
    where: { name: 'Harvard University' },
  });

  const mit = await prisma.college.findUnique({
    where: { name: 'Massachusetts Institute of Technology' },
  });

  const addHarvard = await prisma.student.update({
    where: { id: student.id },
    data: { colleges: { create: { collegeId: harvard.id, choice: 1 } } },
  });

  const addMIT = await prisma.student.update({
    where: { id: student.id },
    data: { colleges: { create: { collegeId: mit.id, choice: 2 } } },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('err', e);
    await prisma.$disconnect();
    process.exit(1);
  });
