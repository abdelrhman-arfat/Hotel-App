"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/API/axiosInstance";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import ReservationCard from "../card/ReservationCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
const ReservationSearch = () => {
  const [reservation, setReservation] = React.useState(null);
  const [error, setError] = React.useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const reservationId = formData.get("reservationId");
    const userEmail = formData.get("userEmail");
    toast.promise(
      axiosInstance.get(
        `/reservation/get-by-reservation-email-id?reservationId=${reservationId}&userEmail=${userEmail}`
      ),
      {
        loading: "Loading...",
        success: (res) => {
          setReservation(res.data.data.data);
          setError("");
          return res.data.message || "Reservation found";
        },
        error: (err) => {
          setError(err.response.data.message || "Reservation not found");
          setReservation(null);
          return err.response.data.message || "Reservation not found";
        },
      }
    );
  };

  return (
    <div className="my-2 shadow-sm">
      <form
        onSubmit={handleSubmit}
        className="p-4 bg-white shadow-md rounded-md"
      >
        <div className="mb-4">
          <label
            htmlFor="userEmail"
            className="block text-sm font-medium text-gray-700"
          >
            User Email
          </label>
          <Input
            type="email"
            name="userEmail"
            id="userEmail"
            className="mt-1 block w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="reservationId"
            className="block text-sm font-medium text-gray-700"
          >
            Reservation Id
          </label>
          <Input
            type="text"
            name="reservationId"
            id="reservationId"
            className="mt-1 block w-full"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-neutral-700 text-white py-2 rounded-md"
        >
          Search
        </Button>
      </form>
      {reservation && <ReservationCard reservation={reservation} />}
      {error && (
        <Alert
          variant="default"
          className="mt-4 flex items-start gap-4 border border-red-300 bg-red-50 p-4 rounded-lg shadow-sm animate-fade-in"
        >
          <div className="mt-1">
            <AlertTriangle className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <AlertTitle className="text-base font-semibold text-red-700">
              Something went wrong
            </AlertTitle>
            <AlertDescription className="mt-1 text-sm text-red-600">
              {error}
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
};

export default ReservationSearch;
