"use client";
import React, { useCallback } from "react";

import SettingCard from "./sections/profile/SettingCard";
import { Home } from "lucide-react";
import AddNewRoomForm from "./AddNewRoomForm";
import toast from "react-hot-toast";
import axiosInstance from "@/lib/API/axiosInstance";

const AddNewRoom = ({ refetch }: { refetch: () => void }) => {
  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const form = new FormData(e.currentTarget);
      toast
        .promise(
          axiosInstance.post(`/room`, form, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            loading: "Adding new room...",
            success: (res) => res.data.message || "Room added successfully",
            error: (err) => err.response.data.message || "Error adding room",
          }
        )
        .then(() => {
          refetch();
        });
    },
    [refetch]
  );

  return (
    <>
      <SettingCard
        buttonText="Add New Room"
        description="Add a new room to the system"
        icon={<Home />}
        title="Add New Room"
        component={<AddNewRoomForm onSubmit={handleSubmit} />}
      />
    </>
  );
};

export default AddNewRoom;
