import { prisma } from "../prisma/prismaClient.js";

await prisma.company.deleteMany()
