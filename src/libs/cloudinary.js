import { v2 as cloudinary } from "cloudinary";
import fs from "fs-extra";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (filePath) => {

  const result = await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
  const image = {
    url: result.secure_url,
    public_id: result.public_id,
  }
  await fs.remove(filePath);
  return image
};

/**asi estaba antes
 export const uploadImage = async (filePath) => {
  return await cloudinary.uploader.upload(filePath, {
    folder: "posts",
  });
};
 */
export const deleteImage = async (id) => {
  return await cloudinary.uploader.destroy(id);
};
