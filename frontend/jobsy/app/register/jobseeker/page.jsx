import JobSeekerRegisterForm from "@/app/components/JobSeekerRegisterForm/JobSeekerRegisterForm";
import JobSeekerRegisterHeader from "@/app/components/JobSeekerRegisterHeader/JobSeekerRegisterHeader";

export default function JobSeeker(){
    return (
        <div className="min-h-screen bg-white flex items-center justify-center px-4">
            <div className="w-full max-w-lg">
                <JobSeekerRegisterHeader />
                <JobSeekerRegisterForm />
            </div>
        </div>
    )
}