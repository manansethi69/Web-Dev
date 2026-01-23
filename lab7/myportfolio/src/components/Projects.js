import React, { useState, useEffect } from "react";
import axios from "axios";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:5002/api/projects")
            .then((response) => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError("Failed to load projects. Please try again later.");
                setLoading(false);
            });
    }, []);

    if (loading) return <p className="text-center">Loading projects...</p>;
    if (error) return <p className="text-center text-danger">{error}</p>;

    return (
        <section className="container">
            <div className="row">
                {projects.map((project) => (
                    <div key={project.id} className="col-md-6 col-lg-4 mb-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{project.name}</h5>
                                <h6 className="card-subtitle text-muted mb-2">By {project.author}</h6>
                                <p className="card-text">{project.description}</p>
                                <p><strong>Languages:</strong> {project.languages.join(", ")}</p>
                                <button className="btn btn-primary w-100">View Project</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Projects;


