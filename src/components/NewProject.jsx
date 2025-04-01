import React, { useRef, useState } from "react";
import Input from "./Input";
import Modal from "./Modal";
import { useProject } from "@/context/ProjectContext";

export default function NewProject() {
  const { handleCloseProject, handleAddProject } = useProject();

  const titleRef = useRef();
  const decsriptionRef = useRef();
  const dateRef = useRef();

  const [ModalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleSave = () => {
    const title = titleRef.current.value;
    const description = decsriptionRef.current.value;
    const date = dateRef.current.value;

    if (!title || !description || !date) {
      setModalVisible(true);
      setModalData({ title, description, date });
      return;
    }

    handleAddProject({ Title: title, Description: description, Duedate: date });
    handleCloseProject();
  };

  return (
    <>
      <Modal
        visible={ModalVisible}
        onClose={() => setModalVisible(false)}
        type="error"
      >
        <h1 className="text-lg md:text-2xl text-stone-800 font-bold">
          Invalid Input
        </h1>
        {modalData?.title === "" &&
        modalData?.description === "" &&
        modalData?.date === "" ? (
          <p className="text-stone-500 text-sm md:text-base">
            Please Fill all the fields
          </p>
        ) : (
          <>
            {!modalData?.title && (
              <p className="text-stone-500 text-sm md:text-base">
                Please Fill the title
              </p>
            )}
            {!modalData?.description && (
              <p className="text-stone-500 text-sm md:text-base">
                Please Fill the description
              </p>
            )}
            {!modalData?.date && (
              <p className="text-stone-500 text-sm md:text-base">
                Please Fill the date
              </p>
            )}
          </>
        )}
      </Modal>

      <div className="w-full max-w-2xl px-4 md:px-8 py-12">
        <menu className="flex items-center justify-end gap-4 mb-6">
          <li>
            <button
              className="text-gray-500 hover:text-gray-700 px-4 md:px-5 py-2 rounded-lg"
              onClick={handleCloseProject}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleSave}
              className="px-5 md:px-6 py-2 rounded-lg bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>

        <div className="flex flex-col gap-4">
          <Input type="text" ref={titleRef} label="Title" />
          <Input ref={decsriptionRef} label="Description" textArea />
          <Input type="date" ref={dateRef} label="Due Date" />
        </div>
      </div>
    </>
  );
}
