export default function MainSearch(){
    return(
        <form className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-300">
                    <input placeholder="enter job title..." type="text" className="flex-1 p-4 outline-none"/>
                    <input type="text" className="flex-1 p-4 outline-none" placeholder="enter job location"/>
                    <select className="flex-1 p-4 outline-none cursor-pointer">
                        <option value={""}>select job type</option>
                        <option value={"fullTime"}>Full-Time</option>
                        <option value={"partTime"}>Part-Time</option>
                        <option value={"remote"}>Remote</option>
                        <option value={"internShip"}>Internship</option>
                    </select>

                    <button type="submit" className="px-6 py-4 bg-indigo-600 cursor-pointer hover:bg-indigo-700 transition-all duration-500">🔍</button>
                </div>
        </form>
    )
}