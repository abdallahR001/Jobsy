"use client";
import { useState, useEffect } from "react";

export default function JobForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [experience, setExperience] = useState("");
  const [salary, setSalary] = useState("");
  const [city, setCity] = useState("");
  const [category, setCategory] = useState("");
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState([]);
  const [defaultSkills, setDefaultSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  useEffect(() => {
    if (category) {
      fetch(`http://localhost:4000/api/skills/default?category=${category}`,{
        credentials:"include"
      })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setDefaultSkills(data.skills || [])
        })
        .catch(() => setDefaultSkills([]));
    }
  }, [category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.length > 0) {
        fetch(`http://localhost:4000/api/skills/search?query=${query}&category=${category}`,{
            credentials:"include"
        })
          .then((res) => res.json())
          .then((data) => setSkills(data.skills || []))
          .catch(() => setSkills([]));
      } else {
        setSkills(defaultSkills);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query, category, defaultSkills]);

  const addSkill = (skill) => {
    if (!selectedSkills.find((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skillId) => {
    setSelectedSkills(selectedSkills.filter((s) => s.id !== skillId));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      description,
      experience: experience || null,
      salary: salary || null,
      city,
      category,
      skills: selectedSkills.map((s) => s.id),
    };
    console.log("Submitting job:", payload);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h1 className="text-3xl font-bold mb-6 text-indigo-500">Create Job</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Job Title */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col w-full">
          <label className="mb-1 font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none h-40 sm:h-32"
          />
        </div>

        {/* Experience & Salary */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1 flex flex-col w-full">
            <label className="mb-1 font-medium text-gray-700">
              Experience (years, optional)
            </label>
            <input
              type="number"
              value={experience <= 0 ? "" : experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1 flex flex-col w-full">
            <label className="mb-1 font-medium text-gray-700">
              Salary (optional)
            </label>
            <input
              type="number"
              value={salary <= 0 ? "" : salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* City & Category */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="flex-1 flex flex-col w-full">
            <label className="mb-1 font-medium text-gray-700">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex-1 flex flex-col w-full">
            <label className="mb-1 font-medium text-gray-700">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border cursor-pointer border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">Select Category</option>
              <option value="marketing">Marketing</option>
              <option value="graphic">Graphic Design</option>
              <option value="software">Software Engineering</option>
            </select>
          </div>
        </div>

        {/* Skills Section */}
        <div className="flex flex-col w-full">
          <label className="mb-2 font-medium text-gray-700">Skills</label>
          <input
            type="text"
            placeholder="Search skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex flex-wrap gap-2 mt-3">
            {(skills.length > 0 ? skills : defaultSkills).map((skill) => (
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
        </div>

        <button
          type="submit"
          disabled={!title || !description || !city || !skills || !category}
          className="w-full cursor-pointer disabled:bg-indigo-400 disabled:cursor-not-allowed bg-indigo-500 text-white font-semibold py-4 rounded-md hover:bg-indigo-600 transition text-lg"
        >
          Create Job
        </button>
      </form>
    </div>
  );
}
