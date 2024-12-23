// ProjectPage.tsx
import React, { useEffect } from "react";
import { useProjects } from "../../context/ProjectContext";
import Card from "../sanityContent/Card";
import client from "../../client";

function ProjectPage() {
  const { projects, setProjects } = useProjects();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await client.fetch(`*[_type == "projectSchema"]`);
        setProjects(data); // Set the projects in context
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [setProjects]);

  console.log("PP: ", projects)

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mx-4 lg:mx-20 m-28">
        {projects.map((project, index) => (
          <Card
            key={index}
            name={project.name}
            description={project.description}
            image={project.image}
            slug={project.slug}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;
