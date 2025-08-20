import { prisma } from "../prisma/prismaClient.js";

await prisma.skill.deleteMany()
