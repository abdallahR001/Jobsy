import { prisma } from "../prisma/prismaClient.js";

await prisma.admin.deleteMany()
