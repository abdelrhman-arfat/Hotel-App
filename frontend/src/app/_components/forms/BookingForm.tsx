"use client";
import axiosInstance from "@/lib/API/axiosInstance";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback, useState, useMemo, FormEvent } from "react";
import toast from "react-hot-toast";

type BookingFormProps = {
  roomId: number;
  startDate: Date;
  endDate: Date;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookingForm = ({
  roomId,
  startDate: initialStartDate,
  endDate,
  setIsOpen,
}: BookingFormProps) => {
  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [daysCount, setDaysCount] = useState<number>(1);

  const router = useRouter();

  const endDateISO = endDate.toISOString().split("T")[0];
  const startDateISO = startDate.toISOString().split("T")[0];

  const MaxDays = useMemo(() => {
    const diffDays = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return Math.max(1, diffDays + 1);
  }, [startDate, endDate]);

  const handleBooking = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const dayCount = Number(formData.get("daysCount"));

      toast
        .promise(
          axiosInstance.post(`/reservation/create-stripe-session`, {
            roomId,
            startDay: startDate,
            totalDays: dayCount,
          }),
          {
            loading: "Booking...",
            success: (res) => {
              return res.data.message || "session Created successfully";
            },
            error: (error) =>
              error.response?.data?.message || "Booking failed!",
          }
        )
        .then((res) => {
          router.push(res.data.data.data.url);
          setIsOpen(false);
        });
    },
    [roomId, startDate, router, setIsOpen]
  );

  // Clamp daysCount to MaxDays to prevent invalid input
  const handleDaysCountChange = (value: number) => {
    if (value < 1) return setDaysCount(1);
    if (value > MaxDays) return setDaysCount(MaxDays);
    setDaysCount(value);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-white/90 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="bookingFormTitle"
    >
      <form
        onSubmit={handleBooking}
        className="relative space-y-6 p-6 bg-white border rounded-lg shadow-lg w-full max-w-md"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close booking form"
          className="absolute top-4 right-4 text-gray-500 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 rounded"
        >
          <X size={24} />
        </button>

        <h2
          id="bookingFormTitle"
          className="text-xl font-semibold text-gray-800 text-center"
        >
          Book Room #{roomId}
        </h2>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="startDate"
            className="text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            id="startDate"
            name="startDate"
            type="date"
            value={startDateISO}
            min={startDateISO}
            max={endDateISO}
            onChange={(e) => {
              const newDate = new Date(e.target.value);
              // Allow equal to endDate too
              if (newDate <= endDate) {
                setStartDate(newDate);
                setDaysCount(1);
              }
            }}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="daysCount"
            className="text-sm font-medium text-gray-700"
          >
            Number of Days
          </label>
          <input
            id="daysCount"
            name="daysCount"
            type="number"
            min={1}
            max={MaxDays}
            value={daysCount}
            onChange={(e) => handleDaysCountChange(Number(e.target.value))}
            className="border px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500">
            Max: {MaxDays} day{MaxDays > 1 ? "s" : ""}
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        >
          Book
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
