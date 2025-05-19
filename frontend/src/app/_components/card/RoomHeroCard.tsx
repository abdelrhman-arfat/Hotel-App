import axiosInstance from "@/lib/API/axiosInstance";
import React from "react";
import RoomHeroCardDisplay from "./RoomHeroCardDisplay";

interface IProps {
  id: string;
}

const RoomHeroCard = async ({ id }: IProps) => {
  const res = await axiosInstance.get(`/room/get-room/${id}`);
  const room = res.data.data;

  return (
    <RoomHeroCardDisplay
      id={room.id}
      title={room.title}
      description={room.description}
      price_per_day={room.price_per_day}
      family_count={room.family_count}
      room_count={room.room_count}
      main_image={room.main_image}
      room_images={room.room_images}
    />
  );
};

export default RoomHeroCard;
