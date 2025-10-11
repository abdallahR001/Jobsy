import { prisma } from "../prisma/prismaClient.js";

const user = await prisma.user.findUnique({
    where:{
        id:"cmfpmsipn0000tues9a9jzpw8"
    }
})

console.log(user);
