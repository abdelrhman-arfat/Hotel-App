"use client";
import { useGetAllRoomsQuery } from "@/app/_RTK/RTK-query/query";
import { useFilterSelector } from "@/app/hooks/appSelector";
import RoomCard from "../../card/RoomCard";
import Pagination from "../../Pagination";
import { useState } from "react";
import GridCards from "../../GridCards";
import { motion } from "framer-motion";
import RoomCardSkeleton from "../../card/RoomCardSkeleton";
const RoomsSection = () => {
  const filter = useFilterSelector();
  const [page, setPage] = useState<number>(1);
  const { data, isLoading } = useGetAllRoomsQuery({
    ...(filter as object),
    page: page,
  });

  if (isLoading) {
    return (
      <GridCards>
        {Array.from({ length: 8 }).map((_, index) => (
          <RoomCardSkeleton key={index} />
        ))}
      </GridCards>
    );
  }

  return (
    <section>
      {data && data.data.totalPages && (
        <Pagination
          page={page}
          setPage={setPage}
          totalPage={data?.data.totalPages}
        />
      )}

      <GridCards>
        {data &&
        Array.isArray(data?.data?.data) &&
        data.data.data.length > 0 ? (
          data.data.data.map((room) => (
            <motion.div
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.7,
                  ease: "easeOut",
                },
              }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true, amount: 0.5 }}
              key={room.id + "room-in-rooms"}
            >
              <RoomCard room={room} />
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center p-8 text-center animate-fadeIn">
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 p-8 shadow-lg border border-purple-100 transform transition-all duration-300 hover:scale-105">
              <h3 className="mb-4 text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                No Rooms Available
              </h3>
              <p className="text-gray-700 animate-pulse">
                We couldn&apos;t find any rooms matching your criteria. Try
                adjusting your filters.
              </p>
              <div className="mt-4 w-16 h-1 mx-auto bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
            </div>
          </div>
        )}
      </GridCards>
    </section>
  );
};

export default RoomsSection;
