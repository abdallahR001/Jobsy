import { prisma } from "../prisma/prismaClient.js"
import jwt from "jsonwebtoken"
import { CreateAccount, LogIn, updateProfile, deleteProfile, getProfile, followCompany, getFollowedCompanies, saveJob, getSavedJobs } from "../Services/UserService/UserService.js"
import { log } from "console"

export const homePage = async (req,res,next) =>
{
    const {id} = req.user
    
    try {
        const activeJobsCount = await prisma.job.count({
            where:{
                job_status:"open"
            }
        })

        const companiesCount = await prisma.company.count()

        const jobSeekersCount = await prisma.user.count()

        const user = await prisma.user.findUnique({
            where:{
                id
            },
            select:{
                field:true,
                skills:true,
                title:true
            }
        })
        
        const userSkillsIDs = user.skills.map((skill) => skill.id)

        let jobsFeed = await prisma.job.findMany({
            where:{
                OR:[
                    {
                    Category:{
                      name:user?.field
                    },
                    },
                    {
                      skills:{
                        some:{
                            id:{
                                in:userSkillsIDs
                            }
                        }
                      }
                    },
                ]
            },
            take:8,
            select:{
                id:true,
                title:true,
                description:true,
                location:true,
                salary:true,
                type:true,
                created_at:true,
                Company:{
                    select:{
                        id:true,
                        name:true,
                        image:true,
                    }
                },
                savedBy:{
                    where:{
                        id:id
                    }
                },
                Category:{
                    select:{
                        name:true,
                    }
                }
            }
        })

        let companiesFeed = await prisma.company.findMany({
            where:{
                field:user.field
            },
            select:{
                id:true,
                name:true,
                employees_count:true,
                image:true,
                _count:{
                    select:{
                        jobs:{
                            where:{
                                job_status:"open"
                            }
                        }
                    }
                },
                followers:{
                    where:{
                        id:id
                    }
                }
            }
        })

        jobsFeed = jobsFeed.map((job) => ({...job, isSaved: job.savedBy.length > 0}))

        companiesFeed = companiesFeed.map((company) => ({...company, isFollowed: company.followers.length > 0}))

        res.status(200).json({
            feed:{
                activeJobsCount,
                jobSeekersCount,
                companiesCount,
                jobsFeed,
                companiesFeed
            }
        })
    } 
    catch (error) {
        next(error)
    }
}

export const createAccount = async(req,res,next) =>
{
    try {
        const result = await CreateAccount(req.body)    

        res.status(201).cookie("token",result.token,{
            httpOnly:true,
            secure:false
        }).json({
            message:result.message
        })
    } 
    catch (error) {
        next(error)
    }
}

export const viewCompanyProfile = async (req,res,next) =>
{
    try {
        const {id} = req.user

        const companyId = req.params.companyId

        const company = await prisma.company.findUnique({
            where:{
                id:companyId
            },
            select:{
                id:true,
                name:true,
                email:true,
                image:true,
                description:true,
                employees_count:true,
                created_at:true,
                website:true,
                _count:{
                    select:{
                        followers:true,
                        jobs:{
                            where:{
                                job_status:"open"
                            }
                        }
                    }
                },
            }
        })

        if(!company)
        {
            res.status(404).json({
                message:"company not found"
            })
            return
        }

        let jobs = await prisma.job.findMany({
                    where:{
                        AND:[
                            {
                                companyId:company.id
                            },
                            {
                                job_status:"open"
                            }
                        ]
                    },
                    select:{
                        id:true,
                        title:true,
                        description:true,
                        minimum_years_required: true,
                        salary:true,
                        skills:true,
                        job_status:true,
                        location:true,
                        Company:{
                            select:{
                                name:true,
                                id:true
                            }
                        },
                        savedBy:{
                            where:{
                                id:id
                            }
                        }
                    },
                    take:5,
                    orderBy:{
                        created_at:"desc"
                    }
                })

        let isFollowed;

        const alreadyFollowed = await prisma.company.findFirst({
            where:{
                id:company.id,
                followers:{
                    some:{
                        id:id
                    }
                }
            }
        })

        if(!alreadyFollowed)
            isFollowed = false

        else if(alreadyFollowed)
            isFollowed = true
        
        jobs = jobs.map((job) => ({...job, isSaved: job.savedBy.length > 0}))

        res.status(200).json(
        {
            company: company,
            jobs:jobs,
            isFollowed:isFollowed
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const onBoardingPage = async (req,res,next) =>
{
    try {
        const userId = req.user.id
        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                first_name:true,
                hasSeenOnboarding:true
            }
        })

        res.status(200).json({
            id:userId,
            name: user.first_name,
            hasSeenOnBoarding: user.hasSeenOnboarding
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const googleCallBack = async (req,res) =>
{
        const user = req.user

        const token = jwt.sign(
        { id: user.id, role: "user" },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
        );

        console.log(user);
        

        const existingUser = await prisma.user.findUnique({
            where:{
                id:user.id
            },
            select:{
                hasSeenOnboarding:true,
            }
        })

        if(existingUser.hasSeenOnboarding === true)
        {
            res.cookie("token", token, {
            httpOnly: true,
            secure: false
            }).redirect("http://localhost:3000/home")
        }
        else
        {
            res.cookie("token", token, {
            httpOnly: true,
            secure: false
            }).redirect("http://localhost:3000/onboarding/users/step1")
        }        
}

export const me = async(req,res,next) =>
{
    try {
        const {id,role} = req.user

        console.log(id);
        console.log(role);
        
        if(role === "user")
        {
            const user = await prisma.user.findUnique({
            where:{
                id:id
            },
            select:{
                id:true,
                first_name:true,
                last_name:true,
                image:true,
            }
        })  

            console.log(user);
            

            res.status(200).json({
                id:user.id,
                first_name:user.first_name,
                last_name:user.last_name,
                image:user.image,
                type:"user"
            })

            return user
        }

        else if(role === "company")
        {
            const company = await prisma.company.findUnique({
                where:{
                    id:id
                },
                select:{
                    id:true,
                    name:true,
                    image:true,
                }
            })

            res.status(200).json({
                id:company.id,
                name:company.name,
                image:company.image,
                type:"company"
            })
        }
    } 
    catch (error) {
        next(error)
    }
}

export const logIn = async(req,res,next) =>
{
    try {
        const result = await LogIn(req.body)
        res.cookie("token",result.token,{
            httpOnly:true,
            secure:false
        }).json({
            message:"logged in successfully",
        })
    } 
    catch (error) {
        next(error)
    }
}

export const UploadPortfolioFile = async (req,res,next) =>
{
    try {
        const {id} = req.user
        const {title,description} = req.body

        const file = req.file

        if(!file)
            return res.status(400).json({
            message: "no file uploaded"
        })

        if (file.mimetype === "application/x-msdos-program" || file.mimetype === "application/x-msdownload") {
            return res.status(400).json({ message: "Executable files are not allowed" });
        }

        const newFile = await prisma.portfolioFile.create({
            data:{
                title,
                description,
                fileName:file.originalname,
                fileType:file.mimetype,
                url:`uploads/${file.filename}`,
                user:{
                    connect:{
                        id
                    }
                }
            }
        })

        res.status(201).json({
            message:`uploaded ${newFile.title} succesfully`,
            file:newFile
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const DeletePortfolioFile = async (req,res,next) =>
{
    try {
        const {fileId} = req.params

        const deletedFile = await prisma.portfolioFile.delete({
            where:{
                id:fileId
            }
        })

        if(!deletedFile)
            return res.status(404).json({
                message: "file not found"
            })

        res.status(200).json({
            message: "deleted file successfully"
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const UploadResume = async (req,res,next) =>
{
    const {id} = req.user

    const file = req.file

    if(!file)
        return res.status(400).json({
            message: "no file uploaded"
        })

    if (file.mimetype === "application/x-msdos-program" || file.mimetype === "application/x-msdownload") {
            return res.status(400).json({ message: "Executable files are not allowed" });
        }

    try {
        const uploadedFile = await prisma.resume.create({
            data:{
                user:{
                    connect:{
                        id:id
                    }
                },
                userId:id,
                url: `uploads/${file.filename}`
            }
        })

        res.status(201).json({
            message: "uploaded your resume successfully",
            uploadedFile: uploadedFile
        })
    } 
    catch (error) {
        next(error)    
    }
    
}

export const GetProfile = async (req,res,next) =>
{
    try {
        const result = await getProfile(req.user.id)

        res.status(result.status).json({
            profile:result.user
        })
    } 
    catch (error) {
        next(error)
    }
}

export const ViewUserProfile = async (req,res,next) =>
{
    try {
        const {userId} = req.params

        const user = await prisma.user.findUnique({
            where:{
                id:userId
            },
            select:{
                id:true,
                first_name:true,
                last_name:true,
                bio:true,
                image:true,
                field:true,
                title:true,
                years_of_experience:true,
                email:true,
                location:true,
                PortfolioFiles:{
                    select:{
                        id:true,
                        fileName:true,
                        fileType:true,
                        url:true,
                        title:true,
                        description:true,
                        created_at:true,
                    }
                },
                skills:{
                    select:{
                        id:true,
                        name:true,
                    }
                }
            }
        })

        if(!user)
            return res.status(404).json({
                message: "user not found"
            })

        res.status(200).json({
            user
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const UpdateProfile = async (req,res,next) =>
{
    try {

        const data = req.body

        if (req.file) {
            data.image = `http://localhost:4000/uploads/${req.file.filename}`
        }
        const result = await updateProfile(req.user.id,data)

        res.status(result.status).json({
            message:result.message,
            user: result.user
        })
    } 
    catch (error) {
        next(error)
    }
}

export const DeleteProfile = async (req,res,next) =>
{
    try {
        const result = await deleteProfile(req.user.id)
        
        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)
    }
}

export const FollowCompany = async (req,res,next) =>
{
    try {
        const userId = req.user.id

        const {companyId} = req.body

        const result = await followCompany(userId,companyId)
        
        res.status(200).json({
            message:"followed company successfully",
            isFollowed: result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const GetFollowedCompanies = async (req,res,next) =>
{
    try {
        const userId = req.user.id

        const result = await getFollowedCompanies(userId)
        
        res.status(200).json({
            followedCompanies: result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const SaveJob = async (req,res,next) =>
{
    try {
        const userId = req.user.id
        console.log(userId)

        console.log(req.body)
        
        const {jobId} = req.body
        console.log(jobId)

        const isSaved = await saveJob(userId,jobId)

        res.status(200).json({
            message:"saved job successfully",
            isSaved: isSaved
        })
    } 
    catch (error) {
        next(error)
    }
}

export const GetSavedJobs = async (req,res,next) =>
{
    try {
        const userId = req.user.id

        const result = await getSavedJobs(userId)

        res.status(200).json({
            savedJobs:result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const AddSkill = async (req,res,next) =>
{
    try {
        const {id} = req.user

    const {skillId} = req.body

    const skill = await prisma.skill.findUnique({
        where:{
            id:skillId,
        }
    })

    if(!skill)
        return res.status(404).json(
    {
        message: "skill not found"
    })

    let alreadyAdded = await prisma.skill.findFirst({
        where:{
            id:skill.id,
            user:{
                some:{
                    id:id
                }
            }
        }
    })

    if(!alreadyAdded)
    {
        await prisma.skill.update({
        where:{
            id:skill.id
        },
        data:{
            user:{
                connect:{
                    id:id
                }
            }
        }
    })
        return res.status(200).json({
        message: `added ${skill.name} to your skill set successfully`
    })
    }

    else
    {
        await prisma.skill.update({
            where:{
                id:skill.id
            },
            data:{
                user:{
                    disconnect:{
                        id:id
                    }
                }
            }
        })
        return res.status(200).json({
        message: `removed ${skill.name} from your skill set successfully`
    })
    }
    
    } 
    catch (error) {
        next(error)    
    }
}

export const GetUserField = async (req,res,next) =>
{
    try {
        const {id} = req.user

        const feild = await prisma.user.findUnique({
            where:{
                id:id
            },
            select:{
                field:true
            }
        })

        res.status(200).json({
            field:feild
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const Logout = async (req,res,next) =>
{
    res.status(200).clearCookie("token",{
        httpOnly:true,
        secure:false
    }).json({
        message:"logged out"
    })
}