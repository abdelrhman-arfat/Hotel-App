import { TReview } from "./Review";

export type TRoom = {
  id: number;
  title: string;
  price_per_day: string;
  main_image: string;
  room_images?: TRoomImage[];
  description: string;
  family_count: number;
  room_count: number;
  reviews?: TReview[];
};

export type TRoomImage = {
  id: number;
  image: string;
  room_id: number;
  createdAt: string;
};
