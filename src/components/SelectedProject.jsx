import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import Task from "./Task";
import { useProject } from "@/context/ProjectContext";

export default function SelectedProject() {
  const { projectStates, handleDeleteProject, handleCloseProject } =
    useProject();
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const formattedDate = formatDate(
    projectStates.project.find((p) => p.id === projectStates.selectedProjectId)
      ?.Duedate
  );

  const deletedProjectId = () => {
    handleDeleteProject(projectStates.selectedProjectId);
    setModalVisible(false);
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        confirmation={true}
        visible={modalVisible}
        type="error"
        onClose={() => setModalVisible(false)}
        onDelete={deletedProjectId}
      >
        <p>Are you sure you want to delete this project?</p>
      </Modal>
      <div className="w-full  md:w-1/2 mt-16 px-4">
        <div className="border-b-2 border-stone-300 mb-4">
          <header className="flex justify-between my-4">
            <h2 className="text-4xl font-bold text-gray-900">
              {
                projectStates.project.find(
                  (p) => p.id === projectStates.selectedProjectId
                )?.Title
              }
            </h2>
            <button
              onClick={() => setModalVisible(true)}
              className="text-stone-600 hover:text-red-600"
            >
              Delete
            </button>
          </header>
          <p className="text-stone-400 mb-4">{formattedDate}</p>
          <p className="text-stone-800 mb-4 whitespace-pre-wrap">
            {
              projectStates.project.find(
                (p) => p.id === projectStates.selectedProjectId
              )?.Description
            }
          </p>
        </div>
        <footer className="text-stone-800 font-bold mb-4">TASKS</footer>
        <Task />
        <Button onClick={handleCloseProject}>Close</Button>
      </div>
    </>
  );
}
