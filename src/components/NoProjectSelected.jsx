import Image from "next/image";
import React from "react";
import Button from "./Button.jsx";
import { useProject } from "@/context/ProjectContext.js";

export default function NoProjectSelected() {
  const { handleStartAddProject } = useProject();
  return (
    <div className="flex flex-col items-center justify-center w-full px-4 md:w-2/3 text-center mt-10 md:mt-14">
      <Image
        src="/icon.png"
        alt="icon"
        width={200}
        height={200}
        className="w-20 h-20 md:w-24 md:h-24 object-contain"
      />
      <h2 className="text-lg md:text-xl font-bold text-stone-500 my-3 md:my-4">
        No Project Selected
      </h2>
      <p className="text-stone-400 text-sm md:text-base mb-3 md:mb-4">
        Please select a project or get started with a new project
      </p>
      <Button onClick={handleStartAddProject}>Get Started</Button>
    </div>
  );
}
