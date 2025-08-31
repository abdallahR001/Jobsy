import EmployerRegisterForm from "@/app/components/EmployerRegisterForm/EmployerRegisterForm";
import EmployerRegisterHeader from "@/app/components/EmployerRegisterHeader/EmployerRegisterHeader";

export default function EmployerRegister(){
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
                <EmployerRegisterHeader />
                <EmployerRegisterForm />
            </div>
        </div>
    )
}