import Image from "next/image";
export default function CompanyImage({companyImage}){
    return(
        <Image 
        src={`http://localhost:4000/${companyImage}`}
        alt="company profile image"
        width={25}
        height={25}
        className="rounded-full border w-20 h-20 border-indigo-500"
        />
    )
}