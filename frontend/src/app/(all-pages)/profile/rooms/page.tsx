"use client";
import { useFilterSelector } from "@/app/hooks/appSelector";
import Pagination from "@/app/_components/Pagination";
import FilteringBar from "@/app/_components/sections/rooms/FilteringBar";
import { useGetAllRoomsQuery } from "@/app/_RTK/RTK-query/query";
import React, { useCallback, useState } from "react";
import RoomsTable from "@/app/_components/RoomsTable";
import RoomsTableSkeleton from "@/app/_components/RoomsTableSkeleton";
import axiosInstance from "@/lib/API/axiosInstance";
import toast from "react-hot-toast";

const Page = () => {
  const [page, setPage] = useState<number>(1);
  const filter = useFilterSelector();
  const { data, isLoading, refetch } = useGetAllRoomsQuery({
    page,
    limit: 50,
    ...filter,
  });

  const deleteFunc = useCallback(
    (roomId: number) => {
      toast
        .promise(axiosInstance.delete(`/room/${roomId}`, {}), {
          loading: "Updating room...",
          success: (res) => res.data.message || "Room updated successfully",
          error: (err) => err.response.data.message || "Failed to update room",
        })
        .then(() => refetch());
    },
    [refetch]
  );

  return (
    <div className="space-y-4">
      <FilteringBar />
      <Pagination
        page={page}
        setPage={setPage}
        totalPage={data?.data?.totalPages || 1}
      />

      {isLoading ? (
        <RoomsTableSkeleton />
      ) : (
        data &&
        Array.isArray(data?.data?.data) && (
          <RoomsTable
            deleteFunc={deleteFunc}
            refetch={refetch}
            rooms={data.data.data}
          />
        )
      )}
    </div>
  );
};

export default Page;
