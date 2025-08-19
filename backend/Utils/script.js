import { prisma } from "../prisma/prismaClient.js";

const skills = await prisma.skill.findMany()

console.log(skills)