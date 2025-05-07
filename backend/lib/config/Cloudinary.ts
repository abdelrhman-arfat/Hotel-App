import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../../constants/Env.js";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import path from "path";
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const timestamp = Date.now();
    const originalName = file.originalname.split(".")[0];
    return {
      folder: "hotel",
      format: path.extname(file.originalname).slice(1) || "png",
      public_id: `${originalName}_${timestamp}`,
    };
  },
});
const upload = multer({ storage });

const deleteExistImage = async (oldImage: string) => {
  try {
    if (!oldImage) return;

    const encodedFilename = oldImage.split("/").pop();
    if (!encodedFilename) {
      console.error("Unable to extract filename from URL.");
      return;
    }

    const decodedFilename = decodeURIComponent(encodedFilename);
    // Get the full name including timestamp
    const fullBaseName = decodedFilename.split(".")[0];

    if (!fullBaseName) {
      console.error("Invalid image URL: Cannot extract baseName.");
      return;
    }

    const public_id = `hotel/${fullBaseName}`;

    await cloudinary.uploader.destroy(public_id);
  } catch (err: any) {
    console.error("Error deleting image:", err.message);
  }
};

export { upload, deleteExistImage };
