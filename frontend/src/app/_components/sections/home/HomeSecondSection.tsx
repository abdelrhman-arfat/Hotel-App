"use client";
import { SwiperSlide } from "swiper/react";

import RoomCard from "../../card/RoomCard";
import AppSwiper from "../../AppSwiper";
import CardAnimation from "../../CardAnimation";
import { motion } from "framer-motion";
import { useGetFeaturedRoomsQuery } from "@/app/_RTK/RTK-query/query";
import RoomCardSkeleton from "../../card/RoomCardSkeleton";
import Link from "next/link";

const HomeSecondSection = () => {
  const { data, isLoading } = useGetFeaturedRoomsQuery();
  return (
    <section id="featured" className="py-20 ">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🌟 Featured Rooms
      </h2>
      <AppSwiper>
        {isLoading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SwiperSlide key={index}>
                <CardAnimation>
                  <RoomCardSkeleton />
                </CardAnimation>
              </SwiperSlide>
            ))
          : data?.data?.data.map((room) => (
              <SwiperSlide key={room.id + room.title}>
                <CardAnimation>
                  <RoomCard room={room} />
                </CardAnimation>
              </SwiperSlide>
            ))}
      </AppSwiper>

      <motion.div
        className="flex justify-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/rooms">
          <motion.button
            className="bg-primary hover:bg-primary/90 transition-colors duration-300 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg 0 flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View All Rooms
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </motion.svg>
          </motion.button>
        </Link>
      </motion.div>
    </section>
  );
};

export default HomeSecondSection;
