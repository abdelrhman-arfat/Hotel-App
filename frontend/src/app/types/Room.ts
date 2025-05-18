export type TRoom = {
  id: number;
  title: string;
  price_per_day: string;
  main_image: string;
  room_images?: { image: string; id: number }[];
  description: string;
  family_count: number;
  room_count: number;
};
