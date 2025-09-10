import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

  // ===== Categories =====
  const categories = [
    { name: "Development" },
    { name: "Design" },
    { name: "Marketing" },
    { name: "Data Science" },
  ];
  await prisma.category.createMany({ data: categories, skipDuplicates: true });

  // ===== Skills =====
  const skills = [
    { name: "JavaScript", categoryId: (await prisma.category.findFirst({ where: { name: "Development" } })).id },
    { name: "React", categoryId: (await prisma.category.findFirst({ where: { name: "Development" } })).id },
    { name: "Node.js", categoryId: (await prisma.category.findFirst({ where: { name: "Development" } })).id },
    { name: "UI/UX", categoryId: (await prisma.category.findFirst({ where: { name: "Design" } })).id },
    { name: "Figma", categoryId: (await prisma.category.findFirst({ where: { name: "Design" } })).id },
    { name: "SEO", categoryId: (await prisma.category.findFirst({ where: { name: "Marketing" } })).id },
    { name: "Python", categoryId: (await prisma.category.findFirst({ where: { name: "Data Science" } })).id },
    { name: "Machine Learning", categoryId: (await prisma.category.findFirst({ where: { name: "Data Science" } })).id },
  ];
  await prisma.skill.createMany({ data: skills, skipDuplicates: true });

  // ===== Companies =====
  const companies = [
    { name: "Techify", email: "hr@techify.com", password: "pass", hasSeenOnboarding: true },
    { name: "Designly", email: "jobs@designly.com", password: "pass", hasSeenOnboarding: true },
    { name: "MarketPro", email: "team@marketpro.com", password: "pass", hasSeenOnboarding: true },
  ];
  await prisma.company.createMany({ data: companies, skipDuplicates: true });

  // ===== Jobs =====
  const companyIds = await prisma.company.findMany();
  const categoryIds = await prisma.category.findMany();

  const jobs = [
    {
      title: "Frontend Developer",
      description: "Work on amazing web apps",
      minimum_years_required: 2,
      salary: 8000,
      type: "fullTime",
      location: "Cairo",
      job_status: "open",
      companyId: companyIds[0].id,
      categoryId: categoryIds[0].id,
    },
    {
      title: "Backend Developer",
      description: "Node.js and database work",
      minimum_years_required: 3,
      salary: 9000,
      type: "remote",
      location: "Alexandria",
      job_status: "open",
      companyId: companyIds[0].id,
      categoryId: categoryIds[0].id,
    },
    {
      title: "UI/UX Designer",
      description: "Design web and mobile apps",
      minimum_years_required: 1,
      salary: 7000,
      type: "partTime",
      location: "Cairo",
      job_status: "open",
      companyId: companyIds[1].id,
      categoryId: categoryIds[1].id,
    },
    {
      title: "SEO Specialist",
      description: "Improve search rankings",
      minimum_years_required: 2,
      salary: 7500,
      type: "fullTime",
      location: "Dubai",
      job_status: "open",
      companyId: companyIds[2].id,
      categoryId: categoryIds[2].id,
    },
    {
      title: "Data Scientist",
      description: "Work with ML models",
      minimum_years_required: 4,
      salary: 12000,
      type: "fullTime",
      location: "London",
      job_status: "open",
      companyId: companyIds[2].id,
      categoryId: categoryIds[3].id,
    },
  ];
  await prisma.job.createMany({ data: jobs });

  console.log("✅ Data inserted successfully!");

