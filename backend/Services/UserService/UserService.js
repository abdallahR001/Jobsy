import { UpdateProfile, DeleteProfile, SignIn, SignUp } from "../../Repositories/UserRepository/User.Repository.js"
import { validateEmail } from "../../Utils/Validations/emailValidation.js"
import { ValidateName } from "../../Utils/Validations/nameValidation.js"
import { validatePassword } from "../../Utils/Validations/passwordValidation.js"
import { GetProfile } from "../../Repositories/UserRepository/User.Repository.js"

export const CreateAccount = async (userData)=>
{
    try {
        const {first_name,last_name,email,password} = userData
        //i've made some validation functions in the validations folder to reduce code repeat
        ValidateName(first_name,last_name)
        validateEmail(email)
        validatePassword(password)

        const result = await SignUp(userData)

        return result
    } catch (error) {
        console.log("error❌", error.message)
        throw error
    }
}

export const LogIn = async(credintials)=>
{
    try {
        const {email,password} = credintials

        validateEmail(email)
        validatePassword(password)

        const result = await SignIn(credintials)
        
        return result
    } 
    catch (error) {
        console.log("error❌", error.message)
        throw error
    }
}

export const getProfile = async (id) =>
{
    try {
        const result = await GetProfile(id)

        return result
    } 
    catch (error) {
        console.log("error❌", error.message)
        throw error
    }
}

export const updateProfile = async (id,data) =>
{
    try {
        const result = await UpdateProfile(id,data)
        
        return result
    } 
    catch (error) {
        console.log("error❌", error.message)
        throw error
    }
}

export const deleteProfile = async (id) =>
{
    try {
        const result = await DeleteProfile(id)
        
        return result
    } 
    catch (error) {
        console.log("error❌", error.message)
        throw error
    }
}