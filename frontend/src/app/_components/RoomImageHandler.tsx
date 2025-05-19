import { Trash2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import UpdateRoomImage from "./UpdateRoomImage";
import toast from "react-hot-toast";

const RoomImageHandler = ({
  image,
  id,
  refetch,
  onCancel,
}: {
  image: string;
  onCancel: () => void;
  id: number;
  refetch: () => void;
}) => {
  const deleteImage = () => {
    toast.error("this is not implemented yet");
  };

  return (
    <div className="relative h-[140px] min-w-[200px] flex-1 md:max-w-[220px] group rounded-lg overflow-hidden border">
      <button
        onClick={deleteImage}
        className="absolute hidden group-hover:flex cursor-pointer  z-50 bg-white p-1  left-1 top-1 rounded-full"
      >
        <Trash2 className="w-5 h-5 text-red-400" />
      </button>
      <div className="absolute hidden group-hover:flex cursor-pointer  z-50 bg-white p-1  right-1 top-1 rounded-full">
        <UpdateRoomImage
          onCancel={onCancel}
          id={id}
          currentImage={image}
          refetch={refetch}
        />
      </div>
      <Image src={image} alt={`Room image`} fill className="object-cover" />
    </div>
  );
};

export default RoomImageHandler;
