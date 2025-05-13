import React from "react";

const ReviewCardSkeleton = () => {
  return (
    <div className="rounded-2xl my-4 hover:scale-[1.01] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out animate-pulse bg-gradient-to-br from-gray-100 via-white to-gray-200">
      <div className="flex flex-row items-center gap-4 p-4">
        <div className="w-12 h-12 rounded-full bg-gray-300 ring-2 ring-yellow-500 ring-offset-2"></div>

        <div className="h-4 w-32 rounded-md bg-gray-300"></div>
      </div>

      <div className="px-4 pb-4 space-y-3">
        <div className="h-4 w-full rounded-md bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded-md bg-gray-200"></div>
        <div className="h-4 w-3/4 rounded-md bg-gray-200"></div>

        <div className="flex justify-between items-center pt-4">
          <div className="h-4 w-24 rounded-md bg-gray-300"></div>
          <div className="h-4 w-16 rounded-md bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCardSkeleton;
