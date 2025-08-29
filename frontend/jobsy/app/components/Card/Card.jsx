import Image from "next/image";

export default function Card({img,title,description}){
    return(
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-lg transition-shadow">
            {/*<Image src={img} alt="card image" width={20} height={20} className="mb-4"/>*/}
            <h3 className="text-xl font-semibold text-indigo-600 mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    )
}