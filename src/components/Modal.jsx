import React from "react";

const Modal = ({
  visible,
  onClose,
  children,
  type = "success",
  className = "",
  confirmation = false,
  onDelete,
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 px-10">
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-xs md:text-lg text-center ${className} ${
          type === "error"
            ? "border-red-500 text-red-700"
            : "border-green-500 text-green-700"
        } border-l-4`}
      >
        {children}

        {confirmation ? (
          <div className="flex flex-row justify-center items-center gap-6  mt-4">
            <button
              onClick={onClose}
              className="w-auto  px-4 py-2 text-gray-600 bg-gray-100 rounded hover:text-white hover:bg-gray-400 transition"
            >
              Cancel
            </button>
            <button
              onClick={onDelete}
              className="w-auto  px-4 py-2 text-red-700 bg-gray-100 rounded hover:text-red-600 hover:font-bold hover:bg-gray-200 transition"
            >
              Delete
            </button>
          </div>
        ) : (
          <div className="flex justify-center mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 w-full bg-gray-300 rounded hover:text-white hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
