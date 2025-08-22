import { createAdmin, loginAsAdmin } from "../../Repositories/AdminRepository/Admin.Repository.js"
import { validateEmail } from "../../Utils/Validations/emailValidation.js"
import { validateAdminName } from "../../Utils/Validations/nameValidation.js"
import { validatePassword } from "../../Utils/Validations/passwordValidation.js"

export const CreateAdmin = async (data) =>
{
    try {
        validateAdminName(data.name)
        validateEmail(data.email)
        validatePassword(data.password)

        const result = await createAdmin(data)

        return {
            status: 201,
            message: "admin created successfully",
            result
        }
    } 
    catch (error) {
        throw error
    }
}

export const LoginAsAdmin = async (data) =>
{
    try {
        validateAdminName(data.name)
        validateEmail(data.email)
        validatePassword(data.password)

        const result = await loginAsAdmin(data)

        return {
            status: 200,
            message: "logged in successfully",
            result
        }
    } 
    catch (error) {
        throw error
    }
}