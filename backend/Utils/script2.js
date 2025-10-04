import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const skills = await prisma.skill.findMany()

console.log(skills);
