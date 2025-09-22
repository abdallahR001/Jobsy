export default function DashBoardCard({icon,title,value,color})
{
    const colors = {
        blue:"bg-blue-500",
        indigo:"bg-indigo-500",
        yellow:"bg-yellow-500",
        green:"bg-green-500",
    }
    return(
        <div
            className="w-full cursor-pointer flex justify-between flex-col p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
            <div className="flex gap-2 mb-4">
                <div className={`p-3 rounded-full flex items-center justify-center bg-gray-100 mr-4 text-${color}-500`}>{icon}</div>
                <div className="w-full">
                    <p className="text-sm text-gray-500">{title}</p>
                    <p className="text-2xl font-bold">{value}</p>
                </div>
            </div>
            <div className={`${colors[color]} w-full h-0.5 rounded-full`}></div>
        </div>
    )
}