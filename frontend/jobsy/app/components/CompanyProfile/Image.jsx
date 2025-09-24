"use client"
import { PenBox, Save } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
export default function CompanyImage({companyImage}){
    const [image,setImage] = useState(null)
    const [preview,setPreview] = useState(companyImage)

    const [updateMode,setUpdateMode] = useState(false)

    const handleImageChange = (e) =>
    {
        setUpdateMode(true)
        const file = e.target.files[0]

        if(file)
        {
            setImage(file)
            setPreview(URL.createObjectURL(file))
        }
    }

    const save = async () =>
    {
        try {
            const formData = new FormData()

        if(image)
            formData.append("image",image)

        else
        {
            setUpdateMode(false)
            return
        }

        const response = await fetch("http://localhost:4000/api/companies",{
            credentials:"include",
            method:"PUT",
            body: formData
        })

        const company = await response.json()

        console.log(company.company)

        setPreview(`http://localhost:4000/${company.company.image}`)

        setUpdateMode(false)
    }
    catch (error) 
    {
        console.log(error);
    }
    }
    return(
        <div className="flex items-center gap-2">
            {
                image ? 
                <Image 
                src={preview}
                alt="company profile image"
                width={360}
                height={360}
                className="rounded-full border w-20 h-20 border-indigo-500"
                priority
                />
                :
                <Image 
                src={`http://localhost:4000/${preview}`}
                alt="company profile image"
                width={360}
                height={360}
                className="rounded-full border w-20 h-20 border-indigo-500"
                priority
            />
            }
        <label className="w-full">
            <input 
            type="file" 
            onChange={handleImageChange}
            accept="image/*" 
            className="hidden" />
            <div className={`font-2xl text-indigo-500 cursor-pointer w-full ${updateMode ? "hidden" : "block"}`}><PenBox/></div>
        </label>
            <div onClick={save} className={`${updateMode ? "block" : "hidden"} cursor-pointer text-indigo-500`}>
                <Save/>
            </div>
        </div>
    )
}