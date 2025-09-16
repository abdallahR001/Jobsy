import { GetCompany , CreateCompany , LogIn, UpdateCompany, DeleteCompany, getCompanyFollowers} from "../../Repositories/CompanyRepository/Company.Repository.js";

export const GetCompanyProfile = async (id) =>
{
    try {
        const result = await GetCompany(id)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message) 
        throw error  
    }
}

export const CreateNewCompany = async (data) =>
{
    try {
        const result = await CreateCompany(data)

        return result
    } catch (error) {
        console.log("error❌",error.message) 
        throw error
    }
}

export const LogInAsCompany = async (email,password) =>
{
    try {
        const result = await LogIn(email,password)

        return result
    } catch (error) {
        console.log("error❌",error) 
        throw error
    }
}

export const UpdateCompanyProfile = async (id,data) =>
{
    try {
        const result = await UpdateCompany(id,data)
        
        return result
    } 
    catch (error) {
        console.log("error❌",error.message) 
        throw error
    }
}

export const DeleteCompanyProfile = async (id) =>
{
    try {
        const result = await DeleteCompany(id)

        return result
    } 
    catch (error) {
        console.log("error❌",error.message) 
        throw error    
    }
}

export const GetCompanyFollowers = async (companyId) =>
{
    try {
        const result = await getCompanyFollowers(companyId)

        return result
    }
    catch (error) {
        console.log("error❌",error.message) 
        throw error  
    }
}