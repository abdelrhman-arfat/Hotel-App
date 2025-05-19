import React from "react";
import { Card, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRoom } from "@/app/types/Room";
import { TReview } from "@/app/types/Review";
import RoomHeroCardImages from "./RoomHeroCardImages";

const RoomHeroCardDisplay: React.FC<TRoom> = ({
  title,
  description,
  price_per_day,
  family_count,
  room_count,
  main_image,
  room_images,
  reviews,
}) => {
  const demoReviews = [
    {
      id: 1,
      user: "Alice",
      rating: 5,
      comment: "Amazing stay! Super clean and modern.",
    },
    {
      id: 2,
      user: "Bob",
      rating: 4,
      comment: "Very comfortable and great location.",
    },
    {
      id: 3,
      user: "Charlie",
      rating: 5,
      comment: "Staff were friendly and helpful. Highly recommend.",
    },
  ];
  const isProduction = process.env.NODE_ENV === "production";

  return (
    <Card className="w-full mx-auto shadow-xl rounded-3xl overflow-hidden bg-white backdrop-blur-sm bg-opacity-95">
      <div className="flex flex-col lg:flex-row">

        <RoomHeroCardImages
          main_image={main_image}
          title={title}
          room_images={room_images}
        />

        {/* Right: Info + Reviews */}
        <div className="w-full lg:w-2/5 p-8 flex flex-col gap-8 bg-gray-50">
          <div>
            <CardTitle className="text-3xl font-bold text-gray-900 mb-6">
              {title}
            </CardTitle>
            <div className="flex flex-wrap gap-3 mb-6">
              <Badge className="px-4 py-2 text-lg bg-primary text-white">
                ${price_per_day} / night
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                Family: {family_count}
              </Badge>
              <Badge variant="outline" className="px-4 py-2">
                Rooms: {room_count}
              </Badge>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">
              {description}
            </p>
            {/* Valid Date */}
            {/* Reviews section */}
            <div className="mt-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h3>
              {reviews && reviews.length > 0 ? (
                <div className="space-y-6">
                  {reviews.map((r: TReview) => (
                    <div
                      key={r.id}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-lg text-gray-900">
                          {r.user.email || "Anonymous"}
                        </span>
                        <span className="text-yellow-500 text-lg">
                          {"★".repeat(r.rate)}
                          <span className="text-gray-300">
                            {"★".repeat(5 - r.rate)}
                          </span>
                        </span>
                      </div>
                      <p className="text-gray-700">{r.review_text}</p>
                    </div>
                  ))}
                </div>
              ) : !isProduction ? (
                <div className="space-y-6">
                  {demoReviews.map((r) => (
                    <div
                      key={r.id}
                      className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-bold text-lg text-gray-900">
                          {r.user}
                        </span>
                        <span className="text-yellow-500 text-lg">
                          {"★".repeat(r.rating)}
                          <span className="text-gray-300">
                            {"★".repeat(5 - r.rating)}
                          </span>
                        </span>
                      </div>
                      <p className="text-gray-700">{r.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 italic text-center text-lg">
                  No reviews yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoomHeroCardDisplay;
