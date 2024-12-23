// src/context/ProjectContext.tsx
import React, { createContext, useState, ReactNode, useContext } from "react";
import { Project } from "../types/project";

// Create the context
const ProjectContext = createContext<{
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}>({
  projects: [],
  setProjects: () => {},
});

// Create a provider component
export const ProjectProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  console.count('CONTEXT')

  return (
    <ProjectContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Create a custom hook for easy access to the context
export const useProjects = () => useContext(ProjectContext);
