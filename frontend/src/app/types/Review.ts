import { TReservation } from "./Reservation";
import { TRoom } from "./Room";
import { TUser } from "./User";

export type TReview = {
  id: number;
  review_text: string;
  rate: number;
  room: TRoom;
  reservation: TReservation;
  user: TUser;
  createdAt: string;
};
