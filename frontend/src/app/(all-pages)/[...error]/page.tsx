import Link from "next/link";
import React from "react";

const NotFoundPage = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Animated Blobs */}
      <div className="absolute top-[-5rem] left-[-5rem] w-[300px] h-[300px] bg-blue-400 opacity-50 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-5rem] right-[-5rem] w-[300px] h-[300px] bg-purple-400 opacity-50 rounded-full filter blur-3xl animate-pulse"></div>

      <div className="relative z-10 text-center p-6 max-w-md">
        <h1 className="text-7xl font-extrabold text-red-500 dark:text-white">
          404
        </h1>
        <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 mt-4">
          Page not found{" "}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          The page you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block mt-6 px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-400 transition-all shadow-lg"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
