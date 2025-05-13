import React from "react";

const RoomCardSkeleton = () => {
  return (
    <div className="my-2 rounded-2xl overflow-hidden shadow-md animate-pulse bg-gradient-to-br from-gray-200 via-gray-100 to-white">
      <div className="relative h-48 w-full bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-shimmer"></div>

      <div className="p-4 space-y-3">
        <div className="h-5 w-3/4 rounded-md bg-gray-300"></div>

        <div className="h-4 w-full rounded-md bg-gray-200"></div>
        <div className="h-4 w-5/6 rounded-md bg-gray-200"></div>

        <div className="flex justify-between mt-4">
          <div className="h-5 w-20 rounded-md bg-gray-300"></div>
          <div className="h-5 w-12 rounded-md bg-gray-300"></div>
        </div>

        <div className="h-4 w-32 rounded-md bg-gray-200 mt-2"></div>
      </div>
    </div>
  );
};

export default RoomCardSkeleton;
