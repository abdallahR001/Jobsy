export default function UserSkills({userSkills})
{
    return (
        <div className="mt-4">
            {
                userSkills.map((skill) => (
                    <span
                        key={skill.id}
                        className="bg-indigo-100 text-indigo-800 px-3 py-2 rounded-full cursor-pointer hover:bg-indigo-200 transition text-base"
                    >
                        {skill.name}
                    </span>
                ))
            }
        </div>
    )
}