import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const com = await prisma.user.findUnique({
    where:{
        email:"abdo@gmail.com"
    }
})

console.log(com)