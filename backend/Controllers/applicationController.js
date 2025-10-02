import { acceptApplication, createApplication, getApplicationsByJob, getUserApplications, rejectApplication, toggleApplicationSeen } from "../Services/ApplicationService/ApplicationService.js"

export const CreateApplication = async (req,res,next) =>
{
    try {
        const {id} = req.user
        const {jobId} = req.params

        const result = await createApplication(id,jobId,req.body)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const GetApplicationsByJob = async (req,res,next) =>
{
    try {
        const {jobId} = req.params

        const result = await getApplicationsByJob(jobId)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const GetUserApplications = async (req,res,next) =>
{
    try {
        const {id} = req.user

        const result = await getUserApplications(id)

        res.status(200).json({
            applications: result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const ToggleApplicationSeen = async (req,res,next) =>
{
    try {
        const {applicationId} = req.params

        const result = await toggleApplicationSeen(applicationId)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const AcceptApplication = async (req,res,next) =>
{
    try {
        const {applicationId} = req.params

        const result = await acceptApplication(applicationId)

        res.status(result.status).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}

export const RejectApplication = async (req,res,next) =>
{
    try {
        const {applicationId} = req.params

        const result = await rejectApplication(applicationId)

        res.status(200).json({
            result
        })
    } 
    catch (error) {
        next(error)    
    }
}