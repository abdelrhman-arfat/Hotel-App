import React from "react";

const MyLoader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="w-16 h-16 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default MyLoader;
