import { Badge } from "@/components/ui/badge";
import { CardTitle } from "@/components/ui/card";
import React from "react";

const RoomInfoCard = ({
  title,
  description,
  price_per_day,
  family_count,
  room_count,
}: {
  title: string;
  description: string;
  price_per_day: number;
  family_count: number;
  room_count: number;
}) => {
  return (
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
      <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
    </div>
  );
};

export default RoomInfoCard;
