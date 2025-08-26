import { prisma } from "../prisma/prismaClient.js";

await prisma.job.deleteMany()
