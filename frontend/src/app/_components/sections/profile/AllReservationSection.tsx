"use client";

import { useGetAllReservationsQuery } from "@/app/_RTK/RTK-query/query";
import { useState } from "react";
import ReservationFilter from "../../ReservationFilter";
import Pagination from "../../Pagination";
import ReservationSkeleton from "../../ReservationSkeleton";
import ReservationTable from "../../ReservationTable";

const AllReservationSection = () => {
  const [filter, setFilter] = useState<{ limit: string; isActive: string }>({
    limit: "10",
    isActive: "",
  });
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetAllReservationsQuery(
    {
      isActive: filter.isActive,
      limit: filter.limit,
      page: page,
    },
    {
      pollingInterval: 120000,
      refetchOnMountOrArgChange: true,
    }
  );
  return (
    <div>
      <ReservationFilter filter={filter} setFilter={setFilter} />
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={data?.data?.totalPages || 1}
      />
      {isLoading ? (
        <ReservationSkeleton />
      ) : (
        data &&
        Array.isArray(data?.data?.data) && (
          <ReservationTable
            reservations={data?.data?.data}
            caption="All Reservations"
          />
        )
      )}
    </div>
  );
};

export default AllReservationSection;
