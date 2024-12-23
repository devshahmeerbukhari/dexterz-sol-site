import React, { useEffect, useState } from "react";
import { Project } from "../../types/project";
import { useParams } from "react-router-dom";
import client from "../../client"; // Assuming you have set up Sanity client here
import { useProjects } from "../../context/ProjectContext";
import imageUrlBuilder from "@sanity/image-url";

// Create a builder instance for the Sanity client
const builder = imageUrlBuilder(client);

interface DetailsProps {
  slug: string; // Pass the slug as a prop
}

const Details: React.FC<DetailsProps> = () => {
  const [project, setProject] = useState<Project | null>(null);
  const { slug } = useParams(); // Get slug from URL params

  const { projects, setProjects } = useProjects();

  // Fetching the projects and setting them in context
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

  // Update the project state when 'slug' or 'projects' change
  useEffect(() => {
    if (slug && projects.length > 0) {
      const dataFind = projects.find((data) => data.slug === slug);
      setProject(dataFind || null); // Set the project or null if not found
    }
  }, [slug, projects]);

  const urlFor = (source: any) => builder.image(source).width(800).url();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col lg:flex-row">
      {/* Main Content */}
      <div className="flex-1 p-4 lg:p-10">
        <div className="bg-white shadow-md rounded-lg p-4 lg:p-6">
          <h1 className="text-2xl lg:text-4xl font-bold text-gray-800 mb-4">
            Study.com
          </h1>

          {project ? (
            <div>
              <h2 className="text-lg lg:text-2xl font-semibold text-gray-700 mb-4">
                {project.name}
              </h2>
              {project.image?.asset ? (
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <img
                    src={urlFor(project.image.asset)} // Passing the asset object
                    alt={project?.name}
                    className="w-full h-48 lg:h-64 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>
              ) : (
                <p className="text-red-500">Image not available</p>
              )}

              <p className="text-gray-600 text-sm lg:text-base mb-6">
                {project?.description}
              </p>

              <div className="border-t border-gray-300 pt-6">
                <h3 className="text-lg lg:text-xl font-semibold text-gray-800 mb-2">
                  Details:
                </h3>
                <p className="text-gray-600 text-sm lg:text-base">
                  {project?.detail}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-lg lg:text-xl text-gray-600">
              Loading...
            </div>
          )}
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-full lg:w-1/4 bg-gradient-to-br from-blue-400 to-blue-600 text-white p-6 rounded-lg shadow-lg m-4 lg:m-4">
        <h2 className="text-lg lg:text-xl font-bold mb-6">Services</h2>
        <ul className="space-y-4">
          {[
            "Web Development",
            "App Development",
            "Game Development",
            "BlockChain Development",
            "Generative AI",
            "UI/UX Design",
            "Database Security",
          ].map((service, index) => (
            <li
              key={index}
              className="cursor-pointer bg-blue-500 p-3 rounded-lg hover:bg-blue-400 transition text-sm lg:text-base"
            >
              <span className="flex items-center justify-between">
                {service} <span>&raquo;</span>
              </span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default Details;
