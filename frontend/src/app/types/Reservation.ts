import { TReview } from "./Review";
import { TRoom } from "./Room";
import { TUser } from "./User";

export type TReservation = {
  id: number;
  room_id: number;
  user_id: number;
  start_date: string;
  end_date: string;
  createdAt: string;
  updatedAt: string;
  room: TRoom;
  user: TUser;
  review: TReview;
};
