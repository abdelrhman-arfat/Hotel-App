import { TReview } from "@/app/types/Review";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const ReviewCard = ({ review }: { review: TReview }) => {
  const renderStars = (rating: number) => {
    const filledStars = "⭐".repeat(rating);
    const grayStars = "★".repeat(5 - rating);
    return (
      <span>
        <span className="text-yellow-600">{filledStars}</span>
        <span className="text-gray-400">{grayStars}</span>
      </span>
    );
  };

  return (
    <Card className="rounded-2xl my-4 hover:scale-[1.01] shadow-sm hover:shadow-md transition-all duration-300 ease-in-out">
      <CardHeader className="flex flex-row items-center gap-4">
        {review.user.image ? (
          <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-yellow-500 ring-offset-2">
            <Image
              src={review.user.image}
              alt={review?.user?.full_name || "user image"}
              fill
              className="object-cover"
              sizes="(max-width: 48px) 100vw, 48px"
            />
          </div>
        ) : (
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-600 to-yellow-800 text-white flex items-center justify-center rounded-full text-lg font-bold ring-2 ring-yellow-500 ring-offset-2">
            {review?.user?.full_name.charAt(0).toUpperCase()}
          </div>
        )}
        <CardTitle className="text-lg font-semibold">
          {review.user.full_name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 italic min-h-20 line-clamp-3 text-base leading-relaxed">
          {review.review_text}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <span className="font-medium">{renderStars(review.rate)}</span>
          <span className="text-gray-500 text-[13px] sm:text-[15px]">
            {new Date(review.createdAt).toLocaleString().split(",")[0]}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
