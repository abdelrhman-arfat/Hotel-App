"use client";
import { useGetManagerAnalyticsQuery } from "@/app/_RTK/RTK-query/query";
import React from "react";
import { Users, Hotel, CalendarCheck } from "lucide-react";
import DashboardCountCard from "@/app/_components/card/DashboardCountCard";
import DashboardChart from "@/app/_components/card/DashboardChart";
import DashboardCardSkeleton from "@/app/_components/card/DashboardCardSkeleton";
import DashboardChartSkeleton from "@/app/_components/card/DashboardChartSkeleton";

const Page = () => {
  const { data, isLoading } = useGetManagerAnalyticsQuery(
    {},
    {
      pollingInterval: 5000,
    }
  );
  if (isLoading) {
    return (
      <div>
        <div className="grid gap-4 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <DashboardCardSkeleton key={index} />
          ))}
        </div>
        <DashboardChartSkeleton />
      </div>
    );
  }

  const { users, rooms, reservations, chartEarnedMonth } =
    data?.data?.data || {};

  const cards = [
    {
      title: "Total Users",
      value: users || 0,
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Total Rooms",
      value: rooms || 0,
      icon: <Hotel className="h-6 w-6 text-muted-foreground" />,
    },
    {
      title: "Total Reservations",
      value: reservations || 0,
      icon: <CalendarCheck className="h-6 w-6 text-muted-foreground" />,
    },
  ];

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card, index) => (
          <DashboardCountCard key={index + "dashboard-card"} card={card} />
        ))}
      </div>
      <div>
        {chartEarnedMonth && <DashboardChart data={chartEarnedMonth} />}
      </div>
    </div>
  );
};

export default Page;
