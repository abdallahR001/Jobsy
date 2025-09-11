import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const com = await prisma.company.findMany()

console.log(com)