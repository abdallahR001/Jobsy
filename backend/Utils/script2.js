import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const com = await prisma.job.findUnique({
    where:{
        id:"cmfn7onhb0002tup05t0l5alc"
    },
    include:{
        savedBy:true
    }
})

console.log(com)