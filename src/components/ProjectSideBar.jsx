import React from "react";
import Button from "./Button.jsx";
import { useProject } from "@/context/ProjectContext.js";

export default function ProjectSideBar() {
  const { projectStates, setSelectedProject, handleStartAddProject } =
    useProject();
  let className = "w-full text-left px-2 py-1 rounded-sm my-1 ";
  return (
    <aside className="w-1/3 px-6  bg-stone-900 text-stone-200 md:w-80 rounded-r-xl">
      <h2 className=" text-xs md:text-2xl font-bold  mt-16 mb-8 uppercase text-stone-200">
        your projects
      </h2>
      <div className="bg-linear-to-r text-center py-1 px-2 md:w-44 from-cyan-700 to-blue-700 text-stone-100 hover:from-blue-500 hover:to-cyan-500 hover:text-stone-200 rounded-md">
        <button
          className="text-xs  md:text-xl font-bold  text-stone-200"
          onClick={handleStartAddProject}
        >
          + add Project
        </button>
      </div>
      <ul className="mt-8">
        {projectStates?.project.map((project) => (
          <li key={project.id} className="mb-4">
            <button
              onClick={() => setSelectedProject(project)}
              className={
                className +
                (projectStates.selectedProjectId === project.id
                  ? "text-stone-200   bg-stone-700"
                  : "text-stone-400 hover:bg-stone-700 hover:text-stone-200")
              }
            >
              {project.Title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
