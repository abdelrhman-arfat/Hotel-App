import { TReview } from "./Review";
import { TRoom } from "./Room";
import { TUser } from "./User";

export type TReservation = {
  id: number;
  room_id: number;
  user_id: number;
  start_date: string;
  days_count: number;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  total_price: number;
  is_active: boolean;
  room: TRoom;
  user: TUser;
  review: TReview;
};
