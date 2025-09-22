"use client"
export default function LogoutButton({isOpen,icon,text}){
    const logout = async () =>
  {
    const response = await fetch("http://localhost:4000/api/companies/logout",{
      credentials:"include"
    })

    const result = await response.json()
    console.log(result)

    if(!response.ok)
    {
      console.log(result)
      return
    }

    window.location.replace("/")
  }
    return (
    <button
    onClick={logout}
      className={` cursor-pointer flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors duration-200 hover:bg-gray-100 text-red-500`}
    >
      {icon}
      {isOpen && <span>{text}</span>}
    </button>
  );
}