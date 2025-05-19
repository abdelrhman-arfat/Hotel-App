import { TRoomImage } from "@/app/types/Room";
import { CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

const RoomHeroCardImages = ({
  main_image,
  title,
  room_images,
}: {
  main_image: string;
  title: string;
  room_images?: TRoomImage[];
}) => {
  return (
    <div className="w-full lg:w-3/5 flex flex-col gap-6">
      <CardHeader className="px-4">
        <div className="relative w-full h-[70vh]">
          <Image
            src={main_image}
            alt={title}
            fill
            className="object-cover rounded-xl w-full h-full"
            priority
          />
        </div>
      </CardHeader>

      {/* Gallery below main image */}
      {room_images && room_images.length > 0 && (
        <div className="px-6 pb-6">
          <h3 className="font-bold text-xl text-gray-900 mb-4">Gallery</h3>
          <div className="grid grid-cols-3  gap-4">
            {room_images.map((img) => (
              <div
                key={img.id}
                className="relative  aspect-square rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <Image
                  priority
                  src={img.image}
                  alt={`Room image ${img.id}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomHeroCardImages;
