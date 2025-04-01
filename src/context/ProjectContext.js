"use client";
import { createContext, useContext, useState } from "react";

const ProjectContext = createContext();

export function ProjectProvider({ children }) {
  const [projectStates, setProjectStates] = useState({
    selectedProjectId: undefined,
    project: [],
  });

  const setSelectedProject = (project) => {
    setProjectStates((prev) => ({ ...prev, selectedProjectId: project.id }));
  };

  const handleStartAddProject = () => {
    setProjectStates((prev) => {
      return {
        ...prev,
        selectedProjectId: null,
      };
    });
  };

  const handleCloseProject = () => {
    setProjectStates((prev) => {
      return {
        ...prev,
        selectedProjectId: undefined,
      };
    });
  };

  const closeProject = () => {
    setProjectStates((prev) => ({ ...prev, selectedProjectId: undefined }));
  };

  const handleAddProject = (projectData) => {
    const newProject = {
      id: Math.random(),
      ...projectData,
      tasks: [],
    };
    setProjectStates((prev) => ({
      ...prev,
      project: [...prev.project, newProject],
    }));
  };

  const handleDeleteProject = (projectId) => {
    setProjectStates((prev) => ({
      ...prev,
      selectedProjectId: undefined,
      project: prev.project.filter((p) => p.id !== projectId),
    }));
  };

  const addTask = (task) => {
    setProjectStates((prevState) => ({
      ...prevState,
      project: prevState.project.map((project) =>
        project.id === prevState.selectedProjectId
          ? {
              ...project,
              tasks: [
                ...(project.tasks || []),
                { id: Math.random(), title: task, isDone: false },
              ],
            }
          : project
      ),
    }));
  };

  const deleteTask = (taskId) => {
    setProjectStates((prevState) => ({
      ...prevState,
      project: prevState.project.map((project) =>
        project.id === prevState.selectedProjectId
          ? {
              ...project,
              tasks: project.tasks.filter((task) => task.id !== taskId),
            }
          : project
      ),
    }));
  };

  const toggleTask = (taskId) => {
    setProjectStates((prevState) => ({
      ...prevState,
      project: prevState.project.map((project) =>
        project.id === prevState.selectedProjectId
          ? {
              ...project,
              tasks: project.tasks.map((task) =>
                task.id === taskId ? { ...task, isDone: !task.isDone } : task
              ),
            }
          : project
      ),
    }));
  };

  const deleteAllTasks = () => {
    setProjectStates((prevState) => ({
      ...prevState,
      project: prevState.project.map((project) =>
        project.id === prevState.selectedProjectId
          ? { ...project, tasks: [] } // Kosongkan array tasks
          : project
      ),
    }));
  };

  return (
    <ProjectContext.Provider
      value={{
        projectStates,
        setProjectStates,
        setSelectedProject,
        closeProject,
        handleAddProject,
        handleDeleteProject,
        addTask,
        deleteTask,
        toggleTask,
        deleteAllTasks,
        handleStartAddProject,
        handleCloseProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

// Hook untuk menggunakan context di komponen lain
export function useProject() {
  return useContext(ProjectContext);
}
