"use client";
import React from "react";
import { SwiperSlide } from "swiper/react";
import AppSwiper from "../../AppSwiper";
import ReviewCard from "../../card/ReviewCard";
import CardAnimation from "../../CardAnimation";
import { TReview } from "@/app/types/Review";
import { useGetSomeReviewsQuery } from "@/app/_RTK/RTK-query/query";
import ReviewCardSkeleton from "../../card/ReviewCardSkeleton";

const HomeReviewSection = () => {
  const { data, isLoading } = useGetSomeReviewsQuery();

  return (
    <section className="py-10  bg-gray-50">
      {Array.isArray(data?.data?.data) && data.data.data.length && (
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          💬 What Our Guests Say
        </h2>
      )}
      <AppSwiper>
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <SwiperSlide key={index}>
                <CardAnimation>
                  <ReviewCardSkeleton />
                </CardAnimation>
              </SwiperSlide>
            ))
          : data?.data?.data &&
            Array.isArray(data?.data?.data) &&
            data?.data?.data.map((review: TReview, index) => (
              <SwiperSlide key={index + "review-di"}>
                <CardAnimation>
                  <ReviewCard review={review} />
                </CardAnimation>
              </SwiperSlide>
            ))}
      </AppSwiper>
    </section>
  );
};

export default HomeReviewSection;
