import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const com = await prisma.category.findMany()
await prisma.skill.findMany()

console.log(com)