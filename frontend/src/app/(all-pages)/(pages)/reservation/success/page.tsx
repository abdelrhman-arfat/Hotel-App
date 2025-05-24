"use client";

import axiosInstance from "@/lib/API/axiosInstance";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";

const ReservationSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (!sessionId || hasProcessed.current) return;

    hasProcessed.current = true;

    toast
      .promise(axiosInstance.post(`/reservation?session_id=${sessionId}`), {
        loading: "Processing your reservation...",
        success: "Reservation completed successfully!",
        error: (err) =>
          err?.response?.data?.message ??
          "Something went wrong. Please try again.",
      })
      .finally(() => {
        router.replace("/profile/my-reservations");
      });
  }, [sessionId, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <p className="text-center text-gray-600 text-lg">
        Processing your reservation...
      </p>
    </div>
  );
};

export default ReservationSuccessPage;
