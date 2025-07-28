/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function generateAndUploadImage(prompt: string) {
  try {
    const STABILITY_API_KEY = process.env.STABILITY_API_KEY;
    const BASE_URL = "https://api.stability.ai/v2beta/stable-image/generate/core";

    if (!STABILITY_API_KEY) {
      throw new Error("STABILITY_API_KEY is not set");
    }

    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("aspect_ratio", "1:1");
    formData.append("output_format", "jpeg");
    formData.append("model", "sd3.5-large-turbo");

    const stabilityResponse = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${STABILITY_API_KEY}`,
        Accept: "image/*",
      },
      body: formData,
    });

    if (!stabilityResponse.ok) {
      const errorText = await stabilityResponse.text();
      console.error("Stability API Error:", {
        status: stabilityResponse.status,
        statusText: stabilityResponse.statusText,
        body: errorText,
      });
      throw new Error(`Stability API Error: ${stabilityResponse.status} - ${errorText}`);
    }

    const arrayBuffer = await stabilityResponse.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    // Step 2: Upload the generated image to Cloudinary
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      throw new Error("Cloudinary credentials are not set");
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: "kidzTory_images", 
          public_id: `image_${Date.now()}`, 
          resource_type: "image",
        },
        (error: any, result: any) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(new Error(`Cloudinary Upload Error: ${error.message}`));
          } else {
            resolve(result);
          }
        }
      ).end(imageBuffer);
    });

    const imageUrl = (uploadResult as any).secure_url;
    return { success: true, imageUrl };
  } catch (error: any) {
    console.error("Error in generateAndUploadImage:", error.message);
    return {
      success: false,
      error: error.message,
    };
  }
}