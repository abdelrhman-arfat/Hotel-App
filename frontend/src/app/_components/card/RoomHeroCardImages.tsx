"use client";

import { TRoomImage } from "@/app/types/Room";
import { CardHeader } from "@/components/ui/card";
import Image from "next/image";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const RoomHeroCardImages = ({
  main_image,
  title,
  room_images,
}: {
  main_image: string;
  title: string;
  room_images?: TRoomImage[];
}) => {
  const [activeImage, setActiveImage] = useState(main_image);

  const allImages = useMemo(() => {
    const others =
      room_images?.filter((img) => img.image !== activeImage) || [];
    return [{ id: "main", image: activeImage }, ...others];
  }, [activeImage, room_images]);

  return (
    <div >
      <CardHeader className="px-4">
        <div className="relative w-full h-[50vh] sm:h-[70vh] rounded-2xl overflow-hidden shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0.5, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={activeImage}
                alt={title}
                fill
                priority
                className="rounded-2xl w-full h-full object-contain sm:object-cover transition-all duration-300"
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </CardHeader>

      {/* Gallery Section */}
      {allImages.length > 1 && (
        <div className="px-6 pb-6">
          <h3 className="font-semibold text-lg sm:text-xl text-gray-800 mb-4">
            Gallery
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
            {allImages.map((img, index) => (
              <motion.div
                whileHover={{ scale: 1.05 }}
                key={`${img.id}-${index}`}
                onClick={() => setActiveImage(img.image)}
                className={clsx(
                  "relative rounded-xl overflow-hidden cursor-pointer aspect-square border transition-all duration-300",
                  {
                    "border-2 border-blue-600 shadow-lg":
                      img.image === activeImage,
                    "border border-gray-200 hover:shadow-md":
                      img.image !== activeImage,
                  }
                )}
              >
                <Image
                  src={img.image}
                  alt={`Room image ${index}`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomHeroCardImages;
