"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FormEvent } from "react";
const AddNewRoomForm = ({
  onSubmit,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div>
        <label htmlFor="title" className="block mb-1 font-medium">
          Room Title
        </label>
        <Input id="title" name="title" placeholder="Room title" required />
      </div>

      <div>
        <label htmlFor="price" className="block mb-1 font-medium">
          Price
        </label>
        <Input
          id="price"
          name="price"
          type="number"
          placeholder="Room price"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 font-medium">
          Description
        </label>
        <Textarea
          id="description"
          name="description"
          placeholder="Room description"
          required
        />
      </div>

      <div>
        <label htmlFor="familyCount" className="block mb-1 font-medium">
          Family Count
        </label>
        <Input
          id="familyCount"
          name="familyCount"
          type="number"
          placeholder="Number of families"
          required
        />
      </div>

      <div>
        <label htmlFor="roomsCount" className="block mb-1 font-medium">
          Rooms Count
        </label>
        <Input
          id="roomsCount"
          name="roomsCount"
          type="number"
          placeholder="Number of rooms"
          required
        />
      </div>

      <div>
        <label htmlFor="main_image" className="block mb-1 font-medium">
          Main Image
        </label>
        <Input
          id="main_image"
          name="main_image"
          type="file"
          accept="image/*"
          required
        />
      </div>

      <div>
        <label htmlFor="images" className="block mb-1 font-medium">
          Additional Images
        </label>
        <Input
          id="images"
          name="images"
          type="file"
          accept="image/*"
          multiple
          required
        />
      </div>

      <Button type="submit" className="w-full cursor-pointer">
        Submit
      </Button>
    </form>
  );
};

export default AddNewRoomForm;
