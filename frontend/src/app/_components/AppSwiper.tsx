"use client";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { Swiper } from "swiper/react";
const AppSwiper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="!px-8"
      >
        {children}
      </Swiper>

      <style jsx global>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #4a5568;
          transform: scale(0.7);
        }

        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          color: #2d3748;
        }

        .swiper-pagination-bullet-active {
          background: #4a5568 !important;
        }
      `}</style>
    </div>
  );
};

export default AppSwiper;
