import { io } from "../index.js"
import { prisma } from "../prisma/prismaClient.js"

export const createNotification = async (req,res,next) =>
{
    try {
        const {id} = req.user
        const {applicationId,type,message} = req.body

        const company = await prisma.company.findUnique({
            where:{
                id
            },
            select:{
                id:true,
                name:true,
                email:true,
                image:true
            }
        })

        if(!company)
            return res.status(404).json(
        {
            message: "company not found"
        })

        const application = await prisma.application.findUnique({
            where:{
                id:applicationId
            }
        })

        if(!application)
            return res.status(404).json(
        {
            message: "application not found"
        })

        let title;

        if(type === "accept application")
            title = `congrats! your application was accepted by ${company.name}`

        if(type === "reject application")
            title = `your application was rejected by ${company.name}`

        if(type === "view profile")
            title = `your profile was viewed by ${company.name}`

        const notification = await prisma.notification.create({
            data:{
                message:message || null,
                type:type,
                title:title,
                User:{
                    connect:{
                        id:application.userId
                    }   
                },
                Company:{
                    connect:{
                        id:id
                    }
                }
            }
        })

        io.to(notification.userId).emit("new-notification",(notification))

        res.status(200).json({
            notification
        })
    } 
    catch (error) {
        next(error)
    }
}

export const getAllNotifications = async (req,res,next) =>
{
    try {
        const {id} = req.user

        const notifications = await prisma.notification.findMany({
            where:{
                userId:id
            },
            select:{
                id:true,
                type:true,
                title:true,
                message:true,
                seen:true,
                created_at:true,
            },
            orderBy:{
                created_at:"desc"
            }
        })

        res.status(200).json({
            notifications
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const getNotification = async (req, res, next) => {
  try {
    const { notificationId } = req.params;
    const userId = req.user.id; 

    let notification = await prisma.notification.findUnique({
      where: { id: notificationId },
      select: {
        id: true,
        type: true,
        title: true,
        message: true,
        created_at: true,
        seen: true,
        userId: true, 
        Company: {
          select: {
            id: true,
            image: true,
            name: true
          }
        }
      }
    });

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    if (notification.userId !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    if (!notification.seen) {
      notification = await prisma.notification.update({
        where: { id: notificationId },
        data: { seen: true },
        select: {
          id: true,
          type: true,
          title: true,
          message: true,
          created_at: true,
          seen: true,
          Company: {
            select: {
              id: true,
              image: true,
              name: true
            }
          }
        }
      });

      io.to(userId).emit("notification-seen", { 
        notificationId,
        userId 
      });
    }

    res.status(200).json({ notification });
  } catch (error) {
    next(error);
  }
};