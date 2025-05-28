import { Card } from "@/components/ui/card";
import React from "react";

const SkeletonValidDate = () => {
  return (
    <Card className="border border-gray-200 shadow-md rounded-2xl overflow-hidden animate-pulse">
      <div className="p-5 flex justify-between items-center">
        <div className="h-5 w-24 bg-gray-300 rounded"></div>
        <div className="h-5 w-5 bg-gray-300 rounded"></div>
      </div>

      <div className="px-5 pb-5 space-y-4">
        {[...Array(6)].map((_, idx) => (
          <div
            key={idx}
            className="p-4 min-h-[90px] bg-white border border-gray-100 rounded-xl shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-32 bg-gray-300 rounded"></div>
            </div>
            <div className="h-8 w-16 bg-gray-300 rounded-full"></div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SkeletonValidDate;
