// prisma/seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

  // أولاً نضيف شوية categories
  const categories = [
    { name: "marketing" },
    { name: "graphic Design" },
    { name: "software Engineering" },
  ];

  const createdCategories = [];
  for (const cat of categories) {
    const created = await prisma.category.upsert({
      where: { name: cat.name },
      update: {},
      create: cat,
    });
    createdCategories.push(created);
  }

  // بعد كدا نضيف شوية skills لكل category
  const skillsData = {
    Marketing: ["SEO", "Content Writing", "Social Media Management"],
    "Graphic Design": ["Photoshop", "Illustrator", "Figma"],
    "Software Engineering": ["JavaScript", "Python", "React", "Node.js"],
  };

  for (const category of createdCategories) {
    const skills = skillsData[category.name] || [];
    for (const skillName of skills) {
      await prisma.skill.upsert({
        where: { name: skillName },
        update: {},
        create: {
          name: skillName,
          categoryId: category.id,
        },
      });
    }
  }

  console.log("Seeding done ✅");


