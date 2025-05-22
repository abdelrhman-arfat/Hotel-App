import { TReview } from "@/app/types/Review";
import React from "react";

const ReviewInRoomPage = ({ review }: { review: TReview }) => {
  return (
    <div
      key={review.id}
      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-bold text-lg text-gray-900">
          {review.user.email || "Anonymous"}
        </span>
        <span className="text-yellow-500 text-lg">
          {"★".repeat(review.rate)}
          <span className="text-gray-300">{"★".repeat(5 - review.rate)}</span>
        </span>
      </div>
      <p className="text-gray-700">{review.review_text}</p>
    </div>
  );
};

export default ReviewInRoomPage;
