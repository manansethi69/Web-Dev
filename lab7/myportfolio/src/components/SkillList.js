import React, { useState } from "react";

const SkillList = ({ theme }) => {
    const skills = [
        { id: 1, name: "React", category: "Frontend" },
        { id: 2, name: "JavaScript", category: "Frontend" },
        { id: 3, name: "Node.js", category: "Backend" },
        { id: 4, name: "Express.js", category: "Backend" },
        { id: 5, name: "MongoDB", category: "Database" },
        { id: 6, name: "SQL", category: "Database" },
        { id: 7, name: "Bootstrap", category: "Frontend" },
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    const filteredSkills = skills.filter((skill) => {
        return (
            skill.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory === "All" || skill.category === selectedCategory)
        );
    });

    return (
        <div className={`container text-center splash ${theme}-mode`}>
            <h2 className="skills-title">MY SKILLS</h2>

            <input
                type="text"
                placeholder="Search skills..."
                className="form-control mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <select
                className="form-select mb-3"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
            >
                <option value="All">All</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
            </select>

            {filteredSkills.length > 0 ? (
                <ul className="list-group mt-3">
                    {filteredSkills.map((skill) => (
                        <li key={skill.id} className="list-group-item">
                            {skill.name} - <strong>{skill.category}</strong>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-muted">No skills found</p>
            )}
        </div>
    );
};

export default SkillList;

