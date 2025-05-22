import React from "react";
import { Card } from "@/components/ui/card";
import { TRoom } from "@/app/types/Room";
import { TReview } from "@/app/types/Review";
import RoomHeroCardImages from "./RoomHeroCardImages";
import ReviewInRoomPage from "./ReviewInRoomPage";
import ValidDate from "../ValidDate";
import RoomInfoCard from "./RoomInfoCard";

const RoomHeroCardDisplay: React.FC<TRoom> = ({
  id,
  title,
  description,
  price_per_day,
  family_count,
  room_count,
  main_image,
  room_images,
  reviews,
}) => {
  return (
    <Card className="w-full mx-auto shadow-xl rounded-3xl overflow-hidden bg-white backdrop-blur-sm bg-opacity-95">
      <div className="flex flex-col lg:flex-row w-full ">
        <div className="w-full lg:w-3/5 flex flex-col gap-4 relative z-0">
          <RoomHeroCardImages
            main_image={main_image}
            title={title}
            room_images={room_images}
          />
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Reviews</h3>
            {reviews && reviews.length > 0 ? (
              <div className="space-y-6">
                {reviews.map((r: TReview) => (
                  <ReviewInRoomPage review={r} key={r.id} />
                ))}
              </div>
            ) : (
              <div className="text-gray-500 italic text-center text-lg">
                No reviews yet.
              </div>
            )}
          </div>
        </div>

        {/* Right: Info + Reviews */}
        <div className="w-full lg:w-2/5 py-8 flex flex-col gap-8 bg-gray-50">
          <div>
            <RoomInfoCard
              title={title}
              description={description}
              price_per_day={+price_per_day}
              family_count={family_count}
              room_count={room_count}
            />
            {/* Valid Date */}
            <ValidDate id={id} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default RoomHeroCardDisplay;
