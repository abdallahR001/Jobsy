export default function DashBoardCard({icon,title,value,color})
{
    return(
        <div
            className=" cursor-pointer flex items-center p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
            <div className={`p-3 rounded-full bg-gray-100 mr-4 ${color}`}>{icon}</div>
            <div>
                <p className="text-sm text-gray-500">{title}</p>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </div>
    )
}