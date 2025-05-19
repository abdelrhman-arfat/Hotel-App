"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TRoom } from "../types/Room";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/API/axiosInstance";
import toast from "react-hot-toast";
import RoomImageHandler from "./RoomImageHandler";

interface UpdateRoomFormProps {
  room: TRoom;
  onCancel: () => void;
  refetch: () => void;
}

const UpdateRoomForm: React.FC<UpdateRoomFormProps> = ({
  refetch,
  room,
  onCancel,
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (
      formData.get("title") === null ||
      formData.get("pricePerDay") === null ||
      formData.get("familyCount") === null
    ) {
      toast.error("Please fill all the fields");
      return;
    }
    toast
      .promise(
        axiosInstance.put(`/room/${room.id}`, {
          title: formData.get("title"),
          price: formData.get("pricePerDay"),
          family_count: formData.get("familyCount"),
        }),
        {
          // Pass data in the request body
          loading: "Updating room...",
          success: (res) => res.data.message || "Room updated successfully",
          error: (err) => err.response.data.message || "Failed to update room",
        }
      )
      .then(() => {
        refetch();
        onCancel();
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="max-h-screen w-full overflow-auto flex items-center justify-center p-4">
        <Card className="w-full max-w-3xl shadow-2xl rounded-2xl bg-white">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">
              Update Room
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="title"
                  className="block font-semibold text-gray-700"
                >
                  Title
                </label>
                <input
                  id="title"
                  name="title"
                  defaultValue={room.title}
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="familyCount"
                  className="block font-semibold text-gray-700"
                >
                  Family Count
                </label>
                <input
                  id="familyCount"
                  name="familyCount"
                  type="number"
                  defaultValue={room.family_count}
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label
                  htmlFor="pricePerDay"
                  className="block font-semibold text-gray-700"
                >
                  Price Per Day
                </label>
                <input
                  id="pricePerDay"
                  name="pricePerDay"
                  type="number"
                  step="0.01"
                  defaultValue={room.price_per_day}
                  className="w-full mt-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <Button
                  className="cursor-pointer "
                  type="button"
                  variant="secondary"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button className="cursor-pointer" type="submit">
                  Update
                </Button>
              </div>
            </form>

            {Array.isArray(room.room_images) &&
              room.room_images?.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    Room Images
                  </h3>
                  <div className="flex flex-wrap gap-6">
                    {room.room_images.map((image, index) => (
                      <RoomImageHandler
                        refetch={refetch}
                        onCancel={onCancel}
                        id={image.id}
                        image={image.image}
                        key={index + "image"}
                      />
                    ))}
                  </div>
                </div>
              )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UpdateRoomForm;
