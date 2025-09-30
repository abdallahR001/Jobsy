"use client"
export default function AcceptButton({id,token})
{
    const handleAccept = async (id) =>
    {
        const response = await fetch(`http://localhost:4000/api/applications/accept/${id}`,{
            method:"PUT",
            headers:{
                token:token
            }
        })

        const result = await response.json()

        if(!response.ok)
        {
            console.log(result.message);
            return
        }

        console.log(result);
        
    }

    return(
        <button onClick={() => handleAccept(id)} className="w-full cursor-pointer bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
            Accept
        </button>
    )
}