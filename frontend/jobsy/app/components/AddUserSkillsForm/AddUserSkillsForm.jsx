"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function UserSkillsForm({field})
{
    const [query,setQuery] = useState("")
    const [defaultSkills,setDefaultSkills] = useState([])
    const [skills,setSkills] = useState([])
    const [selectedSkills,setSelectedSkills] = useState([])
    const [loading,setLoading] = useState(false)

    const router = useRouter()

    useEffect(() =>
    {
        const fetchDefaultSkills = async () =>
        {
            const response = await fetch(`http://localhost:4000/api/skills/default?category=${field}`,{
                credentials:"include"
            })

            const data = await response.json()
            console.log(data);
            
            setDefaultSkills(data.skills)
        }
        fetchDefaultSkills()
    },[])

    useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) {
        fetch(`http://localhost:4000/api/skills/search?query=${query}&category=${field}`,{
            credentials:"include"
        })
          .then((res) => res.json())
          .then((data) => {
            setSkills(data.skills || [])
            console.log(data.skills)
          })
          .catch(() => setSkills([]));
      } else {
        setSkills(defaultSkills);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [query, defaultSkills]);

  const addSkill = (skill) => {
    if (!selectedSkills.find((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skillId) => {
    setSelectedSkills(selectedSkills.filter((s) => s.id !== skillId));
  };

  const submit = async () =>
  {
    if(!selectedSkills)
      return

    setLoading(true)

    const skillsIds = selectedSkills.map((skill) => skill.id)

    const response = await fetch("http://localhost:4000/api/skills/add-user-skills",
      {
        method:"PUT",
        body:JSON.stringify({
          skillsIds:skillsIds
        }),
        headers:{
          "content-type":"application/json"
        },
        credentials:"include"
      }
    )

    const result = await response.json()

    if(!response.ok)
    {
      console.log(result);
      setLoading(false)
      return
    }
    setLoading(false)

    router.push("/profile")
  }
    return(
        <div className="flex flex-col w-full">
          <label className="mb-2 font-medium text-gray-700">Skills</label>
          <input
            disabled={!field}
            type="text"
            placeholder="Search skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="disabled:cursor-not-allowed w-full border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {(skills?.length > 0 ? skills : defaultSkills).map((skill) => (
              <span
                key={skill.id}
                onClick={() => addSkill(skill)}
                className="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-full cursor-pointer hover:bg-indigo-200 transition text-base"
              >
                {skill.name}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 mt-3">
            {selectedSkills.map((s) => (
              <span
                key={s.id}
                className="bg-indigo-500 text-white px-3 py-2 rounded-full cursor-pointer hover:bg-indigo-600 transition text-base"
                onClick={() => removeSkill(s.id)}
              >
                {s.name} ✕
              </span>
            ))}
          </div>
          <button
          disabled={!selectedSkills.length}
          onClick={submit}
          className={`w-full mt-4 cursor-pointer disabled:bg-indigo-400 disabled:cursor-not-allowed bg-indigo-500 text-white font-semibold py-4 rounded-md hover:bg-indigo-600 transition text-lg`}
        >
          {loading ? "Wait a moment..." : "Add Skills"}
        </button>
        </div>
    )
}