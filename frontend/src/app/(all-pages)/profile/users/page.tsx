"use client";
import NavUsersFilter from "@/app/_components/NavUsersFilter";
import Pagination from "@/app/_components/Pagination";
import UsersTable from "@/app/_components/UsersTable";
import UsersTableSkeleton from "@/app/_components/UsersTableSkeleton";
import { useGetAllUsersQuery } from "@/app/_RTK/RTK-query/query";
import { TUserQuery } from "@/app/types/QueryUsers";
import { useState } from "react";

const Page = () => {
  const [userInfo, setUserInfo] = useState<TUserQuery>({});
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, refetch } = useGetAllUsersQuery(userInfo, {
    pollingInterval: 300000, 
  });
  
  return (
    <div>
      <NavUsersFilter userInfo={userInfo} setUserInfo={setUserInfo} />
      {isLoading ? (
        <UsersTableSkeleton />
      ) : (
        data &&
        data?.data?.totalPages && (
          <Pagination
            page={page}
            setPage={setPage}
            totalPage={data?.data?.totalPages}
          />
        )
      )}
      {data && Array.isArray(data?.data?.data) && (
        <UsersTable users={data?.data?.data} refetch={refetch} />
      )}
    </div>
  );
};

export default Page;
