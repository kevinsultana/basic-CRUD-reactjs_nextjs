"use client";
import NewProject from "@/components/NewProject";
import NoProjectSelected from "@/components/NoProjectSelected";
import ProjectSideBar from "@/components/ProjectSideBar.jsx";
import SelectedProject from "@/components/SelectedProject";
import { useEffect } from "react";
import { saveData, getData } from "@/storage/storage";
import { useProject } from "@/context/ProjectContext";

export default function Home() {
  const { projectStates, setProjectStates } = useProject();

  useEffect(() => {
    const storedProjects = getData("projects");
    if (storedProjects) {
      setProjectStates(storedProjects);
    }
  }, []);

  useEffect(() => {
    saveData("projects", projectStates);
  }, [projectStates]);

  let content;
  if (projectStates.selectedProjectId === undefined) {
    content = <NoProjectSelected />;
  } else if (projectStates.selectedProjectId === null) {
    content = <NewProject />;
  } else if (projectStates.selectedProjectId) {
    content = <SelectedProject />;
  }

  return (
    <main className="h-screen my-8 flex">
      <ProjectSideBar />
      <div className="w-full">{content}</div>
    </main>
  );
}
