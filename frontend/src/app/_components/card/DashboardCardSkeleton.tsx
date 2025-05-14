import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardCardSkeleton = () => {
  return (
    <Card className="bg-white hover:bg-gray-50 max-h-[170px] transition-all duration-300 transform hover:-translate-y-1 rounded-xl shadow-sm hover:shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-5 w-24" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <Skeleton className="h-8 w-20 mb-1" />
          <Skeleton className="h-5 w-28" />
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCardSkeleton;
