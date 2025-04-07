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
      <div className="w-full  md:w-4/5 lg:w-3/5 mt-16 px-4">
        <div className="border-b-2 border-stone-300 mb-4">
          <header className="flex justify-between my-4">
            <h2 className="text-lg md:text-3xl font-bold text-gray-900">
              {
                projectStates.project.find(
                  (p) => p.id === projectStates.selectedProjectId
                )?.Title
              }
            </h2>
            <button
              onClick={() => setModalVisible(true)}
              className="text-stone-600 hover:text-red-600 text-xs md:text-base"
            >
              Delete
            </button>
          </header>
          <p className="text-stone-400 mb-4 text-xs md:text-base">
            {formattedDate}
          </p>
          <p className="text-stone-800 mb-4 whitespace-pre-wrap text-base md:text-lg">
            {
              projectStates.project.find(
                (p) => p.id === projectStates.selectedProjectId
              )?.Description
            }
          </p>
        </div>
        <footer className="text-stone-800 font-bold mb-4 md:text-2xl">
          TASKS
        </footer>
        <Task />
        <Button className="mt-8" onClick={handleCloseProject}>
          Close
        </Button>
      </div>
    </>
  );
}
