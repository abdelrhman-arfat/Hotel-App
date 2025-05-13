import { TRoom } from "@/app/types/Room";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaUsers } from "react-icons/fa";

const RoomCard = ({ room }: { room: TRoom }) => {
  return (
    <Card className="my-2 hover:shadow-md hover:scale-[1.01] duration-300 rounded-2xl">
      <CardHeader>
        <div className="relative h-48 w-full overflow-hidden rounded-xl">
          <Image
            src={room.main_image}
            alt={room.title}
            fill
            className="object-cover"
          />
        </div>
        <CardTitle className="text-xl mt-3 font-bold text-primary">
          {room.title}
        </CardTitle>
        <p className="text-sm mt-1 min-h-[40px] line-clamp-2 text-gray-600">
          {room.description}
        </p>
      </CardHeader>
      <CardContent className="mt-1">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-green-600">
            💵 ${room.price_per_day}{" "}
            <span className="text-sm text-gray-500">/day</span>
          </p>

          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <FaUsers className="text-md" />
            {room.family_count}
          </div>
        </div>

        <p className="text-sm text-gray-500 mt-1">
          Rooms count: <span className="font-medium">{room.room_count}</span>
        </p>

        <Link
          href={`/rooms/${room.id}`}
          className="w-full mt-4 block text-center py-2 px-4 bg-neutral-100 text-neutral-700  rounded-lg hover:text-white hover:bg-neutral-600 transition-colors duration-200 font-medium"
        >
          View Details
        </Link>
      </CardContent>
    </Card>
  );
};

export default RoomCard;
