import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const DashboardChartSkeleton = () => {
  return (
    <div className="w-full mt-4 h-[400px] relative bg-background/40 rounded-lg p-6">
      <div className="w-full h-full relative">
        {/* XAxis */}
        <div className="absolute bottom-0 left-12 right-6 flex justify-between">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-16 mb-6" />
          ))}
        </div>

        {/* YAxis */}
        <div className="absolute left-0 top-4 bottom-12 flex flex-col justify-between">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 w-12" />
          ))}
        </div>

        {/* Bars */}
        <div className="absolute left-16 right-8 bottom-16 top-4 flex items-end justify-between">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              className="w-24 rounded-t-lg"
              style={{
                height: `${Math.random() * 80 + 20}%`,
                transition: "all 0.4s ease-in-out",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardChartSkeleton;
