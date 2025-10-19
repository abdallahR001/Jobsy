import nodemailer from "nodemailer"
const trancporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"ramadanabdallah546@gmail.com",
                pass:"btwu itll shza onkl"
            }
        })
export const sendEmail = async (to,subject,text) =>
{
    await trancporter.sendMail({
        from:"JOBSY",
        to:to,
        subject:subject,
        text:text
    })
}