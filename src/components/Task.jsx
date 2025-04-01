import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import { useProject } from "@/context/ProjectContext";

export default function Task() {
  const { projectStates, addTask, deleteTask, toggleTask, deleteAllTasks } =
    useProject();
  const [valueAddTask, setValueAddTask] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteAll, setModalDeleteAll] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const inputRef = useRef(null);

  const selectedProject = projectStates?.project.find(
    (project) => project.id === projectStates.selectedProjectId
  );

  const handleAddTask = () => {
    if (!valueAddTask.trim()) return;
    addTask(valueAddTask);
    setValueAddTask("");
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <section>
      <>
        <div className="flex items-center justify-between gap-2 mb-4">
          <input
            ref={inputRef}
            className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
            type="text"
            onChange={(e) => setValueAddTask(e.target.value)}
            value={valueAddTask}
            placeholder="Add a new task..."
            onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
          />
          <button
            className={`px-4 py-2 rounded transition ${
              valueAddTask.trim()
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>

        {selectedProject.tasks.length === 0 ? (
          <p className="text-stone-800 mb-4">
            This project does not have any tasks yet
          </p>
        ) : (
          <div>
            <div className="flex justify-end mb-3">
              <button
                onClick={() => setModalDeleteAll(true)}
                className="px-3 py-1 text-sm font-semibold rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Delete All
              </button>
            </div>
            <ul>
              {selectedProject.tasks.toReversed().map((task) => (
                <li
                  key={task.id}
                  className="flex items-center mb-2 justify-between bg-gray-100 p-3 rounded-lg shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => toggleTask(task.id)}
                      className="cursor-pointer"
                    />
                    <span
                      className={
                        task.isDone ? "line-through text-gray-500" : ""
                      }
                    >
                      {task.title}
                    </span>
                  </div>
                  <button
                    className="text-red-500 hover:text-red-600 transition"
                    onClick={() => {
                      setSelectedTaskId(task.id);
                      setModalVisible(true);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Modal Konfirmasi Hapus */}
        {modalVisible && (
          <Modal
            confirmation={true}
            visible={modalVisible}
            type="error"
            onClose={() => setModalVisible(false)}
            onDelete={() => {
              deleteTask(selectedTaskId);
              setModalVisible(false);
            }}
          >
            <p>Are you sure you want to delete this task?</p>
          </Modal>
        )}

        {/* Modal Konfirmasi Hapus Semua */}
        {modalDeleteAll && (
          <Modal
            confirmation={true}
            visible={modalDeleteAll}
            type="error"
            onClose={() => setModalDeleteAll(false)}
            onDelete={() => {
              deleteAllTasks();
              setModalDeleteAll(false);
            }}
          >
            <p>Are you sure you want to delete all tasks?</p>
          </Modal>
        )}
      </>
    </section>
  );
}
