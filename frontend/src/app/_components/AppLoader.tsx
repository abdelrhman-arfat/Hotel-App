import React from "react";

interface AppLoaderProps {
  size?: "sm" | "md" | "lg";
  overlay?: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({
  size = "md",
  overlay = true,
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-16 h-16",
    lg: "w-24 h-24",
  };

  const spinnerSize = sizeClasses[size];

  return (
    <div
      className={`
      ${overlay ? "fixed inset-0 bg-white z-50" : ""} 
      flex items-center flex-col gap-3 justify-center
    `}
    >
      <div className="relative ">
        <div
          className={`${spinnerSize} border-t-4 border-blue-500 border-solid rounded-full animate-spin`}
          role="status"
          aria-label="Loading"
        />
        <div
          className={`absolute top-0 ${spinnerSize} border-r-4 border-green-500 border-solid rounded-full animate-[spin_2s_linear_infinite]`}
        />
        <div
          className={`absolute top-0 ${spinnerSize} border-b-4 border-red-500 border-solid rounded-full animate-[spin_3s_linear_infinite]`}
        />
      </div>

      <p className="text-sm text-gray-700">Loading...</p>
    </div>
  );
};

export default AppLoader;
