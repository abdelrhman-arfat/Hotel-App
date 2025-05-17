"use client";
import ReservationSkeleton from "@/app/_components/ReservationSkeleton";
import ReservationTable from "@/app/_components/ReservationTable";
import { useGetMyReservationsQuery } from "@/app/_RTK/RTK-query/query";
import React from "react";
const Page = () => {
  const { data,isLoading } = useGetMyReservationsQuery();
  return (
    <div>
      {isLoading ? (
        <ReservationSkeleton />
      ) : (
        data &&
        Array.isArray(data?.data?.data) && (
          <ReservationTable
            caption="Your reservation history"
            reservations={data?.data?.data}
          />
        )
      )}
    </div>
  );
};

export default Page;
