import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative flex justify-center items-center w-10 h-10 border-8 border-gray-200 border-t-blue-500 rounded-full animate-spin md:w-8 md:h-8 md:border-[6px] sm:w-6 sm:h-6 sm:border-[4px]">
        <div className="absolute w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin md:w-6 md:h-6 md:border-[3px] sm:w-4 sm:h-4 sm:border-[2px]" />
      </div>
    </div>
  );
};

export default Spinner;
