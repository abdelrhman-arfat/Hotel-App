import axiosInstance from "@/lib/API/axiosInstance";
import { Pen } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface UpdateRoomImageProps {
  currentImage: string;
  refetch: () => void;
  onCancel: () => void;
  id: number;
}

const UpdateRoomImage: React.FC<UpdateRoomImageProps> = ({
  currentImage,
  onCancel,
  id,
  refetch,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedFile || !id) {
      toast.error("Please select an image to upload.");
      return;
    }

    const formData = new FormData(e.currentTarget);
    toast
      .promise(
        axiosInstance.put(`/room/images/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          loading: "Updating image...",
          success: (res) => res.data.message || "Image updated successfully",
          error: (err) => err.response.data.message || "Error updating image",
        }
      )
      .then(() => {
        refetch();
        setIsFormOpen(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        onCancel();
      });
  };

  return (
    <div className="relative">
      <button className="cursor-pointer" onClick={() => setIsFormOpen(true)}>
        <Pen className="w-5 h-5 " />
      </button>

      {isFormOpen && (
        <div className="fixed inset-0  bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Update Room Image</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="border rounded-lg p-4">
                <p className="text-sm font-medium mb-2">Current Image:</p>
                <Image
                  src={currentImage}
                  alt="Current room"
                  width={400}
                  height={160}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>

              {previewUrl && (
                <div className="border rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">New Image Preview:</p>
                  <Image
                    src={previewUrl}
                    alt="New room preview"
                    width={400}
                    height={160}
                    className="w-full h-40 object-cover rounded-md"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Choose new image:
                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-md file:border-0
                        file:text-sm file:font-semibold
                        file:bg-blue-50 file:text-blue-700
                        hover:file:bg-blue-100"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsFormOpen(false);
                    setPreviewUrl(null);
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!selectedFile}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateRoomImage;
