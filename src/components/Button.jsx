import React from "react";

export default function Button({ children, ...props }) {
  return (
    <button
      {...props}
      className="bg-gradient-to-r from-cyan-700 to-blue-700 mt-4 text-stone-100 hover:from-blue-500 hover:to-cyan-500 hover:text-stone-200 rounded-md py-2 px-4 text-xs md:text-base"
    >
      {children}
    </button>
  );
}
