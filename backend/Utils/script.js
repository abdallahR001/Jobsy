import { prisma } from "../prisma/prismaClient.js";

const cat = await prisma.user.findUnique(
   {
    where:{
        email:"ramadanabdallah546@gmail.com"
    }
   }
)

console.log(cat);
