// utils/errorHandling.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

export function handleStoryGenerationError(error: any): never {
  console.error("Story generation failed:", error);

  if (error.status === 503) {
    throw new Error(
      "AI service is temporarily overloaded. Please try again in a few minutes."
    );
  }

  if (error.message?.includes("quota")) {
    throw new Error("API quota exceeded. Please try again later.");
  }

  throw error;
}

export function handleImageGenerationError(error: any) {
  console.error("Image generation failed:", error);
  return {
    success: false,
    error: "Image generation failed",
    imageUrl: null,
  };
}