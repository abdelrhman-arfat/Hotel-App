import Image from "next/image";
import React from "react";
import { TReservation } from "../types/Reservation";

const ReservationCard = ({ reservation }: { reservation: TReservation }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 border p-6 rounded-xl shadow-md bg-white">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <Image
          width={500}
          height={300}
          src={reservation.room.main_image}
          alt={reservation.room.title}
          className="w-full h-full max-h-64 object-cover rounded-lg"
        />
      </div>

      {/* Info Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800 border-b pb-2">
          Reservation Details
        </h2>

        <div className="grid grid-cols-1 gap-3 text-gray-700">
          <div>
            <span className="font-medium text-gray-600">🏨 Room:</span>{" "}
            <span className="font-semibold">{reservation.room.title}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">💵 Total Price:</span>{" "}
            <span className="font-semibold">${reservation.total_price}</span>
          </div>
          <div>
            <span className="font-medium text-gray-600">📅 Start Date:</span>{" "}
            <span className="font-semibold">
              {new Date(reservation.start_date).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600">📅 End Date:</span>{" "}
            <span className="font-semibold">
              {new Date(reservation.end_date).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-600">⏳ Days Count:</span>{" "}
            <span className="font-semibold">{reservation.days_count}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;
