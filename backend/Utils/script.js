import { prisma } from "../prisma/prismaClient.js";

await prisma.user.deleteMany()
